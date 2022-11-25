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
    // We only need headers for /
    let origin = self.location.origin;
    let url = event.request.url;
    if (url !== origin + "/" && url !== origin + "/#/") return;

    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          const newHeaders = new Headers(response.headers);
          newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
          newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

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