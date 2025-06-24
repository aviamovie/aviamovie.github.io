(function () {
    'use strict';

    if (window.SursSelect && window.SursSelect.__initialized) return;

    window.SursSelect = window.SursSelect || {};
    window.SursSelect.__initialized = true;

    // Expanded localization for all UI strings
    Lampa.Lang.add({
        sursSelect_vote_count_desc: {
            ru: "Много голосов",
            en: "Most Votes",
            uk: "Багато голосів"
        },
        sursSelect_vote_average_desc: {
            ru: "Высокий рейтинг",
            en: "High Rating",
            uk: "Високий рейтинг"
        },
        sursSelect_first_air_date_desc: {
            ru: "Новинки",
            en: "New Releases",
            uk: "Новинки"
        },
        sursSelect_popularity_desc: {
            ru: "Популярные",
            en: "Popular",
            uk: "Популярні"
        },
        sursSelect_revenue_desc: {
            ru: "Интерес зрителей",
            en: "Audience Interest",
            uk: "Інтерес глядачів"
        },
        sursSelect_menu_title: {
            ru: "Разделы",
            en: "Sections",
            uk: "Розділи"
        },
        sursSelect_movies: {
            ru: "Фильмы",
            en: "Movies",
            uk: "Фільми"
        },
        sursSelect_tvshows: {
            ru: "Сериалы",
            en: "TV Shows",
            uk: "Серіали"
        },
        sursSelect_streaming: {
            ru: "Стриминги",
            en: "Streaming",
            uk: "Стрімінг"
        },
        sursSelect_animation: {
            ru: "Анимация",
            en: "Animation",
            uk: "Анімація"
        },
        sursSelect_all_movies: {
            ru: "Все фильмы",
            en: "All Movies",
            uk: "Усі фільми"
        },
        sursSelect_russian_movies: {
            ru: "Российские фильмы",
            en: "Russian Movies",
            uk: "Російські фільми"
        },
        sursSelect_all_tvshows: {
            ru: "Все сериалы",
            en: "All TV Shows",
            uk: "Усі серіали"
        },
        sursSelect_russian_tvshows: {
            ru: "Российские сериалы",
            en: "Russian TV Shows",
            uk: "Російські серіали"
        },
        sursSelect_global_streaming: {
            ru: "Глобальные стриминги",
            en: "Global Streaming",
            uk: "Глобальний стрімінг"
        },
        sursSelect_russian_streaming: {
            ru: "Российские стриминги",
            en: "Russian Streaming",
            uk: "Російський стрімінг"
        },
        sursSelect_service_selection: {
            ru: "Выбор сервиса",
            en: "Service Selection",
            uk: "Вибір сервісу"
        },
        sursSelect_sorting: {
            ru: "Сортировка",
            en: "Sorting",
            uk: "Сортування"
        },
        sursSelect_menu_item: {
            ru: "Подборки",
            en: "Collections",
            uk: "Колекції"
        },
        sursSelect_lnum_collections: {
            en: 'LNUM – Collections',
            ru: 'LNUM – Коллекции',
            uk: 'LNUM – Колекції'
        },
        surs_select_plugins_section_title: {
            en: 'Third-party plugins',
            ru: 'Сторонние плагины',
            uk: 'Сторонні плагіни'
        },
        sursSelect_animation_movies: {
            en: 'Animated Movies',
            ru: 'Мультфильмы',
            uk: 'Мультфільми'
        },
        sursSelect_animation_series: {
            en: 'Animated Series',
            ru: 'Мультсериалы',
            uk: 'Мультсеріали'
        },
        sursSelect_animation_new: {
            en: 'New Releases',
            ru: 'Новинки',
            uk: 'Новинки'
        },
        sursSelect_animation_best: {
            en: 'Best Rated',
            ru: 'Лучшие',
            uk: 'Найкращі'
        },
        sursSelect_animation_popular: {
            en: 'Popular',
            ru: 'Популярные',
            uk: 'Популярні'
        },
        sursSelect_animation_revenue: {
            en: 'Box Office',
            ru: 'Кассовые',
            uk: 'Касові'
        },
        sursSelect_animation_rated: {
            en: 'Top Rated',
            ru: 'Рейтинговые',
            uk: 'Рейтингові'
        }
    });

    var allStreamingServices = [
        { id: 2552, title: 'Apple TV+' },
        { id: 1024, title: 'Amazon Prime' },
        { id: 49, title: 'HBO' },
        { id: 77, title: 'SyFy' },
        { id: 453, title: 'Hulu' },
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
        { id: 493, title: 'BBC America' },
        { id: 88, title: 'FX' },
        { id: 67, title: 'Showtime' }
    ];

    var allStreamingServicesRUS = [
        { id: 2493, title: 'Start' },
        { id: 2859, title: 'Premier' },
        { id: 4085, title: 'KION' },
        { id: 3871, title: 'Okko' },
        { id: 3827, title: 'Кинопоиск' },
        { id: 5806, title: 'Wink' },
        { id: 3923, title: 'ИВИ' },
        { id: 806, title: 'СТС' },
        { id: 1191, title: 'ТНТ' },
        { id: 3031, title: 'Пятница' },
        { id: 3882, title: 'More.TV' },
        { id: 412, title: 'Россия 1' },
        { id: 558, title: 'Первый канал' },
    ];

    var sortOptionsTV = [
        { id: 'first_air_date.desc', title: 'sursSelect_first_air_date_desc', extraParams: '' },
        { id: 'vote_average.desc', title: 'sursSelect_vote_average_desc', extraParams: '' },
        { id: 'popularity.desc', title: 'sursSelect_popularity_desc', extraParams: '' },
    ];

    var sortOptionsMovie = [
        { id: 'release_date.desc', title: 'sursSelect_first_air_date_desc', extraParams: '' },
        { id: 'vote_average.desc', title: 'sursSelect_vote_average_desc', extraParams: '' },
        { id: 'popularity.desc', title: 'sursSelect_popularity_desc', extraParams: '' },
    ];

    var baseExcludedKeywords = ['346488', '158718', '41278', '196034', '272265', '13141', '345822', '315535', '290667', '323477', '290609'];

    function applySortParams(sort, options) {
        var params = '';
        var now = new Date();

        var isNewRelease = sort.id === 'first_air_date.desc' || sort.id === 'release_date.desc';

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

        if (!(options.isRussian && isNewRelease) && !(options.isStreaming && isNewRelease)) {
            params += '&vote_count.gte=30';
        } else if (options.isRussian && sort.id === 'release_date.desc') {
            params += '&vote_count.gte=5';
        }

        params += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));

        sort.extraParams = params;
        return sort;
    }

    function getLogoUrl(networkId, name, callback) {
        var apiUrl = Lampa.TMDB.api('network/' + networkId + '?api_key=' + Lampa.TMDB.key());

        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function (data) {
                if (data && data.logo_path) {
                    var imgUrl = Lampa.TMDB.image('t/p/w154' + data.logo_path);
                    callback(imgUrl);
                } else {
                    callback('https://via.placeholder.com/120x120.png?text=' + encodeURIComponent(name.charAt(0)));
                }
            },
            error: function () {
                callback('https://via.placeholder.com/120x120.png?text=' + encodeURIComponent(name.charAt(0)));
            }
        });
    }

    function createLogoHtml(networkId, name) {
        return '<div style="display: flex; align-items: center; padding: 0.5em 0">' +
            '<div style="width: 2.75em; height: 1em; margin-right: 1em;">' +
            '<img src="https://via.placeholder.com/120x120.png?text=' + encodeURIComponent(name.charAt(0)) + '" ' +
            'style="width: 100%; height: 100%; object-fit: contain; filter: grayscale(100%);" ' +
            'class="logo-' + (networkId || 'none') + '">' +
            '</div>' +
            '<div style="font-size: 1.3em; display: flex; align-items: center;">' + name + '</div>' +
            '</div>';
    }

    function updateLogo(networkId, name) {
        if (networkId) {
            getLogoUrl(networkId, name, function (url) {
                $('.logo-' + networkId).attr('src', url);
            });
        }
    }

    function showSursSelectMenu() {
        var items = [
            { title: Lampa.Lang.translate('sursSelect_movies'), action: 'movies' },
            { title: Lampa.Lang.translate('sursSelect_tvshows'), action: 'tvshows' },
            { title: Lampa.Lang.translate('sursSelect_streaming'), action: 'streaming' },
            { title: Lampa.Lang.translate('sursSelect_animation'), action: 'animation' }
        ];

        if (window.lnum_plugin === true) {
            items.push({
                title: Lampa.Lang.translate('surs_select_plugins_section_title'),
                separator: true
            });
            items.push({
                title: Lampa.Lang.translate('sursSelect_lnum_collections'),
                action: 'lnum_collections'
            });
        }

        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_menu_title'),
            items: items,
            onSelect: function (item) {
                if (item.action === 'movies') showMovieMenu();
                else if (item.action === 'tvshows') showTVMenu();
                else if (item.action === 'streaming') showStreamingTypeMenu();
                else if (item.action === 'animation') showAnimationMenu();
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

    function showMovieMenu() {
        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_movies'),
            items: [
                { title: Lampa.Lang.translate('sursSelect_all_movies'), url: 'discover/movie?' },
                { title: Lampa.Lang.translate('sursSelect_russian_movies'), url: 'discover/movie?&with_original_language=ru' }
            ],
            onSelect: function (item) {
                showSortList(item);
            },
            onBack: showSursSelectMenu
        });
    }

    function showTVMenu() {
        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_tvshows'),
            items: [
                { title: Lampa.Lang.translate('sursSelect_all_tvshows'), url: 'discover/tv?' },
                { title: Lampa.Lang.translate('sursSelect_russian_tvshows'), url: 'discover/tv?&with_original_language=ru' }
            ],
            onSelect: function (item) {
                showSortList(item);
            },
            onBack: showSursSelectMenu
        });
    }

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
                showSortList({ url: 'discover/tv?with_networks=' + item.service.id, title: item.service.title });
            },
            onBack: showStreamingTypeMenu
        });
    }

    function showSortList(service) {
        var sortItems = [];
        var isMovie = service.url.startsWith('discover/movie');
        var currentSortOptions = isMovie ? sortOptionsMovie : sortOptionsTV;

        for (var i = 0; i < currentSortOptions.length; i++) {
            sortItems.push({
                title: Lampa.Lang.translate(currentSortOptions[i].title),
                sort: applySortParams(currentSortOptions[i], {
                    isRussian: service.url.includes('with_original_language=ru'),
                    isStreaming: service.url.includes('with_networks='),
                })
            });
        }

        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_sorting'),
            items: sortItems,
            onSelect: function (sortItem) {
                var sort = sortItem.sort;
                var url = service.url + sort.extraParams;

                Lampa.Activity.push({
                    url: url,
                    title: service.title,
                    component: 'category_full',
                    card_type: 'true',
                    page: 1,
                    sort_by: sort.id
                });
            },
            onBack: function () {
                showSursSelectMenu();
            }
        });
    }

    function showAnimationMenu() {
        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_animation'),
            items: [
                { title: Lampa.Lang.translate('sursSelect_animation_movies'), action: 'animation_movies' },
                { title: Lampa.Lang.translate('sursSelect_animation_series'), action: 'animation_series' }
            ],
            onSelect: function (item) {
                if (item.action === 'animation_movies') showAnimationMoviesSort();
                else if (item.action === 'animation_series') showAnimationSeriesSort();
            },
            onBack: showSursSelectMenu
        });
    }

    function showAnimationMoviesSort() {
        var today = new Date();
        var minDate = new Date();
        minDate.setDate(today.getDate() - 30);
        var maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() - 1);
        
        function formatDate(date) {
            var year = date.getFullYear();
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');
            return year + '-' + month + '-' + day;
        }

        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_animation_movies'),
            items: [
                {
                    title: Lampa.Lang.translate('sursSelect_animation_new'),
                    value: 'release_date.desc',
                    special: 'new'
                },
                {
                    title: Lampa.Lang.translate('sursSelect_animation_best'),
                    value: 'vote_average.desc',
                    special: 'best'
                },
                {
                    title: Lampa.Lang.translate('sursSelect_animation_popular'),
                    value: 'popularity.desc'
                },
                {
                    title: Lampa.Lang.translate('sursSelect_animation_revenue'),
                    value: 'revenue.desc'
                }
            ],
            onSelect: function(item) {
                var baseUrl = "discover/movie?with_genres=10751,16&sort_by=" + item.value + "&with_original_language=ru|uk|en|be";
                var title = Lampa.Lang.translate('sursSelect_animation_movies');
                
                if(item.special === 'new') {
                    baseUrl += "&release_date.lte=" + formatDate(minDate) + 
                               "&release_date.gte=" + formatDate(maxDate) +
                               "&vote_count.gte=5";
                    title += " • " + Lampa.Lang.translate('sursSelect_animation_new');
                }
                else if(item.special === 'best') {
                    baseUrl += "&vote_count.gte=125";
                    title += " • " + Lampa.Lang.translate('sursSelect_animation_best');
                }
                else if(item.value === 'popularity.desc') {
                    title += " • " + Lampa.Lang.translate('sursSelect_animation_popular');
                }
                else if(item.value === 'revenue.desc') {
                    title += " • " + Lampa.Lang.translate('sursSelect_animation_revenue');
                }
                
                Lampa.Activity.push({
                    url: baseUrl,
                    title: title,
                    component: "category_full",
                    source: "tmdb",
                    genres: 16,
                    sort: "now",
                    card_type: "true",
                    page: 1
                });
            },
            onBack: showAnimationMenu
        });
    }

    function showAnimationSeriesSort() {
        var today = new Date();
        var minDate = new Date();
        minDate.setDate(today.getDate() - 30);
        var maxDate = new Date();
        maxDate.setFullYear(today.getFullYear() - 5);
        
        function formatDate(date) {
            var year = date.getFullYear();
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');
            return year + '-' + month + '-' + day;
        }

        Lampa.Select.show({
            title: Lampa.Lang.translate('sursSelect_animation_series'),
            items: [
                {
                    title: Lampa.Lang.translate('sursSelect_animation_new'),
                    value: 'first_air_date.desc',
                    special: 'new'
                },
                {
                    title: Lampa.Lang.translate('sursSelect_animation_best'),
                    value: 'vote_average.desc',
                    special: 'best'
                },
                {
                    title: Lampa.Lang.translate('sursSelect_animation_popular'),
                    value: 'popularity.desc'
                },
                {
                    title: Lampa.Lang.translate('sursSelect_animation_rated'),
                    value: 'vote_count.desc'
                }
            ],
            onSelect: function(item) {
                var baseUrl = "discover/tv?with_genres=10751,16&sort_by=" + item.value + 
                             "&certification_country=RU&certification.lte=12+";
                var title = Lampa.Lang.translate('sursSelect_animation_series');
                
                if(item.special === 'new') {
                    baseUrl += "&first_air_date.lte=" + formatDate(minDate) + 
                               "&first_air_date.gte=" + formatDate(maxDate) +
                               "&vote_count.gte=10";
                    title += " • " + Lampa.Lang.translate('sursSelect_animation_new');
                }
                else if(item.special === 'best') {
                    baseUrl += "&vote_count.gte=10";
                    title += " • " + Lampa.Lang.translate('sursSelect_animation_best');
                }
                else if(item.value === 'popularity.desc') {
                    title += " • " + Lampa.Lang.translate('sursSelect_animation_popular');
                }
                else if(item.value === 'vote_count.desc') {
                    title += " • " + Lampa.Lang.translate('sursSelect_animation_rated');
                }
                
                Lampa.Activity.push({
                    url: baseUrl,
                    title: title,
                    component: "category_full",
                    card_type: "true",
                    page: 1
                });
            },
            onBack: showAnimationMenu
        });
    }

    function initPlugin() {
        var sidebarButtonIcon = '<svg fill="currentColor" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M26,16H6c-1.7,0-3-1.3-3-3s1.3-3,3-3h20c1.7,0,3,1.3,3,3S27.7,16,26,16z"></path> </g> <path d="M26.7,14.3C26.6,14.1,26.3,14,26,14H6c-0.3,0-0.6,0.1-0.7,0.3C5.1,14.6,5,14.8,5,15.1l2,16C7.1,31.6,7.5,32,8,32h5 c-0.5,0-1-0.4-1-0.9l-1-14c0-0.6,0.4-1,0.9-1.1c0.6,0,1,0.4,1.1,0.9l1,14c0,0.6-0.4,1-0.9,1.1c0,0,0,0-0.1,0h6c0,0,0,0-0.1,0 c-0.6,0-1-0.5-0.9-1.1l1-14c0-0.6,0.5-1,1.1-0.9c0.6,0,1,0.5,0.9,1.1l-1,14c0,0.5-0.5,0.9-1,0.9h5c0.5,0,0.9-0.4,1-0.9l2-16 C27,14.8,26.9,14.6,26.7,14.3z"></path> <g> <path d="M25.8,12L25.8,12L6.2,12c-0.4,0-0.8-0.3-0.9-0.7C5.1,10.9,5,10.5,5,10c0-1.5,0.8-2.8,2-3.5C7,6.4,7,6.2,7,6 c0-2.2,1.8-4,4-4c0.5,0,1,0.1,1.4,0.3C13.1,0.9,14.4,0,16,0s2.9,0.9,3.6,2.3C20,2.1,20.5,2,21,2c2.2,0,4,1.8,4,4c0,0.2,0,0.4,0,0.5 c1.2,0.7,2,2,2,3.5c0,0.5-0.1,0.9-0.2,1.3C26.6,11.7,26.3,12,25.8,12z M7,10l18,0c0,0,0,0,0,0c0-0.9-0.6-1.7-1.5-1.9 C23.2,8,23,7.8,22.9,7.6c-0.1-0.3-0.1-0.6,0-0.8C23,6.5,23,6.2,23,6c0-1.1-0.9-2-2-2c-0.5,0-1,0.2-1.3,0.5c-0.3,0.3-0.7,0.3-1,0.2 C18.3,4.6,18,4.2,18,3.9C17.9,2.8,17,2,16,2s-1.9,0.8-2,1.9c0,0.4-0.3,0.7-0.6,0.9c-0.4,0.1-0.8,0.1-1-0.2C12,4.2,11.5,4,11,4 C9.9,4,9,4.9,9,6c0,0.2,0,0.5,0.1,0.7c0.1,0.3,0.1,0.6,0,0.8C9,7.8,8.8,8,8.5,8.1C7.6,8.3,7,9.1,7,10L7,10z"></path> </g> </g></svg>';

        var menuItem = $('<li class="menu__item selector" data-action="streaming";>' +
            '<div class="menu__ico">' + sidebarButtonIcon + '</div>' +
            '<div class="menu__text">' + Lampa.Lang.translate('sursSelect_menu_item') + '</div>' +
            '</li>');

        menuItem.on('hover:enter', function () {
            showSursSelectMenu();
        });

        $('.menu .menu__list').eq(0).append(menuItem);
    }

    if (window.appready) {
        initPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') initPlugin();
        });
    }

    window.SursSelect.showSursSelectMenu = showSursSelectMenu;
})();