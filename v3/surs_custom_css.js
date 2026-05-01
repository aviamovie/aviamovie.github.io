(function() {  
    'use strict';  
      
    // Защита от повторной загрузки  
    if (window.surs_custom_css_loaded) {  
        return;  
    }  
    window.surs_custom_css_loaded = true;  
      
    function addCustomStyles() {  
        Lampa.Template.add('surs_custom_css', `  
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
             
                    .items-line {  
                        padding-bottom: 0.3em !important;  
                    }  
                    
                    .card__svg-icon {  
                        position: absolute;  
                        top: 37%;  
                        left: 50%;  
                        transform: translate(-50%, -50%);  
                        width: 40% !important;  
                        height: 40% !important;  
                        display: flex;  
                        align-items: center;  
                        justify-content: center;  
                    }  
                    .card__button-label {  
                        position: absolute;  
                        bottom: 0.2em;  
                        left: 0;  
                        right: 0;  
                        text-align: center;  
                        color: #fff;  
                        padding: 0.4em;  
                        font-size: 0.4em; /* Уменьшено с 0.5em */  
                        font-weight: 300;  
                        z-index: 1;  
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
                }  
                .card__svg-icon svg[fill="none"],  
                .card__svg-icon svg[fill="transparent"] {  
                    fill: transparent !important;  
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
        $('body').append(Lampa.Template.get('surs_custom_css', {}, true));  
    }  
      
    // Инициализация  
    if (Lampa.Manifest.app_digital >= 300) {  
        if (window.appready) {  
            addCustomStyles();  
        } else {  
            Lampa.Listener.follow('app', function(e) {  
                if (e.type === 'ready') addCustomStyles();  
            });  
        }  
    }  
})();