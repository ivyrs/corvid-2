dev:
	nix run .#dev

build:
	nix run .#build

preview:
	nix run .#preview

# runs the astro cli
@astro *args:
	nix run .#astro -- {{args}}

# new /now post
[group('content')]
@new-note:
  #!/usr/bin/env bash

  DATE=$(date -u +%Y-%m-%d)
  echo $DATE

  nvim "content/now/$DATE.mdx"

# new /blog post
[group('content')]
@new-post:
  #!/usr/bin/env bash

  DATE=$(date -u +%Y-%m-%d)
  echo $DATE

  nvim "content/blog/$DATE.mdx"

[group('format')]
fmt:
	nix run .#fmt

# dry run formatter
[group('format')]
fmt-dry:
	nix run .#fmt-check

[group('lint')]
lint:
	nix run .#lint

# host the dev server via tailscale funnel
[group('net')]
funnel:
	nix run .#dev -- --host &
	sleep 2
	sudo tailscale funnel --bg 4321

# stop the funnel
[group('net')]
funnel-off:
	sudo tailscale funnel --https=443 off

# sync fa pro icons (src/icons/fa-pro/**/*.svg, gitignored) to webserver
sync-icons:
	rsync -av --include="*/" --include="*.svg" --exclude="*" src/icons/fa-pro/ ivy@lovecomputer:/home/ivy/fa-pro-icons/

