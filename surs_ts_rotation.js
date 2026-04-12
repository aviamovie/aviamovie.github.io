(function() {  
    'use strict';  
      

    var plugin = {  
        name: 'TorrServer Rotation',  
        version: '1.0.0',  
        description: 'Automatic TorrServer address rotation with server selection'  
    };  
      
//конфиг 
    var config = {  
        urls: [  
            'https://ts.domain.com',  
            'https://ts2.domain.com',  
            'https://ts3.domain.com'  
        ],  
        rotateInterval: 120000, // 2 минуты  
        currentIndex: 0,  
        checkTimeout: 10000, // такой де как у Лампы  
        enableLogging: true,  
        showServerSelection: true // Включить ручной выбор сервера  
    };  
      

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
      

    function checkAvailability(url, callback) {  
        network.timeout(config.checkTimeout);  
          
        let head = {dataType: 'text'};  
        let auth = Lampa.Storage.field('torrserver_auth');  
          

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
                callback(true); // Consider 401 as "available" like Lampa does  
            } else {  
                TS_ROTATION.log('Server unavailable: ' + url + ' - ' + network.errorDecode(a, c));  
                callback(false);  
            }  
        }, false, head);  
    }  
      
      
    function rotateServer() {  
        var nextIndex = (config.currentIndex + 1) % config.urls.length;  
        var nextUrl = config.urls[nextIndex];  
          
        TS_ROTATION.log('Attempting to rotate to server: ' + nextUrl);  
          
        checkAvailability(nextUrl, function(isAvailable) {  
            if (isAvailable) {  
                config.currentIndex = nextIndex;  
                Lampa.Storage.set('torrserver_url', nextUrl);  
                TS_ROTATION.log('TorrServer rotated to: ' + nextUrl);  
            } else {  
                TS_ROTATION.log('Next server unavailable, searching for alternative');  
                findAvailableServer();  
            }  
        });  
    }  
      
      
    function findAvailableServer() {  
        var checked = 0;  
        var availableIndex = -1;  
          
        for (var i = 0; i < config.urls.length; i++) {  
            if (i === config.currentIndex) continue;  
              
            (function(index) {  
                checkAvailability(config.urls[index], function(available) {  
                    checked++;  
                    if (available && availableIndex === -1) {  
                        availableIndex = index;  
                    }  
                      
                    if (checked === config.urls.length - 1 && availableIndex !== -1) {  
                        config.currentIndex = availableIndex;  
                        Lampa.Storage.set('torrserver_url', config.urls[availableIndex]);  
                        TS_ROTATION.log('TorrServer switched to available: ' + config.urls[availableIndex]);  
                    }  
                });  
            })(i);  
        }  
    }  
      

    function checkAllServers() {  
        var availableServers = [];  
        var checkCount = 0;  
          
        TS_ROTATION.log('Checking availability of all TorrServer URLs');  
          
        for (var i = 0; i < config.urls.length; i++) {  
            (function(url, index) {  
                checkAvailability(url, function(isAvailable) {  
                    checkCount++;  
                    if (isAvailable) {  
                        availableServers.push(index);  
                    }  
                      
                    if (checkCount === config.urls.length) {  
                        if (availableServers.length > 0) {  
                            config.currentIndex = availableServers[0];  
                            var selectedUrl = config.urls[config.currentIndex];  
                            Lampa.Storage.set('torrserver_url', selectedUrl);  
                            TS_ROTATION.log('TorrServer initialized with: ' + selectedUrl);  
                        } else {  
                            TS_ROTATION.log('No available TorrServer instances found');  
                        }  
                    }  
                });  
            })(config.urls[i], i);  
        }  
    }  
      
     
    function showServerSelection(callback) {  
        if (!config.showServerSelection || config.urls.length <= 1) {  
            callback(config.urls[config.currentIndex]);  
            return;  
        }  
          var enabled = Lampa.Controller.enabled().name;  
          
        var items = config.urls.map(function(url, index) {  
            return {  
                title: 'Сервер ' + (index + 1) + (index === config.currentIndex ? ' (текущий)' : ''),  
                url: url,  
                selected: index === config.currentIndex  
            };  
        });  
          
        Lampa.Select.show({  
            title: 'Выберите TorrServer',  
            items: items,  
            onBack: function() {  
               Lampa.Controller.toggle(enabled);  
                callback(null); // User cancelled selection  
            },  
            onSelect: function(item) {  
                callback(item.url);  
            }  
        });  
    }  
      
      
    function interceptTorrentStart() {  

        var originalTorrentStart = window.Lampa && window.Lampa.Torrent && window.Lampa.Torrent.start;  
          
        if (originalTorrentStart) {  
            window.Lampa.Torrent.start = function(element, movie) {  
                if (config.showServerSelection) {  
                    showServerSelection(function(selectedUrl) {  
                        if (selectedUrl) {  
                            // Temporarily set selected URL  
                            var originalUrl = Lampa.Storage.get('torrserver_url');  
                            Lampa.Storage.set('torrserver_url', selectedUrl);  
                              
                            // Call original function  
                            originalTorrentStart.call(this, element, movie);  
                              
                            // Restore original URL after a short delay  
                            setTimeout(function() {  
                                Lampa.Storage.set('torrserver_url', originalUrl);  
                            }, 25000);  
                        }  
                    });  
                } else {  
                    originalTorrentStart.call(this, element, movie);  
                }  
            };  
        }  
    }  
      
     
    function init() {  
        TS_ROTATION.log('TorrServer Rotation Plugin initialized');  
          

        checkAllServers();  
          

        setInterval(rotateServer, config.rotateInterval);  
          

        interceptTorrentStart();  
          

        Lampa.Storage.listener.follow('change', function(event) {  
            if (event.name === 'torrserver_url') {  
                var currentUrl = event.value;  
                var index = config.urls.indexOf(currentUrl);  
                if (index !== -1) {  
                    config.currentIndex = index;  
                    TS_ROTATION.log('TorrServer URL manually changed to: ' + currentUrl);  
                }  
            }  
        });  
    }  
      

    if (window.Lampa && Lampa.Plugin) {  
        Lampa.Plugin.add(plugin);  
    }  
      

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