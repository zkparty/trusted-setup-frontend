#! /bin/sh

# Build WASM
docker run -it --rm \
    -v "${PWD}/public/wasm/:/root/source/wasm/" \
    --entrypoint ./build.sh \
    zkparty/wasm-pack-wrapper

# Build frontend
docker run -it --rm \
    -v "${PWD}:/work" \
    -w /work \
    -e REACT_APP_API_ROOT="${REACT_APP_API_ROOT}" \
    -e REACT_APP_ENVIRONMENT="${REACT_APP_ENVIRONMENT}" \
    -e REACT_APP_END_DATE="${REACT_APP_END_DATE}" \
    -e REACT_APP_TRANSCRIPT_HASH="${REACT_APP_TRANSCRIPT_HASH}" \
    --entrypoint ./build.sh \
    node:19-bullseye

# Start IPFS node
docker run -d --rm \
    --name ipfs-host \
    -v "${PWD}/build:/export" \
    -v "${PWD}/ipfs:/data/ipfs" \
    -e IPFS_PROFILE=server \
    -p 4001:4001 -p 4001:4001/udp \
    -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 \
     ipfs/kubo:latest
