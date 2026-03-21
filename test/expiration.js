(function() {
    'use strict';

    console.log('🚀 SURS Expiration Button Plugin v4: инициализация...');

    var buttonId = 'surs_expiration';
    var userDataCache = null;
    var expirationIcon = '<svg fill="#ffcc00" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';

    // ====================== ЗАПРОС ЧЕРЕЗ $.ajax (надёжно в Lampa) ======================
    function fetchUserInfo(callback) {
        if (window.alcopac) return callback(null);

        var host = Lampa.Storage.get('lampac_host', '').trim() || window.location.origin || '';
        if (host && !host.endsWith('/')) host += '/';

        var uid = Lampa.Storage.get('lampac_unic_id', '');
        var url = host + 'api/user/info' + (uid ? '?uid=' + encodeURIComponent(uid) : '');

        console.log('SURS Expiration Plugin: запрос $.ajax → ' + url);

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            timeout: 5000,
            success: function(data) {
                console.log('SURS Expiration Plugin: УСПЕХ $.ajax:', data);
                callback(data);
            },
            error: function(xhr, status, err) {
                console.warn('SURS Expiration Plugin: $.ajax упал:', status, err);
                if (userDataCache) {
                    console.log('SURS Expiration Plugin: используем кэш');
                    callback(userDataCache);
                } else {
                    callback(null);
                }
            }
        });
    }

    // ====================== ОБНОВЛЕНИЕ КНОПКИ ======================
    function updateExpirationButton(data) {
        if (!data || data.days_left > 10) {
            if (window.surs_removeExternalButton) window.surs_removeExternalButton(buttonId);
            return;
        }

        userDataCache = data;

        var title = data.days_left === 0 ? '❌ Подписка истекла!' : `⏳ Осталось ${data.days_left} дней`;

        if (window.surs_removeExternalButton) window.surs_removeExternalButton(buttonId);
        if (window.surs_addExternalButton) {
            window.surs_addExternalButton({
                id: buttonId,
                title: title,
                icon: expirationIcon,
                action: showModal
            });
            console.log(`✅ Кнопка обновлена: "${title}"`);
        }
    }

    // ====================== МОДАЛКА (МГНОВЕННО ИЗ КЭША) ======================
    function showModal() {
        console.log('SURS Expiration Plugin: кнопка нажата → открываем модалку');

        // Сначала показываем из кэша МГНОВЕННО
        if (userDataCache) {
            openModalWithData(userDataCache, true);
        } else {
            Lampa.Noty.show('Нет данных о подписке');
            return;
        }

        // В фоне обновляем данные
        fetchUserInfo(function(freshData) {
            if (freshData && freshData.days_left !== userDataCache.days_left) {
                userDataCache = freshData;
                updateExpirationButton(freshData); // обновим и кнопку
                console.log('SURS Expiration Plugin: данные обновлены в фоне');
            }
        });
    }

    function openModalWithData(data, isCached) {
        try {
            var expiresFormatted = data.expires_at 
                ? new Date(data.expires_at).toLocaleString('ru-RU', {
                    year: 'numeric', month: 'long', day: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })
                : '—';

            var html = `
                <div style="padding: 1.8em; color: #fff; font-size: 1.05em; line-height: 1.5;">
                    <h3 style="text-align: center; color: #ffcc00; margin-bottom: 1.2em;">📅 Информация о подписке Alcopac</h3>
                    
                    <p><strong>Пользователь:</strong> ${data.tg_username ? '@' + data.tg_username : 'promo / device'}</p>
                    <p><strong>Осталось дней:</strong> 
                        <span style="font-size: 1.6em; font-weight: bold; color: ${data.days_left <= 3 ? '#ff4444' : '#ffcc00'}">
                            ${data.days_left}
                        </span>
                    </p>
                    <p><strong>Истекает:</strong> ${expiresFormatted}</p>
                    <p><strong>Платформа:</strong> ${data.platform}</p>
                    <p><strong>Версия:</strong> ${data.version}</p>
                    
                    ${isCached ? '<p style="color:#ffaa00; font-weight: bold; text-align: center;">⚠️ Данные из кэша</p>' : ''}
                    
                    ${data.days_left === 0 ? '<p style="color:#ff4444; font-weight: bold; text-align: center;">Подписка истекла! Продлите доступ.</p>' : ''}
                </div>
            `;

            Lampa.Modal.open({
                title: data.days_left === 0 ? '❌ Подписка истекла!' : `⏳ Осталось ${data.days_left} дней`,
                html: html,
                buttons: [{ name: 'Закрыть', onSelect: () => Lampa.Modal.close() }]
            });

            console.log('✅ Модальное окно открыто успешно');
        } catch (e) {
            console.error('SURS Expiration Plugin: ОШИБКА при открытии модалки:', e);
            Lampa.Noty.show('Ошибка открытия окна: ' + e.message);
        }
    }

    // ====================== ЗАПУСК ======================
    function startPlugin() {
        console.log('✅ SURS Expiration Plugin v4: запущен');
        fetchUserInfo(updateExpirationButton);
    }

    if (window.appready) {
        startPlugin();
    } else {
        Lampa.Listener.follow('app', e => e.type === 'ready' && startPlugin());
    }

    Lampa.Listener.follow('custom_buttons', e => {
        if (e.type === 'ready') fetchUserInfo(updateExpirationButton);
    });

})();