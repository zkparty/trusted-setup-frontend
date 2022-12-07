/* eslint-disable no-restricted-globals */
// sw.js
self.addEventListener("install", function () {
    self.skipWaiting();
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener("fetch", async function (event) {
    if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") {
      return;
    }

    let origin = self.location.origin;
    let regex = new RegExp("^" + origin);
    let url = event.request.url;
    // discard requests coming outside from the origin (google fonts, apis, etc)
    if ( !regex.test(url) ) return;

    // Brave requires to use the url string rather than the whole object
    let request = event.request;
    if (url.includes('session_id')){
      request = event.request.url;
    }
    console.log(`url: ${url}`)

    //if (url.includes('signin.html')) return;

    event.respondWith(
      fetch(request)
        .then(function (response) {
          const newHeaders = new Headers(response.headers);
          newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
          newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

          if (url && url.includes('double_sign')) {
            newHeaders.delete("Cross-Origin-Embedder-Policy");
            newHeaders.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
          }

          const moddedResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });

          return moddedResponse;
        })
        .catch(async function (e) {
          console.error(e);
        })
    );
  });