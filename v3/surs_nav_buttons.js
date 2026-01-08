(function() {  
    'use strict';  
      
    // SVG иконки для кнопок  
    var buttonIcons = {  
        surs_select: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',  
        surs_new: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 18 21 18 11 2 13 2"/></svg>',  
        surs_rus: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z"/><path fill="#fff" d="M3 9h18v6H3z"/><path fill="#fc0" d="M3 3h18v6H3z"/></svg>',  
        surs_kids: '<svg viewBox="0 0 960 960" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .st0{display:none;} .st1{display:inline;opacity:0.93;} .st2{display:inline;fill:none;stroke:#fff9f9;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st3{display:inline;} .st4{fill:none;stroke:#fff9f9;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st5{display:inline;fill:none;stroke:#1A1D3F;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st6{fill:#DDEDE7;} .st7{fill:#1A1D3F;} .st8{fill:#E9B44D;} .st9{fill:#ED644E;} .st10{fill:#494EDF;} .st11{fill:#3DC5A1;} .st12{fill:#F6CEC1;} .st13{fill:none;} .st14{fill:none;stroke:#1A1D3F;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{display:inline;fill:#E9B44D;} .st16{fill:#222222;} .st17{display:inline;fill:#222222;} </style> <g class="st0" id="guide"></g> <g class="st0" id="sketch"></g> <g class="st0" id="stroke"> <path class="st2" d="M293.9,473.8c-17.9,36.4-43.7,130-36.5,195.4"></path> <path class="st2" d="M382.8,275.9c11.6,4.8,14.2,23,4.6,30.9c-9.7,7.9-27,1.7-29.4-10.5s11.2-24.6,23.1-21"></path> <path class="st2" d="M325.2,668.6c-35.8-1-60.2,1.6-96.5,0.4c0-29.2-16.5-40.3-35.4-42.2s-36.7,11.5-45.5,28.3 c-8.8,16.8-9.3,37.4-9.8,56.4c-0.5,18.3,4.5,62.5,12.1,79.1c20.5,44.4,68.6,22.6,93.1,22.2c107.5-2,407.5-16.4,570.1-9.1 c69.3,3.1,57.4-35.6,10.9-54.1c-30-11.9-88.7-42.2-109.6-65.9c-28-31.7-119-217.4-126.3-271.3c-7.2-53.9-14.2-115.9-52.5-154.5 c-42.4-42.6-76.9-54.7-136.9-57.8c-56.3-2.9-115.3,6.1-161.9,37.8s-78.2,89.4-67.7,144.8s74.1,86.4,124.8,91"></path> <path class="st2" d="M396.8,487.3c-7.7,12.7-20.9,21.1-32.9,30.1s-23.8,20.2-26.4,34.8c-3.4,19,11.2,38.3,29.9,44.2 c18.7,5.9,39.8,0.4,56-10.5c16.2-11,28.3-26.8,38.9-43.1"></path> <path class="st2" d="M256.7,226.1C256.7,226.1,256.7,226.1,256.7,226.1c2.6-18.2,6.7-36.2,12-53.8c4.1-13.4,11.4-28.6,25.2-30.6 c7.6-1.1,15.3,2.5,20.9,7.7c5.7,5.2,9.6,11.9,13.5,18.6c6.5,11,12.9,22.1,19.4,33.1"></path> <path class="st2" d="M429.1,202.8c9.8-16.7,23.5-31.3,39.8-41.9c7.4-4.8,16.6-8.9,24.7-5.4c9,4,11.8,15.3,12.9,25.1 c2,17.4,2.3,35.1,1,52.6"></path> <path class="st2" d="M552.5,279.1c16.2-5.5,33-8.9,50-10.3c11.3-0.9,24.5,0,31,9.2c7.2,10.2,1.9,24.3-4.6,35 c-12.3,20.3-28.5,38.2-47.4,52.6"></path> <path class="st2" d="M590,422c13.9-0.9,27.8-1.7,41.7-2.6c8.3-0.5,16.8-1,24.8,1.4c8,2.4,15.4,8.4,17.1,16.6 c2.1,10.4-5.3,20.1-12.2,28.2c-12.9,15-25.8,30-38.7,45"></path> <path class="st2" d="M654.3,578.6c12.3-3.5,24.8-6,37.5-7.3c12-1.2,26.4-0.2,32.4,10.2c6.1,10.6-0.7,23.7-7.4,34 c-7.9,12.1-15.7,24.2-23.6,36.3"></path> <path class="st2" d="M742.6,706.7c5.6-3.4,11.1-6.9,16.7-10.3c9.2-5.7,20-11.5,30.1-8.1c10.7,3.6,15.6,15.9,17.2,27.1 c1.3,8.8,1.2,17.8,0,26.7"></path> </g> <g id="outline"> <path d="M367.5,316.2c3.2,1.1,6.4,1.7,9.5,1.7c5.6,0,10.9-1.8,15.2-5.3c6.6-5.4,9.7-14.2,8.3-23.5c-1.4-9.3-6.9-16.8-14.8-20.1 c-0.4-0.2-2-0.7-2.4-0.9c-8.2-2.5-17.2-0.2-24.2,6.1c-7,6.3-10.2,15.1-8.5,23.5S358.6,313,367.5,316.2z M369.2,285.4 c1.9-1.7,4.7-3.2,7.5-3.2c1.6,0,2.8,0.5,3.2,0.7c3.7,1.8,5.2,5.3,5.7,8.4c0.5,3.1-0.1,7.3-3,9.7c-2.9,2.4-7.2,2.1-10.1,1 c-3-1.1-6.4-3.5-7.2-7.2C364.6,291.1,366.9,287.5,369.2,285.4z M826.9,742.6c-3.8-1.5-7.9-3.2-12.1-5.1c0.7-7.8,0.5-15.6-0.6-23.2 c-2.5-17.1-10.6-29.1-22.2-33.1c-14.4-4.9-28.8,4-36.5,8.8c-4,2.5-8.1,5-12.1,7.5l-0.5,0.3c-9.5-6.6-17.5-13.1-22.7-19.1 c-4.4-5-10.7-14.3-18-26.6l21.1-32.4c7.8-12,15.7-27.7,7.6-41.8c-4.4-7.8-14.9-16.5-39.7-14c-11,1.1-22,3.1-32.8,5.9 c-9.3-19-18.5-38.7-26.9-57.8c11.5-13.3,22.9-26.6,34.4-39.9l1.3-1.6c5.9-6.9,16.9-19.6,13.9-34.6c-2.1-10.2-10.6-18.7-22.2-22.3 c-9.4-2.9-19-2.3-27.5-1.7c-11.7,0.7-23.5,1.4-35.2,2.2c-0.2-0.9-0.3-1.9-0.4-2.7l-0.8-6.1c-1.6-11.9-3.2-24.2-5.2-36.4 c18.3-14.5,33.6-32,45.7-51.9c10.5-17.3,12-32.2,4.3-43.2c-6.9-9.8-19.3-13.9-37.7-12.4c-15.7,1.3-31.3,4.3-46.3,8.9 c-4.3-6.3-9.1-12.2-14.6-17.7c-8.8-8.9-17.3-16.4-25.7-22.9c1-16.7,0.6-33.4-1.3-49.9c-0.7-6.1-2.8-24.7-17.4-31.1 c-9-3.9-19.7-1.9-31.8,6c-15.7,10.2-29.3,24-39.5,40.1c-8-0.9-16.7-1.6-26.2-2.1c-16.3-0.8-32.1-0.6-47.2,0.5l-4.4-7.5 c-4.2-7.2-8.4-14.3-12.6-21.5c-3.9-6.7-8.4-14.3-14.9-20.3c-8-7.4-17.9-10.9-27.1-9.6c-14.2,2-24.7,14.1-31.3,35.8 c-5.1,16.7-9,33.9-11.7,51.2c-6,3.2-11.7,6.7-17.2,10.4c-24.4,16.6-45,40.2-57.8,66.4c-13.8,28.3-18.3,58-13,86 c10.2,53.5,66.9,87.6,121.1,95.8c-18,42.1-37.7,121.9-33.6,181.8c-4.3,0-8.8,0-13.5-0.1c-2.4-24.6-17.3-39.9-41.8-42.3 c-17-1.7-39.9,7.7-52.8,32.3c-9.5,18-10.1,39.7-10.7,58.8l0,0.9c-0.5,18.1,4.4,64.3,12.8,82.5c12,26,32.4,32.2,52.2,32.2 c10.6,0,21.1-1.8,30-3.3c6.7-1.2,13-2.3,17.8-2.3c28.2-0.5,69.9-1.9,118.3-3.5c140-4.6,331.7-11,451.3-5.6 c19.1,0.9,51.7-0.9,56.2-22C872.7,772.8,855.7,754.1,826.9,742.6z M763.2,702.8c7.8-4.8,16.7-9.8,23.8-7.4c2.3,0.8,9.8,4.6,12.2,21 c0.7,4.7,0.9,9.4,0.8,14.2c-14.3-7-29.7-15.3-43.4-23.8C758.8,705.5,761,704.1,763.2,702.8z M692.7,578.8c7.6-0.8,20.9-1,25.1,6.5 c2,3.5,3.4,9.9-7.2,26.2l-16.9,26c-8.8-15.6-18.6-34.2-28.6-54C674.2,581.3,683.4,579.7,692.7,578.8z M632.2,426.9 c7.6-0.5,15.4-1,22.2,1.1c5.1,1.6,10.8,5.5,11.9,10.9c1.4,7.1-4.7,15-10.5,21.8l-1.3,1.6c-9.9,11.5-19.7,22.9-29.6,34.4 c-11.1-26-20.1-49.9-25.2-67.8C610.4,428.2,621.3,427.6,632.2,426.9z M603.1,276.3c12.5-1,20.7,1,24.2,6.1c5.3,7.6-0.8,20-4.9,26.8 c-9.6,15.8-21.9,30.4-36,42.7c-4.8-24-11.5-47.6-22.8-68.3C576.6,279.8,589.8,277.4,603.1,276.3z M473,167.3 c5.2-3.4,12.5-7,17.6-4.8c4.5,2,7.3,8.2,8.5,19.1c1.4,12.6,2,25.3,1.6,38c-7.8-4.9-15.8-8.9-24.1-12.3c-10.7-4.4-22-7.6-34.9-10 C450.3,185.4,460.9,175.1,473,167.3z M275.9,174.5c4.8-15.7,11.2-24.2,19.1-25.4c4.6-0.7,10.2,1.5,14.8,5.8 c4.9,4.5,8.6,10.8,12.1,16.8c4.2,7.2,8.4,14.3,12.6,21.5l1,1.7c-25.1,3.3-48.3,9.4-69.1,18.4C268.8,200.2,272,187.2,275.9,174.5z M854.5,786c-0.9,4.4-10.6,11.5-40.9,10.1c-120.3-5.4-312.3,1-452.5,5.6c-48.3,1.6-89.9,3-118,3.5c-5.9,0.1-12.8,1.3-20.1,2.6 c-29.7,5.1-53.4,6.9-66-20.4c-6.8-14.8-12-57.7-11.4-75.8l0-0.9c0.5-18.3,1.1-37.2,8.9-52.2c6.8-12.9,21.6-26,38.1-24.3 c19,1.9,28.6,13.5,28.6,34.7c0,4,3.2,7.4,7.3,7.5c18.7,0.6,34.4,0.2,49.6-0.2c14.5-0.4,29.5-0.7,46.9-0.2c0.1,0,0.1,0,0.2,0 c4,0,7.4-3.2,7.5-7.3c0.1-4.1-3.1-7.6-7.3-7.7c-17.8-0.5-33-0.1-47.7,0.2c-4.4,0.1-8.9,0.2-13.4,0.3 c-4.6-64.2,20.3-151.9,36.4-184.5c3.5-6.2,2-10.1-6.1-10.8c-25.9-2.4-52.9-11.6-74.1-25.3c-17-11-38.5-30.3-44-59.7 c-4.7-24.8-0.7-51.3,11.7-76.6c11.7-23.9,30.5-45.5,52.8-60.6c40-27.1,94.4-39.7,157.3-36.5c11,0.6,20.7,1.4,29.6,2.6 c0.1,0,0.2,0,0.3,0c16.6,2.3,30.2,5.8,42.7,10.9c11,4.5,21.4,10.3,31.9,18c0.1,0,0.1,0.1,0.2,0.1c8.9,6.5,17.9,14.4,27.3,23.9 c35.1,35.3,42.8,93.1,49.6,144l0.8,6.1c0.4,3.1,1.1,6.5,2,10.3c0,0.1,0,0.2,0.1,0.3c12.4,52.8,68,169.9,103.6,230.8 c0.2,0.6,0.6,1.1,1,1.7c8.7,14.9,16.2,26.2,21.5,32.1c6.8,7.7,17.2,16,29.3,24.1c0.2,0.1,0.4,0.3,0.6,0.4 c26.3,17.6,60.4,34.6,82.6,43.4C846.1,766.4,855.8,780,854.5,786z M468.7,546.9c-10.1,15.5-22.8,32.9-41,45.2 c-13.8,9.3-29.4,14.2-44.1,14.2c-6.4,0-12.6-0.9-18.4-2.8c-23.3-7.4-39-31-35.1-52.7c3.2-17.8,17.3-30.5,29.3-39.5 c1.9-1.4,3.8-2.9,5.8-4.3c10-7.4,19.5-14.3,25.2-23.7c2.2-3.5,6.8-4.7,10.3-2.5s4.7,6.8,2.5,10.3c-7.3,12-18.4,20.2-29.2,28.1 c-1.9,1.4-3.8,2.8-5.6,4.2c-9.7,7.4-21.2,17.4-23.5,30.2c-2.6,14.3,8.8,30.7,24.8,35.7c15.1,4.8,33.6,1.2,49.6-9.6 c16-10.8,27.6-26.8,36.8-41c2.3-3.5,6.9-4.5,10.4-2.2C470,538.8,470.9,543.5,468.7,546.9z"></path> </g> <g class="st0" id="flat"> <g class="st3"> <g> <g> <g> <g> <g> <g> <g> <g> <g> <path class="st8" d="M316.3,148.2c-5.6-5.2-13.3-8.8-20.9-7.8c-13.9,1.9-21.2,17.1-25.4,30.5 c-5.5,17.6-9.6,36.4-12.3,54.6c0,0.7,91.8-24.7,91.8-24.7c-6.4-11.1-13.4-22.9-19.8-34 C325.9,160.2,322,153.5,316.3,148.2z"></path> </g> </g> </g> </g> </g> </g> </g> </g> <g> <g> <g> <g> <g> <g> <g> <g> <path class="st8" d="M495,155.4c-8-3.5-17.3,0.5-24.7,5.3c-16.3,10.5-30.7,25.5-40.6,42.2l78.9,30.2 c1.4-17.5,1.2-35.1-0.7-52.6C506.8,170.7,504.1,159.4,495,155.4z"></path> </g> </g> </g> </g> </g> </g> </g> </g> <g> <g> <g> <g> <g> <g> <g> <g> <path class="st8" d="M629.6,313.5c6.5-10.6,11.9-24.7,4.8-35c-6.5-9.3-19.7-10.2-30.9-9.4c-17,1.3-34.7,4.7-50.9,10.1 l29,87.1C600.6,352.1,617.1,333.7,629.6,313.5z"></path> </g> </g> </g> </g> </g> </g> </g> </g> <g> <g> <g> <g> <g> <g> <g> <g> <path class="st8" d="M673.6,438.2c-1.6-8.2-9-14.2-17-16.7c-8-2.5-16.5-2-24.8-1.6c-13.9,0.8-27.8,1.6-41.7,2.4 c-2.4,34.3,11.3,62.9,32.2,88.8c13-14.9,26-29.8,38.9-44.8C668.2,458.3,675.7,448.6,673.6,438.2z"></path> </g> </g> </g> </g> </g> </g> </g> </g> <g> <g> <g> <g> <g> <g> <g> <g> <path class="st8" d="M691.2,572.1c-12.7,1.2-25.3,3.6-37.6,7.1l38.6,73.5c7.9-12.1,15.8-24.1,23.8-36.2 c6.7-10.2,13.6-23.3,7.6-34C717.7,572.1,703.2,571,691.2,572.1z"></path> </g> </g> </g> </g> </g> </g> </g> </g> <g> <g> <g> <g> <g> <g> <g> <g> <path class="st8" d="M805.3,716.8c-1.6-11.2-6.4-23.5-17.1-27.2c-10.2-3.5-21,2.3-30.2,7.9c-5.6,3.4-11.2,6.8-16.7,10.2 l63.9,35.7C806.4,734.6,806.5,725.6,805.3,716.8z"></path> </g> </g> </g> </g> </g> </g> </g> </g> </g> <g> <g> <g> <g> <g> <g> <g> <g> <path class="st11" d="M228.6,669c0-29.2-16.5-40.3-35.4-42.2s-36.7,11.5-45.5,28.3c-8.8,16.8-9.3,37.4-9.8,56.4 c-0.5,18.3,4.5,62.5,12.1,79.1c20.5,44.4,68.6,22.6,93.1,22.2c107.5-2,407.5-16.4,570.1-9.1c69.3,3.1,57.4-35.6,10.9-54.1 c-30-11.9-88.7-42.2-109.6-65.9c-28-31.7-119-217.4-126.3-271.3c-7.2-53.9-14.2-115.9-52.5-154.5 c-42.4-42.6-76.9-54.7-136.9-57.8c-56.3-2.9-115.3,6.1-161.9,37.8s-78.2,89.4-67.7,144.8s74.1,86.4,124.8,91 c-17.9,36.4-43.7,130-36.5,195.4L228.6,669z"></path> </g> </g> </g> </g> </g> </g> </g> </g> <g> <g> <g> <g> <g> <g> <g> <g> <path class="st7" d="M382.8,275.9l-1.7-0.6c-12-3.6-25.6,8.7-23.1,21c2.4,12.3,19.7,18.5,29.4,10.5 C397.1,298.9,394.4,280.7,382.8,275.9z"></path> </g> </g> </g> </g> </g> </g> </g> </g> <g> <g> <g> <g> <g> <g> <g> <g> <path class="st7" d="M383.6,606.3c-6.4,0-12.6-0.9-18.4-2.8c-23.3-7.4-39-31-35.1-52.7c3.2-17.8,17.3-30.5,29.3-39.5 c1.9-1.4,3.8-2.9,5.8-4.3c10-7.4,19.5-14.3,25.2-23.7c2.2-3.5,6.8-4.7,10.3-2.5s4.7,6.8,2.5,10.3 c-7.3,12-18.4,20.2-29.2,28.1c-1.9,1.4-3.8,2.8-5.6,4.2c-9.7,7.4-21.2,17.4-23.5,30.2c-2.6,14.3,8.8,30.7,24.8,35.7 c15.1,4.8,33.6,1.2,49.6-9.6c16-10.8,27.6-26.8,36.8-41c2.3-3.5,6.9-4.5,10.4-2.2c3.5,2.3,4.5,6.9,2.2,10.4 c-10.1,15.5-22.8,32.9-41,45.2C413.9,601.5,398.3,606.3,383.6,606.3z"></path> </g> </g> </g> </g> </g> </g> </g> </g> <g> <g> <g> <g> <g> <g> <g> <g> <path class="st7" d="M257.4,676.7c-4.1,0-7.4-3.3-7.5-7.4c-0.1-4.1,3.3-7.5,7.4-7.6c6.8-0.1,13-0.2,19-0.3 c14.4-0.3,28.1-0.6,49-0.3c4.1,0.1,7.5,3.5,7.4,7.6c-0.1,4.1-3.4,7.4-7.5,7.4c0,0-0.1,0-0.1,0c-20.7-0.3-34.2,0-48.5,0.3 C270.6,676.5,264.4,676.6,257.4,676.7C257.5,676.7,257.4,676.7,257.4,676.7z"></path> </g> </g> </g> </g> </g> </g> </g> </g> </g> </g> <g class="st0" id="colored_x5F_line"> <g class="st3"> <g> <path class="st8" d="M228.6,669c0-29.2-16.5-40.3-35.4-42.2s-36.7,11.5-45.5,28.3c-8.8,16.8-9.3,37.4-9.8,56.4 c-0.5,18.3,4.5,62.5,12.1,79.1c20.5,44.4,68.6,22.6,93.1,22.2c107.5-2,407.5-16.4,570.1-9.1c69.3,3.1,57.4-35.6,10.9-54.1 c-30-11.9-88.7-42.2-109.6-65.9c-28-31.7-119-217.4-126.3-271.3c-7.2-53.9-14.2-115.9-52.5-154.5 c-42.4-42.6-76.9-54.7-136.9-57.8c-56.3-2.9-115.3,6.1-161.9,37.8s-78.2,89.4-67.7,144.8s74.1,86.4,124.8,91 c-17.9,36.4-43.7,130-36.5,195.4L228.6,669z"></path> </g> </g> <g class="st3"> <g> <path class="st16" d="M382.8,275.9l-1.7-0.6c-12-3.6-25.6,8.7-23.1,21c2.4,12.3,19.7,18.5,29.4,10.5 C397.1,298.9,394.4,280.7,382.8,275.9z"></path> </g> </g> <g class="st3"> <g> <path class="st16" d="M383.6,606.3c-6.4,0-12.6-0.9-18.4-2.8c-23.3-7.4-39-31-35.1-52.7c3.2-17.8,17.3-30.5,29.3-39.5 c1.9-1.4,3.8-2.9,5.8-4.3c10-7.4,19.5-14.3,25.2-23.7c2.2-3.5,6.8-4.7,10.3-2.5s4.7,6.8,2.5,10.3c-7.3,12-18.4,20.2-29.2,28.1 c-1.9,1.4-3.8,2.8-5.6,4.2c-9.7,7.4-21.2,17.4-23.5,30.2c-2.6,14.3,8.8,30.7,24.8,35.7c15.1,4.8,33.6,1.2,49.6-9.6 c16-10.8,27.6-26.8,36.8-41c2.3-3.5,6.9-4.5,10.4-2.2c3.5,2.3,4.5,6.9,2.2,10.4c-10.1,15.5-22.8,32.9-41,45.2 C413.9,601.5,398.3,606.3,383.6,606.3z"></path> </g> </g> <g class="st3"> <g> <path class="st16" d="M257.4,676.7c-4.1,0-7.4-3.3-7.5-7.4c-0.1-4.1,3.3-7.5,7.4-7.6c6.8-0.1,13-0.2,19-0.3 c14.4-0.3,28.1-0.6,49-0.3c4.1,0.1,7.5,3.5,7.4,7.6c-0.1,4.1-3.4,7.4-7.5,7.4c0,0-0.1,0-0.1,0c-20.7-0.3-34.2,0-48.5,0.3 C270.6,676.5,264.4,676.6,257.4,676.7C257.5,676.7,257.4,676.7,257.4,676.7z"></path> </g> </g> <g class="st3"> <path class="st16" d="M256.7,233.6c-4.1,0-7.5-3.4-7.5-7.5v0c0-0.4,0-0.7,0.1-1.1c2.7-18.5,6.8-37,12.3-54.9 c6.6-21.8,17.2-33.8,31.3-35.8c9.2-1.3,19.1,2.2,27.1,9.6c6.5,6,11,13.6,14.9,20.3c4.2,7.2,8.4,14.3,12.6,21.5l6.8,11.6 c2.1,3.6,0.9,8.2-2.7,10.3c-3.6,2.1-8.2,0.9-10.3-2.7l-6.8-11.6c-4.2-7.2-8.4-14.3-12.6-21.5c-3.6-6.1-7.2-12.3-12.1-16.8 c-4.6-4.3-10.2-6.4-14.8-5.8c-7.9,1.1-14.3,9.7-19.1,25.4c-5.2,17.2-9.2,34.9-11.8,52.6C263.6,230.8,260.5,233.6,256.7,233.6z"></path> </g> <g class="st3"> <path class="st16" d="M507.5,240.8c-0.2,0-0.4,0-0.6,0c-4.1-0.3-7.2-3.9-6.9-8c1.3-17.1,1-34.3-1-51.2c-1.2-10.9-4-17.1-8.5-19.1 c-5-2.2-12.4,1.4-17.6,4.8c-15.1,9.9-28.1,23.5-37.4,39.4c-2.1,3.6-6.7,4.8-10.3,2.7c-3.6-2.1-4.8-6.7-2.7-10.3 c10.5-17.9,25.1-33.2,42.2-44.3c12.1-7.9,22.8-9.9,31.8-6c14.6,6.4,16.7,25,17.4,31.1c2,17.8,2.4,36,1,54 C514.7,237.8,511.4,240.8,507.5,240.8z"></path> </g> <g class="st3"> <path class="st16" d="M581.5,373.1c-2.3,0-4.5-1-6-3c-2.5-3.3-1.9-8,1.4-10.5c18.1-13.7,33.8-31.2,45.6-50.5 c4.1-6.8,10.2-19.2,4.9-26.8c-3.5-5-11.7-7.1-24.2-6.1c-16.4,1.3-32.6,4.7-48.3,10c-3.9,1.3-8.2-0.8-9.5-4.7s0.8-8.2,4.7-9.5 c16.8-5.7,34.2-9.3,51.8-10.7c18.5-1.5,30.8,2.6,37.7,12.4c7.7,11,6.2,25.9-4.3,43.2c-12.9,21.2-29.5,39.6-49.3,54.7 C584.6,372.6,583.1,373.1,581.5,373.1z"></path> </g> <g class="st3"> <path class="st16" d="M622.7,518.1c-1.7,0-3.5-0.6-4.9-1.8c-3.1-2.7-3.5-7.4-0.8-10.6c12.5-14.5,24.9-28.9,37.4-43.4l1.3-1.6 c5.9-6.8,12-14.7,10.5-21.8c-1.1-5.4-6.8-9.4-11.9-10.9c-6.8-2.1-14.6-1.6-22.2-1.1c-13.9,0.8-27.8,1.7-41.7,2.6 c-4.2,0.2-7.7-2.9-7.9-7s2.9-7.7,7-7.9c13.9-0.9,27.8-1.7,41.7-2.6c8.5-0.5,18.1-1.1,27.5,1.7c11.6,3.5,20.1,12.1,22.2,22.3 c3,14.9-8,27.7-13.9,34.6l-1.3,1.6c-12.5,14.5-24.9,28.9-37.4,43.4C626.9,517.2,624.8,518.1,622.7,518.1z"></path> </g> <g class="st3"> <path class="st16" d="M693.3,659.4c-1.4,0-2.8-0.4-4.1-1.2c-3.5-2.3-4.5-6.9-2.2-10.4l23.6-36.3c10.6-16.3,9.2-22.8,7.2-26.2 c-4.3-7.5-17.6-7.3-25.1-6.5c-12.2,1.3-24.4,3.6-36.2,7c-4,1.1-8.1-1.2-9.3-5.1c-1.1-4,1.2-8.1,5.1-9.3 c12.7-3.6,25.8-6.2,38.8-7.5c24.8-2.6,35.2,6.2,39.7,14c8.1,14.2,0.2,29.8-7.6,41.8L699.6,656 C698.2,658.2,695.8,659.4,693.3,659.4z"></path> </g> <g class="st3"> <path class="st16" d="M806.7,749.5c-0.4,0-0.7,0-1.1-0.1c-4.1-0.6-7-4.4-6.4-8.5c1.2-8.2,1.2-16.5,0-24.5 c-2.4-16.5-10-20.3-12.2-21c-7.1-2.4-16,2.5-23.8,7.4c-4,2.5-8,5-12.1,7.5l-4.6,2.9c-3.5,2.2-8.1,1.1-10.3-2.4 c-2.2-3.5-1.1-8.1,2.4-10.3l4.6-2.9c4-2.5,8.1-5,12.1-7.5c7.7-4.8,22.1-13.7,36.5-8.8c11.7,4,19.8,16,22.2,33.1 c1.4,9.4,1.4,19.1,0,28.8C813.5,746.8,810.3,749.5,806.7,749.5z"></path> </g> </g> </g></svg>'  
    };  
      
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
                /* Mobile styles */  
                @media screen and (max-width: 767px) {  
                    .card--button-compact {  
                        width: 9em !important;  
                    }  
                    /* Hide button labels on mobile */  
                    .card__button-label {  
                        display: none !important;  
                    }  
                    /* Reduce row height */  
                    .items-line {  
                        padding-bottom: 0.1em !important;  
                    }  
                    .card__svg-icon {  
                        position: absolute;  
                        top: 50%;  
                        left: 50%;  
                        transform: translate(-50%, -50%);  
                        width: 55% !important;  
                        height: 55% !important;  
                        display: flex;  
                        align-items: center;  
                        justify-content: center;  
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
                /*
                .card__svg-icon svg path,  
                .card__svg-icon svg polygon,  
                .card__svg-icon svg circle {  
                    fill: rgba(255, 255, 255, 0.8) !important;  
                }  
                */
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
        window.getCustomButtonsRow = function(partsData) {  
            addCustomButtonsRow(partsData);  
        };  
        // Используем подход из рабочего примера  
        Lampa.ContentRows.add({  
            index: 0,  
            name: 'surs_buttons',  
            title: '',  
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