const CACHE_NAME = "shogi-v2";

const FILES_TO_CACHE = [
  "./",
  "./service-worker.js",
  "./index.html",
  "./manifest.json",
  "./pyxel.js",
  "./pyxel.css",
  "./import_hook.py",
  "./pyxel-2.9.8-cp311-abi3-emscripten_5_0_3_wasm32.whl",
  "./shogi_musou.pyxapp",

  "./icon-192.png",
  "./icon-512.png",

  "./images/pyxel_logo_76x32.png",
  "./images/touch_to_start_114x14.png",
  "./images/click_to_start_114x14.png",
  "./images/gamepad_cross_98x98.png",
  "./images/gamepad_button_98x98.png",
  "./images/gamepad_menu_92x26.png",
  "./images/pyxel_icon_64x64.ico",
];

// 初回インストール
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

// 古いキャッシュ削除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// キャッシュ優先
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
