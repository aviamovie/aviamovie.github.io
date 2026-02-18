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
        { id: 3031, title: 'Пятница!'
        }
    ];

    ... 
})();