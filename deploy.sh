#!/usr/bin/env bash

echo "deploying ivy.rs"
cd /opt/sites/ivy.rs || exit
git pull
pnpm run build
echo "deployed"