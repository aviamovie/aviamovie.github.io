(function() { 'use strict';  
    // Plugin metadata  
    var plugin = {  
        name: 'TorrServer Rotation',  
        version: '1.1.1',  
        description: 'TorrServer selection with built-in server support'  
    };  
  
    // Configuration  
    var config = {  
        servers: [  
            {url: 'https://ts.domain', title: 'serv 1', available: false},  
            {url: 'https://ts1.donain', title: 'serv 2', available: false},  
            {url: 'https://ts2.domain', title: 'serv 3', available: false}  
        ],  
        checkTimeout: 10000,  
        enableLogging: true,  
        showServerSelection: true  
    };  
  
    // State variables  
    var autostart_timer;  
    var autostart_progress;  
    var builtinServerAvailable = false;  
  
    // Logging system  
    var ENABLE_LOGGING = config.enableLogging;  
    var TS_ROTATION = {  
        log: function (msg) {  
            if (ENABLE_LOGGING && console && console.log) {  
                console.log('[TS_ROTATION] ', msg);  
            }  
        }  
    };  
  
    // Network utility  
    var network = new Lampa.Reguest();  
  
    /**  
     * Check if TorrServer URL is available using Lampa's method  
     */  
    function checkAvailability(url, callback) {  
        network.timeout(config.checkTimeout);  
        var head = {dataType: 'text'};  
        var auth = Lampa.Storage.field('torrserver_auth');  
          
        if (auth) {  
            head.headers = {  
                Authorization: "Basic " + Lampa.Base64.encode(  
                    Lampa.Storage.get('torrserver_login') + ':' + Lampa.Storage.value('torrserver_password')  
                )  
            };  
        }  
          
        network.native(Lampa.Utils.checkEmptyUrl(url), function() {  
            TS_ROTATION.log('Server available: ' + url);  
            callback(true);  
        }, function(a, c) {  
            if (a.status == 401) {  
                TS_ROTATION.log('Server available but auth failed: ' + url);  
                callback(true);  
            } else {  
                TS_ROTATION.log('Server unavailable: ' + url + ' - ' + network.errorDecode(a, c));  
                callback(false);  
            }  
        }, false, head);  
    }  
  
    /**  
     * Select server - built-in first, then random from available  
     */  
    function selectServer() {  
        // If built-in server is available, use it  
        if (builtinServerAvailable && config.servers.length > 0 && config.servers[0].title === 'Встроенный') {  
            config.currentIndex = 0;  
            Lampa.Storage.set('torrserver_url', config.servers[0].url);  
            TS_ROTATION.log('Using built-in TorrServer: ' + config.servers[0].title);  
            return config.servers[0].url;  
        }  
          
        // Otherwise select random from available servers  
        var availableServers = [];  
        for (var i = 0; i < config.servers.length; i++) {  
            if (config.servers[i].available) {  
                availableServers.push(config.servers[i]);  
            }  
        }  
          
        if (availableServers.length > 0) {  
            var randomIndex = Math.floor(Math.random() * availableServers.length);  
            var selectedServer = availableServers[randomIndex];  
              
            for (var j = 0; j < config.servers.length; j++) {  
                if (config.servers[j].url === selectedServer.url) {  
                    config.currentIndex = j;  
                    Lampa.Storage.set('torrserver_url', selectedServer.url);  
                    TS_ROTATION.log('Randomly selected TorrServer: ' + selectedServer.title);  
                    return selectedServer.url;  
                }  
            }  
        }  
        return null;  
    }  
  
    /**  
     * Check all servers and select best one  
     */  
    function checkAllServers() {  
        var checkCount = 0;  
        var totalChecks = config.servers.length + 1; // +1 for built-in server  
        TS_ROTATION.log('Checking availability of all TorrServer URLs');  
          
        // Check built-in server first  
        checkAvailability('http://127.0.0.1:8090', function(isAvailable) {  
            if (isAvailable) {  
                builtinServerAvailable = true;  
                // Add built-in server to the beginning of the list  
                config.servers.unshift({  
                    url: 'http://127.0.0.1:8090',  
                    title: 'Встроенный',  
                    available: true,  
                    isBuiltin: true  
                });  
                TS_ROTATION.log('Built-in TorrServer available at http://127.0.0.1:8090');  
            }  
            checkCount++;  
            processCheckResults();  
        });  
          
        // Check other servers  
        for (var i = 0; i < config.servers.length; i++) {  
            (function(server, index) {  
                checkAvailability(server.url, function(isAvailable) {  
                    server.available = isAvailable;  
                    checkCount++;  
                    processCheckResults();  
                });  
            })(config.servers[i], i);  
        }  
          
        function processCheckResults() {  
            if (checkCount === totalChecks) {  
                var availableServers = [];  
                for (var j = 0; j < config.servers.length; j++) {  
                    if (config.servers[j].available) {  
                        availableServers.push(config.servers[j]);  
                    }  
                }  
                  
                if (availableServers.length > 0) {  
                    selectServer();  
                    TS_ROTATION.log('TorrServer initialized');  
                } else {  
                    TS_ROTATION.log('No available TorrServer instances found');  
                }  
            }  
        }  
    }  
  
    /**  
     * Start autostart mechanism with 9-second timeout  
     */  
    function startAutostart(defaultUrl, callback, progressBar) {  
        var startTime = Date.now();  
        autostart_timer = setInterval(function() {  
            var elapsed = (Date.now() - startTime) / 1000;  
            var progress = Math.min((elapsed / 9) * 100, 100);  
            progressBar.css('width', progress + '%');  
              
            if (elapsed >= 9) {  
                stopAutostart();  
                callback(defaultUrl);  
            }  
        }, 100);  
          
        Lampa.Keypad.listener.follow('keydown', stopAutostart);  
    }  
  
    /**  
     * Stop autostart mechanism  
     */  
    function stopAutostart() {  
        clearInterval(autostart_timer);  
        Lampa.Keypad.listener.remove('keydown', stopAutostart);  
        if (autostart_progress) {  
            autostart_progress.remove();  
            autostart_progress = null;  
        }  
    }  
  
    /**  
     * Show server selection dialog  
     */  
    function showServerSelection(callback) {  
        var availableServers = [];  
        for (var i = 0; i < config.servers.length; i++) {  
            if (config.servers[i].available) {  
                availableServers.push(config.servers[i]);  
            }  
        }  
          
        if (!config.showServerSelection || availableServers.length <= 1) {  
            var selectedUrl = selectServer();  
            callback(selectedUrl || config.servers[config.currentIndex].url);  
            return;  
        }  
          
        var enabled = Lampa.Controller.enabled().name;  
        var html = $('<div class="torrent-server-select"></div>');  
          
        // Create server list  
        var list = $('<div class="torrent-server__list"></div>');  
        var focusItem = null;  
          
        for (var i = 0; i < availableServers.length; i++) {  
            var server = availableServers[i];  
            var isCurrent = server.url === config.servers[config.currentIndex].url;  
            var title = server.title + (isCurrent ? ' - текущий' : '');  
              
            var item = $('<div class="torrent-server__item selector' + (isCurrent ? ' current' : '') + '" data-url="' + server.url + '">' +  
                '<div class="torrent-server__title">' + title + '</div>' +  
                '</div>');  
              
            if (isCurrent) {  
                focusItem = item;  
            }  
              
            item.on('hover:enter', function() {  
                stopAutostart();  
                Lampa.Modal.close();  
                var selectedUrl = $(this).data('url');  
                callback(selectedUrl);  
            });  
              
            list.append(item);  
        }  
          
        html.append(list);  
          
        // Add progress bar for auto-selection  
        var progress = $('<div class="torrent-server__progress">' +  
            '<div class="torrent-server__progress-bar"></div>' +  
            '</div>');  
        html.append(progress);  
          
        Lampa.Modal.open({  
            title: 'Выберите TorrServer',  
            html: html,  
            size: 'small',  
            onBack: function() {  
                stopAutostart();  
                Lampa.Modal.close();  
                Lampa.Controller.toggle(enabled);  
                callback(null);  
            }  
        });  
          
        // Use selected server for autostart (not random if built-in is available)  
        var autostartUrl = selectServer() || availableServers[0].url;  
          
        startAutostart(autostartUrl, function(selectedUrl) {  
            Lampa.Modal.close();  
            callback(selectedUrl);  
        }, progress.find('.torrent-server__progress-bar'));  
          
        Lampa.Controller.add('modal', {  
            invisible: true,  
            toggle: function() {  
                Lampa.Controller.collectionSet(html);  
                var focusTarget = focusItem || html.find('.torrent-server__item').first();  
                Lampa.Controller.collectionFocus(false, focusTarget);  
            },  
            back: function() {  
                stopAutostart();  
                Lampa.Modal.close();  
                Lampa.Controller.toggle(enabled);  
            }  
        });
          
        Lampa.Controller.toggle('modal');  
    }  
  
    /**  
     * Intercept torrent start to show server selection  
     */  
    function interceptTorrentStart() {  
        var originalTorrentStart = window.Lampa && window.Lampa.Torrent && window.Lampa.Torrent.start;  
        if (originalTorrentStart) {  
            window.Lampa.Torrent.start = function(element, movie) {  
                if (config.showServerSelection) {  
                    var self = this;  
                    showServerSelection(function(selectedUrl) {  
                        if (selectedUrl) {  
                            Lampa.Storage.set('torrserver_url', selectedUrl);  
                            originalTorrentStart.call(self, element, movie);  
                        } else {  
                            TS_ROTATION.log('Server selection cancelled');  
                        }  
                    });  
                } else {  
                    selectServer();  
                    originalTorrentStart.call(this, element, movie);  
                }  
            };  
        }  
    }  
  
    /**  
     * Initialize the plugin  
     */  
    function init() {  
        TS_ROTATION.log('TorrServer Rotation Plugin initialized');  
          
        checkAllServers();  
        interceptTorrentStart();  
          
        Lampa.Storage.listener.follow('change', function(event) {  
            if (event.name === 'torrserver_url') {  
                var currentUrl = event.value;  
                for (var i = 0; i < config.servers.length; i++) {  
                    if (config.servers[i].url === currentUrl) {  
                        config.currentIndex = i;  
                        TS_ROTATION.log('TorrServer URL manually changed to: ' + config.servers[i].title);  
                        break;  
                    }  
                }  
            }  
        });  
    }  
  
    // Add custom CSS styles  
    $('body').append('<style>' +  
        '.torrent-server-select { padding: 2em; }' +  
        '.torrent-server__list { margin-bottom: 2em; }' +  
        '.torrent-server__item { padding: 1.2em; margin-bottom: 0.8em; border-radius: 0.3em; background-color: #363636; cursor: pointer; }' +  
        '.torrent-server__item.current { background-color: #464646; border: 1px solid #fff; }' +  
        '.torrent-server__item.focus { background-color: rgba(255,255,255,0.2); }' +  
        '.torrent-server__title { font-size: 1.3em; }' +  
        '.torrent-server__progress { height: 0.5em; background-color: rgba(255, 255, 255, 0.15); border-radius: 5em; overflow: hidden; }' +  
        '.torrent-server__progress-bar { height: 100%; background-color: #fff; width: 0%; transition: width 0.1s linear; }' +  
        '</style>');  
  
    // Register plugin  
    if (window.Lampa && Lampa.Plugin) {  
        Lampa.Plugin.add(plugin);  
    }  
  
    // Initialize when app is ready  
    if (window.appready) {  
        init();  
    } else {  
        Lampa.Listener.follow('app', function(e) {  
            if (e.type === 'ready') {  
                init();  
            }  
        });  
    }  
})();