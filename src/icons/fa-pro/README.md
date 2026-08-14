# Font Awesome Pro icons

Local SVGs for icons that Iconify's free `@iconify-json/fa7-*` packages
don't carry (Pro-only styles like light/thin/duotone/sharp, or individual
icons that are Pro-gated even within Solid/Regular, e.g. `shelves`).

Download the raw SVG from your Font Awesome Pro account and drop it in
here as `<style>/<slug>.svg`, matching Font Awesome's own naming
(e.g. `solid/shelves.svg`, `light/calendar-days.svg`).

Reference it from content/components with:

```
icon: fa-pro-<style> fa-<slug>
```

e.g. `fa-pro-solid fa-shelves` → resolves to `src/icons/fa-pro/solid/shelves.svg`
via `iconName()` in `src/lib/utils.ts`. Styles that are always Pro-only
(anything besides `solid`/`regular`/`brands`) don't need the `pro-` prefix —
plain `fa-light fa-shelves` already routes here automatically.

## Currently needed

- `solid/shelves.svg` — used on `/setup` and the homepage `/setup` link.
  Removed from Font Awesome 7's free tier (was free in v6).
