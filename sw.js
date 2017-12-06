/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/Freelance-portfolio/404.html","201131a0b8c489ff3f1fedeb79444453"],["/Freelance-portfolio/about/index.html","b7120f2b91544bd8fc694130fade50ac"],["/Freelance-portfolio/assets/css/style.css","0eb127e19c7c05bb7548231e9525804f"],["/Freelance-portfolio/assets/javascript/anchor-js/anchor.js","8bb7c1f211e97a83a018f7e8315d0bd8"],["/Freelance-portfolio/assets/javascript/anchor-js/anchor.min.js","59ccbcf40597fdbf5a3a5f88de29c39e"],["/Freelance-portfolio/assets/javascript/anchor-js/banner.js","3b8d2c34e88a474253d442d26d6b48bd"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/anchor.js","8bb7c1f211e97a83a018f7e8315d0bd8"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/fonts/fonts.css","6fbc46de9dbbd7a9907fb3a4d96917a6"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/grunticon/grunticon.loader.js","d74e1458e694a9ddafdeea8cf57ae7d6"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/grunticon/icons.data.png.css","fc4856fbb93aadae89512d6836e584b9"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/grunticon/icons.data.svg.css","6fafa6ceca4538458f39497fe7f94cdb"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/grunticon/icons.fallback.css","aafaf27c58364910a17189bdd3698b19"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/grunticon/png/grunticon-link.png","4d267ae3dffb32f0a142a4b9ad83a327"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/img/anchoring-links.png","ad2873fd7dbc23a75d3439c84e30269b"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/img/anchorjs_logo.png","8b2c671e3b8ae4ff036dbe850aa6d4a9"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/img/anchorlinks2.png","cc0bb054a51018e73a0bd63120f4faae"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/img/mini-logo.png","1b2dd73baf1fe7540ed70a34043c249d"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/img/primer-md.png","f0efdafee0d9cb5f422dfd427646665c"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/scripts.js","235cae35d7b87cf4080119118e25374d"],["/Freelance-portfolio/assets/javascript/anchor-js/docs/styles.css","08baea441a911bc647cbb767ce86c8ca"],["/Freelance-portfolio/css/main.css","ba24cbff965181be58b3bd3566db833e"],["/Freelance-portfolio/images/clients/face-aaron.jpg","79827f9c44a3b1b692c97a75fdfcfd9e"],["/Freelance-portfolio/images/clients/face-atariboy.jpg","82d13ffd6c788efa18f8af0813f6ff17"],["/Freelance-portfolio/images/clients/face-jackiesaik.jpg","11851e1dcc1165a6932dcb2c5452cf41"],["/Freelance-portfolio/images/clients/face-teleject.jpg","39a75534581c87d9c1292bf1201ea14d"],["/Freelance-portfolio/images/clients/logo1.png","9bbd9365c498c34c8bc6bec4160f2286"],["/Freelance-portfolio/images/clients/logo2.png","1a42776689f203c605539184b1a036c9"],["/Freelance-portfolio/images/clients/logo3.png","904b3bf3c6f7acc962434929ba908c65"],["/Freelance-portfolio/images/clients/logo4.png","ff4605761f0c639a5c1b53cf536e18be"],["/Freelance-portfolio/images/face.jpg","a19c7ee41dd2dbdcc1bab5fc18fa12fa"],["/Freelance-portfolio/images/favicons/apple-touch-icon.png","2add0d1d0b1c909c5e71d37a968bffcb"],["/Freelance-portfolio/images/favicons/favicon-16x16.png","71a57c78742fa710910b09df78500767"],["/Freelance-portfolio/images/favicons/favicon-32x32.png","3506cd376729cda5ccefa170eb98d981"],["/Freelance-portfolio/images/nature.jpg","0e753b355e553150ac308712138ce4de"],["/Freelance-portfolio/images/touch/128x128.jpg","48a9618b4901444fec3e100f4da40847"],["/Freelance-portfolio/images/touch/144x144.jpg","69b62e8796065415fad8c885bb6dcf18"],["/Freelance-portfolio/images/touch/152x152.jpg","41764cc32c5550488a1670e6d211e0fc"],["/Freelance-portfolio/images/touch/192x192.jpg","d74ebb3b7b88d454b97c8bee0cd73e0f"],["/Freelance-portfolio/images/touch/512x512.jpg","0a194c5119d5918e4b32fca44c232d3d"],["/Freelance-portfolio/images/work/proj-1/img1.jpg","cfb159e2e2bbf3f56bab8400bae3c2c7"],["/Freelance-portfolio/images/work/proj-1/img2.jpg","231d1ebcfbe95bff0bed6ae1b40423b1"],["/Freelance-portfolio/images/work/proj-1/img3.jpg","c7fda98a59169eb4bccd6148f5ba5e72"],["/Freelance-portfolio/images/work/proj-1/img4.jpg","022d0e642e1d8275f4584e4408359a6f"],["/Freelance-portfolio/images/work/proj-1/img5.jpg","c2211b6487ebb577993c587a9ac50b39"],["/Freelance-portfolio/images/work/proj-1/thumb.jpg","9dcd934ee78c77bd7b90cff25bfcb918"],["/Freelance-portfolio/images/work/proj-2/CityIn-AntonSkvortsov.jpg","a0921bc66aad828368aa43570f33075e"],["/Freelance-portfolio/images/work/proj-2/thumb.jpg","0b8f211852c4bb15b48082652ac2d9d0"],["/Freelance-portfolio/images/work/proj-3/CrispyIcons-PetrasNargela.jpg","66e4054d61fce9741be4263a053f5a11"],["/Freelance-portfolio/images/work/proj-3/thumb.jpg","c12501850e3499192745c59fb21717e8"],["/Freelance-portfolio/images/work/proj-4/flatmobile-AyoubElred.jpg","8a50f62f01a5b78d06538b00f9e2d49c"],["/Freelance-portfolio/images/work/proj-4/thumb.jpg","9376c83a9511d45afdbe796a11e0fcee"],["/Freelance-portfolio/images/work/proj-5/freshitup-JieyuXiong.jpg","7051a8fbbd0da8b997f7097fc250fa87"],["/Freelance-portfolio/images/work/proj-5/thumb.jpg","f2682b431cb54fa96743772824d171e7"],["/Freelance-portfolio/images/work/proj-6/TimeLinePage-SergeyValiukh.jpg","25f808725d3ad4b2f98ab364c5763fca"],["/Freelance-portfolio/images/work/proj-6/thumb.jpg","5bd08e802cffa971d9f957bdf3786bff"],["/Freelance-portfolio/images/work/proj-7/img0.jpg","5c90428208a5a0e02984bc6b9a1c3d06"],["/Freelance-portfolio/images/work/proj-7/img1.jpg","f758994eece0f1f38c358834fc122420"],["/Freelance-portfolio/images/work/proj-7/img2.jpg","b4caf784b6ca12c848100a45e966423d"],["/Freelance-portfolio/images/work/proj-7/img3.jpg","e3926fe5b1964b60b2550e45b1b58460"],["/Freelance-portfolio/images/work/proj-7/img4.jpg","d6225fd68a7de4ea1a97dacd160ccb69"],["/Freelance-portfolio/images/work/proj-7/thumb.jpg","de5cb8dc23d85f6215935ddc0f3ac56f"],["/Freelance-portfolio/images/work/proj-8/stripes-co-NickZoutendijk.jpg","cd2c55d0ab8a513a684f6d13d2b27543"],["/Freelance-portfolio/images/work/proj-8/thumb.jpg","388a5f4603cd1873a3aa14ef1548af12"],["/Freelance-portfolio/index.html","5ef66108bff6e00d741424908ef20c18"],["/Freelance-portfolio/jekyll/update/2016/09/08/welcome-to-jekyll/index.html","8df9307e4d387af1f3bc218e284a418c"],["/Freelance-portfolio/manifest.json","53254fef5e9f2e7a18d86138add2d240"],["/Freelance-portfolio/package-lock.json","41c452347effd6cbbb6dde6f355a4f35"],["/Freelance-portfolio/scripts/main.min.js","7b61604240f9b3c1fe3ebbfc12ffe9d6"],["/Freelance-portfolio/work/proj-1.html","6d885764300fc541c41ad0cf6eef43b9"],["/Freelance-portfolio/work/proj-2.html","d9d2a93b12dfbbeb30d1071e53ff59ea"],["/Freelance-portfolio/work/proj-3.html","7046b8bec750aba36e1a6a7c99593fe8"],["/Freelance-portfolio/work/proj-4.html","a8b4af7e2e43f16223f5f00cea96f779"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







