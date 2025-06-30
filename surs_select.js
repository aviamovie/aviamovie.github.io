(function() {
    'use strict';

    if (window.SursSelect && window.SursSelect.__initialized) return;

    window.SursSelect = window.SursSelect || {};
    window.SursSelect.__initialized = true;

    // Локализация
    Lampa.Lang.add({
        sursSelect_vote_count_desc: { ru: "Много голосов", en: "Most Votes", uk: "Багато голосів" },
        sursSelect_vote_average_desc: { ru: "Высокий рейтинг", en: "High Rating", uk: "Високий рейтинг" },
        sursSelect_first_air_date_desc: { ru: "Новинки", en: "New Releases", uk: "Новинки" },
        sursSelect_popularity_desc: { ru: "Популярные", en: "Popular", uk: "Популярні" },
        sursSelect_revenue_desc: { ru: "Кассовые сборы", en: "Box Office", uk: "Касові збори" },
        sursSelect_menu_title: { ru: "Разделы", en: "Sections", uk: "Розділи" },
        sursSelect_movies: { ru: "Фильмы", en: "Movies", uk: "Фільми" },
        sursSelect_tvshows: { ru: "Сериалы", en: "TV Shows", uk: "Серіали" },
        sursSelect_dorama_tvshows: { ru: "Корейские дорамы", en: "Korean dramas", uk: "Корейські драми" },  
        sursSelect_turkish_tvshows: { ru: "Турецкие сериалы", en: "Turkish series", uk: "Турецькі серіали" },
        sursSelect_streaming: { ru: "Стриминги", en: "Streaming", uk: "Стрімінг" },
        sursSelect_kids: { ru: "Для детей", en: "For Kids", uk: "Для дітей" },
        sursSelect_all_movies: { ru: "Все фильмы", en: "All Movies", uk: "Усі фільми" },
        sursSelect_russian_movies: { ru: "Российские фильмы", en: "Russian Movies", uk: "Російські фільми" },
        sursSelect_animated_movies: { ru: "Мультфильмы", en: "Animated Movies", uk: "Мультфільми" },
        sursSelect_all_tvshows: { ru: "Все сериалы", en: "All TV Shows", uk: "Усі серіали" },
        sursSelect_russian_tvshows: { ru: "Российские сериалы", en: "Russian TV Shows", uk: "Російські серіали" },
        sursSelect_animated_tvshows: { ru: "Мультсериалы", en: "Animated TV Shows", uk: "Мультсеріали" },
        sursSelect_kids_movies: { ru: "Мультфильмы", en: "Cartoons", uk: "Мультфільми" },
        sursSelect_kids_tvshows: { ru: "Мультсериалы", en: "Cartoon Series", uk: "Мультсеріали" },
        sursSelect_kids_family: { ru: "Семейные", en: "Family", uk: "Сімейні" },
        sursSelect_global_streaming: { ru: "Глобальные стриминги", en: "Global Streaming", uk: "Глобальний стрімінг" },
        sursSelect_russian_streaming: { ru: "Российские стриминги", en: "Russian Streaming", uk: "Російський стрімінг" },
        sursSelect_service_selection: { ru: "Выбор сервиса", en: "Service Selection", uk: "Вибір сервісу" },
        sursSelect_sorting: { ru: "Сортировка", en: "Sorting", uk: "Сортування" },
        sursSelect_menu_item: { ru: "Подборки", en: "Collections", uk: "Колекції" },
        sursSelect_lnum_collections: { en: 'LNUM - Collections', ru: 'LNUM - Коллекции', uk: 'LNUM - Колекції' },
        surs_select_plugins_section_title: { en: 'Third-party plugins', ru: 'Сторонние плагины', uk: 'Сторонні плагіни' }
    });

    // Сервисы стриминга
    var allStreamingServices = [
        { id: 2552, title: 'Apple TV+' }, { id: 1024, title: 'Amazon Prime' }, { id: 49, title: 'HBO' },
        { id: 77, title: 'SyFy' }, { id: 453, title: 'Hulu' }, { id: 213, title: 'Netflix' },
        { id: 3186, title: 'HBO Max' }, { id: 2076, title: 'Paramount network' }, { id: 4330, title: 'Paramount+' },
        { id: 3353, title: 'Peacock' }, { id: 2739, title: 'Disney+' }, { id: 2, title: 'ABC' },
        { id: 6, title: 'NBC' }, { id: 16, title: 'CBS' }, { id: 318, title: 'Starz' },
        { id: 174, title: 'AMC' }, { id: 19, title: 'FOX' }, { id: 64, title: 'Discovery' },
        { id: 493, title: 'BBC America' }, { id: 88, title: 'FX' }, { id: 67, title: 'Showtime' }
    ];

    var allStreamingServicesRUS = [
        { id: 2493, title: 'Start' }, { id: 2859, title: 'Premier' }, { id: 4085, title: 'KION' },
        { id: 3871, title: 'Okko' }, { id: 3827, title: 'Кинопоиск' }, { id: 5806, title: 'Wink' },
        { id: 3923, title: 'ИВИ' }, { id: 806, title: 'СТС' }, { id: 1191, title: 'ТНТ' },
        { id: 3031, title: 'Пятница' }, { id: 3882, title: 'More.TV' }, { id: 412, title: 'Россия 1' },
        { id: 558, title: 'Первый канал' }
    ];

    // Варианты сортировки
    var sortOptionsTV = [
        { id: 'first_air_date.desc', title: 'sursSelect_first_air_date_desc', extraParams: '' },
        { id: 'vote_average.desc', title: 'sursSelect_vote_average_desc', extraParams: '' },
        { id: 'popularity.desc', title: 'sursSelect_popularity_desc', extraParams: '' },
        { id: 'vote_count.desc', title: 'sursSelect_vote_count_desc', extraParams: '' }
    ];

    var sortOptionsMovie = [
        { id: 'release_date.desc', title: 'sursSelect_first_air_date_desc', extraParams: '' },
        { id: 'vote_average.desc', title: 'sursSelect_vote_average_desc', extraParams: '' },
        { id: 'popularity.desc', title: 'sursSelect_popularity_desc', extraParams: '' },
        { id: 'revenue.desc', title: 'sursSelect_revenue_desc', extraParams: '' }
    ];

    var baseExcludedKeywords = ['346488', '158718', '41278', '196034', '272265', '13141', '345822', '315535', '290667', '323477', '290609'];

    // Применение параметров сортировки с индивидуальными настройками
    function applySortParams(sort, options) {
        var params = '';
        var now = new Date();
        var isNewRelease = sort.id === 'first_air_date.desc' || sort.id === 'release_date.desc';
        var isHighRating = sort.id === 'vote_average.desc';
        var isVoteCount = sort.id === 'vote_count.desc';

        // Базовые параметры для дат выпуска
        if (sort.id === 'first_air_date.desc') {
            var end = new Date(now);
            end.setDate(now.getDate() - 10);
            var start = new Date(now);
            start.setFullYear(start.getFullYear() - 3);
            params += '&first_air_date.gte=' + start.toISOString().split('T')[0];
            params += '&first_air_date.lte=' + end.toISOString().split('T')[0];
        }

        if (sort.id === 'release_date.desc') {
            var end = new Date(now);
            end.setDate(now.getDate() - 40);
            var start = new Date(now);
            start.setFullYear(start.getFullYear() - 3);
            params += '&release_date.gte=' + start.toISOString().split('T')[0];
            params += '&release_date.lte=' + end.toISOString().split('T')[0];
        }

        // Индивидуальные настройки для каждого типа контента
        if (options.isKids) {
            // Детский контент
            if (options.isMovie) {
                // Детские фильмы (мультфильмы)
                if (isHighRating) params += '&vote_count.gte=40';
                else if (isNewRelease) params += '&vote_count.gte=2';
                else params += '&vote_count.gte=2';
            } else {
                // Детские сериалы (мультсериалы)
                if (isHighRating) params += '&vote_count.gte=40';
                else if (isNewRelease) params += '&vote_count.gte=2';
                else params += '&vote_count.gte=2';
            }
        } 
        else if (options.isRussian) {
            // Российский контент
            if (options.isMovie) {
                // Российские фильмы
                if (isHighRating) params += '&vote_count.gte=40';
                else if (isNewRelease) params += '&vote_count.gte=5';
                else params += '&vote_count.gte=10';
            } else {
                // Российские сериалы
                if (isHighRating) params += '&vote_count.gte=10';
                else if (isNewRelease) params += '&vote_count.gte=';
                else params += '&vote_count.gte=10';
            }
        }
        else if (options.isStreaming) {
            // Стриминговые сервисы
            if (options.isGlobalStreaming) {
                // Глобальные стриминги (Netflix, HBO и т.д.)
                if (isHighRating) params += '&vote_count.gte=100';
                else if (isNewRelease) params += '&vote_count.gte=20';
                else params += '&vote_count.gte=10';
            } else {
                // Российские стриминги
                if (isHighRating) params += '&vote_count.gte=10';
                else if (isNewRelease) params += '&vote_count.gte=';
                else params += '&vote_count.gte=5';
            }
        } 
        else if (options.isDorama) {
            // Корейские дорамы
            if (isHighRating) params += '&vote_count.gte=100';
            else if (isNewRelease) params += '&vote_count.gte=15';
            else params += '&vote_count.gte=10';
        } 
        else if (options.isTurkish) {
            // Турецкие сериалы
            if (isHighRating) params += '&vote_count.gte=60';
            else if (isNewRelease) params += '&vote_count.gte=10';
            else params += '&vote_count.gte=10';
        } 
        else {
            // Общие категории
            if (options.isMovie) {
                // Все фильмы
                if (isHighRating) params += '&vote_count.gte=700';
                else if (isNewRelease) params += '&vote_count.gte=20';
                else params += '&vote_count.gte=20';
            } else {
                // Все сериалы
                if (isHighRating) params += '&vote_count.gte=150';
                else if (isNewRelease) params += '&vote_count.gte=25';
                else params += '&vote_count.gte=25';
            }
        }

        // Дополнительные параметры для сортировки по количеству голосов
        if (isVoteCount) {
            params += '&vote_average.gte=5';
        }

        // Исключение нежелательного контента
        params += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));

        sort.extraParams = params;
        return sort;
    }

    // Работа с логотипами
    function getLogoUrl(networkId, name, callback) {
        var apiUrl = Lampa.TMDB.api('network/' + networkId + '?api_key=' + Lampa.TMDB.key());
        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function (data) {
                var imgUrl = data && data.logo_path 
                    ? Lampa.TMDB.image('t/p/w154' + data.logo_path) 
                    : '';
                callback(imgUrl);
            },
            error: function () {
                callback('');
            }
        });
    }

    function createLogoHtml(networkId, name) {
        return '<div style="display: flex; align-items: center; padding: 0.5em 0">' +
            '<div style="width: 2.75em; height: 1em; margin-right: 1em;">' +
            (networkId ? '<img src="" style="width: 100%; height: 100%; object-fit: contain; filter: grayscale(100%);" class="logo-' + networkId + '">' : '') +
            '</div>' +
            '<div style="font-size: 1.3em; display: flex; align-items: center;">' + name + '</div>' +
            '</div>';
    }

    function updateLogo(networkId, name) {
        if (networkId) {
            getLogoUrl(networkId, name, function (url) {
                if (url) {
                    $('.logo-' + networkId).attr('src', url);
                }
            });
        }
    }

    // Основное меню
    function showSursSelectMenu() {
        var items = [
            { title: Lampa.Lang.translate('sursSelect_movies'), action: 'movies' },
            { title: Lampa.Lang.translate('sursSelect_tvshows'), action: 'tvshows' },
            { title: Lampa.Lang.translate('sursSelect_streaming'), action: 'streaming' },
            { title: Lampa.Lang.translate('sursSelect_kids'), action: 'kids' }
        ];

        if (window.lnum_plugin === true) {
            items.push({ title: Lampa.Lang.translate('surs_select_plugins_section_title'), separator: true });
            items.push({ title: Lampa.Lang.translate('sursSelect_lnum_collections'), action: 'lnum_collections' });
        }

        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_menu_title'),
            items: items,
            onSelect: function (item) {
                if (item.action === 'movies') showMovieMenu();
                else if (item.action === 'tvshows') showTVMenu();
                else if (item.action === 'streaming') showStreamingTypeMenu();
                else if (item.action === 'kids') showKidsMenu();
                else if (item.action === 'lnum_collections') {
                    Lampa.Activity.push({
                        url: '',
                        title: Lampa.Lang.translate('sursSelect_lnum_collections'),
                        component: 'category',
                        source: 'LNUM'
                    });
                }
            },
            onBack: function () {
                Lampa.Controller.toggle('content');
            }
        });
    }

    // Меню фильмов
    function showMovieMenu() {
        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_movies'),
            items: [
                { 
                    title: Lampa.Lang.translate('sursSelect_all_movies'), 
                    url: 'discover/movie?',
                    isMovie: true 
                },
                { 
                    title: Lampa.Lang.translate('sursSelect_russian_movies'), 
                    url: 'discover/movie?&with_origin_country=RU',
                    isRussian: true,
                    isMovie: true 
                }
            ],
            onSelect: showSortList,
            onBack: showSursSelectMenu
        });
    }

    // Меню сериалов
    function showTVMenu() {
        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_tvshows'),
            items: [
                { 
                    title: Lampa.Lang.translate('sursSelect_all_tvshows'), 
                    url: 'discover/tv?&without_genres=16',
                    isMovie: false 
                },
                { 
                    title: Lampa.Lang.translate('sursSelect_russian_tvshows'), 
                    url: 'discover/tv?&with_origin_country=RU',
                    isRussian: true,
                    isMovie: false 
                },
                // Для дорам
                { 
                    title: Lampa.Lang.translate('sursSelect_dorama_tvshows'), 
                    url: 'discover/tv?&without_genres=16&with_origin_country=KR',
                    isDorama: true,
                    isMovie: false 
                },
                // Для турецких сериалов
                { 
                    title: Lampa.Lang.translate('sursSelect_turkish_tvshows'), 
                    url: 'discover/tv?&without_genres=16&with_origin_country=TR',
                    isTurkish: true,
                    isMovie: false 
                }
            ],
            onSelect: showSortList,
            onBack: showSursSelectMenu
        });
    }

    // Меню для детей
    function showKidsMenu() {
        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_kids'),
            items: [
                { 
                    title: Lampa.Lang.translate('sursSelect_kids_movies'), 
                    url: 'discover/movie?&with_genres=16&certification_country=RU&certification=6%2B',
                    isKids: true,
                    isMovie: true 
                },
                { 
                    title: Lampa.Lang.translate('sursSelect_kids_tvshows'), 
                    url: 'discover/tv?&with_genres=16&certification_country=RU&certification=6%2B',
                    isKids: true,
                    isMovie: false 
                },
                { 
                    title: Lampa.Lang.translate('sursSelect_kids_family'), 
                    url: 'discover/movie?&certification_country=RU&certification=6%2B',
                    isKids: true,
                    isMovie: true 
                }
            ],
            onSelect: function(item) {
                showSortList({
                    url: item.url,
                    title: item.title,
                    isKids: item.isKids,
                    isMovie: item.isMovie
                });
            },
            onBack: showSursSelectMenu
        });
    }

    // Меню стримингов
    function showStreamingTypeMenu() {
        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_streaming'),
            items: [
                { 
                    title: Lampa.Lang.translate('sursSelect_global_streaming'), 
                    list: allStreamingServices,
                    isGlobalStreaming: true 
                },
                { 
                    title: Lampa.Lang.translate('sursSelect_russian_streaming'), 
                    list: allStreamingServicesRUS,
                    isGlobalStreaming: false 
                }
            ],
            onSelect: function (item) {
                showServiceList(item.list, item.isGlobalStreaming);
            },
            onBack: showSursSelectMenu
        });
    }

    // Выбор сервиса
    function showServiceList(serviceList, isGlobalStreaming) {
        var items = [];
        for (var i = 0; i < serviceList.length; i++) {
            items.push({
                title: '<div class="settings-folder" style="padding:0!important">' + createLogoHtml(serviceList[i].id, serviceList[i].title) + '</div>',
                service: serviceList[i],
                isGlobalStreaming: isGlobalStreaming
            });
            updateLogo(serviceList[i].id, serviceList[i].title);
        }

        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_service_selection'),
            items: items,
            onSelect: function (item) {
                showSortList({ 
                    url: 'discover/tv?with_networks=' + item.service.id, 
                    title: item.service.title,
                    isStreaming: true,
                    isGlobalStreaming: item.isGlobalStreaming,
                    isMovie: false
                });
            },
            onBack: showStreamingTypeMenu
        });
    }

    // Выбор сортировки
    function showSortList(service) {
        var isMovie = service.isMovie !== undefined ? service.isMovie : service.url.startsWith('discover/movie');
        var currentSortOptions = isMovie ? sortOptionsMovie : sortOptionsTV;
        var sortItems = [];

        for (var i = 0; i < currentSortOptions.length; i++) {
            sortItems.push({
                title: Lampa.Lang.translate(currentSortOptions[i].title),
                sort: applySortParams(currentSortOptions[i], {
                    isRussian: service.isRussian || service.url.includes('with_original_language=ru'),
                    isStreaming: service.isStreaming || service.url.includes('with_networks='),
                    isGlobalStreaming: service.isGlobalStreaming,
                    isKids: service.isKids || false,
                    isDorama: service.isDorama || false,
                    isTurkish: service.isTurkish || false,
                    isMovie: isMovie
                })
            });
        }

        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_sorting'),
            items: sortItems,
            onSelect: function (sortItem) {
                var sort = sortItem.sort;
                Lampa.Activity.push({
                    url: service.url + sort.extraParams,
                    title: service.title + ' - ' + Lampa.Lang.translate(sortItem.title),
                    component: 'category_full',
                    card_type: 'true',
                    sort_by: sort.id,
                    page: 1,
                });
            },
            onBack: function () {
                if (service.isStreaming) {
                    showStreamingTypeMenu();
                } else if (service.isKids) {
                    showKidsMenu();
                } else {
                    isMovie ? showMovieMenu() : showTVMenu();
                }
            }
        });
    }

    // Инициализация плагина
    function initPlugin() {
        // Иконка для основного меню
        var collectionsIcon = '<svg fill="currentColor" height="200px" width="200px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
            '<path d="M26,16H6c-1.7,0-3-1.3-3-3s1.3-3,3-3h20c1.7,0,3,1.3,3,3S27.7,16,26,16z"/>' +
            '<path d="M26.7,14.3C26.6,14.1,26.3,14,26,14H6c-0.3,0-0.6,0.1-0.7,0.3C5.1,14.6,5,14.8,5,15.1l2,16C7.1,31.6,7.5,32,8,32h5c-0.5,0-1-0.4-1-0.9l-1-14c0-0.6,0.4-1,0.9-1.1c0.6,0,1,0.4,1.1,0.9l1,14c0,0.6-0.4,1-0.9,1.1c0,0,0,0-0.1,0h6c0,0,0,0-0.1,0c-0.6,0-1-0.5-0.9-1.1l1-14c0-0.6,0.5-1,1.1-0.9c0.6,0,1,0.5,0.9,1.1l-1,14c0,0.5-0.5,0.9-1,0.9h5c0.5,0,0.9-0.4,1-0.9l2-16C27,14.8,26.9,14.6,26.7,14.3z"/>' +
            '<path d="M25.8,12L6.2,12c-0.4,0-0.8-0.3-0.9-0.7C5.1,10.9,5,10.5,5,10c0-1.5,0.8-2.8,2-3.5C7,6.4,7,6.2,7,6c0-2.2,1.8-4,4-4c0.5,0,1,0.1,1.4,0.3C13.1,0.9,14.4,0,16,0s2.9,0.9,3.6,2.3C20,2.1,20.5,2,21,2c2.2,0,4,1.8,4,4c0,0.2,0,0.4,0,0.5c1.2,0.7,2,2,2,3.5c0,0.5-0.1,0.9-0.2,1.3C26.6,11.7,26.3,12,25.8,12z M7,10l18,0c0,0,0,0,0,0c0-0.9-0.6-1.7-1.5-1.9C23.2,8,23,7.8,22.9,7.6c-0.1-0.3-0.1-0.6,0-0.8C23,6.5,23,6.2,23,6c0-1.1-0.9-2-2-2c-0.5,0-1,0.2-1.3,0.5c-0.3,0.3-0.7,0.3-1,0.2C18.3,4.6,18,4.2,18,3.9C17.9,2.8,17,2,16,2s-1.9,0.8-2,1.9c0,0.4-0.3,0.7-0.6,0.9c-0.4,0.1-0.8,0.1-1-0.2C12,4.2,11.5,4,11,4C9.9,4,9,4.9,9,6c0,0.2,0,0.5,0.1,0.7c0.1,0.3,0.1,0.6,0,0.8C9,7.8,8.8,8,8.5,8.1C7.6,8.3,7,9.1,7,10L7,10z"/>' +
            '</svg>';

        // Иконка для детского раздела
        var kidsIcon = '<svg viewBox="0 0 514 514" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="m400 2c-79 6-142 75-142 156v14h-99l-98 1-5 2c-38 17-23 63 21 65h15l-3 6c-10 20-10 24-11 76v45l-5-8c-7-12-13-26-18-39-5-15-6-17-11-21-13-12-35-7-41 10-6 16 17 70 46 105 116 145 347 127 439-34 31-54 31-87-1-87-15 0-21 5-28 27-6 18-28 58-31 58-1 0-1-22-1-49v-50l-11-55c-12-60-12-58-6-63 8-7 15-3 24 11 14 24 29 30 47 21 20-9 21-17 10-71-10-52-10-53 2-53s21-14 20-28c-1-6-2-7-10-13-30-20-65-29-103-26m43 74c-10 3-14 17-6 25 13 13 32-4 23-19-3-5-11-8-17-6m-289 114v27l1 26 2 3 3 3h46 46l3-3 2-3v-27-27h-51c-36 0-51 0-52 1m78 116c-54 9-96 54-102 109l-1 6 10 6c70 45 158 47 230 4 9-5 8-4 7-15-7-71-73-122-144-110" fill="currentColor" fill-rule="evenodd"/>' +
            '</svg>';

        // Кнопка "Подборки" в меню
        var menuItem = $('<li class="menu__item selector" data-action="streaming">' +
            '<div class="menu__ico">' + collectionsIcon + '</div>' +
            '<div class="menu__text">' + Lampa.Lang.translate('sursSelect_menu_item') + '</div>' +
            '</li>');

        menuItem.on('hover:enter', showSursSelectMenu);
        $('.menu .menu__list').eq(0).append(menuItem);

        // Кнопка "Для детей" в меню
        var kidsMenuItem = $('<li class="menu__item selector" data-action="kids">' +
            '<div class="menu__ico">' + kidsIcon + '</div>' +
            '<div class="menu__text">' + Lampa.Lang.translate('sursSelect_kids') + '</div>' +
            '</li>');

        kidsMenuItem.on('hover:enter', showKidsMenu);
        $('.menu .menu__list').eq(0).append(kidsMenuItem);
    }

    // Запуск плагина
    if (window.appready) {
        initPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') initPlugin();
        });
    }

    window.SursSelect.showSursSelectMenu = showSursSelectMenu;
})();