// all the svg images
const images = {
   "blank": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
   </svg>`,
   "controlIcon--up": `
   <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
     <path class="controlIcon" d="M 20,80 50,20 80,80" />
   </svg>`,
   "controlIcon--right": `
   <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
     <path class="controlIcon" d="M 20,20 80,50 20,80" />
   </svg>`,
   "controlIcon--down": `
   <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
     <path class="controlIcon" d="M 20,20 50,80 80,20" />
   </svg>`,
   "controlIcon--left": `
   <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
     <path class="controlIcon" d="M 80,20 20,50 80,80" />
   </svg>`,
   "hole": `  
   <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
     <path class="patchMud" d="M 10,50 30,20 50,20 80,40 90,60 80,90 60,85 45,96 20,80 z" />
   </svg>`,
   "spud_001": `<svg
viewBox="0 0 150 150"
xmlns:xlink="http://www.w3.org/1999/xlink"
xmlns="http://www.w3.org/2000/svg>

<defs
id="defs2251">
<radialGradient
   xlink:href="#linearGradient2191"
   id="radialGradient2193-1"
   cx="1049.4965" cy="302.25604" fx="1049.4965" fy="302.25604" r="192.02896"
   gradientTransform="matrix(0.43400366,-0.27380901,0.16554025,0.23447946,-441.7797,257.58275)"
   gradientUnits="userSpaceOnUse" />
<linearGradient
   id="linearGradient2191">
   <stop style="stop-color:#fffff9;stop-opacity:1;" offset="0" />
   <stop style="stop-color:#9a7200;stop-opacity:0;" offset="1" />
</linearGradient>
</defs>
<path
   style="fill:#000000;fill-opacity:0.958763;stroke-width:0.223754"
   d="M 45.501975,25.716565 C 75.467638,-14.447889 130.93383,-1.1089426 116.67001,41.934137 102.40619,84.977207 95.5579,95.409597 60.413561,99.811747 25.269248,104.2139 7.210917,102.58581 1.8797825,64.774108 -3.9392515,23.501953 45.501975,25.716565 45.501975,25.716565 Z" />
<path
   style="fill:#spudColor;fill-opacity:1;stroke-width:0.200005"
   d="M 47.529268,28.263926 C 74.926777,-6.8352696 125.63933,4.8214624 112.59799,42.43625 99.556627,80.051037 93.295263,89.167757 61.162887,93.014747 29.030549,96.861717 12.519874,95.438957 7.6456327,62.395805 2.3253095,26.328605 47.529268,28.263926 47.529268,28.263926 Z" />
<path
   style="fill:url(#radialGradient2193-1);fill-opacity:1;stroke-width:0.199041"
   d="M 46.760625,28.357387 C 74.158162,-6.4041256 124.87071,5.1404604 111.82935,42.393361 98.787986,79.646257 92.526595,88.675277 60.394246,92.485247 28.261908,96.295217 11.751233,94.886137 6.8769917,62.16089 1.5566655,26.440685 46.760625,28.357387 46.760625,28.357387 Z" />
</svg>
`

}

// temp
const circles = `<svg width="100%" height="100%" viewBox="0 0 100 100" 
  xmlns="http://www.w3.org/2000/svg" 
  xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <radialGradient id="potato_001">
            <stop offset="10%" stop-color="wheat" />
            <stop offset="95%" stop-color="chocolate" />
        </radialGradient>
        <radialGradient id="potato_002">
            <stop offset="10%" stop-color="powderblue" />
            <stop offset="95%" stop-color="navyblue" />
        </radialGradient>        
    </defs>

    <!-- using my radial gradient -->
    <circle cx="10" cy="20" r="10" fill="url('#potato_002')" />
    <circle cx="15" cy="20" r="11" fill="url('#potato_002')" />
    <circle cx="20" cy="20" r="9" fill="url('#potato_002')" />

    <circle cx="80" cy="80" r="10" fill="url('#potato_001')" />
    <circle cx="70" cy="80" r="10" fill="url('#potato_001')" />
</svg>    `;


