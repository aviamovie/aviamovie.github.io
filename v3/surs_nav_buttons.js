(function() {  
    'use strict';  
      
    // SVG иконки для кнопок  
    var buttonIcons = {  
        surs_select: '<svg fill="#ffffff" width="64px" height="64px" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M31.9981689,11.9995104 C33.4659424,11.9985117 34.998291,13.1328 34.998291,16.1348 L34.998291,16.1348 L34.998291,26 C34.998291,27.5134277 36.3779053,28.1114014 36.9779053,28.3114014 L36.9779053,28.3114014 L43.8,30.8 C46.7,31.9 48.5,35 47.7,38.2 L47.7,38.2 L44.5,48.5995 C44.3,49.3995 43.6,49.9995 42.7,49.9995 L42.7,49.9995 L26.6,49.9995 C25.8,49.9995 25.1,49.5995 24.8,48.8995 C20.9318685,39.9190553 18.7869873,34.9395752 18.3653564,33.9610596 C17.9437256,32.9825439 18.2219401,32.1955241 19.2,31.6 C21,30.3 23.7,31.6395508 24.8,33.5395508 L24.8,33.5395508 L26.4157715,35.7431828 C27.0515137,36.9508 29,36.9508 29,35.1508 L29,35.1508 L29,16.1348 C29,13.1328 30.5303955,12.0005117 31.9981689,11.9995104 Z M46,2 C48.2,2 50,3.8 50,6 L50,6 L50,21 C50,22.882323 48.1813389,25.0030348 46,25 L46,25 L40.010437,25 C39,25 39,24.1881157 39,24.059082 L39,15.5 C39,11.6547018 37.0187988,8 32,8 C26.9812012,8 25,11.1879783 25,15.5 L25,15.5 L25,24.059082 C25,24.4078007 24.7352295,25 23.987793,25 L23.987793,25 L6,25 C3.8,25 2,23.2 2,21 L2,21 L2,6 C2,3.8 3.8,2 6,2 L6,2 Z"></path> </g></svg>',
     //   surs_new: '<svg fill="#ffffff" height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 227 227" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M211.263,76.362H189V58.05c4-2.245,6.997-5.688,9.148-8.688h8.832c8.31,0,15.07-6.046,15.07-13.5s-6.761-13.5-15.07-13.5 h-9.558c-4.617-7-12.582-11.724-21.622-11.724s-17.006,4.724-21.622,11.724H72.489c-4.617-7-12.582-11.724-21.622-11.724 s-17.006,4.724-21.622,11.724h-9.557c-8.31,0-15.07,6.046-15.07,13.5s6.761,13.5,15.07,13.5h8.831c2.151,3,4.482,6.443,8.482,8.688 v18.312H16.404C7.528,76.362,0,83.557,0,92.432v107.859c0,8.875,7.528,16.07,16.404,16.07h194.859 c8.875,0,15.737-7.195,15.737-16.07V92.432C227,83.557,220.138,76.362,211.263,76.362z M64,58.05c4-2.245,7.064-5.688,9.214-8.688 h80.237c2.151,3,4.548,6.443,8.548,8.688v18.312H64V58.05z M70,177.362H57.209L33,136.702v40.66H19v-63h13.666L57,155.88v-41.518h13 V177.362z M125,177.362H82v-63h43v11H95v15h26v10H95v17h30V177.362z M192.767,177.362h-12.42l-11.014-39.641l-11.014,39.641H145.9 l-14.751-63h13.363l8.585,40.953l11.203-40.953h10.025l11.29,40.975l8.54-40.975h13.32L192.767,177.362z"></path> </g></svg>',
surs_new: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--gis" preserveAspectRatio="xMidYMid meet" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M50 0C27.923 0 10 17.745 10 39.604c0 21.092 16.69 38.351 37.697 39.535V85H40a2.5 2.5 0 0 0-2.5 2.5V90H0v5h37.5v2.5A2.5 2.5 0 0 0 40 100h20a2.5 2.5 0 0 0 2.5-2.5V95H100v-5H62.5v-2.5A2.5 2.5 0 0 0 60 85h-7.303v-5.893c20.78-1.374 37.235-18.48 37.297-39.386a1.2 1.188 0 0 0 .006-.117a1.2 1.188 0 0 0-.004-.106C89.938 17.688 72.041 0 50 0zm0 2.377c1.753 0 3.475.128 5.164.357c-.071.095.125.31.813.7l.818.275c1.023-.126.588-.473-.088-.73a37.631 37.631 0 0 1 7.225 2.044c-.647.145-1.631.224-2.604.186c.023 1.91.88 7.012 3.817 6.086c-.522.114 1.658 2.25.53 2.607c-.598 3.992-3.868-2.663-5.527-2.576c-2.479.414.47 1.628-.423 2.223c-2.347 1.995 2.03 4.088 1.677.734c.288 2.704 1.212 2.621 3.426 2.48c-5.057.846 2.816 2.787.26 4.407c-2.534-.231-3.954.704-2.522 3.16c-.672 2.274 1.597 2.373 2.375 3.158l.852-.076l.549-.072c-.021-.003-.044.003-.065 0c3.159-.962 1.525-7.22 4.891-6.81c-.705 2.42 3.184 4.724 1.098 1.214c-1.423-1.78 4.614 1.28 1.955 2.154c2.585 3.38.763-3.157 2.69-1.38c1.251 2.159 2.717.55 3.058.47c.828-.229 2.08.132 2.408.325c3.172 2.999-3.005 1.755-3.096 4.048c.336 1.468-3.39-.393-3.949-.793c-1.635-4.361-5.358-.011-8.096.69c-.093.072-2.342 1.81-2.607 2.04c-.642 3.822-3.745 6.146-4.897 10.013c-.23 2.234.517 5.322.204 7.732c.73 3.091 3.683 4.862 6.257 6.375c1.938 1.235 3.958-1.133 6.043-1.16c1.825-2.656 4.744-.708 6.393-.904c-1.9 2.962 1.414 5.253.476 8.457c-1.47 1.78-1.884 4.146-2.671 6.271c-6.79 6.646-16.122 10.75-26.434 10.75a37.846 37.846 0 0 1-14.555-2.89c.85-.764 1.345-1.903 2.487-2.23c5.185 1.242 2.926-5.11 6.447-6.546c2.359-4.28-5.172-4.963-7.86-6.521c-4.545-.68-4.118-6.158-8.246-7.342c-3.38-.534-2.154-5.358-4.632-5.1c-2.14.394-2.988-2.52-4.18-2.312c-.288.3-1.493-1.956-2.79.53c-3.66-.801-1.098-4.963-2.644-7.292c-.64-1.067 1.828-6.538-.818-3.36c-.104-.181-.174-.43-.217-.72a36.677 36.677 0 0 1 1.45-5.557c.39-.429.838-.641 1.331-.48c1.956-.44 1.306 2.602 1.467 4.486c1.475.626.785-5.525 3.85-5.668c2.085-2.325 4.504-4.303 7.039-5.904c.99.698 3.116.613 4.785-.938c-1.859-.37-1.993-1.773.492-2.326c3.954-1.682-1.784 1.842 1.444 2.352c3.503 1.022.532-3.017 2.193-4.596c-1.739-1.172 1.053-5.73-1.988-3.705c1.052-.745-.585-2.142.355-2.688c.389 1.077 2.344 2.56 3.04.075c1.954.33 1.678-2.473 2.734-3.98c4.956-1.73.854 3.025.668 5.386c1.594 4.602 4.285-1.774 7.12-1.932c3.446.116 3.052-3.146 2.999-4.892a22.587 22.587 0 0 0-2.25-.3c.093 0 .185-.005.279-.005zM36.703 6.311c.634-.077-.366 1.286-1.734 1.511c-1.824 1.506-.27-.53.508-.861c.621-.44 1.015-.625 1.226-.65zm27.977.996a.774.774 0 0 1 .271.054c.587.964-.652-.024-.271-.054zm-32.203.453c1.403.1-.092 3.342-1.65 3.502c-.836-.077-1.406 1.226-2.052 1.652c-.063.286.052-4.463 2.233-4.646c.667-.388 1.145-.531 1.469-.508zm20.191.086c-.715.03-1.247.33-.955 1.1c.418.398 1.026.495 1.58.497c3.416-.42.948-1.662-.625-1.597zm12.1.619c.151.013.507.147 1.166.476c1.331 1.663-1.822-.535-1.166-.476zm-6.579 1.22c-.043.02-.079.1-.091.274c.626.696.28-.355.091-.273zm2.418.577c-.05-.014-.055.095.047.443c.673.758.106-.402-.047-.443zm6.85.008c.55-.003 2.09.946 1.78 1.98c-1.487 1.19-.8.553-1.09-.766c-.996-.872-1.02-1.213-.69-1.214zm-43.36 4.81c.11.013.265.141.477.46c-.531 1.613-.947-.515-.476-.46zm7.428.936c.1 0 .26.08.498.302c-.519.388-.794-.306-.498-.302zm45.512.285c.141-.016.42.182.885.713c.555-.904 3.42 1.192.933 1.57c-.468 1.852-2.43-2.213-1.818-2.283zm-52.883.744c.052-.012.107.02.162.115c-.746 2.176-.526-.035-.162-.115zm48.389 2.236a.191.191 0 0 1 .078.002c.448.074 2.212 1.068 2.916 1.76c.431.955-1.413-.747-1.787-.637c-1.044-.771-1.332-1.087-1.207-1.125zm-49.309.018c.092.018.164.112.184.326c-1.35.929-.579-.405-.184-.326zm54.702 1.77c.069-.03.268.08.677.462c.073.968-.885-.375-.677-.463zm-8.22 1.833c-.165.026-.42.312-.767 1.07c.968 1.12 1.265-1.147.768-1.07zm10.19.8c-.18.022-.37.223-.496.741c1.505.71 1.038-.812.496-.742zm-29.23 2.2c-.195-.017-.468.065-.799.336c1.275.653 1.384-.284.799-.336zm1.763.596c-.079-.03-.238.024-.507.248c.277.688.746-.159.507-.248zm6.352 4.022c-.077.018-.179.102-.309.294c.492.805.641-.374.309-.294zm-40.133.34c-.073 0-.118.18-.074.695c.78.92.293-.698.074-.696zm-.435 1.306c-.074-.012-.183.202-.328.842c.44 1.268.547-.805.328-.842zm-2.235.668c-1.553-.159 1.306 2.557 1.418 3.754c2.876.768-.402 1.637 2.03 2.607c3.662 1.305 1.399-1.61-.155-2.224c.61-.969-1.544-1.682-2.336-3.88c-.423-.152-.735-.234-.957-.257zm45.364.607c-.166 0-.348.3-.424 1.198c1.073.255.787-1.198.424-1.198zm-42.34.647a.079.079 0 0 0-.063.008c-.084.053-.088.31.145.873l.181.119c.15-.526-.104-.96-.263-1zm39.603.066c-.47.027-.774.238-.44.79l.141.064h.8c2.373-.078.533-.913-.5-.854zm-41.83 2.887c-.21-.044-.24.197.264 1.04c1.539.529.2-.944-.264-1.04zm-4.297.12c.534 2.287.875 4.947 1.866 6.958c.654 2.462 1.135-.637 1.298 1.303c.555 3.664-1.7 7.44 1.077 10.953c1.32 3.543 4.219 6.026 6.248 9.111C16.432 58.79 12.4 49.668 12.4 39.604c0-.823.035-1.635.088-2.444zm9.573 2.112c-.193.024-.362.226-.409.75c1.763.714.985-.821.409-.75zm2.808 2.887c-.078-.03-.158.315-.21 1.358l.03.574c.625 1.65.414-1.841.18-1.932zm28.06 2.324c-.199-.021-.2.132.352.653c1.478.29.087-.606-.351-.653zm2.15.489c-.093.001-.213.067-.364.238c.613.954.76-.245.363-.238zm-.356 1.043c-.141.022-.34.113-.608.314c.735.785 1.217-.412.608-.314zm-1.034.152c-.075-.008-.188.101-.343.432c.44.67.568-.408.343-.432zm23.377 7.377c-.075-.008-.188.101-.343.432c.44.67.568-.409.343-.432zM42.5 90h15v5h-15v-5z" fill="#ffffff"></path><text x="50" y="70" font-family="Arial, sans-serif" font-size="47" font-weight="bold" fill="#424242" text-anchor="middle">NEW</text></g></svg>',        //    surs_rus: '<svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 260 166" enable-background="new 0 0 260 166" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="243.199,112.566 235.896,102.51 227.168,100.247 223.726,106.665 218.71,106.395 217.235,85.568 223.332,72.563 228.373,69.98 223.431,56.336 226.922,47.976 230.807,50.312 238.625,65.851 242.928,68.949 258,72.66 245.928,52.033 238.675,52.77 233.659,48.344 233.683,36.961 227.856,22.331 220.406,17.831 217.456,12.299 221.586,6.57 214.407,2.096 213.079,9.152 203.589,19.134 200.368,28.871 201.622,33.937 192.918,42.984 190.509,49.598 185.001,50.065 178.043,56.213 179.149,61.277 172.757,70.006 168.134,64.99 162.848,69.367 150.112,72.047 149.907,72.438 148.416,62.924 143.646,63.269 128.598,69.857 125.328,75.882 119.059,76.397 115.789,80.21 109.789,80.799 105.954,76.102 96.684,85.691 79.646,76.725 56.386,71.48 52.477,73.423 57.05,63.785 57.02,63.678 59.853,70.62 67.205,70.448 65.262,54.836 59.632,54.393 45.814,64.792 44.634,68.629 33.865,71.063 29.046,69.39 20.465,75.242 21.817,80.947 13.9,98.182 17.539,110.624 7.95,113.598 2,114.238 2.86,125.154 10.409,138.333 12.179,145.783 18.104,135.087 21.227,134.227 26.489,135.456 26.71,124.883 32.217,122.007 46.052,124.576 59.036,138.117 66.737,131.522 86.678,135.309 91.005,143.52 96.611,142.611 104.11,156.01 114.068,157.928 121.985,163.904 132.975,158.445 147.063,160.633 149.866,151.88 158.054,153.158 162.529,156.355 172.535,154.143 180.625,154.314 187.435,147.257 196.434,145.783 198.081,141.529 198.647,128.915 206.638,125.424 216.62,131.62 224.832,129.137 228.299,131.522 233.167,123.777 236.585,128.768 239.855,141.676 244.034,140.053 246.272,134.055 "></polygon> </g></svg>',
        surs_rus: '<svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 260 166" enable-background="new 0 0 260 166" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><polygon points="243.199,112.566 235.896,102.51 227.168,100.247 223.726,106.665 218.71,106.395 217.235,85.568 223.332,72.563 228.373,69.98 223.431,56.336 226.922,47.976 230.807,50.312 238.625,65.851 242.928,68.949 258,72.66 245.928,52.033 238.675,52.77 233.659,48.344 233.683,36.961 227.856,22.331 220.406,17.831 217.456,12.299 221.586,6.57 214.407,2.096 213.079,9.152 203.589,19.134 200.368,28.871 201.622,33.937 192.918,42.984 190.509,49.598 185.001,50.065 178.043,56.213 179.149,61.277 172.757,70.006 168.134,64.99 162.848,69.367 150.112,72.047 149.907,72.438 148.416,62.924 143.646,63.269 128.598,69.857 125.328,75.882 119.059,76.397 115.789,80.21 109.789,80.799 105.954,76.102 96.684,85.691 79.646,76.725 56.386,71.48 52.477,73.423 57.05,63.785 57.02,63.678 59.853,70.62 67.205,70.448 65.262,54.836 59.632,54.393 45.814,64.792 44.634,68.629 33.865,71.063 29.046,69.39 20.465,75.242 21.817,80.947 13.9,98.182 17.539,110.624 7.95,113.598 2,114.238 2.86,125.154 10.409,138.333 12.179,145.783 18.104,135.087 21.227,134.227 26.489,135.456 26.71,124.883 32.217,122.007 46.052,124.576 59.036,138.117 66.737,131.522 86.678,135.309 91.005,143.52 96.611,142.611 104.11,156.01 114.068,157.928 121.985,163.904 132.975,158.445 147.063,160.633 149.866,151.88 158.054,153.158 162.529,156.355 172.535,154.143 180.625,154.314 187.435,147.257 196.434,145.783 198.081,141.529 198.647,128.915 206.638,125.424 216.62,131.62 224.832,129.137 228.299,131.522 233.167,123.777 236.585,128.768 239.855,141.676 244.034,140.053 246.272,134.055 "></polygon><text x="130" y="125" font-family="Arial, sans-serif" font-size="47" font-weight="bold" fill="#424242" text-anchor="middle">NEW</text></g></svg>',
        surs_kids: '<svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 300 300" enable-background="new 0 0 300 300" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M213,163v-48l8.2-2.8l29.1,37.8L213,163z M176.5,55.5c0-25.8-20.9-46.7-46.7-46.7S83.1,29.7,83.1,55.5s20.9,46.7,46.7,46.7 C155.6,102.3,176.5,81.3,176.5,55.5z M203.7,135.5c-2.4-9.9-12.4-16-22.4-13.5l-35.1,8.6c0,0-47-28.4-47.8-28.8 c-16.9-7.7-37.2-1.1-46.3,15.4l-34.3,62.4c-6.9,12.6-5.5,27.5,2.4,38.4c0.2,0.3,30.4,34.9,30.4,34.9H27.5 c-11.4,0-20.4,9.7-19.4,21.3C9,284.4,17.8,292,28,292h66.5c5.7,0,14.5-2.6,18.7-12c4-8.8,0.6-17.4-4.5-23l-31.5-36.1l36.7-66.7 l19.8,12c3.7,2.2,9.6,3.2,14,2.1c10.7-2.5,42.5-10.4,42.5-10.4C200.1,155.5,206.1,145.5,203.7,135.5z M268.5,222l-7.6-23H214 l-7.6,23H268.5z M272.5,234h-70.1l-7.6,23h85.4L272.5,234z M284.1,269h-93.4l-7.6,23h108.7L284.1,269z"></path> </g></svg>',                  };  
      
    function getAllButtons() {  
        return [  
            { id: 'surs_main', title: 'surs_main' },  
            { id: 'surs_bookmarks', title: 'surs_bookmarks' },  
            { id: 'surs_history', title: 'surs_history' },  
            { id: 'surs_select', title: 'surs_select' },  
            { id: 'surs_new', title: 'surs_new' },  
            { id: 'surs_rus', title: 'surs_rus' },  
            { id: 'surs_kids', title: 'surs_kids' },  
            { id: 'surs_settings', title: 'title_settings' }  
        ];  
    }  
      
    var buttonActions = {  
        surs_main: function() {  
            Lampa.Activity.push({  
                source: Lampa.Storage.get('source'),  
                title: Lampa.Lang.translate('title_main'),  
                component: 'main',  
                page: 1  
            });  
        },  
        surs_bookmarks: function() {  
            Lampa.Activity.push({  
                url: '',  
                title: Lampa.Lang.translate('surs_bookmarks'),  
                component: 'bookmarks',  
                page: 1  
            });  
        },  
        surs_history: function() {  
            Lampa.Activity.push({  
                url: '',  
                title: Lampa.Lang.translate('surs_history'),  
                component: 'favorite',  
                type: 'history',  
                page: 1  
            });  
        },  
        surs_select: function() {  
            if (window.SursSelect && typeof window.SursSelect.showSursSelectMenu === 'function') {  
                window.SursSelect.showSursSelectMenu();  
            }  
        },  
        surs_new: function() {  
            var sourceName = Lampa.Storage.get('surs_name') || 'SURS';  
            Lampa.Activity.push({  
                source: sourceName + ' NEW',  
                title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' NEW',  
                component: 'main',  
                page: 1  
            });  
        },  
        surs_rus: function() {  
            var sourceName = Lampa.Storage.get('surs_name') || 'SURS';  
            Lampa.Activity.push({  
                source: sourceName + ' RUS',  
                title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' RUS',  
                component: 'main',  
                page: 1  
            });  
        },  
        surs_kids: function() {  
            var sourceName = Lampa.Storage.get('surs_name') || 'SURS';  
            Lampa.Activity.push({  
                source: sourceName + ' KIDS',  
                title: Lampa.Lang.translate('title_main') + ' - ' + sourceName + ' KIDS',  
                component: 'main',  
                page: 1  
            });  
        },  
        surs_settings: function() {  
            Lampa.Controller.toggle('settings');  
        }  
    };  
      
    // Функции для работы с настройками  
    function getAllStoredSettings() {  
        return Lampa.Storage.get('surs_settings') || {};  
    }  
      
    function getProfileSettings() {  
        var profileId = Lampa.Storage.get('lampac_profile_id', '') || 'default';  
        var allSettings = getAllStoredSettings();  
        if (!allSettings.hasOwnProperty(profileId)) {  
            allSettings[profileId] = {};  
            saveAllStoredSettings(allSettings);  
        }  
        return allSettings[profileId];  
    }  
      
    function saveAllStoredSettings(settings) {  
        Lampa.Storage.set('surs_settings', settings);  
    }  
      
    function getStoredSetting(key, defaultValue) {  
        var profileSettings = getProfileSettings();  
        return profileSettings.hasOwnProperty(key) ? profileSettings[key] : defaultValue;  
    }  
      
    // Добавление стилей с мобильными адаптациями  
function addStyles() {      
    Lampa.Template.add('custom_buttons_compact_style', `      
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
                /* Hide button labels on mobile */      
                .card--button-compact .card__button-label {      
                    display: none !important;      
                }      
                /* Reduce row height */      
                .items-line {      
                    padding-bottom: 0.1em !important;      
                }      
                  
                /* Center and resize icons for mobile */      
                .card__svg-icon {      
                    width: 60% !important;      
                    height: 60% !important;      
                    top: 50% !important;      
                    left: 50% !important;      
                    transform: translate(-50%, -50%) !important;      
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
                fill: currentColor;      
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
    $('body').append(Lampa.Template.get('custom_buttons_compact_style', {}, true));      
}
      
    function createCard(data, type) {  
        return Lampa.Maker.make(type, data, function(module) {  
            return module.only('Card', 'Callback');  
        });  
    }  
      
    // Добавление кнопок  
    function addCustomButtonsRow(partsData) {  
        partsData.unshift(function(callback) {  
            var allButtons = getAllButtons();  
            var enabledButtons = allButtons.filter(function(b) {  
                return getStoredSetting('custom_button_' + b.id, true);  
            }).map(function(b) {  
                var cardData = {  
                    source: 'custom',  
                    title: Lampa.Lang.translate(b.title),  
                    name: Lampa.Lang.translate(b.title),  
                    id: b.id,  
                    params: {  
                        createInstance: function() {  
                            var card = createCard(this, 'Card');  
                            // Используем спрайты для стандартных иконок  
                            if (b.id === 'surs_main') {  
                                card.data.icon_svg = '<svg><use xlink:href="#sprite-home"></use></svg>';  
                            } else if (b.id === 'surs_bookmarks') {  
                                card.data.icon_svg = '<svg><use xlink:href="#sprite-favorite"></use></svg>';  
                            } else if (b.id === 'surs_history') {  
                                card.data.icon_svg = '<svg><use xlink:href="#sprite-history"></use></svg>';  
                            } else if (b.id === 'surs_settings') {  
                                card.data.icon_svg = '<svg><use xlink:href="#sprite-settings"></use></svg>';  
                            } else if (buttonIcons[b.id]) {  
                                card.data.icon_svg = buttonIcons[b.id];  
                            }  
                            return card;  
                        },  
                        emit: {  
                            onCreate: function() {  
                                this.html.addClass('card--button-compact');  
                                // Для всех SVG иконок  
                                var imgElement = this.html.find('.card__img');  
                                var svgContainer = document.createElement('div');  
                                svgContainer.classList.add('card__svg-icon');  
                                if (b.id === 'surs_main') {  
                                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-home"></use></svg>';  
                                } else if (b.id === 'surs_bookmarks') {  
                                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-favorite"></use></svg>';  
                                } else if (b.id === 'surs_history') {  
                                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-history"></use></svg>';  
                                } else if (b.id === 'surs_settings') {  
                                    svgContainer.innerHTML = '<svg><use xlink:href="#sprite-settings"></use></svg>';  
                                } else if (buttonIcons[b.id]) {  
                                    svgContainer.innerHTML = buttonIcons[b.id];  
                                }  
                                imgElement.replaceWith(svgContainer);  
                                var buttonLabel = document.createElement('div');  
                                buttonLabel.classList.add('card__button-label');  
                                buttonLabel.innerText = Lampa.Lang.translate(b.title);  
                                this.html.find('.card__view').append(buttonLabel);  
                            },  
                            onlyEnter: function() {  
                                if (buttonActions[b.id]) {  
                                    buttonActions[b.id]();  
                                }  
                            }  
                        }  
                    }  
                };  
                return cardData;  
            });  
            callback({  
                results: enabledButtons,  
                title: '',  
                params: {  
                    items: {  
                        view: 20,  
                        mapping: 'line'  
                    }  
                }  
            });  
        });  
    }  
      
    function startPlugin() {  
        window.plugin_custom_buttons_ready = true;  
        addStyles();  
        // Экспортируем функцию для использования в других плагинах  
        window.surs_getAllButtons = getAllButtons; 
        window.surs_getCustomButtonsRow = function(partsData) {  
            addCustomButtonsRow(partsData);  
        };  
        // Используем подход из рабочего примера  
        Lampa.ContentRows.add({  
            index: 0,  
            name: 'surs_buttons',  
            title: 'Навигационное меню',  
            screen: ['main'],  
            call: function(params, screen) {  
                var partsData = [];  
                addCustomButtonsRow(partsData);  
                return function(callback) {  
                    if (partsData.length > 0) {  
                        partsData[0](callback);  
                    }  
                };  
            }  
        });  
    }  
      
    // Проверяем версию Lampa и инициализируем плагин  
    if (Lampa.Manifest.app_digital >= 300) {  
        if (window.appready) {  
            startPlugin();  
        } else {  
            Lampa.Listener.follow('app', function(e) {  
                if (e.type === 'ready') startPlugin();  
            });  
        }  
    }  
})();
