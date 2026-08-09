dev:
	pnpm run dev

# host the dev server publicly via tailscale funnel, so others can view it
funnel:
	pnpm run dev -- --host &
	sleep 2
	sudo tailscale funnel --bg 4321

# stop the funnel
funnel-off:
	sudo tailscale funnel --https=443 off

build:
	pnpm run build

preview:
	pnpm run preview

# runs the astro cli
astro:
	pnpm run astro

[group('format')]
fmt:
	pnpm run fmt

# dry run formatter
[group('format')]
fmt-dry:
	pnpm run fmt:check

[group('lint')]
lint:
	pnpm run lint

# dry run linter
[group('lint')]
lint-dry:
	pnpm run lint
