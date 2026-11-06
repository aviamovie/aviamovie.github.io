/*
 * SURS — тестовый загрузчик рефакторинга под Lampa 3.x
 *
 * Установка для теста: Настройки → Плагины → https://aviamovie.github.io/test/lampa3/index.js
 * (вместо https://aviamovie.github.io/surs.js — одновременно их не ставить)
 */
(function () {
    'use strict';

    if (window.surs_lampa3_loader) return;
    window.surs_lampa3_loader = true;

    var BASE = 'https://aviamovie.github.io/';

    if (!(Lampa.Manifest && Lampa.Manifest.app_digital >= 300)) {
        Lampa.Utils.putScriptAsync([BASE + 'v2/surs.js'], function () {
            console.log('SURS', 'Lampa < 3.0 — загружен v2');
        });
        return;
    }

    function load() {
        Lampa.Utils.putScriptAsync([
            BASE + 'test/lampa3/surs.js',
            BASE + 'test/lampa3/surs_nav_buttons.js',
            BASE + 'test/lampa3/surs_strmngs_row.js',
            BASE + 'v3/surs_genres_row.js'          // без изменений: уже на ContentRows
        ], function () {
            console.log('SURS', 'lampa3 test build загружен');

            if (!window.SursSelect || !window.SursSelect.__initialized) {
                Lampa.Utils.putScriptAsync([BASE + 'surs_select.js'], function () {});
            }
        });
    }

    if (window.appready) load();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') load();
    });
})();
