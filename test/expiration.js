(function() {  
    'use strict';  
  
    // Локальная копия функции declOfNum  
    function declOfNum(n, text_forms) {    
        n = Math.abs(n) % 100;   
        var n1 = n % 10;  
        if (n > 10 && n < 20) { return text_forms[2]; }  
        if (n1 > 1 && n1 < 5) { return text_forms[1]; }  
        if (n1 == 1) { return text_forms[0]; }  
        return text_forms[2];  
    }  
  
    var buttonId = 'surs_expiration';  
    var userDataCache = null;  
    var expirationIcon = '<svg fill="#ffcc00" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';  
  
    // Проверка платформы alcopac  
    function isAlcopacPlatform() {  
        return new Promise(function(resolve) {  
            var host = Lampa.Storage.get('lampac_host', '').trim() || window.location.origin || '';  
            if (host && !host.endsWith('/')) host += '/';  
              
            Lampa.Network.silent(host + 'api/user/info', function(data) {  
                if (data && data.platform === 'alcopac') {  
                    resolve(true);  
                } else {  
                    resolve(!!window.alcopac);  
                }  
            }, function() {  
                resolve(!!window.alcopac);  
            });  
        });  
    }  
  
    // Запрос данных через Lampa.Network  
    function fetchUserInfo(callback) {  
        var host = Lampa.Storage.get('lampac_host', '').trim() || window.location.origin || '';  
        if (host && !host.endsWith('/')) host += '/';  
  
        var uid = Lampa.Storage.get('lampac_unic_id', '');  
        var url = host + 'api/user/info' + (uid ? '?uid=' + encodeURIComponent(uid) : '');  
  
        Lampa.Network.silent(url, function(data) {  
            callback(data);  
        }, function(error) {  
            console.warn('SURS Expiration Plugin: запрос упал:', error);  
            callback(userDataCache || null);  
        });  
    }  
  
    // Обновление кнопки  
    function updateExpirationButton(data) {  
        if (!data || !data.authorized || data.days_left > 10) {  
            if (window.surs_removeExternalButton) {  
                window.surs_removeExternalButton(buttonId);  
            }  
            return;  
        }  
  
        userDataCache = data;  
        var daysText = declOfNum(data.days_left, ['день', 'дня', 'дней']); // Используем локальную функцию  
        var title = data.days_left === 0 ? '❌ Подписка истекла!' : `⏳ Осталось ${data.days_left} ${daysText}`;  
  
        if (window.surs_removeExternalButton) {  
            window.surs_removeExternalButton(buttonId);  
        }  
          
        if (window.surs_addExternalButton) {  
            window.surs_addExternalButton({  
                id: buttonId,  
                title: title,  
                icon: expirationIcon,  
                action: showModal  
            });  
        }  
    }  
  
    // Показ модального окна  
    function showModal() {  
        if (!userDataCache) {  
            Lampa.Noty.show('Нет данных о подписке');  
            return;  
        }  
  
        var expiresFormatted = userDataCache.expires_at   
            ? new Date(userDataCache.expires_at).toLocaleString('ru-RU', {  
                year: 'numeric', month: 'long', day: 'numeric',  
                hour: '2-digit', minute: '2-digit'  
              })  
            : '—';  
  
        var daysText = declOfNum(userDataCache.days_left, ['день', 'дня', 'дней']); // Используем локальную функцию  
  
        var html = $('<div style="padding: 1.8em; color: #fff; font-size: 1.05em; line-height: 1.5;">' +  
            '<h3 style="text-align: center; color: #ffcc00; margin-bottom: 1.2em;">📅 Информация о подписке Alcopac</h3>' +  
            '<p><strong>Пользователь:</strong> ' + (userDataCache.tg_username ? '@' + userDataCache.tg_username : 'promo / device') + '</p>' +  
            '<p><strong>Осталось дней:</strong> ' +  
            '<span style="font-size: 1.6em; font-weight: bold; color: ' + (userDataCache.days_left <= 3 ? '#ff4444' : '#ffcc00') + '">' +  
            userDataCache.days_left + ' ' + daysText + '</span></p>' +  
            '<p><strong>Истекает:</strong> ' + expiresFormatted + '</p>' +  
            '<p><strong>Платформа:</strong> ' + userDataCache.platform + '</p>' +  
            '<p><strong>Версия:</strong> ' + userDataCache.version + '</p>' +  
            (userDataCache.days_left === 0 ? '<p style="color:#ff4444; font-weight: bold; text-align: center;">Подписка истекла! Продлите доступ.</p>' : '') +  
            '</div>');  
  
        Lampa.Modal.open({  
            title: userDataCache.days_left === 0 ? '❌ Подписка истекла!' : `⏳ Осталось ${userDataCache.days_left} ${daysText}`,  
            html: html,  
            buttons: [{   
                name: 'Закрыть',   
                onSelect: function() {   
                    Lampa.Modal.close();   
                }   
            }],  
            onBack: function() {  
                Lampa.Modal.close();  
                Lampa.Controller.toggle('content');  
            }  
        });  
  
        // Обновляем данные в фоне  
        fetchUserInfo(function(freshData) {  
            if (freshData && freshData.days_left !== userDataCache.days_left) {  
                userDataCache = freshData;  
                updateExpirationButton(freshData);  
            }  
        });  
    }  
  
    // Запуск плагина  
    function startPlugin() {  
        isAlcopacPlatform().then(function(isAlcopac) {  
            if (isAlcopac) {  
                fetchUserInfo(updateExpirationButton);  
            }  
        });  
    }  
  
    // Инициализация  
    if (window.appready) {  
        startPlugin();  
    } else {  
        Lampa.Listener.follow('app', function(e) {  
            if (e.type === 'ready') startPlugin();  
        });  
    }  
  
    Lampa.Listener.follow('custom_buttons', function(e) {  
        if (e.type === 'ready') fetchUserInfo(updateExpirationButton);  
    });  
  
})();