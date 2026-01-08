(function() {  
    'use strict';  
      
    // SVG иконки для кнопок  
    var buttonIcons = {  
        surs_select: '<svg fill="#ffffff" width="64px" height="64px" viewBox="0 0 48.00 48.00" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink" stroke="#ffffff" stroke-width="0.00048000000000000007"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="play_list_eq_trackbar"> <g id="window"> <path d="M3.435,35.724L3.435,12.795C3.435,11.125 4.79,9.769 6.46,9.769L41.11,9.769C42.778,9.769 44.138,11.123 44.138,12.795L44.138,35.724C44.138,37.395 42.782,38.75 41.11,38.75L6.46,38.75C4.79,38.75 3.435,37.395 3.435,35.724ZM27.975,36.835L27.975,11.684L6.46,11.684C5.849,11.684 5.35,12.182 5.35,12.795L5.35,35.724C5.35,36.337 5.849,36.835 6.46,36.835L27.975,36.835ZM42.224,35.724L42.224,25.782L29.039,25.782L29.039,36.835L41.11,36.835C41.724,36.835 42.224,36.337 42.224,35.724ZM42.224,24.718L42.224,12.795C42.224,12.184 41.725,11.684 41.11,11.684L29.039,11.684L29.039,24.718L42.224,24.718Z"></path> <path d="M6.796,13.608C6.796,13.101 7.209,12.689 7.716,12.689C8.223,12.689 8.634,13.101 8.634,13.608C8.634,14.113 8.223,14.525 7.716,14.525C7.209,14.525 6.796,14.113 6.796,13.608ZM9.398,13.608C9.398,13.101 9.809,12.689 10.315,12.689C10.822,12.689 11.234,13.101 11.234,13.608C11.234,14.113 10.822,14.525 10.315,14.525C9.809,14.525 9.398,14.113 9.398,13.608ZM11.996,13.608C11.996,13.101 12.408,12.689 12.913,12.689C13.419,12.689 13.832,13.101 13.832,13.608C13.832,14.113 13.419,14.525 12.913,14.525C12.408,14.525 11.996,14.113 11.996,13.608Z"></path> </g> <g id="trackbar"> <path d="M8.629,33.273C8.629,32.982 8.867,32.74 9.162,32.74L24.353,32.74C24.645,32.74 24.885,32.982 24.885,33.273C24.885,33.566 24.645,33.805 24.353,33.805L9.162,33.805C8.867,33.805 8.629,33.566 8.629,33.273Z" id="line"></path> <path d="M14.019,30.988C15.205,30.988 16.172,31.955 16.172,33.141C16.172,34.327 15.205,35.294 14.019,35.294C12.833,35.294 11.866,34.327 11.866,33.141C11.866,31.955 12.833,30.988 14.019,30.988Z" id="position"></path> </g> <path d="M31.973,33.788L31.973,29.389C31.973,28.83 32.386,28.372 32.892,28.372L32.894,28.372C33.401,28.372 33.813,28.83 33.813,29.389L33.813,33.788C33.813,34.347 33.401,34.804 32.894,34.804L32.892,34.804C32.386,34.804 31.973,34.347 31.973,33.788ZM34.722,33.788L34.722,33.194C34.722,32.634 35.136,32.176 35.641,32.176L35.643,32.176C36.15,32.176 36.564,32.634 36.564,33.194L36.564,33.788C36.564,34.347 36.15,34.804 35.643,34.804L35.641,34.804C35.136,34.804 34.722,34.347 34.722,33.788ZM37.472,33.786L37.472,31.677C37.472,31.117 37.885,30.66 38.392,30.66L38.394,30.66C38.9,30.66 39.313,31.117 39.313,31.677L39.313,33.786C39.313,34.345 38.9,34.802 38.394,34.802L38.392,34.802C37.885,34.802 37.472,34.345 37.472,33.786Z"></path> <path d="M30.554,21.054C30.554,20.762 30.793,20.522 31.086,20.522L37.061,20.522C37.352,20.522 37.594,20.762 37.594,21.054C37.594,21.348 37.352,21.586 37.061,21.586L31.086,21.586C30.793,21.586 30.554,21.348 30.554,21.054ZM30.554,18.847C30.554,18.556 30.793,18.316 31.086,18.316L39.555,18.316C39.847,18.316 40.087,18.556 40.087,18.847C40.087,19.141 39.847,19.379 39.555,19.379L31.086,19.379C30.793,19.379 30.554,19.141 30.554,18.847ZM30.556,16.764C30.556,16.472 30.795,16.232 31.088,16.232L37.063,16.232C37.354,16.232 37.596,16.472 37.596,16.764C37.596,17.058 37.354,17.296 37.063,17.296L31.088,17.296C30.795,17.296 30.556,17.058 30.556,16.764ZM30.556,14.557C30.556,14.266 30.795,14.025 31.088,14.025L39.557,14.025C39.849,14.025 40.088,14.266 40.088,14.557C40.088,14.851 39.849,15.089 39.557,15.089L31.088,15.089C30.795,15.089 30.556,14.851 30.556,14.557Z"></path> <path d="M19.64,23.457L14.132,26.64C13.676,26.903 13.305,26.689 13.305,26.162L13.304,19.799C13.304,19.272 13.676,19.059 14.131,19.322L19.64,22.503C20.096,22.766 20.096,23.194 19.64,23.457Z" id="play"></path> </g> </g></svg>',
        surs_new: '<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#fffefe" stroke="#fffefe" stroke-width="0.00048000000000000007"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>new-rectangle</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M44,14H4a2,2,0,0,0-2,2V32a2,2,0,0,0,2,2H44a2,2,0,0,0,2-2V16A2,2,0,0,0,44,14ZM17.3,29H14.8l-3-5-.7-1.3h0V29H8.7V19h2.5l3,5,.6,1.3h.1s-.1-1.2-.1-1.6V19h2.5Zm9.1,0H18.7V19h7.6v2H21.2v1.8h4.4v2H21.2v2.1h5.2Zm10.9,0H34.8l-1-4.8c-.2-.8-.4-1.9-.4-1.9h0s-.2,1.1-.3,1.9L32,29H29.6L26.8,19h2.5l1,4.2a20.1,20.1,0,0,1,.5,2.5h0l.5-2.4,1-4.3h2.3l.9,4.3.5,2.4h0l.5-2.5,1-4.2H40Z"></path> </g> </g> </g></svg>',
        surs_rus: '<svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 260 166" enable-background="new 0 0 260 166" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="243.199,112.566 235.896,102.51 227.168,100.247 223.726,106.665 218.71,106.395 217.235,85.568 223.332,72.563 228.373,69.98 223.431,56.336 226.922,47.976 230.807,50.312 238.625,65.851 242.928,68.949 258,72.66 245.928,52.033 238.675,52.77 233.659,48.344 233.683,36.961 227.856,22.331 220.406,17.831 217.456,12.299 221.586,6.57 214.407,2.096 213.079,9.152 203.589,19.134 200.368,28.871 201.622,33.937 192.918,42.984 190.509,49.598 185.001,50.065 178.043,56.213 179.149,61.277 172.757,70.006 168.134,64.99 162.848,69.367 150.112,72.047 149.907,72.438 148.416,62.924 143.646,63.269 128.598,69.857 125.328,75.882 119.059,76.397 115.789,80.21 109.789,80.799 105.954,76.102 96.684,85.691 79.646,76.725 56.386,71.48 52.477,73.423 57.05,63.785 57.02,63.678 59.853,70.62 67.205,70.448 65.262,54.836 59.632,54.393 45.814,64.792 44.634,68.629 33.865,71.063 29.046,69.39 20.465,75.242 21.817,80.947 13.9,98.182 17.539,110.624 7.95,113.598 2,114.238 2.86,125.154 10.409,138.333 12.179,145.783 18.104,135.087 21.227,134.227 26.489,135.456 26.71,124.883 32.217,122.007 46.052,124.576 59.036,138.117 66.737,131.522 86.678,135.309 91.005,143.52 96.611,142.611 104.11,156.01 114.068,157.928 121.985,163.904 132.975,158.445 147.063,160.633 149.866,151.88 158.054,153.158 162.529,156.355 172.535,154.143 180.625,154.314 187.435,147.257 196.434,145.783 198.081,141.529 198.647,128.915 206.638,125.424 216.62,131.62 224.832,129.137 228.299,131.522 233.167,123.777 236.585,128.768 239.855,141.676 244.034,140.053 246.272,134.055 "></polygon> </g></svg>',
        surs_kids: '<svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M213,163v-48l8.2-2.8l29.1,37.8L213,163z M176.5,55.5c0-25.8-20.9-46.7-46.7-46.7S83.1,29.7,83.1,55.5s20.9,46.7,46.7,46.7 C155.6,102.3,176.5,81.3,176.5,55.5z M203.7,135.5c-2.4-9.9-12.4-16-22.4-13.5l-35.1,8.6c0,0-47-28.4-47.8-28.8 c-16.9-7.7-37.2-1.1-46.3,15.4l-34.3,62.4c-6.9,12.6-5.5,27.5,2.4,38.4c0.2,0.3,30.4,34.9,30.4,34.9H27.5 c-11.4,0-20.4,9.7-19.4,21.3C9,284.4,17.8,292,28,292h66.5c5.7,0,14.5-2.6,18.7-12c4-8.8,0.6-17.4-4.5-23l-31.5-36.1l36.7-66.7 l19.8,12c3.7,2.2,9.6,3.2,14,2.1c10.7-2.5,42.5-10.4,42.5-10.4C200.1,155.5,206.1,145.5,203.7,135.5z M268.5,222l-7.6-23H214 l-7.6,23H268.5z M272.5,234h-70.1l-7.6,23h85.4L272.5,234z M284.1,269h-93.4l-7.6,23h108.7L284.1,269z"></path> </g></svg>',                  };  
      
    function getAllButtons() {  
        return [  
            { id: 'surs_main', title: 'surs_main' },  
            { id: 'surs_bookmarks', title: 'surs_bookmarks' },  
            { id: 'surs_history', title: 'surs_history' },  
            { id: 'surs_select', title: 'surs_select' },  
            { id: 'surs_new', title: 'surs_new' },  
            { id: 'surs_rus', title: 'surs_rus' },  
            { id: 'surs_kids', title: 'surs_kids' },  
            { id: 'surs_settings', title: 'title_settings' }  
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
        },  
        surs_settings: function() {  
            Lampa.Controller.toggle('settings');  
        }  
    };  
      
    // Функции для работы с настройками  
    function getAllStoredSettings() {  
        return Lampa.Storage.get('surs_settings') || {};  
    }  
      
    function getProfileSettings() {  
        var profileId = Lampa.Storage.get('lampac_profile_id', '') || 'default';  
        var allSettings = getAllStoredSettings();  
        if (!allSettings.hasOwnProperty(profileId)) {  
            allSettings[profileId] = {};  
            saveAllStoredSettings(allSettings);  
        }  
        return allSettings[profileId];  
    }  
      
    function saveAllStoredSettings(settings) {  
        Lampa.Storage.set('surs_settings', settings);  
    }  
      
    function getStoredSetting(key, defaultValue) {  
        var profileSettings = getProfileSettings();  
        return profileSettings.hasOwnProperty(key) ? profileSettings[key] : defaultValue;  
    }  
      
    // Добавление стилей с мобильными адаптациями  
function addStyles() {      
    Lampa.Template.add('custom_buttons_compact_style', `      
        <style>      
            .card--button-compact {      
                width: 12.75em !important;      
            }      
            .items-line {      
                padding-bottom: 0.5em !important;      
            }      
    
            @media screen and (max-width: 767px) {      
                .card--button-compact {      
                    width: 9em !important;      
                }      
                /* Hide button labels on mobile */      
                .card--button-compact .card__button-label {      
                    display: none !important;      
                }      
                /* Reduce row height */      
                .items-line {      
                    padding-bottom: 0.1em !important;      
                }      
                  
                /* Center and resize icons for mobile */      
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
    $('body').append(Lampa.Template.get('custom_buttons_compact_style', {}, true));      
}
      
    function createCard(data, type) {  
        return Lampa.Maker.make(type, data, function(module) {  
            return module.only('Card', 'Callback');  
        });  
    }  
      
    // Добавление кнопок  
    function addCustomButtonsRow(partsData) {  
        partsData.unshift(function(callback) {  
            var allButtons = getAllButtons();  
            var enabledButtons = allButtons.filter(function(b) {  
                return getStoredSetting('custom_button_' + b.id, true);  
            }).map(function(b) {  
                var cardData = {  
                    source: 'custom',  
                    title: Lampa.Lang.translate(b.title),  
                    name: Lampa.Lang.translate(b.title),  
                    id: b.id,  
                    params: {  
                        createInstance: function() {  
                            var card = createCard(this, 'Card');  
                            // Используем спрайты для стандартных иконок  
                            if (b.id === 'surs_main') {  
                                card.data.icon_svg = '<svg><use xlink:href="#sprite-home"></use></svg>';  
                            } else if (b.id === 'surs_bookmarks') {  
                                card.data.icon_svg = '<svg><use xlink:href="#sprite-favorite"></use></svg>';  
                            } else if (b.id === 'surs_history') {  
                                card.data.icon_svg = '<svg><use xlink:href="#sprite-history"></use></svg>';  
                            } else if (b.id === 'surs_settings') {  
                                card.data.icon_svg = '<svg><use xlink:href="#sprite-settings"></use></svg>';  
                            } else if (buttonIcons[b.id]) {  
                                card.data.icon_svg = buttonIcons[b.id];  
                            }  
                            return card;  
                        },  
                        emit: {  
                            onCreate: function() {  
                                this.html.addClass('card--button-compact');  
                                // Для всех SVG иконок  
                                var imgElement = this.html.find('.card__img');  
                                var svgContainer = document.createElement('div');  
                                svgContainer.classList.add('card__svg-icon');  
                                if (b.id === 'surs_main') {  
                                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-home"></use></svg>';  
                                } else if (b.id === 'surs_bookmarks') {  
                                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-favorite"></use></svg>';  
                                } else if (b.id === 'surs_history') {  
                                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-history"></use></svg>';  
                                } else if (b.id === 'surs_settings') {  
                                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-settings"></use></svg>';  
                                } else if (buttonIcons[b.id]) {  
                                    svgContainer.innerHTML = buttonIcons[b.id];  
                                }  
                                imgElement.replaceWith(svgContainer);  
                                var buttonLabel = document.createElement('div');  
                                buttonLabel.classList.add('card__button-label');  
                                buttonLabel.innerText = Lampa.Lang.translate(b.title);  
                                this.html.find('.card__view').append(buttonLabel);  
                            },  
                            onlyEnter: function() {  
                                if (buttonActions[b.id]) {  
                                    buttonActions[b.id]();  
                                }  
                            }  
                        }  
                    }  
                };  
                return cardData;  
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
      
    function startPlugin() {  
        window.plugin_custom_buttons_ready = true;  
        addStyles();  
        // Экспортируем функцию для использования в других плагинах  
        window.getCustomButtonsRow = function(partsData) {  
            addCustomButtonsRow(partsData);  
        };  
        // Используем подход из рабочего примера  
        Lampa.ContentRows.add({  
            index: 0,  
            name: 'surs_buttons',  
            title: '',  
            screen: ['main'],  
            call: function(params, screen) {  
                var partsData = [];  
                addCustomButtonsRow(partsData);  
                return function(callback) {  
                    if (partsData.length > 0) {  
                        partsData[0](callback);  
                    }  
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