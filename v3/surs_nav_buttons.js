(function() {  
    'use strict';  
      
    // SVG иконки для кнопок  
    var buttonIcons = {  
        surs_select: '<svg fill="#ffffff" width="64px" height="64px" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M31.9981689,11.9995104 C33.4659424,11.9985117 34.998291,13.1328 34.998291,16.1348 L34.998291,16.1348 L34.998291,26 C34.998291,27.5134277 36.3779053,28.1114014 36.9779053,28.3114014 L36.9779053,28.3114014 L43.8,30.8 C46.7,31.9 48.5,35 47.7,38.2 L47.7,38.2 L44.5,48.5995 C44.3,49.3995 43.6,49.9995 42.7,49.9995 L42.7,49.9995 L26.6,49.9995 C25.8,49.9995 25.1,49.5995 24.8,48.8995 C20.9318685,39.9190553 18.7869873,34.9395752 18.3653564,33.9610596 C17.9437256,32.9825439 18.2219401,32.1955241 19.2,31.6 C21,30.3 23.7,31.6395508 24.8,33.5395508 L24.8,33.5395508 L26.4157715,35.7431828 C27.0515137,36.9508 29,36.9508 29,35.1508 L29,35.1508 L29,16.1348 C29,13.1328 30.5303955,12.0005117 31.9981689,11.9995104 Z M46,2 C48.2,2 50,3.8 50,6 L50,6 L50,21 C50,22.882323 48.1813389,25.0030348 46,25 L46,25 L40.010437,25 C39,25 39,24.1881157 39,24.059082 L39,15.5 C39,11.6547018 37.0187988,8 32,8 C26.9812012,8 25,11.1879783 25,15.5 L25,15.5 L25,24.059082 C25,24.4078007 24.7352295,25 23.987793,25 L23.987793,25 L6,25 C3.8,25 2,23.2 2,21 L2,21 L2,6 C2,3.8 3.8,2 6,2 L6,2 Z"></path> </g></svg>',
        surs_new: '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 346.374 346.375" xml:space="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g><path style="fill:#ffffff;" d="M325.772,254.84c0.4-0.731,0.767-1.498,1.149-2.241c0.875-1.682,1.744-3.362,2.556-5.066 c0.549-1.138,1.047-2.305,1.567-3.453c0.617-1.361,1.246-2.723,1.829-4.117c0.566-1.35,1.087-2.733,1.613-4.105 c0.479-1.224,0.978-2.459,1.429-3.705c0.521-1.43,0.989-2.871,1.47-4.317c0.412-1.241,0.841-2.465,1.224-3.711 c0.429-1.396,0.807-2.813,1.201-4.231c0.371-1.326,0.766-2.642,1.104-3.991c0.337-1.315,0.611-2.647,0.915-3.979 c0.343-1.453,0.686-2.905,0.983-4.381c0.251-1.212,0.435-2.436,0.657-3.659c0.286-1.601,0.589-3.202,0.829-4.82 c0.166-1.092,0.286-2.195,0.423-3.299c0.229-1.75,0.475-3.5,0.646-5.272c0.103-1.052,0.154-2.121,0.246-3.19 c0.137-1.807,0.303-3.597,0.389-5.421c0.086-1.646,0.098-3.305,0.126-4.969c0.022-1.195,0.091-2.382,0.091-3.588 c0-0.029,0-0.066,0-0.101c0-0.034,0-0.065,0-0.1c0-83.343-58.735-153.049-137.958-169.25c-0.108-0.02-0.206-0.048-0.314-0.072 c-2.281-0.463-4.58-0.86-6.901-1.235c-0.646-0.106-1.287-0.229-1.938-0.329c-1.83-0.274-3.694-0.492-5.547-0.706 c-1.086-0.132-2.161-0.277-3.259-0.389c-1.59-0.152-3.186-0.252-4.78-0.363c-1.327-0.095-2.637-0.215-3.978-0.274 c-0.177-0.006-0.357-0.029-0.54-0.034L170.634,0l0.194,0.352C128.987,0.917,90.705,16.394,61.043,41.713l0.375-1.898L47.423,54.659 c-0.04,0.04-0.078,0.088-0.117,0.128c-1.827,1.938-3.6,3.917-5.341,5.938c-0.052,0.063-0.103,0.123-0.157,0.186 c-1.71,1.993-3.368,4.023-4.983,6.095c-0.1,0.129-0.203,0.258-0.303,0.386c-1.524,1.958-3,3.948-4.44,5.972 c-0.191,0.277-0.386,0.546-0.583,0.821c-1.312,1.873-2.585,3.771-3.825,5.698c-0.292,0.458-0.586,0.906-0.872,1.358 c-1.106,1.755-2.185,3.536-3.231,5.341c-0.383,0.648-0.757,1.298-1.126,1.949c-0.923,1.639-1.821,3.291-2.693,4.958 c-0.443,0.843-0.872,1.692-1.304,2.542c-0.763,1.518-1.501,3.044-2.221,4.591c-0.48,1.029-0.94,2.062-1.404,3.097 c-0.62,1.412-1.224,2.821-1.815,4.251c-0.492,1.201-0.966,2.413-1.43,3.625c-0.497,1.304-0.995,2.616-1.464,3.934 c-0.486,1.358-0.94,2.728-1.392,4.105c-0.397,1.218-0.797,2.43-1.167,3.659c-0.46,1.521-0.883,3.051-1.304,4.583 c-0.306,1.106-0.609,2.222-0.892,3.34c-0.426,1.689-0.806,3.394-1.181,5.103c-0.223,0.998-0.452,1.993-0.652,2.999 c-0.375,1.884-0.7,3.777-1.012,5.675c-0.14,0.86-0.306,1.715-0.435,2.582c-0.32,2.119-0.578,4.257-0.812,6.393 c-0.077,0.674-0.177,1.341-0.24,2.016c-0.251,2.521-0.44,5.058-0.58,7.599c-0.017,0.314-0.052,0.632-0.071,0.955 c-0.14,2.862-0.22,5.732-0.22,8.617c0,0.031,0,0.06,0,0.089c0,0.028,0,0.06,0,0.094c0,95.408,77.622,173.036,173.033,173.036 c63.053,0,118.317-33.92,148.56-84.455c0.052-0.086,0.103-0.166,0.148-0.252C323.245,259.415,324.537,257.15,325.772,254.84z M334.327,181.284c-0.092,1.744-0.24,3.477-0.384,5.215c-0.074,0.938-0.12,1.876-0.217,2.808c-0.166,1.738-0.406,3.459-0.635,5.187 c-0.12,0.926-0.218,1.853-0.354,2.79c-0.246,1.636-0.549,3.254-0.847,4.872c-0.177,1.006-0.343,2.019-0.537,3.013 c-0.309,1.527-0.675,3.049-1.023,4.547c-0.252,1.08-0.475,2.161-0.743,3.23c-0.36,1.435-0.784,2.864-1.189,4.294 c-0.314,1.109-0.606,2.229-0.943,3.333c-0.436,1.401-0.915,2.797-1.384,4.181c-0.372,1.098-0.721,2.207-1.115,3.282 c-0.526,1.463-1.104,2.893-1.664,4.334c-0.389,0.972-0.761,1.955-1.155,2.928c-0.686,1.641-1.43,3.265-2.173,4.883 c-0.32,0.721-0.635,1.441-0.972,2.15c-0.961,2.023-1.979,4.025-3.036,6.016c-0.132,0.257-0.264,0.52-0.395,0.777 c-7.417,13.814-16.903,26.635-28.315,38.042c-30.5,30.505-70.995,47.305-114.018,47.305c-88.93,0-161.288-72.333-161.334-161.242 c0-0.123,0.006-0.246,0.006-0.374c0.006-3.831,0.2-7.637,0.475-11.431c0.068-0.929,0.129-1.855,0.209-2.779 c0.34-3.725,0.797-7.425,1.389-11.099c0.128-0.823,0.292-1.638,0.438-2.464c0.624-3.488,1.335-6.962,2.184-10.393 c0.106-0.409,0.183-0.838,0.289-1.247c0.966-3.765,2.09-7.481,3.325-11.161c0.229-0.684,0.457-1.375,0.697-2.062 c1.292-3.699,2.705-7.354,4.269-10.953c0.157-0.357,0.326-0.709,0.486-1.066c3.425-7.722,7.459-15.196,12.097-22.337 c0.069-0.111,0.14-0.223,0.211-0.329c2.387-3.659,4.923-7.236,7.622-10.721c0.492,2.854,1.278,5.621,2.348,8.303 c5.769,14.426,7.636,18.18,9.446,21.811c1.767,3.548,3.437,6.91,9.063,21.068c6.184,15.527,15.527,22.764,29.399,22.764 c2.822,0,5.509-0.258,8.117-0.509c3.611-0.357,7.353-0.637,9.746-0.117c7.691,1.693,12.889,5.043,17.068,7.731 c2.362,1.521,4.406,2.833,6.519,3.542c3.156,1.052,13.56,5.387,14.924,17.014c0.96,8.126,0.269,8.617-4.214,11.809 c-1.576,1.12-3.351,2.39-5.301,4.06c-7.928,6.77-5.475,14.924-3.682,20.858c1.043,3.472,2.027,6.736,1.664,10.133 c-1.172,11.059,8.319,13.157,15.947,14.844c6.81,1.51,16.145,3.58,26.371,10.613c8.451,5.809,9.458,8.977,9.572,9.812 c0.183,1.51-1.704,3.688-3.705,5.993c-1.704,1.955-3.614,4.162-4.929,6.764c-0.566,1.139-1.063,2.121-5.627,2.121 c-2.112,0-4.514-0.199-7.213-0.417c-3.793-0.303-8.102-0.646-13.068-0.646c-3.09,0-11.302,0-13.074,6.467 c-1.272,4.637,1.833,9.314,9.243,13.912c2.43,2.698,10.212,10.132,20.007,8.394c1.835-0.314,3.849-0.629,5.961-0.96 c7.785-1.225,16.603-2.607,23.687-4.986c3.02-1.018,6.296-2.482,9.767-4.025c7.153-3.191,15.25-6.816,25.205-8.635 c10.716-1.943,20.705-14.393,31.283-27.572c7.88-9.823,16.027-19.979,23.639-24.662c17.291-10.641,14.563-22.076,12.573-30.431 c-0.629-2.625-1.218-5.106-1.218-7.439c0-10.401-7.354-10.927-8.817-10.927c-2.807,0-5.563,1.201-8.485,2.476 c-2.79,1.218-5.97,2.597-8.56,2.597c-8.245,0-12.58-0.612-28.99-15.213c-12.311-10.979-14.141-12.088-19.893-15.015 c-2.002-1.013-4.586-2.322-8.691-4.712c-8.074-4.697-17.498-6.973-28.819-6.973c-3.019,0-5.78,0.152-8.153,0.286 c-1.578,0.089-2.963,0.169-4.092,0.169c-5.692,0-30.522-2.493-48.131-14.684c-7.388-5.118-23.772-16.465-24.49-21.917 c3.162,1.207,8.425,1.149,13.929,0.989c2.324-0.069,4.688-0.131,6.984-0.131c7.325,0,10.621,0.852,12.108,1.661 c-0.091,0.503-0.203,1.078-0.297,1.523c-0.68,3.308-1.609,7.84,1.644,11.093c4.446,4.457,12.554,5.118,16.994,5.118 c2.816,0,12.417-0.343,17.629-4.771c3.837-3.231,4.123-8.409,4.374-12.969c0.117-2.056,0.229-4.18,0.632-5.815 c0.909-3.605,0.601-7.459,0.234-11.925c-0.365-4.528-0.783-9.658-0.103-15.904c1.132-0.644,2.207-1.621,3.202-2.934 c1.35-1.778,5.98-3.531,10.441-5.218c5.077-1.918,10.841-4.091,16.524-7.645l1.532-0.955c9.424-5.873,11.825-7.811,10.201-17.638 c-0.137-0.854-0.303-1.821-0.457-2.928c-0.189-1.323-0.326-2.421-0.406-3.319h21.26l-24.199-11.173 c-1.949-0.9-19.252-8.852-25.233-10.35c-0.543-0.211-1.384-0.938-2.39-2.021c1.144,0.134,2.275,0.269,3.396,0.435 c0.829,0.117,1.658,0.22,2.481,0.352c2.265,0.354,4.518,0.755,6.759,1.212c0.188,0.04,0.383,0.068,0.583,0.108 c73.351,15.113,128.679,80.167,128.724,157.912c0,1.201-0.068,2.393-0.097,3.585C334.407,178.31,334.396,179.808,334.327,181.284z M192.051,26.572c3.105,0.777,12.202,4.666,19.207,7.811c0.04,1.896,0.258,4.28,0.692,7.354c0.171,1.212,0.354,2.262,0.503,3.179 c0.137,0.849,0.292,1.775,0.366,2.39c-0.949,0.743-3.031,2.044-5.209,3.402l-1.544,0.958c-4.706,2.939-9.887,4.897-14.461,6.625 c-5.112,1.933-9.675,3.659-13.138,6.533h-1.335c-5.421,0-5.89,4.206-6.667,11.173c-0.821,7.413-0.335,13.42,0.057,18.251 c0.283,3.431,0.523,6.393,0.083,8.143c-0.674,2.716-0.832,5.529-0.966,8.005c-0.089,1.587-0.218,3.911-0.521,4.872 c-1.29,0.789-4.943,1.81-9.792,1.81c-3.471,0-5.958-0.529-7.388-1.032c0.077-0.386,0.151-0.784,0.223-1.112 c0.666-3.245,1.498-7.285-1.118-10.51c-4.792-5.944-13.895-6.744-22.163-6.744c-2.413,0-4.883,0.068-7.325,0.14 c-2.262,0.063-4.492,0.129-6.604,0.129c-2.284,0-2.999-0.452-3.133-0.658c-1.424-2.095-3.262-3.162-5.458-3.162 c-3.559,0-5.081,2.284-7.839,6.418c-9.223,13.812,9.275,27.052,26.197,38.78c-2.536-1.018-5.352-1.938-8.491-2.622 c-3.743-0.826-8.466-0.581-13.397-0.106c-2.293,0.22-4.637,0.455-6.984,0.455c-5.99,0-12.863-1.187-18.515-15.382 c-5.807-14.615-7.582-18.18-9.46-21.957c-1.704-3.419-3.462-6.956-9.052-20.937c-2.144-5.352-2.619-11.084-1.586-17.414 c29.356-30.394,70.483-49.36,115.979-49.36c1.383,0,2.759,0.071,4.134,0.105C180.775,17.817,186.161,25.102,192.051,26.572z M204.179,257.082c-0.76-5.969-5.381-11.682-14.541-17.982c-12.104-8.32-23.16-10.768-30.474-12.38 c-2.564-0.571-5.689-1.27-6.856-1.898c0-0.074,0.006-0.166,0.017-0.274c0.615-5.752-0.883-10.738-2.09-14.752 c-1.878-6.233-1.698-7.074,0.083-8.601c1.644-1.406,3.156-2.47,4.477-3.419c6.736-4.792,10.71-8.721,9.054-22.709 c-1.724-14.689-12.934-23.455-22.849-26.757c-0.246-0.083-0.621-0.271-1.058-0.523c16.834,7.205,34.497,9.055,40.641,9.055 c1.317,0,2.913-0.089,4.754-0.188c2.173-0.123,4.712-0.269,7.491-0.269c9.326,0,16.604,1.709,22.929,5.386 c4.392,2.548,7.147,3.945,9.274,5.029c4.655,2.373,5.759,2.934,17.412,13.32c17.479,15.553,24.524,18.183,36.783,18.183 c5.044,0,9.59-1.989,13.243-3.579c0.309-0.126,0.641-0.274,0.972-0.423c0.212,2.996,0.869,5.786,1.476,8.303 c1.83,7.679,2.757,11.539-7.319,17.736c-9.343,5.741-18.137,16.709-26.64,27.304c-8.365,10.413-17.835,22.221-24.25,23.387 c-11.339,2.064-20.505,6.164-27.881,9.452c-3.34,1.498-6.233,2.785-8.726,3.613c-6.142,2.076-14.438,3.374-21.764,4.518 c-2.17,0.344-4.242,0.663-6.129,0.995c-4.174,0.681-8.459-3.625-9.621-5.032l-0.326-0.4c2.833,0.126,5.466,0.332,7.879,0.526 c3.051,0.246,5.767,0.458,8.162,0.458c3.233,0,11.803,0,16.103-8.589c0.641-1.292,1.927-2.773,3.293-4.334 C200.794,268.667,205.042,263.789,204.179,257.082z"></path><text x="50%" y="55%" font-family="Arial, sans-serif" font-size="29" font-weight="bold" fill="#000000" text-anchor="middle" dominant-baseline="middle">NEW</text></g></g></svg>',   
        
        surs_rus: '<svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 260 166" enable-background="new 0 0 260 166" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><polygon points="243.199,112.566 235.896,102.51 227.168,100.247 223.726,106.665 218.71,106.395 217.235,85.568 223.332,72.563 228.373,69.98 223.431,56.336 226.922,47.976 230.807,50.312 238.625,65.851 242.928,68.949 258,72.66 245.928,52.033 238.675,52.77 233.659,48.344 233.683,36.961 227.856,22.331 220.406,17.831 217.456,12.299 221.586,6.57 214.407,2.096 213.079,9.152 203.589,19.134 200.368,28.871 201.622,33.937 192.918,42.984 190.509,49.598 185.001,50.065 178.043,56.213 179.149,61.277 172.757,70.006 168.134,64.99 162.848,69.367 150.112,72.047 149.907,72.438 148.416,62.924 143.646,63.269 128.598,69.857 125.328,75.882 119.059,76.397 115.789,80.21 109.789,80.799 105.954,76.102 96.684,85.691 79.646,76.725 56.386,71.48 52.477,73.423 57.05,63.785 57.02,63.678 59.853,70.62 67.205,70.448 65.262,54.836 59.632,54.393 45.814,64.792 44.634,68.629 33.865,71.063 29.046,69.39 20.465,75.242 21.817,80.947 13.9,98.182 17.539,110.624 7.95,113.598 2,114.238 2.86,125.154 10.409,138.333 12.179,145.783 18.104,135.087 21.227,134.227 26.489,135.456 26.71,124.883 32.217,122.007 46.052,124.576 59.036,138.117 66.737,131.522 86.678,135.309 91.005,143.52 96.611,142.611 104.11,156.01 114.068,157.928 121.985,163.904 132.975,158.445 147.063,160.633 149.866,151.88 158.054,153.158 162.529,156.355 172.535,154.143 180.625,154.314 187.435,147.257 196.434,145.783 198.081,141.529 198.647,128.915 206.638,125.424 216.62,131.62 224.832,129.137 228.299,131.522 233.167,123.777 236.585,128.768 239.855,141.676 244.034,140.053 246.272,134.055 "></polygon><text x="130" y="125" font-family="Arial, sans-serif" font-size="47" font-weight="bold" fill="black" text-anchor="middle">NEW</text></g></svg>',
        
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
