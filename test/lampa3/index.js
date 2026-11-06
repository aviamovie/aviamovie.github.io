/*
 * SURS — тестовый загрузчик рефакторинга под Lampa 3.x
 *
 * Установка для теста: Настройки → Плагины →
 *   https://aviamovie.github.io/test/lampa3/index.js
 * или прямо из ветки (до слияния в main):
 *   https://cdn.jsdelivr.net/gh/aviamovie/aviamovie.github.io@claude/confident-pasteur-y1j00h/test/lampa3/index.js
 *
 * Не ставить вместе с https://aviamovie.github.io/surs.js
 */
(function () {
    'use strict';

    if (window.surs_lampa3_loader) return;
    window.surs_lampa3_loader = true;

    var SITE = 'https://aviamovie.github.io/';

    // Остальные файлы грузим оттуда же, откуда загружен сам index.js
    var script = document.currentScript && document.currentScript.src;
    var BASE = script && /test\/lampa3\/index\.js/.test(script)
        ? script.replace(/test\/lampa3\/index\.js.*$/, '')
        : SITE;

    if (!(Lampa.Manifest && Lampa.Manifest.app_digital >= 300)) {
        Lampa.Utils.putScriptAsync([SITE + 'v2/surs.js'], function () {
            console.log('SURS', 'Lampa < 3.0 — загружен v2');
        });
        return;
    }

    function load() {
        Lampa.Utils.putScriptAsync([
            BASE + 'test/lampa3/surs.js',
            BASE + 'test/lampa3/surs_nav_buttons.js',
            BASE + 'test/lampa3/surs_rows.js'       // стриминги + жанры
        ], function () {
            console.log('SURS', 'lampa3 test build загружен из', BASE);

            if (!window.SursSelect || !window.SursSelect.__initialized) {
                Lampa.Utils.putScriptAsync([SITE + 'surs_select.js'], function () {});
            }
        });
    }

    if (window.appready) load();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') load();
    });
})();
