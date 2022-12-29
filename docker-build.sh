#! /bin/sh

# Build WASM
docker run -it --rm \
    -v "${PWD}/public/wasm/:/root/wasm/" \
    --entrypoint ./build.sh \
    glamperd/wasm-pack-wrapper

# Build frontend
docker run -it --rm \
    -v "${PWD}:/work" \
    -w /work \
    --entrypoint /build.sh \
    kzg-ceremony-frontend 

# Start IPFS node
docker run -it --rm \
    -v "${PWD}/build:/export" \
    -v "${PWD}/ipfs:/data/ipfs" \
    -e IPFS_PROFILE=server \
    -p 4001:4001 -p 4001:4001/udp \
    -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 \
     ipfs/kubo:latest
