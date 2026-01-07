(function() {  
    'use strict';  
      
    // Button definitions - используем SVG иконки как в оригинале  
    var buttonIcons = {  
        surs_select: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',  
        surs_new: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 18 21 18 11 2 13 2"/></svg>',  
        surs_rus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"/><path fill="#fff" d="M3 9h18v6H3z"/><path fill="#fc0" d="M3 3h18v6H3z"/></svg>',  
        surs_kids: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'  
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
        surs_main: function() {  
            Lampa.Activity.push({  
                source: Lampa.Storage.get('source'),  
                title: Lampa.Lang.translate('title_main'),  
                component: 'main',  
                page: 1  
            });  
        },  
        surs_bookmarks: function() {  
            Lampa.Activity.push({  
                url: '',  
                title: Lampa.Lang.translate('surs_bookmarks'),  
                component: 'bookmarks',  
                page: 1  
            });  
        },  
        surs_history: function() {  
            Lampa.Activity.push({  
                url: '',  
                title: Lampa.Lang.translate('surs_history'),  
                component: 'favorite',  
                type: 'history',  
                page: 1  
            });  
        },  
        surs_select: function() {  
            if (window.SursSelect && typeof window.SursSelect.showSursSelectMenu === 'function') {  
                window.SursSelect.showSursSelectMenu();  
            }  
        },  
        surs_new: function() {  
            var sourceName = Lampa.Storage.get('surs_name') || 'SURS';  
            Lampa.Activity.push({  
                source: sourceName + ' NEW',  
                title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' NEW',  
                component: 'main',  
                page: 1  
            });  
        },  
        surs_rus: function() {  
            var sourceName = Lampa.Storage.get('surs_name') || 'SURS';  
            Lampa.Activity.push({  
                source: sourceName + ' RUS',  
                title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' RUS',  
                component: 'main',  
                page: 1  
            });  
        },  
        surs_kids: function() {  
            var sourceName = Lampa.Storage.get('surs_name') || 'SURS';  
            Lampa.Activity.push({  
                source: sourceName + ' KIDS',  
                title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' KIDS',  
                component: 'main',  
                page: 1  
            });  
        }  
    };  
      
    function startPlugin() {  
        window.plugin_custom_buttons_ready = true;  
          
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
                background-color: rgba(0, 0, 0, 0.2);  
                border-radius: 1em;  
                display: flex;  
                align-items: center;  
                justify-content: center;  
            }  
              
            @media screen and (max-width: 700px) {  
                .items-cards .custom-button-card {  
                    width: 9em !important;  
                }  
            }  
            .custom-button-card .card__title,  
            .custom-button-card .card__age {  
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
            .card__svg-icon svg path,  
            .card__svg-icon svg polygon,  
            .card__svg-icon svg circle {  
                fill: rgba(255, 255, 255, 0.8) !important;  
            }  
            .card__button-label {  
                position: absolute;  
                bottom: 0.4em;  
                left: 0;  
                right: 0;  
                text-align: center;  
                color: #fff;  
                padding: 0.5em;  
                font-size: 1.1em;  
                font-weight: 500;  
                z-index: 1;  
            }  
            </style>  
        `);  
          
        $('body').append(Lampa.Template.get('custom_button_style', {}, true));  
          
        Lampa.ContentRows.add({  
            index: 0,  
            name: 'surs_buttons',  // Добавлено обязательное поле name  
            title: '',             // Добавлено обязательное поле title  
            screen: ['main'],  
            call: function(params, screen) {  
                var buttons = getAllButtons();  
                if (!buttons.length) return;  
                  
                return function(callback) {  
                    buttons.forEach(function(button) {  
                        button.source = 'custom';  
                        button.title = Lampa.Lang.translate(button.title);  
                        button.name = button.title;  
                        button.params = {  
                            createInstance: function(item) {  
                                var card = Lampa.Maker.make('Card', item, function(module) {  
                                    return module.only('Card', 'Callback');  
                                });  
                                  
                                // Используем SVG иконки вместо постеров  
                                if (item.id === 'surs_main') {  
                                    card.data.icon_svg = '<svg><use xlink:href="#sprite-home"></use></svg>';  
                                } else if (item.id === 'surs_bookmarks') {  
                                    card.data.icon_svg = '<svg><use xlink:href="#sprite-book"></use></svg>';  
                                } else if (item.id === 'surs_history') {  
                                    card.data.icon_svg = '<svg><use xlink:href="#sprite-history"></use></svg>';  
                                } else if (buttonIcons[item.id]) {  
                                    card.data.icon_svg = buttonIcons[item.id];  
                                }  
                                  
                                return card;  
                            },  
                            emit: {  
                                onCreate: function() {  
                                    // Добавляем классы для стилизации  
                                    this.html.addClass('custom-button-card');  
                                    this.html.addClass('card--small');  
                                    this.html.addClass('card--collection');  
                                      
                                    // ИСПРАВЛЕНО: Получаем ID из данных карточки  
                                    var cardId = this.card ? this.card.id : (this.params && this.params.id);  
                                      
                                    if (!cardId) {  
                                        console.warn('Card ID not found');  
                                        return;  
                                    }  
                                      
                                    // Заменяем изображение на SVG  
                                    var imgElement = this.html.find('.card__img');  
                                    var svgContainer = document.createElement('div');  
                                    svgContainer.classList.add('card__svg-icon');  
                                      
                                    if (cardId === 'surs_main') {  
                                        svgContainer.innerHTML = '<svg><use xlink:href="#sprite-home"></use></svg>';  
                                    } else if (cardId === 'surs_bookmarks') {  
                                        svgContainer.innerHTML = '<svg><use xlink:href="#sprite-book"></use></svg>';  
                                    } else if (cardId === 'surs_history') {  
                                        svgContainer.innerHTML = '<svg><use xlink:href="#sprite-history"></use></svg>';  
                                    } else if (buttonIcons[cardId]) {  
                                        svgContainer.innerHTML = buttonIcons[cardId];  
                                    }  
                                      
                                    if (imgElement.length > 0) {  
                                        imgElement.replaceWith(svgContainer);  
                                    }  
                                      
                                    // Добавляем подпись  
                                    var buttonLabel = document.createElement('div');  
                                    buttonLabel.classList.add('card__button-label');  
                                    buttonLabel.innerText = Lampa.Lang.translate(this.card ? this.card.title : cardId);  
                                    this.html.find('.card__view').append(buttonLabel);  
                                },  
                                onlyEnter: function() {  
                                    // ИСПРАВЛЕНО: Получаем ID из данных карточки  
                                    var cardId = this.card ? this.card.id : (this.params && this.params.id);  
                                    if (cardId && buttonActions[cardId]) {  
                                        buttonActions[cardId]();  
                                    }  
                                }  
                            }  
                        };  
                    });  
                      
                    callback({  
                        results: buttons,  
                        title: '',  
                        params: {  
                            items: {  
                                view: 20,  
                                mapping: 'line'  
                            }  
                        }  
                    });  
                };  
            }  
        });  
    }  
      
    // Проверяем версию Lampa и инициализируем плагин  
    if (Lampa.Manifest.app_digital >= 300) {  
        if (window.appready) {  
            startPlugin();  
        } else {  
            Lampa.Listener.follow('app', function(e) {  
                if (e.type === 'ready') startPlugin();  
            });  
        }  
    }  
})();
