deploy:
    pnpx astro build
    scp -R dist lovecomputer:/root/test
