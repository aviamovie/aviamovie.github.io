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
        searchLife: 60 * 24 * 30, // кеш поиска коллекций и ключевых слов — 30 суток
        snow: true                // снег на странице (в простом интерфейсе — нет)
    };

    /* =====================================================================
     *  ПЕРЕВОДЫ
     * ===================================================================== */

    Lampa.Lang.add({
        surs_ny_button:      { ru: 'Новогодние каникулы', en: 'New Year holidays', uk: 'Новорічні канікули' },
        surs_ny_title:       { ru: 'Новогодние каникулы', en: 'New Year holidays', uk: 'Новорічні канікули' },
        surs_ny_collection:  { ru: 'Коллекция', en: 'Collection', uk: 'Колекція' },
        surs_ny_russian:     { ru: 'Российские новогодние фильмы', en: 'Russian New Year movies', uk: 'Російські новорічні фільми' },
        surs_ny_soviet:      { ru: 'Советская классика на праздники', en: 'Soviet classics for the holidays', uk: 'Радянська класика на свята' },
        surs_ny_soviet_ny:   { ru: 'Советские новогодние фильмы', en: 'Soviet New Year movies', uk: 'Радянські новорічні фільми' },
        surs_ny_christmas:   { ru: 'Рождественские фильмы', en: 'Christmas movies', uk: 'Різдвяні фільми' },
        surs_ny_world_family:  { ru: 'Семейная рождественская классика мира', en: 'Family Christmas classics', uk: 'Сімейна різдвяна класика світу' },
        surs_ny_world_romance: { ru: 'Рождественские романтические комедии', en: 'Christmas romantic comedies', uk: 'Різдвяні романтичні комедії' },
        surs_ny_animation:   { ru: 'Новогодние мультфильмы', en: 'Holiday cartoons', uk: 'Новорічні мультфільми' },
        surs_ny_winter:      { ru: 'Зимние сказки', en: 'Winter fairy tales', uk: 'Зимові казки' },
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
     * Подборки по рейтингу Кинопоиска «Лучшие российские и советские фильмы
     * про Новый год и Рождество» и тому, что пересматривают на праздниках.
     * id проверены по TMDB (ноябрь 2026): название, год, режиссёр.
     * Не вошли: «Юбилей» (2007 — в TMDB нет), «Лузер», «Убить карпа»,
     * «Дед Мороз поневоле» (в TMDB без постера), «Ёлки» и «Ёлки 2» — есть коллекция.
     */
    var SOVIET_NY = [
        43430,  // Ирония судьбы, или С лёгким паром!
        83429,  // Вечера на хуторе близ Диканьки
        20932,  // Морозко
        41977,  // Чародеи
        63258,  // Карнавальная ночь
        65136,  // Старый Новый год
        46588,  // Зигзаг удачи
        66086,  // Новогодние приключения Маши и Вити
        14493,  // Снежная королева (1966)
        302436, // Снегурочка (1968)
        65080,  // Эта весёлая планета
        544375, // Снегурочку вызывали?
        535512  // Похищение (в TMDB — «Новогоднее похищение», реж. Юрий Сааков)
    ];

    var RUSSIAN_NY = [
        71662,   // Приходи на меня посмотреть
        143056,  // Сирота казанская
        465081,  // Невеста
        57770,   // Бедная Саша
        154662,  // Кушать подано!
        152396,  // Железнодорожный романс
        152155,  // Со мною вот что происходит
        337690,  // Снежная любовь, или Сон в зимнюю ночь
        62683,   // Мужчина в моей голове
        50530,   // Тариф Новогодний
        169127,  // Снежный ангел
        133976,  // Француз
        321345,  // Четвёртое желание
        223205,  // Суженый-ряженый
        614875,  // Моя мама Снегурочка
        83456,   // О чём ещё говорят мужчины
        65950,   // Глухарь. Приходи, Новый год!
        434134,  // Президент и его внучка
        523874,  // Ночь закрытых дверей
        56549,   // Операция «С новым годом»
        558171,  // Новогодние сваты
        64063,   // Прощайте, доктор Фрейд
        71348,   // Странное Рождество
        1420601, // Кто приходит в зимний вечер
        64061,   // С Новым годом, папа!
        62681,   // Новогодний детектив
        461617,  // 32 декабря
        64057,   // Тушите свет
        143055,  // Сверчок за очагом
        137805,  // Ой, мороз, мороз!
        625239   // Откройте, Дед Мороз!
    ];

    // классика, которую пересматривают на праздниках (не про Новый год)
    var SOVIET_CLASSICS = [
        20803, // Иван Васильевич меняет профессию
        20871, // Джентльмены удачи
        31139, // Служебный роман
        20975, // Девчата
        20875, // Операция «Ы» и другие приключения Шурика
        20873, // Бриллиантовая рука
        20878, // Кавказская пленница
        21028  // Москва слезам не верит
    ];

    /**
     * Что смотрят на Рождество и Новый год в других странах (США, Великобритания,
     * Европа) — семейное и романтическое. id проверены по TMDB (ноябрь 2026).
     */
    var WORLD_FAMILY = [
        10719,  // Эльф
        5255,   // Полярный экспресс
        508965, // Клаус
        51052,  // Секретная служба Санта-Клауса (Arthur Christmas)
        10437,  // Рождественская сказка Маппетов
        1585,   // Эта замечательная жизнь
        8871,   // Гринч — похититель Рождества (2000)
        360920, // Гринч (2018)
        9479,   // Кошмар перед Рождеством
        5825,   // Рождественские каникулы
        10510,  // Чудо на 34-й улице
        17979,  // Рождественская история (2009)
        5375,   // Фред Клаус, брат Санты
        454467, // Николь (Noelle)
        13673,  // Рождество с неудачниками
        9745    // Джек Фрост
    ];

    var WORLD_ROMANCE = [
        508,    // Реальная любовь
        1581,   // Отпуск по обмену
        549053, // Рождество на двоих (Last Christmas)
        12193,  // Четыре Рождества
        9778,   // Интуиция (Serendipity)
        2064,   // Пока ты спал
        9043,   // Привет семье!
        520172, // Самый счастливый сезон
        615665, // Пара на праздники (Holidate)
        833097, // Незабываемое Рождество
        295151, // Пусть идёт снег
        810873, // Компания на праздники
        734265, // Неуловимый аромат любви
        555850  // Праздничный календарь
    ];

    function movies(ids) {
        return ids.map(function (id) { return ['movie', id]; });
    }

    /**
     * Ряды страницы (порядок перемешивается при каждом открытии). type:
     *  collection — коллекция TMDB: id (надёжно) или queries — варианты названия;
     *               name — своё название вместо названия TMDB;
     *  list       — фильмы по id TMDB (items — [тип, id]; limit — сколько
     *               случайных взять за открытие, без него — все по порядку);
     *  discover   — discover/{media} с ключевыми словами (keywords — группы из KEYWORDS,
     *               объединяются через «или») и доп. параметрами.
     */
    function rows() {
        return [
            { type: 'collection', queries: ['Harry Potter'], prefix: true },
            { type: 'collection', queries: ['Home Alone'], prefix: true },
            { type: 'list', title: 'surs_ny_soviet_ny', items: movies(SOVIET_NY) },
            { type: 'list', title: 'surs_ny_russian', items: movies(RUSSIAN_NY), limit: 20 },
            { type: 'list', title: 'surs_ny_soviet', items: movies(SOVIET_CLASSICS) },
            { type: 'collection', queries: ['Ёлки', 'Yolki'], prefix: true },
            { type: 'discover', title: 'surs_ny_christmas', media: 'movie', keywords: ['christmas'],
              params: 'sort_by=popularity.desc&vote_count.gte=300' },
            { type: 'collection', queries: ['Последний богатырь', 'The Last Warrior'], prefix: true },
            { type: 'discover', title: 'surs_ny_animation', media: 'movie', keywords: ['christmas', 'newyear', 'santa'],
              params: 'with_genres=' + GENRES.animation + '&sort_by=vote_count.desc&vote_count.gte=50' },
            { type: 'collection', queries: ['Три богатыря'], prefix: true },
            { type: 'list', title: 'surs_ny_world_family', items: movies(WORLD_FAMILY), limit: WORLD_FAMILY.length },
            { type: 'collection', queries: ['Холоп'], prefix: true },
            { type: 'collection', queries: ['Чебурашка'], prefix: true },
            { type: 'discover', title: 'surs_ny_winter', media: 'movie', keywords: ['winter'],
              params: 'with_genres=' + GENRES.fantasy + '|' + GENRES.family + '&sort_by=vote_count.desc&vote_count.gte=100' },
            { type: 'collection', queries: ['Иван Царевич и Серый волк'], prefix: true },
            { type: 'collection', queries: ['The Chronicles of Narnia', 'Narnia'], prefix: true },
            { type: 'list', title: 'surs_ny_world_romance', items: movies(WORLD_ROMANCE), limit: WORLD_ROMANCE.length },
            { type: 'collection', queries: ['Frozen'], prefix: true },
            { type: 'collection', queries: ['The Lord of the Rings'], title: 'surs_ny_marathon' },
            { type: 'collection', queries: ['The Hobbit'], title: 'surs_ny_marathon' },

            // зарубежные коллекции на каникулы: семейные…
            { type: 'collection', id: 488924, prefix: true },               // Приключения Паддингтона
            { type: 'collection', id: 743824, prefix: true },               // Рождественские хроники
            { type: 'collection', id: 239595, name: 'Лучшее Рождество', prefix: true }, // Nativity!
            { type: 'collection', id: 307637, prefix: true },               // Подарок на Рождество
            { type: 'collection', id: 201873, prefix: true },               // Рождественская история (A Christmas Story)
            { type: 'collection', id: 99727, prefix: true },                // Стюарт Литтл
            { type: 'collection', id: 85943, prefix: true },                // Ночь в музее
            { type: 'collection', id: 527439, prefix: true },               // Мэри Поппинс
            { type: 'collection', id: 435259, name: 'Фантастические твари', prefix: true },
            // …и романтические
            { type: 'collection', id: 526203, prefix: true },               // Принц на Рождество
            { type: 'collection', id: 8936, prefix: true },                 // Бриджит Джонс
            { type: 'discover', title: 'surs_ny_fresh', media: 'movie', keywords: ['christmas', 'newyear'],
              params: 'primary_release_date.gte=' + isoDate(365 * 2) + '&primary_release_date.lte=' + isoDate(0) + '&sort_by=popularity.desc&vote_count.gte=10' }
        ];
    }

    function shuffle(list) {
        for (var i = list.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = list[i];
            list[i] = list[j];
            list[j] = tmp;
        }
        return list;
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

    /** Фильмы и сериалы по id: запросы параллельно, порядок как в списке, кеш 30 дней */
    function listRow(owner, spec) {
        return function (call) {
            var results = [];
            var items = spec.limit ? shuffle(spec.items.slice()).slice(0, spec.limit) : spec.items;
            var left = items.length;

            items.forEach(function (item, index) {
                owner.get(item[0] + '/' + item[1], {}, function (json) {
                    if (json && json.id && (json.poster_path || json.backdrop_path)) {
                        // нет русского названия — оригинальное («Тариф Новогодний»)
                        if (!String(json.title || '').replace(/\s+/g, '') && json.original_title) json.title = json.original_title;
                        json.source = 'tmdb';
                        results[index] = json;
                    }
                    done();
                }, done, { life: CONFIG.searchLife });
            });

            function done() {
                if (--left) return;
                call({ title: t(spec.title), results: results.filter(Boolean) });
            }
        };
    }

    function collectionRow(owner, spec) {
        return function (call) {
            var queries = (spec.queries || []).slice();

            function load(found) {
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
                    var name = spec.name || String(collection.name || found.name || '')
                        .replace(/\s*\((коллекция|колекція|collection)\)\s*$/i, '')
                        .replace(/\s+(collection|коллекция)\s*$/i, '');

                    call({
                        title: spec.title ? t(spec.title) + ': ' + name : t('surs_ny_collection') + ': ' + name,
                        results: parts
                    });
                }, function () {
                    call(EMPTY());
                }, { life: CONFIG.searchLife });
            }

            if (spec.id) return load({ id: spec.id });

            function next() {
                var query = queries.shift();
                if (!query) return call(EMPTY());

                owner.get('search/collection?query=' + encodeURIComponent(query), {}, function (json) {
                    var found = json && json.results && json.results[0];
                    if (!found) return next();
                    load(found);
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
            var parts = shuffle(rows()).map(function (spec) {
                if (spec.type === 'collection') return collectionRow(source, spec);
                if (spec.type === 'list') return listRow(source, spec);
                return discoverRow(source, spec);
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

    // новогодний шарик: петелька, колпачок, шар с узором
    // красный новогодний шарик: золотые петелька и колпачок, белый узор, блик
    var ICON = '<svg viewBox="2 0.4 20 23.8" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M10.2 2.6a1.8 1.8 0 0 1 3.6 0" stroke="#ffd23f" stroke-width="1.6" stroke-linecap="round"/>' +
        '<rect x="9.3" y="2.9" width="5.4" height="2.8" rx=".7" fill="#ffd23f"/>' +
        '<circle cx="12" cy="14.2" r="8.8" fill="#e53935" stroke="#ff8a80" stroke-width="1"/>' +
        '<path d="M3.6 11.4c2.7 1.6 5.5 1.6 8.4 0s5.7-1.6 8.4 0" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>' +
        '<path d="M3.6 17c2.7-1.6 5.5-1.6 8.4 0s5.7 1.6 8.4 0" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>' +
        '<circle cx="7.6" cy="14.2" r="1.2" fill="#ffd23f"/>' +
        '<circle cx="12" cy="14.2" r="1.2" fill="#ffffff"/>' +
        '<circle cx="16.4" cy="14.2" r="1.2" fill="#ffd23f"/>' +
        '<path d="M7.4 8.6a6.2 6.2 0 0 1 3-1.6" stroke="#ffffff" stroke-width="1.3" stroke-linecap="round" opacity=".7"/>' +
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
     *  СНЕГ НА СТРАНИЦЕ
     *  Лёгкий: SNOW.count снежинок — точки из CSS, анимация только transform
     *  (её считает видеокарта, без JS-цикла и перерисовки страницы).
     *  Слой — внутри страницы: уходит вместе с ней, под меню и плеером не виден.
     *  Нет в простом интерфейсе («Для старых устройств») и при CONFIG.snow = false.
     * ===================================================================== */

    var SNOW = { count: 28, minSize: 4, maxSize: 9, minTime: 9, maxTime: 20 };
    var snowStyles = false;

    function snowAllowed() {
        if (!CONFIG.snow) return false;
        if (Lampa.Storage.get('surs_simple_interface', 'full') === 'simple') return false;
        return true;
    }

    function addSnowStyles() {
        if (snowStyles) return;
        snowStyles = true;

        var style = document.createElement('style');
        style.textContent = [
            '.surs-snow{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;pointer-events:none;z-index:5}',
            '.surs-snow i{position:absolute;top:-2%;display:block;border-radius:50%;background:#fff;will-change:transform;',
            '-webkit-animation:surs-snow-a linear infinite;animation:surs-snow-a linear infinite}',
            '.surs-snow i.b{-webkit-animation-name:surs-snow-b;animation-name:surs-snow-b}',
            '@-webkit-keyframes surs-snow-a{from{-webkit-transform:translate3d(0,-10vh,0)}to{-webkit-transform:translate3d(6vw,105vh,0)}}',
            '@keyframes surs-snow-a{from{transform:translate3d(0,-10vh,0)}to{transform:translate3d(6vw,105vh,0)}}',
            '@-webkit-keyframes surs-snow-b{from{-webkit-transform:translate3d(0,-10vh,0)}to{-webkit-transform:translate3d(-6vw,105vh,0)}}',
            '@keyframes surs-snow-b{from{transform:translate3d(0,-10vh,0)}to{transform:translate3d(-6vw,105vh,0)}}'
        ].join('');
        document.head.appendChild(style);
    }

    function rnd(min, max) {
        return min + Math.random() * (max - min);
    }

    function addSnow(layer) {
        if (!layer || !snowAllowed() || layer.querySelector('.surs-snow')) return;

        addSnowStyles();

        var box = document.createElement('div');
        box.className = 'surs-snow';

        var html = '';
        for (var i = 0; i < SNOW.count; i++) {
            var size = rnd(SNOW.minSize, SNOW.maxSize).toFixed(1);
            var time = rnd(SNOW.minTime, SNOW.maxTime).toFixed(1);
            var delay = rnd(0, time).toFixed(1);
            html += '<i class="' + (i % 2 ? 'b' : '') + '" style="left:' + rnd(0, 100).toFixed(1) + '%;width:' + size + 'px;height:' + size + 'px;' +
                'opacity:' + rnd(0.35, 0.9).toFixed(2) + ';' +
                '-webkit-animation-duration:' + time + 's;animation-duration:' + time + 's;' +
                // отрицательная задержка — снег сразу по всему экрану, а не «из-за верхнего края»
                '-webkit-animation-delay:-' + delay + 's;animation-delay:-' + delay + 's"></i>';
        }
        box.innerHTML = html;

        layer.appendChild(box);
    }

    function followSnow() {
        Lampa.Listener.follow('activity', function (e) {
            if (e.type !== 'start' || !e.object || e.object.source !== CONFIG.source) return;
            try {
                addSnow(e.object.activity && e.object.activity.render(true));
            } catch (err) {}
        });
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

        followSnow();

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
