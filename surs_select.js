(function () {
    'use strict';

    if (window.SursSelect && window.SursSelect.__initialized) return;

    window.SursSelect = window.SursSelect || {};
    window.SursSelect.__initialized = true;

    // Локализация (добавим новый перевод для детской кнопки)
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
        sursSelect_kids_menu_item: { ru: "Детский раздел", en: "Kids Section", uk: "Дитячий розділ" }, // Новая локализация
        sursSelect_lnum_collections: { en: 'LNUM - Collections', ru: 'LNUM - Коллекции', uk: 'LNUM - Колекції' },
        surs_select_plugins_section_title: { en: 'Third-party plugins', ru: 'Сторонние плагины', uk: 'Сторонні плагіни' }
    });

    // ... (остальные переменные и функции остаются без изменений) ...

    // Инициализация плагина
    function initPlugin() {
        // Иконка для кнопки "Подборки"
        var collectionsIcon = '<svg fill="currentColor" height="200px" width="200px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
            '<path d="M26,16H6c-1.7,0-3-1.3-3-3s1.3-3,3-3h20c1.7,0,3,1.3,3,3S27.7,16,26,16z"/>' +
            '<path d="M26.7,14.3C26.6,14.1,26.3,14,26,14H6c-0.3,0-0.6,0.1-0.7,0.3C5.1,14.6,5,14.8,5,15.1l2,16C7.1,31.6,7.5,32,8,32h5c-0.5,0-1-0.4-1-0.9l-1-14c0-0.6,0.4-1,0.9-1.1c0.6,0,1,0.4,1.1,0.9l1,14c0,0.6-0.4,1-0.9,1.1c0,0,0,0-0.1,0h6c0,0,0,0-0.1,0c-0.6,0-1-0.5-0.9-1.1l1-14c0-0.6,0.5-1,1.1-0.9c0.6,0,1,0.5,0.9,1.1l-1,14c0,0.5-0.5,0.9-1,0.9h5c0.5,0,0.9-0.4,1-0.9l2-16C27,14.8,26.9,14.6,26.7,14.3z"/>' +
            '<path d="M25.8,12L6.2,12c-0.4,0-0.8-0.3-0.9-0.7C5.1,10.9,5,10.5,5,10c0-1.5,0.8-2.8,2-3.5C7,6.4,7,6.2,7,6c0-2.2,1.8-4,4-4c0.5,0,1,0.1,1.4,0.3C13.1,0.9,14.4,0,16,0s2.9,0.9,3.6,2.3C20,2.1,20.5,2,21,2c2.2,0,4,1.8,4,4c0,0.2,0,0.4,0,0.5c1.2,0.7,2,2,2,3.5c0,0.5-0.1,0.9-0.2,1.3C26.6,11.7,26.3,12,25.8,12z M7,10l18,0c0,0,0,0,0,0c0-0.9-0.6-1.7-1.5-1.9C23.2,8,23,7.8,22.9,7.6c-0.1-0.3-0.1-0.6,0-0.8C23,6.5,23,6.2,23,6c0-1.1-0.9-2-2-2c-0.5,0-1,0.2-1.3,0.5c-0.3,0.3-0.7,0.3-1,0.2C18.3,4.6,18,4.2,18,3.9C17.9,2.8,17,2,16,2s-1.9,0.8-2,1.9c0,0.4-0.3,0.7-0.6,0.9c-0.4,0.1-0.8,0.1-1-0.2C12,4.2,11.5,4,11,4C9.9,4,9,4.9,9,6c0,0.2,0,0.5,0.1,0.7c0.1,0.3,0.1,0.6,0,0.8C9,7.8,8.8,8,8.5,8.1C7.6,8.3,7,9.1,7,10L7,10z"/>' +
            '</svg>';

        // Иконка для кнопки "Детский раздел"
        var kidsIcon = '<svg fill="currentColor" height="200px" width="200px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
            '<path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,448c-105.9,0-192-86.1-192-192' +
            'S150.1,64,256,64s192,86.1,192,192S361.9,448,256,448z"/>' +
            '<path d="M256,128c-17.7,0-32,14.3-32,32c0,17.7,14.3,32,32,32s32-14.3,32-32C288,142.3,273.7,128,256,128z"/>' +
            '<path d="M302.1,225.7c-11.3-7.6-25.9-7.6-37.2,0l-85.6,57c-12.5,8.3-19.4,22.7-17.7,37.6l9.7,85.6c1.7,14.9,13.4,26.6,28.3,28.3' +
            'l85.6,9.7c14.9,1.7,29.3-5.2,37.6-17.7l57-85.6c7.6-11.3,7.6-25.9,0-37.2L302.1,225.7z M256,320c-17.7,0-32-14.3-32-32' +
            's14.3-32,32-32s32,14.3,32,32S273.7,320,256,320z"/>' +
            '</svg>';

        // Кнопка "Подборки"
        var collectionsItem = $('<li class="menu__item selector" data-action="collections">' +
            '<div class="menu__ico">' + collectionsIcon + '</div>' +
            '<div class="menu__text">' + Lampa.Lang.translate('sursSelect_menu_item') + '</div>' +
            '</li>');

        // Кнопка "Детский раздел"
        var kidsItem = $('<li class="menu__item selector" data-action="kids">' +
            '<div class="menu__ico">' + kidsIcon + '</div>' +
            '<div class="menu__text">' + Lampa.Lang.translate('sursSelect_kids_menu_item') + '</div>' +
            '</li>');

        collectionsItem.on('hover:enter', showSursSelectMenu);
        kidsItem.on('hover:enter', function() {
            showKidsMenu();
        });

        // Добавляем обе кнопки в меню
        $('.menu .menu__list').eq(0).append(collectionsItem);
        $('.menu .menu__list').eq(0).append(kidsItem);
    }

    // ... (остальной код остается без изменений) ...

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