(function() {
    'use strict';

    console.log('🚀 SURS Expiration Button Plugin: инициализация...');

    var buttonId = 'surs_expiration';
    var userDataCache = null;
    var expirationIcon = '<svg fill="#ffcc00" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>'; // жёлтый warning-иконка (часы/внимание)

    // ====================== ПОЛУЧЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ ======================
    function fetchUserInfo(callback) {
        if (!window.alcopac) {
            console.log('SURS Expiration Plugin: это НЕ alcopac (window.alcopac отсутствует), пропускаем');
            if (callback) callback(null);
            return;
        }

        console.log('SURS Expiration Plugin: запрос /api/user/info...');

        var uid = Lampa.Storage.get('lampac_unic_id', '');
        var url = '/api/user/info';
        if (uid) {
            url += '?uid=' + encodeURIComponent(uid);
        }

        fetch(url)
            .then(r => r.json())
            .then(data => {
                console.log('SURS Expiration Plugin: ответ от API:', data);

                if (data.platform !== 'alcopac') {
                    console.log('SURS Expiration Plugin: платформа не alcopac');
                    if (callback) callback(null);
                    return;
                }

                if (!data.authorized || typeof data.days_left !== 'number') {
                    console.log('SURS Expiration Plugin: пользователь НЕ авторизован или токен истёк');
                    if (callback) callback(null);
                    return;
                }

                console.log(`SURS Expiration Plugin: авторизован, дней осталось: ${data.days_left}`);
                if (callback) callback(data);
            })
            .catch(err => {
                console.error('SURS Expiration Plugin: ОШИБКА fetch:', err);
                if (callback) callback(null);
            });
    }

    // ====================== ДОБАВЛЕНИЕ / УДАЛЕНИЕ КНОПКИ ======================
    function updateExpirationButton(data) {
        if (!data || data.days_left > 10) {
            console.log(`SURS Expiration Plugin: дней > 10 (${data ? data.days_left : '—'}), кнопка НЕ нужна`);
            if (window.surs_removeExternalButton) {
                window.surs_removeExternalButton(buttonId);
            }
            return;
        }

        userDataCache = data;

        var title = data.days_left === 0 
            ? '❌ Подписка истекла!' 
            : `⏳ Осталось ${data.days_left} дней`;

        console.log(`SURS Expiration Plugin: добавляем кнопку "${title}"`);

        if (typeof window.surs_removeExternalButton === 'function') {
            window.surs_removeExternalButton(buttonId); // обновляем, если уже была
        }

        if (typeof window.surs_addExternalButton === 'function') {
            window.surs_addExternalButton({
                id: buttonId,
                title: title,
                icon: expirationIcon,
                action: function() {
                    console.log('SURS Expiration Plugin: кнопка нажата → открываем модальное окно');
                    showModal();
                }
            });
        } else {
            console.warn('⚠️ SURS Expiration Plugin: window.surs_addExternalButton НЕ НАЙДЕН! Установите сначала плагин "Кнопки SURS"');
        }
    }

    // ====================== МОДАЛЬНОЕ ОКНО ======================
    function showModal() {
        // Всегда делаем свежий запрос при нажатии (данные могут измениться)
        fetchUserInfo(function(freshData) {
            if (!freshData) {
                Lampa.Noty.show('Не удалось получить данные о подписке');
                return;
            }

            userDataCache = freshData;

            var expiresFormatted = freshData.expires_at 
                ? new Date(freshData.expires_at).toLocaleString('ru-RU', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })
                : '—';

            var html = `
                <div style="padding: 1.8em; color: #fff; font-size: 1.05em;">
                    <h3 style="text-align: center; color: #ffcc00; margin-bottom: 1.2em;">📅 Информация о подписке Alcopac</h3>
                    
                    <p><strong>Пользователь:</strong> ${freshData.tg_username ? '@' + freshData.tg_username : 'promo / device-токен'}</p>
                    <p><strong>Осталось дней:</strong> 
                        <span style="font-size: 1.5em; font-weight: bold; color: ${freshData.days_left <= 3 ? '#ff4444' : '#ffcc00'};">
                            ${freshData.days_left}
                        </span>
                    </p>
                    <p><strong>Истекает:</strong> ${expiresFormatted}</p>
                    <p><strong>Платформа:</strong> ${freshData.platform}</p>
                    <p><strong>Версия сервера:</strong> ${freshData.version}</p>
                    
                    ${freshData.days_left === 0 
                        ? '<p style="color:#ff4444; font-weight: bold; text-align: center; margin-top: 1em;">⚠️ Подписка истекла!<br>Продлите доступ в личном кабинете.</p>' 
                        : ''}
                </div>
            `;

            console.log('SURS Expiration Plugin: открываем модальное окно с данными');

            Lampa.Modal.open({
                title: freshData.days_left === 0 ? '❌ Подписка истекла!' : `⏳ Осталось ${freshData.days_left} дней`,
                html: html,
                buttons: [{
                    name: 'Закрыть',
                    onSelect: function() {
                        Lampa.Modal.close();
                    }
                }]
            });
        });
    }

    // ====================== ЗАПУСК ПЛАГИНА ======================
    function startPlugin() {
        console.log('✅ SURS Expiration Plugin: запущен');

        fetchUserInfo(function(data) {
            updateExpirationButton(data);
        });
    }

    // ====================== ОЖИДАНИЕ ГОТОВНОСТИ ======================
    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type === 'ready') startPlugin();
        });
    }

    // Если плагин кнопок загрузится позже — тоже запустим
    Lampa.Listener.follow('custom_buttons', function(e) {
        if (e.type === 'ready') {
            console.log('SURS Expiration Plugin: плагин кнопок готов → обновляем кнопку');
            fetchUserInfo(function(data) {
                updateExpirationButton(data);
            });
        }
    });

    console.log('SURS Expiration Button Plugin: загружен и ожидает ready');
})();