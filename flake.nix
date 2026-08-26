{
  description = "corvid, my astro site";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        nodeModulesCheck = ''
          if [ ! -d node_modules ]; then
            echo "node_modules missing — run 'pnpm install' first" >&2
            exit 1
          fi
        '';

        mkPnpmApp = name: script:
          pkgs.writeShellApplication {
            inherit name;
            runtimeInputs = [ pkgs.nodejs_22 pkgs.pnpm ];
            text = ''
              ${nodeModulesCheck}
              exec pnpm run ${script} -- "$@"
            '';
          };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.nodejs_22
            pkgs.pnpm
          ];

          shellHook = ''
            export PATH="$PWD/node_modules/.bin:$PATH"
          '';
        };

        apps = {
          dev = flake-utils.lib.mkApp {
            drv = mkPnpmApp "ivy-rs-dev" "dev";
          };
          build = flake-utils.lib.mkApp {
            drv = mkPnpmApp "ivy-rs-build" "build";
          };
          preview = flake-utils.lib.mkApp {
            drv = mkPnpmApp "ivy-rs-preview" "preview";
          };
          astro = flake-utils.lib.mkApp {
            drv = mkPnpmApp "ivy-rs-astro" "astro";
          };
          fmt = flake-utils.lib.mkApp {
            drv = mkPnpmApp "ivy-rs-fmt" "fmt";
          };
          fmt-check = flake-utils.lib.mkApp {
            drv = mkPnpmApp "ivy-rs-fmt-check" "fmt:check";
          };
          lint = flake-utils.lib.mkApp {
            drv = mkPnpmApp "ivy-rs-lint" "lint";
          };
          default = flake-utils.lib.mkApp {
            drv = mkPnpmApp "ivy-rs-dev" "dev";
          };
        };

        formatter = pkgs.nixpkgs-fmt;
      });
}
