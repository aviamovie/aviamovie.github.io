(function () {
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

    // Функция для получения названия сортировки
    function getSortTitle(sortId) {
        switch (sortId) {
            case 'release_date.desc':
            case 'first_air_date.desc':
                return Lampa.Lang.translate('sursSelect_first_air_date_desc');
            case 'vote_average.desc':
                return Lampa.Lang.translate('sursSelect_vote_average_desc');
            case 'popularity.desc':
                return Lampa.Lang.translate('sursSelect_popularity_desc');
            case 'revenue.desc':
                return Lampa.Lang.translate('sursSelect_revenue_desc');
            case 'vote_count.desc':
                return Lampa.Lang.translate('sursSelect_vote_count_desc');
            default:
                return '';
        }
    }

    // Применение параметров сортировки
    function applySortParams(sort, options) {
        var params = '';
        var now = new Date();
        var isNewRelease = sort.id === 'first_air_date.desc' || sort.id === 'release_date.desc';
        var isHighRating = sort.id === 'vote_average.desc';

        if (sort.id === 'first_air_date.desc') {
            var end = new Date(now);
            end.setDate(now.getDate() - 10);
            var start = new Date(now);
            start.setFullYear(start.getFullYear() - 1);
            params += '&first_air_date.gte=' + start.toISOString().split('T')[0];
            params += '&first_air_date.lte=' + end.toISOString().split('T')[0];
        }

        if (sort.id === 'release_date.desc') {
            var end = new Date(now);
            end.setDate(now.getDate() - 40);
            var start = new Date(now);
            start.setFullYear(start.getFullYear() - 1);
            params += '&release_date.gte=' + start.toISOString().split('T')[0];
            params += '&release_date.lte=' + end.toISOString().split('T')[0];
        }

        if (options.isKids && isHighRating) {
            // Для детского контента с сортировкой по рейтингу устанавливаем минимум 130 голосов
            params += '&vote_count.gte=95';
        } else if (isNewRelease && !options.isRussian && !options.isStreaming && !options.isKids) {
            params += '&vote_count.gte=50';
        } else if (options.isRussian && isNewRelease) {
            params += '&vote_count.gte=5';
        } else if (!isNewRelease && !options.isKids) {
            params += '&vote_count.gte=30';
        } else if (options.isKids) {
            params += '&vote_count.gte=10';
        }

        if (sort.id === 'vote_count.desc') {
            params += '&vote_average.gte=5';
        }

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
                { title: Lampa.Lang.translate('sursSelect_all_movies'), url: 'discover/movie?' },
                { title: Lampa.Lang.translate('sursSelect_russian_movies'), url: 'discover/movie?&with_original_language=ru' },
                { title: Lampa.Lang.translate('sursSelect_animated_movies'), url: 'discover/movie?&with_genres=16,10751' }
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
                { title: Lampa.Lang.translate('sursSelect_all_tvshows'), url: 'discover/tv?' },
                { title: Lampa.Lang.translate('sursSelect_russian_tvshows'), url: 'discover/tv?&with_original_language=ru' },
                { title: Lampa.Lang.translate('sursSelect_animated_tvshows'), url: 'discover/tv?&with_genres=16,10751' }
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
                { title: Lampa.Lang.translate('sursSelect_kids_movies'), url: 'discover/movie?&with_genres=16,10751&certification_country=US&certification.lte=PG' },
                { title: Lampa.Lang.translate('sursSelect_kids_tvshows'), url: 'discover/tv?&with_genres=16,10751&certification_country=US&certification.lte=TV-Y7' },
               // { title: Lampa.Lang.translate('sursSelect_kids_family'), url: 'discover/movie?&with_genres=10751&certification_country=US&certification.lte=PG' }
            ],
            onSelect: function(item) {
                showSortList({
                    url: item.url,
                    title: item.title,
                    isKids: true
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
                { title: Lampa.Lang.translate('sursSelect_global_streaming'), list: allStreamingServices },
                { title: Lampa.Lang.translate('sursSelect_russian_streaming'), list: allStreamingServicesRUS }
            ],
            onSelect: function (item) {
                showServiceList(item.list);
            },
            onBack: showSursSelectMenu
        });
    }

    // Выбор сервиса
    function showServiceList(serviceList) {
        var items = [];
        for (var i = 0; i < serviceList.length; i++) {
            items.push({
                title: '<div class="settings-folder" style="padding:0!important">' + createLogoHtml(serviceList[i].id, serviceList[i].title) + '</div>',
                service: serviceList[i]
            });
            updateLogo(serviceList[i].id, serviceList[i].title);
        }

        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_service_selection'),
            items: items,
            onSelect: function (item) {
                showSortList({ 
                    url: 'discover/tv?with_networks=' + item.service.id, 
                    title: item.service.title 
                });
            },
            onBack: showStreamingTypeMenu
        });
    }

    // Выбор сортировки
    function showSortList(service) {
        var isMovie = service.url.startsWith('discover/movie');
        var currentSortOptions = isMovie ? sortOptionsMovie : sortOptionsTV;
        var sortItems = [];

        for (var i = 0; i < currentSortOptions.length; i++) {
            sortItems.push({
                title: Lampa.Lang.translate(currentSortOptions[i].title),
                sort: applySortParams(currentSortOptions[i], {
                    isRussian: service.url.includes('with_original_language=ru'),
                    isStreaming: service.url.includes('with_networks='),
                    isKids: service.isKids || false
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
                    title: service.title + ' — ' + Lampa.Lang.translate(sortItem.title),
                    component: 'category_full',
                    card_type: 'true',
                    page: 1,
                    sort_by: sort.id
                });
            },
            onBack: function () {
                if (service.url.includes('with_networks=')) {
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
        var kidsIcon = '<svg fill="currentColor" height="200px" width="200px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
            '<path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,469.3c-117.8,0-213.3-95.5-213.3-213.3S138.2,42.7,256,42.7S469.3,138.2,469.3,256S373.8,469.3,256,469.3z"/>' +
            '<path d="M341.3,213.3h-42.7v-42.7c0-23.5-19.1-42.7-42.7-42.7s-42.7,19.1-42.7,42.7v42.7h-42.7c-23.5,0-42.7,19.1-42.7,42.7s19.1,42.7,42.7,42.7h42.7v42.7c0,23.5,19.1,42.7,42.7,42.7s42.7-19.1,42.7-42.7v-42.7h42.7c23.5,0,42.7-19.1,42.7-42.7S364.8,213.3,341.3,213.3z"/>' +
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
        function menueSort (){
        $('div[data-component="streaming"]').after($('div[data-component="tv"]'));
        $('div[data-component="kids"]').after($('div[data-component="streaming"]'));
    }
    // Запуск плагина
    if (window.appready) {
        initPlugin();
        menueSort();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') initPlugin(); menueSort();
        });
    }

    window.SursSelect.showSursSelectMenu = showSursSelectMenu;
})();