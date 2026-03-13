deploy:
    pnpm run build
    scp -R dist lovecomputer:/root/test
