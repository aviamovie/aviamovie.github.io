(function() {
    'use strict';

    console.log('🚀 SURS Expiration Button Plugin v3: инициализация...');

    var buttonId = 'surs_expiration';
    var userDataCache = null;
    var expirationIcon = '<svg fill="#ffcc00" width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';

    // ====================== УЛУЧШЕННОЕ ПОЛУЧЕНИЕ ИНФО ======================
    function fetchUserInfo(callback, retry = 0) {
        if (window.alcopac) {
            console.log('SURS Expiration Plugin: НЕ alcopac');
            return callback(null);
        }

        // ПРИОРИТЕТ ИСПРАВЛЕН: сначала lampac_host (самое надёжное)
        var lampacHost = Lampa.Storage.get('lampac_host', '').trim();
        var locationHost = window.location.origin || '';
        var host = lampacHost || locationHost;

        if (host && !host.endsWith('/')) host += '/';

        var uid = Lampa.Storage.get('lampac_unic_id', '');
        var url = (host || '') + 'api/user/info';
        if (uid) url += '?uid=' + encodeURIComponent(uid);

        console.log(`SURS Expiration Plugin: запрос (попытка ${retry+1}) → ${url}`);

        fetch(url, { credentials: 'include' })
            .then(r => {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.json();
            })
            .then(data => {
                console.log('SURS Expiration Plugin: УСПЕШНЫЙ ответ:', data);
                callback(data);
            })
            .catch(err => {
                console.warn(`SURS Expiration Plugin: fetch не прошёл (попытка ${retry+1}):`, err.message || err);

                if (retry === 0) {
                    console.log('SURS Expiration Plugin: делаем повторную попытку...');
                    setTimeout(() => fetchUserInfo(callback, 1), 800); // retry через 800ms
                    return;
                }

                // Последняя попытка не удалась — используем кэш без ошибки
                if (userDataCache) {
                    console.warn('SURS Expiration Plugin: используем кэш (fetch полностью упал)');
                    callback(userDataCache);
                } else {
                    callback(null);
                }
            });
    }

    // ====================== КНОПКА ======================
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

    // ====================== МОДАЛЬНОЕ ОКНО ======================
    function showModal() {
        console.log('SURS Expiration Plugin: кнопка нажата → модалка');

        fetchUserInfo(function(freshData) {
            var dataToShow = freshData || userDataCache;

            if (!dataToShow) {
                Lampa.Noty.show('Не удалось получить данные о подписке');
                return;
            }

            var expiresFormatted = dataToShow.expires_at 
                ? new Date(dataToShow.expires_at).toLocaleString('ru-RU', { 
                    year: 'numeric', month: 'long', day: 'numeric', 
                    hour: '2-digit', minute: '2-digit' 
                  })
                : '—';

            var isCached = !freshData;

            var html = `
                <div style="padding: 1.8em; color: #fff; font-size: 1.05em; line-height: 1.5;">
                    <h3 style="text-align: center; color: #ffcc00; margin-bottom: 1.2em;">📅 Информация о подписке Alcopac</h3>
                    
                    <p><strong>Пользователь:</strong> ${dataToShow.tg_username ? '@' + dataToShow.tg_username : 'promo / device'}</p>
                    <p><strong>Осталось дней:</strong> 
                        <span style="font-size: 1.6em; font-weight: bold; color: ${dataToShow.days_left <= 3 ? '#ff4444' : '#ffcc00'}">
                            ${dataToShow.days_left}
                        </span>
                    </p>
                    <p><strong>Истекает:</strong> ${expiresFormatted}</p>
                    <p><strong>Платформа:</strong> ${dataToShow.platform}</p>
                    <p><strong>Версия:</strong> ${dataToShow.version}</p>
                    
                    ${isCached ? '<p style="color:#ffaa00; font-weight: bold; text-align: center;">⚠️ Данные из кэша (запрос временно недоступен)</p>' : ''}
                    
                    ${dataToShow.days_left === 0 ? '<p style="color:#ff4444; font-weight: bold; text-align: center;">Подписка истекла! Продлите доступ.</p>' : ''}
                </div>
            `;

            Lampa.Modal.open({
                title: dataToShow.days_left === 0 ? '❌ Подписка истекла!' : `⏳ Осталось ${dataToShow.days_left} дней`,
                html: html,
                buttons: [{ name: 'Закрыть', onSelect: () => Lampa.Modal.close() }]
            });
        });
    }

    // ====================== ЗАПУСК ======================
    function startPlugin() {
        console.log('✅ SURS Expiration Plugin v3: запущен');
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