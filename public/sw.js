/* eslint-disable no-restricted-globals */
// sw.js
self.addEventListener("install", function () {
    self.skipWaiting();
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener("fetch", function (event) {
    if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") {
      return;
    }

    // TODO: fix these requests
    let url = event.request.url;
    if (url.includes("/redirect")) return;
    if (url.includes("fonts.googleapis.com")) return;

    event.preventDefault();
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          // It seems like we only need to set the headers for index.html
          // If you want to be on the safe side, comment this out
          //if (!response.url.includes("index.html")) return response;
          //TODO: Refine this to detect only IPFS fetches?

          let coep = 'require-corp';
          let coop = 'same-origin';
          if ( event.request.url.includes('/double_sign') ){
            //coep = 'all'; // TODO: change value
            console.log('INSIDE IF ====>')
            coop = 'same-origin-allow-popups'; // TODO: change value
          }

          const newHeaders = new Headers(response.headers);
          newHeaders.set("Cross-Origin-Embedder-Policy", coep);
          newHeaders.set("Cross-Origin-Opener-Policy", coop);

          const moddedResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });

          return moddedResponse;
        })
        .catch(function (e) {
          console.error(e);
        })
    );
  });