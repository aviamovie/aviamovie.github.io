/*
 * SURS — подборки на главной для Lampa 3.x (рефакторинг v3 → Lampa V3 API)
 *
 * Описание изменений относительно прежней v3 — test/lampa3/README.md
 *
 * Требования: Lampa.Manifest.app_digital >= 300
 */
(function () {
    'use strict';

    if (window.plugin_surs_ready) return;
    window.plugin_surs_ready = true;

    /* =====================================================================
     *  КОНФИГ
     * ===================================================================== */

    var CONFIG = {
        partsLimit: 9,          // сколько рядов грузится за одну порцию (Api.partNext)
        wideChance: 0.2,        // вероятность, что ряд будет отрисован широкими карточками
        cacheLife: 60 * 6,      // кеш запросов TMDB в минутах (Lampa.Request cache, V3)
        liteScreen: 'surs',     // экран ContentRows для источников NEW / KIDS / RUS
        personsCount: 8,        // сколько рядов «актёр → фильмы» на главной SURS
        rusPersonsMain: 6,      // рядов российских актёров на главной SURS
        rusPersonsRus: 9,       // рядов российских актёров на SURS RUS
        keywordRows: 10,         // рядов по ключевым словам на главной SURS
        collectionRows: 10,      // рядов-коллекций (франшиз) за одно открытие
        searchCacheLife: 60 * 24 * 30, // поиск коллекций/актёров по имени — кеш 30 дней
        spreadFrom: 3,          // «разносимые» ряды (стриминги, жанры, студии, продолжить просмотр,
        spreadTo: 20,           //  ближайшие/недавние эпизоды) — случайно на рядах 3–20, не рядом друг с другом
        settingsComponent: 'surs'
    };

    /* =====================================================================
     *  СПРАВОЧНИКИ
     * ===================================================================== */

    var SORT_OPTIONS = [
        { id: 'vote_count.desc',     title: 'surs_vote_count_desc' },
        { id: 'vote_average.desc',   title: 'surs_vote_average_desc' },
        { id: 'first_air_date.desc', title: 'surs_first_air_date_desc' },
        { id: 'popularity.desc',     title: 'surs_popularity_desc' },
        { id: 'revenue.desc',        title: 'surs_revenue_desc' }
    ];

    var SORT_NEW = { id: 'first_air_date.desc', title: 'surs_first_air_date_desc' };

    var GENRES = [
        { id: 28,    title: 'surs_genre_action' },
        { id: 35,    title: 'surs_genre_comedy' },
        { id: 18,    title: 'surs_genre_drama' },
        { id: 10749, title: 'surs_genre_romance' },
        { id: 16,    title: 'surs_genre_animation' },
        { id: 10762, title: 'surs_genre_kids' },
        { id: 12,    title: 'surs_genre_adventure' },
        { id: 80,    title: 'surs_genre_crime' },
        { id: 9648,  title: 'surs_genre_mystery' },
        { id: 878,   title: 'surs_genre_sci_fi' },
        { id: 37,    title: 'surs_genre_western' },
        { id: 53,    title: 'surs_genre_thriller' },
        { id: 10751, title: 'surs_genre_family' },
        { id: 14,    title: 'surs_genre_fantasy' },
        { id: 10764, title: 'surs_genre_reality' },
        { id: 10759, title: 'surs_genre_action_adventure' },
        { id: 10766, title: 'surs_genre_soap' },
        { id: 10767, title: 'surs_genre_talk_show' }
    ];

    var KIDS_GENRE_IDS = [28, 35, 16, 10762, 12, 878, 10751, 14];

    var STREAMING_GLOBAL = [
        { id: 49,   title: 'HBO' },
        { id: 77,   title: 'SyFy' },
        { id: 2552, title: 'Apple TV+' },
        { id: 453,  title: 'Hulu' },
        { id: 1024, title: 'Amazon Prime' },
        { id: 213,  title: 'Netflix' },
        { id: 3186, title: 'HBO Max' },
        { id: 2076, title: 'Paramount network' },
        { id: 4330, title: 'Paramount+' },
        { id: 3353, title: 'Peacock' },
        { id: 2739, title: 'Disney+' },
        { id: 2,    title: 'ABC' },
        { id: 6,    title: 'NBC' },
        { id: 16,   title: 'CBS' },
        { id: 318,  title: 'Starz' },
        { id: 174,  title: 'AMC' },
        { id: 19,   title: 'FOX' },
        { id: 64,   title: 'Discovery' },
        { id: 1778, title: 'test' },
        { id: 493,  title: 'BBC America' },
        { id: 88,   title: 'FX' },
        { id: 67,   title: 'Showtime' }
    ];

    var STREAMING_RUS = [
        { id: 2493, title: 'Start' },
        { id: 2859, title: 'Premier' },
        { id: 4085, title: 'KION' },
        { id: 3923, title: 'ИВИ' },
        { id: 412,  title: 'Россия 1' },
        { id: 558,  title: 'Первый канал' },
        { id: 3871, title: 'Okko' },
        { id: 3827, title: 'Кинопоиск' },
        { id: 5806, title: 'Wink' },
        { id: 806,  title: 'СТС' },
        { id: 1191, title: 'ТНТ' },
        { id: 1119, title: 'НТВ' },
        { id: 3031, title: 'Пятница' },
        { id: 3882, title: 'More.TV' }
    ];

    var STREAMING_KIDS = [
        { id: 49,   title: 'HBO' },
        { id: 77,   title: 'SyFy' },
        { id: 2552, title: 'Apple TV+' },
        { id: 453,  title: 'Hulu' },
        { id: 1024, title: 'Amazon Prime' },
        { id: 213,  title: 'Netflix' },
        { id: 3186, title: 'HBO Max' },
        { id: 2076, title: 'Paramount+' },
        { id: 4330, title: 'Paramount+' },
        { id: 3353, title: 'Peacock' },
        { id: 2739, title: 'Disney+' },
        { id: 44,   title: 'Disney XD' },
        { id: 281,  title: 'Disney XD' },
        { id: 2,    title: 'ABC' },
        { id: 6,    title: 'NBC' },
        { id: 16,   title: 'CBS' },
        { id: 318,  title: 'Starz' },
        { id: 174,  title: 'BBC' },
        { id: 56,   title: 'Cartoon Network' },
        { id: 19,   title: 'FOX' },
        { id: 2686, title: 'FOX kids' },
        { id: 13,   title: 'Nickelodeon' }
    ].concat(STREAMING_RUS);

    var KIDS_KEYWORDS = [
        'Спанч Боб', 'Губка Боб', 'Teenage Mutant Ninja Turtles', 'Черепашки-ниндзя',
        'Fairly OddParents', 'Джимми Нейтрон', 'Аватар: Легенда об Аанге', 'Аватар: Легенда о Корре',
        'Lego', 'Том и Джерри', 'Микки Маус', 'Гуфи', 'Снупи', 'Простоквашино', 'Ну, погоди!',
        'Чип и Дейл', 'DuckTales', 'Looney Tunes', 'Покемон', 'Даша-путешественница', 'Свинка Пеппа',
        'Барбоскины', 'Смешарики', 'Фиксики', 'Гравити Фолз', 'Чудеса на виражах',
        'Пингвины из Мадагаскара', 'Король Лев', 'Холодное сердце', 'Как приручить дракона',
        'Зверополис', 'Миньоны', 'Шрэк', 'Маша и Медведь', 'Котенок по имени Гав', 'Чебурашка',
        'Малыш и Карлсон', 'Лунтик', 'Три богатыря', 'Иван Царевич и Серый Волк', 'Кот Леопольд',
        'Варежка', 'Каникулы Бонифация', 'Сказка о царе Салтане', 'Алеша Попович', 'Илья муромец',
        'Оранжевая корова', 'Малышарики', 'Winnie-the-Pooh', 'Щенячий патруль', 'Tiny Toon',
        'Обезьянки', 'Буратино'
    ];

    var KIDS_STUDIOS = [
        { id: 2,     title: 'Disney' },
        { id: 3,     title: 'Pixar' },
        { id: 7501,  title: 'Союзмультфильм' },
        { id: 14599, title: 'Союзмультфильм (СССР)' },
        { id: 521,   title: 'DreamWorks Animation' },
        { id: 9383,  title: 'Blue Sky Studios' },
        { id: 6704,  title: 'Illumination Entertainment' },
        { id: 2251,  title: 'Sony Pictures Animation' },
        { id: 10342, title: 'Studio Ghibli' }
    ];

    /*
     * Коллекции (франшизы) ищутся по названию через search/collection —
     * числовые id не зашиваем: поиск устойчив к ошибкам в справочнике,
     * не найденная коллекция просто не показывается. Кеш 30 дней.
     */
    var COLLECTIONS = [
        'Harry Potter', 'The Lord of the Rings', 'The Hobbit', 'Star Wars', 'The Avengers',
        'Fast & Furious', 'Jurassic Park', 'Mission: Impossible', 'James Bond', 'Pirates of the Caribbean',
        'The Matrix', 'Back to the Future', 'Indiana Jones', 'Alien', 'The Terminator', 'John Wick',
        'The Dark Knight', 'The Hunger Games', 'Transformers', 'Rocky', 'Die Hard', 'Men in Black',
        'X-Men', 'Mad Max', 'Kingsman', "Ocean's", 'The Godfather', 'Planet of the Apes', 'The Bourne',
        'Rambo', 'Guardians of the Galaxy', 'Dune', 'Sherlock Holmes', 'Lethal Weapon', 'Predator'
    ];

    var COLLECTIONS_KIDS = [
        'Toy Story', 'Shrek', 'Ice Age', 'Despicable Me', 'Madagascar', 'Kung Fu Panda',
        'How to Train Your Dragon', 'Cars', 'Frozen', 'Finding Nemo', 'The Incredibles',
        'Monsters, Inc.', 'Hotel Transylvania', 'Paddington', 'The Lion King', 'Stuart Little',
        'Home Alone', 'Alvin and the Chipmunks', 'The Secret Life of Pets', 'Sing', 'Cloudy with a Chance of Meatballs',
        'Три богатыря'
    ];

    var COLLECTIONS_RUS = [
        'Три богатыря', 'Ёлки', 'Холоп', 'Последний богатырь', 'Иван Царевич и Серый Волк',
        'Особенности национальной', 'Брат', 'Ирония судьбы', 'Кухня', 'Бременские музыканты',
        'Чебурашка', 'Смешарики', 'Горько', 'Духless', 'Т-34', 'Майор Гром', 'Вий',
        'Сказка о царе Салтане', 'Гардемарины', 'Мастер и Маргарита'
    ];

    /*
     * Российские актёры — тоже по имени (search/person). Из найденных берём того,
     * у кого в известных работах есть русскоязычный контент.
     */
    var RUSSIAN_ACTORS = [
        'Данила Козловский', 'Константин Хабенский', 'Сергей Безруков', 'Юра Борисов', 'Александр Петров',
        'Иван Янковский', 'Евгений Миронов', 'Владимир Машков', 'Сергей Гармаш', 'Фёдор Бондарчук',
        'Сергей Бурунов', 'Милош Бикович', 'Светлана Ходченкова', 'Елизавета Боярская', 'Юлия Снигирь',
        'Паулина Андреева', 'Любовь Аксёнова', 'Кирилл Кяро', 'Никита Ефремов', 'Гоша Куценко',
        'Дмитрий Нагиев', 'Иван Охлобыстин', 'Михаил Пореченков', 'Сергей Светлаков', 'Александр Яценко',
        'Евгений Цыганов', 'Ирина Старшенбаум', 'Аглая Тарасова', 'Тихон Жизневский', 'Максим Матвеев',
        'Андрей Мерзликин', 'Виктория Исакова', 'Олег Меньшиков', 'Анна Михалкова', 'Евгений Стычкин',
        'Алексей Серебряков', 'Владимир Вдовиченков', 'Павел Прилучный', 'Сергей Шнуров', 'Алексей Гуськов'
    ];

    // TMDB keyword ids
    var KEYWORDS = {
        base:  ['346488', '158718', '41278'],
        asian: ['13141', '345822', '315535', '290667', '323477', '290609'],
        anime: ['210024']
    };

    var FORBIDDEN_LANGUAGES = ['kr', 'cn', 'jp', 'ko', 'zh', 'ja'];
    var FORBIDDEN_COUNTRIES = ['KR', 'CN', 'JP'];

    /* =====================================================================
     *  УТИЛИТЫ
     * ===================================================================== */

    function t(key) {
        return Lampa.Lang.translate(key);
    }

    function pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    }

    function assign(target) {
        for (var i = 1; i < arguments.length; i++) {
            var src = arguments[i];
            if (!src) continue;
            for (var key in src) {
                if (Object.prototype.hasOwnProperty.call(src, key)) target[key] = src[key];
            }
        }
        return target;
    }

    /** Склеивает непустые части заголовка через пробел */
    function join() {
        return Array.prototype.filter.call(arguments, Boolean).join(' ');
    }

    function contains(arr, value) {
        return arr.indexOf(value) !== -1;
    }

    /** Дата YYYY-MM-DD со смещением в днях/месяцах от сегодня */
    function isoDate(days, months) {
        var d = new Date();
        if (months) d.setMonth(d.getMonth() + months);
        if (days) d.setDate(d.getDate() + days);
        return d.toISOString().split('T')[0];
    }

    /** Пятилетки с 1970 по текущий год (раньше последний период был жёстко 2020–2025) */
    function getPeriods() {
        var periods = [];
        var current = new Date().getFullYear();
        for (var start = 1970; start <= current; start += 5) {
            periods.push({ start: start, end: Math.min(start + 4, current) });
        }
        return periods;
    }

    function randomPeriods(count) {
        return shuffle(getPeriods().slice()).slice(0, count);
    }

    /* =====================================================================
     *  НАСТРОЙКИ (раздельно по профилям)
     * ===================================================================== */

    var Settings = {
        profileId: function () {
            return Lampa.Storage.get('lampac_profile_id', '') || 'default';
        },
        all: function () {
            return Lampa.Storage.get('surs_settings') || {};
        },
        get: function (key, defaultValue) {
            var profile = Settings.all()[Settings.profileId()] || {};
            return Object.prototype.hasOwnProperty.call(profile, key) ? profile[key] : defaultValue;
        },
        set: function (key, value) {
            var all = Settings.all();
            var id = Settings.profileId();
            if (!all[id]) all[id] = {};
            all[id][key] = value;
            Lampa.Storage.set('surs_settings', all);
            Settings.dirty = true;
        },
        reset: function () {
            var all = Settings.all();
            delete all[Settings.profileId()];
            Lampa.Storage.set('surs_settings', all);
            Settings.dirty = true;
        },
        dirty: false,
        toggle: function (key, defaultValue) {
            var value = !Settings.get(key, defaultValue);
            Settings.set(key, value);
            return value;
        },
        /** Включённые элементы списка. Если выключено всё — берём весь список (иначе pick() вернёт undefined) */
        enabled: function (items, prefix) {
            var result = items.filter(function (item) {
                return Settings.get(prefix + item.id, true);
            });
            return result.length ? result : items.slice();
        },
        count: function (items, prefix) {
            return items.filter(function (item) {
                return Settings.get(prefix + item.id, typeof item.def === 'boolean' ? item.def : true);
            }).length;
        }
    };

    function getSortOptions()      { return Settings.enabled(SORT_OPTIONS, 'sort_'); }
    function getGenres()           { return Settings.enabled(GENRES, 'genre_'); }
    function getStreamingGlobal()  { return Settings.enabled(STREAMING_GLOBAL, 'streaming_'); }
    function getStreamingRus()     { return Settings.enabled(STREAMING_RUS, 'streaming_rus_'); }
    function isUkrainian()         { return Lampa.Storage.get('language') === 'uk'; }

    /**
     * Уровень исключения ключевых слов.
     * В v3 меню писало ключ `without_keywords`, а фильтр читал `withoutKeywords`
     * (настройка не работала) — теперь один ключ, старый учитывается как запасной.
     */
    function getKeywordLevel() {
        return String(Settings.get('without_keywords', Settings.get('withoutKeywords', '1')));
    }

    /* =====================================================================
     *  ИМЕНА ИСТОЧНИКОВ
     * ===================================================================== */

    function sourceNames() {
        var base = Lampa.Storage.get('surs_name') || 'SURS';
        return {
            main: base,
            new:  base + ' NEW',
            kids: base + ' KIDS',
            rus:  base + ' RUS'
        };
    }

    function isSursSource(name) {
        var n = sourceNames();
        return name === n.main || name === n.new || name === n.kids || name === n.rus;
    }

    function isLiteSource(name) {
        var n = sourceNames();
        return name === n.new || name === n.kids || name === n.rus;
    }

    /* =====================================================================
     *  ФИЛЬТРЫ URL и РЕЗУЛЬТАТОВ
     * ===================================================================== */

    var Url = {
        minVotes: function (url, votes) {
            return votes > 0 ? url + '&vote_count.gte=' + votes : url;
        },
        certification: function (url, cert) {
            if (!cert) return url;
            return url + '&certification_country=RU&certification=' + encodeURIComponent(cert);
        },
        withoutKeywords: function (url, ids) {
            return url + '&without_keywords=' + encodeURIComponent(ids.join(','));
        },
        keywordsByLevel: function (level) {
            var ids = KEYWORDS.base.slice();
            if (level !== '0') ids = ids.concat(KEYWORDS.asian);
            if (level === '2') ids = ids.concat(KEYWORDS.anime);
            return ids;
        }
    };

    /** Фильтры из пользовательских настроек (основной источник SURS) */
    var UserFilters = {
        minVotes: function (url) {
            var votes = parseInt(Settings.get('minVotes', '10'), 10);
            return Url.minVotes(url, isNaN(votes) ? 10 : votes);
        },
        age: function (url) {
            var age = String(Settings.get('ageRestrictions', '') || '').trim();
            return contains(['0+', '6+', '12+', '16+', '18+'], age) ? Url.certification(url, age) : url;
        },
        keywords: function (url) {
            return Url.withoutKeywords(url, Url.keywordsByLevel(getKeywordLevel()));
        },
        all: function (url) {
            return UserFilters.keywords(UserFilters.age(UserFilters.minVotes(url)));
        },
        /** без порога голосов — для рядов с собственным vote_count.gte */
        safe: function (url) {
            return UserFilters.keywords(UserFilters.age(url));
        }
    };

    function containsCyrillic(value) {
        if (typeof value === 'string') return /[а-яА-ЯёЁїЇіІєЄґҐ]/.test(value);
        if (value && typeof value === 'object') {
            for (var key in value) {
                if (Object.prototype.hasOwnProperty.call(value, key) && containsCyrillic(value[key])) return true;
            }
        }
        return false;
    }

    /**
     * Фильтр «кириллица в карточке».
     * В v3 читалось глобальное Storage 'cirillic', а меню писало в профиль — исправлено.
     */
    function filterCyrillic(items) {
        var lang = Lampa.Storage.get('language');
        if (lang !== 'ru' && lang !== 'uk') return items;
        if (String(Settings.get('cirillic', '1')) === '0') return items;
        return items.filter(containsCyrillic);
    }

    function filterYearRange(type, start, end) {
        var field = type === 'movie' ? 'release_date' : 'first_air_date';
        return function (items) {
            return items.filter(function (item) {
                var year = item[field] ? parseInt(item[field].substring(0, 4), 10) : 0;
                return year >= start && year <= end;
            });
        };
    }

    /* =====================================================================
     *  СОРТИРОВКИ
     * ===================================================================== */

    /** Новинки фильмов: release_date.desc в окне [-26 мес; -40 дней] */
    function movieSort(sort) {
        var result = assign({}, sort);
        if (result.id === 'first_air_date.desc') result.id = 'release_date.desc';
        if (result.id === 'release_date.desc') {
            result.extra = '&release_date.gte=' + isoDate(0, -26) + '&release_date.lte=' + isoDate(-40);
        }
        return result;
    }

    /** Новинки сериалов: first_air_date.desc в окне [-18 мес; -10 дней] */
    function tvSort(sort) {
        var result = assign({}, sort);
        if (result.id === 'first_air_date.desc') {
            result.extra = '&first_air_date.gte=' + isoDate(0, -18) + '&first_air_date.lte=' + isoDate(-10);
        }
        return result;
    }

    /* =====================================================================
     *  ФАБРИКА РЯДОВ
     *
     *  Ряд — функция (call) => call({title, results, params}), как требует
     *  Lampa.Api.partNext. Параметры ряда вычисляются лениво (в момент
     *  загрузки), поэтому случайные сортировка/жанр меняются при каждом
     *  открытии главной.
     * ===================================================================== */

    function EMPTY() {
        return { results: [] };
    }

    /**
     * @param {object} owner  источник (имеет tmdb.get)
     * @param {object} params параметры активности main
     * @param {function():{url:string,title:string,filter?:function}} spec
     */
    function row(owner, params, spec) {
        return function (call) {
            var s = spec();
            owner.get(s.url, params, function (json) {
                if (!json || !Array.isArray(json.results)) return call(EMPTY());
                if (s.filter) json.results = s.filter(json.results);
                json.title = s.title;
                call(json);
            }, function () {
                call(EMPTY());
            }, { life: CONFIG.cacheLife });
        };
    }

    /** Ряд из нескольких запросов, склеенных в один */
    function mergedRow(owner, urls, title, postFilter) {
        return function (call) {
            var results = [];
            var left = urls.length;

            function done() {
                if (--left > 0) return;
                call({ title: title, results: postFilter ? postFilter(results) : results });
            }

            urls.forEach(function (url) {
                owner.get(url, {}, function (json) {
                    if (json && Array.isArray(json.results)) results = results.concat(json.results);
                    done();
                }, done, { life: CONFIG.cacheLife });
            });
        };
    }

    /** Иногда превращает ряд в «широкий» (V3: params.style / params.items) */
    function maybeWide(part) {
        return function (call) {
            part(function (json) {
                if (json && Array.isArray(json.results) && json.results.length && Math.random() < CONFIG.wideChance) {
                    json.results.forEach(function (card) {
                        card.params = assign(card.params || {}, { style: { name: 'wide' } });
                    });
                    json.params = assign(json.params || {}, { items: { view: 3 } });
                }
                call(json);
            });
        };
    }

    function sortByRating(items) {
        return items.sort(function (a, b) {
            return (b.vote_average || 0) - (a.vote_average || 0);
        });
    }

    /* =====================================================================
     *  ИСТОЧНИК SURS (основной)
     * ===================================================================== */

    var REGION = {
        // ruTitles: у российских/украинских подборок кириллица есть всегда — фильтр не нужен
        russian:   { country: 'RU', title: 'surs_russian',   ruTitles: true },
        ukrainian: { country: 'UA', title: 'surs_ukrainian', ruTitles: true },
        korean:    { country: 'KR', title: 'surs_korean' },
        turkish:   { country: 'TR', title: 'surs_turkish' }
    };

    function buildMain(owner, params) {
        var parts = [];
        var genres = getGenres();
        var rusIds = STREAMING_RUS.map(function (s) { return s.id; });
        var ua = isUkrainian();

        // --- стриминги ---
        var services = [];
        if (Settings.get('getStreamingServices', true)) services = services.concat(getStreamingGlobal());
        if (Settings.get('getStreamingServicesRUS', true)) services = services.concat(getStreamingRus());

        services.forEach(function (service) {
            var isRus = contains(rusIds, service.id);
            var filters = isRus ? UserFilters.safe : UserFilters.all;

            parts.push(row(owner, params, function () {
                var sort = pick(getSortOptions());
                var genre = pick(genres);
                return {
                    url: filters('discover/tv?with_networks=' + service.id + '&with_genres=' + genre.id + '&sort_by=' + sort.id),
                    title: t(sort.title) + ' (' + t(genre.title) + ') ' + t('surs_on') + ' ' + service.title,
                    filter: filterCyrillic
                };
            }));

            parts.push(row(owner, params, function () {
                var sort = pick(getSortOptions());
                return {
                    url: filters('discover/tv?with_networks=' + service.id + '&sort_by=' + sort.id),
                    title: t(sort.title) + ' ' + t('surs_on') + ' ' + service.title,
                    filter: filterCyrillic
                };
            }));
        });

        // --- фильмы по жанрам ---
        var movieRegions = [];
        if (Settings.get('getMoviesByGenreGlobal', true)) movieRegions.push(null);
        if (Settings.get('getMoviesByGenreRus', true))    movieRegions.push(REGION.russian);
        if (Settings.get('getMoviesByGenreUA', ua))       movieRegions.push(REGION.ukrainian);

        // --- сериалы по жанрам ---
        var tvRegions = [];
        if (Settings.get('getTVShowsByGenreGlobal', true)) tvRegions.push(null);
        if (Settings.get('getTVShowsByGenreRus', true))    tvRegions.push(REGION.russian);
        if (Settings.get('getTVShowsByGenreKOR', false))   tvRegions.push(REGION.korean);
        if (Settings.get('getTVShowsByGenreTR', true))     tvRegions.push(REGION.turkish);
        if (Settings.get('getTVShowsByGenreUA', ua))       tvRegions.push(REGION.ukrainian);

        genres.forEach(function (genre) {
            movieRegions.forEach(function (region) {
                parts.push(row(owner, params, function () {
                    var sort = movieSort(pick(getSortOptions()));
                    var url = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.id;
                    if (region) url += '&with_origin_country=' + region.country;
                    if (sort.extra) url += sort.extra;
                    return {
                        url: UserFilters.all(url),
                        title: join(t(sort.title), region && t(region.title), '(' + t(genre.title) + ')'),
                        filter: region && region.ruTitles ? null : filterCyrillic
                    };
                }));
            });

            tvRegions.forEach(function (region) {
                parts.push(row(owner, params, function () {
                    var sort = tvSort(pick(getSortOptions()));
                    var url = 'discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.id;
                    if (region) url += '&with_origin_country=' + region.country;
                    if (sort.extra) url += sort.extra;
                    return {
                        url: UserFilters.all(url),
                        title: join(t(sort.title), region && t(region.title), t('surs_tv_shows'), '(' + t(genre.title) + ')'),
                        filter: region && region.ruTitles ? null : filterCyrillic
                    };
                }));
            });
        });

        // --- топ за всё время ---
        var bestTypes = [];
        if (Settings.get('getBestContentByGenreMovie', true)) bestTypes.push('movie');
        if (Settings.get('getBestContentByGenreTV', true))    bestTypes.push('tv');

        genres.forEach(function (genre) {
            bestTypes.forEach(function (type) {
                parts.push(row(owner, params, function () {
                    return {
                        url: UserFilters.safe('discover/' + type + '?with_genres=' + genre.id + '&sort_by=vote_average.desc&vote_count.gte=500'),
                        title: t(type === 'movie' ? 'surs_top_movies' : 'surs_top_tv') + ' (' + t(genre.title) + ')',
                        filter: filterCyrillic
                    };
                }));
            });
        });

        // --- топ за пятилетку ---
        var periodTypes = [];
        if (Settings.get('getBestContentByGenreAndPeriod_movie', true)) periodTypes.push('movie');
        if (Settings.get('getBestContentByGenreAndPeriod_tv', true))    periodTypes.push('tv');

        genres.forEach(function (genre) {
            randomPeriods(2).forEach(function (period) {
                periodTypes.forEach(function (type) {
                    parts.push(periodRow(owner, params, type, genre, period, UserFilters.safe));
                });
            });
        });

        if (Settings.get('rows_keywords', true)) parts = parts.concat(keywordRows(owner, params, CONFIG.keywordRows));

        parts = parts.map(maybeWide);

        // коллекции и российские актёры — без «широкого» вида
        if (Settings.get('rows_collections', true)) parts = parts.concat(collectionRows(owner, COLLECTIONS, CONFIG.collectionRows));
        if (Settings.get('rows_persons_rus', true)) parts = parts.concat(russianActorRows(owner, CONFIG.rusPersonsMain));

        parts = shuffle(parts);

        // Персоны: ряды добавляются в parts во время загрузки (как Api.partPersons)
        if (Settings.get('rows_persons', true)) parts.splice(Math.min(4, parts.length), 0, personsLoader(owner, parts, CONFIG.personsCount));

        // Тренды всегда в начале
        if (Settings.get('rows_trending', true)) {
            parts.unshift(trendingRow(owner, params, 'tv'));
            parts.unshift(trendingRow(owner, params, 'movie'));
        }

        return parts;
    }

    /* ---------------- персоны ----------------
     * Как Lampa.Api.partPersons: часть-«расширитель» грузит person/popular,
     * вставляет N рядов «актёр → его фильмы и сериалы» в случайные места
     * оставшейся очереди и отдаёт пустой результат. Отличия от штатной:
     *  - фильмы и сериалы вместе (combined_credits), без дублей;
     *  - отсеиваются актёры, известные в основном по азиатскому контенту;
     *  - применяются фильтры SURS (кириллица);
     *  - кнопка «Ещё» в ряду открывает страницу актёра.
     */
    function personsLoader(owner, parts, count) {
        var loader = function (call) {
            var page = 1 + Math.floor(Math.random() * 3);

            owner.get('person/popular?page=' + page, {}, function (json) {
                var persons = (json && json.results || []).filter(function (p) {
                    if ((p.known_for_department || '').toLowerCase() !== 'acting' || !p.known_for || !p.known_for.length) return false;
                    return p.known_for.some(function (k) { return !contains(FORBIDDEN_LANGUAGES, k.original_language); });
                });

                var start = parts.indexOf(loader) + 1;

                shuffle(persons).slice(0, count).forEach(function (person) {
                    var pos = start + Math.floor(Math.random() * (parts.length - start + 1));
                    parts.splice(pos, 0, personRow(owner, person));
                });

                call(EMPTY());
            }, function () {
                call(EMPTY());
            }, { life: 60 * 24 });
        };

        // служебная часть: сама ряда не показывает (см. layoutMain)
        loader.__surs_empty = true;

        return loader;
    }

    /**
     * Ряд «персона → фильмы и сериалы».
     * @param {function(function(person|null))} resolve — получить персону
     * @param {object=} opt  filter(item) — доп. фильтр работ, min — мин. число работ
     */
    function personCreditsRow(owner, resolve, opt) {
        opt = opt || {};

        return function (call) {
            resolve(function (person) {
                if (!person) return call(EMPTY());

                owner.get('person/' + person.id + '/combined_credits', {}, function (json) {
                    var seen = {};
                    var items = (json && json.cast || []).filter(function (m) {
                        var key = m.media_type + '_' + m.id;
                        var talk = m.genre_ids && (contains(m.genre_ids, 10767) || contains(m.genre_ids, 10763));
                        if (seen[key] || talk || !m.backdrop_path || m.vote_count <= (opt.minVotes || 20)) return false;
                        if (opt.filter && !opt.filter(m)) return false;
                        seen[key] = true;
                        return true;
                    });

                    items = filterCyrillic(items).sort(function (a, b) {
                        var da = a.release_date || a.first_air_date || '';
                        var db = b.release_date || b.first_air_date || '';
                        return da < db ? 1 : da > db ? -1 : 0;
                    });

                    if (items.length < (opt.min || 6)) return call(EMPTY());

                    items.forEach(function (item) {
                        if (!item.source) item.source = 'tmdb';
                    });

                    var Line = Lampa.Maker.module('Line');

                    call({
                        title: person.name,
                        icon_img: person.profile_path ? Lampa.Api.img(person.profile_path, 'w90_and_h90_face') : './img/actor.svg',
                        results: items.slice(0, 20),
                        total_pages: 2, // показывает кнопку «Ещё»
                        params: {
                            module: Line.add(Line.MASK.base, 'Icon'),
                            emit: {
                                onlyMore: function () {
                                    Lampa.Router.call('actor', person);
                                }
                            }
                        }
                    });
                }, function () {
                    call(EMPTY());
                }, { life: 60 * 24 });
            });
        };
    }

    function personRow(owner, person) {
        return personCreditsRow(owner, function (done) { done(person); });
    }

    function isRussianWork(item) {
        return item.original_language === 'ru' || contains(item.origin_country || [], 'RU');
    }

    /** Российский актёр по имени: search/person → combined_credits (только русскоязычные работы) */
    function russianActorRow(owner, name) {
        return personCreditsRow(owner, function (done) {
            owner.get('search/person?query=' + encodeURIComponent(name), {}, function (json) {
                var results = (json && json.results || []).filter(function (p) {
                    return (p.known_for_department || '').toLowerCase() === 'acting';
                });
                var russian = results.filter(function (p) {
                    return (p.known_for || []).some(isRussianWork);
                });
                done(russian[0] || results[0] || null);
            }, function () {
                done(null);
            }, { life: CONFIG.searchCacheLife });
        }, { filter: isRussianWork, min: 4, minVotes: 2 });
    }

    function russianActorRows(owner, count) {
        return shuffle(RUSSIAN_ACTORS.slice()).slice(0, count).map(function (name) {
            return russianActorRow(owner, name);
        });
    }

    /* ---------------- коллекции (франшизы) ---------------- */

    function collectionRow(owner, query) {
        return function (call) {
            owner.get('search/collection?query=' + encodeURIComponent(query), {}, function (json) {
                var found = json && json.results && json.results[0];

                if (!found) return call(EMPTY());

                owner.get('collection/' + found.id, {}, function (collection) {
                    var parts = (collection && collection.parts || []).filter(function (p) {
                        return p.poster_path || p.backdrop_path;
                    }).sort(function (a, b) {
                        return (a.release_date || '9999') < (b.release_date || '9999') ? -1 : 1;
                    });

                    if (parts.length < 2) return call(EMPTY());

                    parts.forEach(function (p) {
                        if (!p.source) p.source = 'tmdb';
                    });

                    call({
                        title: t('surs_collection') + ': ' + (collection.name || found.name),
                        results: parts
                    });
                }, function () {
                    call(EMPTY());
                }, { life: 60 * 24 * 7 });
            }, function () {
                call(EMPTY());
            }, { life: CONFIG.searchCacheLife });
        };
    }

    function collectionRows(owner, list, count) {
        return shuffle(list.slice()).slice(0, count).map(function (query) {
            return collectionRow(owner, query);
        });
    }

    /* ---------------- ключевые слова ----------------
     * Список и переводы — штатные из Lampa (Api.sources.tmdb.keywords,
     * ключи filter_keyword_*), как в Api.partKeywords. Отличия: фильтры SURS,
     * случайная страница выдачи, ограниченное число рядов за открытие.
     */
    function keywordRows(owner, params, count) {
        var lists = Lampa.Api.sources.tmdb.keywords || {};
        var all = [];

        ['movie', 'tv'].forEach(function (type) {
            (lists[type] || []).forEach(function (keyword) {
                all.push({ type: type, keyword: keyword });
            });
        });

        return shuffle(all).slice(0, count).map(function (item) {
            return row(owner, params, function () {
                var page = 1 + Math.floor(Math.random() * 3);
                return {
                    url: UserFilters.all('discover/' + item.type + '?with_keywords=' + item.keyword.id + '&sort_by=popularity.desc&page=' + page),
                    title: t(item.keyword.title) + ' (' + t(item.type === 'movie' ? 'surs_movies' : 'surs_series') + ')',
                    filter: filterCyrillic
                };
            });
        });
    }

    function trendingRow(owner, params, type) {
        return row(owner, params, function () {
            return {
                url: UserFilters.age('trending/' + type + '/week'),
                title: t('surs_title_trend_week') + ' ' + t(type === 'movie' ? 'surs_movies' : 'surs_series'),
                filter: function (items) {
                    return items.filter(function (item) {
                        if (type === 'movie') return !contains(FORBIDDEN_LANGUAGES, item.original_language);
                        return !(item.origin_country || []).some(function (c) { return contains(FORBIDDEN_COUNTRIES, c); });
                    });
                }
            };
        });
    }

    function periodRow(owner, params, type, genre, period, filters) {
        var dateField = type === 'movie' ? 'primary_release_date' : 'first_air_date';
        return row(owner, params, function () {
            return {
                url: filters('discover/' + type + '?with_genres=' + genre.id +
                    '&sort_by=vote_average.desc&vote_count.gte=100' +
                    '&' + dateField + '.gte=' + period.start + '-01-01' +
                    '&' + dateField + '.lte=' + period.end + '-12-31'),
                title: t(type === 'movie' ? 'surs_top_movies' : 'surs_top_tv') +
                    ' (' + t(genre.title) + ')' + t('surs_for_period') + period.start + '–' + period.end,
                filter: function (items) {
                    return filterYearRange(type, period.start, period.end)(filterCyrillic(items));
                }
            };
        });
    }

    /* =====================================================================
     *  ИСТОЧНИК SURS NEW (новинки)
     * ===================================================================== */

    function newFilters(url) {
        return Url.withoutKeywords(Url.minVotes(url, 10), KEYWORDS.asian);
    }

    function buildNew(owner, params) {
        var parts = [];
        var genres = getGenres();

        genres.forEach(function (genre) {
            parts.push(row(owner, params, function () {
                var sort = movieSort(SORT_NEW);
                return {
                    url: newFilters('discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.id + sort.extra),
                    title: t(sort.title) + ' (' + t(genre.title) + ')',
                    filter: filterCyrillic
                };
            }));

            parts.push(row(owner, params, function () {
                var sort = tvSort(SORT_NEW);
                return {
                    url: newFilters('discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.id + sort.extra),
                    title: t(sort.title) + ' ' + t('surs_tv_shows') + ' (' + t(genre.title) + ')',
                    filter: filterCyrillic
                };
            }));
        });

        getStreamingGlobal().forEach(function (service) {
            parts.push(row(owner, params, function () {
                var sort = tvSort(SORT_NEW);
                var genre = pick(genres);
                return {
                    url: newFilters('discover/tv?with_networks=' + service.id + '&with_genres=' + genre.id + '&sort_by=' + sort.id + sort.extra),
                    title: t(sort.title) + ' (' + t(genre.title) + ') ' + t('surs_on') + ' ' + service.title,
                    filter: filterCyrillic
                };
            }));

            parts.push(row(owner, params, function () {
                var sort = tvSort(SORT_NEW);
                return {
                    url: newFilters('discover/tv?with_networks=' + service.id + '&sort_by=' + sort.id + sort.extra),
                    title: t(sort.title) + ' ' + t('surs_on') + ' ' + service.title,
                    filter: filterCyrillic
                };
            }));
        });

        return shuffle(parts.map(maybeWide));
    }

    /* =====================================================================
     *  ИСТОЧНИК SURS KIDS
     * ===================================================================== */

    var KIDS_KEYWORDS_ALL = KEYWORDS.base.concat(KEYWORDS.asian);

    function kidsFilters(url) {
        return Url.withoutKeywords(Url.certification(Url.minVotes(url, 5), '6+'), KIDS_KEYWORDS_ALL);
    }

    function kidsSafe(url) {
        return Url.withoutKeywords(Url.certification(url, '6+'), KIDS_KEYWORDS_ALL);
    }

    function buildKids(owner, params) {
        var parts = [];
        var genres = GENRES.filter(function (g) { return contains(KIDS_GENRE_IDS, g.id); });
        var today = isoDate(0);
        var rusTitle = function () { return ' — ' + t('surs_russian'); };

        // Стриминги (sort.key в v3 был undefined → sort_by=undefined, исправлено на sort.id)
        STREAMING_KIDS.forEach(function (service) {
            parts.push(row(owner, params, function () {
                var sort = pick(SORT_OPTIONS);
                var genre = pick(genres);
                return {
                    url: kidsFilters('discover/tv?with_networks=' + service.id + '&with_genres=' + genre.id + '&sort_by=' + sort.id + '&air_date.lte=' + today),
                    title: t(sort.title) + ' (' + t(genre.title) + ') ' + t('surs_on') + ' ' + service.title,
                    filter: filterCyrillic
                };
            }));
            parts.push(row(owner, params, function () {
                var sort = pick(SORT_OPTIONS);
                return {
                    url: kidsFilters('discover/tv?with_networks=' + service.id + '&sort_by=' + sort.id + '&air_date.lte=' + today),
                    title: t(sort.title) + ' ' + t('surs_on') + ' ' + service.title,
                    filter: filterCyrillic
                };
            }));
        });

        genres.forEach(function (genre) {
            [false, true].forEach(function (russian) {
                // фильмы
                parts.push(row(owner, params, function () {
                    var sort = movieSort(pick(SORT_OPTIONS));
                    var url = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.id;
                    if (russian) url += '&with_original_language=ru' + (sort.id === 'release_date.desc' ? '&region=RU' : '');
                    if (sort.extra) url += sort.extra;
                    return {
                        url: kidsFilters(url),
                        title: t(sort.title) + (russian ? rusTitle() : '') + ' (' + t(genre.title) + ')',
                        filter: russian ? null : filterCyrillic
                    };
                }));
                // сериалы
                parts.push(row(owner, params, function () {
                    var sort = pick(SORT_OPTIONS);
                    var url = 'discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.id;
                    if (russian) url += '&with_origin_country=RU';
                    return {
                        url: kidsFilters(url),
                        title: t(sort.title) + (russian ? rusTitle() : '') + ' ' + t('surs_tv_shows') + ' (' + t(genre.title) + ')',
                        filter: russian ? null : filterCyrillic
                    };
                }));
            });

            // Топ по жанру: в v3 один ряд дважды вызывал callback — разделено на два ряда
            ['movie', 'tv'].forEach(function (type) {
                [false, true].forEach(function (russian) {
                    parts.push(row(owner, params, function () {
                        var url = 'discover/' + type + '?with_genres=' + genre.id + '&sort_by=vote_average.desc&vote_count.gte=200';
                        if (russian) url += '&with_origin_country=RU';
                        return {
                            url: kidsSafe(url),
                            title: (russian ? t('surs_rus') + ' ' : '') + t(type === 'movie' ? 'surs_top_movies' : 'surs_top_tv') + ' (' + t(genre.title) + ')',
                            filter: filterCyrillic
                        };
                    }));
                });
            });

            var period = pick(getPeriods());
            parts.push(periodRow(owner, params, 'movie', genre, period, kidsSafe));
            parts.push(periodRow(owner, params, 'tv', genre, period, kidsSafe));
        });

        // Анимация + семейное: по одному ряду на каждую сортировку
        // (в v3 один ряд вызывал callback по разу на каждую сортировку)
        SORT_OPTIONS.forEach(function (baseSort) {
            [false, true].forEach(function (russian) {
                parts.push(row(owner, params, function () {
                    var sort = movieSort(baseSort);
                    var url = 'discover/movie?with_genres=16,10751&sort_by=' + sort.id;
                    if (russian) url += '&with_original_language=ru' + (sort.id === 'release_date.desc' ? '&region=RU' : '');
                    if (sort.extra) url += sort.extra;
                    return {
                        url: kidsFilters(url),
                        title: t(sort.title) + (russian ? rusTitle() : '') + ' (' + t('surs_genre_animation') + ', ' + t('surs_genre_kids') + ')',
                        filter: filterCyrillic
                    };
                }));
            });
        });

        // Поиск по известным франшизам
        KIDS_KEYWORDS.forEach(function (keyword) {
            parts.push(mergedRow(owner, [
                kidsFilters('search/movie?query=' + encodeURIComponent(keyword)),
                kidsFilters('search/tv?query=' + encodeURIComponent(keyword))
            ], keyword, function (items) {
                return sortByRating(filterCyrillic(items).filter(function (item) {
                    return (item.vote_average || 0) >= 6.1;
                }));
            }));
        });

        // Студии
        KIDS_STUDIOS.forEach(function (studio) {
            ['movie', 'tv'].forEach(function (type) {
                parts.push(row(owner, params, function () {
                    return {
                        url: Url.withoutKeywords('discover/' + type + '?with_companies=' + studio.id + '&sort_by=vote_average.desc', KIDS_KEYWORDS_ALL),
                        title: t(type === 'movie' ? 'surs_movies' : 'surs_tv_shows') + ' ' + t('surs_from') + ' ' + studio.title,
                        filter: filterCyrillic
                    };
                }));
            });
        });

        parts.push(mergedRow(owner, [
            kidsFilters('discover/movie?with_companies=4'),
            kidsFilters('discover/tv?with_networks=13')
        ], 'Nickelodeon', function (items) {
            return sortByRating(filterCyrillic(items));
        }));

        parts = parts.map(maybeWide).concat(collectionRows(owner, COLLECTIONS_KIDS, CONFIG.collectionRows));

        return shuffle(parts);
    }

    /* =====================================================================
     *  ИСТОЧНИК SURS RUS
     * ===================================================================== */

    function rusKeywords(url) {
        return Url.withoutKeywords(url, KEYWORDS.base);
    }

    function buildRus(owner, params) {
        var parts = [];

        STREAMING_RUS.forEach(function (service) {
            parts.push(row(owner, params, function () {
                var sort = tvSort(SORT_NEW);
                var genre = pick(GENRES);
                return {
                    url: rusKeywords('discover/tv?with_networks=' + service.id + '&with_genres=' + genre.id + '&sort_by=' + sort.id + sort.extra),
                    title: t(sort.title) + ' (' + t(genre.title) + ') ' + t('surs_on') + ' ' + service.title,
                    filter: filterCyrillic
                };
            }));
            parts.push(row(owner, params, function () {
                var sort = tvSort(SORT_NEW);
                return {
                    url: rusKeywords('discover/tv?with_networks=' + service.id + '&sort_by=' + sort.id + sort.extra),
                    title: t(sort.title) + ' ' + t('surs_on') + ' ' + service.title,
                    filter: filterCyrillic
                };
            }));
        });

        GENRES.forEach(function (genre) {
            parts.push(row(owner, params, function () {
                var sort = movieSort(SORT_NEW);
                return {
                    url: Url.minVotes(rusKeywords('discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.id + sort.extra + '&with_origin_country=RU'), 2),
                    title: t(sort.title) + ' ' + t('surs_russian') + ' (' + t(genre.title) + ')'
                };
            }));
            parts.push(row(owner, params, function () {
                var sort = tvSort(SORT_NEW);
                return {
                    url: rusKeywords('discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.id + '&with_origin_country=RU' + sort.extra),
                    title: t(sort.title) + ' ' + t('surs_russian') + ' ' + t('surs_tv_shows') + ' (' + t(genre.title) + ')'
                };
            }));
        });

        parts = parts.map(maybeWide)
            .concat(russianActorRows(owner, CONFIG.rusPersonsRus))
            .concat(collectionRows(owner, COLLECTIONS_RUS, CONFIG.collectionRows));

        return shuffle(parts);
    }

    /* =====================================================================
     *  СОЗДАНИЕ ИСТОЧНИКОВ (Lampa.Api.sources)
     * ===================================================================== */

    /**
     * Источник = копия TMDB с собственным main().
     * Вместо ручной вставки рядов (кнопки, стриминги, жанры, ближайшие эпизоды)
     * вызываем штатный Lampa.ContentRows.call — так на главную SURS попадают
     * все зарегистрированные ряды: «Продолжить просмотр», «Рекомендации»,
     * «Ближайшие/Недавние эпизоды», ряды других плагинов. Каждый ряд можно
     * выключить в Настройки → «Каналы» (content_rows).
     */
    /* =====================================================================
     *  РАСКЛАДКА РЯДОВ НА ГЛАВНОЙ SURS
     *
     *  Ряды из ContentRows сортируются на три группы:
     *   - кнопки навигации — первым рядом;
     *   - «разносимые»: ряды-плитки SURS (стриминги, жанры, студии) и штатные
     *     ряды Lampa «Продолжить просмотр», «Ближайшие выходы эпизодов»,
     *     «Недавние выходы эпизодов» — в случайные позиции на рядах 3–12,
     *     никакие два не рядом. Если им там тесно (больше 5 штук), диапазон
     *     расширяется вниз, а ряды Lampa всё равно занимают места в пределах 3–12;
     *   - остальные (рекомендации, ряды других плагинов) — как раньше, сверху.
     *
     *  Ряды-плитки помечены (loader.__surs_spread). Штатные ряды Lampa меток не
     *  имеют — их узнаём по названию: они отдают данные синхронно, поэтому
     *  вызываем загрузчик один раз заранее и запоминаем результат.
     *
     *  Разносимые ряды не ставятся в очередь заранее: часть обычных рядов
     *  оказывается пустой только после загрузки (актёр/коллекция не найдены),
     *  Lampa их не показывает, и заранее расставленные ряды съехались бы
     *  вплотную. Поэтому они вставляются в момент выдачи порции — по реальному
     *  числу уже показанных рядов (их данные известны сразу).
     * ===================================================================== */

    var LAMPA_SPREAD = {
        title_continue: 'continue',
        title_upcoming_episodes: 'upcoming',
        title_recent_episodes: 'recent'
    };

    /** Загрузить ряд один раз и запомнить результат (для штатных рядов Lampa) */
    function memoRow(fn) {
        var done = false;
        var result = null;
        var waiting = [];

        try {
            fn(function (data) {
                done = true;
                result = data;
                waiting.forEach(function (call) { call(data); });
                waiting = [];
            });
        } catch (e) {
            done = true;
            result = null;
        }

        var row = function (call) {
            if (done) call(result);
            else waiting.push(call);
        };

        row.__probe = done ? result : undefined;

        return row;
    }

    /** Какой это штатный ряд Lampa (по названию), иначе '' */
    function lampaSpreadKind(row) {
        var data = row.__probe;
        if (!data || !data.title) return '';

        for (var key in LAMPA_SPREAD) {
            if (Object.prototype.hasOwnProperty.call(LAMPA_SPREAD, key) && data.title === Lampa.Lang.translate(key)) return LAMPA_SPREAD[key];
        }
        return '';
    }

    /**
     * k случайных позиций в [from; to] без соседних: выбираем k чисел из
     * (n - k + 1) позиций и раздвигаем i-е на i.
     */
    function spreadPositions(k, from, to) {
        var n = to - from + 1;
        var free = n - (k - 1);
        var pool = [];

        for (var i = 0; i < free; i++) pool.push(i);

        return shuffle(pool).slice(0, k).sort(function (a, b) { return a - b; }).map(function (v, idx) {
            return from + v + idx;
        });
    }

    function layoutMain(parts, extra) {
        var nav = [];
        var tiles = [];
        var lampa = [];
        var other = [];

        extra.forEach(function (row) {
            if (typeof row !== 'function') return other.push(row);
            if (row.__surs_nav) return nav.push(row);
            if (row.__surs_spread) return tiles.push(row);

            var memo = memoRow(row);
            var kind = lampaSpreadKind(memo);

            if (kind) lampa.push(memo);
            else if (memo.__probe === undefined || (memo.__probe && memo.__probe.results && memo.__probe.results.length)) other.push(memo);
            // синхронно пустой ряд не нужен
        });

        var list = nav.concat(other).concat(parts);

        // данные разносимых рядов — сразу (плитки и ряды Lampa отдают синхронно)
        function resolve(row) {
            var data = row.__probe;
            if (data === undefined) {
                row(function (d) { data = d; });
            }
            return data && data.results && data.results.length ? data : null;
        }

        var lampaData = lampa.map(resolve).filter(Boolean);
        var tileData = [];

        tiles.forEach(function (row) {
            var data = resolve(row);
            if (data) tileData.push(data);
            else list.push(row); // асинхронный — просто в очередь
        });

        var k = tileData.length + lampaData.length;
        var plan = [];

        if (k) {
            // ряды 3–12 (1 — кнопки навигации); если тесно — расширяем вниз
            var from = CONFIG.spreadFrom;
            var to = Math.max(CONFIG.spreadTo, from + 2 * (k - 1));
            var positions = spreadPositions(k, from, to);

            // ряды Lampa — на позиции в пределах 3–12, плитки — на оставшиеся
            var inRange = shuffle(positions.filter(function (p) { return p <= CONFIG.spreadTo; }));
            var outRange = positions.filter(function (p) { return p > CONFIG.spreadTo; });

            shuffle(lampaData).forEach(function (data) {
                plan.push({ pos: inRange.length ? inRange.shift() : outRange.shift(), data: data });
            });

            var rest = shuffle(inRange.concat(outRange));

            shuffle(tileData).forEach(function (data) {
                plan.push({ pos: rest.shift(), data: data });
            });

            plan.sort(function (a, b) { return a.pos - b.pos; });
        }

        return { list: list, plan: plan };
    }

    /**
     * Выдача порций с подмешиванием разносимых рядов на их позиции.
     * shown — сколько рядов уже отдано на экран (позиции 1-based).
     */
    function spreadLoader(layout) {
        var shown = 0;
        var plan = layout.plan.slice();

        function mix(data) {
            var out = [];

            function flushDue() {
                while (plan.length && plan[0].pos <= shown + 1) {
                    out.push(plan.shift().data);
                    shown++;
                }
            }

            flushDue();

            data.forEach(function (row) {
                out.push(row);
                shown++;
                flushDue();
            });

            return out;
        }

        return function (partLoaded, partEmpty) {
            Lampa.Api.partNext(layout.list, CONFIG.partsLimit, function (data) {
                partLoaded(mix(data));
            }, function () {
                // обычные ряды кончились — отдаём оставшиеся разносимые
                var tail = plan.map(function (p) { return p.data; });
                plan = [];
                if (tail.length) partLoaded(tail);
                else if (partEmpty) partEmpty();
            });
        };
    }

    function createSource(builder, screen) {
        var source = assign({}, Lampa.Api.sources.tmdb);

        source.discovery = false;

        source.main = function (params, oncomplite, onerror) {
            params = params || {};

            var parts = builder(source, params);

            var loadPart;

            if (screen === 'main') {
                var extra = [];
                Lampa.ContentRows.call(screen, params, extra);
                loadPart = spreadLoader(layoutMain(parts, extra));
            }
            else {
                Lampa.ContentRows.call(screen, params, parts);

                loadPart = function (partLoaded, partEmpty) {
                    Lampa.Api.partNext(parts, CONFIG.partsLimit, partLoaded, partEmpty);
                };
            }

            loadPart(oncomplite, onerror);

            return loadPart;
        };

        return source;
    }

    function registerSources() {
        if (!Lampa.Api.sources || !Lampa.Api.sources.tmdb) {
            console.error('SURS', 'Lampa.Api.sources.tmdb недоступен');
            return;
        }

        var names = sourceNames();
        var list = [
            { key: 'surs_mod',      name: names.main, source: createSource(buildMain, 'main') },
            { key: 'surs_mod_new',  name: names.new,  source: createSource(buildNew,  CONFIG.liteScreen) },
            { key: 'surs_mod_kids', name: names.kids, source: createSource(buildKids, CONFIG.liteScreen) },
            { key: 'surs_mod_rus',  name: names.rus,  source: createSource(buildRus,  CONFIG.liteScreen) }
        ];

        var options = {};

        list.forEach(function (item) {
            Lampa.Api.sources[item.key] = item.source;
            Lampa.Api.sources[item.name] = item.source;
            options[item.name] = item.name;
        });

        Lampa.Params.select('source', assign({}, Lampa.Params.values.source, options), 'tmdb');
    }

    /* =====================================================================
     *  ПЕРЕКЛЮЧЕНИЕ ИСТОЧНИКА (профили Levende, смена в настройках)
     * ===================================================================== */

    var sourceChangedByProfile = false;

    function openMain(source) {
        Lampa.Activity.push({
            url: '',
            title: t('title_main') + ' - ' + source.toUpperCase(),
            component: 'main',
            source: source,
            page: 1
        });
    }

    /**
     * Показать главную источника, не плодя главные в стеке: если сейчас открыта
     * главная — заменяем её (Activity.replace), иначе открываем новую.
     * Раньше при старте и смене профиля новая главная ложилась поверх старой,
     * и «Назад» возвращал на устаревшую главную.
     */
    function showMain(source) {
        var active = Lampa.Activity.active();

        if (active && active.component === 'main') {
            Lampa.Activity.replace({
                url: '',
                title: t('title_main') + ' - ' + source.toUpperCase(),
                component: 'main',
                source: source,
                page: 1
            });
        }
        else openMain(source);
    }

    function changeSource(source) {
        if (Lampa.Storage.get('source') === source) return;

        sourceChangedByProfile = true;
        Lampa.Storage.set('source', source);

        setTimeout(function () {
            showMain(source);
            sourceChangedByProfile = false;
        }, 10);
    }

    function startSourceListeners() {
        // профили (https://levende.github.io/lampa-plugins/profiles.js)
        Lampa.Listener.follow('profile', function (e) {
            if (e.type !== 'changed' || !e.params || !e.params.surs) return;

            var names = sourceNames();

            if (e.params.forKids) changeSource(names.kids);
            else if (e.params.onlyRus) changeSource(names.rus);
            else changeSource(names.main);
        });

        // источник сменили (в настройках или программно, например lampainit при первом запуске):
        // заменяем текущую главную, а не кладём новую поверх
        Lampa.Storage.listener.follow('change', function (e) {
            if (e.name !== 'source' || sourceChangedByProfile || !isSursSource(e.value)) return;

            var enabled = Lampa.Controller.enabled();
            var fromSettings = !!(enabled && /settings|select/.test(enabled.name || ''));

            showMain(e.value);

            if (fromSettings) {
                setTimeout(function () {
                    Lampa.Controller.toggle('settings');
                }, 100);
            }
        });

        // главная могла загрузиться раньше, чем зарегистрировались источники
        var initial = Lampa.Storage.get('source');
        var startPage = Lampa.Storage.get('start_page');

        if (isSursSource(initial) && (!startPage || startPage === 'main')) {
            setTimeout(function () {
                // Перезагружаем только уже открытую главную (она могла создаться с TMDB,
                // пока источники SURS ещё не были зарегистрированы). Если главной ещё нет,
                // Lampa создаст её сама — уже с источником SURS; своя push дала бы дубль.
                var active = Lampa.Activity.active();
                if (active && active.component === 'main') showMain(initial);
            }, 300);
        }
    }

    /* =====================================================================
     *  БОКОВОЕ МЕНЮ (Lampa.Menu.addButton, V3)
     * ===================================================================== */

    var MENU_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="white"/></svg>';
    var menuButtons = [];

    function sideMenuItems() {
        var names = sourceNames();
        return [
            { id: 'Button_sourceName',     source: names.main },
            { id: 'Button_sourceNameNew',  source: names.new },
            { id: 'Button_sourceNameKids', source: names.kids },
            { id: 'Button_sourceNameRus',  source: names.rus }
        ];
    }

    function renderMenuButtons() {
        menuButtons.forEach(function (btn) { btn.remove(); });
        menuButtons = [];

        sideMenuItems().forEach(function (item) {
            if (!Settings.get(item.id, false)) return;

            var btn = Lampa.Menu.addButton(MENU_ICON, item.source, function () {
                openMain(item.source);
            });

            btn.attr('data-action', 'surs-source');
            menuButtons.push(btn);
        });
    }

    /* =====================================================================
     *  НАСТРОЙКИ
     *
     *  Структура (по смыслу, а не по истории добавления функций):
     *    1. Источник и меню   — какой источник на главной, боковое меню, название
     *    2. Главная страница   — какие ряды-кнопки и какие подборки показывать
     *    3. Состав подборок    — жанры, сортировки, стриминги (только SURS)
     *    4. Фильтры контента   — кириллица, рейтинг, возраст, азиатский контент
     *    5. Сервис             — обновить главную, сбросить настройки
     *
     *  - Параметры пересобираются при каждом открытии настроек (как делает
     *    сам Lampa для ContentRows), для NEW/KIDS/RUS лишние разделы не
     *    добавляются.
     *  - В описании каждого пункта видно текущее значение, оно обновляется
     *    сразу после закрытия меню выбора.
     *  - При выходе из настроек главная SURS перезагружается сама, если
     *    что-то поменялось (раньше нужно было жать «Главная» вручную).
     * ===================================================================== */

    var SETTINGS_ICON = '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g fill="#ffffff"><path d="M443.724,166.599c27.038-2.293,47.087-26.07,44.786-53.125c-2.292-27.038-26.078-47.087-53.115-44.795 c-27.038,2.301-47.078,26.088-44.776,53.124C392.91,148.85,416.677,168.9,443.724,166.599z"/><path d="M431.752,346.544l30.541-114.485c5.068-19.305-6.466-39.075-25.78-44.144 c-19.304-5.077-39.075,6.448-44.152,25.771v-0.018L365.052,315.64l-78.755-13.276c-17.218-4.304-34.696,5.786-39.578,22.864 l-33.317,133.445c-3.82,13.342,3.913,27.28,17.274,31.1c13.37,3.81,27.298-3.923,31.128-17.283l39.392-98.638l61.286,16.155 C398.863,400.125,421.633,382.927,431.752,346.544z"/><path d="M498.349,286.311c-10.1-2.999-20.721,2.749-23.722,12.858l-27.876,93.848 c-2.096,6.606-4.536,11.777-7.146,15.746c-3.987,5.944-8.002,9.373-13.854,12.093c-5.842,2.664-14.031,4.379-25.416,4.37 c-3.009,0.008-6.215-0.113-9.634-0.355l-54.009-3.363c-10.519-0.661-19.575,7.341-20.227,17.861 c-0.662,10.518,7.342,19.574,17.86,20.226l53.73,3.345c4.211,0.298,8.31,0.448,12.28,0.456c10.072-0.009,19.5-0.988,28.369-3.289 c13.268-3.392,25.315-10.127,34.501-19.892c9.251-9.736,15.531-21.885,19.91-35.609l0.074-0.214l28.015-94.362 C514.206,299.923,508.447,289.302,498.349,286.311z"/><path d="M248.974,81.219L0,21.256v15.14v281.228l248.974-59.962V81.219z M225.123,238.87L23.851,287.355V51.536 l201.272,48.466V238.87z"/><polygon points="204.989,115.189 47.991,84.937 47.991,253.953 204.989,223.692"/></g></svg>';

    /* ---------------- справочники меню ---------------- */

    /** Ряды-кнопки модулей (ContentRows). Ключ вкл/выкл — общий с Настройки → «Каналы» */
    var TILE_ROWS = [
        { id: 'surs_buttons',      title: 'surs_rows_nav' },
        { id: 'streaming_global',  title: 'surs_strmngs_global_title' },
        { id: 'streaming_russian', title: 'surs_strmngs_russian_title' },
        { id: 'genres_buttons',    title: 'surs_rows_genres' },
        { id: 'studios_world',     title: 'surs_studios_world_title' },
        { id: 'studios_russian',   title: 'surs_studios_russian_title' }
    ];

    /** Подборки основного источника (одно меню с разделителями) */
    function collectionItems() {
        return [
            { id: 'rows_trending', title: 'surs_title_trend_week' },
            { id: 'rows_persons',  title: 'surs_rows_persons' },
            { id: 'rows_persons_rus', title: 'surs_rows_persons_rus' },
            { id: 'rows_keywords',    title: 'surs_rows_keywords' },
            { id: 'rows_collections', title: 'surs_rows_collections' },
            { separator: true, title: 'surs_rows_streaming_sep' },
            { id: 'getStreamingServices',    title: 'surs_global' },
            { id: 'getStreamingServicesRUS', title: 'surs_russian' },
            { separator: true, title: 'surs_top_all_time' },
            { id: 'getBestContentByGenreMovie', title: 'surs_movies' },
            { id: 'getBestContentByGenreTV',    title: 'surs_series' },
            { separator: true, title: 'surs_top_5_years' },
            { id: 'getBestContentByGenreAndPeriod_movie', title: 'surs_movies' },
            { id: 'getBestContentByGenreAndPeriod_tv',    title: 'surs_series' }
        ];
    }

    function movieRegionItems() {
        var ua = isUkrainian();
        var items = [
            { id: 'getMoviesByGenreGlobal', title: 'surs_global' },
            { id: 'getMoviesByGenreRus',    title: 'surs_russian' }
        ];
        if (ua) items.push({ id: 'getMoviesByGenreUA', title: 'surs_ukrainian', def: true });
        return items;
    }

    function tvRegionItems() {
        var ua = isUkrainian();
        var items = [
            { id: 'getTVShowsByGenreGlobal', title: 'surs_global' },
            { id: 'getTVShowsByGenreRus',    title: 'surs_russian' },
            { id: 'getTVShowsByGenreKOR',    title: 'surs_korean', def: false },
            { id: 'getTVShowsByGenreTR',     title: 'surs_turkish' }
        ];
        if (ua) items.push({ id: 'getTVShowsByGenreUA', title: 'surs_ukrainian', def: true });
        return items;
    }

    var RADIO = {
        cirillic: {
            title: 'surs_cyrillic', def: '1',
            options: [
                { title: 'surs_cyrillic_enabled',  value: '1' },
                { title: 'surs_cyrillic_disabled', value: '0' }
            ]
        },
        minVotes: {
            title: 'surs_rating_validation', def: '10',
            options: [
                { title: 'surs_rating_off',      value: '0' },
                { title: 'surs_rating_standard', value: '10' },
                { title: 'surs_rating_enhanced', value: '50' },
                { title: 'surs_rating_maximum',  value: '150' },
                { title: 'surs_rating_fatality', value: '300' }
            ]
        },
        ageRestrictions: {
            title: 'surs_age_restriction', def: '',
            options: [
                { title: 'surs_age_none',     value: '' },
                { title: 'surs_age_12',       value: '12+' },
                { title: 'surs_age_6',        value: '6+' },
                { title: 'surs_age_toddlers', value: '0+' }
            ]
        },
        without_keywords: {
            title: 'surs_exclude_asian', def: '1',
            options: [
                { title: 'surs_exclude_off',    value: '0' },
                { title: 'surs_exclude_soft',   value: '1' },
                { title: 'surs_exclude_strong', value: '2' }
            ]
        }
    };

    function radioValue(key) {
        if (key === 'without_keywords') return getKeywordLevel();
        return String(Settings.get(key, RADIO[key].def));
    }

    function radioLabel(key) {
        var value = radioValue(key);
        var option = RADIO[key].options.filter(function (o) { return o.value === value; })[0];
        return option ? t(option.title) : value;
    }

    /* ---------------- ряды-кнопки (глобальные ключи ContentRows) ---------------- */

    function tileRowEnabled(id) {
        return Lampa.Storage.get('content_rows_' + id, true) !== false;
    }

    /* ---------------- описания с текущим значением ---------------- */

    var descriptions = {};

    function refreshDescriptions() {
        for (var name in descriptions) {
            var d = descriptions[name];
            d.item.find('.settings-param__descr').text(d.describe());
        }
    }

    function ofTotal(count, total) {
        return t('surs_enabled_of').replace('{n}', count).replace('{total}', total);
    }

    /* ---------------- меню выбора ---------------- */

    function currentController() {
        var enabled = Lampa.Controller.enabled();
        return enabled && enabled.name ? enabled.name : 'settings';
    }

    function backTo(controller) {
        return function () {
            Lampa.Controller.toggle(controller);
            refreshDescriptions();
        };
    }

    /**
     * Меню с чекбоксами.
     * @param {string} title ключ перевода
     * @param {Array} items {id,title,def?} или {separator:true,title}
     * @param {object} store {get(id,def), set(id,value)}
     * @param {function=} onChange
     */
    function showCheckboxMenu(title, items, store, onChange) {
        var back = currentController();

        Lampa.Select.show({
            title: t(title),
            items: items.map(function (item) {
                if (item.separator) return { title: t(item.title), separator: true };

                var def = typeof item.def === 'boolean' ? item.def : true;

                return { title: t(item.title), id: item.id, def: def, checkbox: true, checked: !!store.get(item.id, def) };
            }),
            onBack: backTo(back),
            onCheck: function (item) {
                store.set(item.id, item.checked); // Select уже переключил item.checked
                if (onChange) onChange();
            }
        });
    }

    /** Хранилища для showCheckboxMenu */
    function profileStore(prefix) {
        return {
            get: function (id, def) { return Settings.get(prefix + id, def); },
            set: function (id, value) { Settings.set(prefix + id, value); }
        };
    }

    var tileStore = {
        get: function (id) { return tileRowEnabled(id); },
        set: function (id, value) { Lampa.Storage.set('content_rows_' + id, value); Settings.dirty = true; }
    };

    /** Выбор одного значения: пункт закрывает меню (в V3 вложенные Select не плодятся) */
    function showRadioMenu(key) {
        var back = currentController();
        var config = RADIO[key];
        var value = radioValue(key);

        Lampa.Select.show({
            title: t(config.title),
            items: config.options.map(function (opt) {
                return { title: t(opt.title), value: opt.value, selected: opt.value === value, picked: opt.value === value };
            }),
            onSelect: function (item) {
                Settings.set(key, item.value);
                backTo(back)();
            },
            onBack: backTo(back)
        });
    }

    function confirmMenu(title, onYes) {
        var back = currentController();

        Lampa.Select.show({
            title: title,
            items: [
                { title: t('surs_yes'), yes: true },
                { title: t('surs_no') }
            ],
            onSelect: function (item) {
                backTo(back)();
                if (item.yes) onYes();
            },
            onBack: backTo(back)
        });
    }

    /* ---------------- построение ---------------- */

    function addTitle(name, description) {
        Lampa.SettingsApi.addParam({
            component: CONFIG.settingsComponent,
            param: { name: '', type: 'title' },
            field: { name: name, description: description || '' }
        });
    }

    /**
     * @param {string} name
     * @param {string} title
     * @param {string|function():string} describe — функция = живое описание
     * @param {function} action
     */
    function addButton(name, title, describe, action) {
        var live = typeof describe === 'function';

        Lampa.SettingsApi.addParam({
            component: CONFIG.settingsComponent,
            param: { name: name, type: 'button' },
            field: { name: title, description: live ? describe() : describe },
            onRender: function (item) {
                if (live) descriptions[name] = { item: item, describe: describe };
            },
            onChange: action
        });
    }

    function listButton(name, title, items, prefix) {
        addButton(name, t(title), function () {
            return ofTotal(Settings.count(items, prefix), items.length);
        }, function () {
            showCheckboxMenu(title, items, profileStore(prefix));
        });
    }

    function radioButton(name, key, descrKey) {
        addButton(name, t(RADIO[key].title), function () {
            return radioLabel(key) + ' — ' + t(descrKey);
        }, function () {
            showRadioMenu(key);
        });
    }

    function buildSettings() {
        var comp = CONFIG.settingsComponent;
        var names = sourceNames();
        var source = Lampa.Storage.get('source');
        var lite = isLiteSource(source);

        descriptions = {};
        Lampa.SettingsApi.removeParams(comp);

        /* ---- 1. Источник и меню ---- */

        addTitle(t('surs_section_source'));

        var sourceValues = {};
        [names.main, names.new, names.kids, names.rus].forEach(function (n) { sourceValues[n] = n; });

        Lampa.SettingsApi.addParam({
            component: comp,
            param: { name: 'surs_setSource', type: 'select', values: sourceValues, default: isSursSource(source) ? source : names.main },
            field: { name: t('surs_set_as_source'), description: t('surs_source_description') },
            onChange: function (value) {
                Lampa.Storage.set('source', value);
            }
        });

        addButton('surs_setButtons', t('surs_add_to_menu'), function () {
            var on = sideMenuItems().filter(function (i) { return Settings.get(i.id, false); }).map(function (i) { return i.source; });
            return on.length ? on.join(', ') : t('surs_none');
        }, function () {
            showCheckboxMenu('surs_select_menu_sources', sideMenuItems().map(function (i) {
                return { id: i.id, title: i.source, def: false };
            }), profileStore(''), renderMenuButtons);
        });

        if (!Lampa.Storage.get('surs_disableCustomName')) {
            addButton('surs_setName', t('surs_rename_selections'), function () {
                return t('surs_current_name') + ': ' + names.main;
            }, renameSources);
        }

        /* ---- 2. Главная страница ---- */

        addTitle(t('surs_section_main'), lite ? t('surs_lite_hint') : '');

        addButton('surs_tile_rows', t('surs_tile_rows'), function () {
            return ofTotal(TILE_ROWS.filter(function (r) { return tileRowEnabled(r.id); }).length, TILE_ROWS.length) + ' — ' + t('surs_tile_rows_description');
        }, function () {
            showCheckboxMenu('surs_tile_rows', TILE_ROWS, tileStore);
        });

        addButton('surs_custom_buttons', t('surs_custom_buttons'), function () {
            var buttons = typeof window.surs_getAllButtons === 'function' ? window.surs_getAllButtons() : [];
            return ofTotal(Settings.count(buttons, 'custom_button_'), buttons.length);
        }, function () {
            var buttons = typeof window.surs_getAllButtons === 'function' ? window.surs_getAllButtons() : [];
            showCheckboxMenu('surs_custom_buttons', buttons, profileStore('custom_button_'));
        });

        if (!lite) {
            addButton('surs_collections_types', t('surs_collections_types'), function () {
                var items = collectionItems().filter(function (i) { return !i.separator; });
                return ofTotal(Settings.count(items, ''), items.length);
            }, function () {
                showCheckboxMenu('surs_collections_types', collectionItems(), profileStore(''));
            });

            addButton('surs_getMoviesByGenre', t('surs_movies_by_genre'), function () {
                return regionsLabel(movieRegionItems());
            }, function () {
                showCheckboxMenu('surs_movies_by_genre', movieRegionItems(), profileStore(''));
            });

            addButton('surs_getTVShowsByGenre', t('surs_tv_by_genre'), function () {
                return regionsLabel(tvRegionItems());
            }, function () {
                showCheckboxMenu('surs_tv_by_genre', tvRegionItems(), profileStore(''));
            });

            /* ---- 3. Состав подборок ---- */

            addTitle(t('surs_section_content'), t('surs_section_content_hint'));

            listButton('surs_genres',           'surs_genres',           GENRES,           'genre_');
            listButton('surs_sort_options',     'surs_sort_types',       SORT_OPTIONS,     'sort_');
            listButton('surs_global_streaming', 'surs_global_streaming', STREAMING_GLOBAL, 'streaming_');
            listButton('surs_rus_streaming',    'surs_rus_streaming',    STREAMING_RUS,    'streaming_rus_');

            /* ---- 4. Фильтры контента ---- */

            addTitle(t('surs_filters'));

            radioButton('surs_cirillic',        'cirillic',         'surs_cyrillic_description');
            radioButton('surs_minVotes',        'minVotes',         'surs_rating_short');
            radioButton('surs_ageRestrictions', 'ageRestrictions',  'surs_age_short');
            radioButton('surs_withoutKeywords', 'without_keywords', 'surs_exclude_short');
        }

        /* ---- 5. Сервис ---- */

        addTitle(t('surs_section_service'));

        addButton('surs_refresh', t('surs_refresh_main'), t('surs_refresh_main_description'), function () {
            Settings.dirty = false;
            openMain(isSursSource(Lampa.Storage.get('source')) ? Lampa.Storage.get('source') : names.main);
        });

        addButton('surs_reset', t('surs_reset'), t('surs_reset_description'), function () {
            confirmMenu(t('surs_reset') + '?', function () {
                Settings.reset();
                renderMenuButtons();
                Lampa.Noty.show(t('surs_reset_done'));
                refreshDescriptions();
            });
        });
    }

    function regionsLabel(items) {
        var on = items.filter(function (i) {
            return Settings.get(i.id, typeof i.def === 'boolean' ? i.def : true);
        }).map(function (i) { return t(i.title); });
        return on.length ? on.join(', ') : t('surs_none');
    }

    function renameSources() {
        Lampa.Input.edit({
            free: true,
            title: t('surs_enter_new_name'),
            value: Lampa.Storage.get('surs_name') || ''
        }, function (value) {
            value = typeof value === 'string' ? value.trim() : '';

            if (!value) {
                Lampa.Noty.show(t('surs_name_not_entered'));
                return;
            }

            Lampa.Storage.set('surs_name', value);
            Lampa.Noty.show(t('surs_name_saved'));

            // имена источников регистрируются при старте — нужна перезагрузка
            setTimeout(function () { location.reload(); }, 1500);
        });
    }

    /** Перезагрузка главной SURS после выхода из настроек, если что-то менялось */
    function refreshAfterSettings() {
        if (!Settings.dirty) return;

        Settings.dirty = false;

        var active = Lampa.Activity.active();
        var source = active && (active.source || Lampa.Storage.get('source'));

        if (active && active.component === 'main' && isSursSource(source)) Lampa.Activity.replace();
    }

    function initSettings() {
        Lampa.SettingsApi.addComponent({
            component: CONFIG.settingsComponent,
            name: t('surs_collections') + ' ' + sourceNames().main,
            icon: SETTINGS_ICON
        });

        buildSettings();

        Lampa.Settings.listener.follow('open', function (e) {
            if (e.name === 'main') buildSettings();
        });

        Lampa.Settings.listener.follow('close', refreshAfterSettings);
    }

    /* =====================================================================
     *  ЛОКАЛИЗАЦИЯ
     * ===================================================================== */

    function L(ru, en, uk) {
        return { ru: ru, en: en, uk: uk };
    }

    function addTranslations() {
        Lampa.Lang.add({
            surs_vote_count_desc:        L('Много голосов', 'Most Votes', 'Багато голосів'),
            surs_vote_average_desc:      L('Высокий рейтинг', 'High Rating', 'Високий рейтинг'),
            surs_first_air_date_desc:    L('Новинки', 'New Releases', 'Новинки'),
            surs_popularity_desc:        L('Популярные', 'Popular', 'Популярні'),
            surs_revenue_desc:           L('Интерес зрителей', 'Audience Interest', 'Інтерес глядачів'),

            surs_genre_action:           L('боевики', 'action', 'бойовики'),
            surs_genre_comedy:           L('комедии', 'comedies', 'комедії'),
            surs_genre_drama:            L('драмы', 'dramas', 'драми'),
            surs_genre_romance:          L('мелодрамы', 'romance', 'мелодрами'),
            surs_genre_animation:        L('анимация', 'animations', 'мультфільми'),
            surs_genre_kids:             L('детское', 'kids', 'дитяче'),
            surs_genre_adventure:        L('приключения', 'adventures', 'пригоди'),
            surs_genre_crime:            L('криминал', 'crime', 'кримінал'),
            surs_genre_mystery:          L('детективы', 'mysteries', 'детективи'),
            surs_genre_sci_fi:           L('фантастика', 'sci-fi', 'фантастика'),
            surs_genre_western:          L('вестерны', 'westerns', 'вестерни'),
            surs_genre_thriller:         L('триллеры', 'thrillers', 'трилери'),
            surs_genre_family:           L('семейные', 'family', 'сімейні'),
            surs_genre_fantasy:          L('фэнтези', 'fantasy', 'фентезі'),
            surs_genre_reality:          L('реалити-шоу', 'reality shows', 'реаліті-шоу'),
            surs_genre_action_adventure: L('боевики и приключения', 'action & adventure', 'бойовики та пригоди'),
            surs_genre_soap:             L('мыльные оперы', 'soap operas', 'мильні опери'),
            surs_genre_talk_show:        L('ток-шоу', 'talk shows', 'ток-шоу'),

            surs_title_trend_week:       L('Тренды недели', 'Trending This Week', 'Тренди тижня'),
            surs_top_movies:             L('Топ фильмы', 'Top Movies', 'Топ фільми'),
            surs_top_tv:                 L('Топ сериалы', 'Top TV Shows', 'Топ серіали'),
            surs_for_period:             L(' за ', ' for ', ' за '),
            surs_tv_shows:               L('сериалы', 'TV shows', 'серіали'),
            surs_on:                     L('на', 'on', 'на'),
            surs_from:                   L('от', 'from', 'від'),
            surs_movies:                 L('Фильмы', 'Movies', 'Фільми'),
            surs_series:                 L('Сериалы', 'Series', 'Серіали'),
            surs_global:                 L('Глобальные', 'Global', 'Глобальні'),
            surs_russian:                L('Российские', 'Russian', 'Російські'),
            surs_korean:                 L('Южнокорейские', 'South Korean', 'Південнокорейські'),
            surs_turkish:                L('турецкие', 'Turkish', 'турецькі'),
            surs_ukrainian:              L('украинские', 'Ukrainian', 'українські'),
            surs_rus:                    L('Русское', 'Russian', 'Російське'),

            surs_collections:            L('Главная', 'Main', 'Головна'),
            surs_main_update:            L('После изменения настроек обновите главную страницу, нажав на её иконку в боковом меню', 'After changing settings, refresh the main page by clicking its icon in the side menu', 'Після зміни налаштувань оновіть головну сторінку, натиснувши на її іконку в бічному меню'),
            surs_settings_interface:     L('Настройка интерфейса', 'Interface Settings', 'Налаштування інтерфейсу'),
            surs_set_as_source:          L('Установить в качестве источника', 'Set as Source', 'Встановити як джерело'),
            surs_source_description:     L('Влияет на отображение контента на главной странице', 'Affects content display on the main page', 'Впливає на відображення контенту на головній сторінці'),
            surs_add_to_menu:            L('Добавить подборки в боковое меню', 'Add collections to the side menu', 'Додати підбірки до бічного меню'),
            surs_menu_description:       L('Выберите, какие подборки добавить в боковое меню', 'Choose which collections to add to the side menu', 'Виберіть, які підбірки додати до бічного меню'),
            surs_select_menu_sources:    L('Выбор источников для бокового меню', 'Select sources for the side menu', 'Вибір джерел для бічного меню'),
            surs_custom_buttons:         L('Горизонтальное меню', 'Horizontal Menu', 'Горизонтальне меню'),
            surs_custom_buttons_description: L('Выберите, какие кнопки отображать в интерфейсе', 'Choose which buttons to display in the interface', 'Виберіть, які кнопки відображати в інтерфейсі'),

            surs_filters:                L('Фильтры', 'Filters', 'Фільтри'),
            surs_sort_types:             L('Виды сортировки подборок', 'Types of selection sorting', 'Типи сортування підбірок'),
            surs_sort_description:       L('Выбор сортировки подборок', 'Choose sorting for collections', 'Вибір сортування для підбірок'),
            surs_genres:                 L('Жанры', 'Genres', 'Жанри'),
            surs_genres_description:     L('Выбор жанров', 'Choose genres', 'Вибір жанрів'),
            surs_global_streaming:       L('Глобальные стриминги', 'Global streaming services', 'Глобальні стрімінгові сервіси'),
            surs_global_streaming_description: L('Выбор глобальных стриминговых сервисов', 'Choose global streaming services', 'Вибір глобальних стрімінгових сервісів'),
            surs_rus_streaming:          L('Российские стриминги', 'Russian streaming services', 'Російські стрімінгові сервіси'),
            surs_rus_streaming_description: L('Выбор российских стриминговых сервисов', 'Choose Russian streaming services', 'Вибір російських стрімінгових сервісів'),
            surs_geo_filters:            L('Настройки подборок', 'Collection settings', 'Налаштування підбірок'),
            surs_streaming:              L('Стриминги', 'Streaming services', 'Стрімінгові сервіси'),
            surs_region_description:     L('Выберите регион', 'Choose region', 'Виберіть регіон'),
            surs_top_all_time:           L('Топ за все время', 'Top of all time', 'Топ за весь час'),
            surs_top_content_description: L('Фильмы, сериалы, или всё вместе', 'Movies, series, or both', 'Фільми, серіали або все разом'),
            surs_top_5_years:            L('Топ за 5 лет', 'Top for 5 years', 'Топ за 5 років'),

            surs_technical_settings:     L('Технические настройки', 'Technical settings', 'Технічні налаштування'),
            surs_cyrillic:               L('Кириллица в карточке', 'Cyrillic in card', 'Кирилиця в картці'),
            surs_cyrillic_description:   L('Фильтрует контент, оставляя только те материалы, у которых есть перевод названия или описание на кириллице', 'Filters content, keeping only materials with titles or descriptions translated into Cyrillic', 'Фільтрує контент, залишаючи лише матеріали з перекладом назви або опису на кирилицю'),
            surs_cyrillic_enabled:       L('Включен', 'Enabled', 'Увімкнено'),
            surs_cyrillic_disabled:      L('Выключен', 'Disabled', 'Вимкнено'),
            surs_rating_validation:      L('Валидация рейтинга', 'Rating validation', 'Валідація рейтингу'),
            surs_rating_description:     L('Позволяет исключить контент с случайно завышенной оценкой. Однако может также исключить новые фильмы или те, у которых ещё нет рейтинга или мало голосов', 'Excludes content with accidentally inflated ratings. May also exclude new movies or those with no rating or few votes', 'Виключає контент із випадково завищеним рейтингом. Може також виключити нові фільми або ті, у яких ще немає рейтингу чи мало голосів'),
            surs_rating_off:             L('Выключено', 'Off', 'Вимкнено'),
            surs_rating_standard:        L('Стандартная', 'Standard', 'Стандартна'),
            surs_rating_enhanced:        L('Усиленная', 'Enhanced', 'Посилена'),
            surs_rating_maximum:         L('Максимальная', 'Maximum', 'Максимальна'),
            surs_rating_fatality:        L('Фаталити', 'Fatality', 'Фаталіті'),
            surs_age_restriction:        L('Возрастное ограничение', 'Age restriction', 'Вікове обмеження'),
            surs_age_description:        L('Формирует подборки, которые соответствуют указанному возрастному рейтингу', 'Creates collections that match the specified age rating', 'Формує підбірки, які відповідають вказаному віковому рейтингу'),
            surs_age_toddlers:           L('Для самых маленьких', 'For toddlers', 'Для найменших'),
            surs_age_6:                  L('Для детей не старше 6 лет', 'For children up to 6 years', 'Для дітей до 6 років'),
            surs_age_12:                 L('Для детей не старше 12 лет', 'For children up to 12 years', 'Для дітей до 12 років'),
            surs_age_none:               L('Без ограничений', 'No restrictions', 'Без обмежень'),
            surs_exclude_asian:          L('Исключение азиатских жанров', 'Exclude Asian genres', 'Виключення азійських жанрів'),
            surs_exclude_asian_description: L('Мягкий режим: исключает мангу, маньхву, донхуа. Сильный режим: дополнительно исключает аниме', 'Soft mode: excludes manga, manhwa, donghua. Strong mode: additionally excludes anime', 'М’який режим: виключає мангу, манхву, донхуа. Сильний режим: додатково виключає аніме'),
            surs_exclude_off:            L('Выключено', 'Off', 'Вимкнено'),
            surs_exclude_soft:           L('Мягко', 'Soft', 'М’яко'),
            surs_exclude_strong:         L('Сильно', 'Strong', 'Сильно'),

            surs_name:                   L('Название', 'Name', 'Назва'),
            surs_rename_selections:      L('Переименование подборок', 'Rename collections', 'Перейменування підбірок'),
            surs_rename_description:     L('Введите свое название вместо', 'Enter your name instead of', 'Введіть свою назву замість'),
            surs_enter_new_name:         L('Введите новое название', 'Enter new name', 'Введіть нову назву'),
            surs_name_saved:             L('Название сохранено. Обновление...', 'Name saved. Updating...', 'Назва збережена. Оновлення...'),
            surs_name_not_entered:       L('Название не введено', 'Name not entered', 'Назва не введена'),

            // меню настроек
            surs_section_source:         L('Источник и меню', 'Source and menu', 'Джерело та меню'),
            surs_section_main:           L('Главная страница', 'Main page', 'Головна сторінка'),
            surs_section_content:        L('Состав подборок', 'Collection content', 'Склад підбірок'),
            surs_section_content_hint:   L('Из чего случайно собираются подборки при каждом открытии главной', 'What collections are randomly built from on each main page load', 'З чого випадково збираються підбірки при кожному відкритті головної'),
            surs_section_service:        L('Сервис', 'Service', 'Сервіс'),
            surs_lite_hint:              L('Для NEW / KIDS / RUS состав подборок фиксированный', 'NEW / KIDS / RUS have a fixed set of collections', 'Для NEW / KIDS / RUS склад підбірок фіксований'),
            surs_enabled_of:             L('Включено {n} из {total}', 'Enabled {n} of {total}', 'Увімкнено {n} з {total}'),
            surs_none:                   L('ничего не выбрано', 'nothing selected', 'нічого не вибрано'),
            surs_yes:                    L('Да', 'Yes', 'Так'),
            surs_no:                     L('Нет', 'No', 'Ні'),
            surs_current_name:           L('Сейчас', 'Current', 'Зараз'),
            surs_tile_rows:              L('Ряды-кнопки', 'Button rows', 'Ряди-кнопки'),
            surs_tile_rows_description:  L('навигация, стриминги, жанры, студии', 'navigation, streaming, genres, studios', 'навігація, стрімінги, жанри, студії'),
            surs_rows_nav:               L('Навигационное меню', 'Navigation menu', 'Навігаційне меню'),
            surs_rows_genres:            L('Жанры', 'Genres', 'Жанри'),
            surs_studios_world_title:    L('Киностудии', 'Film studios', 'Кіностудії'),
            surs_studios_russian_title:  L('Российские студии', 'Russian studios', 'Російські студії'),
            surs_rows_persons:           L('Популярные актёры и их фильмы', 'Popular actors and their movies', 'Популярні актори та їхні фільми'),
            surs_rows_persons_rus:       L('Российские актёры и их фильмы', 'Russian actors and their movies', 'Російські актори та їхні фільми'),
            surs_rows_keywords:          L('Подборки по темам (космос, зомби, шпионы…)', 'Topic collections (space, zombies, spies…)', 'Підбірки за темами (космос, зомбі, шпигуни…)'),
            surs_rows_collections:       L('Коллекции и франшизы', 'Collections and franchises', 'Колекції та франшизи'),
            surs_collection:             L('Коллекция', 'Collection', 'Колекція'),
            surs_rows_streaming_sep:     L('Подборки со стримингов', 'Streaming collections', 'Підбірки зі стрімінгів'),
            surs_strmngs_global_title:   L('Глобальные стриминги', 'Global Streaming', 'Глобальні стрімінги'),
            surs_strmngs_russian_title:  L('Российские стриминги', 'Russian Streaming', 'Російські стрімінги'),
            surs_collections_types:      L('Виды подборок', 'Collection types', 'Види підбірок'),
            surs_movies_by_genre:        L('Фильмы по жанрам', 'Movies by genre', 'Фільми за жанрами'),
            surs_tv_by_genre:            L('Сериалы по жанрам', 'TV shows by genre', 'Серіали за жанрами'),
            surs_rating_short:           L('отсекает фильмы с малым числом голосов', 'hides titles with few votes', 'відсікає фільми з малою кількістю голосів'),
            surs_age_short:              L('возрастной рейтинг подборок', 'age rating of collections', 'віковий рейтинг підбірок'),
            surs_exclude_short:          L('манга, маньхва, донхуа, аниме', 'manga, manhwa, donghua, anime', 'манга, манхва, донхуа, аніме'),
            surs_refresh_main:           L('Обновить главную', 'Refresh main page', 'Оновити головну'),
            surs_refresh_main_description: L('Главная SURS также обновляется сама при выходе из настроек, если что-то изменилось', 'SURS main page also refreshes itself when you leave settings after changes', 'Головна SURS також оновлюється сама при виході з налаштувань, якщо щось змінилося'),
            surs_reset:                  L('Сбросить настройки SURS', 'Reset SURS settings', 'Скинути налаштування SURS'),
            surs_reset_description:      L('Только для текущего профиля', 'Current profile only', 'Тільки для поточного профілю'),
            surs_reset_done:             L('Настройки сброшены', 'Settings reset', 'Налаштування скинуто'),

            // используются модулем surs_nav_buttons.js
            surs_main:                   L('Главная', 'Main', 'Головна'),
            surs_bookmarks:              L('Избранное', 'Bookmarks', 'Обране'),
            surs_history:                L('История', 'History', 'Історія'),
            surs_select:                 L('Разделы', 'Sections', 'Розділи'),
            surs_kids:                   L('Детское', 'Kids', 'Дитяче')
        });
    }

    /* =====================================================================
     *  ЗАПУСК
     * ===================================================================== */

    function init() {
        if (!(Lampa.Manifest && Lampa.Manifest.app_digital >= 300)) {
            console.warn('SURS', 'этот модуль только для Lampa 3.0+');
            return;
        }

        addTranslations();

        if (!Settings.get('interface_size_initialized', false)) {
            Lampa.Storage.set('interface_size', 'small');
            Settings.set('interface_size_initialized', true);
        }

        Settings.dirty = false;

        registerSources();
        startSourceListeners();
        renderMenuButtons();

        Lampa.Listener.follow('profile', function (e) {
            if (e.type === 'changed') renderMenuButtons();
        });

        if (!Lampa.Storage.get('surs_disableMenu')) initSettings();

        // API для других модулей
        window.SURS = {
            version: '3.1',
            screen: CONFIG.liteScreen,
            settings: Settings,
            sourceNames: sourceNames,
            isSursSource: isSursSource,
            keywordsFilter: UserFilters.keywords,
            openMain: openMain
        };

        Lampa.Listener.send('surs', { type: 'ready' });
    }

    if (window.appready) init();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') init();
        });
    }
})();
