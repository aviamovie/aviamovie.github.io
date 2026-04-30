(function () {      
    'use strict';      
    if (window.surs_genres_buttons_ready) return;      
    window.surs_genres_buttons_ready = true;      
      
       var defaultConfig = {    
        // Плагин разработан на донат от Mixmaki, автор @pillot_valiko
  
        rowTitle: Lampa.Lang.translate('title_genre'),        
        rowIndex: 2,        
        source: 'tmdb',  
        // Настройки фильтрации ключевых слов  
        withoutKeywords: {  
            enabled: true,  // Включить/выключить фильтрацию  
            level: '1'      // Уровень: '0' (базовый), '1' (+ аниме), '2' (расширенный, отключает аниме полностью)  
        }  
    };        
      
      
    var movieGenres = [
		{ id: 28, title: 'filter_genre_ac', icon: '<svg height="200px" width="200px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#000000;} </style> <g> <path class="st0" d="M443.724,166.599c27.038-2.293,47.087-26.07,44.786-53.125c-2.292-27.038-26.078-47.087-53.115-44.795 c-27.038,2.301-47.078,26.088-44.776,53.124C392.91,148.85,416.677,168.9,443.724,166.599z"></path> <path class="st0" d="M431.752,346.544l30.541-114.485c5.068-19.305-6.466-39.075-25.78-44.144 c-19.304-5.077-39.075,6.448-44.152,25.771v-0.018L365.052,315.64l-78.755-13.276c-17.218-4.304-34.696,5.786-39.578,22.864 l-33.317,133.445c-3.82,13.342,3.913,27.28,17.274,31.1c13.37,3.81,27.298-3.923,31.128-17.283l39.392-98.638l61.286,16.155 C398.863,400.125,421.633,382.927,431.752,346.544z"></path> <path class="st0" d="M388.177,462.949l-0.121-0.01c-0.018,0-0.028,0-0.047,0L388.177,462.949z"></path> <path class="st0" d="M498.349,286.311c-10.1-2.999-20.721,2.749-23.722,12.858l-27.876,93.848 c-2.096,6.606-4.536,11.777-7.146,15.746c-3.987,5.944-8.002,9.373-13.854,12.093c-5.842,2.664-14.031,4.379-25.416,4.37 c-3.009,0.008-6.215-0.113-9.634-0.355l-54.009-3.363c-10.519-0.661-19.575,7.341-20.227,17.861 c-0.662,10.518,7.342,19.574,17.86,20.226l53.73,3.345c4.211,0.298,8.31,0.448,12.28,0.456c10.072-0.009,19.5-0.988,28.369-3.289 c13.268-3.392,25.315-10.127,34.501-19.892c9.251-9.736,15.531-21.885,19.91-35.609l0.074-0.214l28.015-94.362 C514.206,299.923,508.447,289.302,498.349,286.311z"></path> <path class="st0" d="M248.974,81.219L0,21.256v15.14v281.228l248.974-59.962V81.219z M225.123,238.87L23.851,287.355V51.536 l201.272,48.466V238.87z"></path> <polygon class="st0" points="204.989,115.189 47.991,84.937 47.991,253.953 204.989,223.692 "></polygon> </g> </g></svg>' },  
		{ id: 12, title: 'filter_genre_ad', icon: '<svg height="200px" width="200px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#000000;} </style> <g> <path class="st0" d="M194.811,161.364c-3.467,1.892-6.589,6.254-2.459,16.33c5.283,12.92,4.563,27.491,15.782,27.491 c5.542,28.606,7.934,27.703,14.494,34.994c0,8.732,0,6.196,0,11.287c0,14.591-4.956,14.841-16.242,21.161 c-27.213,15.197-46.406,18.453-51.833,59.114c-0.989,7.444,41.699,15.542,101.446,15.581 c59.757-0.038,102.436-8.137,101.456-15.581c-5.428-40.661-24.937-42.726-51.834-59.114c-11.949-7.309-16.242-6.57-16.242-21.161 c0-5.091,0-2.556,0-11.287c6.561-7.291,8.942-6.388,14.495-34.994c11.219,0,10.489-14.571,15.782-27.491 c4.314-10.548,0.702-14.813-2.93-16.56c2.978-38.356,2.978-64.8-40.593-72.994c-15.782-13.535-39.595-8.943-50.882-6.686 c-11.286,2.276-21.449,0-21.449,0l1.921,18.184C189.211,119.464,197.482,145.899,194.811,161.364z"></path> <path class="st0" d="M492.224,300.58c-4.706,1.479-10.46,3.506-16.54,4.506c-2.594,0.432-5.235,0.672-7.877,0.653 c0.086-0.288,0.173-0.576,0.26-0.865c1.709-5.812,3.179-11.864,4.226-16.82c1.056-4.947,1.72-8.78,1.988-10.163 c0.808-4.044,1.354-6.964,2.277-9.02c0.931-2.066,2.248-3.276,4.466-3.948c8.914-2.171,17.079-7.992,22.794-16.762 c5.726-8.712,8.934-20.326,8.032-32.774c-0.586-7.819-2.287-11.219-4.563-11.872c-2.296-0.653-5.235,1.412-8.866,4.352 c-3.64,2.949-8.002,6.743-13.006,9.768c-2.142,1.306-4.41,2.469-6.772,3.392c-0.51-5.38-1.24-10.807-1.97-15.245 c-0.768-4.735-1.489-8.347-1.719-9.663c-1.364-7.704-1.941-11.076,1.585-13.765c7.175-4.937,12.468-12.834,14.611-22.506 c2.171-9.635,1.133-20.998-3.775-31.708c-3.104-6.724-5.735-9.154-7.974-8.972c-2.257,0.173-4.197,2.978-6.464,6.781 c-2.267,3.823-4.89,8.636-8.338,12.987c-1.478,1.874-3.112,3.65-4.898,5.254c-1.969-4.044-4.025-7.972-5.841-11.248 c-2.2-3.977-4.015-6.974-4.63-8.079c-3.679-6.446-5.254-9.279-2.949-12.795c4.871-6.686,7.127-15.398,6.071-24.687 c-1.028-9.269-5.408-19.066-13.025-27.126c-4.803-5.052-7.886-6.426-9.836-5.59c-1.979,0.855-2.891,3.947-3.785,8.059 c-0.893,4.112-1.806,9.232-3.573,14.188c-0.749,2.104-1.662,4.159-2.757,6.119c-2.181-2.191-4.313-4.265-6.224-6.052 c-3.324-3.112-5.956-5.418-6.888-6.272c-5.476-5.005-7.848-7.214-6.734-11.268c2.594-7.857,2.075-16.849-1.777-25.359 c-3.812-8.51-10.998-16.502-20.729-21.834c-6.128-3.344-9.49-3.718-11.094-2.306c-1.623,1.411-1.538,4.64-1.124,8.828 c0.394,3.995,1.057,8.875,0.971,13.89c-3.305-3.862-7.82-6.849-12.892-9.193c-5.936-2.767-14.821-4.582-22.496-3.987 c-7.694,0.558-14.024,3.439-15.504,8.76c-1.498,5.351,2.094,10.941,6.964,15.869c4.918,4.899,11.162,9.251,16.187,11.585 c4.485,2.064,8.942,3.611,13.64,3.909c-0.212,0.163-0.423,0.326-0.634,0.49c-4.092,3.103-8.222,5.696-11.383,8.078 c-3.16,2.363-5.36,4.495-5.716,6.532c-0.355,2.046,1.134,3.947,5.341,6.253c6.676,3.66,14.015,5.11,21.632,4.765 c7.589-0.375,15.446-2.526,22.458-6.744c3.593-1.949,6.158-0.249,11.182,4.39c0.855,0.788,3.151,3.065,5.994,6.148 c1.624,1.758,3.41,3.785,5.236,5.928c-1.931,0.912-3.91,1.7-5.879,2.391c-4.841,1.691-9.568,2.892-13.304,4.178 c-3.746,1.288-6.484,2.622-7.455,4.458c-0.96,1.844-0.125,4.12,3.18,7.598c5.245,5.553,11.786,9.183,19.135,11.191 c7.339,1.979,15.484,2.325,23.448,0.461c4.025-0.758,5.936,1.643,9.288,7.599c0.576,1.018,2.066,3.89,3.823,7.684 c1.451,3.141,3.074,6.936,4.582,10.797c-2.421,0.317-4.85,0.432-7.233,0.46c-5.389,0.068-10.499-0.317-14.659-0.278 c-4.149,0.038-7.339,0.471-8.914,1.96c-1.586,1.509-1.538,4.025,0.547,8.55c3.295,7.184,8.521,12.929,15.1,17.396 c6.59,4.428,14.543,7.588,23.093,8.52c4.255,0.663,5.312,3.708,6.531,10.778c0.202,1.201,0.663,4.563,1.048,8.943 c0.365,4.112,0.643,9.106,0.71,14.034c-2.449-0.586-4.832-1.345-7.128-2.171c-5.34-1.921-10.249-4.169-14.36-5.63 c-4.102-1.479-7.407-2.209-9.51-1.316c-2.114,0.893-2.997,3.362-2.614,8.54c0.596,8.213,3.602,15.792,8.435,22.593 c4.832,6.772,11.479,12.824,19.538,16.944c1.979,1.124,2.929,2.517,3.209,4.573c0.288,2.056-0.087,4.745-0.846,8.444 c-0.25,1.258-1.066,4.725-2.363,9.154c-1.278,4.428-3.045,9.808-5.014,14.928c-0.105,0.26-0.202,0.51-0.298,0.759 c-2.142-1.518-4.139-3.18-6.051-4.861c-4.457-3.967-8.376-8.059-11.824-11.076c-3.448-3.026-6.388-5.014-8.79-4.975 c-2.431,0.038-4.236,2.084-5.86,7.194c-2.612,8.107-2.622,16.504-0.633,24.994c2.007,8.454,6.022,16.993,12.179,24.264 c2.91,3.775,1.441,7.022-3.006,13.563c-0.759,1.114-2.978,4.131-6.042,7.887c-3.054,3.746-6.993,8.213-11.018,12.343 c-0.644,0.672-1.296,1.326-1.941,1.97c-1.393-2.344-2.622-4.765-3.737-7.166c-2.622-5.706-4.668-11.287-6.733-15.648 c-2.046-4.37-4.064-7.511-6.388-8.5c-2.344-0.98-4.938,0.192-8.626,4.39c-5.898,6.628-9.423,14.64-11.104,23.62 c-1.643,8.933-1.441,18.856,1.316,28.482c1.172,4.879-1.643,7.348-8.742,11.671c-1.21,0.73-4.64,2.651-9.202,4.888 c-4.563,2.249-10.269,4.765-15.917,6.907c-5.648,2.171-13.352,5.485-17.454,6.926c-53.436,18.78-117.757,26.886-157.582,56.156 c-6.206,4.562,6.128,22.122,11.574,20.757c5.447-1.354,44.591-24.84,142.579-51.64c4.11-1.45,24.004-7.934,30.085-10.844 c6.1-2.901,12.199-6.206,17.059-9.04c4.861-2.843,8.502-5.196,9.846-6.003c3.91-2.401,6.706-4.16,9.097-4.956 c2.382-0.806,4.361-0.663,6.589,0.634c4.265,2.786,9.116,4.726,14.361,5.696c5.245,0.961,10.893,0.942,16.647-0.134 c5.744-1.086,11.612-3.228,17.204-6.456c5.6-3.218,10.941-7.512,15.599-12.766c5.86-6.638,7.252-10.691,6.004-12.997 c-1.258-2.334-5.196-3.026-10.364-3.593c-5.178-0.547-11.594-1.018-17.876-2.622c-2.651-0.672-5.273-1.546-7.78-2.669 c0.663-0.778,1.316-1.566,1.969-2.364c4.072-4.928,8.011-10.181,11.076-14.543c3.064-4.37,5.283-7.829,6.118-9.058 c4.851-7.224,6.964-10.384,11.864-9.855c9.538,1.518,19.855-0.856,28.99-7.147c4.553-3.14,8.8-7.242,12.402-12.16 c3.612-4.909,6.58-10.653,8.616-16.964c2.536-7.954,2.19-11.988,0.23-13.516C500.62,298.227,496.932,299.101,492.224,300.58z"></path> <path class="st0" d="M196.722,450.987c12.325-4.765,25.34-8.808,38.529-12.565c-14.168-3.862-28.202-7.886-41.554-12.574 c-4.102-1.441-11.805-4.755-17.453-6.926c-5.648-2.142-11.354-4.658-15.916-6.907c-4.563-2.238-7.992-4.159-9.203-4.888 c-7.099-4.323-9.913-6.792-8.741-11.671c2.757-9.626,2.958-19.549,1.316-28.482c-1.681-8.98-5.206-16.992-11.104-23.62 c-3.688-4.198-6.282-5.37-8.625-4.39c-2.326,0.989-4.342,4.13-6.389,8.5c-2.065,4.361-4.12,9.942-6.733,15.648 c-1.114,2.401-2.344,4.822-3.737,7.166c-0.644-0.644-1.296-1.298-1.941-1.97c-4.025-4.13-7.962-8.597-11.018-12.343 c-3.064-3.756-5.283-6.772-6.042-7.887c-4.448-6.541-5.927-9.788-3.007-13.563c6.158-7.271,10.173-15.811,12.18-24.264 c1.988-8.49,1.978-16.887-0.635-24.994c-1.623-5.11-3.429-7.156-5.859-7.194c-2.401-0.038-5.341,1.95-8.789,4.975 c-3.448,3.017-7.368,7.108-11.825,11.076c-1.911,1.681-3.909,3.343-6.051,4.861c-0.096-0.25-0.193-0.5-0.288-0.759 c-1.979-5.12-3.746-10.499-5.024-14.928c-1.296-4.428-2.113-7.896-2.362-9.154c-0.758-3.698-1.133-6.388-0.845-8.444 c0.278-2.056,1.23-3.448,3.208-4.573c8.06-4.12,14.707-10.172,19.548-16.944c4.822-6.801,7.838-14.38,8.424-22.593 c0.394-5.178-0.5-7.647-2.612-8.54c-2.104-0.893-5.408-0.163-9.51,1.316c-4.112,1.461-9.02,3.708-14.351,5.63 c-2.306,0.826-4.688,1.584-7.137,2.171c0.077-4.928,0.346-9.923,0.711-14.034c0.384-4.38,0.845-7.742,1.046-8.943 c1.22-7.069,2.277-10.115,6.532-10.778c8.549-0.932,16.502-4.092,23.092-8.52c6.58-4.467,11.806-10.211,15.101-17.396 c2.084-4.525,2.132-7.041,0.547-8.55c-1.575-1.488-4.764-1.921-8.914-1.96c-4.16-0.038-9.27,0.346-14.658,0.278 c-2.382-0.028-4.813-0.144-7.234-0.46c1.508-3.862,3.132-7.656,4.582-10.797c1.758-3.794,3.247-6.666,3.824-7.684 c3.352-5.956,5.264-8.357,9.288-7.599c7.963,1.864,16.109,1.518,23.448-0.461c7.349-2.008,13.89-5.638,19.135-11.191 c3.305-3.477,4.14-5.753,3.18-7.598c-0.971-1.835-3.708-3.17-7.454-4.458c-3.737-1.287-8.463-2.488-13.305-4.178 c-1.969-0.692-3.947-1.48-5.878-2.391c1.824-2.142,3.612-4.17,5.245-5.928c2.834-3.082,5.13-5.36,5.984-6.148 c5.023-4.639,7.588-6.339,11.181-4.39c7.012,4.218,14.87,6.369,22.458,6.744c7.617,0.345,14.956-1.105,21.632-4.765 c4.208-2.306,5.696-4.207,5.341-6.253c-0.355-2.037-2.556-4.17-5.716-6.532c-3.16-2.382-7.29-4.975-11.382-8.078 c-0.212-0.164-0.423-0.327-0.634-0.49c4.697-0.298,9.154-1.844,13.64-3.909c5.024-2.334,11.268-6.686,16.186-11.585 c4.87-4.928,8.462-10.518,6.974-15.869c-1.489-5.322-7.82-8.203-15.514-8.76c-7.675-0.595-16.56,1.22-22.497,3.987 c-5.072,2.344-9.586,5.331-12.89,9.193c-0.086-5.014,0.576-9.894,0.97-13.89c0.413-4.188,0.5-7.417-1.124-8.828 c-1.604-1.413-4.966-1.038-11.094,2.306c-9.731,5.331-16.915,13.323-20.729,21.834c-3.852,8.51-4.371,17.502-1.778,25.359 c1.114,4.054-1.258,6.263-6.734,11.268c-0.931,0.854-3.564,3.16-6.886,6.272c-1.912,1.787-4.044,3.862-6.225,6.052 c-1.095-1.96-2.008-4.015-2.756-6.119c-1.768-4.956-2.68-10.076-3.574-14.188c-0.893-4.112-1.806-7.204-3.785-8.059 c-1.95-0.836-5.033,0.538-9.836,5.59c-7.617,8.06-11.998,17.858-13.025,27.126c-1.056,9.29,1.201,18.002,6.071,24.687 c2.306,3.516,0.73,6.349-2.949,12.795c-0.615,1.105-2.431,4.102-4.63,8.079c-1.816,3.276-3.872,7.204-5.841,11.248 c-1.786-1.604-3.419-3.381-4.898-5.254c-3.449-4.351-6.071-9.164-8.338-12.987c-2.266-3.804-4.207-6.608-6.464-6.781 c-2.238-0.183-4.87,2.248-7.963,8.972c-4.918,10.711-5.955,22.074-3.784,31.708c2.141,9.673,7.434,17.57,14.61,22.506 c3.525,2.689,2.949,6.061,1.576,13.765c-0.222,1.316-0.942,4.928-1.72,9.663c-0.721,4.438-1.451,9.866-1.96,15.245 c-2.363-0.923-4.63-2.085-6.781-3.392c-4.995-3.026-9.356-6.82-12.996-9.768c-3.631-2.94-6.571-5.005-8.866-4.352 c-2.276,0.653-3.977,4.054-4.562,11.872c-0.903,12.449,2.305,24.062,8.03,32.774c5.715,8.77,13.88,14.591,22.795,16.762 c2.218,0.673,3.534,1.883,4.467,3.948c0.922,2.056,1.469,4.976,2.276,9.02c0.269,1.383,0.931,5.216,1.989,10.163 c1.047,4.956,2.516,11.008,4.226,16.82c0.087,0.288,0.173,0.576,0.26,0.865c-2.641,0.018-5.283-0.222-7.877-0.653 c-6.08-1-11.834-3.027-16.541-4.506c-4.706-1.478-8.395-2.353-10.384-0.816c-1.96,1.528-2.306,5.562,0.231,13.516 c2.036,6.311,5.005,12.054,8.616,16.964c3.602,4.918,7.848,9.02,12.402,12.16c9.135,6.292,19.451,8.665,28.989,7.147 c4.9-0.529,7.012,2.631,11.864,9.855c0.836,1.23,3.054,4.688,6.119,9.058c3.064,4.362,7.002,9.615,11.075,14.543 c0.654,0.798,1.307,1.586,1.969,2.364c-2.506,1.123-5.129,1.998-7.78,2.669c-6.282,1.604-12.699,2.076-17.876,2.622 c-5.167,0.568-9.106,1.259-10.365,3.593c-1.248,2.306,0.145,6.359,6.004,12.997c4.659,5.254,10,9.548,15.6,12.766 c5.591,3.227,11.46,5.37,17.204,6.456c5.754,1.075,11.402,1.095,16.647,0.134c5.245-0.97,10.096-2.91,14.361-5.696 c2.229-1.296,4.207-1.44,6.589-0.634c2.392,0.797,5.188,2.556,9.097,4.956c1.344,0.807,4.986,3.16,9.846,6.003 c4.86,2.834,10.96,6.139,17.06,9.04C172.939,443.1,191.862,449.297,196.722,450.987z"></path> <path class="st0" d="M314.729,462.456c-15.379,4.246-29.259,8.414-41.756,12.411c43.447,15.647,63.004,26.963,66.731,27.894 c5.446,1.364,17.78-16.195,11.566-20.757C340.626,474.175,328.216,467.874,314.729,462.456z"></path> </g> </g></svg>' },  
		{ id: 16, title: 'filter_genre_mv', icon: '<svg height="200px" width="200px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{fill:#000000;} </style> <g> <path class="st0" d="M448.635,297.899c-40.042-23.119-87.464-21.894-125.119-0.914c-4.251,2.378-11.262,6.656-19.569,7.455 c-0.217-21.068-12.806-39.172-30.844-47.4c0-6.469,0-16.862,0-29.712c0-57.676,0-164.385,0-183.11 c0-25.888-25.533-31.328-37.326-27.698c-51.749,15.93-89.364,64.128-89.364,121.112c0,46.237,24.769,86.688,61.768,108.804 c4.17,2.503,11.386,6.425,16.231,13.205c-15.486,9.194-25.865,26.065-25.865,45.368c0,1.704,0.089,3.399,0.244,5.067 c-5.596,3.222-14.604,8.422-25.732,14.847c-49.947,28.844-142.358,82.197-158.572,91.551c-22.426,12.957-14.372,37.78-5.329,46.184 c39.674,36.848,100.217,45.332,149.56,16.844c40.051-23.127,62.695-64.803,63.352-107.907c0.071-4.864-0.129-13.072,3.328-20.661 c7.641,4.305,16.453,6.78,25.856,6.78c11.418,0,21.978-3.639,30.609-9.806c5.6,3.23,14.603,8.432,25.741,14.866 c49.946,28.833,142.353,82.188,158.576,91.551c22.427,12.948,39.9-6.443,42.652-18.486 C520.902,383.07,497.978,326.395,448.635,297.899z"></path> </g> </g></svg>' },  
		{ id: 35, title: 'filter_genre_cm', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.21 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>' }, // Комедия (иконка: улыбающееся лицо)
		{ id: 80, title: 'filter_genre_cr', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12H4a2 2 0 0 0 0 4h5m6-4h5a2 2 0 0 1 0 4h-5m-6-4V8a2 2 0 0 1 2-2h.01M17 8a2 2 0 0 1 2 2v.01"/></svg>' }, // Криминал (иконка: наручники)
		{ id: 99, title: 'filter_genre_dc', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9v-7.14a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3V20H4a2 2 0 0 0-2 2v2h16v-2a2 2 0 0 0-2-2z"/><path d="M10 9V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v4"/><circle cx="9" cy="7" r="2"/></svg>' }, // Документальный (иконка: камера/документ)
		{ id: 18, title: 'filter_genre_dr', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' }, // Драма (иконка: маска/драма)
		{ id: 10751, title: 'filter_genre_fm', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 2.15 2.15 0 0 1-1.7 1.2A2.1 2.1 0 0 1 18 16.5a2.1 2.1 0 0 1-1.3-.6 2.1 2.1 0 0 1-.6-1.3 2.1 2.1 0 0 1 1.2-1.9 2.15 2.15 0 0 1 1.2-.5 2.1 2.1 0 0 1 1.3.6 2.1 2.1 0 0 1 .6 1.3z"/><path d="M23 22a10 10 0 0 1-20 0"/><path d="M9 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4"/></svg>' }, // Семейный (иконка: дом/семья)
		{ id: 14, title: 'filter_genre_fe', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1.73 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' }, // Фэнтези (иконка: кристалл/фэнтези)
		{ id: 36, title: 'filter_genre_hi', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18v2H3V6z"/><path d="m3 10 2 4h14l2-4-2-4H5l-2 4z"/></svg>' }, // История (иконка: книга/история)
		{ id: 27, title: 'filter_genre_ho', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' }, // Ужасы (иконка: маска/страх, как в драме, но с акцентом)
		{ id: 10402, title: 'filter_genre_mu', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 19 20 21 16 7 22 7 18 13H14c-1.1 0-2-.9-2-2V7H4v10h8v4h4v-4h4z"/></svg>' }, // Музыка (иконка: нота/музыка)
		{ id: 9648, title: 'filter_genre_de', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><circle cx="11" cy="11" r="3"/></svg>' }, // Детектив (иконка: лупа)
		{ id: 10749, title: 'filter_genre_md', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' }, // Мелодрама (иконка: сердце/любовь)
		{ id: 878, title: 'filter_genre_fa', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' }, // Фантастика (иконка: ракета)
		{ id: 10770, title: 'filter_genre_tv', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"/></svg>' }, // Телевизионный фильм (иконка: ТВ)
		{ id: 53, title: 'filter_genre_tr', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 14L21 3"/><path d="M21 3L14 10M21 3v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/></svg>' }, // Триллер (иконка: нож/триллер)
		{ id: 10752, title: 'filter_genre_mi', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' }, // Военный (иконка: прицел/война)
		{ id: 37, title: 'filter_genre_ve', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h.01M7 20v-8M12 20V4M17 20v-6M22 20h-.01M2 15l5-5M7 15l5-5M12 15l5-5M17 15l5-5"/></svg>' } // Вестерн (иконка: пистолет/вестерн, как экшн)
	];


	var tvGenres = [
		{ id: 10759, title: 'filter_genre_aa', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"/></svg>' }, // Боевик и Приключения (иконка: ТВ с экшном)
		{ id: 16, title: 'filter_genre_mv', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="12" r="6"/><circle cx="9" cy="12" r="2"/><line x1="21" y1="12" x2="15" y2="12"/></svg>' }, // Мультфильм (та же, что в фильмах)
		{ id: 35, title: 'filter_genre_cm', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.21 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>' }, // Комедия (та же)
		{ id: 80, title: 'filter_genre_cr', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12H4a2 2 0 0 0 0 4h5m6-4h5a2 2 0 0 1 0 4h-5m-6-4V8a2 2 0 0 1 2-2h.01M17 8a2 2 0 0 1 2 2v.01"/></svg>' }, // Криминал (та же)
		{ id: 99, title: 'filter_genre_dc', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9v-7.14a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3V20H4a2 2 0 0 0-2 2v2h16v-2a2 2 0 0 0-2-2z"/><path d="M10 9V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v4"/><circle cx="9" cy="7" r="2"/></svg>' }, // Документальный (та же)
		{ id: 18, title: 'filter_genre_dr', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' }, // Драма (та же)
		{ id: 10751, title: 'filter_genre_fm', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 2.15 2.15 0 0 1-1.7 1.2A2.1 2.1 0 0 1 18 16.5a2.1 2.1 0 0 1-1.3-.6 2.1 2.1 0 0 1-.6-1.3 2.1 2.1 0 0 1 1.2-1.9 2.15 2.15 0 0 1 1.2-.5 2.1 2.1 0 0 1 1.3.6 2.1 2.1 0 0 1 .6 1.3z"/><path d="M23 22a10 10 0 0 1-20 0"/><path d="M9 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4"/></svg>' }, // Семейный (та же)
		{ id: 10762, title: 'filter_genre_ch', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' }, // Детский (иконка: ТВ/дети)
		{ id: 9648, title: 'filter_genre_de', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><circle cx="11" cy="11" r="3"/></svg>' }, // Детектив (та же)
		{ id: 10763, title: 'filter_genre_nw', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1M12 13v5M15 11h-4"/></svg>' }, // Новости (иконка: газета/новости)
		{ id: 10764, title: 'filter_genre_rs', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9H9l-3-9H2"/><circle cx="12" cy="12" r="4"/></svg>' }, // Реалити-шоу (иконка: камера/реалити)
		{ id: 10765, title: 'filter_genre_hf', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' }, // НФ и Фэнтези (иконка: ракета/фантастика)
		{ id: 10766, title: 'filter_genre_op', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' }, // Мыльная опера (иконка: мыльная опера/драма)
		{ id: 10767, title: 'filter_genre_tc', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="16" y1="10" x2="16" y2="14"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="12" y1="10" x2="12" y2="14"/></svg>' }, // Ток-шоу (иконка: микрофон/ток-шоу)
		{ id: 10768, title: 'filter_genre_mp', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' }, // Война и Политика (иконка: прицел/война)
		{ id: 37, title: 'filter_genre_ve', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h.01M7 20v-8M12 20V4M17 20v-6M22 20h-.01M2 15l5-5M7 15l5-5M12 15l5-5M17 15l5-5"/></svg>' } // Вестерн (та же)
	];
      
     
    var sortOptions = [  
        { title: 'title_popular', sort: 'popularity.desc' },  
        { title: 'title_new', sort: 'release_date.desc' },  
        { title: 'title_hight_voite', sort: 'vote_average.desc' },  
        { title: 'title_in_top', sort: 'vote_count.desc' }  
    ];  
	
	      
    function applyWithoutKeywords(baseUrl) {  
        if (!defaultConfig.withoutKeywords.enabled) return baseUrl;  
          
        var filterLevel = defaultConfig.withoutKeywords.level;  
        var baseExcludedKeywords = [  
            '346488',  // Гей-тематика  
            '158718',  // ЛГБТ-тематика  
            '41278'    // Российская политика  
        ];  
  
        if (!filterLevel || filterLevel == '1') {  
            baseExcludedKeywords.push(  
                '13141',   // Основано на манге  
                '345822',  // Основано на 4-кома манге  
                '315535',  // Донхуа (китайская анимация)  
                '290667',  // Основано на маньхуа  
                '323477',  // Основано на манхве  
                '290609'   // Манхва  
            );  
        }  
  
        if (filterLevel == '2') {  
            baseExcludedKeywords.push(  
                '210024',  
                '13141',  
                '345822',  
                '315535',  
                '290667',  
                '323477',  
                '290609'  
            );  
        }  
  
        baseUrl += '&without_keywords=' + encodeURIComponent(baseExcludedKeywords.join(','));  
        return baseUrl;  
    }  
    
    function addStyles() {      
        Lampa.Template.add('genres_compact_wide_style', `      
            <style>      
                .card--genre-compact {      
                    width: 12.75em !important;      
                }      
                .card--genre-compact .card__view {    
                    padding-bottom: 56% !important;    
                    display: flex;    
                    align-items: center;    
                    justify-content: center;    
                    background-color: rgba(0, 0, 0, 0.2);  
                    border-radius: 1em;    
                }    
                .card--genre-compact.hover .card__view,    
                .card--genre-compact.focus .card__view {    
                    background-color: rgba(255, 255, 255, 0.1);  
                }  
                .card--genre-compact .card__title,      
                .card--genre-compact .card__age {      
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
                .card__svg-icon svg path,    
                .card__svg-icon svg polygon {    
                    fill: rgba(255, 255, 255, 0.8) !important;    
                }    
                .card__genre-label {      
                    position: absolute;      
                    bottom: 0.4em;      
                    left: 0;      
                    right: 0;      
                    text-align: center;      
                    color: #fff;      
                    padding: 0.5em;      
                    font-size: 1.1em;      
                    font-weight: 500;    
                    z-index: 1;    
                }      
            </style>      
        `);      
        $('body').append(Lampa.Template.get('genres_compact_wide_style', {}, true));      
    }  
      
    function openGenre(genre) {    
    var hasMovie = movieGenres.some(function(g) { return g.id === genre.id; });    
    var hasTv = tvGenres.some(function(g) { return g.id === genre.id; });    
        
    var typeChoices = [];    
        
    if (hasMovie) {    
        typeChoices.push({ title: Lampa.Lang.translate('menu_movies'), value: 'movie' });    
    }    
        
    if (hasTv) {    
        typeChoices.push({ title: Lampa.Lang.translate('menu_tv'), value: 'tv' });    
    }    
        
        
    if (typeChoices.length === 1) {    
        showSortMenu(genre, typeChoices[0].value, false);   
        return;    
    }    
        
        
    Lampa.Select.show({    
        title: Lampa.Lang.translate(genre.title),    
        items: typeChoices,    
        onSelect: function (t) {    
            showSortMenu(genre, t.value, true);   
        },    
        onBack: function () {    
            Lampa.Controller.toggle('content');    
        }    
    });    
}
      
    function showSortMenu(genre, type, fromTypeSelection) {      
        var sortItems = sortOptions.map(function(s) {      
            return {      
                title: Lampa.Lang.translate(s.title),      
                sort: s.sort      
            };      
        });      
              
        Lampa.Select.show({      
            title: Lampa.Lang.translate('filter_sorted'),      
            items: sortItems,      
            onSelect: function(sortItem) {      
                var base = type === 'movie' ? 'discover/movie' : 'discover/tv';    
                var url = base + '?with_genres=' + genre.id + '&sort_by=' + sortItem.sort;    
                    
                if (sortItem.sort === 'release_date.desc') {    
                    var today = new Date();    
                    var tenDaysAgo = new Date(today);    
                    tenDaysAgo.setDate(today.getDate() - 10);    
                        
                    var sixMonthsAgo = new Date(today);    
                    sixMonthsAgo.setMonth(today.getMonth() - 6);    
                        
                    var dateField = type === 'movie' ? 'primary_release_date' : 'first_air_date';    
                    var lte = dateField + '.lte=' + formatDate(tenDaysAgo);    
                    var gte = dateField + '.gte=' + formatDate(sixMonthsAgo);    
                        
                    url += '&' + lte + '&' + gte + '&vote_count.gte=40';     
                }  
                    
                if (sortItem.sort === 'vote_average.desc') {    
                    url += '&vote_count.gte=1000';    
                }    
                  
                  
                url = applyWithoutKeywords(url);  
                      
                Lampa.Activity.push({          
                    url: url,          
                    title: Lampa.Lang.translate(genre.title),          
                    component: 'category_full',          
                    source: 'tmdb',          
                    card_type: type,          
                    page: 1          
                });      
            },      
            onBack: function() {      
                if (fromTypeSelection) {    
                    openGenre(genre);    
                } else {    
                    Lampa.Controller.toggle('content');    
                }    
            }      
        });      
    }    
  
  
	function formatDate(date) {  
		var year = date.getFullYear();  
		var month = String(date.getMonth() + 1).padStart(2, '0');  
		var day = String(date.getDate()).padStart(2, '0');  
		return year + '-' + month + '-' + day;  
	}
		  
		function createGenresRow() {  
			  
			var allGenres = movieGenres.slice();  
			tvGenres.forEach(function(tvGenre) {  
				if (!allGenres.find(function(g) { return g.id === tvGenre.id; })) {  
					allGenres.push(tvGenre);  
				}  
			});  
			  
			Lampa.ContentRows.add({        
				index: defaultConfig.rowIndex,        
				screen: ['main'],        
				call: function () {        
					return function (callback) {        
						var results = allGenres.map(function (g) {        
							return {        
								source: 'custom',        
								title: Lampa.Lang.translate(g.title),        
								name: Lampa.Lang.translate(g.title),        
								params: {        
									createInstance: function () {        
										var card = Lampa.Maker.make('Card', this, function (m) {        
											return m.only('Card', 'Callback');        
										});        
										card.data.icon_svg = g.icon;  
										return card;        
									},        
									emit: {      
										onCreate: function () {      
											this.html.addClass('card--genre-compact');      
											  
											var iconData = g.icon;    
											if (iconData && iconData.startsWith('<svg')) {    
												var imgElement = this.html.find('.card__img');    
												var svgContainer = document.createElement('div');    
												svgContainer.classList.add('card__svg-icon');    
												svgContainer.innerHTML = iconData;    
												imgElement.replaceWith(svgContainer);    
											}  
											  
											var genreLabel = document.createElement('div');      
											genreLabel.classList.add('card__genre-label');      
											genreLabel.innerText = Lampa.Lang.translate(g.title);      
											this.html.find('.card__view').append(genreLabel);      
										},      
										onlyEnter: function () {        
											openGenre(g);        
										}        
									}        
								}        
							};        
						});        
			  
						callback({        
							results: results,        
							title: defaultConfig.rowTitle,        
							params: {        
								items: {        
									view: 20,        
									mapping: 'line'        
								}        
							}        
						});        
					};        
				}        
			});        
		}  
  
    function startPlugin() {      
    addStyles();      
    createGenresRow();  
      
    // Глобальный экспорт данных и функций  
    window.genres_getMovieGenres = function() {  
        return movieGenres.slice(); // Возвращаем копию массива  
    };  
      
    window.genres_getTvGenres = function() {  
        return tvGenres.slice(); // Возвращаем копию массива  
    };  
      
    window.genres_getAllGenres = function() {  
        var allGenres = movieGenres.slice();  
        tvGenres.forEach(function(tvGenre) {  
            if (!allGenres.find(function(g) { return g.id === tvGenre.id; })) {  
                allGenres.push(tvGenre);  
            }  
        });  
        return allGenres;  
    };  
      
    window.genres_openGenre = openGenre;  
    window.genres_createGenresRow = createGenresRow;  
}    
      
    if (Lampa.Manifest.app_digital >= 300) {      
        if (window.appready) startPlugin();      
        else Lampa.Listener.follow('app', function (e) {      
            if (e.type === 'ready') startPlugin();      
        });      
    }      
})();