/* ==== Поддержка автора ==== */

// Буду благодарен за поддержку! Мечтаю собрать на ПАЗик, чтобы построить из него автодом, отдыхать с семьей у реки.  Но и сам процес постройки, честно говоря, видится мне не менее увлекательным занятием.

//Да ПАЗик, будет на японском моторе, погугли, очень интересный донор под автодом.

//Кто то лодку покупает, мне стрельнул в голову автобус. Такая взрослая жизнь.

//С женой уговор, заработаю на покупку на хобби, бухтеть не булет, поэтому прошу поддержать. 

//Дабы отработать свой хлеб, ниже будет описание процеса установки и настройки, для удобства вынес для тебя некоторые настройки.

// Любая сумма поможет, в комментарии укажи "это тебе на ПАЗик".  
// **СБЕР:** +7 923 668 0000  




/* ==== Информация о плагине ==== */

// Плагин создает уникальные подборки фильмов и сериалов на главной странице по жанрам, стримингам, популярности, просмотрам и кассовым сборам.  
// Обновление подборок происходит при каждом нажатии кнопки "Главная" (Home).

// ======= Установка =======
//  Если у тебя свой сервер, файл положить в wwwroot.  
// 1. Для индивидуального использования:  
//    - В Лампа открыть "Настройки" → "плагины".  
//    - В разделе плагинов прописать: ВашАдрес/surs.js.  

// 2. Для загрузки плагина всем пользователям:  
//    - Добавить в lampainit.js строку:  
//    - Lampa.Utils.putScriptAsync(["/surs.js"], function() {});



// ======= Настройки =========
//Для запрета пользователю менять название подборок, используй:
//Lampa.Storage.set('surs_disableCustomName', true); //это скроет пункт меню с вводом собственного названия 

//Для установки своего названия для всех используй:
//Lampa.Storage.set('surs_name', 'YOURS_TITLE');

//Для скрытия всего меню "подборки" используй 
//Lampa.Storage.set('surs_disableMenu', true);

/* ==== Дополнения ==== */

// Плагин работает как автономно (с ручным выбором источника через настройки), так и совместно с плагином для добавления профилей  на один аккаунт:  

// [Плагин профилей от Levende]
//https://levende.github.io/lampa-plugins/profiles.js.  

// - Детские и Русские профили получают отдельные подборки на главной странице, переключение происходит автоматически при смене профиля.  

// - Для автоматического переключения между детским, русским и основным источником, в профиле должен быть указан параметр:  
//   -  "surs": true — активирует автоматическое назначенте surs основным источником.
//   - "forKids": true — переключает источник автоматически на детский.
//  - "onlyRus": true — переключает источник автоматически на российский.


// ====Пример конфигурации профилей ====

// необходимо модифицировать init.conf для работы с profiles.js:  

// Добавляет 5 профилей на один аккаунт (пароль/почта/логин).  
// Иконки профилей нужно разместить в wwwroot/profileIcons  


/*
  "accounts": {
    "test1": "2026-01-10T00:00:00",
      "pochta235@rambler.ru": "2024-06-15T00:00:00",
      "vasyapupkin@yandex.ru": "2024-06-15T00:00:00",
    },

"params": {
    "profiles": [
      {
        "id": "",
        "title": "Он",
        "icon": "/profileIcons/id1.png", // иконки для примера
        "params": {
        
          "surs": true — у этого профиля автоматически будет включен основной источник.

        }
      },
      {
        "id": "_id2",
        "title": "Она",
        "icon": "/profileIcons/id2.png",
        "params": {
         "surs": true //— у этого профиля автоматически будет включен основной источник. Этот флаг отвечает в целом, за автоматическое переключение источника.

        }
      },
      {
        "id": "_id3",
        "title": "Ребенок",
        "icon": "/profileIcons/id3.png",
        "params": {
         "surs": true //даем понять что нужно переключать источники.
        "forKids": true //даем понять что переключать необходимо на детский вариант.
        }
      },

 {
        "id": "_id4",
        "title": "Ребенок",
        "icon": "/profileIcons/id4.png",
        "params": {
         "surs": true 
        "forKids": true //даем понять что переключать необходимо на детский вариант
 
        }
      },

 {
        "id": "_id5",
        "title": "Родственники",
        "icon": "/profileIcons/id5.png",
        "params": {
        "surs": true 
        "onlyRus": true //даем понять что переключать необходимо на российские подборки 
 
        }
      }

    ]
  }
  
 //напоминаю про ПАЗик.
*/


(function (  ) {
    'use strict';
   
// Опции сортировки
var allSortOptions = [
    { id: 'vote_count.desc', title: 'Много голосов' },
    { id: 'vote_average.desc', title: 'Высокий рейтинг' },
    { id: 'first_air_date.desc', title: 'Новинки' },
    { id: 'popularity.desc', title: 'Популярные' },
    { id: 'revenue.desc', title: 'Интерес зрителей' }
];

// Жанры фильмов
var allGenres = [
    { id: 28, title: 'боевики' },
    { id: 35, title: 'комедии' },
    { id: 18, title: 'драмы' },
    { id: 10749, title: 'мелодрамы' },
    { id: 16, title: 'мультфильмы' },
    { id: 10762, title: 'детское' },
    { id: 12, title: 'приключения' },
    { id: 80, title: 'криминал' },
    { id: 9648, title: 'детективы' },
    { id: 878, title: 'фантастика' },
    //{ id: 10752, title: 'военные' },
    { id: 37, title: 'вестерны' },
    { id: 53, title: 'триллеры' },
    { id: 10751, title: 'семейные' },
    { id: 14, title: 'фэнтези' },
    { id: 10764, title: 'реалити-шоу' },
    { id: 10759, title: 'боевики и приключения' },
    { id: 10766, title: 'мыльные оперы' },
    { id: 10767, title: 'ток-шоу' }, 
    ];

// Стриминговые сервисы
var allStreamingServices = [
    { id: 49, title: 'HBO' },
    { id: 77, title: 'SyFy' },
    { id: 2552, title: 'Apple TV+' },
    { id: 453, title: 'Hulu' },
    { id: 1024, title: 'Amazon Prime' },
    { id: 213, title: 'Netflix' },
    { id: 3186, title: 'HBO Max' },
    { id: 2076, title: 'Paramount network' },
    { id: 4330, title: 'Paramount+' },
    { id: 3353, title: 'Peacock' },
    { id: 2739, title: 'Disney+' },
    { id: 2, title: 'ABC' },
    { id: 6, title: 'NBC' },
    { id: 16, title: 'CBS' },
    { id: 318, title: 'Starz' },
    { id: 174, title: 'AMC' },
    { id: 19, title: 'FOX' },
    { id: 64, title: 'Discovery' },
    { id: 1778, title: 'test' },
    { id: 493, title: 'BBC America' },
    { id: 88, title: 'FX' },
    { id: 67, title: 'Showtime' },
    
];

var allStreamingServicesRUS = [
    { id: 2493, title: 'Start' },
    { id: 2859, title: 'Premier' },
    { id: 4085, title: 'KION' },
    { id: 3923, title: 'ИВИ' },
    { id: 412, title: 'Россия 1' },
    { id: 558, title: 'Первый канал' },
    { id: 3871, title: 'Okko' },
    { id: 3827, title: 'Кинопоиск' },
    { id: 5806, title: 'Wink' },
    { id: 806, title: 'СТС' },
    { id: 1191, title: 'ТНТ' },
    { id: 1119, title: 'НТВ' },
    { id: 3031, title: 'Пятница'},
    { id: 3882, title: 'More.TV' }
];

// Функция получения всех настроек
function getAllStoredSettings() {
    return Lampa.Storage.get('surs_settings') || {}; // Загружаем общий объект
}

// Функция получения настроек текущего пользователя
function getProfileSettings() {
    var profileId = Lampa.Storage.get('lampac_profile_id', '') || 'default';
    var allSettings = getAllStoredSettings();
    
    if (!allSettings.hasOwnProperty(profileId)) {
        allSettings[profileId] = {}; // Если профиля нет, создаем пустой объект
        saveAllStoredSettings(allSettings);
    }

    return allSettings[profileId];
}

// Функция сохранения всех настроек
function saveAllStoredSettings(settings) {
    Lampa.Storage.set('surs_settings', settings);
}

// Функция получения конкретного сохраненного значения (по умолчанию true)
function getStoredSetting(key, defaultValue) {
    var profileSettings = getProfileSettings();
    return profileSettings.hasOwnProperty(key) ? profileSettings[key] : defaultValue;
}

// Функция сохранения отдельного значения
function setStoredSetting(key, value) {
    var allSettings = getAllStoredSettings();
    var profileId = Lampa.Storage.get('lampac_profile_id', '') || 'default';

    if (!allSettings.hasOwnProperty(profileId)) {
        allSettings[profileId] = {}; // Создаем профиль, если его нет
    }

    allSettings[profileId][key] = value; // Обновляем значение
    saveAllStoredSettings(allSettings);
}

// Функция фильтрации включенных элементов
function getEnabledItems(allItems, storageKeyPrefix) {
    var result = [];
    for (var i = 0; i < allItems.length; i++) {
        if (getStoredSetting(storageKeyPrefix + allItems[i].id, true)) {
            result.push(allItems[i]);
        }
    }
    return result; 
}

function getSortOptions() {
    return getEnabledItems(allSortOptions, 'sort_');
}

function getGenres() {
    return getEnabledItems(allGenres, 'genre_');
}

function getStreamingServices() {
    return getEnabledItems(allStreamingServices, 'streaming_');
}

function getStreamingServicesRUS() {
    return getEnabledItems(allStreamingServicesRUS, 'streaming_rus_');
}


function startPlugin() {
    window.plugin_tmdb_mod_ready = true;

    var Episode = function (data) {
        var card = data.card || data;
        var episode = data.next_episode_to_air || data.episode || {};
        if (card.source == undefined) card.source = 'tmdb';
        Lampa.Arrays.extend(card, {
            title: card.name,
            original_title: card.original_name,
            release_date: card.first_air_date
        });
        card.release_year = ((card.release_date || '0000') + '').slice(0, 4);

        function remove(elem) {
            if (elem) elem.remove();
        }

        this.build = function () {
            this.card = Lampa.Template.js('card_episode');
            this.img_poster = this.card.querySelector('.card__img') || {};
            this.img_episode = this.card.querySelector('.full-episode__img img') || {};
            this.card.querySelector('.card__title').innerText = card.title;
            this.card.querySelector('.full-episode__num').innerText = card.unwatched || '';
            if (episode && episode.air_date) {
                this.card.querySelector('.full-episode__name').innerText = ('s' + (episode.season_number || '?') + 'e' + (episode.episode_number || '?') + '. ') + (episode.name || Lampa.Lang.translate('noname'));
                this.card.querySelector('.full-episode__date').innerText = episode.air_date ? Lampa.Utils.parseTime(episode.air_date).full : '----';
            }

            if (card.release_year == '0000') {
                remove(this.card.querySelector('.card__age'));
            } else {
                this.card.querySelector('.card__age').innerText = card.release_year;
            }

            this.card.addEventListener('visible', this.visible.bind(this));
        };

        this.image = function () {
            var _this = this;
            this.img_poster.onload = function () { };
            this.img_poster.onerror = function () {
                _this.img_poster.src = './img/img_broken.svg';
            };
            this.img_episode.onload = function () {
                _this.card.querySelector('.full-episode__img').classList.add('full-episode__img--loaded');
            };
            this.img_episode.onerror = function () {
                _this.img_episode.src = './img/img_broken.svg';
            };
        };

        this.create = function () {
            var _this2 = this;
            this.build();
            this.card.addEventListener('hover:focus', function () {
                if (_this2.onFocus) _this2.onFocus(_this2.card, card);
            });
            this.card.addEventListener('hover:hover', function () {
                if (_this2.onHover) _this2.onHover(_this2.card, card);
            });
            this.card.addEventListener('hover:enter', function () {
                if (_this2.onEnter) _this2.onEnter(_this2.card, card);
            });
            this.image();
        };

        this.visible = function () {
            if (card.poster_path) this.img_poster.src = Lampa.Api.img(card.poster_path);
            else if (card.profile_path) this.img_poster.src = Lampa.Api.img(card.profile_path);
            else if (card.poster) this.img_poster.src = card.poster;
            else if (card.img) this.img_poster.src = card.img;
            else this.img_poster.src = './img/img_broken.svg';
            if (card.still_path) this.img_episode.src = Lampa.Api.img(episode.still_path, 'w300');
            else if (card.backdrop_path) this.img_episode.src = Lampa.Api.img(card.backdrop_path, 'w300');
            else if (episode.img) this.img_episode.src = episode.img;
            else if (card.img) this.img_episode.src = card.img;
            else this.img_episode.src = './img/img_broken.svg';
            if (this.onVisible) this.onVisible(this.card, card);
        };

        this.destroy = function () {
            this.img_poster.onerror = function () { };
            this.img_poster.onload = function () { };
            this.img_episode.onerror = function () { };
            this.img_episode.onload = function () { };
            this.img_poster.src = '';
            this.img_episode.src = '';
            remove(this.card);
            this.card = null;
            this.img_poster = null;
            this.img_episode = null;
        };

        this.render = function (js) {
            return js ? this.card : $(this.card);
        };
    };

    // Основной код SourceTMDB
    var SourceTMDB = function (parent) {
        // Создаем сетевой запрос
        this.network = new Lampa.Reguest();
        this.discovery = false;

        var LNUM_COLLECTIONS_BASE_URL = 'https://lnum-collections.levende-develop.workers.dev/list';
        var LNUM_TOKEN = '3JD0NTDjgmmYyR9U_avaimovie';
        var SESSION_ID = Lampa.Utils.uid();
        var SOURCE_NAME = 'LNUM';
        var CACHE_SIZE = 100;
        var CACHE_TIME = 1000 * 60 * 60 * 10; // 
        var cache = {};

        var COLLECTIONS = [];


function getCache(key) {
    var cacheKey = 'cache_' + encodeURIComponent(key); // Уникальный ключ для кэша
    var cachedData = getStoredSetting(cacheKey, null);
    
    if (cachedData) {
        var cache_timestamp = Date.now() - CACHE_TIME;
        if (cachedData.timestamp > cache_timestamp) {
            return cachedData.value;
        }
        
        var allSettings = getAllStoredSettings();
        var profileId = Lampa.Storage.get('lampac_profile_id', '') || 'default';
        var profileSettings = allSettings[profileId] || {};
        
        for (var storedKey in profileSettings) {
            if (storedKey.startsWith('cache_')) {
                var node = profileSettings[storedKey];
                if (!(node && node.timestamp > cache_timestamp)) {
                    delete profileSettings[storedKey];
                }
            }
        }
        allSettings[profileId] = profileSettings;
        saveAllStoredSettings(allSettings);
    }
    return null;
}

function setCache(key, value) {
    var cacheKey = 'cache_' + encodeURIComponent(key); // Уникальный ключ для кэша
    var timestamp = Date.now();
    
    // Проверка размера кэша
    var allSettings = getAllStoredSettings();
    var profileId = Lampa.Storage.get('lampac_profile_id', '') || 'default';
    var profileSettings = allSettings[profileId] || {};
    
    var cacheKeys = Object.keys(profileSettings).filter(k => k.startsWith('cache_'));
    var size = cacheKeys.length;
    
    if (size >= CACHE_SIZE) {
        var cache_timestamp = timestamp - CACHE_TIME;
        for (var storedKey in profileSettings) {
            if (storedKey.startsWith('cache_')) {
                var node = profileSettings[storedKey];
                if (!(node && node.timestamp > cache_timestamp)) {
                    delete profileSettings[storedKey];
                }
            }
        }
        
        cacheKeys = Object.keys(profileSettings).filter(k => k.startsWith('cache_'));
        size = cacheKeys.length;
        
        if (size >= CACHE_SIZE) {
            var timestamps = cacheKeys.map(k => profileSettings[k]?.timestamp || 0);
            timestamps.sort((a, b) => a - b);
            cache_timestamp = timestamps[Math.floor(timestamps.length / 2)];
            
            for (var storedKey in profileSettings) {
                if (storedKey.startsWith('cache_')) {
                    var node = profileSettings[storedKey];
                    if (!(node && node.timestamp > cache_timestamp)) {
                        delete profileSettings[storedKey];
                    }
                }
            }
        }
    }
    
    setStoredSetting(cacheKey, {
        timestamp: timestamp,
        value: value
    });
}

        function normalizeData(json) {
            return {
                results: (json.results || []).map(function (item) {
                    var dataItem = {
                        id: item.id,
                        name: item.name || item.title,
                        original_name: item.original_name || item.original_title || item.name || 'Unknown',
                        number_of_seasons: item.number_of_seasons,
                        seasons: item.seasons,
                        last_episode_to_air: item.last_episode_to_air,
                        first_air_date: item.first_air_date,
                        release_date: item.release_date,
                        poster_path: item.poster_path || item.poster || item.img || '',
                        overview: item.overview || item.description || '',
                        vote_average: item.vote_average || 0,
                        vote_count: item.vote_count || 0,
                        backdrop_path: item.backdrop_path || item.backdrop || '',
                        still_path: item.still_path || '',
                        source: SOURCE_NAME,
                        release_quality: item.release_quality || '',
                    };
                    dataItem.promo_title = dataItem.name;
                    dataItem.promo = dataItem.overview;
                    return dataItem;
                }),
                page: json.page || 1,
                total_pages: json.total_pages || json.pagesCount || 1,
                total_results: json.total_results || json.total || 0
            };
        }

        this.getFromCache = function (url, params, onComplete, onError) {
            var json = getCache(url);
            if (json) {
                onComplete(normalizeData(json));
            } else {
                this.network.silent(url, function (json) {
                    if (!json) {
                        onError(new Error('Empty response from server'));
                        return;
                    }
                    var normalizedJson = normalizeData(json);
                    setCache(url, normalizedJson);
                    onComplete(normalizedJson);
                }, function (error) {
                    onError(error);
                });
            }
        };

        this.main = function (params = {}, onComplete = () => { }, onError = () => { }) {
            var owner = this;
            var partsLimit = 12;

            function filterCyrillic(items) {
                var storedValue = getStoredSetting('cirillic');
                var isFilterEnabled = storedValue === '1' || storedValue === null || storedValue === undefined || storedValue === '';

                if (!isFilterEnabled) {
                    return items;
                }

                function containsCyrillic(value) {
                    if (typeof value === 'string') {
                        return /[а-яА-ЯёЁ]/.test(value);
                    } else if (typeof value === 'object' && value !== null) {
                        var keys = Object.keys(value);
                        for (var i = 0; i < keys.length; i++) {
                            if (containsCyrillic(value[keys[i]])) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                var filteredItems = items.filter(function (item) {
                    return containsCyrillic(item);
                });

                var excludedItems = items.filter(function (item) {
                    return !containsCyrillic(item);
                });


                return filteredItems;
            }

            function applyFilters(items) {
                items = filterCyrillic(items);
                return items;
            }

            function applyMinVotes(baseUrl) {
                var minVotes = getStoredSetting('minVotes');
                minVotes = parseInt(minVotes, 10);
                if (isNaN(minVotes)) {
                    minVotes = 10;
                }

                if (minVotes > 0) {
                    baseUrl += '&vote_count.gte=' + minVotes;
                }

                return baseUrl;
            }

            function applyAgeRestriction(baseUrl) {
                var ageRestriction = getStoredSetting('ageRestrictions');

                if (ageRestriction && String(ageRestriction).trim() !== '') {
                    var certificationMap = {
                        '0+': '0+',
                        '6+': '6+',
                        '12+': '12+',
                        '16+': '16+',
                        '18+': '18+'
                    };

                    if (certificationMap.hasOwnProperty(ageRestriction)) {
                        baseUrl += '&certification_country=RU&certification=' + encodeURIComponent(certificationMap[ageRestriction]);
                    }
                }

                return baseUrl;
            }
// не работает, надо почистить

            function excludeAsia(baseUrl) {
                var filterLevel = getStoredSetting('withoutKeywords');

                var baseExcludedCountries = [];

                if (!filterLevel || filterLevel == '1') {
                    baseExcludedCountries.push('KR', 'CN', 'TW', 'TH', 'VN', 'PH', 'IN', 'UA');
                }

                if (filterLevel == '2') {
                    baseExcludedCountries.push('KR', 'CN', 'TW', 'TH', 'VN', 'PH', 'IN', 'UA', 'JP');
                }

                baseUrl += '&without_origin_country=' + encodeURIComponent(baseExcludedCountries.join(','));

                return baseUrl;
            }

            function applyWithoutKeywords(baseUrl) {
                var filterLevel = getStoredSetting('withoutKeywords');

                var baseExcludedKeywords = [
                    '346488', // Гей-тематика
                    '158718', // ЛГБТ-тематика
                    '41278'   // Российская политика
                ];

                if (!filterLevel || filterLevel == '1') {
                    baseExcludedKeywords.push(
                        '13141',   // Основано на манге
                        '345822',  // Основано на 4-кома манге
                        '315535',  // Донхуа (китайская анимация)
                        '290667',  // Основано на маньхуа
                        '323477',  // Основано на манхве
                        '290609'   // Манхва
                    );
                }

                if (filterLevel == '2') {
                    baseExcludedKeywords.push(
                        '210024',  // Аниме
                        '13141',   // Основано на манге
                        '345822',  // Основано на 4-кома манге
                        '315535',  // Донхуа (китайская анимация)
                        '290667',  // Основано на маньхуа
                        '323477',  // Основано на манхве
                        '290609'   // Манхва
                    );
                }

                baseUrl += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));

                return baseUrl;
            }

            function buildApiUrl(baseUrl) {
                baseUrl = applyMinVotes(baseUrl);
                baseUrl = applyAgeRestriction(baseUrl);
                baseUrl = applyWithoutKeywords(baseUrl);
                return baseUrl;
            }

            function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }

            function adjustSortForMovies(sort) {
                if (sort.id === 'first_air_date.desc') {
                    sort = { id: 'release_date.desc', title: 'Новинки' };
                }

                if (sort.id === 'release_date.desc') {
                    var endDate = new Date();
                    endDate.setDate(endDate.getDate() - 25);
                    endDate = endDate.toISOString().split('T')[0];

                    var startDate = new Date();
                    startDate.setFullYear(startDate.getFullYear() - 1);
                    startDate = startDate.toISOString().split('T')[0];

                    sort.extraParams = '&release_date.gte=' + startDate + '&release_date.lte=' + endDate;
                }

                return sort;
            }

            function adjustSortForTVShows(sort) {
                if (sort.id === 'first_air_date.desc') {
                    var endDate = new Date();
                    endDate.setDate(endDate.getDate() - 10);
                    endDate = endDate.toISOString().split('T')[0];

                    var startDate = new Date();
                    startDate.setFullYear(startDate.getFullYear() - 1);
                    startDate = startDate.toISOString().split('T')[0];
                    sort.extraParams = '&first_air_date.gte=' + startDate + '&first_air_date.lte=' + endDate;
                }

                return sort;
            }

            // Основные подборки
            var partsData = [
                function (callback) {
                    var baseUrl = 'trending/all/week';
                    baseUrl = applyAgeRestriction(baseUrl);

                    owner.get(baseUrl, params, function (json) {
                        if (json.results) {
                            json.results = json.results.filter(function (result) {
                                var forbiddenCountries = ['KR', 'CN', 'JP'];
                                return !result.origin_country || !result.origin_country.some(function (country) {
                                    return forbiddenCountries.includes(country);
                                });
                            });
                        }
                        json.title = Lampa.Lang.translate('Популярно на этой недели');
                        callback(json);
                    }, callback);
                },
                function (callback) {
                    var parts = [];
                    var parts_limit = 12;
                    Lampa.Api.partPersons(parts, parts_limit, 'tv')(function (result) {
                        if (result) {
                            callback(result);
                        } else {
                            callback({ results: [], nomore: true });
                        }
                    });
                }
            ];

            var CustomData = [];

            var upcomingEpisodesRequest = function (callback) {
                callback({
                    source: 'tmdb',
                    results: Lampa.TimeTable.lately().slice(0, 20),
                    title: Lampa.Lang.translate('title_upcoming_episodes'),
                    nomore: true,
                    cardClass: function (_elem, _params) {
                        return new Episode(_elem, _params);
                    }
                });
            };

            function getPopularPersons() {
                return function (callback) {
                    var baseUrl = 'person/popular';

                    owner.get(baseUrl, params, function (json) {
                        if (json.results) {
                            json.results = json.results.filter(function (result) {
                                return true;
                            });
                        }
                        json.title = Lampa.Lang.translate('Популярные персоны');
                        callback(json);
                    }, callback);
                };
            }

            CustomData.push(getPopularPersons());


            function getCollection(collectionSrc, index, name) {
                return function (callback) {
                    var lang = Lampa.Storage.get('tmdb_lang', 'ru');
                    var page = params.page || 1;
                    var url = LNUM_COLLECTIONS_BASE_URL + '/' + collectionSrc.name + '/' + index + '?language=' + lang + '&page=' + page + '&api_key=' + Lampa.TMDB.key() + '&lnum_token=' + LNUM_TOKEN + '&session_id=' + SESSION_ID;

                    owner.getFromCache(url, params, function (json) {
                        var result = {
                            url: 'collection__' + collectionSrc.name + '/' + index,
                            title: name,
                            page: page,
                            total_results: json.total_results || 0,
                            total_pages: json.total_pages || 1,
                            more: json.total_pages > page,
                            results: json.results || [],
                            source: SOURCE_NAME,

                        };
                        callback(result);
                    }, function (error) {
                        callback({ error: error });
                    });
                };
            }
            
function getCollectionLines() {
    var collectionLinesRaw = [];

    if (COLLECTIONS.length === 0) {
        return [];
    }

    COLLECTIONS.forEach(function (collectionSrc) {
        for (var i = 0; i < collectionSrc.list.length; i++) {
            collectionLinesRaw.push({
                path: '/' + collectionSrc.name + '/' + (i + 1),
                name: collectionSrc.list[i]
            });
        }
    });


    shuffleArray(collectionLinesRaw);
    collectionLinesRaw = collectionLinesRaw.slice(0, 75);

    var finalLines = [];
    var previousHadTrue = false;

    for (var i = 0; i < collectionLinesRaw.length; i++) {
        var item = collectionLinesRaw[i];
        var useTrue = false;

        if (!previousHadTrue && Math.random() < 0.28) {
            useTrue = true;
            previousHadTrue = true;
        } else {
            previousHadTrue = false;
        }

        finalLines.push((function (path, name, useTrueFlag) {
            return function (callback) {
                var index = parseInt(path.split('/').pop());
                var collectionName = path.split('/')[1];
                var collectionSrc = COLLECTIONS.find(function (c) { return c.name === collectionName; });
                if (collectionSrc) {
                    var request = getCollection(collectionSrc, index, name);
                    request(function (json) {
                        if (useTrueFlag) {
                            if (Array.isArray(json.results)) {
                                json.results.forEach(function (card) {
                                    card.promo = card.overview;
                                    card.promo_title = card.title || card.name;
                                });
                            }
                        }
                        callback(json);
                    });
                } else {
                    callback({ error: new Error('Collection not found') });
                }
            };
        })(item.path, item.name, useTrue));
    }

    return finalLines;
}


            // Функция получения стримингов с жанрами
            function getStreamingWithGenres(serviceName, serviceId, isRussian) {
                return function (callback) {
                    var sortOptions = getSortOptions();
                    var genres = getGenres();

                    var sort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
                    var genre = genres[Math.floor(Math.random() * genres.length)];

                    var apiUrl = 'discover/tv?with_networks=' + serviceId +
                        '&with_genres=' + genre.id +
                        '&sort_by=' + sort.id;

                    if (isRussian) {
                        apiUrl = applyAgeRestriction(apiUrl);
                        apiUrl = applyWithoutKeywords(apiUrl);
                    } else {
                        apiUrl = buildApiUrl(apiUrl);
                    }
                    apiUrl = excludeAsia(apiUrl);

                    owner.get(apiUrl, params, function (json) {
                        if (json.results) {
                            json.results = applyFilters(json.results);
                        }

                        json.title = Lampa.Lang.translate(sort.title + ' (' + genre.title + ') на ' + serviceName);
                        callback(json);
                    }, callback);
                };
            }

            // Функция получения стримингов без жанров
            function getStreaming(serviceName, serviceId, isRussian) {
                return function (callback) {
                    var sortOptions = getSortOptions();
                    var sort = sortOptions[Math.floor(Math.random() * sortOptions.length)];

                    var apiUrl = 'discover/tv?with_networks=' + serviceId +
                        '&sort_by=' + sort.id;

                    if (isRussian) {
                        apiUrl = applyAgeRestriction(apiUrl);
                        apiUrl = applyWithoutKeywords(apiUrl);
                    } else {
                        apiUrl = buildApiUrl(apiUrl);
                    }
                    apiUrl = excludeAsia(apiUrl);

                    owner.get(apiUrl, params, function (json) {
                        if (json.results) {
                            json.results = applyFilters(json.results);
                        }

                        json.title = Lampa.Lang.translate(sort.title + ' на ' + serviceName);
                        callback(json);
                    }, callback);
                };
            }

            // Функция получения выбранных стриминговых сервисов
            function getSelectedStreamingServices() {
                var includeGlobal = getStoredSetting('getStreamingServices', true);
                var includeRussian = getStoredSetting('getStreamingServicesRUS', true);

                var streamingServices = getStreamingServices();
                var streamingServicesRUS = getStreamingServicesRUS();

                if (includeGlobal && includeRussian) {
                    return streamingServices.concat(streamingServicesRUS);
                } else if (includeGlobal) {
                    return streamingServices;
                } else if (includeRussian) {
                    return streamingServicesRUS;
                }
                return [];
            }

            // Получаем актуальный список сервисов
            var selectedStreamingServices = getSelectedStreamingServices();

            // Добавляем запросы с жанрами
            selectedStreamingServices.forEach(function (service) {
                var isRussian = getStreamingServicesRUS().some(rusService => rusService.id === service.id);
                CustomData.push(getStreamingWithGenres(service.title, service.id, isRussian));
            });

            // Добавляем обычные запросы без жанров
            selectedStreamingServices.forEach(function (service) {
                var isRussian = getStreamingServicesRUS().some(rusService => rusService.id === service.id);
                CustomData.push(getStreaming(service.title, service.id, isRussian));
            });

            // Функция получения фильмов
            function getMovies(genre, options) {
                options = options || {};

                return function (callback) {
                    var sortOptions = getSortOptions();
                    var sort = adjustSortForMovies(sortOptions[Math.floor(Math.random() * sortOptions.length)]);
                    var apiUrl = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.id;

                    if (options.russian) {
                        apiUrl += '&with_origin_country=RU';
                    }

                    if (sort.extraParams) {
                        apiUrl += sort.extraParams;
                    }

                    apiUrl = buildApiUrl(apiUrl);
                    apiUrl = excludeAsia(apiUrl);

                    owner.get(apiUrl, params, function (json) {
                        if (json.results) {
                            if (!options.russian) {
                                json.results = applyFilters(json.results);
                            }
                            json.title = Lampa.Lang.translate(sort.title + (options.russian ? ' - российские' : '') + ' (' + genre.title + ')');
                        }
                        callback(json);
                    }, callback);
                };
            }

            // Функция получения сериалов
            function getTVShows(genre, options) {
                options = options || {};

                return function (callback) {
                    var sortOptions = getSortOptions();
                    var sort = adjustSortForTVShows(sortOptions[Math.floor(Math.random() * sortOptions.length)]);
                    var apiUrl = 'discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.id;

                    if (options.russian) {
                        apiUrl += '&with_origin_country=RU';
                    }

                    if (options.korean) {
                        apiUrl += '&with_origin_country=KR';
                    }

                    if (sort.extraParams) {
                        apiUrl += sort.extraParams;
                    }

                    apiUrl = buildApiUrl(apiUrl);

                    owner.get(apiUrl, params, function (json) {
                        if (json.results) {
                            if (!options.russian && !options.korean) {
                                json.results = applyFilters(json.results);
                            }
                            var titlePrefix = options.russian ? ' - российские' :
                                options.korean ? ' - южнокорейские' : '';
                            json.title = Lampa.Lang.translate(sort.title + titlePrefix + ' сериалы (' + genre.title + ')');
                        }
                        callback(json);
                    }, callback);
                };
            }

            // Получаем актуальный список жанров
            var genres = getGenres();

            // Настройки для фильмов
            var includeGlobalMovies = getStoredSetting('getMoviesByGenreGlobal', true);
            var includeRussianMovies = getStoredSetting('getMoviesByGenreRus', true);

            // Настройки для сериалов
            var isGlobalTVEnabled = getStoredSetting('getTVShowsByGenreGlobal', true);
            var isRussianTVEnabled = getStoredSetting('getTVShowsByGenreRus', true);
            var isKoreanTVEnabled = getStoredSetting('getTVShowsByGenreKOR', true);

            // Добавляем фильмы
            genres.forEach(function (genre) {
                if (includeGlobalMovies) {
                    CustomData.push(getMovies(genre));
                }
                if (includeRussianMovies) {
                    CustomData.push(getMovies(genre, { russian: true }));
                }
            });

            // Добавляем сериалы
            genres.forEach(function (genre) {
                if (isGlobalTVEnabled) {
                    CustomData.push(getTVShows(genre));
                }
                if (isRussianTVEnabled) {
                    CustomData.push(getTVShows(genre, { russian: true }));
                }
                if (isKoreanTVEnabled) {
                    CustomData.push(getTVShows(genre, { korean: true }));
                }
            });

            // Лучшие фильмы и сериалы
            function getBestContentByGenre(genre, contentType) {
                return function (callback) {
                    var apiUrl = 'discover/' + contentType + '?with_genres=' + genre.id +
                        '&sort_by=vote_average.desc' +
                        '&vote_count.gte=500';

                    apiUrl = applyAgeRestriction(apiUrl);
                    apiUrl = applyWithoutKeywords(apiUrl);
                    apiUrl = excludeAsia(apiUrl);
                    owner.get(apiUrl, params, function (json) {
                        if (json.results) {
                            json.results = filterCyrillic(json.results);
                        }

                        json.title = Lampa.Lang.translate(contentType === 'movie'
                            ? 'Топ фильмы (' + genre.title + ')'
                            : 'Топ сериалы (' + genre.title + ')');
                        callback(json);
                    }, callback);
                };
            }

            genres.forEach(function (genre) {
                var isMoviesEnabled = getStoredSetting('getBestContentByGenreMovie', true);
                var isTVEnabled = getStoredSetting('getBestContentByGenreTV', true);

                if (isMoviesEnabled) {
                    CustomData.push(getBestContentByGenre(genre, 'movie'));
                }

                if (isTVEnabled) {
                    CustomData.push(getBestContentByGenre(genre, 'tv'));
                }
            });

            // Подборки по годам
            function getBestContentByGenreAndPeriod(type, genre, startYear, endYear) {
                return function (callback) {
                    var baseUrl = 'discover/' + type + '?with_genres=' + genre.id +
                        '&sort_by=vote_average.desc' +
                        '&vote_count.gte=100' +
                        '&' + (type === 'movie' ? 'primary_release_date' : 'first_air_date') + '.gte=' + startYear + '-01-01' +
                        '&' + (type === 'movie' ? 'primary_release_date' : 'first_air_date') + '.lte=' + endYear + '-12-31';

                    baseUrl = applyAgeRestriction(baseUrl);
                    baseUrl = applyWithoutKeywords(baseUrl);
                    baseUrl = excludeAsia(baseUrl);

                    owner.get(baseUrl, params, function (json) {
                        if (json.results) {
                            json.results = applyFilters(json.results).filter(function (content) {
                                var dateField = type === 'movie' ? 'release_date' : 'first_air_date';

                                return content[dateField] &&
                                    parseInt(content[dateField].substring(0, 4)) >= startYear &&
                                    parseInt(content[dateField].substring(0, 4)) <= endYear;
                            });
                        }
                        json.title = Lampa.Lang.translate('Топ ' + (type === 'movie' ? 'фильмы' : 'сериалы') +
                            ' (' + genre.title + ') за ' + startYear + '-' + endYear);
                        callback(json);
                    }, callback);
                };
            }

            var periods = [
                { start: 1970, end: 1974 },
                { start: 1975, end: 1979 },
                { start: 1980, end: 1984 },
                { start: 1985, end: 1989 },
                { start: 1990, end: 1994 },
                { start: 1995, end: 1999 },
                { start: 2000, end: 2004 },
                { start: 2005, end: 2009 },
                { start: 2010, end: 2014 },
                { start: 2015, end: 2019 },
                { start: 2020, end: 2025 }
            ];

            function getRandomPeriod() {
                var index = Math.floor(Math.random() * periods.length);
                return periods[index];
            }

            genres.forEach(function (genre) {
                var useMovies = getStoredSetting('getBestContentByGenreAndPeriod_movie', true);
                var useTV = getStoredSetting('getBestContentByGenreAndPeriod_tv', true);

                var period1 = getRandomPeriod();
                var period2 = getRandomPeriod();

                while (period2.start === period1.start && period2.end === period1.end) {
                    period2 = getRandomPeriod();
                }

                [period1, period2].forEach(function (period) {
                    if (useMovies) {
                        CustomData.push(getBestContentByGenreAndPeriod('movie', genre, period.start, period.end));
                    }
                    if (useTV) {
                        CustomData.push(getBestContentByGenreAndPeriod('tv', genre, period.start, period.end));
                    }
                });
            });

            function randomWideFlag() {
                return Math.random() < 0.1;
            }

            function wrapWithWideFlag(requestFunc) {
                return function (callback) {
                    requestFunc(function (json) {
                        if (randomWideFlag()) {
                            json.small = true;
                            json.wide = true;

                            if (Array.isArray(json.results)) {
                                json.results.forEach(function (card) {
                                    card.promo = card.overview;
                                    card.promo_title = card.title || card.name;
                                });
                            }
                        }
                        callback(json);
                    });
                };
            }

            // *** Новое: Загрузка коллекций и добавление их в CustomData ***
            function loadCollectionsAndProceed() {
                CustomData = CustomData.map(wrapWithWideFlag);
                CustomData = CustomData.concat(getCollectionLines().map(wrapWithWideFlag));
                shuffleArray(CustomData);
                CustomData.splice(4, 0, upcomingEpisodesRequest);

                var combinedData = partsData.concat(CustomData);


                function loadPart(partLoaded, partEmpty) {
                    Lampa.Api.partNext(combinedData, partsLimit, partLoaded, partEmpty);
                }

                loadPart(onComplete, onError);
                return loadPart;
            }

            // *** Новое: Загрузка коллекций ***
            if (COLLECTIONS.length === 0) {
                this.network.silent(LNUM_COLLECTIONS_BASE_URL + '?session_id=' + SESSION_ID + '&lnum_token=' + LNUM_TOKEN, function (json) {
                    if (json.success) {
                        COLLECTIONS = json.results;
                        console.log('Loaded collections:', COLLECTIONS);
                        return loadCollectionsAndProceed();
                    } else {
                        console.error('Failed to load collections:', json);
                        onError(new Error('Failed to load collections'));
                    }
                }, function (error) {
                    console.error('Request error for collections:', error);
                    onError(error);
                });
            } else {
                return loadCollectionsAndProceed();
            }
        };
    };
    
    
    
    
    
    





/* для детей */

var SourceTMDBkids = function (parent) {
    // Создаем сетевой запрос
    this.network = new Lampa.Reguest();
    this.discovery = false;

    // Главный метод
    this.main = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var onComplete = arguments.length > 1 ? arguments[1] : undefined;
        var onError = arguments.length > 2 ? arguments[2] : undefined;
        var partsLimit = 7;

        // Опции сортировки
        var sortOptions = [
            { key: 'vote_count.desc', title: 'Много голосов' },
            { key: 'vote_average.desc', title: 'Высокий рейтинг' },
            { key: 'first_air_date.desc', title: 'Новинки' },
            { key: 'popularity.desc', title: 'Популярные' },
            { key: 'revenue.desc', title: 'Интерес зрителей' }
        ];

        // Жанры фильмов
      var genres = [
            { id: 28, title: 'боевики' },
            { id: 35, title: 'комедии' },
            { id: 16, title: 'мультфильмы' },
            { id: 10762, title: 'детское' },
            { id: 12, title: 'приключения' },
            { id: 878, title: 'фантастика' },
            { id: 10751, title: 'семейные' },
            { id: 14, title: 'фэнтези' },
        ];

        // Стриминговые сервисы

        var streamingServices = [
    { id: 49, title: 'HBO' },
    { id: 77, title: 'SyFy' },
    { id: 2552, title: 'Apple TV+' },
    { id: 453, title: 'Hulu' },
    { id: 1024, title: 'Amazon Prime' },
    { id: 213, title: 'Netflix' },
    { id: 3186, title: 'HBO Max' },
    { id: 2076, title: 'Paramount+' },
    { id: 3353, title: 'Peacock' },
    { id: 2739, title: 'Disney+' },
    { id: 44, title: 'Disney XD' },
    { id: 281, title: 'Disney XD' },
    { id: 2, title: 'ABC' },  
    { id: 6, title: 'NBC' },  
    { id: 16, title: 'CBS' },  
    { id: 318, title: 'Starz' },  
    { id: 174, title: 'BBC' },      
    { id: 56, title: 'Cartoon Network' }, 
    { id: 19, title: 'FOX' },      
    { id: 2686, title: 'FOX kids' },      
    { id: 13, title: 'Nicelodeon' },
         

];

          
             var streamingServicesRUS = [
            { id: 2493, title: 'Start' },
            { id: 2859, title: 'Premier' },
            { id: 4085, title: 'KION' },
            { id: 3923, title: 'ИВИ' },
            { id: 412, title: 'Россия 1' },
            { id: 558, title: 'Первый канал' },
            { id: 3827, title: 'Кинопоиск' },
            { id: 5806, title: 'Wink' },

            

        ];
        

// Фильтрация кириллица

function filterCyrillic(items) {
    function containsCyrillic(value) {
        if (typeof value === 'string') {
            return /[а-яА-ЯёЁ]/.test(value);
        } else if (typeof value === 'object' && value !== null) {
            for (const val of Object.values(value)) {
                if (containsCyrillic(val)) {
                    return true;  
                }
            }
        }
        return false;
    }

    return items.filter(function (item) {
        return containsCyrillic(item);
    });
}

function applyFilters(items) {
    return filterCyrillic(items);
}


// Функции формирования url с доп параметрами

function applyMinVotes(baseUrl) {
    var minVotes = 5; // Всегда 10 голосов

    baseUrl += '&vote_count.gte=' + minVotes;
    
    return baseUrl;
}


function applyAgeRestriction(baseUrl) {
    var certification = '6+'; // Всегда устанавливаем 7+

    baseUrl += '&certification_country=RU&certification=' + encodeURIComponent(certification);

    return baseUrl;
}

function applyWithoutKeywords(baseUrl) {
    var baseExcludedKeywords = [
        '346488',  
        '158718',  
        '41278',   
        '13141',   // Основано на манге
        '345822',  // Основано на 4-кома манге
        '315535',  // Донхуа (китайская анимация)
        '290667',  // Основано на маньхуа
        '323477',  // Основано на манхве
        '290609'   // Манхва
    ];

    baseUrl += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));

    return baseUrl;
}


function buildApiUrl(baseUrl) {
    baseUrl = applyMinVotes(baseUrl);
    baseUrl = applyAgeRestriction(baseUrl);
    baseUrl = applyWithoutKeywords(baseUrl);
    return baseUrl;
}


        // Перемешивание массива
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        
function adjustSortForMovies(sort) {
    if (sort.key === 'first_air_date.desc') {
        sort = { key: 'release_date.desc', title: 'Новинки' };
    }

    if (sort.key === 'release_date.desc') {
        var endDate = new Date().toISOString().split('T')[0]; // Сегодняшняя дата
        var startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1); // Берем релизы за последний год
        startDate = startDate.toISOString().split('T')[0];

        sort.extraParams = '&release_date.gte=' + startDate + '&release_date.lte=' + endDate;
    }

    return sort;
}



        // Основные данные
var partsData = [
    function (callback) {
        var baseUrl = 'movie/now_playing'; 
        baseUrl = applyAgeRestriction(baseUrl); 

        owner.get(baseUrl, params, function (json) {
            json.title = Lampa.Lang.translate('Сейчас смотрят');
            callback(json);
        }, callback);
    },
    function (callback) {
        var baseUrl = 'trending/movie/week'; 
        baseUrl = applyAgeRestriction(baseUrl); 

        owner.get(baseUrl, params, function (json) {
            json.title = Lampa.Lang.translate('Популярные фильмы');
            callback(json);
        }, callback);
    },
    function (callback) {
        var baseUrl = 'trending/tv/week'; 
        baseUrl = applyAgeRestriction(baseUrl); 

        owner.get(baseUrl, params, function (json) {
            json.title = Lampa.Lang.translate('Популярные сериалы');
            callback(json);
        }, callback);
    }
];

        
                // Запрос для ближайших эпизодов
        var upcomingEpisodesRequest = function (callback) {
            callback({
                source: 'tmdb',
                results: Lampa.TimeTable.lately().slice(0, 20),
                title: Lampa.Lang.translate('title_upcoming_episodes'),
                nomore: true,
                cardClass: function (_elem, _params) {
                    return new Episode(_elem, _params);
                }
            });
        };
        
        
        /* стриминги. */
        

function getStreamingWithGenres(serviceName, serviceId) {
    return function (callback) {
        var sort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
        var genre = genres[Math.floor(Math.random() * genres.length)];
        var apiUrl = buildApiUrl(
            'discover/tv?with_networks=' + serviceId +
            '&with_genres=' + genre.id +
            '&sort_by=' + sort.key +
            '&air_date.lte=' + new Date().toISOString().substr(0, 10)
        );

        owner.get(apiUrl, params, function (json) {
            if (json.results) {
                json.results = applyFilters(json.results);
            }

            json.title = Lampa.Lang.translate(sort.title + ' (' + genre.title + ') на ' + serviceName);
            callback(json);
        }, callback);
    };
}


// Функция запроса только для стриминговых сервисов (без жанров)
function getStreaming(serviceName, serviceId) {
    return function (callback) {
        var sort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
        var apiUrl = buildApiUrl(
            'discover/tv?with_networks=' + serviceId +
            '&sort_by=' + sort.key +
            '&air_date.lte=' + new Date().toISOString().substr(0, 10)
        );

        owner.get(apiUrl, params, function (json) {
            if (json.results) {
                json.results = applyFilters(json.results);
            }

            json.title = Lampa.Lang.translate(sort.title + ' на ' + serviceName);
            callback(json);
        }, callback);
    };
}

var selectedStreamingServices = streamingServices.concat(streamingServicesRUS);

selectedStreamingServices.forEach(function (service) {
    partsData.push(getStreamingWithGenres(service.title, service.id));
    partsData.push(getStreaming(service.title, service.id));
});



//Подборки по фильмам

function getMovies(genre, options = {}) {
    return function (callback) {
        var sort = adjustSortForMovies(sortOptions[Math.floor(Math.random() * sortOptions.length)]);
        var apiUrl = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.key;

        if (options.russian) {
            apiUrl += '&with_original_language=ru';
        }

        if (sort.key === 'release_date.desc') {
            var today = new Date().toISOString().split('T')[0];
            apiUrl += '&release_date.lte=' + today;
            if (options.russian) {
                apiUrl += '&region=RU';
            }
        }

        if (sort.extraParams) {
            apiUrl += sort.extraParams;
        }
        
        apiUrl = buildApiUrl(apiUrl);

        owner.get(apiUrl, params, function (json) {
            if (!options.russian && json.results) {
                json.results = applyFilters(json.results);
            }

            var titlePrefix = options.russian ? ' - российские' : '';
            json.title = Lampa.Lang.translate(sort.title + titlePrefix + ' (' + genre.title + ')');

            callback(json);
        }, callback);
    };
}


genres.forEach(function (genre) {
    partsData.push(getMovies(genre)); 
    partsData.push(getMovies(genre, { russian: true })); 
});

function getTVShows(genre, options = {}) {
    return function (callback) {
        var sort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
        var apiUrl = 'discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.key;

        if (options.russian) {
            apiUrl += '&with_origin_country=RU';
        }
        
        apiUrl = buildApiUrl(apiUrl);

        owner.get(apiUrl, params, function (json) {
            if (!options.russian && json.results) {
                json.results = applyFilters(json.results);
            }

            var titlePrefix = options.russian ? ' - российские' : '';
            json.title = Lampa.Lang.translate(sort.title + titlePrefix + ' сериалы (' + genre.title + ')');

            callback(json);
        }, callback);
    };
}


genres.forEach(function (genre) {

        partsData.push(getTVShows(genre)); 
        partsData.push(getTVShows(genre, { russian: true })); 
    
});

function getAnimatedMovies(options) {
    return function (callback) {
        var genreIds = ['16', '10751']; // 16 - анимация (мультфильм), 10751 - семейный (детское)

        for (var i = 0; i < sortOptions.length; i++) {
            var sort = sortOptions[i];
            var adjustedSort = adjustSortForMovies(sort);
            var apiUrl = 'discover/movie?with_genres=' + genreIds.join(',') + '&sort_by=' + adjustedSort.key;

            if (options && options.russian) {
                apiUrl += '&with_original_language=ru'; // Только российские мультфильмы
            }

            if (adjustedSort.key === 'release_date.desc') {
                var today = new Date().toISOString().split('T')[0];
                apiUrl += '&release_date.lte=' + today;
                if (options && options.russian) {
                    apiUrl += '&region=RU';
                }
            }

            if (adjustedSort.extraParams) {
                apiUrl += adjustedSort.extraParams;
            }

            apiUrl = buildApiUrl(apiUrl);

            owner.get(apiUrl, params, (function (sortOption) {
                return function (json) {
                    if (json.results) {
                        json.results = applyFilters(json.results);
                    }

                    var titlePrefix = options && options.russian ? ' - российские' : '';
                    json.title = Lampa.Lang.translate(sortOption.title + titlePrefix + ' (Мультфильмы, Детское)');

                    callback(json);
                };
            })(sort), callback);
        }
    };
}


for (var j = 0; j < sortOptions.length; j++) {
    partsData.push(getAnimatedMovies()); // Все мультфильмы и детские фильмы
    partsData.push(getAnimatedMovies({ russian: true })); // Только российские мультфильмы
} 


function getBestContentByGenre(genre, contentType) {
    return function (callback) {
        var apiUrl = 'discover/' + contentType + '?with_genres=' + genre.id + 
                     '&sort_by=vote_average.desc' + 
                     '&vote_count.gte=200';

        var russianApiUrl = apiUrl + '&with_origin_country=RU'; 

        apiUrl = applyAgeRestriction(apiUrl);
        apiUrl = applyWithoutKeywords(apiUrl); 

        russianApiUrl = applyAgeRestriction(russianApiUrl);
        russianApiUrl = applyWithoutKeywords(russianApiUrl); 

        // Запрос для общего топа
        owner.get(apiUrl, params, function (json) {
            if (json.results) {
                json.results = filterCyrillic(json.results);
            }

            json.title = Lampa.Lang.translate(contentType === 'movie' 
                ? 'Топ фильмы (' + genre.title + ')'
                : 'Топ сериалы (' + genre.title + ')');

            callback(json);
        }, callback);

        // Запрос для российского топа
        owner.get(russianApiUrl, params, function (russianJson) {
            if (russianJson.results) {
                russianJson.results = filterCyrillic(russianJson.results);
            }

            russianJson.title = Lampa.Lang.translate(contentType === 'movie' 
                ? 'Лучшие российские фильмы (' + genre.title + ')'
                : 'Лучшие российские сериалы (' + genre.title + ')');

            callback(russianJson);
        }, callback);
    };
}

genres.forEach(function (genre) {
    partsData.push(getBestContentByGenre(genre, 'movie'));
    partsData.push(getBestContentByGenre(genre, 'tv'));
});


function getBestContentByGenreAndPeriod(type, genre, startYear, endYear) {
    return function (callback) {
        var baseUrl = 'discover/' + type + '?with_genres=' + genre.id + 
                      '&sort_by=vote_average.desc' + 
                      '&vote_count.gte=100' +
                      '&' + (type === 'movie' ? 'primary_release_date' : 'first_air_date') + '.gte=' + startYear + '-01-01' +
                      '&' + (type === 'movie' ? 'primary_release_date' : 'first_air_date') + '.lte=' + endYear + '-12-31';

        baseUrl = applyAgeRestriction(baseUrl);
        baseUrl = applyWithoutKeywords(baseUrl); 

        owner.get(baseUrl, params, function (json) {
            if (json.results) {
                json.results = applyFilters(json.results).filter(function (content) {
                    var dateField = type === 'movie' ? 'release_date' : 'first_air_date';

                    return content[dateField] &&
                           parseInt(content[dateField].substring(0, 4)) >= startYear &&
                           parseInt(content[dateField].substring(0, 4)) <= endYear;
                });
            }

            json.title = Lampa.Lang.translate('Топ ' + (type === 'movie' ? 'фильмы' : 'сериалы') + 
                         ' (' + genre.title + ') за ' + startYear + '-' + endYear);
            callback(json);
        }, callback);
    };
}

var periods = [
    { start: 1985, end: 1989 },
    { start: 1990, end: 2004 },
    { start: 1995, end: 1999 },
    { start: 2000, end: 2004 },
    { start: 2005, end: 2009 },
    { start: 2010, end: 2014 },
    { start: 2015, end: 2019 },
    { start: 2020, end: 2025 }
];

function getRandomPeriod() {
    var index = Math.floor(Math.random() * periods.length);
    return periods[index];
}

genres.forEach(function (genre) {
    var period = getRandomPeriod(); // Добавляем выбор случайного периода
    partsData.push(getBestContentByGenreAndPeriod('movie', genre, period.start, period.end));
    partsData.push(getBestContentByGenreAndPeriod('tv', genre, period.start, period.end));
});

//по ключевым словам


var forKids = [
    { id: 1, title: 'Спанч Боб' },
    { id: 2, title: 'Губка Боб' },
    { id: 3, title: 'Teenage Mutant Ninja Turtles' },
    { id: 4, title: 'Черепашки-ниндзя' },
    { id: 5, title: 'Fairly OddParents' },
    { id: 6, title: 'Джимми Нейтрон' },
    { id: 8, title: 'Аватар: Легенда об Аанге' },
    { id: 9, title: 'Аватар: Легенда о Корре' },
    { id: 101, title: 'Lego' },
    { id: 102, title: 'Том и Джерри' },
    { id: 103, title: 'Микки Маус' },
    { id: 104, title: 'Гуфи' },
    { id: 105, title: 'Снупи' },
    { id: 106, title: 'Простоквашино' },
    { id: 107, title: 'Ну, погоди!' },
    { id: 108, title: 'Чип и Дейл' },
    { id: 109, title: 'DuckTales' },
    { id: 110, title: 'Looney Tunes' },
    { id: 111, title: 'Покемон' },
    { id: 112, title: 'Даша-путешественница' },
    { id: 113, title: 'Свинка Пеппа' },
    { id: 114, title: 'Барбоскины' },
    { id: 115, title: 'Смешарики' },
    { id: 116, title: 'Фиксики' },
    { id: 120, title: 'Гравити Фолз' },
    { id: 121, title: 'Чудеса на виражах' },
    { id: 122, title: 'Пингвины из Мадагаскара' },
    { id: 123, title: 'Король Лев' },
    { id: 124, title: 'Холодное сердце' },
    { id: 126, title: 'Как приручить дракона' },
    { id: 127, title: 'Зверополис' },
    { id: 128, title: 'Миньоны' },
    { id: 129, title: 'Шрэк' },
     { id: 206, title: 'Маша и Медведь' },
    { id: 207, title: 'Котенок по имени Гав' },
    { id: 208, title: 'Чебурашка' },
    { id: 209, title: 'Малыш и Карлсон' },
    { id: 210, title: 'Лунтик' },
    { id: 211, title: 'Три богатыря' },
    { id: 212, title: 'Иван Царевич и Серый Волк' },
    { id: 213, title: 'Кот Леопольд' },
    { id: 215, title: 'Варежка' },
    { id: 217, title: 'Каникулы Бонифация' },
    { id: 219, title: 'Сказка о царе Салтане' },
    { id: 220, title: 'Алеша Попович' },
    {id:251, title: 'Илья муромец'},
    { id: 233, title: 'Оранжевая корова' },
     { id: 222, title: 'Малышарики' },
      { id: 223, title: 'Winnie-the-Pooh' },
      { id: 225, title: 'Щенячий патруль' },
      { id: 226, title: 'Tiny Toon' },
      { id: 227, title: 'Обезьянки' },            
      { id: 229, title: 'Буратино' },
];        



function searchByKeyword(keyword) {
    return function (callback) {
        var movieApiUrl = 'search/movie?query=' + encodeURIComponent(keyword.title);
        var tvApiUrl = 'search/tv?query=' + encodeURIComponent(keyword.title);

        movieApiUrl = buildApiUrl(movieApiUrl);
        tvApiUrl = buildApiUrl(tvApiUrl);

        var movieResults = null;
        var tvResults = null;

        function processResults() {
            if (movieResults !== null && tvResults !== null) {
                var combinedResults = movieResults.concat(tvResults);

                combinedResults = filterCyrillic(combinedResults);

                // Фильтрация по рейтингу >= 5.9
                combinedResults = combinedResults.filter(function (item) {
                    return (item.vote_average || 0) >= 6.1;
                });

                combinedResults.sort(function (a, b) {
                    return (b.vote_average || 0) - (a.vote_average || 0);
                });

                var json = {
                    results: combinedResults,
                    title: Lampa.Lang.translate(keyword.title)
                };

                callback(json);
            }
        }

        owner.get(movieApiUrl, {}, function (json) {
            movieResults = json.results || [];
            processResults();
        }, function () {
            movieResults = [];
            processResults();
        });

        owner.get(tvApiUrl, {}, function (json) {
            tvResults = json.results || [];
            processResults();
        }, function () {
            tvResults = [];
            processResults();
        });
    };
}

forKids.forEach(function (keyword) {
    partsData.push(searchByKeyword(keyword));
});


var kidsStudios = [
    { id: 2, title: 'Disney' },
    { id: 3, title: 'Pixar' },
    { id: 7501, title: 'Союзмультфильм(РФ)' },
    { id: 14599, title: 'Союзмультфильм(СССР)' },
    { id: 521, title: 'DreamWorks Animation' },
    { id: 9383, title: 'Blue Sky Studios' },
    { id: 6704, title: 'Illumination Entertainment' },
    { id: 2251, title: 'Sony Pictures Animation' },
    { id: 10342, title: 'Studio Ghibli' },


];


function getStudioMovies(studio) {
    return function (callback) {
        var movieApiUrl = 'discover/movie?with_companies=' + studio.id + 
                          '&sort_by=vote_average.desc';

        movieApiUrl = applyWithoutKeywords(movieApiUrl);

        owner.get(movieApiUrl, {}, function (json) {
            var movieResults = filterCyrillic(json.results || []);
            var response = {
                results: movieResults,
                title: Lampa.Lang.translate('Фильмы от студии - ' + studio.title)
            };
            callback(response);
        }, function () {
            callback({
                results: [],
                title: Lampa.Lang.translate('Фильмы от студии - ' + studio.title)
            });
        });
    };
}

function getStudioTVShows(studio) {
    return function (callback) {
        var tvApiUrl = 'discover/tv?with_companies=' + studio.id + 
                       '&sort_by=vote_average.desc';

        tvApiUrl = applyWithoutKeywords(tvApiUrl);

        owner.get(tvApiUrl, {}, function (json) {
            var tvResults = filterCyrillic(json.results || []);
            var response = {
                results: tvResults,
                title: Lampa.Lang.translate('Сериалы от студии - ' + studio.title)
            };
            callback(response);
        }, function () {
            callback({
                results: [],
                title: Lampa.Lang.translate('Сериалы от студии - ' + studio.title)
            });
        });
    };
}

kidsStudios.forEach(function (studio) {
    partsData.push(getStudioMovies(studio));
    partsData.push(getStudioTVShows(studio));
});

function getNickelodeonContent() {
    return function (callback) {
        var movieApiUrl = 'discover/movie?with_companies=4';
        var tvApiUrl = 'discover/tv?with_networks=13'; 

        movieApiUrl = buildApiUrl(movieApiUrl);
        tvApiUrl = buildApiUrl(tvApiUrl);

        var movieResults = null;
        var tvResults = null;

        function processResults() {
            if (movieResults !== null && tvResults !== null) {
                var combinedResults = movieResults.concat(tvResults); 
                combinedResults = filterCyrillic(combinedResults); 
                combinedResults.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));

                var json = {
                    results: combinedResults,
                    title: Lampa.Lang.translate('Nickelodeon')
                };

                callback(json);
            }
        }

        owner.get(movieApiUrl, {}, function (json) {
            movieResults = json.results || [];
            processResults();
        }, function () {
            movieResults = [];
            processResults();
        });

        owner.get(tvApiUrl, {}, function (json) {
            tvResults = json.results || [];
            processResults();
        }, function () {
            tvResults = [];
            processResults();
        });
    };
}

partsData.push(getNickelodeonContent());


function randomWideFlag() {
    return Math.random() < 0.2; 
}

function wrapWithWideFlag(requestFunc) {
    return function (callback) {
        requestFunc(function (json) {
            if (randomWideFlag()) {
                json.small = true;
                json.wide = true;

                if (Array.isArray(json.results)) { 
                    json.results.forEach(function (card) {
                        card.promo = card.overview;
                        card.promo_title = card.title || card.name;
                    });
                }
            }
            callback(json);
        });
    };
}


partsData = partsData.map(wrapWithWideFlag);




shuffleArray(partsData); // Перемешиваем массив

partsData.splice(3, 0, Lampa.Api.partPersons(partsData, partsData.length - 1, 'movie'));
partsData.splice(4, 0, upcomingEpisodesRequest);


// Загрузка частей данных
        function loadPart(partLoaded, partEmpty) {
        
            Lampa.Api.partNext(partsData, partsLimit, partLoaded, partEmpty);
        }

        loadPart(onComplete, onError);
        return loadPart;
    };
};


var SourceTMDBrus = function (parent) {
    // Создаем сетевой запрос
    this.network = new Lampa.Reguest();
    this.discovery = false;

    // Главный метод
    this.main = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var onComplete = arguments.length > 1 ? arguments[1] : undefined;
        var onError = arguments.length > 2 ? arguments[2] : undefined;
        var partsLimit = 12;

        // Опции сортировки
        var sortOptions = [
            { key: 'vote_count.desc', title: 'Много голосов' },
            { key: 'vote_average.desc', title: 'Высокий рейтинг' },
            { key: 'first_air_date.desc', title: 'Новинки' },
            { key: 'popularity.desc', title: 'Популярные' },
            { key: 'revenue.desc', title: 'Интерес зрителей' }
        ];

        // Жанры фильмов
      var genres = [
    { id: 28, title: 'боевики' },
    { id: 35, title: 'комедии' },
    { id: 18, title: 'драмы' },
    { id: 10749, title: 'мелодрамы' },
    { id: 16, title: 'мультфильмы' },
    { id: 10762, title: 'детское' },
    { id: 12, title: 'приключения' },
    { id: 80, title: 'криминал' },
    { id: 9648, title: 'детективы' },
    { id: 878, title: 'фантастика' },
    { id: 10752, title: 'военные' },
    { id: 37, title: 'вестерны' },
    { id: 53, title: 'триллеры' },
    { id: 10751, title: 'семейные' },
    { id: 14, title: 'фэнтези' },
    { id: 10764, title: 'реалити-шоу' },
    { id: 10759, title: 'боевики и приключения' },
    { id: 10766, title: 'мыльные оперы' },
    { id: 10767, title: 'ток-шоу' }, 
        ];

        // Стриминговые сервисы

          var streamingServices = [];

          
             var streamingServicesRUS = [
    { id: 2493, title: 'Start' },
    { id: 2859, title: 'Premier' },
    { id: 4085, title: 'KION' },
    { id: 3923, title: 'ИВИ' },
    { id: 412, title: 'Россия 1' },
    { id: 558, title: 'Первый канал' },
    { id: 3871, title: 'Okko' },
    { id: 3827, title: 'Кинопоиск' },
    { id: 5806, title: 'Wink' },
    { id: 806, title: 'СТС' },
    { id: 1191, title: 'ТНТ' },
    { id: 1119, title: 'НТВ' },
    { id: 3031, title: 'Пятница'},
    { id: 3882, title: 'More.TV' }
            
        ];
        

// Фильтрация кириллица

function filterCyrillic(items) {
    function containsCyrillic(value) {
        if (typeof value === 'string') {
            return /[а-яА-ЯёЁ]/.test(value);
        } else if (typeof value === 'object' && value !== null) {
            for (const val of Object.values(value)) {
                if (containsCyrillic(val)) {
                    return true;  
                }
            }
        }
        return false;
    }

    return items.filter(function (item) {
        return containsCyrillic(item);
    });
}


function applyFilters(items) {
    items = filterCyrillic(items); 
    return items;
}


function applyMinVotes(baseUrl) {
    var minVotes = 10;
    baseUrl += '&vote_count.gte=' + minVotes;
    return baseUrl;
}

function applyAgeRestriction(baseUrl) {
    return baseUrl;
}

function applyWithoutKeywords(baseUrl) {
    var baseExcludedKeywords = [
        '346488',  // Гей-тематика
        '158718',  // ЛГБТ-тематика
        '41278'    // Российская политика
    ];

    baseUrl += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));

    return baseUrl;
}


function buildApiUrl(baseUrl) {
    baseUrl = applyMinVotes(baseUrl);
    baseUrl = applyAgeRestriction(baseUrl);
    baseUrl = applyWithoutKeywords(baseUrl);
    return baseUrl;
}

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        
function adjustSortForMovies(sort) {
    if (sort.key === 'first_air_date.desc') {
        sort = { key: 'release_date.desc', title: 'Новинки' };
    }

    if (sort.key === 'release_date.desc') {
        var endDate = new Date().toISOString().split('T')[0]; 
        var startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1); 
        startDate = startDate.toISOString().split('T')[0];

        sort.extraParams = '&release_date.gte=' + startDate + '&release_date.lte=' + endDate;
    }

    return sort;
}

var partsData = [
    function (callback) {
        var baseUrl = 'movie/now_playing'; 
        baseUrl = applyAgeRestriction(baseUrl); 

        owner.get(baseUrl, params, function (json) {
            json.title = Lampa.Lang.translate('Сейчас смотрят');
            callback(json);
        }, callback);
    },
    function (callback) {
        var baseUrl = 'trending/movie/week'; 
        baseUrl = applyAgeRestriction(baseUrl); 

        owner.get(baseUrl, params, function (json) {
            json.title = Lampa.Lang.translate('Популярные фильмы');
            callback(json);
        }, callback);
    },
    function (callback) {
        var baseUrl = 'trending/tv/week'; 
        baseUrl = applyAgeRestriction(baseUrl); 

        owner.get(baseUrl, params, function (json) {
            json.title = Lampa.Lang.translate('Популярные сериалы');
            callback(json);
        }, callback);
    }
];

        
                // Запрос для ближайших эпизодов
        var upcomingEpisodesRequest = function (callback) {
            callback({
                source: 'tmdb',
                results: Lampa.TimeTable.lately().slice(0, 20),
                title: Lampa.Lang.translate('title_upcoming_episodes'),
                nomore: true,
                cardClass: function (_elem, _params) {
                    return new Episode(_elem, _params);
                }
            });
        };
        
        
 /* стриминги. */

// Функция запроса для стриминговых сервисов с жанрами
function getStreamingWithGenres(serviceName, serviceId) {
    return function (callback) {
        var sort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
        var genre = genres[Math.floor(Math.random() * genres.length)];
        var apiUrl = buildApiUrl(
            'discover/tv?with_networks=' + serviceId +
            '&with_genres=' + genre.id +
            '&sort_by=' + sort.key +
            '&air_date.lte=' + new Date().toISOString().substr(0, 10)
        );

        owner.get(apiUrl, params, function (json) {
            if (json.results) {
                json.results = applyFilters(json.results);
            }

            json.title = Lampa.Lang.translate(sort.title + ' (' + genre.title + ') на ' + serviceName);
            callback(json);
        }, callback);
    };
}

// Функция запроса только для стриминговых сервисов (без жанров)
function getStreaming(serviceName, serviceId) {
    return function (callback) {
        var sort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
        var apiUrl = buildApiUrl(
            'discover/tv?with_networks=' + serviceId +
            '&sort_by=' + sort.key +
            '&air_date.lte=' + new Date().toISOString().substr(0, 10)
        );

        owner.get(apiUrl, params, function (json) {
            if (json.results) {
                json.results = applyFilters(json.results);
            }

            json.title = Lampa.Lang.translate(sort.title + ' на ' + serviceName);
            callback(json);
        }, callback);
    };
}

// Используем только стриминговые сервисы RUS
var selectedStreamingServices = streamingServicesRUS;

selectedStreamingServices.forEach(function (service) {
    partsData.push(getStreamingWithGenres(service.title, service.id));
});

selectedStreamingServices.forEach(function (service) {
    partsData.push(getStreaming(service.title, service.id));
});

//Подборки по фильмам

function getMovies(genre) {
    return function (callback) {
        var sort = adjustSortForMovies(sortOptions[Math.floor(Math.random() * sortOptions.length)]);
        var apiUrl = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.key;

        apiUrl += '&with_original_language=ru&region=RU'; // Всегда запрашиваем только российские фильмы

        if (sort.key === 'release_date.desc') {
            var today = new Date().toISOString().split('T')[0];
            apiUrl += '&release_date.lte=' + today;
        }

        if (sort.extraParams) {
            apiUrl += sort.extraParams;
        }
          apiUrl = buildApiUrl(apiUrl);
        owner.get(apiUrl, params, function (json) {
            var titlePrefix = ' - российские';
            json.title = Lampa.Lang.translate(sort.title + titlePrefix + ' (' + genre.title + ')');
            callback(json);
        }, callback);
    };
}

genres.forEach(function (genre) {
    partsData.push(getMovies(genre));
});


//запросы по серилам

function getTVShows(genre) {
    return function (callback) {
        var sort = sortOptions[Math.floor(Math.random() * sortOptions.length)];
        var apiUrl = 'discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.key + '&with_origin_country=RU';

        apiUrl = buildApiUrl(apiUrl);

        owner.get(apiUrl, params, function (json) {
            json.title = Lampa.Lang.translate(sort.title + ' - российские сериалы (' + genre.title + ')');
            callback(json);
        }, callback);
    };
}

genres.forEach(function (genre) {
    partsData.push(getTVShows(genre));
});

        //лучшие фильмы и сериалы
        

function getBestContentByGenre(genre, contentType) {
    return function (callback) {
        var apiUrl = 'discover/' + contentType + '?with_genres=' + genre.id + 
                     '&sort_by=vote_average.desc' + 
                     '&vote_count.gte=50' + 
                     '&with_origin_country=RU'; 

        apiUrl = applyWithoutKeywords(apiUrl); 

        owner.get(apiUrl, params, function (json) {
            json.title = Lampa.Lang.translate(contentType === 'movie' 
                ? 'Топ российские фильмы (' + genre.title + ')'
                : 'Топ российские сериалы (' + genre.title + ')');
            
            callback(json);
        }, callback);
    };
}

genres.forEach(function (genre) {
    partsData.push(getBestContentByGenre(genre, 'movie'));
    partsData.push(getBestContentByGenre(genre, 'tv'));
});

function getBestContentByGenreAndPeriod(type, genre, startYear, endYear) {
    return function (callback) {
        var baseUrl = 'discover/' + type + '?with_genres=' + genre.id + 
                      '&sort_by=vote_average.desc' + 
                      '&vote_count.gte=10' + 
                      '&with_origin_country=RU' + 
                      '&' + (type === 'movie' ? 'primary_release_date' : 'first_air_date') + '.gte=' + startYear + '-01-01' +
                      '&' + (type === 'movie' ? 'primary_release_date' : 'first_air_date') + '.lte=' + endYear + '-12-31';

        baseUrl = applyAgeRestriction(baseUrl);
        baseUrl = applyWithoutKeywords(baseUrl); 

        owner.get(baseUrl, params, function (json) {
            json.title = Lampa.Lang.translate('Топ российские ' + (type === 'movie' ? 'фильмы' : 'сериалы') + 
                         ' (' + genre.title + ') за ' + startYear + '-' + endYear);
            callback(json);
        }, callback);
    };
}

var periods = [
    { start: 1975, end: 1979 },
    { start: 1980, end: 1984 },
    { start: 1985, end: 1989 },
    { start: 1990, end: 1994 },
    { start: 1995, end: 1999 },
    { start: 2000, end: 2004 },
    { start: 2005, end: 2009 },
    { start: 2010, end: 2014 },
    { start: 2015, end: 2019 },
    { start: 2020, end: 2025 }
];

function getRandomPeriod() {
    return periods[Math.floor(Math.random() * periods.length)];
}

genres.forEach(function (genre) {
    var period = getRandomPeriod();
    partsData.push(getBestContentByGenreAndPeriod('movie', genre, period.start, period.end));  
    partsData.push(getBestContentByGenreAndPeriod('tv', genre, period.start, period.end));  
});


function randomWideFlag() {
    return Math.random() < 0.2; 
}

function wrapWithWideFlag(requestFunc) {
    return function (callback) {
        requestFunc(function (json) {
            if (randomWideFlag()) {
                json.small = true;
                json.wide = true;

                if (Array.isArray(json.results)) { 
                    json.results.forEach(function (card) {
                        card.promo = card.overview;
                        card.promo_title = card.title || card.name;
                    });
                }
            }
            callback(json);
        });
    };
}


partsData = partsData.map(wrapWithWideFlag);

shuffleArray(partsData); // Перемешиваем массив

partsData.splice(4, 0, upcomingEpisodesRequest);


// Загрузка частей данных
        function loadPart(partLoaded, partEmpty) {
        
            Lampa.Api.partNext(partsData, partsLimit, partLoaded, partEmpty);
        }

        loadPart(onComplete, onError);
        return loadPart;
    };
};



function add() {
    // Получаем значение из Storage
    var sourceName = Lampa.Storage.get('surs_name') || 'AVIAMOVIE';
    var sourceNameKids = sourceName + ' KIDS';
    var sourceNameRus = sourceName + ' RUS';

    // Создаем источники
    var tmdb_mod = Object.assign({}, Lampa.Api.sources.tmdb, new SourceTMDB(Lampa.Api.sources.tmdb));
    var tmdb_mod_kids = Object.assign({}, Lampa.Api.sources.tmdb, new SourceTMDBkids(Lampa.Api.sources.tmdb));
    var tmdb_mod_rus = Object.assign({}, Lampa.Api.sources.tmdb, new SourceTMDBrus(Lampa.Api.sources.tmdb));

    Lampa.Api.sources.tmdb_mod = tmdb_mod;
    Lampa.Api.sources.tmdb_mod_kids = tmdb_mod_kids;
    Lampa.Api.sources.tmdb_mod_rus = tmdb_mod_rus;

    // Динамически определяем источники
    Object.defineProperty(Lampa.Api.sources, sourceName, {
        get: function() {
            return tmdb_mod;
        }
    });

    Object.defineProperty(Lampa.Api.sources, sourceNameKids, {
        get: function() {
            return tmdb_mod_kids;
        }
    });

    Object.defineProperty(Lampa.Api.sources, sourceNameRus, {
        get: function() {
            return tmdb_mod_rus;
        }
    });

    // Добавляем источники в меню
    Lampa.Params.select('source', Object.assign({}, Lampa.Params.values['source'], {
        [sourceName]: sourceName,
        [sourceNameKids]: sourceNameKids,
        [sourceNameRus]: sourceNameRus,
    }), 'tmdb');
}

function startProfileListener() {
    var sourceName = Lampa.Storage.get('surs_name') || 'AVIAMOVIE';
    var sourceNameKids = sourceName + ' KIDS';
    var sourceNameRus = sourceName + ' RUS';

    Lampa.Listener.follow('profile', function(event) {
    if (event.type !== 'changed') return;
    
    if (!event.params.surs) return;

    if (event.params.forKids) {
        changeSource(sourceNameKids, true);
    } else if (event.params.onlyRus) { 
        changeSource(sourceNameRus, true);
    } else {
        changeSource(sourceName, true);
    }
});

    Lampa.Storage.listener.follow('change', function(event) {
        if (event.name === "source" && !sourceChangedByProfile) {
            if (event.value === sourceName || event.value === sourceNameKids || event.value === sourceNameRus) {
                softRefresh(event.value, true);
            }
        }
    });

    var initialSource = Lampa.Storage.get('source');
    if (initialSource === sourceName || initialSource === sourceNameKids || initialSource === sourceNameRus) {
        setTimeout(function() {
if (!Lampa.Storage.get('start_page') || Lampa.Storage.get('start_page') === 'main') {
    softRefresh(initialSource, false);
}
        }, 300);
    }
}

var sourceChangedByProfile = false;

function changeSource(newSource, isProfileChanged) {
    if (typeof isProfileChanged === 'undefined') {
        isProfileChanged = false;
    }

    var currentSource = Lampa.Storage.get('source');

    if (currentSource !== newSource) {
        sourceChangedByProfile = true;
        Lampa.Storage.set('source', newSource);

        setTimeout(function() {
            softRefresh(newSource, false);
            sourceChangedByProfile = false;
        }, 10);
    }
}

function softRefresh(source, isFromSourceChange) {
    Lampa.Activity.push({
        title: 'Главная - ' + source.toUpperCase(),
        component: 'main',
        source: source
        
    });

    if (isFromSourceChange) {
        setTimeout(function() {
            Lampa.Controller.toggle('settings');
        }, 100);
    }
}

// Логика скрытия и отображения пункта "surs" в настройках
Lampa.Settings.listener.follow('open', function (e) {
    if (e.name === 'surs') {
        setTimeout(function () {
            var currentSource = Lampa.Storage.get('source');
            var sourceName = Lampa.Storage.get('surs_name') || 'AVIAMOVIE';
            var sourceNameKids = sourceName + ' KIDS';
            var sourceNameRus = sourceName + ' RUS'; // Новый источник

            var paramsToHide = [
                'surs_cirillic',
                'surs_minVotes',
                'surs_ageRestrictions',
                'surs_withoutKeywords',
                'surs_getMoviesByGenre',
                'surs_getTVShowsByGenre',
                'surs_streaming',
                'surs_getBestContentByGenre',
                'surs_getBestContentByGenreAndPeriod',
                'surs_filter_menu',
                'surs_best_content'
                

            ];

            var shouldHide = (currentSource === sourceNameKids || currentSource === sourceNameRus);

            // Скрываем или показываем параметры
            paramsToHide.forEach(function (param) {
                var element = $('div[data-name="' + param + '"]');
                if (shouldHide) {
                    element.hide();
                } else {
                    element.show();
                }
            });

            // Удаление заголовков "Настройка фильтров" и "Настройка подборкок"
            if (shouldHide) {
                $('div.settings-param-title span').each(function () {
                    var text = $(this).text().trim();
                    if (text === 'Настройка фильтров' || text === 'Настройка подборок') {
                        $(this).closest('div.settings-param-title').remove();
                    }
                });
            }

        }, 1);
    }
});



function addSettingMenu() {

            var currentSource = Lampa.Storage.get('source');
            var sourceName = Lampa.Storage.get('surs_name') || 'AVIAMOVIE';
            var sourceNameKids = sourceName + ' KIDS';
            var sourceNameRus = sourceName + ' RUS'; 
            
            
    Lampa.SettingsApi.addComponent({
        component: 'surs',
        name: Lampa.Lang.translate('Подборки ' + sourceName),
        icon: `
 <svg height="200px" width="200px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style> <g> <path class="st0" d="M443.724,166.599c27.038-2.293,47.087-26.07,44.786-53.125c-2.292-27.038-26.078-47.087-53.115-44.795 c-27.038,2.301-47.078,26.088-44.776,53.124C392.91,148.85,416.677,168.9,443.724,166.599z"></path> <path class="st0" d="M431.752,346.544l30.541-114.485c5.068-19.305-6.466-39.075-25.78-44.144 c-19.304-5.077-39.075,6.448-44.152,25.771v-0.018L365.052,315.64l-78.755-13.276c-17.218-4.304-34.696,5.786-39.578,22.864 l-33.317,133.445c-3.82,13.342,3.913,27.28,17.274,31.1c13.37,3.81,27.298-3.923,31.128-17.283l39.392-98.638l61.286,16.155 C398.863,400.125,421.633,382.927,431.752,346.544z"></path> <path class="st0" d="M388.177,462.949l-0.121-0.01c-0.018,0-0.028,0-0.047,0L388.177,462.949z"></path> <path class="st0" d="M498.349,286.311c-10.1-2.999-20.721,2.749-23.722,12.858l-27.876,93.848 c-2.096,6.606-4.536,11.777-7.146,15.746c-3.987,5.944-8.002,9.373-13.854,12.093c-5.842,2.664-14.031,4.379-25.416,4.37 c-3.009,0.008-6.215-0.113-9.634-0.355l-54.009-3.363c-10.519-0.661-19.575,7.341-20.227,17.861 c-0.662,10.518,7.342,19.574,17.86,20.226l53.73,3.345c4.211,0.298,8.31,0.448,12.28,0.456c10.072-0.009,19.5-0.988,28.369-3.289 c13.268-3.392,25.315-10.127,34.501-19.892c9.251-9.736,15.531-21.885,19.91-35.609l0.074-0.214l28.015-94.362 C514.206,299.923,508.447,289.302,498.349,286.311z"></path> <path class="st0" d="M248.974,81.219L0,21.256v15.14v281.228l248.974-59.962V81.219z M225.123,238.87L23.851,287.355V51.536 l201.272,48.466V238.87z"></path> <polygon class="st0" points="204.989,115.189 47.991,84.937 47.991,253.953 204.989,223.692 "></polygon> </g> </g></svg>`
    });



Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: '',
        type: 'title'
    },
    field: {
        name: 'Подборки от '+ sourceName,
        description: 'После изменения настроек обновите главную страницу, нажав на её иконку в боковом меню.'
    }
});

Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_empty1',
        type: 'title'
    },
    field: {
        name: 'Настройка интерфейса',
        description: ''
    }
});


    Lampa.SettingsApi.addParam({
        component: 'surs',
        param: {
            name: 'surs_setSource',
            type: 'select',
            values: {
                [sourceName]: sourceName,
                [sourceNameKids]: sourceNameKids,
                [sourceNameRus]: sourceNameRus
            },
            default: [sourceName]
        },
        field: {
            name: Lampa.Lang.translate('Установить в качестве источника'),
            description: Lampa.Lang.translate('Влияет на отображение контента на главной странице')
        },
        onChange: function (value) {
            console.log('[DEBUG AVIAMOVIE] Выбранный источник:', value);
            Lampa.Storage.set('source', value);
        }
    });



Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_setButtons',
        type: 'button'
    },
    field: {
        name: Lampa.Lang.translate('Добавить подборки в боковое меню'),
        description: Lampa.Lang.translate('Выберите, какие подборки добавить в боковое меню')
    },
    onChange: function () {
        var currentController = Lampa.Controller.enabled().name;
        showButtonsSelectionMenu(currentController);
    }
});

function showButtonsSelectionMenu(previousController) {
    var items = [
        { title: sourceName, id: 'Button_sourceName' },
        { title: sourceNameKids, id: 'Button_sourceNameKids' },
        { title: sourceNameRus, id: 'Button_sourceNameRus' }
    ];

    var list = items.map(function (item) {
        var isEnabled = getStoredSetting(item.id, false); // По умолчанию выключено
        return {
            title: item.title,
            id: item.id,
            checkbox: true,
            checked: isEnabled
        };
    });

    Lampa.Select.show({
        title: 'Выбор источников для бокового меню',
        items: list,
        onBack: function () {
            Lampa.Controller.toggle(previousController || 'settings');
        },
        onCheck: function (selectedItem) {
            var key = selectedItem.id;
            var isEnabled = getStoredSetting(key, false);
            setStoredSetting(key, !isEnabled); // Переключаем состояние
            selectedItem.checked = !isEnabled;

            // Перерисовываем меню с актуальными состояниями
            addMenuButtons();
        }
    });
}

function addMenuButton(title, action, icon, callback) {
    var button = $('<li class="menu__item selector" data-action="' + action + '">\
        <div class="menu__ico">' + icon + '</div>\
        <div class="menu__text">' + title + '</div>\
    </li>');

    button.on('hover:enter', callback);
    $('.menu .menu__list').eq(0).append(button);
}

// Общая иконка для всех кнопок
var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 48 48">\
    <circle cx="24" cy="24" r="20" fill="white"/>\
</svg>';

function addMenuButtons() {
    // Удаляем старые кнопки
    $('.menu__item[data-action="custom-source"]').remove(); 

    // Получаем состояние кнопок из хранилища
    var isSourceNameEnabled = getStoredSetting('Button_sourceName', false);
    var isSourceNameKidsEnabled = getStoredSetting('Button_sourceNameKids', false);
    var isSourceNameRusEnabled = getStoredSetting('Button_sourceNameRus', false);

    // Добавляем кнопки, если соответствующий источник выбран
    if (isSourceNameEnabled) {
        addMenuButton(sourceName, 'custom-source', icon, function () {
            Lampa.Activity.push({
                source: sourceName,
                title: sourceName,
                component: 'main',
                page: 1
            });
        });
    }

    if (isSourceNameKidsEnabled) {
        addMenuButton(sourceNameKids, 'custom-source', icon, function () {
            Lampa.Activity.push({
                source: sourceNameKids,
                title: sourceNameKids,
                component: 'main',
                page: 1
            });
        });
    }

    if (isSourceNameRusEnabled) {
        addMenuButton(sourceNameRus, 'custom-source', icon, function () {
            Lampa.Activity.push({
                source: sourceNameRus,
                title: sourceNameRus,
                component: 'main',
                page: 1
            });
        });
    }
}

// Инициализируем добавление кнопок сразу после загрузки


setTimeout(addMenuButtons, 50);
// Подключаем слушатель изменений

Lampa.Listener.follow('profile', function(event) {
  
  if (event.type != 'changed') {
    return; 
  }

        addMenuButtons();
});




Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: '',
        type: 'title'
    },
    field: {
        name: 'Настройка фильтров',
        description: ''
    }
});

// Функция отображения списка выбора
function showSelectionMenu(title, items, storagePrefix, keyField = 'id', previousController) {
    var list = items.map(function (item) {
        var key = item[keyField];
        var isEnabled = getStoredSetting(storagePrefix + key, true);
        return {
            title: item.title,
            id: key,
            checkbox: true,
            checked: isEnabled
        };
    });

    Lampa.Select.show({
        title: title,
        items: list,
        onBack: function () {

            showMainMenu(previousController);
        },
        onCheck: function (selectedItem) {
            var key = storagePrefix + selectedItem.id;
            var isEnabled = getStoredSetting(key, true);
            setStoredSetting(key, !isEnabled);


            selectedItem.checked = !isEnabled;
        }
    });
}

function showMainMenu(previousController) {

    var currentController = Lampa.Controller.enabled().name;
    previousController = previousController || currentController; // если previousController не передан, используем текущий

    Lampa.Select.show({
        title: 'Глобальный фильтр',
        items: [
            { title: 'Жанры', action: function () { showSelectionMenu('Выбор жанров', allGenres, 'genre_', 'id', previousController); } },
            { title: 'Варианты сортировки', action: function () { showSelectionMenu('Выбор сортировки', allSortOptions, 'sort_', 'id', previousController); } },
            { title: 'Стриминги', action: function () { showSelectionMenu('Выбор стримингов', allStreamingServices, 'streaming_', 'id', previousController); } },
            { title: 'Российские стриминги', action: function () { showSelectionMenu('Выбор российских стримингов', allStreamingServicesRUS, 'streaming_rus_', 'id', previousController); } }
        ],
        onSelect: function (item) {
            if (item.action) {
                item.action();
            }
        },
        onBack: function () {
            // Возвращаемся в контроллер, переданный в previousController
            Lampa.Controller.toggle(previousController);
        }
    });
}

// Основная функция запуска
Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_filter_menu',
        type: 'button'
    },
    field: {
        name: 'Глобальный фильтр',
        description: 'Выбор жанров, вариантов сортировки и стриминговых сервисов.'
    },
    onChange: function () {
        showMainMenu(); 
    }
});

Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_cirillic',
        type: 'button'
    },
    field: {
        name: Lampa.Lang.translate('Кириллица в карточке контента'),
        description: Lampa.Lang.translate('Фильтрует контент, оставляя только те материалы, у которых есть перевод названия или описание на киррилице.')
    },
    onChange: function () {
        var previousController = Lampa.Controller.enabled().name;
        showCirillicMenu(previousController);
    }
});

function showCirillicMenu(previousController) {
    var key = 'cirillic';
    var currentValue = getStoredSetting(key, '1');

    var options = [
        { title: 'Включен', value: '1' },
        { title: 'Выключен', value: '0' }

    ];

    var items = options.map(function(option) {
        return {
            title: option.title,
            value: option.value,
            checkbox: true,
            checked: currentValue === option.value
        };
    });

    Lampa.Select.show({
        title: 'Фильтр кириллица',
        items: items,
        onBack: function () {
            Lampa.Controller.toggle(previousController || 'settings');
        },
        onCheck: function (selected) {
            setStoredSetting(key, selected.value);
            showCirillicMenu(previousController);
        }
    });
}


Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_minVotes',
        type: 'button'
    },
    field: {
        name: Lampa.Lang.translate('Валидация рейтинга'),
        description: Lampa.Lang.translate('Валидация рейтинга позволяет исключить контент с случайно завышенной оценкой. Однако он может также исключить новые фильмы или те, у которых ещё нет рейтинга или мало голосов.')
    },
    onChange: function () {
        var previousController = Lampa.Controller.enabled().name;
        showMinVotesMenu(previousController);
    }
});

function showMinVotesMenu(previousController) {
    var key = 'minVotes';
    var currentValue = getStoredSetting(key, '10');

    var options = [
        { title: 'Выключено', value: '0' },
        { title: 'Стандартная', value: '10' },
        { title: 'Усиленная', value: '50' },
        { title: 'Максимальная', value: '150' },
        { title: 'Фаталити', value: '300' }
    ];

    var items = options.map(function(option) {
        return {
            title: option.title,
            value: option.value,
            checkbox: true,
            checked: currentValue === option.value
        };
    });

    Lampa.Select.show({
        title: 'Валидация ретинга',
        items: items,
        onBack: function () {
            Lampa.Controller.toggle(previousController || 'settings');
        },
        onCheck: function (selected) {
            setStoredSetting(key, selected.value);
            showMinVotesMenu(previousController);
        }
    });
}


Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_ageRestrictions',
        type: 'button'
    },
    field: {
        name: Lampa.Lang.translate('Возрастное ограничение'),
        description: Lampa.Lang.translate('Формировать подборки, которые соответствуют указанному возрастному рейтингу.')
    },
    onChange: function () {
        var previousController = Lampa.Controller.enabled().name;
        showAgeRestrictionsMenu(previousController);
    }
});

function showAgeRestrictionsMenu(previousController) {
    var key = 'ageRestrictions';
    var currentValue = getStoredSetting(key, '');

    var options = [
        { title: 'Для самых маленьких', value: '0+' },
        { title: 'Для детей не старше 6 лет', value: '6+' },
        { title: 'Для детей не старше 12 лет', value: '12+' },
        { title: 'Без ограничений', value: '' }
    ];

    var items = options.map(function(option) {
        return {
            title: option.title,
            value: option.value,
            checkbox: true,
            checked: currentValue === option.value
        };
    });

    Lampa.Select.show({
        title: 'Возрастное ограничение',
        items: items,
        onBack: function () {
            Lampa.Controller.toggle(previousController || 'settings');
        },
        onCheck: function (selected) {
            setStoredSetting(key, selected.value);
            showAgeRestrictionsMenu(previousController);
        }
    });
}








Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_withoutKeywords',
        type: 'button'
    },
    field: {
        name: Lampa.Lang.translate('Исключение азиатских жанров'),
        description: Lampa.Lang.translate('Фильтр для исключения азиатского контента. Мягкий режим: исключает мангу, маньхву, донхуа и страны (Китай, Индия, Тайвань). Сильный режим: дополнительно исключает аниме и Японию.')
    },
    onChange: function () {
        var previousController = Lampa.Controller.enabled().name;
        showKeywordFilterMenu(previousController);
    }
});

function showKeywordFilterMenu(previousController) {
    var key = 'withoutKeywords';
    var currentValue = getStoredSetting(key, '1');

    var options = [
        { title: 'Выключено', value: '0' },
        { title: 'Мягко', value: '1' },
        { title: 'Сильно', value: '2' }
    ];

    var items = options.map(function (option) {
        return {
            title: option.title,
            value: option.value,
            checkbox: true,
            checked: currentValue === option.value
        };
    });

    Lampa.Select.show({
        title: 'Уровень фильтрации',
        items: items,
        onBack: function () {
            Lampa.Controller.toggle(previousController || 'settings');
        },
        onCheck: function (selectedItem) {
            setStoredSetting(key, selectedItem.value);
            showKeywordFilterMenu(previousController);
        }
    });
}


Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: '',
        type: 'title'
    },
    field: {
        name: 'Настройка подборок',
        description: ''
    }
});
//стриминги
Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_streaming',
        type: 'button'
    },
    field: {
        name: Lampa.Lang.translate('Подборки по стримингам'),
        description: Lampa.Lang.translate('Выберите регион')
    },
    onChange: function () {
        var currentController = Lampa.Controller.enabled().name;
        showStreamingSelectionMenu(currentController);
    }
});

function showStreamingSelectionMenu(previousController) {
    var items = [
        { title: 'Глобальные', id: 'getStreamingServices' },
        { title: 'Российские', id: 'getStreamingServicesRUS' }
    ];

    var list = items.map(function (item) {
        var isEnabled = getStoredSetting(item.id, true);
        return {
            title: item.title,
            id: item.id,
            checkbox: true,
            checked: isEnabled
        };
    });

    Lampa.Select.show({
        title: 'Выбор стриминговых подборок',
        items: list,
        onBack: function () {
            Lampa.Controller.toggle(previousController || 'settings');
        },
        onCheck: function (selectedItem) {
            var key = selectedItem.id;
            var isEnabled = getStoredSetting(key, true);
            setStoredSetting(key, !isEnabled);
            selectedItem.checked = !isEnabled;
        }
    });
}
// Фильмы по жанрам
Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_getMoviesByGenre',
        type: 'button'
    },
    field: {
        name: Lampa.Lang.translate('Подборки фильмов'),
        description: Lampa.Lang.translate('Выберите регион.')
    },
    onChange: function () {
        var currentController = Lampa.Controller.enabled().name;
        showMoviesByGenreSelectionMenu(currentController);
    }
});

function showMoviesByGenreSelectionMenu(previousController) {
    var items = [
        { title: 'Глобальные', id: 'getMoviesByGenreGlobal' },
        { title: 'Российские', id: 'getMoviesByGenreRus' }
    ];

    var list = items.map(function (item) {
        var isEnabled = getStoredSetting(item.id, true);
        return {
            title: item.title,
            id: item.id,
            checkbox: true,
            checked: isEnabled
        };
    });

    Lampa.Select.show({
        title: 'Подборки фильмов',
        items: list,
        onBack: function () {
            Lampa.Controller.toggle(previousController || 'settings');
        },
        onCheck: function (selectedItem) {
            var key = selectedItem.id;
            var isEnabled = getStoredSetting(key, true);
            setStoredSetting(key, !isEnabled);
            selectedItem.checked = !isEnabled;
        }
    });
}



Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_getTVShowsByGenre',
        type: 'button'
    },
    field: {
        name: Lampa.Lang.translate('Подборки сериалов'),
        description: Lampa.Lang.translate('Выберите регион.')
    },
    onChange: function () {
        var currentController = Lampa.Controller.enabled().name;
        showTVShowsByGenreSelectionMenu(currentController);
    }
});

function showTVShowsByGenreSelectionMenu(previousController) {
    var items = [
        { title: 'Глобальные', id: 'getTVShowsByGenreGlobal' },
        { title: 'Российские', id: 'getTVShowsByGenreRus' },
        { title: 'Южнокорейские', id: 'getTVShowsByGenreKOR' }
    ];

    var list = items.map(function (item) {
        var isEnabled = getStoredSetting(item.id, true);
        return {
            title: item.title,
            id: item.id,
            checkbox: true,
            checked: isEnabled
        };
    });

    Lampa.Select.show({
        title: 'Подборки сериалов',
        items: list,
        onBack: function () {
            Lampa.Controller.toggle(previousController || 'settings');
        },
        onCheck: function (selectedItem) {
            var key = selectedItem.id;
            var isEnabled = getStoredSetting(key, true);
            setStoredSetting(key, !isEnabled);
            selectedItem.checked = !isEnabled;
        }
    });
}

//топ подборки

Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_getBestContentByGenre',
        type: 'button'
    },
    field: {
        name: Lampa.Lang.translate('Подборки топ фильмов и сериалов'),
        description: Lampa.Lang.translate('Подборки лучшего контента за все время')
    },
    onChange: function () {
        var currentController = Lampa.Controller.enabled().name;
        showBestContentByGenreSelectionMenu(currentController);
    }
});

function showBestContentByGenreSelectionMenu(previousController) {
    var items = [
        { title: 'Фильмы', id: 'getBestContentByGenreMovie' },
        { title: 'Сериалы', id: 'getBestContentByGenreTV' }
    ];

    var list = items.map(function (item) {
        var isEnabled = getStoredSetting(item.id, true);
        return {
            title: item.title,
            id: item.id,
            checkbox: true,
            checked: isEnabled
        };
    });

    Lampa.Select.show({
        title: 'Подборки топ контента',
        items: list,
        onBack: function () {
            Lampa.Controller.toggle(previousController || 'settings');
        },
        onCheck: function (selectedItem) {
            var key = selectedItem.id;
            var isEnabled = getStoredSetting(key, true);
            setStoredSetting(key, !isEnabled);
            selectedItem.checked = !isEnabled;
        }
    });
}

//топ подборки за 5лет


Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_best_content',
        type: 'button'
    },
    field: {
        name: Lampa.Lang.translate('Топ подборки за 5 лет'),
        description: Lampa.Lang.translate('Подборки лучших фильмов и сериалов за случайные 5 лет')
    },
    onChange: function () {
        var currentController = Lampa.Controller.enabled().name;
        showBestContentByPeriodSelectionMenu(currentController);
    }
});

function showBestContentByPeriodSelectionMenu(previousController) {
    var items = [
        { title: 'Фильмы', id: 'getBestContentByGenreAndPeriod_movie' },
        { title: 'Сериалы', id: 'getBestContentByGenreAndPeriod_tv' }
    ];

    var list = items.map(function (item) {
        var isEnabled = getStoredSetting(item.id, true);
        return {
            title: item.title,
            id: item.id,
            checkbox: true,
            checked: isEnabled
        };
    });

    Lampa.Select.show({
        title: 'Топ подборки за 5 лет',
        items: list,
        onBack: function () {
            Lampa.Controller.toggle(previousController || 'settings');
        },
        onCheck: function (selectedItem) {
            var key = selectedItem.id;
            var isEnabled = getStoredSetting(key, true);
            setStoredSetting(key, !isEnabled);
            selectedItem.checked = !isEnabled;
        }
    });
}


if (!Lampa.Storage.get('surs_disableCustomName')) {

Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: '',
        type: 'title'
    },
    field: {
        name: 'Название',
        description: ''
    }
});


    Lampa.SettingsApi.addParam({
        component: 'surs',
        param: {
            name: 'surs_setName',
            type: 'button',
            default: 'Ввести название'
        },
        field: {
            name: Lampa.Lang.translate('Переименование подборок'),
            description: Lampa.Lang.translate('Введите свое название вместо ' + currentSource)
        },
        onChange: function () {
            Lampa.Input.edit({
                free: true,
                title: Lampa.Lang.translate('Введите новое название'),
                nosave: true,
                value: '',
            }, function(input) {
                if (input) {
                    Lampa.Storage.set('surs_name', input);
                    Lampa.Noty.show(Lampa.Lang.translate('Название сохранено. Обновление...'));

                    setTimeout(function() {
                        Lampa.Controller.toggle('settings');
                    }, 100);
                    setTimeout(function() {
                        var newName = Lampa.Storage.get('surs_name');
                        softRefresh(newName, false);
                    }, 1500);
                    setTimeout(function() {
                        window.location.reload();
                    }, 2000);
                } else {
                    Lampa.Noty.show(Lampa.Lang.translate('Название не введено.'));
                }
            });
        }
    });
}
}
//боковые кнопки

function sideButtonsMenu() {
    // Настройки плагина
    var settings = {
        selections: {
            enabled: getStoredSetting('selections_enabled', true)
        },
        movies: {
            genres: loadGenresSettings('movies'),
            sort: getStoredSetting('movies_sort', 'popularity.desc'),
            region: getStoredSetting('movies_region', 'global')
        },
        series: {
            genres: loadGenresSettings('series'),
            sort: getStoredSetting('series_sort', 'popularity.desc'),
            region: getStoredSetting('series_region', 'global')
        },
        streaming: {
            genres: loadGenresSettings('streaming'),
            sort: getStoredSetting('streaming_sort', 'popularity.desc'),
            region: getStoredSetting('streaming_region', 'global')
        }
    };

    // Загрузка настроек жанров
    function loadGenresSettings(type) {
        var genres = {};
        allGenres.forEach(function (genre) {
            genres[genre.id] = getStoredSetting(type + '_genre_' + genre.id, true);
        });
        return genres;
    }

    // Сохранение настроек
    function saveSettings(type) {
        var prefix = type + '_';
        Object.keys(settings[type].genres).forEach(function (genreId) {
            setStoredSetting(prefix + 'genre_' + genreId, settings[type].genres[genreId]);
        });
        setStoredSetting(prefix + 'sort', settings[type].sort);
        setStoredSetting(prefix + 'region', settings[type].region);
        setStoredSetting('selections_enabled', settings.selections.enabled);
    }

    // Добавление боковой кнопки
    function addButtons() {
        if (settings.selections.enabled) {
            addMenuButton(
                'Подборки',
                'selections',
                '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3v18h18V3zm16 16H5V5h14zM7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/></svg>',
                showSelectionsMenu
            );
        }
    }

    // Функция добавления кнопки меню (из вашего кода)
    function addMenuButton(title, action, icon, callback) {
        var button = jQuery(
            '<li class="menu__item selector" data-action="' + action + '">' +
            '<div class="menu__ico">' + icon + '</div>' +
            '<div class="menu__text">' + title + '</div>' +
            '</li>'
        );
        button.on('hover:enter', callback);
        jQuery('.menu .menu__list').eq(0).append(button);
    }

    // Показ главного меню подборок
    function showSelectionsMenu() {
        var currentController = Lampa.Controller.enabled().name;
        Lampa.Select.show({
            title: 'Подборки',
            items: [
                {
                    title: 'Фильмы',
                    action: function () {
                        showContentMenu('movies', 'Фильмы', currentController);
                    }
                },
                {
                    title: 'Сериалы',
                    action: function () {
                        showContentMenu('series', 'Сериалы', currentController);
                    }
                },
                {
                    title: 'Стриминги',
                    action: function () {
                        showContentMenu('streaming', 'Стриминги', currentController);
                    }
                }
            ],
            onSelect: function (item) {
                if (item.action) {
                    item.action();
                }
            },
            onBack: function () {
                Lampa.Controller.toggle('menu');
            }
        });
    }

    // Показ меню для контента (Фильмы, Сериалы, Стриминги)
    function showContentMenu(type, title, previousController) {
        Lampa.Select.show({
            title: title,
            items: [
                {
                    title: 'Жанры',
                    action: function () {
                        showGenresMenu(type, title + ' - Жанры', previousController);
                    }
                },
                {
                    title: 'Варианты сортировки',
                    action: function () {
                        showSortMenu(type, title + ' - Сортировка', previousController);
                    }
                },
                {
                    title: 'Регион',
                    action: function () {
                        showRegionMenu(type, title + ' - Регион', previousController);
                    }
                },
                {
                    title: 'Поиск',
                    action: function () {
                        pushActivity(type);
                    }
                }
            ],
            onSelect: function (item) {
                if (item.action) {
                    item.action();
                }
            },
            onBack: function () {
                Lampa.Controller.toggle(previousController);
            }
        });
    }

    // Показ меню выбора жанров
    function showGenresMenu(type, title, previousController) {
        var list = [
            {
                title: 'Все',
                id: 'all',
                checkbox: true,
                checked: areAllGenresSelected(type)
            }
        ].concat(allGenres.map(function (genre) {
            return {
                title: genre.title,
                id: genre.id,
                checkbox: true,
                checked: settings[type].genres[genre.id]
            };
        }));

        Lampa.Select.show({
            title: title,
            items: list,
            onBack: function () {
                showContentMenu(type, type === 'movies' ? 'Фильмы' : type === 'series' ? 'Сериалы' : 'Стриминги', previousController);
            },
            onCheck: function (selectedItem) {
                if (selectedItem.id === 'all') {
                    var newState = !areAllGenresSelected(type);
                    allGenres.forEach(function (genre) {
                        settings[type].genres[genre.id] = newState;
                    });
                    selectedItem.checked = newState;
                    list.forEach(function (item) {
                        if (item.id !== 'all') {
                            item.checked = newState;
                        }
                    });
                } else {
                    settings[type].genres[selectedItem.id] = !settings[type].genres[selectedItem.id];
                    selectedItem.checked = settings[type].genres[selectedItem.id];
                    list[0].checked = areAllGenresSelected(type);
                }
                saveSettings(type);
            }
        });
    }

    // Проверка, выбраны ли все жанры
    function areAllGenresSelected(type) {
        return allGenres.every(function (genre) {
            return settings[type].genres[genre.id];
        });
    }

    // Показ меню выбора сортировки
    function showSortMenu(type, title, previousController) {
        var list = allSortOptions.map(function (sort) {
            return {
                title: sort.title,
                id: sort.id,
                checkbox: true,
                checked: settings[type].sort === sort.id
            };
        });

        Lampa.Select.show({
            title: title,
            items: list,
            onBack: function () {
                showContentMenu(type, type === 'movies' ? 'Фильмы' : type === 'series' ? 'Сериалы' : 'Стриминги', previousController);
            },
            onCheck: function (selectedItem) {
                settings[type].sort = selectedItem.id;
                list.forEach(function (item) {
                    item.checked = item.id === selectedItem.id;
                });
                saveSettings(type);
            }
        });
    }

    // Показ меню выбора региона
    function showRegionMenu(type, title, previousController) {
        var list = [
            {
                title: 'Глобально',
                id: 'global',
                checkbox: true,
                checked: settings[type].region === 'global'
            },
            {
                title: 'Российское',
                id: 'russian',
                checkbox: true,
                checked: settings[type].region === 'russian'
            }
        ];

        Lampa.Select.show({
            title: title,
            items: list,
            onBack: function () {
                showContentMenu(type, type === 'movies' ? 'Фильмы' : type === 'series' ? 'Сериалы' : 'Стриминги', previousController);
            },
            onCheck: function (selectedItem) {
                settings[type].region = selectedItem.id;
                list.forEach(function (item) {
                    item.checked = item.id === selectedItem.id;
                });
                saveSettings(type);
            }
        });
    }

    // Формирование URL и запуск активности
    function pushActivity(type) {
        var contentType = type === 'movies' ? 'movie' : 'tv';
        var url = 'discover/' + contentType;
        var params = [];
        var title = type === 'movies' ? 'Фильмы' : type === 'series' ? 'Сериалы' : 'Стриминги';

        // Жанры
        var selectedGenres = [];
        allGenres.forEach(function (genre) {
            if (settings[type].genres[genre.id]) {
                selectedGenres.push(genre.id);
            }
        });
        if (selectedGenres.length > 0) {
            params.push('with_genres=' + selectedGenres.join(','));
            title += ' (' + selectedGenres.map(function (id) {
                return allGenres.find(function (g) { return g.id === id; }).title;
            }).join(', ') + ')';
        }

        // Стриминги (только для type === 'streaming')
        if (type === 'streaming') {
            var selectedStreamings = getStreamingServices().concat(getStreamingServicesRUS()).map(function (s) {
                return s.id;
            });
            if (selectedStreamings.length > 0) {
                params.push('with_networks=' + selectedStreamings.join(','));
                title += ' (' + selectedStreamings.map(function (id) {
                    var service = getStreamingServices().concat(getStreamingServicesRUS()).find(function (s) { return s.id === id; });
                    return service ? service.title : '';
                }).join(', ') + ')';
            }
        }

        // Сортировка
        params.push('sort_by=' + settings[type].sort);
        var sortTitle = allSortOptions.find(function (s) { return s.id === settings[type].sort; }).title;
        title += ' - ' + sortTitle;

        // Регион
        params.push('region=RU');
        params.push('language=ru-RU');
        if (settings[type].region === 'russian') {
            params.push('with_origin_country=RU');
            title += ' (Российское)';
        }

        if (params.length > 0) {
            url += '?' + params.join('&');
        }

        try {
            Lampa.Activity.push({
                url: url,
                title: title,
                component: 'category_full',
                source: 'tmdb',
                card_type: 'true',
                page: 1
            });
        } catch (e) {
            Lampa.Noty.show('Ошибка при загрузке контента: ' + e.message);
        }
    }

    // Обновление кнопки меню
    function refreshMenuButtons() {
        jQuery('[data-action="selections"]').remove();
        addButtons();
    }

    // Слушатель изменений хранилища
    function initStorageListener() {
        Lampa.Storage.listener.follow('change', function (e) {
            if (e.name === 'selections_enabled') {
                settings.selections.enabled = getStoredSetting('selections_enabled', true);
                saveSettings('selections');
                refreshMenuButtons();
            } else if (e.name.indexOf('movies_') === 0) {
                settings.movies.genres = loadGenresSettings('movies');
                settings.movies.sort = getStoredSetting('movies_sort', 'popularity.desc');
                settings.movies.region = getStoredSetting('movies_region', 'global');
            } else if (e.name.indexOf('series_') === 0) {
                settings.series.genres = loadGenresSettings('series');
                settings.series.sort = getStoredSetting('series_sort', 'popularity.desc');
                settings.series.region = getStoredSetting('series_region', 'global');
            } else if (e.name.indexOf('streaming_') === 0) {
                settings.streaming.genres = loadGenresSettings('streaming');
                settings.streaming.sort = getStoredSetting('streaming_sort', 'popularity.desc');
                settings.streaming.region = getStoredSetting('streaming_region', 'global');
            }
        });
    }

    // Инициализация
    function init() {
        addButtons();
        initStorageListener();
    }

    // Запуск инициализации
    init();
}




//фикс главной
function addMainButton() {
    $('.menu__item[data-action="main"]').remove();

    var homeIcon = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><path fill="currentColor" d="M475.425,200.225L262.092,4.669c-6.951-6.359-17.641-6.204-24.397,0.35L36.213,200.574c-3.449,3.348-5.399,7.953-5.399,12.758v280.889c0,9.819,7.958,17.778,17.778,17.778h148.148c9.819,0,17.778-7.959,17.778-17.778v-130.37h82.963v130.37c0,9.819,7.958,17.778,17.778,17.778h148.148c9.819,0,17.778-7.953,17.778-17.778V213.333C481.185,208.349,479.099,203.597,475.425,200.225z M445.629,476.444H333.037v-130.37c0-9.819-7.959-17.778-17.778-17.778H196.741c-9.819,0-17.778,7.959-17.778,17.778v130.37H66.37V220.853L250.424,42.216l195.206,178.939V476.444z"></path></svg>';

    var button = $('<li class="menu__item selector" data-action="custom-main">' +
        '<div class="menu__ico">' + homeIcon + '</div>' +
        '<div class="menu__text">' + Lampa.Lang.translate('title_main') + '</div>' +
        '</li>');

    button.on('hover:enter', function() {
        Lampa.Activity.push({
            source: Lampa.Storage.get('source'),
            title: Lampa.Lang.translate('title_main') + ' - ' + Lampa.Storage.get('source'),
            component: 'main',
            page: 1
        });
    });

    $('.menu .menu__list').eq(0).append(button);
}







if (window.appready) {
    add();
    startProfileListener();
    addMainButton()
    //sideButtonsMenu();
        if (!Lampa.Storage.get('surs_disableMenu')) {
           addSettingMenu();
}
} else {
    Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') {
            add();
            startProfileListener();
            addMainButton()
            //sideButtonsMenu();
            if (!Lampa.Storage.get('surs_disableMenu')) {
               addSettingMenu();
}
        }
    });
   }
}

if (!window.plugin_tmdb_mod_ready) startPlugin();

})( );
