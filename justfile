dev:
	nix run .#dev

# host the dev server publicly via tailscale funnel, so others can view it
funnel:
	nix run .#dev -- --host &
	sleep 2
	sudo tailscale funnel --bg 4321

# stop the funnel
funnel-off:
	sudo tailscale funnel --https=443 off

build:
	nix run .#build

# sync licensed fa-pro icons (src/icons/fa-pro/**/*.svg, gitignored) to lovecomputer,
# so CI builds there can see icons that only exist locally
sync-icons:
	rsync -av --include="*/" --include="*.svg" --exclude="*" src/icons/fa-pro/ ivy@lovecomputer:/home/ivy/fa-pro-icons/

preview:
	nix run .#preview

# runs the astro cli
astro:
	nix run .#astro

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

# dry run linter
[group('lint')]
lint-dry:
	nix run .#lint
