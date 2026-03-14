deploy:
    pnpm run build
    scp -r dist lovecomputer:/opt/sites/ivy.rs/dist
