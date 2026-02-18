(function () {  
    'use strict';  
  

    function loadSursPlugin() {  
        if (Lampa.Manifest.app_digital >= 300) {  

            function loadV3Plugins() {  
                // Загружаем nav_buttons  
                Lampa.Utils.putScriptAsync(  
                    ['https://aviamovie.github.io/v3/surs_nav_buttons.js',
                      'https://aviamovie.github.io/v3/surs_strmngs_row.js'
                    ], // Массив вместо строки  
                    function () {  
                        console.log('SURS nav buttons (v3) загружены.');  
                    }  
                );  
                  
                // Загружаем основной surs.js (v3)  
                Lampa.Utils.putScriptAsync(  
                    ['https://aviamovie.github.io/v3/surs.js'], // Массив вместо строки  
                    function () {  
                        console.log('SURS (v3) успешно загружен.');  
                    }  
                );  
                  
                // Через таймаут проверяем и загружаем surs_select.js  
                setTimeout(function () {  
                    if (!window.SursSelect || !window.SursSelect.__initialized) {  
                        Lampa.Utils.putScriptAsync(  
                            ['https://aviamovie.github.io/surs_select.js'], // Массив вместо строки  
                            function () {  
                                console.log('SURS select успешно загружен.');  
                            }  
                        );  
                    } else {  
                        console.log('SursSelect уже загружен.');  
                    }  
                }, 2000);  
            }  
  
            if (window.appready) {  
                loadV3Plugins();  
            } else {  
                Lampa.Listener.follow('app', function(e) {  
                    if (e.type === 'ready') {  
                        loadV3Plugins();  
                    }  
                });  
            }  
        } else {  
            // Для версий ниже 300 загружаем v2  
            Lampa.Utils.putScriptAsync(  
                ['https://aviamovie.github.io/v2/surs.js'], // Массив вместо строки  
                function () {  
                    console.log('SURS (v2) успешно загружен.');  
                }  
            );  
        }  
    }  
  
    // Автоматический вызов  
    loadSursPlugin();  
})();