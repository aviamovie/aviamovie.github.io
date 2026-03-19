(function() {  
    'use strict';  
      
    // Проверяем, что это (alcopac)  
    function checkPlatform() {  
        return window.alcopac || (window.location.origin && window.location.origin.includes('alcopac'));  
    }  
      
    // Получение информации о пользователе  
    function getUserInfo() {  
        var host = window.location.origin || Lampa.Storage.get('lampac_host', '');  
        var uid = Lampa.Storage.get('lampac_unic_id', '');  
          
        // Сначала пробуем по cookie  
        return fetch(host + '/api/user/info')  
            .then(r => r.json())  
            .catch(() => {  
                // Если не получилось, пробуем по uid  
                if (uid) {  
                    return fetch(host + '/api/user/info?uid=' + uid)  
                        .then(r => r.json());  
                }  
                throw new Error('No auth method available');  
            });  
    }  
      
    // Показ модального окна с информацией  
    function showExpirationModal(userInfo) {  
        var html = $(`  
            <div class="subscription-expire-modal">  
                <div class="subscription-expire__icon">  
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="#ff9800">  
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>  
                    </svg>  
                </div>  
                <div class="subscription-expire__title">  
                    ${Lampa.Lang.translate('subscription_expire_title') || 'Внимание! Подписка истекает скоро'}  
                </div>  
                <div class="subscription-expire__info">  
                    <div class="info-row">  
                        <span class="info-label">Пользователь:</span>  
                        <span class="info-value">${userInfo.tg_username || 'Unknown'}</span>  
                    </div>  
                    <div class="info-row">  
                        <span class="info-label">Дней осталось:</span>  
                        <span class="info-value">${userInfo.days_left}</span>  
                    </div>  
                    <div class="info-row">  
                        <span class="info-label">Истекает:</span>  
                        <span class="info-value">${new Date(userInfo.expires_at).toLocaleDateString()}</span>  
                    </div>  
                </div>  
                <div class="subscription-expire__message">  
                    <p>🍺 Не забудь угостить Павлуху Пивом за отличный сервис!</p>  
                </div>  
            </div>  
        `);  
          
        var enabled = Lampa.Controller.enabled().name;  
          
        Lampa.Modal.open({  
            title: '',  
            html: html,  
            size: 'medium',  
            onBack: () => {  
                Lampa.Modal.close();  
                Lampa.Controller.toggle(enabled);  
            }  
        });  
    }  
      
    // Добавление кнопки в SURS  
    function addExpirationButton(daysLeft, userInfo) {  
        // Ждем пока SURS Buttons загрузится  
        var waitForSurs = setInterval(() => {  
            if (window.surs_addExternalButton) {  
                clearInterval(waitForSurs);  
                  
                window.surs_addExternalButton({  
                    id: 'subscription_expire',  
                    title: 'subscription_expire_button',  
                    icon: '<svg width="64" height="64" viewBox="0 0 24 24" fill="#ff9800"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',  
                    action: () => {  
                        showExpirationModal(userInfo);  
                    }  
                });  
            }  
        }, 100);  
          
        // Очистка через 10 секунд на случай если SURS не загрузится  
        setTimeout(() => clearInterval(waitForSurs), 10000);  
    }  
      
    // Основная функция проверки и инициализации  
    function checkSubscription() {  
        if (!checkPlatform()) return;  
          
        getUserInfo()  
            .then(data => {  
                if (data.platform === 'alcopac' && data.authorized && data.days_left <= 10) {  
                    addExpirationButton(data.days_left, data);  
                }  
            })  
            .catch(err => {  
                console.log('Subscription plugin: Error getting user info', err);  
            });  
    }  
      
    // Добавление переводов  
    Lampa.Lang.add({  
        subscription_expire_title: {  
            ru: 'Внимание! Подписка истекает скоро',  
            uk: 'Увага! Підписка закінчується скоро',  
            en: 'Warning! Subscription expires soon'  
        },  
        subscription_expire_button: {  
            ru: 'Осталось ' + (typeof daysLeft !== 'undefined' ? daysLeft : 'N') + ' дней',  
            uk: 'Залишилось ' + (typeof daysLeft !== 'undefined' ? daysLeft : 'N') + ' днів',  
            en: (typeof daysLeft !== 'undefined' ? daysLeft : 'N') + ' days left'  
        }  
    });  
      
    // Добавление стилей  
    Lampa.Template.add('subscription_expire_style', `  
        <style>  
            .subscription-expire-modal {  
                text-align: center;  
                padding: 2em;  
            }  
            .subscription-expire__icon {  
                margin-bottom: 1em;  
            }  
            .subscription-expire__title {  
                font-size: 1.5em;  
                font-weight: bold;  
                color: #ff9800;  
                margin-bottom: 1.5em;  
            }  
            .subscription-expire__info {  
                background: rgba(0,0,0,0.3);  
                border-radius: 0.5em;  
                padding: 1em;  
                margin-bottom: 1.5em;  
            }  
            .info-row {  
                display: flex;  
                justify-content: space-between;  
                margin: 0.5em 0;  
            }  
            .info-label {  
                color: #ccc;  
            }  
            .info-value {  
                color: #fff;  
                font-weight: bold;  
            }  
            .subscription-expire__message {  
                font-size: 1.1em;  
                color: #fff;  
                background: rgba(255, 152, 0, 0.2);  
                border-radius: 0.5em;  
                padding: 1em;  
                border: 1px solid #ff9800;  
            }  
        </style>  
    `);  
    $('body').append(Lampa.Template.get('subscription_expire_style', {}, true));  
      
    // Запуск плагина  
    if (window.appready) {  
        checkSubscription();  
    } else {  
        Lampa.Listener.follow('app', function(e) {  
            if (e.type === 'ready') checkSubscription();  
        });  
    }  
})();