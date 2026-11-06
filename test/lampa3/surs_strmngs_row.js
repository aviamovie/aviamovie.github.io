/*
 * SURS — ряды «Глобальные стриминги» и «Российские стриминги» (Lampa 3.x)
 *
 * Ряды регистрируются через Lampa.ContentRows (экран 'main').
 * На главной SURS позиция рядов выбирается случайно при каждом открытии
 * (как было в v3), на остальных источниках — фиксированная.
 */
(function () {
    'use strict';

    if (window.streaming_buttons_ready) return;
    window.streaming_buttons_ready = true;

    /* ---------------- константы ---------------- */

    var BASE_PARAMS = '&without_keywords=346488,158718,41278,196034,272265,13141,345822,315535,290667,323477,290609';
    var LOGO_CACHE_MINUTES = 60 * 24 * 7;

    var GLOBAL = [
        { id: 213,  title: 'Netflix' },
        { id: 2739, title: 'Disney+' },
        { id: 2552, title: 'Apple TV+' },
        { id: 1024, title: 'Amazon Prime Video' },
        { id: 3186, title: 'Max' },
        { id: 4330, title: 'Paramount+' },
        { id: 3353, title: 'Peacock' },
        { id: 453,  title: 'Hulu' },
        { id: 49,   title: 'HBO' },
        { id: 318,  title: 'Starz' },
        { id: 2,    title: 'ABC' },
        { id: 6,    title: 'NBC' },
        { id: 19,   title: 'FOX' },
        { id: 67,   title: 'Showtime' },
        { id: 88,   title: 'FX' },
        { id: 174,  title: 'AMC' }
    ];

    var RUSSIAN = [
        { id: 3827, title: 'Кинопоиск HD' },
        { id: 2493, title: 'Start' },
        { id: 3923, title: 'ИВИ' },
        { id: 3871, title: 'Okko' },
        { id: 4085, title: 'KION' },
        { id: 2859, title: 'Premier' },
        { id: 5806, title: 'Wink' },
        { id: 3882, title: 'More.TV' },
        { id: 412,  title: 'Россия 1' },
        { id: 558,  title: 'Первый канал' },
        { id: 806,  title: 'СТС' },
        { id: 1191, title: 'ТНТ' },
        { id: 3031, title: 'Пятница!' }
    ];

    /**
     * name   — имя ряда в ContentRows (= ключ вкл/выкл в Настройки → Каналы)
     * index  — позиция на обычной главной
     * range  — диапазон случайной позиции на главной SURS
     */
    var ROWS = [
        { name: 'streaming_global',  title: 'surs_strmngs_global_title',  services: GLOBAL,  global: true,  index: 3, range: [2, 7] },
        { name: 'streaming_russian', title: 'surs_strmngs_russian_title', services: RUSSIAN, global: false, index: 7, range: [8, 13] }
    ];

    /* ---------------- утилиты ---------------- */

    function t(key) {
        return Lampa.Lang.translate(key);
    }

    function threeYearsAgo() {
        var d = new Date();
        d.setFullYear(d.getFullYear() - 3);
        return d.toISOString().split('T')[0];
    }

    function randomInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    function isSursMain(params) {
        return !!(params && window.SURS && window.SURS.isSursSource(params.source));
    }

    /** Логотип сети из TMDB (Lampa.Network + кеш запросов, V3) */
    function loadLogo(networkId, callback) {
        var url = Lampa.TMDB.api('network/' + networkId + '?api_key=' + Lampa.TMDB.key());

        Lampa.Network.silent(url, function (data) {
            callback(data && data.logo_path ? Lampa.TMDB.image('t/p/w154' + data.logo_path) : '');
        }, function () {
            callback('');
        }, false, { cache: { life: LOGO_CACHE_MINUTES } });
    }

    /* ---------------- открытие сервиса ---------------- */

    function openService(service, isGlobal) {
        var sorts = [
            { title: 'surs_strmngs_new',       sort: 'first_air_date.desc', params: BASE_PARAMS + '&first_air_date.gte=' + threeYearsAgo() + (isGlobal ? '&vote_count.gte=10' : '') },
            { title: 'surs_strmngs_top_rated', sort: 'vote_average.desc',   params: BASE_PARAMS + '&vote_count.gte=10' },
            { title: 'surs_strmngs_popular',   sort: 'popularity.desc',     params: BASE_PARAMS + '&vote_count.gte=10' },
            { title: 'surs_strmngs_most_voted', sort: 'vote_count.desc',    params: BASE_PARAMS + '&vote_count.gte=30' }
        ];

        Lampa.Select.show({
            title: service.title,
            items: sorts.map(function (s) {
                return { title: t(s.title), sort: s };
            }),
            onSelect: function (item) {
                Lampa.Activity.push({
                    url: 'discover/tv?with_networks=' + service.id + item.sort.params,
                    title: service.title + ' — ' + item.title,
                    component: 'category_full',
                    source: 'tmdb',
                    card_type: true,
                    sort_by: item.sort.sort,
                    page: 1
                });
            },
            onBack: function () {
                Lampa.Controller.toggle('content');
            }
        });
    }

    /* ---------------- карточка сервиса ---------------- */

    function serviceCard(service, isGlobal) {
        return {
            source: 'custom',
            id: 'streaming_' + service.id,
            title: service.title,
            name: service.title,
            params: {
                module: Lampa.Maker.module('Card').only('Card', 'Callback'),
                emit: {
                    // this.html — нативный Element (V3)
                    onCreate: function () {
                        var box = document.createElement('div');
                        box.className = 'streaming-card__svg-icon';

                        this.html.addClass('streaming-card--button-compact');
                        this.html.find('.card__img').replaceWith(box);

                        loadLogo(service.id, function (logo) {
                            if (logo) {
                                var img = document.createElement('img');
                                img.src = logo;
                                box.appendChild(img);
                            } else {
                                var text = document.createElement('div');
                                text.className = 'streaming-card__name';
                                text.textContent = service.title;
                                box.appendChild(text);
                            }
                        });
                    },
                    onlyEnter: function () {
                        openService(service, isGlobal);
                    }
                }
            }
        };
    }

    function rowLoader(row) {
        return function (call) {
            call({
                title: t(row.title),
                results: row.services.map(function (s) {
                    return serviceCard(s, row.global);
                }),
                params: {
                    items: { view: 20, mapping: 'line' }
                }
            });
        };
    }

    /* ---------------- стили ---------------- */

    function addStyles() {
        var css = [
            '.streaming-card--button-compact{width:12.75em!important}',
            '.streaming-card--button-compact .card__view{padding-bottom:56%!important;display:flex;align-items:center;justify-content:center;background-color:rgba(200,200,200,.18);border-radius:1em;transition:background-color .18s ease}',
            '.streaming-card--button-compact.hover .card__view,.streaming-card--button-compact.focus .card__view{background-color:rgba(240,240,240,.35)}',
            '.streaming-card--button-compact .card__title,.streaming-card--button-compact .card__age{display:none!important}',
            '.streaming-card__svg-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:45%;height:45%;display:flex;align-items:center;justify-content:center}',
            '.streaming-card__svg-icon img{width:100%;height:100%;object-fit:contain}',
            '.streaming-card__name{color:#fff;font-size:1.2em;font-weight:700;text-align:center}',
            '@media screen and (max-width:767px){',
            '.streaming-card--button-compact{width:9em!important}',
            '.streaming-card__svg-icon{width:60%;height:60%}',
            '}'
        ].join('');

        Lampa.Template.add('surs_streaming_rows_style', '<style>' + css + '</style>');
        $('body').append(Lampa.Template.get('surs_streaming_rows_style', {}, true));
    }

    /* ---------------- запуск ---------------- */

    function init() {
        Lampa.Lang.add({
            surs_strmngs_global_title:  { ru: 'Глобальные стриминги', en: 'Global Streaming', uk: 'Глобальні стрімінги' },
            surs_strmngs_russian_title: { ru: 'Российские стриминги', en: 'Russian Streaming', uk: 'Російські стрімінги' },
            surs_strmngs_new:           { ru: 'Новинки', en: 'New', uk: 'Новинки' },
            surs_strmngs_top_rated:     { ru: 'Высокий рейтинг', en: 'Top Rated', uk: 'Високий рейтинг' },
            surs_strmngs_popular:       { ru: 'Популярные', en: 'Popular', uk: 'Популярні' },
            surs_strmngs_most_voted:    { ru: 'Много голосов', en: 'Most Voted', uk: 'Багато голосів' }
        });

        addStyles();

        ROWS.forEach(function (row) {
            Lampa.ContentRows.add({
                index: row.index,
                name: row.name,
                title: t(row.title),
                screen: ['main'],
                // ContentRows.call читает row.index ПОСЛЕ вызова call(),
                // поэтому позицию можно выбрать здесь
                call: function (params) {
                    this.index = isSursMain(params) ? randomInt(row.range[0], row.range[1]) : row.index;
                    return rowLoader(row);
                }
            });
        });

        // совместимость с внешними плагинами, использовавшими v3 API
        window.streaming_getAllGlobalButtons = function () {
            return GLOBAL.map(function (s) { return { id: 'streaming_' + s.id, title: s.title, service: s }; });
        };
        window.streaming_getAllRussianButtons = function () {
            return RUSSIAN.map(function (s) { return { id: 'streaming_' + s.id, title: s.title, service: s }; });
        };
    }

    if (Lampa.Manifest.app_digital >= 300) {
        if (window.appready) init();
        else Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') init();
        });
    }
})();
