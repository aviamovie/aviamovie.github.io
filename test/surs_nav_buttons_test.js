(function() {
    'use strict';

    // BANNER.height — адаптивная высота (vw обеспечивает одинаковые пропорции на любых экранах)
    var BANNER = { max: 10, rotate: 10, cache_min: 360, height: '24vw' };
    var bannerState = { timer: null, index: 0, cards: [], html: null };

    var buttonIcons = {
        surs_select: '<svg fill="#ffffff" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><path d="M31.9981689,11.9995104 C33.4659424,11.9985117 34.998291,13.1328 34.998291,16.1348 L34.998291,26 C34.998291,27.5134277 36.3779053,28.1114014 36.9779053,28.3114014 L43.8,30.8 C46.7,31.9 48.5,35 47.7,38.2 L44.5,48.5995 C44.3,49.3995 43.6,49.9995 42.7,49.9995 L26.6,49.9995 C25.8,49.9995 25.1,49.5995 24.8,48.8995 C20.9318685,39.9190553 18.7869873,34.9395752 18.3653564,33.9610596 C17.9437256,32.9825439 18.2219401,32.1955241 19.2,31.6 C21,30.3 23.7,31.6395508 24.8,33.5395508 L26.4157715,35.7431828 C27.0515137,36.9508 29,36.9508 29,35.1508 L29,16.1348 C29,13.1328 30.5303955,12.0005117 31.9981689,11.9995104 Z M46,2 C48.2,2 50,3.8 50,6 L50,21 C50,22.882323 48.1813389,25.0030348 46,25 L40.010437,25 C39,25 39,24.1881157 39,24.059082 L39,15.5 C39,11.6547018 37.0187988,8 32,8 C26.9812012,8 25,11.1879783 25,15.5 L25,24.059082 C25,24.4078007 24.7352295,25 23.987793,25 L6,25 C3.8,25 2,23.2 2,21 L2,6 C2,3.8 3.8,2 6,2 Z"></path></svg>',
        surs_new: '<svg fill="#ffffff" viewBox="0 0 31.603 31.603" xmlns="http://www.w3.org/2000/svg"><path d="M7.703,15.973c0,0,5.651-5.625,5.651-10.321C13.354,2.53,10.824,0,7.703,0S2.052,2.53,2.052,5.652 C2.052,10.614,7.703,15.973,7.703,15.973z M4.758,5.652c0-1.628,1.319-2.946,2.945-2.946s2.945,1.318,2.945,2.946 c0,1.626-1.319-2.944-2.945-2.944S4.758,7.278,4.758,5.652z"></path></svg>',
        surs_rus: '<svg fill="#ffffff" viewBox="0 0 260 166" xmlns="http://www.w3.org/2000/svg"><polygon points="243.199,112.566 235.896,102.51 227.168,100.247 223.726,106.665 218.71,106.395 217.235,85.568 223.332,72.563 228.373,69.98 223.431,56.336 226.922,47.976 230.807,50.312 238.625,65.851 242.928,68.949 258,72.66 245.928,52.033 238.675,52.77 233.659,48.344 233.683,36.961 227.856,22.331 220.406,17.831 217.456,12.299 221.586,6.57 214.407,2.096 213.079,9.152 203.589,19.134 200.368,28.871 201.622,33.937 192.918,42.984 190.509,49.598 185.001,50.065 178.043,56.213 179.149,61.277 172.757,70.006 168.134,64.99 162.848,69.367 150.112,72.047 149.907,72.438 148.416,62.924 143.646,63.269 128.598,69.857 125.328,75.882 119.059,76.397 115.789,80.21 109.789,80.799 105.954,76.102 96.684,85.691 79.646,76.725 56.386,71.48 52.477,73.423 57.05,63.785 57.02,63.678 59.853,70.62 67.205,70.448 65.262,54.836 59.632,54.393 45.814,64.792 44.634,68.629 33.865,71.063 29.046,69.39 20.465,75.242 21.817,80.947 13.9,98.182 17.539,110.624 7.95,113.598 2,114.238 2.86,125.154 10.409,138.333 12.179,145.783 18.104,135.087 21.227,134.227 26.489,135.456 26.71,124.883 32.217,122.007 46.052,124.576 59.036,138.117 66.737,131.522 86.678,135.309 91.005,143.52 96.611,142.611 104.11,156.01 114.068,157.928 121.985,163.904 132.975,158.445 147.063,160.633 149.866,151.88 158.054,153.158 162.529,156.355 172.535,154.143 180.625,154.314 187.435,147.257 196.434,145.783 198.081,141.529 198.647,128.915 206.638,125.424 216.62,131.62 224.832,129.137 228.299,131.522 233.167,123.777 236.585,128.768 239.855,141.676 244.034,140.053 246.272,134.055"></polygon></svg>',
        surs_kids: '<svg fill="#ffffff" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><path d="M213,163v-48l8.2-2.8l29.1,37.8L213,163z M176.5,55.5c0-25.8-20.9-46.7-46.7-46.7S83.1,29.7,83.1,55.5s20.9,46.7,46.7,46.7 C155.6,102.3,176.5,81.3,176.5,55.5z"></path></svg>'
    };

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
        for (var i = 0; i < Math.min(3, baseButtons.length); i++) result.push(baseButtons[i]);
        for (var j = 0; j < externalButtons.length; j++) result.push(externalButtons[j]);
        for (var k = 3; k < baseButtons.length - 1; k++) result.push(baseButtons[k]);
        result.push(baseButtons[baseButtons.length - 1]);
        return result;
    }

    var buttonActions = {
        surs_main: function() { Lampa.Activity.push({ source: Lampa.Storage.get('source'), title: Lampa.Lang.translate('title_main'), component: 'main', page: 1 }); },
        surs_bookmarks: function() { Lampa.Activity.push({ url: '', title: Lampa.Lang.translate('surs_bookmarks'), component: 'bookmarks', page: 1 }); },
        surs_history: function() { Lampa.Activity.push({ url: '', title: Lampa.Lang.translate('surs_history'), component: 'favorite', type: 'history', page: 1 }); },
        surs_select: function() { if (window.SursSelect && typeof window.SursSelect.showSursSelectMenu === 'function') window.SursSelect.showSursSelectMenu(); },
        surs_new: function() {
            var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
            Lampa.Activity.push({ source: sourceName + ' NEW', title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' NEW', component: 'main', page: 1 });
        },
        surs_rus: function() {
            var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
            Lampa.Activity.push({ source: sourceName + ' RUS', title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' RUS', component: 'main', page: 1 });
        },
        surs_kids: function() {
            var sourceName = Lampa.Storage.get('surs_name') || 'SURS';
            Lampa.Activity.push({ source: sourceName + ' KIDS', title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' KIDS', component: 'main', page: 1 });
        },
        surs_settings: function() { Lampa.Controller.toggle('settings'); }
    };

    function getAllStoredSettings() { return Lampa.Storage.get('surs_settings') || {}; }
    function saveAllStoredSettings(settings) { Lampa.Storage.set('surs_settings', settings); }
    function getProfileSettings() {
        var profileId = Lampa.Storage.get('lampac_profile_id', '') || 'default';
        var allSettings = getAllStoredSettings();
        if (!allSettings.hasOwnProperty(profileId)) { allSettings[profileId] = {}; saveAllStoredSettings(allSettings); }
        return allSettings[profileId];
    }
    function getStoredSetting(key, defaultValue) {
        var profileSettings = getProfileSettings();
        return profileSettings.hasOwnProperty(key) ? profileSettings[key] : defaultValue;
    }

    function isSerial(card) { return !!(card && (card.name || card.original_name || card.first_air_date || card.number_of_seasons)); }
    function cardTitle(card) { return (card && (card.title || card.name || card.original_title || card.original_name)) || ''; }
    function cardYear(card) { return ('' + ((card && (card.release_date || card.first_air_date)) || '')).slice(0, 4); }
    function matchPercent(card) {
        var vote = parseFloat((card && card.vote_average) || 0);
        if (!vote) return 0;
        return Math.max(35, Math.min(99, Math.round(vote * 9.9)));
    }
    function tmdbImg(path, size) {
        if (!path) return '';
        if (/^https?:/i.test(path)) return path;
        try { return Lampa.TMDB.image('t/p/' + (size || 'w1280') + path); }
        catch (e) { return 'https://image.tmdb.org/t/p/' + (size || 'w1280') + path; }
    }
    function heroImage(card) {
        if (!card) return '';
        if (card.backdrop_path) return tmdbImg(card.backdrop_path, 'w1280');
        if (card.poster_path) return tmdbImg(card.poster_path, 'w780');
        if (card.img) return card.img;
        return '';
    }
    function cut(text, limit) {
        text = ('' + (text || '')).replace(/\s+/g, ' ');
        return text.length > limit ? text.slice(0, limit - 1) + '...' : text;
    }
    function esc(text) {
        return ('' + (text || '')).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    function openCard(card) {
        if (!card || card.surs_placeholder) return;
        if (Lampa.Router && typeof Lampa.Router.call === 'function') return Lampa.Router.call('full', card);
        Lampa.Activity.push({ url: '', component: 'full', id: card.id, method: isSerial(card) ? 'tv' : 'movie', card: card, source: card.source || 'tmdb' });
    }

    function parseBannerList(json) {
        var raw = (json && json.results) || [];
        var out = [];
        for (var i = 0; i < raw.length && out.length < BANNER.max; i++) {
            var c = raw[i];
            if (!c || !cardTitle(c) || (!c.backdrop_path && !c.poster_path && !c.img)) continue;
            out.push(c);
        }
        return out;
    }
    function tmdbGet(method, ok, err) {
        try {
            if (Lampa.Api && Lampa.Api.sources && Lampa.Api.sources.tmdb && typeof Lampa.Api.sources.tmdb.get === 'function') {
                return Lampa.Api.sources.tmdb.get(method, {}, ok, err, { life: BANNER.cache_min });
            }
        } catch (e) {}
        if (err) err();
    }
    function loadBannerCards(done) {
        var methods = ['trending/all/week', 'trending/movie/week', 'movie/popular', 'movie/now_playing'];
        function next(i) {
            if (i >= methods.length) return done([]);
            tmdbGet(methods[i], function(json) {
                var list = parseBannerList(json);
                if (list.length) done(list);
                else next(i + 1);
            }, function() { next(i + 1); });
        }
        next(0);
    }
    function placeholderCard() { return { surs_placeholder: true, id: 'surs_banner_empty', title: 'Banner', name: 'Banner', overview: '' }; }
    function currentBannerCard() { return bannerState.cards.length ? bannerState.cards[bannerState.index] : null; }
    function stopBannerRotate() { if (bannerState.timer) clearInterval(bannerState.timer); bannerState.timer = null; }

    function fillBanner(html, card) {
        if (!html || !card) return;
        html.find('.surs-bb__kind').text(card.surs_placeholder ? '' : (isSerial(card) ? Lampa.Lang.translate('surs_bb_series') : Lampa.Lang.translate('surs_bb_movie')));
        html.find('.surs-bb__title').text(cardTitle(card) || 'Banner');
        html.find('.surs-bb__descr').text(cut(card.overview, 180));
        var match = matchPercent(card);
        var year = cardYear(card);
        var meta = '';
        if (match) meta += '<span class="surs-bb__match">' + match + '% ' + esc(Lampa.Lang.translate('surs_bb_match')) + '</span>';
        if (year) meta += '<span>' + year + '</span>';
        html.find('.surs-bb__meta').html(meta);
    }

    function showBannerSlide(html, i) {
        if (!html || !bannerState.cards.length) return;
        var total = bannerState.cards.length;
        bannerState.index = (i + total) % total;

        var card = bannerState.cards[bannerState.index];
        var art = heroImage(card);

        // Плавно обновляем арт и описание левой части (3/4)
        var $mainArt = html.find('.surs-bb__main-art');
        var $info = html.find('.surs-bb__info');

        $mainArt.addClass('surs-bb__main-art--changing');
        $info.addClass('surs-bb__info--changing');

        setTimeout(function() {
            $mainArt.css('background-image', art ? 'url("' + art + '")' : 'none');
            fillBanner(html, card);
            $mainArt.removeClass('surs-bb__main-art--changing');
            $info.removeClass('surs-bb__info--changing');
        }, 300);

        // Плавно сдвигаем правые 3 mini-карточки без названий
        var $cardsList = html.find('.surs-bb__cards-list');
        $cardsList.addClass('surs-bb__cards-list--animating');
        
        setTimeout(function() {
            $cardsList.empty();
            for (var offset = 1; offset <= 3; offset++) {
                var nextCard = bannerState.cards[(bannerState.index + offset) % total];
                var nextArt = heroImage(nextCard);

                var miniHtml = $(
                    '<div class="surs-bb__mini-card">' +
                        '<div class="surs-bb__mini-art" style="background-image: url(\'' + nextArt + '\')"></div>' +
                    '</div>'
                );
                $cardsList.append(miniHtml);
            }
            $cardsList.removeClass('surs-bb__cards-list--animating');
        }, 300);

        html.find('.surs-bb__dot').each(function(n) { $(this).toggleClass('surs-bb__dot--on', n === bannerState.index); });
    }

    function startBannerRotate(html) {
        stopBannerRotate();
        if (!html || bannerState.cards.length < 2) return;
        bannerState.timer = setInterval(function() {
            if (!bannerState.html) return stopBannerRotate();
            showBannerSlide(bannerState.html, bannerState.index + 1);
        }, BANNER.rotate * 1000);
    }

    function buildBannerInner() {
        return $(
            '<div class="surs-bb">' +
                '<div class="surs-bb__main">' +
                    '<div class="surs-bb__main-art"></div>' +
                    '<div class="surs-bb__scrim"></div>' +
                    '<div class="surs-bb__info">' +
                        '<div class="surs-bb__kind"></div>' +
                        '<div class="surs-bb__title"></div>' +
                        '<div class="surs-bb__meta"></div>' +
                        '<div class="surs-bb__descr"></div>' +
                    '</div>' +
                '</div>' +
                '<div class="surs-bb__sidebar">' +
                    '<div class="surs-bb__cards-list"></div>' +
                '</div>' +
                '<div class="surs-bb__dots"></div>' +
            '</div>'
        );
    }

    function applyBannerCards(html, list) {
        bannerState.cards = list && list.length ? list : [placeholderCard()];
        bannerState.html = html;
        bannerState.index = 0;
        var dots = html.find('.surs-bb__dots').empty();
        if (bannerState.cards.length > 1) {
            for (var i = 0; i < bannerState.cards.length; i++) {
                dots.append('<div class="surs-bb__dot' + (i === 0 ? ' surs-bb__dot--on' : '') + '"></div>');
            }
        }
        showBannerSlide(html, 0);
        startBannerRotate(html);
    }

    function createCard(data, type) {
        return Lampa.Maker.make(type, data, function(module) { return module.only('Card', 'Callback'); });
    }

    function bannerRowData(list) {
        var first = (list && list[0]) || placeholderCard();
        return {
            results: [{
                source: 'tmdb',
                title: cardTitle(first) || 'Banner',
                name: cardTitle(first) || 'Banner',
                id: first.id || 'surs_banner',
                backdrop_path: first.backdrop_path,
                poster_path: first.poster_path,
                overview: first.overview || '',
                params: {
                    createInstance: function() { return createCard(this, 'Card'); },
                    emit: {
                        onCreate: function() {
                            var $html = $(this.html);
                            $html.addClass('card--surs-banner');
                            var view = $html.find('.card__view');
                            view.empty();
                            var inner = buildBannerInner();
                            view.append(inner);
                            applyBannerCards(inner, list);
                        },
                        onlyEnter: function() {
                            openCard(currentBannerCard());
                        }
                    }
                }
            }],
            title: ' ',
            params: { items: { view: 1, mapping: 'line' } }
        };
    }

    function addCustomButtonsRow(partsData) {
        partsData.unshift(function(callback) {
            var enabledButtons = getAllButtons().filter(function(b) {
                return getStoredSetting('custom_button_' + b.id, true);
            }).map(function(b) {
                return {
                    source: 'custom',
                    title: Lampa.Lang.translate(b.title),
                    name: Lampa.Lang.translate(b.title),
                    id: b.id,
                    params: {
                        createInstance: function() {
                            var card = createCard(this, 'Card');
                            if (b.id === 'surs_main') card.data.icon_svg = '<svg><use xlink:href="#sprite-home"></use></svg>';
                            else if (b.id === 'surs_bookmarks') card.data.icon_svg = '<svg><use xlink:href="#sprite-favorite"></use></svg>';
                            else if (b.id === 'surs_history') card.data.icon_svg = '<svg><use xlink:href="#sprite-history"></use></svg>';
                            else if (b.id === 'surs_settings') card.data.icon_svg = '<svg><use xlink:href="#sprite-settings"></use></svg>';
                            else if (buttonIcons[b.id]) card.data.icon_svg = buttonIcons[b.id];
                            else if (b.icon) card.data.icon_svg = b.icon;
                            return card;
                        },
                        emit: {
                            onCreate: function() {
                                var $html = $(this.html);
                                $html.addClass('card--button-compact');
                                var imgElement = $html.find('.card__img');
                                var svgContainer = document.createElement('div');
                                svgContainer.classList.add('card__svg-icon');
                                if (this.data.icon_svg) svgContainer.innerHTML = this.data.icon_svg;
                                else if (b.icon) svgContainer.innerHTML = b.icon;
                                else if (buttonIcons[b.id]) svgContainer.innerHTML = buttonIcons[b.id];
                                imgElement.replaceWith(svgContainer);
                                var buttonLabel = document.createElement('div');
                                buttonLabel.classList.add('card__button-label');
                                buttonLabel.innerText = Lampa.Lang.translate(b.title);
                                $html.find('.card__view').append(buttonLabel);
                            },
                            onlyEnter: function() {
                                if (b.id && buttonActions[b.id]) buttonActions[b.id]();
                                else if (b.action && typeof b.action === 'function') b.action();
                            }
                        }
                    }
                };
            });
            callback({ results: enabledButtons, title: ' ', params: { items: { view: 20, mapping: 'line' } } });
        });
    }

    function addStyles() {
        Lampa.Template.add('surs_buttons_banner_style',
            '<style>' +
            '.card--button-compact{width:12.75em!important;transform:none!important}' +
            '.card--button-compact.hover,.card--button-compact.focus{transform:none!important}' +
            '.items-line{padding-bottom:.5em!important;overflow:visible!important}' +
            
            '/* Баннер шириной 115%, без кастомного увеличение при фокусировке */' +
            '.card--surs-banner{width:115%!important;max-width:115%!important;flex:0 0 auto!important;margin:0!important;transform:none!important}' +
            '.card--surs-banner.focus,.card--surs-banner.hover{transform:none!important}' +
            '.card--surs-banner .card__view{height:' + BANNER.height + '!important;padding-bottom:0!important;border-radius:1.2em!important;overflow:hidden;background-color:rgba(0,0,0,.3)!important;transform:none!important}' +
            '.card--surs-banner.focus .card__view,.card--surs-banner.hover .card__view' +
            
            '.card--surs-banner .card__title,.card--surs-banner .card__age{display:none!important}' +
            '.surs-bb{position:absolute;top:0;left:0;right:0;bottom:0;display:flex;overflow:hidden;color:#fff;cursor:pointer}' +
            
            '/* Основной слайд (3/4) */' +
            '.surs-bb__main{position:relative;width:75%;height:100%;overflow:hidden;border-right:1px solid rgba(255,255,255,0.08)}' +
            '.surs-bb__main-art{position:absolute;top:0;left:0;right:0;bottom:0;background-repeat:no-repeat;background-position:center center;background-size:cover;transition:opacity .6s cubic-bezier(0.25, 1, 0.5, 1), transform .6s cubic-bezier(0.25, 1, 0.5, 1)}' +
            '.surs-bb__main-art--changing{opacity:0.3;transform:scale(1.06)}' +
            
            '.surs-bb__scrim{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(77deg,rgba(0,0,0,.9) 0,rgba(0,0,0,.4) 65%,rgba(0,0,0,0) 100%)}' +
            '.surs-bb__info{position:absolute;left:1.8em;bottom:1.5em;width:80%;z-index:2;transition:opacity .4s ease, transform .4s ease}' +
            '.surs-bb__info--changing{opacity:0;transform:translateY(8px)}' +
            
            '.surs-bb__kind{font-size:.75em;letter-spacing:.2em;text-transform:uppercase;color:#ccc;margin-bottom:.3em}' +
            '.surs-bb__title{font-size:1.8em;line-height:1.1;font-weight:800;margin-bottom:.3em;max-height:2.2em;overflow:hidden;text-shadow:0 .08em .3em rgba(0,0,0,.7)}' +
            '.surs-bb__meta{display:flex;align-items:center;flex-wrap:wrap;font-size:.9em;color:#e5e5e5;margin-bottom:.4em}' +
            '.surs-bb__meta span{margin-right:.7em}' +
            '.surs-bb__match{color:#ffffff;font-weight:700}' +
            '.surs-bb__descr{font-size:.85em;line-height:1.3;max-height:2.6em;overflow:hidden;opacity:.85}' +

            '/* Правая часть (1/4): Без скруглений и названий */' +
            '.surs-bb__sidebar{position:relative;width:25%;height:100%;background:rgba(0,0,0,.4);overflow:hidden}' +
            '.surs-bb__cards-list{display:flex;flex-direction:column;height:100%;gap:0;transition:transform .6s cubic-bezier(0.16, 1, 0.3, 1), opacity .5s ease}' +
            '.surs-bb__cards-list--animating{opacity:0;transform:translateY(-20px)}' +
            
            '.surs-bb__mini-card{position:relative;flex:1;border-radius:0!important;overflow:hidden;background:#111;border-bottom:1px solid rgba(0,0,0,0.3)}' +
            '.surs-bb__mini-card:last-child{border-bottom:none}' +
            '.surs-bb__mini-art{position:absolute;top:0;left:0;right:0;bottom:0;background-size:cover;background-position:center;filter:brightness(0.75);transition:filter .3s ease}' +

            '/* Индикаторы */' +
            '.surs-bb__dots{position:absolute;right:26.5%;bottom:1.2em;display:flex;z-index:3}' +
            '.surs-bb__dot{width:.45em;height:.45em;border-radius:50%;background:rgba(255,255,255,.3);margin-left:.35em;transition:background-color .4s ease, transform .4s ease}' +
            '.surs-bb__dot--on{background:#ffffff;transform:scale(1.2)}' +

            '@media screen and (max-width:767px){' +
            '.card--button-compact{width:9em!important}' +
            '.card--surs-banner{width:100%!important}' +
            '.surs-bb__info{left:1em;bottom:.8em;width:88%}' +
            '.surs-bb__title{font-size:1.2em}' +
            '.surs-bb__descr{display:none}' +
            '.surs-bb__sidebar{display:none}' +
            '.surs-bb__main{width:100%}' +
            '}' +
            '.card--button-compact .card__view{padding-bottom:56%!important;display:flex;align-items:center;justify-content:center;background-color:rgba(0,0,0,.2);border-radius:1em}' +
            '.card--button-compact.hover .card__view,.card--button-compact.focus .card__view{background-color:rgba(255,255,255,.1)}' +
            '.card--button-compact .card__title,.card--button-compact .card__age{display:none!important}' +
            '.card__svg-icon{position:absolute;top:45%;left:50%;transform:translate(-50%,-50%);width:40%!important;height:40%!important;display:flex;align-items:center;justify-content:center}' +
            '.card__svg-icon svg{width:100%!important;height:100%!important}' +
            '.card__button-label{position:absolute;bottom:.4em;left:0;right:0;text-align:center;color:#fff;padding:.5em;font-size:1em;z-index:1}' +
            '</style>'
        );
        $('body').append(Lampa.Template.get('surs_buttons_banner_style', {}, true));
    }

    function startPlugin() {
        window.plugin_custom_buttons_ready = true;
        addStyles();
        window.surs_getAllButtons = getAllButtons;
        window.surs_getCustomButtonsRow = function(partsData) { addCustomButtonsRow(partsData); };

        Lampa.ContentRows.add({
            index: 0,
            name: 'surs_banner',
            title: ' ',
            screen: ['main'],
            call: function() {
                return function(callback) {
                    loadBannerCards(function(list) {
                        callback(bannerRowData(list));
                    });
                };
            }
        });

        Lampa.ContentRows.add({
            index: 1,
            name: 'surs_buttons',
            title: ' ',
            screen: ['main'],
            call: function() {
                var partsData = [];
                addCustomButtonsRow(partsData);
                return function(callback) { if (partsData.length) partsData[0](callback); };
            }
        });

        Lampa.Listener.follow('activity', function(e) {
            if (e.type === 'archive' || e.type === 'destroy') stopBannerRotate();
        });
        Lampa.Listener.send('custom_buttons', { type: 'ready' });
    }

    Lampa.Lang.add({
        surs_btns_new: { ru: 'Новинки Мир', uk: 'Новинки Світ', en: 'New Globe' },
        surs_btns_rus: { ru: 'Новинки Россия', uk: 'Новинки Росія', en: 'New Russia' },
        surs_bb_match: { ru: 'совпадение', uk: 'збіг', en: 'Match' },
        surs_bb_movie: { ru: 'Фильм', uk: 'Фільм', en: 'Movie' },
        surs_bb_series: { ru: 'Сериал', uk: 'Серіал', en: 'Series' }
    });

    if (window.appready) startPlugin();
    else Lampa.Listener.follow('app', function(e) { if (e.type === 'ready') startPlugin(); });
})();
