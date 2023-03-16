// all the svg images
const images = {
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
   "hole": `<svg
   viewBox="0 0 100 100"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="linearGradient20749">
      <stop
         style="stop-color:#000000;stop-opacity:1;"
         offset="0"
         id="stop20745" />
      <stop
         style="stop-color:#311900;stop-opacity:1;"
         offset="1"
         id="stop20747" />
    </linearGradient>
    <inkscape:path-effect
       effect="bspline"
       id="path-effect19964"
       is_visible="true"
       lpeversion="1"
       weight="33.333333"
       steps="2"
       helper_size="0"
       apply_no_weight="true"
       apply_with_weight="true"
       only_selected="false" />
    <inkscape:path-effect
       effect="bspline"
       id="path-effect7162"
       is_visible="true"
       lpeversion="1"
       weight="33.333333"
       steps="2"
       helper_size="0"
       apply_no_weight="true"
       apply_with_weight="true"
       only_selected="false" />
    <radialGradient
       xlink:href="#linearGradient20749"
       id="radialGradient20751"
       cx="40.709666"
       cy="49.869633"
       fx="40.709666"
       fy="49.869633"
       r="31.659954"
       gradientTransform="matrix(1,0,0,1.0000789,0,-0.00393472)"
       gradientUnits="userSpaceOnUse" />
  </defs>
  <path
     style="fill:url(#radialGradient20751);stroke:#000000;fill-opacity:1"
     d="m 46.422493,20.205354 c 6.051569,1.990638 14.37485,5.971337 19.501066,12.023184 5.126216,6.051847 7.056213,14.17392 5.326966,21.893638 -1.729247,7.719718 -7.117157,15.037625 -12.987462,20.164125 -5.870306,5.1265 -12.223215,8.061705 -19.520923,6.172357 C 31.444432,78.569311 23.201734,71.854527 17.732968,65.139702 12.264202,58.424876 9.5702467,51.710093 9.5498277,45.758687 9.5294086,39.80728 12.183155,34.620411 16.505926,30.156887 c 4.322772,-4.463524 10.313805,-8.202894 15.199612,-10.072532 4.885807,-1.869638 8.665386,-1.869638 14.716955,0.120999 z"
  <path
     style="fill:#000000;fill-opacity:1;stroke:#000000"
     d="m 44.41189,28.689271 c -6.936304,0.462144 -16.264812,2.713853 -21.713609,6.735246 -5.448798,4.021392 -7.016921,9.811385 -5.568856,15.883252 1.448064,6.071866 5.911183,12.424774 11.198933,16.485512 5.287751,4.060738 11.39941,5.829902 17.108629,4.663571 5.70922,-1.166332 11.016714,-5.267577 14.715796,-9.851158 3.699082,-4.58358 5.789913,-9.649824 5.569111,-15.017442 C 65.501091,42.220634 62.967969,36.551266 59.42985,33.052633 55.891731,29.554 51.348195,28.227126 44.41189,28.689271 Z"
</svg>

`,
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


