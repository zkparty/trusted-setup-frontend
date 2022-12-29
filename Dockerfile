# Copy WASM code
FROM glamperd/wasm-pack-wrapper as wrapper

FROM node:19-bullseye

COPY --from=wrapper /root/wasm/pkg/ ./work/public/wasm/pkg/

RUN echo "#!/bin/bash\nnpm run build" > build.sh
RUN chmod +x build.sh

ENTRYPOINT [ "./build.sh"]