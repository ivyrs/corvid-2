dev: 
	pnpm run dev

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

# copies site over to lc
deploy:
    pnpm run build
    scp -r dist lovecomputer:/opt/sites/ivy.rs
