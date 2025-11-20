(function () {
    'use strict';

    // ---------- Polyfill ----------
    if (typeof AbortController === 'undefined') {
        window.AbortController = function () {
            this.signal = {
                aborted: false,
                addEventListener: function (event, callback) {
                    if (event === 'abort') this._onabort = callback;
                }
            };
            this.abort = function () {
                this.signal.aborted = true;
                if (typeof this.signal._onabort === 'function') this.signal._onabort();
            };
        };
    }

    if (!window.performance || !window.performance.now) {
        window.performance = window.performance || {};
        window.performance.now = function () { return Date.now(); };
    }

    if (!String.prototype.padStart) {
        String.prototype.padStart = function (targetLength, padString) {
            targetLength = targetLength >> 0;
            padString = String(padString || ' ');
            if (this.length >= targetLength) return String(this);
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(Math.ceil(targetLength / padString.length));
            }
            return padString.slice(0, targetLength) + String(this);
        };
    }

    // ---------- Настройки ----------
    var ENABLE_LOGGING = true;
    var Q_CACHE_TIME = 72 * 60 * 60 * 1000;
    var QUALITY_CACHE = 'surs_quality_cache';
    var JACRED_PROTOCOL = 'https://';
    var JACRED_URL = Lampa.Storage.get('jacred.xyz') || 'jacred.xyz';
    var PROXY_LIST = [
        'http://api.allorigins.win/raw?url=',
        'http://cors.bwa.workers.dev/'
    ];
    var PROXY_TIMEOUT = 5000;

    // ---------- Логи ----------
    var SURS_QUALITY = {
        log: function (msg) {
            if (ENABLE_LOGGING && console && console.log) {
                console.log('[SURS_QUALITY] ', msg);
            }
        }
    };

    function formatTime() {
        var d = new Date();
        return d.getHours().toString().padStart(2, '0') + ':' +
               d.getMinutes().toString().padStart(2, '0') + ':' +
               d.getSeconds().toString().padStart(2, '0');
    }

    function logExecution(fn, start, info) {
        var elapsed = (performance.now() - start).toFixed(2);
        SURS_QUALITY.log(fn + ' время: ' + formatTime() + ' (' + elapsed + 'мс)' + (info ? ' | ' + info : ''));
    }

    // ---------- СТИЛИ (стандартный Lampa, только синий текст) ----------
    var style = document.createElement('style');
    style.textContent = [
        '.full-start__status.surs_quality.camrip { color: red !important; }',
        '.full-start__status.surs_no-digital { color: #0066ff !important; }'
    ].join('\n');
    document.head.appendChild(style);

    // ---------- Прокси ----------
    function fetchWithProxy(url, cardId, callback) {
        var start = performance.now();
        var idx = 0;
        var called = false;
        var controller = new AbortController();

        function next() {
            if (idx >= PROXY_LIST.length) {
                if (!called) { called = true; callback(new Error('Прокси исчерпаны')); }
                return;
            }
            var proxyUrl = PROXY_LIST[idx++] + encodeURIComponent(url);
            var tid = setTimeout(function () { controller.abort(); }, PROXY_TIMEOUT);

            fetch(proxyUrl, { signal: controller.signal })
                .then(function (r) { clearTimeout(tid); if (!r.ok) throw 1; return r.text(); })
                .then(function (d) {
                    if (!called) { called = true; callback(null, d); }
                })
                .catch(function () { clearTimeout(tid); next(); });
        }

        var directTid = setTimeout(function () { controller.abort(); next(); }, PROXY_TIMEOUT);
        fetch(url, { signal: controller.signal })
            .then(function (r) { clearTimeout(directTid); if (!r.ok) throw 1; return r.text(); })
            .then(function (d) {
                if (!called) { called = true; callback(null, d); }
            })
            .catch(function () { clearTimeout(directTid); next(); });
    }

    // ---------- JacRed ----------
    function getBestReleaseFromJacred(normalizedCard, cardId, callback) {
        var start = performance.now();
        if (!JACRED_URL) {
            SURS_QUALITY.log('card: ' + cardId + ', JacRed: URL не задан');
            callback(null);
            return;
        }

        function translateQuality(quality, isCamrip) {
            if (isCamrip) return 'Экранка';
            if (typeof quality !== 'number') return quality;
            if (quality >= 2160) return 'UHD';
            if (quality >= 1080) return 'FHD';
            if (quality >= 720) return 'HD';
            if (quality > 0) return 'SD';
            return null;
        }

        var year = (normalizedCard.release_date || '').substring(0, 4);
        if (!year || isNaN(year)) {
            SURS_QUALITY.log('card: ' + cardId + ', JacRed: нет года');
            callback(null);
            return;
        }

        function searchJacredApi(searchTitle, searchYear, exactMatch, strategyName, apiCallback) {
            var apiUrl = JACRED_PROTOCOL + JACRED_URL + '/api/v1.0/torrents?search=' +
                encodeURIComponent(searchTitle) + '&year=' + searchYear + (exactMatch ? '&exact=true' : '');

            fetchWithProxy(apiUrl, cardId, function (err, text) {
                if (err || !text) return apiCallback(null);
                try {
                    var torrents = JSON.parse(text);
                    if (!Array.isArray(torrents) || torrents.length === 0) return apiCallback(null);

                    var bestNumericQuality = -1;
                    var bestFoundTorrent = null;
                    var camripFound = false;
                    var camripQuality = -1;

                    // 1. Ищем обычные релизы (не экранки)
                    for (var i = 0; i < torrents.length; i++) {
                        var t = torrents[i];
                        var q = t.quality;
                        var lowerTitle = (t.title || '').toLowerCase();

                        if (/\b(ts|telesync|telecine|camrip|cam|тс|тс|звук с TS|TC|ТС)\b/i.test(lowerTitle)) continue;

                        if (typeof q === 'number' && q > bestNumericQuality) {
                            bestNumericQuality = q;
                            bestFoundTorrent = t;
                        }
                    }

                    // 2. Если обычных нет — ищем экранки ≥720p
                    if (!bestFoundTorrent) {
                        for (var i = 0; i < torrents.length; i++) {
                            var t = torrents[i];
                            var q = t.quality;
                            var lowerTitle = (t.title || '').toLowerCase();

                            if (/\b(ts|telesync|telecine|camrip|cam|тс|тс|звук с TS|TC|ТС)\b/i.test(lowerTitle)) {
                                if (typeof q === 'number' && q >= 720 && q > camripQuality) {
                                    camripQuality = q;
                                    bestFoundTorrent = t;
                                    camripFound = true;
                                }
                            }
                        }
                    }

                    if (bestFoundTorrent) {
                        apiCallback({
                            quality: translateQuality(bestFoundTorrent.quality || bestNumericQuality, camripFound),
                            title: bestFoundTorrent.title,
                            isCamrip: camripFound
                        });
                    } else {
                        apiCallback(null);
                    }
                } catch (e) {
                    apiCallback(null);
                }
            });
        }

        var searchStrategies = [];
        if (normalizedCard.original_title && /[a-zа-яё0-9]/i.test(normalizedCard.original_title)) {
            searchStrategies.push({ title: normalizedCard.original_title.trim(), exact: true, name: 'Original Exact' });
        }
        if (normalizedCard.title && /[a-zа-яё0-9]/i.test(normalizedCard.title)) {
            searchStrategies.push({ title: normalizedCard.title.trim(), exact: true, name: 'Title Exact' });
        }

        function executeNext(index) {
            if (index >= searchStrategies.length) {
                callback(null);
                return;
            }
            var s = searchStrategies[index];
            searchJacredApi(s.title, year, s.exact, s.name, function (res) {
                if (res) callback(res);
                else executeNext(index + 1);
            });
        }

        if (searchStrategies.length) executeNext(0);
        else callback(null);
    }

    // ---------- Кэш ----------
    function getQualityCache(key) {
        var cache = Lampa.Storage.get(QUALITY_CACHE) || {};
        var item = cache[key];
        return item && (Date.now() - item.timestamp < Q_CACHE_TIME) ? item : null;
    }

    function saveQualityCache(key, data, cardId) {
        var cache = Lampa.Storage.get(QUALITY_CACHE) || {};
        for (var k in cache) {
            if (Date.now() - cache[k].timestamp >= Q_CACHE_TIME) delete cache[k];
        }
        cache[key] = {
            quality: data.quality || null,
            isCamrip: data.isCamrip || false,
            noDigital: data.noDigital || false,
            timestamp: Date.now()
        };
        Lampa.Storage.set(QUALITY_CACHE, cache);
    }

    // ---------- Элементы ----------
    function clearQualityElements(render) {
        $('.full-start__status.surs_quality', render).remove();
        $('.full-start__status.surs_no-digital', render).remove();
    }

    function showQualityPlaceholder(render) {
        if (!$('.full-start__status.surs_quality', render).length) {
            var ph = document.createElement('div');
            ph.className = 'full-start__status surs_quality';
            ph.textContent = '...';
            ph.style.opacity = '0.7';
            $('.full-start-new__rate-line', render).append(ph);
        }
    }

    function showNoDigitalBadge(render) {
        if ($('.full-start__status.surs_no-digital', render).length) return;
        var badge = document.createElement('div');
        badge.className = 'full-start__status surs_no-digital';
        badge.textContent = 'Отсутствует релиз';
        $('.full-start-new__rate-line', render).append(badge);
    }

    function updateQualityElement(quality, isCamrip, render) {
        var $el = $('.full-start__status.surs_quality', render);
        if ($el.length) {
            $el.text(quality).css('opacity', 1);
            if (isCamrip) $el.addClass('camrip'); else $el.removeClass('camrip');
        } else {
            var div = document.createElement('div');
            div.className = 'full-start__status surs_quality';
            if (isCamrip) div.className += ' camrip';
            div.textContent = quality;
            $('.full-start-new__rate-line', render).append(div);
        }
    }

    // ---------- Последовательный запрос ----------
    function fetchQualitySequentially(normalizedCard, cardId, cacheKey, render) {
        getBestReleaseFromJacred(normalizedCard, cardId, function (jr) {
            if (jr && jr.quality) {
                saveQualityCache(cacheKey, { quality: jr.quality, isCamrip: jr.isCamrip, noDigital: false }, cardId);
                clearQualityElements(render);
                updateQualityElement(jr.quality, jr.isCamrip, render);
            } else {
                saveQualityCache(cacheKey, { quality: null, isCamrip: false, noDigital: true }, cardId);
                clearQualityElements(render);
                showNoDigitalBadge(render);
            }
        });
    }

    // ---------- Тип карточки ----------
    function getCardType(card) {
        var t = card.media_type || card.type;
        if (t === 'movie' || t === 'tv') return t;
        return card.name || card.original_name ? 'tv' : 'movie';
    }

    // ---------- Основная функция ----------
    function fetchQualityForCard(card, render) {
        if (!render) return;
        var id = card.id;

        var normalized = {
            id: card.id,
            title: card.title || card.name || '',
            original_title: card.original_title || card.original_name || '',
            type: getCardType(card),
            release_date: card.release_date || card.first_air_date || ''
        };

        if (normalized.type === 'tv') {
            clearQualityElements(render);
            return;
        }

        var $line = $('.full-start-new__rate-line', render);
        if ($line.length) $line.css('visibility', 'hidden');

        var cacheKey = normalized.type + '_' + (normalized.id || card.imdb_id);
        var cached = getQualityCache(cacheKey);

        clearQualityElements(render);

        if (cached) {
            if (cached.quality) updateQualityElement(cached.quality, cached.isCamrip, render);
            else if (cached.noDigital) showNoDigitalBadge(render);
        } else {
            showQualityPlaceholder(render);
            fetchQualitySequentially(normalized, id, cacheKey, render);
        }

        if ($line.length) $line.css('visibility', 'visible');
    }

    // ---------- Запуск ----------
    function startPlugin() {
        SURS_QUALITY.log('Плагин качества запущен');
        window.sursQualityPlugin = true;

        Lampa.Listener.follow('full', function (e) {
            if (e.type === 'complite') {
                var render = e.object.activity.render();
                fetchQualityForCard(e.data.movie, render);
            }
        });
    }

    if (!window.sursQualityPlugin) startPlugin();
})();