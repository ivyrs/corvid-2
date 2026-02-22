// lanyard.ts

const BASE_URL = "https://api.lanyard.rest/v1";
const WS_URL = "wss://api.lanyard.rest/socket";

// ── Types ──────────────────────────────────────────────────────────────────

export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  public_flags: number;
  bot: boolean;
  global_name: string | null;
}

export interface ActivityTimestamps {
  start?: number;
  end?: number;
}

export interface ActivityAssets {
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

export interface ActivityParty {
  id?: string;
  size?: [number, number];
}

export interface ActivitySecrets {
  join?: string;
  spectate?: string;
  match?: string;
}

export interface ActivityEmoji {
  name: string;
  id?: string;
  animated?: boolean;
}

export interface Activity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: ActivityTimestamps;
  assets?: ActivityAssets;
  party?: ActivityParty;
  secrets?: ActivitySecrets;
  emoji?: ActivityEmoji;
  sync_id?: string;
  session_id?: string;
  flags?: number;
  buttons?: string[];
  application_id?: string;
  created_at?: number;
  instance?: boolean;
}

export interface SpotifyData {
  track_id: string;
  timestamps: { start: number; end: number };
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
}

export interface LanyardData {
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  kv: Record<string, string>;
  spotify: SpotifyData | null;
  discord_user: DiscordUser;
  discord_status: DiscordStatus;
  activities: Activity[];
}

export interface LanyardResponse {
  success: boolean;
  data: LanyardData;
}

export interface LanyardMultiResponse {
  success: boolean;
  data: Record<string, LanyardData>;
}

// ── WebSocket types ────────────────────────────────────────────────────────

enum Opcode {
  Event = 0,
  Hello = 1,
  Initialize = 2,
  Heartbeat = 3,
}

interface WsMessage {
  op: Opcode;
  t?: string;
  d?: unknown;
}

export type LanyardEventHandler = (data: LanyardData) => void;

// ── REST API ───────────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Lanyard API error ${res.status}: ${body}`);
  }
  return res.json() as Promise<T>;
}

/** GET /v1/users/:userId — fetch a single user's presence */
export async function getPresence(
  userId: string = "295975431058751498",
): Promise<LanyardData> {
  const res = await request<LanyardResponse>(`/users/${userId}`);
  return res.data;
}

/** GET /v1/users?users=id1,id2 — fetch multiple users' presences */
export async function getPresences(
  userIds: string[],
): Promise<Record<string, LanyardData>> {
  const params = new URLSearchParams({ users: userIds.join(",") });
  const res = await request<LanyardMultiResponse>(`/users?${params}`);
  return res.data;
}

// ── KV Store ───────────────────────────────────────────────────────────────

/**
 * PUT /v1/users/:userId/kv/:key
 * Requires your Lanyard API key (DM Lanyard#5766 with .apikey)
 */
export async function setKV(
  userId: string,
  key: string,
  value: string,
  apiKey: string,
): Promise<void> {
  await request(`/users/${userId}/kv/${encodeURIComponent(key)}`, {
    method: "PUT",
    headers: {
      Authorization: apiKey,
      "Content-Type": "text/plain",
    },
    body: value,
  });
}

/**
 * PUT /v1/users/:userId/kv — set multiple KV pairs at once
 */
export async function setKVBulk(
  userId: string,
  kv: Record<string, string>,
  apiKey: string,
): Promise<void> {
  await request(`/users/${userId}/kv`, {
    method: "PUT",
    headers: {
      Authorization: apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(kv),
  });
}

/**
 * DELETE /v1/users/:userId/kv/:key
 */
export async function deleteKV(
  userId: string,
  key: string,
  apiKey: string,
): Promise<void> {
  await request(`/users/${userId}/kv/${encodeURIComponent(key)}`, {
    method: "DELETE",
    headers: { Authorization: apiKey },
  });
}

// ── WebSocket client ───────────────────────────────────────────────────────

export interface LanyardSocketOptions {
  /** Subscribe to a single user */
  userId?: string;
  /** Subscribe to multiple users */
  userIds?: string[];
  /** Subscribe to ALL users (firehose — use sparingly) */
  subscribeToAll?: boolean;
  onPresenceUpdate: LanyardEventHandler;
  onReady?: (data: Record<string, LanyardData>) => void;
  onError?: (err: Event) => void;
  onClose?: (ev: CloseEvent) => void;
}

export function connectSocket(options: LanyardSocketOptions): () => void {
  const {
    userId,
    userIds,
    subscribeToAll = false,
    onPresenceUpdate,
    onReady,
    onError,
    onClose,
  } = options;

  let ws: WebSocket;
  let heartbeatTimer: ReturnType<typeof setInterval> | undefined;

  function connect() {
    ws = new WebSocket(WS_URL);

    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data as string) as WsMessage;

      switch (msg.op) {
        case Opcode.Hello: {
          const { heartbeat_interval } = msg.d as {
            heartbeat_interval: number;
          };

          // Send heartbeats
          heartbeatTimer = setInterval(() => {
            ws.send(JSON.stringify({ op: Opcode.Heartbeat }));
          }, heartbeat_interval);

          // Subscribe
          let initData: Record<string, unknown>;
          if (subscribeToAll) {
            initData = { subscribe_to_all: true };
          } else if (userId) {
            initData = { subscribe_to_id: userId };
          } else if (userIds && userIds.length > 0) {
            initData = { subscribe_to_ids: userIds };
          } else {
            throw new Error(
              "Provide userId, userIds, or subscribeToAll",
            );
          }

          ws.send(
            JSON.stringify({ op: Opcode.Initialize, d: initData }),
          );
          break;
        }

        case Opcode.Event: {
          if (msg.t === "INIT_STATE") {
            onReady?.(msg.d as Record<string, LanyardData>);
          } else if (msg.t === "PRESENCE_UPDATE") {
            onPresenceUpdate(msg.d as LanyardData);
          }
          break;
        }
      }
    });

    ws.addEventListener("error", (e) => onError?.(e));
    ws.addEventListener("close", (e) => {
      clearInterval(heartbeatTimer);
      onClose?.(e);
    });
  }

  connect();

  // Return a disconnect function
  return () => {
    clearInterval(heartbeatTimer);
    ws.close();
  };
}