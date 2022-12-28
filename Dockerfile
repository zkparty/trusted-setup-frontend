# Copy WASM code
FROM wasm-pack-wrapper as wrapper

FROM node:19-bullseye

COPY . .


COPY --from=wrapper /root/wasm/pkg/ ./public/wasm/pkg/

RUN npm run build
