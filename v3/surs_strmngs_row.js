(function () {  
    'use strict';  
    if (window.streaming_buttons_ready) return;  
    window.streaming_buttons_ready = true;  
  
    // ====================== КОНСТАНТЫ ======================  
    var BASE_PARAMS = '&without_keywords=346488,158718,41278,196034,272265,13141,345822,315535,290667,323477,290609';  
    var THREE_YEARS_AGO = new Date();  
    THREE_YEARS_AGO.setFullYear(THREE_YEARS_AGO.getFullYear() - 3);  
    var DATE_FILTER = '&first_air_date.gte=' + THREE_YEARS_AGO.toISOString().split('T')[0];  
  
    // ====================== СЕРВИСЫ ======================  
    var globalStreaming = [  
        { id: 213, title: 'Netflix' },  
        { id: 2739, title: 'Disney+' },  
        { id: 2552, title: 'Apple TV+' },  
        { id: 1024, title: 'Amazon Prime Video' },  
        { id: 3186, title: 'Max' },  
        { id: 4330, title: 'Paramount+' },  
        { id: 3353, title: 'Peacock' },  
        { id: 453, title: 'Hulu' },  
        { id: 49, title: 'HBO' },  
        { id: 318, title: 'Starz' },  
        { id: 2, title: 'ABC' },  
        { id: 6, title: 'NBC' },  
        { id: 19, title: 'FOX' },  
        { id: 67, title: 'Showtime' },  
        { id: 88, title: 'FX' },  
        { id: 174, title: 'AMC' }  
    ];  
  
    var russianStreaming = [  
        { id: 3827, title: 'Кинопоиск HD' },  
        { id: 2493, title: 'Start' },  
        { id: 3923, title: 'ИВИ' },  
        { id: 3871, title: 'Okko' },  
        { id: 4085, title: 'KION' },  
        { id: 2859, title: 'Premier' },  
        { id: 5806, title: 'Wink' },  
        { id: 3882, title: 'More.TV' },  
        { id: 412, title: 'Россия 1' },  
        { id: 558, title: 'Первый канал' },  
        { id: 806, title: 'СТС' },  
        { id: 1191, title: 'ТНТ' },  
        { id: 3031, title: 'Пятница!' }  
    ];  
  
    // ====================== ОБЩИЕ ФУНКЦИИ ======================  
    function getAllGlobalButtons() {  
        return globalStreaming.map(function (s) {  
            return { id: 'streaming_' + s.id, title: s.title, service: s };  
        });  
    }  
  
    function getAllRussianButtons() {  
        return russianStreaming.map(function (s) {  
            return { id: 'streaming_' + s.id, title: s.title, service: s };  
        });  
    }  
  
    // ====================== ПРЯМОЙ ЗАПРОС К TMDB ======================  
    function getLogoUrl(networkId, name, callback) {  
        var apiUrl = Lampa.TMDB.api('network/' + networkId + '?api_key=' + Lampa.TMDB.key());  
        Lampa.Network.silent(apiUrl, function (data) {  
            var imgUrl = data && data.logo_path ? Lampa.TMDB.image('t/p/w154' + data.logo_path) : '';  
            callback(imgUrl);  
        }, function () {  
            callback('');  
        }, false, { cache: { life: 60 * 24 * 7 } });  
    }  
  
    // ====================== ОТКРЫТИЕ СЕРВИСА ======================  
    function openStreamingService(service) {  
        var sorts = [  
            { title: 'Новинки', sort: 'first_air_date.desc', params: BASE_PARAMS + DATE_FILTER },  
            { title: 'Высокий рейтинг', sort: 'vote_average.desc', params: BASE_PARAMS + '&vote_count.gte=10' },  
            { title: 'Популярные', sort: 'popularity.desc', params: BASE_PARAMS + '&vote_count.gte=20' },  
            { title: 'Много голосов', sort: 'vote_count.desc', params: BASE_PARAMS + '&vote_count.gte=30' }  
        ];  
  
        var items = sorts.map(function (s) {  
            return {  
                title: s.title,  
                action: function () {  
                    Lampa.Activity.push({  
                        url: 'discover/tv?with_networks=' + service.id + s.params,  
                        title: service.title + ' — ' + s.title,  
                        component: 'category_full',  
                        card_type: 'true',  
                        sort_by: s.sort,  
                        page: 1  
                    });  
                }  
            };  
        });  
  
        Lampa.Select.show({  
            title: service.title,  
            items: items,  
            onSelect: function (i) {  
                i.action();  
            },  
            onBack: function () {  
                Lampa.Controller.toggle('content');  
            }  
        });  
    }  
  
    // ====================== СТИЛИ ======================  
    function addStyles() {  
        Lampa.Template.add('streaming_buttons_compact_style', `  
            <style>  
                .card--button-compact {  
                    width: 12.75em !important;  
                }  
                .items-line {  
                    //padding-bottom: 0.5em !important;  
                }  
                @media screen and (max-width: 767px) {  
                    .card--button-compact {  
                        width: 9em !important;  
                    }  
                    .card--button-compact .card__button-label {  
                        //display: none !important;  
                    }  
                    .items-line {  
                        padding-bottom: 0.1em !important;  
                    }  
                    .card__svg-icon {  
                        width: 60% !important;  
                        height: 60% !important;  
                        top: 50% !important;  
                        left: 50% !important;  
                        transform: translate(-50%, -50%) !important;  
                    }  
                }  
                .card--button-compact .card__view {  
                    padding-bottom: 56% !important;  
                    display: flex;  
                    align-items: center;  
                    justify-content: center;  
                    background-color: rgba(0, 0, 0, 0.2);  
                    border-radius: 1em;  
                }  
                .card--button-compact.hover .card__view,  
                .card--button-compact.focus .card__view {  
                    background-color: rgba(255, 255, 255, 0.1);  
                }  
                .card--button-compact .card__title,  
                .card--button-compact .card__age {  
                    display: none !important;  
                }  
                .card__svg-icon {  
                    position: absolute;  
                    top: 45%;  
                    left: 50%;  
                    transform: translate(-50%, -50%);  
                    width: 40% !important;  
                    height: 40% !important;  
                    display: flex;  
                    align-items: center;  
                    justify-content: center;  
                }  
                .card__svg-icon svg {  
                    width: 100% !important;  
                    height: 100% !important;  
                    fill: currentColor;  
                }  
                .card__button-label {  
                    position: absolute;  
                    bottom: 0.4em;  
                    left: 0;  
                    right: 0;  
                    text-align: center;  
                    color: #fff;  
                    padding: 0.5em;  
                    font-size: 1.0em;  
                    font-weight: 400;  
                    z-index: 1;  
                }  
            </style>  
        `);  
        $('body').append(Lampa.Template.get('streaming_buttons_compact_style', {}, true));  
    }  
  
    // ====================== СОЗДАНИЕ КАРТОЧЕК ======================  
    function createCard(data, type) {  
        return Lampa.Maker.make(type, data, function (module) {  
            return module.only('Card', 'Callback');  
        });  
    }  
  
    // ====================== ДОБАВЛЕНИЕ ГЛОБАЛЬНЫХ КНОПОК ======================  
    function addGlobalStreamingRow(globalStreamingData) {  
        globalStreamingData.unshift(function (callback) {  
            var allButtons = getAllGlobalButtons();  
            var enabledButtons = allButtons.map(function (b) {  
                var cardData = {  
                    source: 'custom',  
                    title: b.title,  
                    name: b.title,  
                    id: b.id,  
                    params: {  
                        createInstance: function () {  
                            var card = createCard(this, 'Card');  
                            return card;  
                        },  
                        emit: {  
                            onCreate: function () {  
                                this.html.addClass('card--button-compact');  
                                var imgElement = this.html.find('.card__img');  
                                var svgContainer = document.createElement('div');  
                                svgContainer.classList.add('card__svg-icon');  
                                getLogoUrl(b.service.id, b.title, function (logo) {  
                                    if (logo) {  
                                        svgContainer.innerHTML = '<img src="' + logo + '" style="width:100%;height:100%;object-fit:contain;">';  
                                    } else {  
                                        svgContainer.innerHTML = '<div style="color:#fff;font-size:1.2em;font-weight:700;text-align:center;">' + b.title + '</div>';  
                                    }  
                                });  
                                imgElement.replaceWith(svgContainer);  
                                var buttonLabel = document.createElement('div');  
                                buttonLabel.classList.add('card__button-label');  
                                buttonLabel.innerText = b.title;  
                                this.html.find('.card__view').append(buttonLabel);  
                            },  
                            onlyEnter: function () {  
                                openStreamingService(b.service);  
                            }  
                        }  
                    }  
                };  
                return cardData;  
            });  
            callback({  
                results: enabledButtons,  
                title: 'Глобальные стриминги',  
                params: {  
                    items: {  
                        view: 20,  
                        mapping: 'line'  
                    }  
                }  
            });  
        });  
    }  
  
    // ====================== ДОБАВЛЕНИЕ РОССИЙСКИХ КНОПОК ======================  
    function addRussianStreamingRow(rusStreamingData) {  
        rusStreamingData.unshift(function (callback) {  
            var allButtons = getAllRussianButtons();  
            var enabledButtons = allButtons.map(function (b) {  
                var cardData = {  
                    source: 'custom',  
                    title: b.title,  
                    name: b.title,  
                    id: b.id,  
                    params: {  
                        createInstance: function () {  
                            var card = createCard(this, 'Card');  
                            return card;  
                        },  
                        emit: {  
                            onCreate: function () {  
                                this.html.addClass('card--button-compact');  
                                var imgElement = this.html.find('.card__img');  
                                var svgContainer = document.createElement('div');  
                                svgContainer.classList.add('card__svg-icon');  
                                getLogoUrl(b.service.id, b.title, function (logo) {  
                                    if (logo) {  
                                        svgContainer.innerHTML = '<img src="' + logo + '" style="width:100%;height:100%;object-fit:contain;">';  
                                    } else {  
                                        svgContainer.innerHTML = '<div style="color:#fff;font-size:1.2em;font-weight:700;text-align:center;">' + b.title + '</div>';  
                                    }  
                                });  
                                imgElement.replaceWith(svgContainer);  
                                var buttonLabel = document.createElement('div');  
                                buttonLabel.classList.add('card__button-label');  
                                buttonLabel.innerText = b.title;  
                                this.html.find('.card__view').append(buttonLabel);  
                            },  
                            onlyEnter: function () {  
                                openStreamingService(b.service);  
                            }  
                        }  
                    }  
                };  
                return cardData;  
            });  
            callback({  
                results: enabledButtons,  
                title: 'Российские стриминги',  
                params: {  
                    items: {  
                        view: 20,  
                        mapping: 'line'  
                    }  
                }  
            });  
        });  
    }  
  
    // ====================== ЗАПУСК ======================  
    function startPlugin() {  
        window.plugin_streaming_buttons_ready = true;  
        addStyles();  
        // Глобальный экспорт  
        window.streaming_getAllGlobalButtons = getAllGlobalButtons;  
        window.streaming_getAllRussianButtons = getAllRussianButtons;  
        window.streaming_getGlobalStreamingRow = function (globalStreamingData) {  
            addGlobalStreamingRow(globalStreamingData);  
        };  
        window.streaming_getRussianStreamingRow = function (rusStreamingData) {  
            addRussianStreamingRow(rusStreamingData);  
        };  
        // Регистрация рядов через ContentRows  
        Lampa.ContentRows.add({  
            index: 3,  
            name: 'streaming_global',  
            title: 'Глобальные стриминги',  
            screen: ['main'],  
            call: function (params, screen) {  
                var globalStreamingData = [];  
                addGlobalStreamingRow(globalStreamingData);  
                return function (callback) {  
                    if (globalStreamingData.length > 0) {  
                        globalStreamingData[0](callback);  
                    }  
                };  
            }  
        });  
  
        Lampa.ContentRows.add({  
            index: 7,  
            name: 'streaming_russian',  
            title: 'Российские стриминги',  
            screen: ['main'],  
            call: function (params, screen) {  
                var rusStreamingData = [];  
                addRussianStreamingRow(rusStreamingData);  
                return function (callback) {  
                    if (rusStreamingData.length > 0) {  
                        rusStreamingData[0](callback);  
                    }  
                };  
            }  
        });  
    }  
  
    if (Lampa.Manifest.app_digital >= 300) {  
        if (window.appready) {  
            startPlugin();  
        } else {  
            Lampa.Listener.follow('app', function (e) {  
                if (e.type === 'ready') startPlugin();  
            });  
        }  
    }  
})();