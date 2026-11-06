/*
 * Устаревший модуль: стриминги и жанры объединены в v3/surs_rows.js.
 * Файл оставлен, чтобы старые загрузчики (кеш, lampainit) не ломались:
 * он просто подгружает новый модуль один раз.
 */
(function () {
    'use strict';

    if (window.surs_rows_ready || window.surs_rows_loading) return;
    window.surs_rows_loading = true;

    Lampa.Utils.putScriptAsync(['https://aviamovie.github.io/v3/surs_rows.js'], function () {});
})();
