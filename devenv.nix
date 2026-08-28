{ pkgs, lib, config, inputs, ... }:

{
  packages = [
    pkgs.nodejs_22
    pkgs.pnpm
  ];

  enterShell = ''
    export PATH="$PWD/node_modules/.bin:$PATH"
  '';

  scripts = {
    dev.exec = ''pnpm run dev "$@"'';
    build.exec = ''pnpm run build "$@"'';
    preview.exec = ''pnpm run preview "$@"'';
    astro.exec = ''pnpm run astro "$@"'';
    fmt.exec = ''pnpm run fmt "$@"'';
    fmt-check.exec = ''pnpm run fmt:check "$@"'';
    lint.exec = ''pnpm run lint "$@"'';
  };
}
