(function() {  
    'use strict';  
      
    // SVG иконки для кнопок  
    var buttonIcons = {  
        surs_select: '<svg fill="#ffffff" width="64px" height="64px" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M31.9981689,11.9995104 C33.4659424,11.9985117 34.998291,13.1328 34.998291,16.1348 L34.998291,16.1348 L34.998291,26 C34.998291,27.5134277 36.3779053,28.1114014 36.9779053,28.3114014 L36.9779053,28.3114014 L43.8,30.8 C46.7,31.9 48.5,35 47.7,38.2 L47.7,38.2 L44.5,48.5995 C44.3,49.3995 43.6,49.9995 42.7,49.9995 L42.7,49.9995 L26.6,49.9995 C25.8,49.9995 25.1,49.5995 24.8,48.8995 C20.9318685,39.9190553 18.7869873,34.9395752 18.3653564,33.9610596 C17.9437256,32.9825439 18.2219401,32.1955241 19.2,31.6 C21,30.3 23.7,31.6395508 24.8,33.5395508 L24.8,33.5395508 L26.4157715,35.7431828 C27.0515137,36.9508 29,36.9508 29,35.1508 L29,35.1508 L29,16.1348 C29,13.1328 30.5303955,12.0005117 31.9981689,11.9995104 Z M46,2 C48.2,2 50,3.8 50,6 L50,6 L50,21 C50,22.882323 48.1813389,25.0030348 46,25 L46,25 L40.010437,25 C39,25 39,24.1881157 39,24.059082 L39,15.5 C39,11.6547018 37.0187988,8 32,8 C26.9812012,8 25,11.1879783 25,15.5 L25,15.5 L25,24.059082 C25,24.4078007 24.7352295,25 23.987793,25 L23.987793,25 L6,25 C3.8,25 2,23.2 2,21 L2,21 L2,6 C2,3.8 3.8,2 6,2 L6,2 Z"></path> </g></svg>',
surs_new: '<svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 31.603 31.603" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M7.703,15.973c0,0,5.651-5.625,5.651-10.321C13.354,2.53,10.824,0,7.703,0S2.052,2.53,2.052,5.652 C2.052,10.614,7.703,15.973,7.703,15.973z M4.758,5.652c0-1.628,1.319-2.946,2.945-2.946s2.945,1.318,2.945,2.946 c0,1.626-1.319,2.944-2.945,2.944S4.758,7.278,4.758,5.652z"></path> <path d="M28.59,7.643l-0.459,0.146l-2.455,0.219l-0.692,1.106l-0.501-0.16l-1.953-1.76l-0.285-0.915l-0.377-0.977L20.639,4.2 l-1.446-0.283L19.159,4.58l1.418,1.384l0.694,0.817l-0.782,0.408l-0.636-0.188l-0.951-0.396l0.033-0.769l-1.25-0.514L17.27,7.126 l-1.258,0.286l0.125,1.007l1.638,0.316l0.284-1.609l1.353,0.201l0.629,0.368h1.011l0.69,1.384l1.833,1.859l-0.134,0.723 l-1.478-0.189l-2.553,1.289l-1.838,2.205l-0.239,0.976h-0.661l-1.229-0.566l-1.194,0.566l0.297,1.261l0.52-0.602l0.913-0.027 l-0.064,1.132l0.757,0.22l0.756,0.85l1.234-0.347l1.41,0.222l1.636,0.441l0.819,0.095l1.384,1.573l2.675,1.574l-1.729,3.306 l-1.826,0.849l-0.693,1.889l-2.643,1.765l-0.282,1.019c6.753-1.627,11.779-7.693,11.779-14.95 C31.194,13.038,30.234,10.09,28.59,7.643z"></path> <path d="M17.573,24.253l-1.12-2.078l1.028-2.146l-1.028-0.311l-1.156-1.159l-2.56-0.573l-0.85-1.779v1.057h-0.375l-1.625-2.203 c-0.793,0.949-1.395,1.555-1.47,1.629L7.72,17.384l-0.713-0.677c-0.183-0.176-3.458-3.315-5.077-7.13 c-0.966,2.009-1.52,4.252-1.52,6.63c0,8.502,6.891,15.396,15.393,15.396c0.654,0,1.296-0.057,1.931-0.135l-0.161-1.864 c0,0,0.707-2.77,0.707-2.863C18.28,26.646,17.573,24.253,17.573,24.253z"></path> <path d="M14.586,3.768l1.133,0.187l2.75-0.258l0.756-0.834l1.068-0.714l1.512,0.228l0.551-0.083 c-1.991-0.937-4.207-1.479-6.553-1.479c-1.096,0-2.16,0.128-3.191,0.345c0.801,0.875,1.377,1.958,1.622,3.163L14.586,3.768z M16.453,2.343l1.573-0.865l1.009,0.582l-1.462,1.113l-1.394,0.141L15.55,2.907L16.453,2.343z"></path> </g> </g> </g></svg>',        
        surs_rus: '<svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 260 166" enable-background="new 0 0 260 166" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><polygon points="243.199,112.566 235.896,102.51 227.168,100.247 223.726,106.665 218.71,106.395 217.235,85.568 223.332,72.563 228.373,69.98 223.431,56.336 226.922,47.976 230.807,50.312 238.625,65.851 242.928,68.949 258,72.66 245.928,52.033 238.675,52.77 233.659,48.344 233.683,36.961 227.856,22.331 220.406,17.831 217.456,12.299 221.586,6.57 214.407,2.096 213.079,9.152 203.589,19.134 200.368,28.871 201.622,33.937 192.918,42.984 190.509,49.598 185.001,50.065 178.043,56.213 179.149,61.277 172.757,70.006 168.134,64.99 162.848,69.367 150.112,72.047 149.907,72.438 148.416,62.924 143.646,63.269 128.598,69.857 125.328,75.882 119.059,76.397 115.789,80.21 109.789,80.799 105.954,76.102 96.684,85.691 79.646,76.725 56.386,71.48 52.477,73.423 57.05,63.785 57.02,63.678 59.853,70.62 67.205,70.448 65.262,54.836 59.632,54.393 45.814,64.792 44.634,68.629 33.865,71.063 29.046,69.39 20.465,75.242 21.817,80.947 13.9,98.182 17.539,110.624 7.95,113.598 2,114.238 2.86,125.154 10.409,138.333 12.179,145.783 18.104,135.087 21.227,134.227 26.489,135.456 26.71,124.883 32.217,122.007 46.052,124.576 59.036,138.117 66.737,131.522 86.678,135.309 91.005,143.52 96.611,142.611 104.11,156.01 114.068,157.928 121.985,163.904 132.975,158.445 147.063,160.633 149.866,151.88 158.054,153.158 162.529,156.355 172.535,154.143 180.625,154.314 187.435,147.257 196.434,145.783 198.081,141.529 198.647,128.915 206.638,125.424 216.62,131.62 224.832,129.137 228.299,131.522 233.167,123.777 236.585,128.768 239.855,141.676 244.034,140.053 246.272,134.055 "></polygon><text x="130" y="125" font-family="Arial, sans-serif" font-size="47" font-weight="bold" fill="black" text-anchor="middle">NEW</text></g></svg>',
        
        surs_kids: '<svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M213,163v-48l8.2-2.8l29.1,37.8L213,163z M176.5,55.5c0-25.8-20.9-46.7-46.7-46.7S83.1,29.7,83.1,55.5s20.9,46.7,46.7,46.7 C155.6,102.3,176.5,81.3,176.5,55.5z M203.7,135.5c-2.4-9.9-12.4-16-22.4-13.5l-35.1,8.6c0,0-47-28.4-47.8-28.8 c-16.9-7.7-37.2-1.1-46.3,15.4l-34.3,62.4c-6.9,12.6-5.5,27.5,2.4,38.4c0.2,0.3,30.4,34.9,30.4,34.9H27.5 c-11.4,0-20.4,9.7-19.4,21.3C9,284.4,17.8,292,28,292h66.5c5.7,0,14.5-2.6,18.7-12c4-8.8,0.6-17.4-4.5-23l-31.5-36.1l36.7-66.7 l19.8,12c3.7,2.2,9.6,3.2,14,2.1c10.7-2.5,42.5-10.4,42.5-10.4C200.1,155.5,206.1,145.5,203.7,135.5z M268.5,222l-7.6-23H214 l-7.6,23H268.5z M272.5,234h-70.1l-7.6,23h85.4L272.5,234z M284.1,269h-93.4l-7.6,23h108.7L284.1,269z"></path> </g></svg>',                  };  
      
    function getAllButtons() {  
    var baseButtons = [  
        { id: 'surs_main', title: 'surs_main' },  
        { id: 'surs_bookmarks', title: 'surs_bookmarks' },  
        { id: 'surs_history', title: 'surs_history' },  
        { id: 'surs_select', title: 'surs_select' },  
        { id: 'surs_new', title: 'surs_btns_new' },  
        { id: 'surs_rus', title: 'surs_btns_rus' },  
        { id: 'surs_kids', title: 'surs_kids' },  
        { id: 'surs_settings', title: 'title_settings' }  
    ];  
      
    var externalButtons = window.surs_external_buttons || [];  
    var result = [];  
      
    
    for (var i = 0; i < Math.min(3, baseButtons.length); i++) {  
        result.push(baseButtons[i]);  
    }  
      
      
    for (var j = 0; j < externalButtons.length; j++) {  
        result.push(externalButtons[j]);  
    }  
      
    
    for (var k = 3; k < baseButtons.length - 1; k++) {  
        result.push(baseButtons[k]);  
    }  
      
     
    result.push(baseButtons[baseButtons.length - 1]);  
      
    return result;  
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

  // Функция для добавления внешней кнопки  
function addExternalButton(buttonData) {  
    if (!window.surs_external_buttons) {  
        window.surs_external_buttons = [];  
    }  
      
    var button = {  
        id: buttonData.id || 'external_' + Date.now(),  
        title: buttonData.title || 'External Button',  
        icon: buttonData.icon || '',  
        action: buttonData.action || function() {}  
    };  
      
    window.surs_external_buttons.push(button);  
      
    // Обновляем отображение кнопок если плагин уже инициализирован  
    if (window.plugin_custom_buttons_ready) {  
        refreshButtons();  
    }  
}  
  
// Функция для удаления внешней кнопки по ID  
function removeExternalButton(buttonId) {  
    if (window.surs_external_buttons) {  
        for (var i = 0; i < window.surs_external_buttons.length; i++) {  
            if (window.surs_external_buttons[i].id === buttonId) {  
                window.surs_external_buttons.splice(i, 1);  
                if (window.plugin_custom_buttons_ready) {  
                    refreshButtons();  
                }  
                break;  
            }  
        }  
    }  
}  
  
// Функция для очистки всех внешних кнопок  
function clearExternalButtons() {  
    window.surs_external_buttons = [];  
    if (window.plugin_custom_buttons_ready) {  
        refreshButtons();  
    }  
}  
  
// Функция для обновления отображения кнопок  
function refreshButtons() {  
    // Обновляем контент-ряд с кнопками  
    Lampa.ContentRows.call('surs_buttons', {}, []);  
} 
  
// Функция для получения всех внешних кнопок  
function getExternalButtons() {  
    return window.surs_external_buttons || [];  
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
                        } else if (b.icon) {  
                            // Используем внешнюю иконку  
                            card.data.icon_svg = b.icon;  
                        }  
                          
                        return card;  
                    },  
                    emit: {  
                        onCreate: function() {  
                            this.html.addClass('card--button-compact');  
                              
                            var imgElement = this.html.find('.card__img');  
                            var svgContainer = document.createElement('div');  
                            svgContainer.classList.add('card__svg-icon');  
                              
                            // Используем иконку из данных карточки или напрямую из объекта кнопки  
                            if (this.data.icon_svg) {  
                                svgContainer.innerHTML = this.data.icon_svg;  
                            } else if (b.icon) {  
                                // Прямое использование иконки для внешних кнопок  
                                svgContainer.innerHTML = b.icon;  
                            } else {  
                                // Fallback для стандартных иконок  
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
                            }  
                              
                            imgElement.replaceWith(svgContainer);  
                              
                            var buttonLabel = document.createElement('div');  
                            buttonLabel.classList.add('card__button-label');  
                            buttonLabel.innerText = Lampa.Lang.translate(b.title);  
                            this.html.find('.card__view').append(buttonLabel);  
                        },  
                        onlyEnter: function() {  
                            // Вызываем действие кнопки  
                            if (b.id && buttonActions[b.id]) {  
                                buttonActions[b.id]();  
                            } else if (b.action && typeof b.action === 'function') {  
                                b.action();  
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
      
    // Экспортируем функции для использования в других плагинах  
    window.surs_getAllButtons = getAllButtons;  
    window.surs_getCustomButtonsRow = function(partsData) {  
        addCustomButtonsRow(partsData);  
    };  
      
    // Экспортируем новые функции для работы с внешними кнопками  
    window.surs_addExternalButton = addExternalButton;  
    window.surs_removeExternalButton = removeExternalButton;  
    window.surs_clearExternalButtons = clearExternalButtons;  
    window.surs_getExternalButtons = getExternalButtons;  
      
    // Используем подход из рабочего примера  
    Lampa.ContentRows.add({  
        index: 0,  
        name: 'surs_buttons',  
        title: 'Навигационное меню',  
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
      
    // Отправляем уведомление о готовности плагина  
    Lampa.Listener.send('custom_buttons', {type: 'ready'});  
        
}

    Lampa.Lang.add({  
    surs_btns_new: {  
        ru: 'Новинки Мир',  
        uk: 'Новинки Світ',   
        en: 'New Globe'  
    },  
    surs_btns_rus: {  
        ru: 'Новинки Россия',  
        uk: 'Новинки Росія',  
        en: 'New Russia '  
    }  
})
      
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

/*
// пример добавления внешней кнопки вашего плагина в SURS Buttons  

window.surs_addExternalButton({  
    id: 'my_custom_button',  
    title: 'Моя кнопка',  
    icon: '<svg fill="#ffffff" width="64px" height="64px" viewBox="0 0 24 24">...</svg>',  
    action: function() {  
        console.log('Нажата внешняя кнопка');  
        // Ваш код здесь  
    }  
});  
  
// Удаление внешней кнопки  
window.surs_removeExternalButton('my_custom_button');  
  
// Получение всех внешних кнопок  
var externalButtons = window.surs_getExternalButtons();  
console.log(externalButtons);  
  
// Очистка всех внешних кнопок  
window.surs_clearExternalButtons();

*/
