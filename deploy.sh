#!/usr/bin/env bash
set -euo pipefail

echo "deploying ivy.rs"
cd /opt/sites/ivy.rs || exit
git pull
pnpm i
pnpm run build
echo "deployed"