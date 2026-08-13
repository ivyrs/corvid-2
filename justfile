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

# sync licensed fa-pro icons (src/icons/fa-pro/**/*.svg, gitignored) to lovecomputer,
# so CI builds there can see icons that only exist locally
sync-icons:
	rsync -av --include="*/" --include="*.svg" --exclude="*" src/icons/fa-pro/ ivy@lovecomputer:/home/ivy/fa-pro-icons/

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
