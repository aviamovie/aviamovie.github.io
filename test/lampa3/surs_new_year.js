/*
 * SURS — Новогодние каникулы (surs_new_year.js)
 *
 * Отдельный плагин для Lampa 3:
 *  - вторая кнопка в навигационном ряду SURS — ёлка «Новый год»;
 *  - по нажатию — страница подборок для новогодних каникул: коллекции
 *    (Гарри Поттер, Один дома, Ёлки, …) и тематические ряды TMDB.
 *
 * Как устроено:
 *  - страница — свой источник Lampa (копия tmdb со своей main), открывается
 *    штатным компонентом main: ряды, «Ещё», карточки — как на главной SURS;
 *  - коллекции ищутся по названию (search/collection) — как в SURS;
 *  - ключевые слова TMDB («christmas», «new year's eve», …) тоже ищутся по
 *    названию (search/keyword) и кешируются на 30 дней, а не зашиты числами;
 *  - пустой ряд (ничего не нашлось) Lampa просто не показывает;
 *  - фильтр нежелательных ключевых слов SURS (window.SURS.keywordsFilter)
 *    применяется, если SURS загружен.
 *
 * Подключение: после surs_nav_buttons.js (или в любом порядке — кнопка
 * дождётся ряда через window.surs_external_buttons).
 *
 * ES5 (Tizen 3.x).
 */
(function () {
    'use strict';

    if (window.surs_new_year_ready) return;
    window.surs_new_year_ready = true;

    var CONFIG = {
        source: 'surs_newyear',
        position: 1,              // второй кнопкой в навигационном ряду
        seasonOnly: false,        // true — кнопка видна только в сезон
        season: { from: '12-01', to: '01-15' },  // ММ-ДД, через Новый год
        partsLimit: 6,            // рядов за одну порцию загрузки
        cacheLife: 60 * 24,       // кеш выдачи — сутки (минуты)
        searchLife: 60 * 24 * 30  // кеш поиска коллекций и ключевых слов — 30 суток
    };

    /* =====================================================================
     *  ПЕРЕВОДЫ
     * ===================================================================== */

    Lampa.Lang.add({
        surs_ny_button:      { ru: 'Новый год', en: 'New Year', uk: 'Новий рік' },
        surs_ny_title:       { ru: 'Новогодние каникулы', en: 'New Year holidays', uk: 'Новорічні канікули' },
        surs_ny_collection:  { ru: 'Коллекция', en: 'Collection', uk: 'Колекція' },
        surs_ny_russian:     { ru: 'Российские новогодние фильмы', en: 'Russian New Year movies', uk: 'Російські новорічні фільми' },
        surs_ny_soviet:      { ru: 'Советская новогодняя классика', en: 'Soviet New Year classics', uk: 'Радянська новорічна класика' },
        surs_ny_christmas:   { ru: 'Рождественские фильмы', en: 'Christmas movies', uk: 'Різдвяні фільми' },
        surs_ny_family:      { ru: 'Семейные новогодние комедии', en: 'Family holiday comedies', uk: 'Сімейні новорічні комедії' },
        surs_ny_animation:   { ru: 'Новогодние мультфильмы', en: 'Holiday cartoons', uk: 'Новорічні мультфільми' },
        surs_ny_series:      { ru: 'Новогодние сериалы и спецвыпуски', en: 'Holiday series and specials', uk: 'Новорічні серіали та спецвипуски' },
        surs_ny_winter:      { ru: 'Зимние сказки', en: 'Winter fairy tales', uk: 'Зимові казки' },
        surs_ny_romance:     { ru: 'Рождественская романтика', en: 'Christmas romance', uk: 'Різдвяна романтика' },
        surs_ny_fresh:       { ru: 'Новые рождественские фильмы', en: 'New Christmas movies', uk: 'Нові різдвяні фільми' },
        surs_ny_marathon:    { ru: 'Марафон на каникулы', en: 'Holiday marathon', uk: 'Марафон на канікули' }
    });

    function t(key) {
        return Lampa.Lang.translate(key);
    }

    /* =====================================================================
     *  ДАННЫЕ ДЛЯ ПОИСКА
     *  Коллекции: несколько вариантов названия — берётся первый найденный.
     *  Ключевые слова: точное английское название в TMDB.
     * ===================================================================== */

    var KEYWORDS = {
        christmas: ['christmas'],
        newyear:   ["new year's eve", 'new year'],
        santa:     ['santa claus'],
        winter:    ['winter', 'snow']
    };

    var GENRES = { animation: 16, comedy: 35, family: 10751, fantasy: 14, romance: 10749 };

    // не для праздничного настроения: ужасы, военные, триллеры
    var WITHOUT_GENRES = 'without_genres=27,10752,53';

    var DAY = 1000 * 60 * 60 * 24;

    function isoDate(daysAgo) {
        var d = new Date(new Date().getTime() - daysAgo * DAY);
        return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    }

    /**
     * Ряды страницы, сверху вниз. type:
     *  collection — коллекция TMDB по названию (queries — варианты названия);
     *  discover   — discover/{media} с ключевыми словами (keywords — группы из KEYWORDS,
     *               объединяются через «или») и доп. параметрами.
     */
    function rows() {
        return [
            { type: 'collection', queries: ['Harry Potter'], prefix: true },
            { type: 'discover', title: 'surs_ny_russian', media: 'movie', keywords: ['newyear', 'christmas', 'santa'],
              params: 'with_origin_country=RU&sort_by=vote_count.desc&vote_count.gte=5' },
            { type: 'discover', title: 'surs_ny_christmas', media: 'movie', keywords: ['christmas'],
              params: 'sort_by=popularity.desc&vote_count.gte=300' },
            { type: 'collection', queries: ['Home Alone'], prefix: true },
            { type: 'discover', title: 'surs_ny_soviet', media: 'movie', keywords: ['newyear', 'christmas', 'santa'],
              params: 'with_origin_country=SU&sort_by=vote_count.desc&vote_count.gte=5' },
            { type: 'discover', title: 'surs_ny_animation', media: 'movie', keywords: ['christmas', 'newyear', 'santa'],
              params: 'with_genres=' + GENRES.animation + '&sort_by=vote_count.desc&vote_count.gte=50' },
            { type: 'collection', queries: ['Ёлки', 'Yolki'], prefix: true },
            { type: 'discover', title: 'surs_ny_family', media: 'movie', keywords: ['christmas', 'newyear'],
              params: 'with_genres=' + GENRES.family + ',' + GENRES.comedy + '&sort_by=vote_count.desc&vote_count.gte=100' },
            { type: 'collection', queries: ['The Santa Clause'], prefix: true },
            { type: 'discover', title: 'surs_ny_series', media: 'tv', keywords: ['christmas', 'newyear', 'santa'],
              params: 'sort_by=vote_count.desc&vote_count.gte=20' },
            { type: 'discover', title: 'surs_ny_winter', media: 'movie', keywords: ['winter'],
              params: 'with_genres=' + GENRES.fantasy + '|' + GENRES.family + '&sort_by=vote_count.desc&vote_count.gte=100' },
            { type: 'collection', queries: ['The Chronicles of Narnia', 'Narnia'], prefix: true },
            { type: 'discover', title: 'surs_ny_romance', media: 'movie', keywords: ['christmas', 'newyear'],
              params: 'with_genres=' + GENRES.romance + '&sort_by=vote_count.desc&vote_count.gte=50' },
            { type: 'collection', queries: ['Frozen'], prefix: true },
            { type: 'collection', queries: ['The Lord of the Rings'], title: 'surs_ny_marathon' },
            { type: 'collection', queries: ['The Hobbit'], title: 'surs_ny_marathon' },
            { type: 'discover', title: 'surs_ny_fresh', media: 'movie', keywords: ['christmas', 'newyear'],
              params: 'primary_release_date.gte=' + isoDate(365 * 2) + '&primary_release_date.lte=' + isoDate(0) + '&sort_by=popularity.desc&vote_count.gte=10' }
        ];
    }

    /* =====================================================================
     *  ЗАГРУЗКА РЯДОВ
     * ===================================================================== */

    function EMPTY() {
        return { results: [] };
    }

    function withPictures(list) {
        return (list || []).filter(function (item) {
            return item && (item.poster_path || item.backdrop_path);
        });
    }

    /** id ключевых слов группы (по точному названию), кеш в памяти + кеш Lampa */
    var keywordIds = {};

    function resolveKeyword(owner, name, done) {
        if (keywordIds.hasOwnProperty(name)) return done(keywordIds[name]);

        owner.get('search/keyword?query=' + encodeURIComponent(name), {}, function (json) {
            var found = null;
            (json && json.results || []).forEach(function (k) {
                if (!found && String(k.name || '').toLowerCase() === name) found = k.id;
            });
            keywordIds[name] = found;
            done(found);
        }, function () {
            done(null); // ошибку не запоминаем — попробуем при следующем открытии
        }, { life: CONFIG.searchLife });
    }

    function resolveGroups(owner, groups, done) {
        var names = [];
        groups.forEach(function (g) { names = names.concat(KEYWORDS[g] || []); });

        var ids = [];
        var left = names.length;
        if (!left) return done(ids);

        names.forEach(function (name) {
            resolveKeyword(owner, name, function (id) {
                if (id && ids.indexOf(id) < 0) ids.push(id);
                if (--left === 0) done(ids);
            });
        });
    }

    function sursFilter(url) {
        try {
            if (window.SURS && typeof window.SURS.keywordsFilter === 'function') return window.SURS.keywordsFilter(url);
        } catch (e) {}
        return url;
    }

    function discoverRow(owner, spec) {
        return function (call) {
            resolveGroups(owner, spec.keywords, function (ids) {
                if (!ids.length) return call(EMPTY());

                var url = sursFilter('discover/' + spec.media + '?with_keywords=' + ids.join('|') + '&' + spec.params +
                    (spec.media === 'movie' ? '&' + WITHOUT_GENRES : ''));

                owner.get(url, {}, function (json) {
                    if (!json || !Array.isArray(json.results)) return call(EMPTY());
                    json.results = withPictures(json.results);
                    json.title = t(spec.title);
                    call(json);
                }, function () {
                    call(EMPTY());
                }, { life: CONFIG.cacheLife });
            });
        };
    }

    function collectionRow(owner, spec) {
        return function (call) {
            var queries = spec.queries.slice();

            function next() {
                var query = queries.shift();
                if (!query) return call(EMPTY());

                owner.get('search/collection?query=' + encodeURIComponent(query), {}, function (json) {
                    var found = json && json.results && json.results[0];
                    if (!found) return next();

                    owner.get('collection/' + found.id, {}, function (collection) {
                        var today = isoDate(0);
                        // только вышедшие части (без анонсов вроде «Холодное сердце 3»)
                        var parts = withPictures(collection && collection.parts).filter(function (p) {
                            return p.release_date && p.release_date <= today;
                        }).sort(function (a, b) {
                            return (a.release_date || '9999') < (b.release_date || '9999') ? -1 : 1;
                        });

                        if (parts.length < 2) return call(EMPTY());

                        parts.forEach(function (p) { if (!p.source) p.source = 'tmdb'; });

                        // «Гарри Поттер (Коллекция)» → «Гарри Поттер»
                        var name = String(collection.name || found.name || '')
                            .replace(/\s*\((коллекция|колекція|collection)\)\s*$/i, '')
                            .replace(/\s+(collection|коллекция)\s*$/i, '');

                        call({
                            title: spec.title ? t(spec.title) + ': ' + name : t('surs_ny_collection') + ': ' + name,
                            results: parts
                        });
                    }, function () {
                        call(EMPTY());
                    }, { life: CONFIG.searchLife });
                }, function () {
                    next();
                }, { life: CONFIG.searchLife });
            }

            next();
        };
    }

    /* =====================================================================
     *  ИСТОЧНИК И СТРАНИЦА
     * ===================================================================== */

    function registerSource() {
        var tmdb = Lampa.Api.sources && Lampa.Api.sources.tmdb;
        if (!tmdb) return false;

        var source = {};
        for (var key in tmdb) {
            if (Object.prototype.hasOwnProperty.call(tmdb, key)) source[key] = tmdb[key];
        }

        source.discovery = false;

        source.main = function (params, oncomplite, onerror) {
            var parts = rows().map(function (spec) {
                return spec.type === 'collection' ? collectionRow(source, spec) : discoverRow(source, spec);
            });

            var loadPart = function (partLoaded, partEmpty) {
                Lampa.Api.partNext(parts, CONFIG.partsLimit, partLoaded, partEmpty);
            };

            loadPart(oncomplite, onerror);

            return loadPart;
        };

        Lampa.Api.sources[CONFIG.source] = source;
        return true;
    }

    function openPage() {
        Lampa.Activity.push({
            url: '',
            title: t('surs_ny_title'),
            component: 'main',
            source: CONFIG.source,
            page: 1
        });
    }

    /* =====================================================================
     *  КНОПКА В НАВИГАЦИОННОМ РЯДУ SURS
     * ===================================================================== */

    var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M12 2l1.1 2.2 2.4.3-1.8 1.6.5 2.4L12 7.3 9.8 8.5l.5-2.4-1.8-1.6 2.4-.3z" fill="#ffd23f" stroke="#ffd23f" stroke-width="1"/>' +
        '<path d="M12 8.5l-4 5h2.2L7 17.5h3V21h4v-3.5h3l-3.2-4H16z"/>' +
        '<circle cx="10.4" cy="14.8" r=".7" fill="#ff4d4d" stroke="none"/>' +
        '<circle cx="13.8" cy="16.6" r=".7" fill="#4dc3ff" stroke="none"/>' +
        '<circle cx="12.6" cy="12.4" r=".6" fill="#ffd23f" stroke="none"/>' +
        '</svg>';

    function inSeason() {
        if (!CONFIG.seasonOnly) return true;

        var d = new Date();
        var md = ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
        var from = CONFIG.season.from;
        var to = CONFIG.season.to;

        // сезон может переходить через Новый год (12-01 … 01-15)
        return from <= to ? (md >= from && md <= to) : (md >= from || md <= to);
    }

    function addNavButton() {
        var data = {
            id: 'surs_new_year',
            title: t('surs_ny_button'),
            icon: ICON,
            position: CONFIG.position,
            action: openPage
        };

        if (typeof window.surs_addExternalButton === 'function') return window.surs_addExternalButton(data);

        // ряд кнопок ещё не загружен — он прочитает общий массив сам
        var list = window.surs_external_buttons || (window.surs_external_buttons = []);
        for (var i = list.length - 1; i >= 0; i--) {
            if (list[i].id === data.id) list.splice(i, 1);
        }
        list.push(data);
    }

    /* =====================================================================
     *  ЗАПУСК
     * ===================================================================== */

    function init() {
        if (!registerSource()) {
            console.error('SURS New Year', 'Lampa.Api.sources.tmdb недоступен');
            return;
        }

        if (inSeason()) addNavButton();

        // API для других плагинов и отладки
        window.surs_new_year = { open: openPage, rows: rows };
    }

    if (window.appready) init();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') init();
        });
    }
})();
