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
    
    
    if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        var k;
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
            return -1;
        }
        k = fromIndex | 0;
        if (k < 0) {
            k += len;
            if (k < 0) k = 0;
        }
        for (; k < len; k++) {
            if (k in o && o[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}
    
    if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
    
   if (!Array.prototype.filter) {
  Array.prototype.filter = function(callback, thisArg) {
    var array = this;
    var result = [];
    for (var i = 0; i < array.length; i++) {
      if (callback.call(thisArg, array[i], i, array)) {
        result.push(array[i]);
      }
    }
    return result;
  };
}

if (!Object.assign) {
  Object.assign = function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
}

if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    var array = this;
    var result = [];
    for (var i = 0; i < array.length; i++) {
      result.push(callback.call(thisArg, array[i], i, array));
    }
    return result;
  };
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    var array = this;
    for (var i = 0; i < array.length; i++) {
      callback.call(thisArg, array[i], i, array);
    }
  };
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement) {
    return this.indexOf(searchElement) !== -1;
  };
}

if (!Date.prototype.toISOString) {
  Date.prototype.toISOString = function() {
    var pad = function(num) {
      return (num < 10 ? '0' : '') + num;
    };
    return (
      this.getUTCFullYear() +
      '-' +
      pad(this.getUTCMonth() + 1) +
      '-' +
      pad(this.getUTCDate()) +
      'T' +
      pad(this.getUTCHours()) +
      ':' +
      pad(this.getUTCMinutes()) +
      ':' +
      pad(this.getUTCSeconds()) +
      '.' +
      (this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
      'Z'
    );
  };
}

if (!Array.prototype.some) {
  Array.prototype.some = function(callback, thisArg) {
    var array = this;
    for (var i = 0; i < array.length; i++) {
      if (callback.call(thisArg, array[i], i, array)) {
        return true;
      }
    }
    return false;
  };
}

if (!Array.prototype.concat) {
  Array.prototype.concat = function() {
    var result = [];
    for (var i = 0; i < this.length; i++) {
      result.push(this[i]);
    }
    for (var j = 0; j < arguments.length; j++) {
      var arg = arguments[j];
      if (Array.isArray(arg)) {
        for (var k = 0; k < arg.length; k++) {
          result.push(arg[k]);
        }
      } else {
        result.push(arg);
      }
    }
    return result;
  };
}

if (!Object.keys) {
  Object.keys = function(obj) {
    var result = [];
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result.push(key);
      }
    }
    return result;
  };
}

// Полифил для Array.prototype.indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        var k;
        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        var len = o.length >>> 0;
        if (len === 0) {
            return -1;
        }
        k = fromIndex | 0;
        if (k < 0) {
            k += len;
            if (k < 0) k = 0;
        }
        for (; k < len; k++) {
            if (k in o && o[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}

// Полифил для console
if (!window.console) {
    window.console = {};
    var methods = ['log', 'warn', 'error', 'info', 'debug', 'trace'];
    for (var i = 0; i < methods.length; i++) {
        window.console[methods[i]] = function() {};
    }
}

// Полифил для stopImmediatePropagation
if (!Event.prototype.stopImmediatePropagation) {
    Event.prototype.stopImmediatePropagation = function() {
        this.stopPropagation();
        this.cancelBubble = true;
    };
}



// Опции сортировки
var allSortOptions = [
    { id: 'vote_count.desc', title: 'surs_vote_count_desc' },
    { id: 'vote_average.desc', title: 'surs_vote_average_desc' },
    { id: 'first_air_date.desc', title: 'surs_first_air_date_desc' },
    { id: 'popularity.desc', title: 'surs_popularity_desc' },
    { id: 'revenue.desc', title: 'surs_revenue_desc' }
];

// Жанры фильмов
var allGenres = [
    { id: 28, title: 'surs_genre_action' },
    { id: 35, title: 'surs_genre_comedy' },
    { id: 18, title: 'surs_genre_drama' },
    { id: 10749, title: 'surs_genre_romance' },
    { id: 16, title: 'surs_genre_animation' },
    { id: 10762, title: 'surs_genre_kids' },
    { id: 12, title: 'surs_genre_adventure' },
    { id: 80, title: 'surs_genre_crime' },
    { id: 9648, title: 'surs_genre_mystery' },
    { id: 878, title: 'surs_genre_sci_fi' },
    { id: 37, title: 'surs_genre_western' },
    { id: 53, title: 'surs_genre_thriller' },
    { id: 10751, title: 'surs_genre_family' },
    { id: 14, title: 'surs_genre_fantasy' },
    { id: 10764, title: 'surs_genre_reality' },
    { id: 10759, title: 'surs_genre_action_adventure' },
    { id: 10766, title: 'surs_genre_soap' },
    { id: 10767, title: 'surs_genre_talk_show' }
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
    { id: 67, title: 'Showtime' }
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
    { id: 3031, title: 'Пятница' },
    { id: 3882, title: 'More.TV' }
];

// Функция получения всех настроек
function getAllStoredSettings() {
    return Lampa.Storage.get('surs_settings') || {};
}

// Функция получения настроек текущего пользователя
function getProfileSettings() {
    var profileId = Lampa.Storage.get('lampac_profile_id', '') || 'default';
    var allSettings = getAllStoredSettings();

    if (!allSettings.hasOwnProperty(profileId)) {
        allSettings[profileId] = {};
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
        allSettings[profileId] = {};
    }

    allSettings[profileId][key] = value;
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


if (!getStoredSetting('interface_size_initialized', false)) {

    Lampa.Storage.set("interface_size", "small");
    
    setStoredSetting('interface_size_initialized', true);
    
}


var buttonPosters = {
    surs_main: 'https://aviamovie.github.io/img/main.png',
    surs_bookmarks: 'https://aviamovie.github.io/img/bookmarks.png',
    surs_history: 'https://aviamovie.github.io/img/history.png',
    surs_select: 'https://aviamovie.github.io/img/select_new.png',
    surs_new: 'https://aviamovie.github.io/img/new.png',
    surs_rus: 'https://aviamovie.github.io/img/rus.png',
    surs_kids: 'https://aviamovie.github.io/img/kids.png'
};

function getAllButtons() {
    return [
        { id: 'surs_main', title: 'surs_main' },
        { id: 'surs_bookmarks', title: 'surs_bookmarks' },
        { id: 'surs_history', title: 'surs_history' },
        { id: 'surs_select', title: 'surs_select' },
        { id: 'surs_new', title: 'surs_new' },
        { id: 'surs_rus', title: 'surs_rus' },
        { id: 'surs_kids', title: 'surs_kids' }
    ];
}

var buttonActions = {
    surs_main: function () {
        var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
        Lampa.Activity.push({
            source: Lampa.Storage.get('source'),
            title: Lampa.Lang.translate('title_main') + ' - ' + sourceName,
            component: 'main',
            page: 1
        });
    },
    surs_bookmarks: function () {
        Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('surs_bookmarks'),
            component: 'bookmarks',
            page: 1
        });
    },
    surs_history: function () {
        Lampa.Activity.push({
            url: '',
            title: Lampa.Lang.translate('surs_history'),
            component: 'favorite',
            type: 'history',
            page: 1
        });
    },
    surs_select: function () {
        if (window.SursSelect && typeof window.SursSelect.showSursSelectMenu === 'function') {
            window.SursSelect.showSursSelectMenu();
        }
    },
    surs_new: function () {
        var sourceName = Lampa.Storage.get('surs_name') || 'SURS';  // ← перенесено вверх
        Lampa.Activity.push({
            source: sourceName + ' NEW',
            title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' NEW',
            component: 'main',
            page: 1
        });
    },
    surs_rus: function () {
        var sourceName = Lampa.Storage.get('surs_name') || 'SURS';  // ← тоже вверх
        Lampa.Activity.push({
            source: sourceName + ' RUS',
            title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' RUS',
            component: 'main',
            page: 1
        });
    },
    surs_kids: function () {
        var sourceName = Lampa.Storage.get('surs_name') || 'SURS';  // ← и здесь
        Lampa.Activity.push({
            source: sourceName + ' KIDS',
            title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' KIDS',
            component: 'main',
            page: 1
        });
    }
};


function initCustomButtons() {
   
    Lampa.Template.add('custom_button_style', `
        <style>
            .custom-button-card {
                flex-shrink: 0;
                width: 12.75em !important;
                position: relative;
                will-change: transform;
            }
            .custom-button-card.card--collection .card__view {
                padding-bottom: 58%;
                margin-top: 1em;
                margin-bottom: -1em;
            }
            @media screen and (max-width: 900px) {
                .items-cards .custom-button-card {
                    width: 9em !important;
                }
            }
            .custom-button-card .card__title,
            .custom-button-card .card__age {
                display: none !important;
            }
        </style>
    `);
    $('body').append(Lampa.Template.get('custom_button_style', {}, true));


     if (Lampa.Manifest.app_digital >= 300) {    
	 return
	 }
	
    else {
        function addCardListener() {
            if (window.lampa_listener_extensions) return;
            window.lampa_listener_extensions = true;

            Object.defineProperty(window.Lampa.Card.prototype, 'build', {
                get: function () { return this._build; },
                set: function (value) {
                    this._build = function () {
                        value.apply(this);
                        Lampa.Listener.send('card', { type: 'build', object: this });
                    }.bind(this);
                }
            });
        }

        Lampa.Listener.follow('card', function (e) {
            if (e.type === 'build') {
                var cardId = e.object.data.id;
                if (buttonPosters[cardId]) {
                    e.object.data.img = buttonPosters[cardId];
                    e.object.card.addClass('custom-button-card');

                    e.object.card.on('hover:enter', function () {
                        if (buttonActions[cardId]) {
                            buttonActions[cardId]();
                        }
						 event.stopImmediatePropagation();
                    });
                }
            }
        });

        addCardListener();
    }
}
function addCustomButtonsRow(partsData) {
    
    if (Lampa.Manifest.app_digital < 300) return;
    
    partsData.unshift(function(callback) {
        var allButtons = getAllButtons();
        var enabledButtons = allButtons.filter(function (b) {
            return getStoredSetting('custom_button_' + b.id, true);  
        }).map(function(b) {
            return {
                id: b.id,
                title: Lampa.Lang.translate(b.title),
                source: 'custom',
                params: {
                    createInstance: function(item) {
                        var card = Lampa.Maker.make('Card', item, function(m) {
                            return m.only('Card', 'Callback');
                        });
                        card.data.img = buttonPosters[item.id] || ''; 
                        return card;
                    },
                    emit: {
                        onCreate: function() {
                            this.html.addClass('custom-button-card card--small card--collection');
                            this.html.find('.card__title').remove();
                            this.html.find('.card__age').remove();
                        },
                        onlyEnter: function() {
                            if (buttonActions[b.id]) {
                                buttonActions[b.id]();  
                            }
                        }
                    }
                }
            };
        });
        
        callback({
            results: enabledButtons,  
            title: '',
            params: {
                items: {
                    view: 20,
                    mapping: 'line'
                }
            }
        });
    });
}


function getPartsData() {
    var partsData = [];
    if (Lampa.Manifest.app_digital >= 300) { 
    addCustomButtonsRow(partsData);	
    } else {
        partsData.push(getCustomButtonsPart());
    }
    return partsData;
}

function getCustomButtonsPart() {
    return function (callback) {
        var buttons = getAllButtons().filter(function (b) {
            return getStoredSetting('custom_button_' + b.id, true);
        }).map(function (b) {
            return {
                id: b.id,
                name: Lampa.Lang.translate(b.title),
                img: buttonPosters[b.id],
                source: 'custom'
            };
        });

        callback({
            title: '',
            results: buttons,
            small: true,
            collection: true,
            line_type: 'player-cards'
        });
    };
}


// Глобальные функции фильтрации

function filterCyrillic(items) {
    var language = Lampa.Storage.get('language');
    // Если язык не русский и не украинский, возвращаем все элементы без фильтрации
    if (language !== 'ru' && language !== 'uk') {
        return items;
    }

    // Применяем настройки для русского и украинского языка
    var storedValue = Lampa.Storage.get('cirillic');
    var isFilterEnabled = storedValue === '1' || storedValue === null || storedValue === undefined || storedValue === '';

    if (!isFilterEnabled) {
        return items;
    }

    function containsCyrillic(value) {
        if (typeof value === 'string') {
            return /[а-яА-ЯёЁїЇіІєЄґҐ]/.test(value); // Добавлены украинские символы
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

    var filteredItems = items.filter(function(item) {
        return containsCyrillic(item);
    });

    return filteredItems;
}

// Применение всех фильтров к элементам
function applyFilters(items) {
    items = filterCyrillic(items);
    return items;
}

// Добавление фильтра по минимальному количеству голосов
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

// Добавление фильтра по возрастным ограничениям
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

// Добавление фильтра по исключению ключевых слов
function applyWithoutKeywords(baseUrl) {
    var filterLevel = getStoredSetting('withoutKeywords');
    var baseExcludedKeywords = [
        '346488',
        '158718',
        '41278'
    ];

    if (!filterLevel || filterLevel == '1') {
        baseExcludedKeywords.push(
            '13141',
            '345822',
            '315535',
            '290667',
            '323477',
            '290609'
        );
    }

    if (filterLevel == '2') {
        baseExcludedKeywords.push(
            '210024',
            '13141',
            '345822',
            '315535',
            '290667',
            '323477',
            '290609'
        );
    }

    baseUrl += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));

    return baseUrl;
}

// Построение URL с применением всех фильтров
function buildApiUrl(baseUrl) {
    baseUrl = applyMinVotes(baseUrl);
    baseUrl = applyAgeRestriction(baseUrl);
    baseUrl = applyWithoutKeywords(baseUrl);
    return baseUrl;
}

        function adjustSortForMovies(sort) {
            if (sort.id === 'first_air_date.desc') {
                sort = { id: 'release_date.desc', title: 'surs_first_air_date_desc' };
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
        
                function randomWideFlag() {
            return Math.random() < 0.1;
        }
            function wrapWithWideFlag(requestFunc) {
    // Новый способ — Lampa 3.0+
    function wrapNew(callback) {
        requestFunc(function (json) {
            json = Lampa.Utils.addSource(json, 'tmdb');

            if (randomWideFlag()) {
                if (Array.isArray(json.results)) {
                    json.results.forEach(function(c) {
                        c.promo = c.overview || '';
                        c.promo_title = c.title || c.name || Lampa.Lang.translate('surs_noname');
                        c.params = {
                            style: { name: 'wide' }
                        };
                    });
                }

                json.params = {
                    items: { view: 3 }
                };
            }
            callback(json);
        });
    }

    // Старый способ — до 3.0
    function wrapOld(callback) {
        requestFunc(function (json) {
            if (randomWideFlag()) {
                json.small = true;
                json.wide = true;
                if (Array.isArray(json.results)) {
                    json.results.forEach(function(card) {
                        card.promo = card.overview || '';
                        card.promo_title = card.title || card.name || '';
                    });
                }
            }
            callback(json);
        });
    }

    return Lampa.Manifest.app_digital >= 300 ? wrapNew : wrapOld;
}      

	      function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
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
                this.card.querySelector('.full-episode__name').innerText = ('Сезон ' + (episode.season_number || '?') + ' ') + (episode.name || Lampa.Lang.translate('surs_noname'));
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
            this.img_poster.onload = function () {};
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
            this.img_poster.onerror = function () {};
            this.img_poster.onload = function () {};
            this.img_episode.onerror = function () {};
            this.img_episode.onload = function () {};
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
	
// ближайшие эпизоды
function getUpcomingEpisodesOld() {
    return function (callback) {
        callback({
            source: 'tmdb',
            results: Lampa.TimeTable.lately().slice(0, 20),
            title: Lampa.Lang.translate('surs_title_upcoming_episodes'),
            nomore: true,
            cardClass: function (elem, params) {
                return new Episode(elem, params);
            }
        });
    };
}

function getUpcomingEpisodesNew() {  
    return function (cb) {  
        var lately = Lampa.TimeTable.lately().slice(0, 20);  
  
        lately.forEach(function(item) {  
            item.params = {  
                createInstance: function(item_data) {  
                    // ✅ Правильно: используем Lampa.Maker.make  
                    return Lampa.Maker.make('Episode', item_data, function(module) {  
                        return module.only('Card', 'Callback');  
                    });  
                },  
                emit: {  
                    onlyEnter: function() {  
                        Lampa.Router.call('full', item.card);  
                    },  
                    onlyFocus: function() {  
                        Lampa.Background.change(Lampa.Utils.cardImgBackgroundBlur(item.card));  
                    }  
                }  
            };  
  
            Lampa.Arrays.extend(item, item.episode);  
        });  
  
        cb({  
            results: lately,  
            title: Lampa.Lang.translate('surs_title_upcoming_episodes')  
        });  
    };  
}

function getUpcomingEpisodes() {
    return Lampa.Manifest.app_digital >= 300 ? getUpcomingEpisodesNew() : getUpcomingEpisodesOld();
}        

function startPlugin() {
    window.plugin_surs_ready = true;

var SourceTMDB = function (parent) {
    this.network = new Lampa.Reguest();
    this.discovery = false;

    this.main = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var onComplete = arguments.length > 1 ? arguments[1] : undefined;
        var onError = arguments.length > 2 ? arguments[2] : undefined;
        var partsLimit = 9;

        var partsData = getPartsData();	 
        var CustomData = [];
        var trendingsData = [];
        
        var trendingMovies = function (callback) {
                var baseUrl = 'trending/movie/week';
                baseUrl = applyAgeRestriction(baseUrl);

                owner.get(baseUrl, params, function (json) {
                    if (json.results) {
                        json.results = json.results.filter(function (result) {
                            var forbiddenLanguages = ['kr', 'cn', 'jp', 'ko', 'zh', 'ja'];
                            return !forbiddenLanguages.includes(result.original_language);
                        });
                    }
                    json.title = Lampa.Lang.translate('surs_title_trend_week') + ' ' + Lampa.Lang.translate('surs_movies');
                    callback(json);
                }, callback);
            }
        
        var trendingTV = function (callback) {
                var baseUrl = 'trending/tv/week';
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
                    json.title = Lampa.Lang.translate('surs_title_trend_week') + ' ' + Lampa.Lang.translate('surs_series');
                    callback(json);
                }, callback);
            }
        
        trendingsData.push(trendingMovies);
        trendingsData.push(trendingTV);
        

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

                owner.get(apiUrl, params, function (json) {
                    if (json.results) {
                        json.results = applyFilters(json.results);
                    }

                    json.title = Lampa.Lang.translate(sort.title) + ' (' + Lampa.Lang.translate(genre.title) + ') ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
                    callback(json);
                }, callback);
            };
        }

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

                owner.get(apiUrl, params, function (json) {
                    if (json.results) {
                        json.results = applyFilters(json.results);
                    }

                    json.title = Lampa.Lang.translate(sort.title) + ' ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
                    callback(json);
                }, callback);
            };
        }

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

        var selectedStreamingServices = getSelectedStreamingServices();

        selectedStreamingServices.forEach(function (service) {
   var isRussian = getStreamingServicesRUS().some(function(rusService) {
  return rusService.id === service.id;
});
            CustomData.push(getStreamingWithGenres(service.title, service.id, isRussian));
        });

        selectedStreamingServices.forEach(function (service) {
   var isRussian = getStreamingServicesRUS().some(function(rusService) {
  return rusService.id === service.id;
});
            CustomData.push(getStreaming(service.title, service.id, isRussian));
        });

        function getMovies(genre, options) {
            options = options || {};

            return function (callback) {
                var sortOptions = getSortOptions();
                var sort = adjustSortForMovies(sortOptions[Math.floor(Math.random() * sortOptions.length)]);
                var apiUrl = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.id;

                if (options.russian) {
                    apiUrl += '&with_origin_country=RU';
                }
                
                if (options.ukrainian) {
                    apiUrl += '&with_origin_country=UA';
                }

                if (sort.extraParams) {
                    apiUrl += sort.extraParams;
                }

                apiUrl = buildApiUrl(apiUrl);

                owner.get(apiUrl, params, function (json) {
                    if (json.results) {
                        if (!options.russian && !options.ukrainian) {
                            json.results = applyFilters(json.results);
                        }
                        var titlePrefix = options.russian ? Lampa.Lang.translate('surs_russian') :
                                         options.ukrainian ? Lampa.Lang.translate('surs_ukrainian') : '';
                        json.title = Lampa.Lang.translate(sort.title) + ' ' + titlePrefix + ' (' + Lampa.Lang.translate(genre.title) + ')';
                    }
                    callback(json);
                }, callback);
            };
        }

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
                if (options.turkish) {
                    apiUrl += '&with_origin_country=TR';
                }
                if (options.ukrainian) {
                    apiUrl += '&with_origin_country=UA';
                }

                if (sort.extraParams) {
                    apiUrl += sort.extraParams;
                }

                apiUrl = buildApiUrl(apiUrl);

                owner.get(apiUrl, params, function (json) {
                    if (json.results) {
                        if (!options.russian && !options.ukrainian) {
                            json.results = applyFilters(json.results);
                        }
                        var titlePrefix = options.russian ? Lampa.Lang.translate('surs_russian') :
                                         options.korean ? Lampa.Lang.translate('surs_korean') :
                                         options.turkish ? Lampa.Lang.translate('surs_turkish') :
                                         options.ukrainian ? Lampa.Lang.translate('surs_ukrainian') : '';
                        json.title = Lampa.Lang.translate(sort.title) + ' ' + titlePrefix + ' ' + Lampa.Lang.translate('surs_tv_shows') + ' (' + Lampa.Lang.translate(genre.title) + ')';
                    }
                    callback(json);
                }, callback);
            };
        }

        var genres = getGenres();

        var isUkrainianLanguage = Lampa.Storage.get('language') === 'uk';

        var includeGlobalMovies = getStoredSetting('getMoviesByGenreGlobal', true);
        var includeRussianMovies = getStoredSetting('getMoviesByGenreRus', true);
        var includeUkrainianMovies = getStoredSetting('getMoviesByGenreUA', isUkrainianLanguage);

        var isGlobalTVEnabled = getStoredSetting('getTVShowsByGenreGlobal', true);
        var isRussianTVEnabled = getStoredSetting('getTVShowsByGenreRus', true);
        var isKoreanTVEnabled = getStoredSetting('getTVShowsByGenreKOR', false);
        var isTurkishTVEnabled = getStoredSetting('getTVShowsByGenreTR', true);
        var isUkrainianTVEnabled = getStoredSetting('getTVShowsByGenreUA', isUkrainianLanguage);

        genres.forEach(function (genre) {
            if (includeGlobalMovies) {
                CustomData.push(getMovies(genre));
            }
            if (includeRussianMovies) {
                CustomData.push(getMovies(genre, { russian: true }));
            }
            if (includeUkrainianMovies) {
                CustomData.push(getMovies(genre, { ukrainian: true }));
            }
        });

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
            if (isTurkishTVEnabled) {
                CustomData.push(getTVShows(genre, { turkish: true }));
            }
            if (isUkrainianTVEnabled) {
                CustomData.push(getTVShows(genre, { ukrainian: true }));
            }
        });

        function getBestContentByGenre(genre, contentType) {
            return function (callback) {
                var apiUrl = 'discover/' + contentType + '?with_genres=' + genre.id +
                            '&sort_by=vote_average.desc' +
                            '&vote_count.gte=500';

                apiUrl = applyAgeRestriction(apiUrl);
                apiUrl = applyWithoutKeywords(apiUrl);

                owner.get(apiUrl, params, function (json) {
                    if (json.results) {
                        json.results = filterCyrillic(json.results);
                    }

                    json.title = Lampa.Lang.translate(contentType === 'movie' ? 'surs_top_movies' : 'surs_top_tv') + ' (' + Lampa.Lang.translate(genre.title) + ')';
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

                    json.title = Lampa.Lang.translate(type === 'movie' ? 'surs_top_movies' : 'surs_top_tv') +
                                 ' (' + Lampa.Lang.translate(genre.title) + ')' +
                                 Lampa.Lang.translate('surs_for_period') + startYear + '-' + endYear;
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

function getPopularPersonsOld() {
    return function (callback) {
        owner.get('person/popular', params, function (json) {
            json.title = Lampa.Lang.translate('surs_popular_persons');
            callback(json);
        }, callback);
    };
}

function getPopularPersonsNew() {
    return function (cb) {
        owner.get('person/popular', params, function (json) {
            json = Lampa.Utils.addSource(json, 'tmdb');
            json.title = Lampa.Lang.translate('surs_popular_persons');

            json.results.forEach(function(person) {
                person.params = {
                    module: Lampa.Maker.module('Card').only('Card', 'Release', 'Callback'),
                    emit: {
                        onFocus: function() {
                            Lampa.Background.change(Lampa.Utils.cardImgBackground(person));
                        },
                        onEnter: function() {
                            Lampa.Router.call('actor', person);
                        }
                    }
                };
            });

            cb(json);
        }, cb);
    };
}

function getPopularPersons() {
    return Lampa.Manifest.app_digital >= 300 ? getPopularPersonsNew() : getPopularPersonsOld();
}



        CustomData = CustomData.map(wrapWithWideFlag);
		CustomData.push(getPopularPersons());
        shuffleArray(CustomData);
        CustomData.splice(4, 0, getUpcomingEpisodes());

        var combinedData = partsData.concat(trendingsData).concat(CustomData);
        

        function loadPart(partLoaded, partEmpty) {
            Lampa.Api.partNext(combinedData, partsLimit, partLoaded, partEmpty);
        }

        loadPart(onComplete, onError);
        return loadPart;
    };
};




    
    //новинки
    
var SourceTMDBnew = function (parent) {
    this.network = new Lampa.Reguest();
    this.discovery = false;

    this.main = function () {
        var owner = this;
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var onComplete = arguments.length > 1 ? arguments[1] : undefined;
        var onError = arguments.length > 2 ? arguments[2] : undefined;
        var partsLimit = 9;

        // Функция для перемешивания массива
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }

        var partsData = getPartsData();

        var CustomData = [];

        function getStreamingWithGenres(serviceName, serviceId, isRussian) {
            return function (callback) {
                var genres = getGenres();
                var sort = { id: 'first_air_date.desc', title: 'surs_first_air_date_desc' };
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

                owner.get(apiUrl, params, function (json) {
                    if (json.results) {
                        json.results = applyFilters(json.results);
                    }

                    json.title = Lampa.Lang.translate(sort.title) + ' (' + Lampa.Lang.translate(genre.title) + ') ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
                    callback(json);
                }, callback);
            };
        }

        function getStreaming(serviceName, serviceId, isRussian) {
            return function (callback) {
                var sort = { id: 'first_air_date.desc', title: 'surs_first_air_date_desc' };

                var apiUrl = 'discover/tv?with_networks=' + serviceId +
                             '&sort_by=' + sort.id;

                if (isRussian) {
                    apiUrl = applyAgeRestriction(apiUrl);
                    apiUrl = applyWithoutKeywords(apiUrl);
                } else {
                    apiUrl = buildApiUrl(apiUrl);
                }

                owner.get(apiUrl, params, function (json) {
                    if (json.results) {
                        json.results = applyFilters(json.results);
                    }

                    json.title = Lampa.Lang.translate(sort.title) + ' ' + Lampa.Lang.translate('surs_on') + ' ' + serviceName;
                    callback(json);
                }, callback);
            };
        }

        function getSelectedStreamingServices() {
            var streamingServices = getStreamingServices();
            var streamingServicesRUS = getStreamingServicesRUS();
            return streamingServices.concat(streamingServicesRUS);
        }

        function getMovies(genre, options) {
            options = options || {};

            return function (callback) {
                var sort = adjustSortForMovies({ id: 'first_air_date.desc', title: 'surs_first_air_date_desc' });
                var apiUrl = 'discover/movie?with_genres=' + genre.id + '&sort_by=' + sort.id;

                if (options.russian) {
                    apiUrl += '&with_origin_country=RU';
                }
                
                if (options.ukrainian) {
                    apiUrl += '&with_origin_country=UA';
                }

                if (sort.extraParams) {
                    apiUrl += sort.extraParams;
                }

                apiUrl = buildApiUrl(apiUrl);

                owner.get(apiUrl, params, function (json) {
                    if (json.results) {
                        if (!options.russian && !options.ukrainian) {
                            json.results = applyFilters(json.results);
                        }
                        var titlePrefix = options.russian ? Lampa.Lang.translate('surs_russian') :
                                         options.ukrainian ? Lampa.Lang.translate('surs_ukrainian') : '';
                        json.title = Lampa.Lang.translate(sort.title) + ' ' + titlePrefix + ' (' + Lampa.Lang.translate(genre.title) + ')';
                    }
                    callback(json);
                }, callback);
            };
        }

        function getTVShows(genre, options) {
            options = options || {};

            return function (callback) {
                var sort = adjustSortForTVShows({ id: 'first_air_date.desc', title: 'surs_first_air_date_desc' });
                var apiUrl = 'discover/tv?with_genres=' + genre.id + '&sort_by=' + sort.id;

                if (options.russian) {
                    apiUrl += '&with_origin_country=RU';
                }
                if (options.korean) {
                    apiUrl += '&with_origin_country=KR';
                }
                if (options.turkish) {
                    apiUrl += '&with_origin_country=TR';
                }
                if (options.ukrainian) {
                    apiUrl += '&with_origin_country=UA';
                }

                if (sort.extraParams) {
                    apiUrl += sort.extraParams;
                }

                apiUrl = buildApiUrl(apiUrl);

                owner.get(apiUrl, params, function (json) {
                    if (json.results) {
                        if (!options.russian && !options.ukrainian) {
                            json.results = applyFilters(json.results);
                        }
                        var titlePrefix = options.russian ? Lampa.Lang.translate('surs_russian') :
                                         options.korean ? Lampa.Lang.translate('surs_korean') :
                                         options.turkish ? Lampa.Lang.translate('surs_turkish') :
                                         options.ukrainian ? Lampa.Lang.translate('surs_ukrainian') : '';
                        json.title = Lampa.Lang.translate(sort.title) + ' ' + titlePrefix + ' ' + Lampa.Lang.translate('surs_tv_shows') + ' (' + Lampa.Lang.translate(genre.title) + ')';
                    }
                    callback(json);
                }, callback);
            };
        }

        var genres = getGenres();

        var isUkrainianLanguage = Lampa.Storage.get('language') === 'uk';

        genres.forEach(function (genre) {
            CustomData.push(getMovies(genre)); // Глобальные фильмы
            CustomData.push(getMovies(genre, { russian: true })); // Российские фильмы
            if (isUkrainianLanguage) {
                CustomData.push(getMovies(genre, { ukrainian: true })); // Украинские фильмы
            }
        });

        genres.forEach(function (genre) {
            CustomData.push(getTVShows(genre)); // Глобальные сериалы
            CustomData.push(getTVShows(genre, { russian: true })); // Российские сериалы
            CustomData.push(getTVShows(genre, { korean: true })); // Корейские сериалы
            CustomData.push(getTVShows(genre, { turkish: true })); // Турецкие сериалы
            if (isUkrainianLanguage) {
                CustomData.push(getTVShows(genre, { ukrainian: true })); // Украинские сериалы
            }
        });

        var selectedStreamingServices = getSelectedStreamingServices();

        selectedStreamingServices.forEach(function (service) {
               var isRussian = getStreamingServicesRUS().some(function(rusService) {
  return rusService.id === service.id;
});
            CustomData.push(getStreamingWithGenres(service.title, service.id, isRussian));
        });

        selectedStreamingServices.forEach(function (service) {
   var isRussian = getStreamingServicesRUS().some(function(rusService) {
  return rusService.id === service.id;
});
            CustomData.push(getStreaming(service.title, service.id, isRussian));
        });

        CustomData = CustomData.map(wrapWithWideFlag);

        shuffleArray(CustomData);

        var combinedData = partsData.concat(CustomData);

        function loadPart(partLoaded, partEmpty) {
            Lampa.Api.partNext(combinedData, partsLimit, partLoaded, partEmpty);
        }

        loadPart(onComplete, onError);
        return loadPart;
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
        var partsLimit = 9;

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
        


// Функции формирования url с доп параметрами

function applyMinVotes(baseUrl) {
    var minVotes = 5; 

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

    var buttonsData = getPartsData();
    var partsData =[]

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

function getMovies(genre, options) {
  options = options || {};
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

function getTVShows(genre, options) {
options = options || {};
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
options = options || {};
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
combinedResults.sort(function(a, b) {
  return (b.vote_average || 0) - (a.vote_average || 0);
});

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





partsData = partsData.map(wrapWithWideFlag);




shuffleArray(partsData); 

    var combinedData = buttonsData.concat(partsData);



// Загрузка частей данных
        function loadPart(partLoaded, partEmpty) {
        
            Lampa.Api.partNext(combinedData, partsLimit, partLoaded, partEmpty);
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
        var partsLimit = 9;

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
        

    var buttonsData = getPartsData();
    var partsData =[]
        
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

apiUrl += '&with_original_language=ru&region=RU';

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


partsData = partsData.map(wrapWithWideFlag);

shuffleArray(partsData); // Перемешиваем массив


    var combinedData = buttonsData.concat(partsData);

// Загрузка частей данных
        function loadPart(partLoaded, partEmpty) {
        
            Lampa.Api.partNext(combinedData, partsLimit, partLoaded, partEmpty);
        }

        loadPart(onComplete, onError);
        return loadPart;
    };
};



function add() {
    // Проверка наличия Lampa API
    if (typeof Lampa === 'undefined' || !Lampa.Storage || !Lampa.Api || !Lampa.Params) {
        console.error('Lampa API is not available');
        return;
    }

    // Проверка наличия Lampa.Api.sources.tmdb
    if (!Lampa.Api.sources || !Lampa.Api.sources.tmdb) {
        console.error('Lampa.Api.sources.tmdb is not defined');
        return;
    }

    // Получаем значение из Storage
    var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
    var sourceNameNew = sourceName + ' NEW';
    var sourceNameKids = sourceName + ' KIDS';
    var sourceNameRus = sourceName + ' RUS';

    // Функция для копирования свойств объекта (замена Object.assign для ES5)
    function assign(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            if (source) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    }

    // Создаем источники
    var surs_mod = assign({}, Lampa.Api.sources.tmdb, new SourceTMDB(Lampa.Api.sources.tmdb));
    var surs_mod_new = assign({}, Lampa.Api.sources.tmdb, new SourceTMDBnew(Lampa.Api.sources.tmdb));
    var surs_mod_kids = assign({}, Lampa.Api.sources.tmdb, new SourceTMDBkids(Lampa.Api.sources.tmdb));
    var surs_mod_rus = assign({}, Lampa.Api.sources.tmdb, new SourceTMDBrus(Lampa.Api.sources.tmdb));

    // Проверка на успешное создание источников
    if (!surs_mod || !surs_mod_new || !surs_mod_kids || !surs_mod_rus) {
        console.error('Failed to create one or more TMDB sources');
        return;
    }

    // Присваиваем источники напрямую (для совместимости с IE8)
    Lampa.Api.sources.surs_mod = surs_mod;
    Lampa.Api.sources.surs_mod_new = surs_mod_new;
    Lampa.Api.sources.surs_mod_kids = surs_mod_kids;
    Lampa.Api.sources.surs_mod_rus = surs_mod_rus;

    // Динамическое определение источников с использованием Object.defineProperty (для IE9+)
    try {
        Object.defineProperty(Lampa.Api.sources, sourceName, {
            get: function() {
                return surs_mod;
            }
        });
        Object.defineProperty(Lampa.Api.sources, sourceNameNew, {
            get: function() {
                return surs_mod_new;
            }
        });
        Object.defineProperty(Lampa.Api.sources, sourceNameKids, {
            get: function() {
                return surs_mod_kids;
            }
        });
        Object.defineProperty(Lampa.Api.sources, sourceNameRus, {
            get: function() {
                return surs_mod_rus;
            }
        });
    } catch (e) {
        console.warn('Object.defineProperty not supported, using direct assignment: ', e);
        // Запасной вариант для IE8
        Lampa.Api.sources[sourceName] = surs_mod;
        Lampa.Api.sources[sourceNameNew] = surs_mod_new;
        Lampa.Api.sources[sourceNameKids] = surs_mod_kids;
        Lampa.Api.sources[sourceNameRus] = surs_mod_rus;
    }

    // Обновление параметров меню
    var newSourceOptions = {};
    newSourceOptions[sourceName] = sourceName;
    newSourceOptions[sourceNameNew] = sourceNameNew;
    newSourceOptions[sourceNameKids] = sourceNameKids;
    newSourceOptions[sourceNameRus] = sourceNameRus;

    var mergedOptions = assign({}, Lampa.Params.values['source'], newSourceOptions);

    try {
        Lampa.Params.select('source', mergedOptions, 'tmdb');
    } catch (e) {
        console.error('Error updating Lampa.Params.select: ', e);
    }
}

function startProfileListener() {
    var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
    var sourceNameKids = sourceName + ' KIDS';
    var sourceNameRus = sourceName + ' RUS';
    var sourceNameNew = sourceName + ' NEW';

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
            if (event.value === sourceName || event.value === sourceNameKids || event.value === sourceNameRus || event.value === sourceNameNew) {
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
        title: Lampa.Lang.translate('title_main') + ' - ' + source.toUpperCase(),
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
            var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
            var sourceNameKids = sourceName + ' KIDS';
            var sourceNameRus = sourceName + ' RUS'; // Новый источник
               var sourceNameNew = sourceName + ' NEW'; // Новый источник

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
    'surs_best_content',
    'surs_sort_options',
    'surs_global_streamings',
    'surs_rus_streaming',
    'surs_genres',
    'surs_global_streaming'
];

var shouldHide = (currentSource === sourceNameKids || currentSource === sourceNameRus || currentSource === sourceNameNew);

// Объект с локализациями
var translations = {
    surs_geo_filters: {
        ru: "Настройки подборок",
        en: "Collection settings",
        uk: "Налаштування підбірок"
    },
    surs_filters: {
        ru: "Фильтры",
        en: "Filters",
        uk: "Фільтри"
    },
    surs_technical_settings: {
        ru: "Технические настройки",
        en: "Technical settings",
        uk: "Технічні налаштування"
    }
};

// Получаем текущий язык
var currentLocale = Lampa.Storage.get('language') || 'ru'; // 'ru' как запасной вариант, если язык не определен

// Скрываем или показываем параметры
paramsToHide.forEach(function (param) {
    var element = $('div[data-name="' + param + '"]');
    if (shouldHide) {
        element.hide();
    } else {
        element.show();
    }
});

// Удаление заголовков с локализованными названиями
if (shouldHide) {
    $('div.settings-param-title span').each(function () {
        var text = $(this).text().trim();
        // Проверяем, соответствует ли текст одному из локализованных значений
        if (
            text === translations.surs_geo_filters[currentLocale] ||
            text === translations.surs_filters[currentLocale] ||
            text === translations.surs_technical_settings[currentLocale]
        ) {
            $(this).closest('div.settings-param-title').remove();
        }
    });
}

        }, 1);
    }
});



function addSettingMenu() {
    // Проверка наличия Lampa API
    if (typeof Lampa === 'undefined' || !Lampa.Storage || !Lampa.SettingsApi || !Lampa.Lang || !Lampa.Select || !Lampa.Activity || !Lampa.Controller || !Lampa.Listener || !Lampa.Input || !Lampa.Noty) {
        console.error('Lampa API is not available');
        return;
    }

    try {
        var currentSource = Lampa.Storage.get('source');
        var sourceName = Lampa.Storage.get('surs_name') || Lampa.Lang.translate('surs_source_name');
        var sourceNameKids = sourceName + ' ' + Lampa.Lang.translate('surs_source_name_kids').split(' ')[1];
        var sourceNameRus = sourceName + ' ' + Lampa.Lang.translate('surs_source_name_rus').split(' ')[1];
        var sourceNameNew = sourceName + ' ' + Lampa.Lang.translate('surs_source_name_new').split(' ')[1];

        // Создание объекта для значений выбора источника
        var sourceValues = {};
        sourceValues[sourceName] = sourceName;
        sourceValues[sourceNameNew] = sourceNameNew;
        sourceValues[sourceNameKids] = sourceNameKids;
        sourceValues[sourceNameRus] = sourceNameRus;

        Lampa.SettingsApi.addComponent({
            component: 'surs',
            name: Lampa.Lang.translate('surs_collections') + ' ' + sourceName,
            icon: '<svg height="200px" width="200px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#ffffff;} </style> <g> <path class="st0" d="M443.724,166.599c27.038-2.293,47.087-26.07,44.786-53.125c-2.292-27.038-26.078-47.087-53.115-44.795 c-27.038,2.301-47.078,26.088-44.776,53.124C392.91,148.85,416.677,168.9,443.724,166.599z"></path> <path class="st0" d="M431.752,346.544l30.541-114.485c5.068-19.305-6.466-39.075-25.78-44.144 c-19.304-5.077-39.075,6.448-44.152,25.771v-0.018L365.052,315.64l-78.755-13.276c-17.218-4.304-34.696,5.786-39.578,22.864 l-33.317,133.445c-3.82,13.342,3.913,27.28,17.274,31.1c13.37,3.81,27.298-3.923,31.128-17.283l39.392-98.638l61.286,16.155 C398.863,400.125,421.633,382.927,431.752,346.544z"></path> <path class="st0" d="M388.177,462.949l-0.121-0.01c-0.018,0-0.028,0-0.047,0L388.177,462.949z"></path> <path class="st0" d="M498.349,286.311c-10.1-2.999-20.721,2.749-23.722,12.858l-27.876,93.848 c-2.096,6.606-4.536,11.777-7.146,15.746c-3.987,5.944-8.002,9.373-13.854,12.093c-5.842,2.664-14.031,4.379-25.416,4.37 c-3.009,0.008-6.215-0.113-9.634-0.355l-54.009-3.363c-10.519-0.661-19.575,7.341-20.227,17.861 c-0.662,10.518,7.342,19.574,17.86,20.226l53.73,3.345c4.211,0.298,8.31,0.448,12.28,0.456c10.072-0.009,19.5-0.988,28.369-3.289 c13.268-3.392,25.315-10.127,34.501-19.892c9.251-9.736,15.531-21.885,19.91-35.609l0.074-0.214l28.015-94.362 C514.206,299.923,508.447,289.302,498.349,286.311z"></path> <path class="st0" d="M248.974,81.219L0,21.256v15.14v281.228l248.974-59.962V81.219z M225.123,238.87L23.851,287.355V51.536 l201.272,48.466V238.87z"></path> <polygon class="st0" points="204.989,115.189 47.991,84.937 47.991,253.953 204.989,223.692 "></polygon> </g> </g></svg>'
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: '',
                type: 'title'
            },
            field: {
                name: Lampa.Lang.translate('surs_collections') + ' ' + Lampa.Lang.translate('surs_from') + ' ' + sourceName,
                description: Lampa.Lang.translate('surs_main_update')
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_empty1',
                type: 'title'
            },
            field: {
                name: Lampa.Lang.translate('surs_settings_interface'),
                description: ''
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_setSource',
                type: 'select',
                values: sourceValues,
                default: sourceName
            },
            field: {
                name: Lampa.Lang.translate('surs_set_as_source'),
                description: Lampa.Lang.translate('surs_source_description')
            },
            onChange: function(value) {
                try {
                    console.log('[DEBUG SURS] Выбранный источник:', value);
                    Lampa.Storage.set('source', value);
                } catch (e) {
                    console.error('Error in setSource onChange:', e);
                }
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_setButtons',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_add_to_menu'),
                description: Lampa.Lang.translate('surs_menu_description')
            },
            onChange: function() {
                try {
                    var currentController = Lampa.Controller.enabled().name;
                    showButtonsSelectionMenu(currentController);
                } catch (e) {
                    console.error('Error in setButtons onChange:', e);
                }
            }
        });

        function showButtonsSelectionMenu(previousController) {
            try {
                var items = [
                    { title: sourceName, id: 'Button_sourceName' },
                    { title: sourceNameKids, id: 'Button_sourceNameKids' },
                    { title: sourceNameRus, id: 'Button_sourceNameRus' }
                ];

                var list = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var isEnabled = getStoredSetting(item.id, false);
                    list.push({
                        title: item.title,
                        id: item.id,
                        checkbox: true,
                        checked: isEnabled
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate('surs_select_menu_sources'),
                    items: list,
                    onBack: function() {
                        try {
                            Lampa.Controller.toggle(previousController || 'settings');
                        } catch (e) {
                            console.error('Error in onBack:', e);
                        }
                    },
                    onCheck: function(selectedItem) {
                        try {
                            var key = selectedItem.id;
                            var isEnabled = getStoredSetting(key, false);
                            setStoredSetting(key, !isEnabled);
                            selectedItem.checked = !isEnabled;
                            addMenuButtons();
                        } catch (e) {
                            console.error('Error in onCheck:', e);
                        }
                    }
                });
            } catch (e) {
                console.error('Error in showButtonsSelectionMenu:', e);
            }
        }

        function addMenuButton(title, action, icon, callback) {
            try {
                var button = $('<li class="menu__item selector" data-action="' + action + '">' +
                    '<div class="menu__ico">' + icon + '</div>' +
                    '<div class="menu__text">' + title + '</div>' +
                    '</li>');

                button.on('hover:enter', callback);
                $('.menu .menu__list').eq(0).append(button);
            } catch (e) {
                console.error('Error in addMenuButton:', e);
            }
        }

        var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="2.2em" height="2.2em" viewBox="0 0 48 48">' +
            '<circle cx="24" cy="24" r="20" fill="white"/>' +
            '</svg>';

        function addMenuButtons() {
            try {
                $('.menu__item[data-action="custom-source"]').remove();

                var isSourceNameEnabled = getStoredSetting('Button_sourceName', false);
                var isSourceNameKidsEnabled = getStoredSetting('Button_sourceNameKids', false);
                var isSourceNameRusEnabled = getStoredSetting('Button_sourceNameRus', false);

                if (isSourceNameEnabled) {
                    addMenuButton(sourceName, 'custom-source', icon, function() {
                        try {
                            Lampa.Activity.push({
                                source: sourceName,
                                title: sourceName,
                                component: 'main',
                                page: 1
                            });
                        } catch (e) {
                            console.error('Error in sourceName button callback:', e);
                        }
                    });
                }

                if (isSourceNameKidsEnabled) {
                    addMenuButton(sourceNameKids, 'custom-source', icon, function() {
                        try {
                            Lampa.Activity.push({
                                source: sourceNameKids,
                                title: sourceNameKids,
                                component: 'main',
                                page: 1
                            });
                        } catch (e) {
                            console.error('Error in sourceNameKids button callback:', e);
                        }
                    });
                }

                if (isSourceNameRusEnabled) {
                    addMenuButton(sourceNameRus, 'custom-source', icon, function() {
                        try {
                            Lampa.Activity.push({
                                source: sourceNameRus,
                                title: sourceNameRus,
                                component: 'main',
                                page: 1
                            });
                        } catch (e) {
                            console.error('Error in sourceNameRus button callback:', e);
                        }
                    });
                }
            } catch (e) {
                console.error('Error in addMenuButtons:', e);
            }
        }

        setTimeout(addMenuButtons, 100);

        Lampa.Listener.follow('profile', function(event) {
            try {
                if (event.type !== 'changed') {
                    return;
                }
                addMenuButtons();
            } catch (e) {
                console.error('Error in profile listener:', e);
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_custom_buttons',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_custom_buttons'),
                description: Lampa.Lang.translate('surs_custom_buttons_description')
            },
            onChange: function() {
                try {
                    var currentController = Lampa.Controller.enabled().name;
                    showSelectionMenu('surs_custom_buttons', getAllButtons(), 'custom_button_', 'id', currentController);
                } catch (e) {
                    console.error('Error in custom_buttons onChange:', e);
                }
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: '',
                type: 'title'
            },
            field: {
                name: Lampa.Lang.translate('surs_filters'),
                description: ''
            }
        });

        function showSelectionMenu(title, items, storagePrefix, keyField, previousController) {
            try {
                keyField = typeof keyField === 'undefined' ? 'id' : keyField;
                var list = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var key = item[keyField];
                    var isEnabled = getStoredSetting(storagePrefix + key, true);
                    list.push({
                        title: Lampa.Lang.translate(item.title),
                        id: key,
                        checkbox: true,
                        checked: isEnabled
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate(title),
                    items: list,
                    onBack: function() {
                        try {
                            Lampa.Controller.toggle(previousController);
                        } catch (e) {
                            console.error('Error in onBack:', e);
                        }
                    },
                    onCheck: function(selectedItem) {
                        try {
                            var key = storagePrefix + selectedItem.id;
                            var isEnabled = getStoredSetting(key, true);
                            setStoredSetting(key, !isEnabled);
                            selectedItem.checked = !isEnabled;
                        } catch (e) {
                            console.error('Error in onCheck:', e);
                        }
                    }
                });
            } catch (e) {
                console.error('Error in showSelectionMenu:', e);
            }
        }

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_sort_options',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_sort_types'),
                description: Lampa.Lang.translate('surs_sort_description')
            },
            onChange: function() {
                try {
                    var currentController = Lampa.Controller.enabled().name;
                    showSelectionMenu('surs_sort_types', allSortOptions, 'sort_', 'id', currentController);
                } catch (e) {
                    console.error('Error in sort_options onChange:', e);
                }
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_genres',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_genres'),
                description: Lampa.Lang.translate('surs_genres_description')
            },
            onChange: function() {
                try {
                    var currentController = Lampa.Controller.enabled().name;
                    showSelectionMenu('surs_genres', allGenres, 'genre_', 'id', currentController);
                } catch (e) {
                    console.error('Error in genres onChange:', e);
                }
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_global_streaming',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_global_streaming'),
                description: Lampa.Lang.translate('surs_global_streaming_description')
            },
            onChange: function() {
                try {
                    var currentController = Lampa.Controller.enabled().name;
                    showSelectionMenu('surs_global_streaming', allStreamingServices, 'streaming_', 'id', currentController);
                } catch (e) {
                    console.error('Error in global_streaming onChange:', e);
                }
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_rus_streaming',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_rus_streaming'),
                description: Lampa.Lang.translate('surs_rus_streaming_description')
            },
            onChange: function() {
                try {
                    var currentController = Lampa.Controller.enabled().name;
                    showSelectionMenu('surs_rus_streaming', allStreamingServicesRUS, 'streaming_rus_', 'id', currentController);
                } catch (e) {
                    console.error('Error in rus_streaming onChange:', e);
                }
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: '',
                type: 'title'
            },
            field: {
                name: Lampa.Lang.translate('surs_geo_filters'),
                description: ''
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_streaming',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_streaming'),
                description: Lampa.Lang.translate('surs_region_description')
            },
            onChange: function() {
                try {
                    var currentController = Lampa.Controller.enabled().name;
                    showStreamingSelectionMenu(currentController);
                } catch (e) {
                    console.error('Error in streaming onChange:', e);
                }
            }
        });

        function showStreamingSelectionMenu(previousController) {
            try {
                var items = [
                    { title: Lampa.Lang.translate('surs_global'), id: 'getStreamingServices' },
                    { title: Lampa.Lang.translate('surs_russian'), id: 'getStreamingServicesRUS' }
                ];

                var list = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var isEnabled = getStoredSetting(item.id, true);
                    list.push({
                        title: item.title,
                        id: item.id,
                        checkbox: true,
                        checked: isEnabled
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate('surs_streaming'),
                    items: list,
                    onBack: function() {
                        try {
                            Lampa.Controller.toggle(previousController || 'settings');
                        } catch (e) {
                            console.error('Error in onBack:', e);
                        }
                    },
                    onCheck: function(selectedItem) {
                        try {
                            var key = selectedItem.id;
                            var isEnabled = getStoredSetting(key, true);
                            setStoredSetting(key, !isEnabled);
                            selectedItem.checked = !isEnabled;
                        } catch (e) {
                            console.error('Error in onCheck:', e);
                        }
                    }
                });
            } catch (e) {
                console.error('Error in showStreamingSelectionMenu:', e);
            }
        }

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_getMoviesByGenre',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_movies'),
                description: Lampa.Lang.translate('surs_region_description')
            },
            onChange: function() {
                try {
                    var currentController = Lampa.Controller.enabled().name;
                    showMoviesByGenreSelectionMenu(currentController);
                } catch (e) {
                    console.error('Error in getMoviesByGenre onChange:', e);
                }
            }
        });

        function showMoviesByGenreSelectionMenu(previousController) {
            try {
                var isUkrainianLanguage = Lampa.Storage.get('language') === 'uk';
                var items = [
                    { title: Lampa.Lang.translate('surs_global'), id: 'getMoviesByGenreGlobal' },
                    { title: Lampa.Lang.translate('surs_russian'), id: 'getMoviesByGenreRus' }
                ];

                if (isUkrainianLanguage) {
                    items.push({ title: Lampa.Lang.translate('surs_ukrainian'), id: 'getMoviesByGenreUA' });
                }

                var list = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var defaultValue = item.id === 'getMoviesByGenreUA' ? isUkrainianLanguage : true;
                    var isEnabled = getStoredSetting(item.id, defaultValue);
                    list.push({
                        title: item.title,
                        id: item.id,
                        checkbox: true,
                        checked: isEnabled
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate('surs_movies'),
                    items: list,
                    onBack: function() {
                        try {
                            Lampa.Controller.toggle(previousController || 'settings');
                        } catch (e) {
                            console.error('Error in onBack:', e);
                        }
                    },
                    onCheck: function(selectedItem) {
                        try {
                            var key = selectedItem.id;
                            var defaultValue = key === 'getMoviesByGenreUA' ? isUkrainianLanguage : true;
                            var isEnabled = getStoredSetting(key, defaultValue);
                            setStoredSetting(key, !isEnabled);
                            selectedItem.checked = !isEnabled;
                        } catch (e) {
                            console.error('Error in onCheck:', e);
                        }
                    }
                });
            } catch (e) {
                console.error('Error in showMoviesByGenreSelectionMenu:', e);
            }
        }

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_getTVShowsByGenre',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_series'),
                description: Lampa.Lang.translate('surs_region_description')
            },
            onChange: function() {
                try {
                    var currentController = Lampa.Controller.enabled().name;
                    showTVShowsByGenreSelectionMenu(currentController);
                } catch (e) {
                    console.error('Error in getTVShowsByGenre onChange:', e);
                }
            }
        });

        function showTVShowsByGenreSelectionMenu(previousController) {
            try {
                var isUkrainianLanguage = Lampa.Storage.get('language') === 'uk';
                var items = [
                    { title: Lampa.Lang.translate('surs_global'), id: 'getTVShowsByGenreGlobal' },
                    { title: Lampa.Lang.translate('surs_russian'), id: 'getTVShowsByGenreRus' },
                    { title: Lampa.Lang.translate('surs_korean'), id: 'getTVShowsByGenreKOR' },
                    { title: Lampa.Lang.translate('surs_turkish'), id: 'getTVShowsByGenreTR' }
                ];

                if (isUkrainianLanguage) {
                    items.push({ title: Lampa.Lang.translate('surs_ukrainian'), id: 'getTVShowsByGenreUA' });
                }

                var list = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var defaultValue = (item.id === 'getTVShowsByGenreKOR') ? false : (item.id === 'getTVShowsByGenreUA' ? isUkrainianLanguage : true);
                    var isEnabled = getStoredSetting(item.id, defaultValue);
                    list.push({
                        title: item.title,
                        id: item.id,
                        checkbox: true,
                        checked: isEnabled
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate('surs_series'),
                    items: list,
                    onBack: function() {
                        try {
                            Lampa.Controller.toggle(previousController || 'settings');
                        } catch (e) {
                            console.error('Error in onBack:', e);
                        }
                    },
                    onCheck: function(selectedItem) {
                        try {
                            var key = selectedItem.id;
                            var defaultValue = (key === 'getTVShowsByGenreKOR') ? false : (key === 'getTVShowsByGenreUA' ? isUkrainianLanguage : true);
                            var isEnabled = getStoredSetting(key, defaultValue);
                            setStoredSetting(key, !isEnabled);
                            selectedItem.checked = !isEnabled;
                        } catch (e) {
                            console.error('Error in onCheck:', e);
                        }
                    }
                });
            } catch (e) {
                console.error('Error in showTVShowsByGenreSelectionMenu:', e);
            }
        }

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_getBestContentByGenre',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_top_all_time'),
                description: Lampa.Lang.translate('surs_top_content_description')
            },
            onChange: function() {
                try {
                    var currentController = Lampa.Controller.enabled().name;
                    showBestContentByGenreSelectionMenu(currentController);
                } catch (e) {
                    console.error('Error in getBestContentByGenre onChange:', e);
                }
            }
        });

        function showBestContentByGenreSelectionMenu(previousController) {
            try {
                var items = [
                    { title: Lampa.Lang.translate('surs_movies'), id: 'getBestContentByGenreMovie' },
                    { title: Lampa.Lang.translate('surs_series'), id: 'getBestContentByGenreTV' }
                ];

                var list = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var isEnabled = getStoredSetting(item.id, true);
                    list.push({
                        title: item.title,
                        id: item.id,
                        checkbox: true,
                        checked: isEnabled
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate('surs_top_all_time'),
                    items: list,
                    onBack: function() {
                        try {
                            Lampa.Controller.toggle(previousController || 'settings');
                        } catch (e) {
                            console.error('Error in onBack:', e);
                        }
                    },
                    onCheck: function(selectedItem) {
                        try {
                            var key = selectedItem.id;
                            var isEnabled = getStoredSetting(key, true);
                            setStoredSetting(key, !isEnabled);
                            selectedItem.checked = !isEnabled;
                        } catch (e) {
                            console.error('Error in onCheck:', e);
                        }
                    }
                });
            } catch (e) {
                console.error('Error in showBestContentByGenreSelectionMenu:', e);
            }
        }

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_best_content',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_top_5_years'),
                description: Lampa.Lang.translate('surs_top_content_description')
            },
            onChange: function() {
                try {
                    var currentController = Lampa.Controller.enabled().name;
                    showBestContentByPeriodSelectionMenu(currentController);
                } catch (e) {
                    console.error('Error in best_content onChange:', e);
                }
            }
        });

        function showBestContentByPeriodSelectionMenu(previousController) {
            try {
                var items = [
                    { title: Lampa.Lang.translate('surs_movies'), id: 'getBestContentByGenreAndPeriod_movie' },
                    { title: Lampa.Lang.translate('surs_series'), id: 'getBestContentByGenreAndPeriod_tv' }
                ];

                var list = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var isEnabled = getStoredSetting(item.id, true);
                    list.push({
                        title: item.title,
                        id: item.id,
                        checkbox: true,
                        checked: isEnabled
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate('surs_top_5_years'),
                    items: list,
                    onBack: function() {
                        try {
                            Lampa.Controller.toggle(previousController || 'settings');
                        } catch (e) {
                            console.error('Error in onBack:', e);
                        }
                    },
                    onCheck: function(selectedItem) {
                        try {
                            var key = selectedItem.id;
                            var isEnabled = getStoredSetting(key, true);
                            setStoredSetting(key, !isEnabled);
                            selectedItem.checked = !isEnabled;
                        } catch (e) {
                            console.error('Error in onCheck:', e);
                        }
                    }
                });
            } catch (e) {
                console.error('Error in showBestContentByPeriodSelectionMenu:', e);
            }
        }

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: '',
                type: 'title'
            },
            field: {
                name: Lampa.Lang.translate('surs_technical_settings'),
                description: ''
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_cirillic',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_cyrillic'),
                description: Lampa.Lang.translate('surs_cyrillic_description')
            },
            onChange: function() {
                try {
                    var previousController = Lampa.Controller.enabled().name;
                    showCirillicMenu(previousController);
                } catch (e) {
                    console.error('Error in cirillic onChange:', e);
                }
            }
        });

        function showCirillicMenu(previousController) {
            try {
                var key = 'cirillic';
                var currentValue = getStoredSetting(key, '1');

                var options = [
                    { title: Lampa.Lang.translate('surs_cyrillic_enabled'), value: '1' },
                    { title: Lampa.Lang.translate('surs_cyrillic_disabled'), value: '0' }
                ];

                var items = [];
                for (var i = 0; i < options.length; i++) {
                    var option = options[i];
                    items.push({
                        title: option.title,
                        value: option.value,
                        checkbox: true,
                        checked: currentValue === option.value
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate('surs_cyrillic'),
                    items: items,
                    onBack: function() {
                        try {
                            Lampa.Controller.toggle(previousController || 'settings');
                        } catch (e) {
                            console.error('Error in onBack:', e);
                        }
                    },
                    onCheck: function(selected) {
                        try {
                            setStoredSetting(key, selected.value);
                            showCirillicMenu(previousController);
                        } catch (e) {
                            console.error('Error in onCheck:', e);
                        }
                    }
                });
            } catch (e) {
                console.error('Error in showCirillicMenu:', e);
            }
        }

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_minVotes',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_rating_validation'),
                description: Lampa.Lang.translate('surs_rating_description')
            },
            onChange: function() {
                try {
                    var previousController = Lampa.Controller.enabled().name;
                    showMinVotesMenu(previousController);
                } catch (e) {
                    console.error('Error in minVotes onChange:', e);
                }
            }
        });

        function showMinVotesMenu(previousController) {
            try {
                var key = 'minVotes';
                var currentValue = getStoredSetting(key, '10');

                var options = [
                    { title: Lampa.Lang.translate('surs_rating_off'), value: '0' },
                    { title: Lampa.Lang.translate('surs_rating_standard'), value: '10' },
                    { title: Lampa.Lang.translate('surs_rating_enhanced'), value: '50' },
                    { title: Lampa.Lang.translate('surs_rating_maximum'), value: '150' },
                    { title: Lampa.Lang.translate('surs_rating_fatality'), value: '300' }
                ];

                var items = [];
                for (var i = 0; i < options.length; i++) {
                    var option = options[i];
                    items.push({
                        title: option.title,
                        value: option.value,
                        checkbox: true,
                        checked: currentValue === option.value
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate('surs_rating_validation'),
                    items: items,
                    onBack: function() {
                        try {
                            Lampa.Controller.toggle(previousController || 'settings');
                        } catch (e) {
                            console.error('Error in onBack:', e);
                        }
                    },
                    onCheck: function(selected) {
                        try {
                            setStoredSetting(key, selected.value);
                            showMinVotesMenu(previousController);
                        } catch (e) {
                            console.error('Error in onCheck:', e);
                        }
                    }
                });
            } catch (e) {
                console.error('Error in showMinVotesMenu:', e);
            }
        }

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_ageRestrictions',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_age_restriction'),
                description: Lampa.Lang.translate('surs_age_description')
            },
            onChange: function() {
                try {
                    var previousController = Lampa.Controller.enabled().name;
                    showAgeRestrictionsMenu(previousController);
                } catch (e) {
                    console.error('Error in ageRestrictions onChange:', e);
                }
            }
        });

        function showAgeRestrictionsMenu(previousController) {
            try {
                var key = 'ageRestrictions';
                var currentValue = getStoredSetting(key, '');

                var options = [
                    { title: Lampa.Lang.translate('surs_age_toddlers'), value: '0+' },
                    { title: Lampa.Lang.translate('surs_age_6'), value: '6+' },
                    { title: Lampa.Lang.translate('surs_age_12'), value: '12+' },
                    { title: Lampa.Lang.translate('surs_age_none'), value: '' }
                ];

                var items = [];
                for (var i = 0; i < options.length; i++) {
                    var option = options[i];
                    items.push({
                        title: option.title,
                        value: option.value,
                        checkbox: true,
                        checked: currentValue === option.value
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate('surs_age_restriction'),
                    items: items,
                    onBack: function() {
                        try {
                            Lampa.Controller.toggle(previousController || 'settings');
                        } catch (e) {
                            console.error('Error in onBack:', e);
                        }
                    },
                    onCheck: function(selected) {
                        try {
                            setStoredSetting(key, selected.value);
                            showAgeRestrictionsMenu(previousController);
                        } catch (e) {
                            console.error('Error in onCheck:', e);
                        }
                    }
                });
            } catch (e) {
                console.error('Error in showAgeRestrictionsMenu:', e);
            }
        }

        Lampa.SettingsApi.addParam({
            component: 'surs',
            param: {
                name: 'surs_withoutKeywords',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('surs_exclude_asian'),
                description: Lampa.Lang.translate('surs_exclude_asian_description')
            },
            onChange: function() {
                try {
                    var previousController = Lampa.Controller.enabled().name;
                    showKeywordFilterMenu(previousController);
                } catch (e) {
                    console.error('Error in withoutKeywords onChange:', e);
                }
            }
        });

        function showKeywordFilterMenu(previousController) {
            try {
                var key = 'without_keywords';
                var currentValue = getStoredSetting(key, '1');

                var options = [
                    { title: Lampa.Lang.translate('surs_exclude_off'), value: '0' },
                    { title: Lampa.Lang.translate('surs_exclude_soft'), value: '1' },
                    { title: Lampa.Lang.translate('surs_exclude_strong'), value: '2' }
                ];

                var items = [];
                for (var i = 0; i < options.length; i++) {
                    var option = options[i];
                    items.push({
                        title: option.title,
                        value: option.value,
                        checkbox: true,
                        checked: currentValue === option.value
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate('surs_exclude_asian'),
                    items: items,
                    onBack: function() {
                        try {
                            Lampa.Controller.toggle(previousController || 'settings');
                        } catch (e) {
                            console.error('Error in onBack:', e);
                        }
                    },
                    onCheck: function(selectedItem) {
                        try {
                            setStoredSetting(key, selectedItem.value);
                            showKeywordFilterMenu(previousController);
                        } catch (e) {
                            console.error('Error in onCheck:', e);
                        }
                    }
                });
            } catch (e) {
                console.error('Error in showKeywordFilterMenu:', e);
            }
        }

        if (!Lampa.Storage.get('surs_disableCustomName')) {
            Lampa.SettingsApi.addParam({
                component: 'surs',
                param: {
                    name: '',
                    type: 'title'
                },
                field: {
                    name: Lampa.Lang.translate('surs_name'),
                    description: ''
                }
            });

Lampa.SettingsApi.addParam({
    component: 'surs',
    param: {
        name: 'surs_setName',
        type: 'button'
    },
    field: {
        name: Lampa.Lang.translate('surs_rename_selections'),
        description: Lampa.Lang.translate('surs_rename_description') + ' ' + currentSource
    },
    onChange: function() {
        var currentName = Lampa.Storage.get('surs_name') || '';

        Lampa.Input.edit({
            free: true,
            title: Lampa.Lang.translate('surs_enter_new_name'),
            value: currentName
            // nosave: true — больше не нужен и даже мешает
        }, function(newName) {                // ← сюда приходит строка!
            if (typeof newName === 'string') {
                newName = newName.trim();
            }

            if (newName && newName.length > 0) {
                Lampa.Storage.set('surs_name', newName);
                Lampa.Noty.show(Lampa.Lang.translate('surs_name_saved') || 'Название сохранено');

                setTimeout(() => Lampa.Controller.toggle('settings'), 300);

                setTimeout(() => {
                    try { softRefresh(newName, false); } catch(e) {}
                }, 2000);

                setTimeout(() => location.reload(), 3500);

            } else {
                Lampa.Noty.show(Lampa.Lang.translate('surs_name_not_entered') || 'Название не введено');
            }
        });
    }
});
        }
    } catch (e) {
        console.error('Error in addSettingMenu:', e);
    }
}

// Фикс главной страницы
function addMainButton() {
    // Проверка наличия Lampa API
    if (typeof Lampa === 'undefined' || !Lampa.Storage || !Lampa.Lang || !Lampa.Activity) {
        console.error('Lampa API is not available');
        return;
    }

    try {
        // Найти существующую кнопку
        var mainButton = $('.menu__item[data-action="main"]');
        var menuList = $('.menu .menu__list').eq(0);

        // Проверка наличия списка меню
        if (!menuList.length) {
            console.error('Menu list not found');
            return;
        }

        // Создание новой кнопки
        var homeIcon = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><path fill="currentColor" d="M475.425,200.225L262.092,4.669c-6.951-6.359-17.641-6.204-24.397,0.35L36.213,200.574c-3.449,3.348-5.399,7.953-5.399,12.758v280.889c0,9.819,7.958,17.778,17.778,17.778h148.148c9.819,0,17.778-7.959,17.778-17.778v-130.37h82.963v130.37c0,9.819,7.958,17.778,17.778,17.778h148.148c9.819,0,17.778-7.953,17.778-17.778V213.333C481.185,208.349,479.099,203.597,475.425,200.225z M445.629,476.444H333.037v-130.37c0-9.819-7.959-17.778-17.778-17.778H196.741c-9.819,0-17.778,7.959-17.778,17.778v130.37H66.37V220.853L250.424,42.216l195.206,178.939V476.444z"></path></svg>';

        var button = $('<li class="menu__item selector" data-action="custom-main">' +
            '<div class="menu__ico">' + homeIcon + '</div>' +
            '<div class="menu__text">' + Lampa.Lang.translate('title_main') + '</div>' +
            '</li>');

        // Добавление обработчика события
        button.on('hover:enter', function() {
            try {
                Lampa.Activity.push({
                    source: Lampa.Storage.get('source'),
                    title: Lampa.Lang.translate('title_main') + ' - ' + Lampa.Storage.get('source'),
                    component: 'main',
                    page: 1
                });
            } catch (e) {
                console.error('Error in button hover:enter:', e);
            }
        });


        if (mainButton.length) {
            mainButton.before(button);
            mainButton.remove();
        } else {

            menuList.append(button);
        }
    } catch (e) {
        console.error('Error in addMainButton:', e);
    }
}




//локализация

// Добавление переводов
Lampa.Lang.add({
    surs_vote_count_desc: {
        ru: "Много голосов",
        en: "Most Votes",
        uk: "Багато голосів"
    },
    surs_vote_average_desc: {
        ru: "Высокий рейтинг",
        en: "High Rating",
        uk: "Високий рейтинг"
    },
    surs_first_air_date_desc: {
        ru: "Новинки",
        en: "New Releases",
        uk: "Новинки"
    },
    surs_popularity_desc: {
        ru: "Популярные",
        en: "Popular",
        uk: "Популярні"
    },
    surs_revenue_desc: {
        ru: "Интерес зрителей",
        en: "Audience Interest",
        uk: "Інтерес глядачів"
    },
    surs_genre_action: {
        ru: "боевики",
        en: "action",
        uk: "бойовики"
    },
    surs_genre_comedy: {
        ru: "комедии",
        en: "comedies",
        uk: "комедії"
    },
    surs_genre_drama: {
        ru: "драмы",
        en: "dramas",
        uk: "драми"
    },
    surs_genre_romance: {
        ru: "мелодрамы",
        en: "romance",
        uk: "мелодрами"
    },
    surs_genre_animation: {
        ru: "анимация",
        en: "animations",
        uk: "мультфільми"
    },
    surs_genre_kids: {
        ru: "детское",
        en: "kids",
        uk: "дитяче"
    },
    surs_genre_adventure: {
        ru: "приключения",
        en: "adventures",
        uk: "пригоди"
    },
    surs_genre_crime: {
        ru: "криминал",
        en: "crime",
        uk: "кримінал"
    },
    surs_genre_mystery: {
        ru: "детективы",
        en: "mysteries",
        uk: "детективи"
    },
    surs_genre_sci_fi: {
        ru: "фантастика",
        en: "sci-fi",
        uk: "фантастика"
    },
    surs_genre_western: {
        ru: "вестерны",
        en: "westerns",
        uk: "вестерни"
    },
    surs_genre_thriller: {
        ru: "триллеры",
        en: "thrillers",
        uk: "трилери"
    },
    surs_genre_family: {
        ru: "семейные",
        en: "family",
        uk: "сімейні"
    },
    surs_genre_fantasy: {
        ru: "фэнтези",
        en: "fantasy",
        uk: "фентезі"
    },
    surs_genre_reality: {
        ru: "реалити-шоу",
        en: "reality shows",
        uk: "реаліті-шоу"
    },
    surs_genre_action_adventure: {
        ru: "боевики и приключения",
        en: "action & adventure",
        uk: "бойовики та пригоди"
    },
    surs_genre_soap: {
        ru: "мыльные оперы",
        en: "soap operas",
        uk: "мильні опери"
    },
    surs_genre_talk_show: {
        ru: "ток-шоу",
        en: "talk shows",
        uk: "ток-шоу"
    },
    surs_title_trend_week: {
        ru: "Тренды недели",
        en: "Trending This Week",
        uk: "Тренди тижня"
    },
    surs_title_upcoming_episodes: {
        ru: "Ближайшие эпизоды",
        en: "Upcoming Episodes",
        uk: "Найближчі епізоди"
    },
    surs_popular_persons: {
        ru: "Популярные персоны",
        en: "Popular Persons",
        uk: "Популярні персони"
    },
    surs_top_movies: {
        ru: "Топ фильмы",
        en: "Top Movies",
        uk: "Топ фільми"
    },
    surs_top_tv: {
        ru: "Топ сериалы",
        en: "Top TV Shows",
        uk: "Топ серіали"
    },
        surs_for_period: {
        ru: " за ",
        en: " for ",
        uk: " за "
    },
    surs_noname: {
        ru: "без названия",
        en: "no name",
        uk: "без назви"
    },
    surs_tv_shows: {
        ru: "сериалы",
        en: "TV shows",
        uk: "серіали"
    },
     surs_on: {
        ru: "на",
        en: "on",
        uk: "на"
    },
    surs_source_name: {
        ru: "SURS",
        en: "SURS",
        uk: "SURS"
    },
    surs_source_name_kids: {
        ru: "SURS KIDS",
        en: "SURS KIDS",
        uk: "SURS KIDS"
    },
    surs_source_name_rus: {
        ru: "SURS RUS",
        en: "SURS RUS",
        uk: "SURS RUS"
    },
        surs_source_name_new: {
        ru: "SURS NEW",
        en: "SURS NEW",
        uk: "SURS NEW"
    },
    surs_collections: {
        ru: "Главная",
        en: "Main",
        uk: "Головна"
    },
        surs_main_update: {
        ru: "После изменения настроек обновите главную страницу, нажав на её иконку в боковом меню",
        en: "After changing settings, refresh the main page by clicking its icon in the side menu",
        uk: "Після зміни налаштувань оновіть головну сторінку, натиснувши на її іконку в бічному меню"
    },
    surs_from: {
        ru: "от",
        en: "from",
        uk: "від"
    },
    surs_settings_interface: {
        ru: "Настройка интерфейса",
        en: "Interface Settings",
        uk: "Налаштування інтерфейсу"
    },
    surs_set_as_source: {
        ru: "Установить в качестве источника",
        en: "Set as Source",
        uk: "Встановити як джерело"
    },
    surs_source_description: {
        ru: "Влияет на отображение контента на главной странице",
        en: "Affects content display on the main page",
        uk: "Впливає на відображення контенту на головній сторінці"
    },
    surs_add_to_menu: {
        ru: "Добавить подборки в боковое меню",
        en: "Add collections to the side menu",
        uk: "Додати підбірки до бічного меню"
    },
    surs_menu_description: {
        ru: "Выберите, какие подборки добавить в боковое меню",
        en: "Choose which collections to add to the side menu",
        uk: "Виберіть, які підбірки додати до бічного меню"
    },
    surs_select_menu_sources: {
        ru: "Выбор источников для бокового меню",
        en: "Select sources for the side menu",
        uk: "Вибір джерел для бічного меню"
    },
    surs_filters: {
        ru: "Фильтры",
        en: "Filters",
        uk: "Фільтри"
    },
    surs_sort_types: {
        ru: "Виды сортировки подборок",
        en: "Types of selection sorting",
        uk: "Типи сортування підбірок"
    },
    surs_sort_description: {
        ru: "Выбор сортировки подборок",
        en: "Choose sorting for collections",
        uk: "Вибір сортування для підбірок"
    },
    surs_genres: {
        ru: "Жанры",
        en: "Genres",
        uk: "Жанри"
    },
    surs_genres_description: {
        ru: "Выбор жанров",
        en: "Choose genres",
        uk: "Вибір жанрів"
    },
    surs_global_streaming: {
        ru: "Глобальные стриминги",
        en: "Global streaming services",
        uk: "Глобальні стрімінгові сервіси"
    },
    surs_global_streaming_description: {
        ru: "Выбор глобальных стриминговых сервисов",
        en: "Choose global streaming services",
        uk: "Вибір глобальних стрімінгових сервісів"
    },
    surs_rus_streaming: {
        ru: "Российские стриминги",
        en: "Russian streaming services",
        uk: "Російські стрімінгові сервіси"
    },
    surs_rus_streaming_description: {
        ru: "Выбор российских стриминговых сервисов",
        en: "Choose Russian streaming services",
        uk: "Вибір російських стрімінгових сервісів"
    },
    surs_geo_filters: {
        ru: "Настройки подборок",
        en: "Collection settings",
        uk: "Налаштування підбірок"
    },
    surs_streaming: {
        ru: "Стриминги",
        en: "Streaming services",
        uk: "Стрімінгові сервіси"
    },
    surs_region_description: {
        ru: "Выберите регион",
        en: "Choose region",
        uk: "Виберіть регіон"
    },
    surs_movies: {
        ru: "Фильмы",
        en: "Movies",
        uk: "Фільми"
    },
    surs_series: {
        ru: "Сериалы",
        en: "Series",
        uk: "Серіали"
    },
    surs_top_all_time: {
        ru: "Топ за все время",
        en: "Top of all time",
        uk: "Топ за весь час"
    },
    surs_top_content_description: {
        ru: "Фильмы, сериалы, или всё вместе",
        en: "Movies, series, or both",
        uk: "Фільми, серіали або все разом"
    },
    surs_top_5_years: {
        ru: "Топ за 5 лет",
        en: "Top for 5 years",
        uk: "Топ за 5 років"
    },
    surs_technical_settings: {
        ru: "Технические настройки",
        en: "Technical settings",
        uk: "Технічні налаштування"
    },
    surs_cyrillic: {
        ru: "Кириллица в карточке",
        en: "Cyrillic in card",
        uk: "Кирилиця в картці"
    },
    surs_cyrillic_description: {
        ru: "Фильтрует контент, оставляя только те материалы, у которых есть перевод названия или описание на кириллице",
        en: "Filters content, keeping only materials with titles or descriptions translated into Cyrillic",
        uk: "Фільтрує контент, залишаючи лише матеріали з перекладом назви або опису на кирилицю"
    },
    surs_cyrillic_enabled: {
        ru: "Включен",
        en: "Enabled",
        uk: "Увімкнено"
    },
    surs_cyrillic_disabled: {
        ru: "Выключен",
        en: "Disabled",
        uk: "Вимкнено"
    },
    surs_rating_validation: {
        ru: "Валидация рейтинга",
        en: "Rating validation",
        uk: "Валідація рейтингу"
    },
    surs_rating_description: {
        ru: "Позволяет исключить контент с случайно завышенной оценкой. Однако может также исключить новые фильмы или те, у которых ещё нет рейтинга или мало голосов",
        en: "Excludes content with accidentally inflated ratings. May also exclude new movies or those with no rating or few votes",
        uk: "Виключає контент із випадково завищеним рейтингом. Може також виключити нові фільми або ті, у яких ще немає рейтингу чи мало голосів"
    },
    surs_rating_off: {
        ru: "Выключено",
        en: "Off",
        uk: "Вимкнено"
    },
    surs_rating_standard: {
        ru: "Стандартная",
        en: "Standard",
        uk: "Стандартна"
    },
    surs_rating_enhanced: {
        ru: "Усиленная",
        en: "Enhanced",
        uk: "Посилена"
    },
    surs_rating_maximum: {
        ru: "Максимальная",
        en: "Maximum",
        uk: "Максимальна"
    },
    surs_rating_fatality: {
        ru: "Фаталити",
        en: "Fatality",
        uk: "Фаталіті"
    },
    surs_age_restriction: {
        ru: "Возрастное ограничение",
        en: "Age restriction",
        uk: "Вікове обмеження"
    },
    surs_age_description: {
        ru: "Формирует подборки, которые соответствуют указанному возрастному рейтингу",
        en: "Creates collections that match the specified age rating",
        uk: "Формує підбірки, які відповідають вказаному віковому рейтингу"
    },
    surs_age_toddlers: {
        ru: "Для самых маленьких",
        en: "For toddlers",
        uk: "Для найменших"
    },
    surs_age_6: {
        ru: "Для детей не старше 6 лет",
        en: "For children up to 6 years",
        uk: "Для дітей до 6 років"
    },
    surs_age_12: {
        ru: "Для детей не старше 12 лет",
        en: "For children up to 12 years",
        uk: "Для дітей до 12 років"
    },
    surs_age_none: {
        ru: "Без ограничений",
        en: "No restrictions",
        uk: "Без обмежень"
    },
    surs_exclude_asian: {
        ru: "Исключение азиатских жанров",
        en: "Exclude Asian genres",
        uk: "Виключення азійських жанрів"
    },
    surs_exclude_asian_description: {
        ru: "Мягкий режим: исключает мангу, маньхву, донхуа. Сильный режим: дополнительно исключает аниме",
        en: "Soft mode: excludes manga, manhwa, donghua. Strong mode: additionally excludes anime",
        uk: "М’який режим: виключає мангу, манхву, донхуа. Сильний режим: додатково виключає аніме"
    },
    surs_exclude_off: {
        ru: "Выключено",
        en: "Off",
        uk: "Вимкнено"
    },
    surs_exclude_soft: {
        ru: "Мягко",
        en: "Soft",
        uk: "М’яко"
    },
    surs_exclude_strong: {
        ru: "Сильно",
        en: "Strong",
        uk: "Сильно"
    },
    surs_name: {
        ru: "Название",
        en: "Name",
        uk: "Назва"
    },
    surs_rename_selections: {
        ru: "Переименование подборок",
        en: "Rename collections",
        uk: "Перейменування підбірок"
    },
    surs_rename_description: {
        ru: "Введите свое название вместо",
        en: "Enter your name instead of",
        uk: "Введіть свою назву замість"
    },
    surs_enter_new_name: {
        ru: "Введите новое название",
        en: "Enter new name",
        uk: "Введіть нову назву"
    },
    surs_name_saved: {
        ru: "Название сохранено. Обновление...",
        en: "Name saved. Updating...",
        uk: "Назва збережена. Оновлення..."
    },
    surs_name_not_entered: {
        ru: "Название не введено",
        en: "Name not entered",
        uk: "Назва не введена"
    },
    surs_global: {
        ru: "Глобальные",
        en: "Global",
        uk: "Глобальні"
    },
    surs_russian: {
        ru: "Российские",
        en: "Russian",
        uk: "Російські"
    },
    surs_korean: {
        ru: "Южнокорейские",
        en: "South Korean",
        uk: "Південнокорейські"
    },
    surs_turkish: {
    ru: "турецкие",
    en: "Turkish",
    uk: "турецькі"
},
surs_ukrainian: {
    ru: "украинские",
    en: "Ukrainian",
    uk: "українські"
},
surs_custom_buttons: {
    ru: "Горизонтальное меню",
    en: "Horizontal Menu",
    uk: "Горизонтальне меню"
},
surs_custom_buttons_description: {
    ru: "Выберите, какие кнопки отображать в интерфейсе",
    en: "Choose which buttons to display in the interface",
    uk: "Виберіть, які кнопки відображати в інтерфейсі"
},
surs_main: {
    ru: "Главная",
    en: "Main",
    uk: "Головна"
},
surs_bookmarks: {
    ru: "Избранное",
    en: "Bookmarks",
    uk: "Обране"
},
surs_select: {
    ru: "Разделы",
    en: "Sections",
    uk: "Розділи"
},
surs_new: {
    ru: "Новинки",
    en: "New",
    uk: "Новинки"
},
surs_rus: {
    ru: "Русское",
    en: "Russian",
    uk: "Російське"
},
surs_kids: {
    ru: "Детское",
    en: "Kids",
    uk: "Дитяче"
},
surs_history: {
    ru: "История",
    en: "History",
    uk: "Історія"
}
});

function loadSidePlugins() {
    setTimeout(function () {
        if (!window.SursSelect || !window.SursSelect.__initialized) {
            Lampa.Utils.putScriptAsync(
                ['https://aviamovie.github.io/surs_select.js'],
                function () {
                    console.log('SursSelect плагин успешно загружен.');
                }
            );
        } else {
            console.log('SursSelect уже загружен.');
        }
    }, 2000);
}





if (window.appready) {
    add();
    startProfileListener();
    addMainButton();
    initCustomButtons();;
    loadSidePlugins();

        if (!Lampa.Storage.get('surs_disableMenu')) {
           addSettingMenu();
}
} else {
    Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') {
            add();
            startProfileListener();
            addMainButton();
            initCustomButtons();
            loadSidePlugins();

            if (!Lampa.Storage.get('surs_disableMenu')) {
               addSettingMenu();
}
        }
    });
   }
}

if (!window.plugin_surs_ready) startPlugin();

})( );
