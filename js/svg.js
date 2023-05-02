const svg = {
  imgList: {
    "blank": {
      "class": "grass",
      "paths": [{ "c": "", "d": "m 50,50 -3,-5 m 8,6 0,-8 m 5,8 2,5" }],
      "shift": { "x": 30, "y": 30 },
      "scale": 90,
      "rotate": 40,
    },
    "control-icon--up": {
      "class": "thick control-icon",
      "paths": [{ "c": "", "d": "m 20,80 30,-60 30,60" }]
    },
    "control-icon--right": {
      "class": "thick control-icon",
      "paths": [{ "c": "", "d": "m 20,20 60,30 -60,30" }]
    },
    "control-icon--down": {
      "class": "thick control-icon",
      "paths": [{ "c": "", "d": "m 20,20 30,60 30,-60" }]
    },
    "control-icon--left": {
      "class": "thick control-icon",
      "paths": [{ "c": "", "d": "m 80,20 -60,30 60,30" }]
    },
    "control-field--left": {
      "class": "thick control-icon",
      "paths": [{ "c": "", "d": "m 80,20 -60,30 60,30" }]
    },
    "control-field--right": {
      "class": "thick control-icon",
      "paths": [{ "c": "", "d": "m 20,20 60,30 -60,30" }]
    },
    "hole": {
      "class": "thick",
      "paths": [{ "c": "", "d": "m 30,50 5,-10 6,-18 13,-2 9,8 5,2 12,10 -8,12 -2,15 -11,8 -3,-5 -7,2 z" }],
      "shift": { "x": 10, "y": 10 },
      "scale": 50,
      "rotate": 360,
    },
    "rock": {
      "class": "thick",
      "paths": [
        { "c": "", "d": "m 30,55 10,-10 15,0 5,3 10,15 0,10 -15,4 -6,0 -13,-9 z" },
        { "c": "lo", "d": "m 30,55 10,-10 15,0 5,3 10,15 0,10 -15,4 -6,0 -13,-9 z" },
        { "c": "hi", "d": "m 34,55 6,-6 11,0 7,8 4,11 -10,3 -5,-2 z" },
      ],
      "shift": { "x": 10, "y": 10 },
      "scale": 70,
      "rotate": 360,
    },
    "log": {
      "class": "thick",
      "paths": [
        { "c": "", "d": "m 30,35 -5,5 0,12 5,5 45,0 5,-5 0,-12 -5,-5 z" },
        { "c": "lo", "d": "m 40,55 30,0 z" },
        { "c": "hi", "d": "m 31,38 -3,3 0,10 3,3 3,-3 0,-10 z" },
      ],
      "shift": { "x": 10, "y": 10 },
      "scale": 70,
      "rotate": 10,
    },
    "spud": {
      "class": "thick",
      "paths": [
        { "c": "", "d": "m 20,65 t -5,-10 5,-20 22,-14 25,4, 15,20 -1,20 -20,12 -40,-11 z" },
        // { "c": "lo", "d": "m 30,70 t 22,5 30,-25 " },
        { "c": "hi thin", "d": "m 50,30 1,1 m 10,-5 1,1 m 6,11 1,1 " },
      ],
    },
    "body-big": {
      "paths": [
        { "c": " fill-red", "d": "m 50,40       c -2.9,0 -3.9,0.0 -7,1.1      -2.4,0.8 -4.1,3.2      -6.6,10.6 -2.4,7.3      -5.6,18.5 -6.9,26.7      -1.2,8.1 -0.2,11.4      6.4,13.0 6.6,1.6       19.1,1.7 26.5,0.3      7.4,-1.3 9.7,-4.2      9.2,-12.7 -0.5,-8.5      -4.2,-21.7 -6.7,-29.3      -2.4,-7.6 -3.8,-8.7      -5.8,-9.2 -1.9,-0.5      -4.3,-0.5 -7.3,-0.5 z" }
      ]
    },
    "body-sml": {
      "paths": [
        { "c": " fill-red", "d": "m 24,47      c -2.9,0 -3.9,0.0 -7,1.1       -1.7,1.8 -2.6,4.9       -3.7,8.9 -1.0,3.7       -3.6,13.1 -5.42,21.2       -1.8,8.0 -2.2,13.3       4.6,14.0 7.5,0.7       13.5,0.7 20.7,-0.3       7.4,-1.0 9.7,-4.2       8.4,-12.7 -1.2,-8.3       -3.1,-13.5 -5.4,-22.2       -2.0,-7.8 -4.7,-10.0       -6.6,-10.4 -1.93,-0       -4.3,-0 -7.3,-0 z" }
      ]
    },
    "head-head": {
      "paths": [{ "c": " fill-wheat", "cx": 50, "cy": 30, "r": 13 }],
    },
    "eye-eye": {
      "paths": [{ "c": " fill-dodgerblue", "cx": 42, "cy": 30, "r": 1.5 }],
    },
    "nose-triangle": {
      "paths": [{ "c": " fill-wheat", "d": "m 37,30 -3,6 6,0 z" }],
    },
    "hair-top": {
      "paths": [
        { "c": "", "d": "m 40,22 c 4.504623,1.649014 9.00804,3.297586 11.702027,4.202176 2.693988,0.90459 3.57857,1.065423 5.08597,0.421884 1.5074,-0.643538 3.638439,-2.091036 4.040876,-3.558081 0.402438,-1.467046 -0.924435,-2.954752 -3.035318,-4.101081 -2.110883,-1.146329 -5.005879,-1.950495 -7.861051,-1.870333 -2.855173,0.08016 -5.669753,1.045161 -7.19809,1.749101 -1.528338,0.703939 -1.769587,1.14623 -2.010651,1.58818" }
      ]
    },
    "facial-top": {
      "paths": [
        { "c": "", "d": "m 62.062984,74.929991 c 0.744199,-0.744427 2.151517,-1.226936 3.619473,-1.166277 1.467957,0.06066 2.995871,0.663783 3.035815,1.145969 0.03995,0.482187 -1.407554,0.844062 -2.915463,1.286355 -1.507909,0.442293 -3.076033,0.965001 -3.820237,0.724294 -0.744203,-0.240708 -0.663787,-1.245915 0.08041,-1.990341 z" }
      ]
    },
    "facial-base": {
      "paths": [
        { "c": "", "d": "m 68.395658,76.477684 c -0.321877,0.683988 -0.643549,1.367543 -1.406841,1.548421 -0.763291,0.180879 -1.969541,-0.140787 -2.25137,0.583439 -0.281829,0.724225 0.361504,2.49339 1.266587,3.518264 0.905084,1.024873 2.071124,1.306331 2.874633,0.60286 0.803509,-0.703472 1.2458,-2.39222 1.2462,-3.658563 3.99e-4,-1.266342 -0.441892,-2.110716 -0.884818,-2.956302" }
      ]
    },
    "facial-big": {
      "paths": [
        { "c": "", "d": "m 72.87054,80.843163 c 1.468153,-0.583239 2.935784,-1.16627 4.343455,-1.115594 1.407671,0.05068 2.754648,0.734216 3.709222,1.910645 0.954575,1.176429 1.517491,2.845073 1.567464,4.754801 0.04997,1.909727 -0.412421,4.06087 -1.518144,6.161483 -1.105723,2.100613 -2.854783,4.151235 -4.532953,5.106205 -1.67817,0.954969 -3.286501,0.814239 -4.292203,-0.864015 -1.005702,-1.678255 -1.407785,-4.894918 -1.237053,-7.770122 0.170731,-2.875204 0.914585,-5.408326 1.658644,-7.942148" }
      ]
    },
    "hair-ponytail": {
      "paths": [
        { "c": "", "d": "m 39,22 c 3.016741,2.654732 13.352521,2.579002 16.589431,4.227222 3.23691,1.64822 1.95989,4.980844 2.877084,6.818321 1.020971,2.04538 1.440558,4.594791 3.267186,2.94459 3.933903,-3.553945 0.919239,-10.162714 3.986424,-7.08501 5.25255,5.270562 0.01356,5.908107 4.666287,5.560122 2.165739,-0.161979 4.901355,-1.281643 1.58873,-7.041653 -4.066314,-7.07053 -8.115263,1.116865 -9.131017,-2.140195 -1.015754,-3.257059 -1.106511,-3.193856 -3.377732,-5.948462 -2.271221,-2.754605 -7.096118,-2.867176 -11.057298,-2.696584 -3.961179,0.170592 -6.685008,1.989734 -9.409095,5.421962" }
      ]
    },
    "hair-bun": {
      "paths": [
        { "c": " fill-orange", "d": "m 39,22 c 3.016741,2.654732 13.352521,2.579002 16.589431,4.227222 3.23691,1.64822 1.95989,4.980844 2.877084,6.818321 1.020971,2.04538 1.140375,4.184109 3.267186,2.94459 4.182042,-2.43732 2.869799,-7.581288 2.869799,-7.581288 0,0 5.876363,5.150965 5.410704,-2.628464 -0.203558,-3.400682 -0.354446,-2.545084 -1.513007,-5.18061 -3.388029,-7.707181 -9.036198,-1.100489 -6.525558,1.209681 0.100871,0.09282 -0.238025,0.280089 -2.509246,-2.474517 -2.271221,-2.754605 -7.096118,-2.867176 -11.057298,-2.696584 -3.961179,0.170592 -6.685008,1.989734 -9.409095,5.421962" }
      ]
    },
    "hair-curly": {
      "paths": [
        { "c": " fill-yellow", "d": "m 40,22 c -1.563682,1.336238 -3.127448,2.672547 -4.392244,2.829464 -1.264796,0.156916 -2.231468,-0.86662 -2.7153,-2.075012 -0.483831,-1.208393 -0.483831,-2.601539 0.270062,-3.398197 0.753893,-0.796659 2.260764,-0.99568 3.284335,-0.753393 1.023572,0.242287 1.563771,0.924645 1.364793,0.782432 -0.198978,-0.142214 -1.137218,-1.108887 -1.308401,-2.317522 -0.171183,-1.208636 0.42588,-2.658645 1.393166,-3.412369 0.967287,-0.753723 2.30357,-0.810586 2.971247,-0.838998 0.667677,-0.02841 2.4589,1.762811 2.544106,1.45039 0.08521,-0.312421 0.255795,-0.937915 0.924395,-1.407478 0.668601,-0.469563 1.834294,-0.78231 2.744366,-0.724972 0.910073,0.05734 1.563998,0.483811 1.663236,0.256566 0.09924,-0.227245 -0.355668,-1.108623 0.298378,-1.70637 0.654046,-0.597747 2.416803,-0.910494 4.009183,-0.554604 1.592381,0.355891 3.013958,1.379426 3.539349,2.10408 0.525391,0.724653 0.155781,1.151127 0.212593,0.95221 0.05681,-0.198918 0.540149,-1.023433 1.692361,-1.037531 1.152212,-0.0141 2.971832,0.781986 3.994857,2.075955 1.023025,1.29397 1.250478,3.085158 0.881124,4.108071 -0.369354,1.022914 -1.336027,1.278798 -1.03741,1.27882 0.298616,2.1e-5 1.862351,-0.255863 2.985254,0.498276 1.122902,0.754139 1.805258,2.516895 1.861806,3.824293 0.05655,1.307399 -0.512082,2.160345 -1.250819,2.643523 -0.738737,0.483178 -1.648529,0.596902 -1.378249,0.895699 0.27028,0.298797 1.72029,0.782133 2.330917,1.805924 0.610628,1.02379 0.383175,2.587525 -0.184862,3.312194 -0.568036,0.724669 -1.477828,0.610945 -1.719778,1.009535 -0.241949,0.39859 0.184524,1.3084 0.312112,2.218028 0.127587,0.909627 -0.043,1.819436 -0.938125,2.373419 -0.895122,0.553983 -2.515721,0.753004 -4.150416,0.440595 -1.634695,-0.312408 -3.283725,-1.136923 -4.17988,-2.21711 -0.896155,-1.080187 -1.038313,-2.41647 -0.682661,-3.227435 0.355652,-0.810965 1.208598,-1.095281 1.080643,-1.052629 -0.127956,0.04265 -1.236786,0.412262 -1.976025,0.228146 -0.739239,-0.184116 -1.108849,-0.923336 -1.464425,-2.060654 -0.355575,-1.137318 -0.696754,-2.672621 -0.298501,-3.611564 0.398253,-0.938942 1.535515,-1.28012 1.435807,-1.038428 -0.09971,0.241692 -1.435992,1.066207 -2.615694,0.697238 -1.179702,-0.368968 -2.203239,-1.932704 -2.8147,-2.998892 -0.611461,-1.066187 -0.810482,-1.634818 -0.881737,-1.49272 -0.07126,0.142099 -0.01439,0.995046 -1.009108,1.492046 -0.994717,0.497 -3.041789,0.639158 -4.207641,0.454971 -1.165853,-0.184187 -1.450168,-0.695955 -1.507149,-0.710159 -0.05698,-0.0142 0.113609,0.469132 -0.341313,0.965996 -0.454922,0.496864 -1.535321,1.008632 -1.777301,0.326653 -0.241981,-0.681978 0.355082,-2.55846 0.952353,-4.435599" }
      ]
    },
    "hair-straight": {
      "paths": [
        { "c": "", "d": "m 35,22 c 1.770199,-1.9290362 6.212304,-6.3329312 6.212304,-6.3329312 l 7.599517,-2.291918 c 0,0 6.674709,0.743868 8.986731,1.779252 2.312023,1.035384 5.548854,5.7599522 5.548854,5.7599522 l 2.472859,16.465621 -10.735826,-2.050663 0.180941,-6.574186 -2.050664,6.031363 -5.367913,0.06031 5.066345,-14.1737042 -3.015682,4.1616412 c 0,0 -4.061117,-1.527945 -6.091676,-2.291918 l 1.99035,-3.3775642 -4.764777,4.7044642 -4.101328,-0.120627" }
      ]
    },
    "hair-short": {
      "paths": [
        { "c": "", "d": "m 38,22 c 1.943827,-1.6956793 3.887583,-3.3912959 6.596893,-4.3631772 2.709311,-0.9718812 6.183118,-1.22001 9.202302,-0.392414 3.019183,0.827596 5.583184,2.7299184 7.340536,4.9427202 1.757351,2.212803 2.708513,4.735451 3.266649,7.113428 0.558135,2.377977 0.723555,4.611138 0.640726,6.596146 -0.08283,1.985008 -0.413667,3.721911 -1.674564,4.734718 -1.260897,1.012807 -3.452703,1.302291 -5.582487,1.343759 -2.129785,0.04147 -5.6245,-0.308002 -5.91347,-0.98052 -0.28897,-0.672518 0.0605,-7.662031 -0.249247,-10.308765 -0.309753,-2.646733 -1.136866,-3.804692 -1.964807,-4.96381" }
      ]
    },
    "hair-bob": {
      "paths": [
        { "c": "", "d": "m 39,22 c 1.943827,-1.695679 3.887582,-3.391296 6.596892,-4.363177 2.709311,-0.971882 6.183118,-1.22001 9.202302,-0.392414 3.019183,0.827596 5.583184,2.729918 7.444012,4.797965 1.860828,2.068048 3.018763,4.30121 3.80434,6.617191 0.785577,2.315982 1.199125,4.714562 1.488569,6.989181 0.289445,2.274619 0.454865,4.42507 -2.460526,6.3062 -2.915391,1.881131 -8.911844,3.49397 -12.944082,3.019 -4.032238,-0.47497 -7.526953,-4.808416 -7.270709,-5.373044 0.256243,-0.564628 6.546731,-2.38188 7.663309,-4.655834 1.116578,-2.273954 -0.372226,-5.74783 -1.861577,-9.222983" }
      ]
    },
    "hair-crop": {
      "paths": [
        { "c": "", "d": "m 39,22 c 1.943827,-1.695679 3.887583,-3.391296 6.596893,-4.363177 2.709311,-0.971882 6.183118,-1.22001 9.202302,-0.392414 3.019183,0.827596 5.583184,2.729918 7.175138,4.405076 1.591953,1.675158 2.212276,3.122577 2.460122,4.569934 0.247846,1.447357 0.123782,2.894777 -0.165765,4.590336 -0.289547,1.695559 -0.74445,3.639236 -1.509546,5.37598 -0.765095,1.736743 -1.840321,3.266872 -2.770518,3.163982 -0.930198,-0.102889 -2.258189,-3.038449 -2.361026,-3.737148 -0.102837,-0.6987 0.106846,-5.381619 -1.029873,-7.056925 -1.136718,-1.675306 -3.535346,-2.254286 -5.935196,-2.83356" }
      ]
    },
    "hair-long": {
      "paths": [
        { "c": "", "d": "m 39,22 c 1.943827,-1.695679 3.887583,-3.391296 6.803712,-4.259756 2.91613,-0.868461 6.803563,-0.909816 9.926003,0.269377 3.122439,1.179194 5.479713,3.577822 6.968155,6.576269 1.488443,2.998446 2.108778,6.596389 2.667038,11.683269 0.558259,5.08688 1.054517,11.6623 1.054373,15.549604 -1.44e-4,3.887304 -0.496411,5.086617 -1.963936,5.54135 -1.467525,0.454734 -3.90746,0.16525 -6.2442,0.02043 -2.336741,-0.144816 -6.111033,-0.144815 -6.367919,-1.592765 -0.256886,-1.447951 0.721645,-17.244251 0.598002,-22.496436 -0.123643,-5.252186 -0.950756,-6.410145 -1.778697,-7.569262" }
      ]
    },
    "hair-mohawk": {
      "class": "fill-red",
      "paths": [
        { "c": "", "d": "m 41.5,20 c 2.316426,-1.034119 4.632389,-2.068031 7.039753,-2.464523 2.407364,-0.396492 4.905353,-0.155889 7.011012,0.732458 2.105658,0.888347 3.818766,2.423494 4.906039,3.957603 1.087272,1.534109 1.54928,3.066777 1.759929,3.83253 0.210649,0.765753 0.169299,0.765753 1.480405,0.769303 1.311106,0.0035 3.973566,0.01064 6.637082,0.01774 -0.235596,-1.798829 -0.471042,-3.59651 -1.059283,-5.766468 -0.588242,-2.169959 -1.529368,-4.710951 -3.586837,-6.957426 -2.057468,-2.246475 -5.231757,-4.197679 -8.354525,-5.20648 -3.122768,-1.008801 -6.19349,-1.074381 -8.906534,-0.806698 -2.713045,0.267684 -5.067761,0.868798 -7.0103,1.646027 -1.942539,0.777229 -3.472236,1.730467 -4.60833,2.981912 -1.1360946,1.251445 -1.8777848,2.799958 -2.619693,4.348927 -0.00294,0.0205 -0.006,0.04184 -0.00882,0.0615" }
      ]
    },
    "brows-straight": {
      "paths": [
        { "c": " brows ", "d": "m 40,24 c 1.668255,-0.468869 1.668239,-0.468865 2.591623,-0.435498 0.923384,0.03337 1.935773,0.333893 2.59038,0.814829 0.654608,0.480936 0.952055,1.141411 1.248968,1.800702" }
      ]
    },
    "brows-arch": {
      "paths": [
        { "c": " brows ", "d": "m 40,24 c 1.668589,-0.467682 1.668573,-0.467677 2.501384,-0.703023 0.87902,-0.09136 1.757003,-0.183709 2.634006,-0.277063 0.525913,0.113513 1.050816,0.226023 1.574737,0.337538" }
      ]
    },
    "brows-wave": {
      "paths": [
        { "c": " brows ", "d": "m 40,26 c 0.820722,0.917813 0.820714,0.917804 1.583482,1.027839 0.762768,0.110035 1.878545,-0.127062 2.766277,0.02312 0.887731,0.150181 1.54704,0.686588 2.205281,1.222126" }
      ]
    },
  },

  render: (svgName, repeat = 1, style = '', svgInfo = null) => {
    let svgHtml = '';
    svgInfo = svgInfo ?? svg.imgList[svgName];
    let svgClass = svgInfo.class ?? '';

    let thisScale = '';
    let thisShift = '';
    let thisRotate = '';
    if (svgInfo) {

      let paths = '';


      // add the images name into the class list
      svgClass = svg.setClass(svgClass, svgName);
      while (repeat > 0) {
        if (svgInfo.shift) {
          let shiftX = (svgInfo.shift.x) ? halfRnd(svgInfo.shift.x) + (svgInfo.shift.x / 2) : 0;
          let shiftY = (svgInfo.shift.y) ? halfRnd(svgInfo.shift.y) + (svgInfo.shift.y / 2) : 0;
          thisShift = `translate(${shiftX} ${shiftY})`;
        }
        // random between 50 and 100
        if (svgInfo.scale) {
          let scale = (svgInfo.scale) ? (svgInfo.scale + rnd(100 - svgInfo.scale)) / 100 : 1;
          thisScale = `scale(${scale}, ${scale})`;
        }
        if (svgInfo.rotate) {
          let rotate = halfRnd(svgInfo.rotate);
          thisRotate = `rotate(${rotate}, 50, 50)`;
        }

        paths += `<g transform="${thisShift} ${thisScale} ${thisRotate}" >`;

        svgInfo.paths.forEach((path) => {
          let svgCls = path.c ? `${svgClass}-${path.c}` : svgClass;
          let pathStyle = path.s ?? '';
          // path
          if (path.d) {
            let onePath = svgName == 'spud' ? svg.jiggle(path.d, 1) : path.d;
            paths += `<path class="${svgCls}" style="${pathStyle}" d="${onePath}" />`;
          }
          // circle
          if (path.r) {
            paths += `<circle class="${svgCls}" style="${pathStyle}" cx="${path.cx}" cy="${path.cy}" r="${path.r}" />`;
          }

        });
        repeat--;
        paths += '</g>';
      }
      let highlight = svgName == 'spud' ? svg.highlight() : '';

      svgHtml = svg.wrap(svgClass, style, `${paths}${highlight}`);

    } else {
      svgHtml = svg.imgList[svgName];
    }

    return svgHtml;
  },

  wrap: (svgClass, style, guts) => {
    return `<svg class="${svgClass}" ${style}
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg">
      ${guts}
    </svg>`
  },

  // adds a highlight to the spuds to make them a bit 3D
  highlight: () => {
    return `
    <defs>
      <radialGradient id="spudHi">
        <stop offset="0%" stop-color="white" />
        <stop offset="100%" stop-color="transparent" />
      </radialGradient>
    </defs>
    <g>
      <circle cx="40", cy="40" r="30" 
        fill="url('#spudHi')" 
        stroke="none"
        opacity="50%" />
    </g>
    `;
  },

  setClass: (svgClass, svgName) => {
    if (svgClass && svgClass != svgName) {
      svgClass = `${svgClass} ${svgName}`;
    }
    return svgClass;
  },

  // skightly move the path points +/- the amp(litude)
  jiggle: (path, amp) => {
    let bits = path.split(/( |,)/);
    let res = '';
    bits.forEach((bit) => {
      if (parseInt(bit) > 0) {
        bit = parseInt(bit) + halfRnd(amp);
      }
      res += bit;
    });

    return res;
  },

  animate: (element, type, duration, onEnd) => {
    if (element && element.style) {
      element.style.animation = `${type} ${duration}s ease-in-out`;

      element.addEventListener("animationstart", function () {
        player.animating = true;
        console.log('ani start');
      });
      element.addEventListener("animationend", function () {
        player.animating = false;
        console.log('ani end');
        element.style.animation = '';
        if (typeof (onEnd) == 'function') {
          onEnd();
        }
      });

      //setTimeout(() => { element.style.animation = '' }, duration * 1000, element);
    }
  },

  // puts the bits of a human together
  assemblePerson() {
    // TODO: should not need this..
    if (!player.body) {
      defineCharacter();
    }

    // somehow we know which of these paths to select and what styles to apply
    let paths = [];
    Object.entries(player.body).forEach(([key, part]) => {
      paths.push(svg.buildPath(part.type, part.colour));
    });

    return paths;
  },

  buildPath(partName, colour) {
    let path = svg.imgList[partName].paths[0];
    let bits = partName.split('-');
    path.c = ` ${bits[0]}`;
    path.s = `fill: ${colour}; stroke: ${colour}`;

    return path;
  },

  directPlayerSprite(left) {
    let playerSprite = document.querySelector('#playerSprite > svg > g');
    playerSprite.setAttribute('wallace', 'thing');
    if (left) {
      playerSprite.setAttribute('transform', 'translate(0, 0) scale(1, 1)');
    } else {
      playerSprite.setAttribute('transform', 'translate(100, 0) scale(-1, 1)');
    }
  },

  showPlayerSprite() {
    let playerSprite = document.querySelector('#playerSprite');
    playerSprite.style.display = 'block';
  },

  hidePlayerSprite() {
    let playerSprite = document.querySelector('#playerSprite');
    playerSprite.style.display = 'none';
  },

  // TODO add more colours
  colourOptions(selectedColour = '') {
    let options = '';
    Object.entries(CSS_COLOR_NAMES).forEach(([key, part]) => {
      let selected = key == selectedColour ? 'selected="selected"' : '';
      options += `<option value="${key}" ${selected} style="background: ${key};">&nbsp;</option>`;
    });
    return options;
  },

  // TODO: returns different types of body parts
  bodyPartOptions(type) {
    let options = '';

    Object.entries(svg.imgList).forEach(([key, part]) => {
      if (`${key}-`.indexOf(type) > -1) {
        let bits = key.split('-');
        options += `<option value="${key}">${bits[1]}</option>`;
      }
    });

    return options;
  },

}

const CSS_COLOR_NAMES = {
  AliceBlue: '#F0F8FF',
  AntiqueWhite: '#FAEBD7',
  Aqua: '#00FFFF',
  Aquamarine: '#7FFFD4',
  Azure: '#F0FFFF',
  Beige: '#F5F5DC',
  Bisque: '#FFE4C4',
  Black: '#000000',
  BlanchedAlmond: '#FFEBCD',
  Blue: '#0000FF',
  BlueViolet: '#8A2BE2',
  Brown: '#A52A2A',
  BurlyWood: '#DEB887',
  CadetBlue: '#5F9EA0',
  Chartreuse: '#7FFF00',
  Chocolate: '#D2691E',
  Coral: '#FF7F50',
  CornflowerBlue: '#6495ED',
  Cornsilk: '#FFF8DC',
  Crimson: '#DC143C',
  Cyan: '#00FFFF',
  DarkBlue: '#00008B',
  DarkCyan: '#008B8B',
  DarkGoldenRod: '#B8860B',
  DarkGray: '#A9A9A9',
  DarkGrey: '#A9A9A9',
  DarkGreen: '#006400',
  DarkKhaki: '#BDB76B',
  DarkMagenta: '#8B008B',
  DarkOliveGreen: '#556B2F',
  DarkOrange: '#FF8C00',
  DarkOrchid: '#9932CC',
  DarkRed: '#8B0000',
  DarkSalmon: '#E9967A',
  DarkSeaGreen: '#8FBC8F',
  DarkSlateBlue: '#483D8B',
  DarkSlateGray: '#2F4F4F',
  DarkSlateGrey: '#2F4F4F',
  DarkTurquoise: '#00CED1',
  DarkViolet: '#9400D3',
  DeepPink: '#FF1493',
  DeepSkyBlue: '#00BFFF',
  DimGray: '#696969',
  DimGrey: '#696969',
  DodgerBlue: '#1E90FF',
  FireBrick: '#B22222',
  FloralWhite: '#FFFAF0',
  ForestGreen: '#228B22',
  Fuchsia: '#FF00FF',
  Gainsboro: '#DCDCDC',
  GhostWhite: '#F8F8FF',
  Gold: '#FFD700',
  GoldenRod: '#DAA520',
  Gray: '#808080',
  Grey: '#808080',
  Green: '#008000',
  GreenYellow: '#ADFF2F',
  HoneyDew: '#F0FFF0',
  HotPink: '#FF69B4',
  IndianRed: '#CD5C5C',
  Indigo: '#4B0082',
  Ivory: '#FFFFF0',
  Khaki: '#F0E68C',
  Lavender: '#E6E6FA',
  LavenderBlush: '#FFF0F5',
  LawnGreen: '#7CFC00',
  LemonChiffon: '#FFFACD',
  LightBlue: '#ADD8E6',
  LightCoral: '#F08080',
  LightCyan: '#E0FFFF',
  LightGoldenRodYellow: '#FAFAD2',
  LightGray: '#D3D3D3',
  LightGrey: '#D3D3D3',
  LightGreen: '#90EE90',
  LightPink: '#FFB6C1',
  LightSalmon: '#FFA07A',
  LightSeaGreen: '#20B2AA',
  LightSkyBlue: '#87CEFA',
  LightSlateGray: '#778899',
  LightSlateGrey: '#778899',
  LightSteelBlue: '#B0C4DE',
  LightYellow: '#FFFFE0',
  Lime: '#00FF00',
  LimeGreen: '#32CD32',
  Linen: '#FAF0E6',
  Magenta: '#FF00FF',
  Maroon: '#800000',
  MediumAquaMarine: '#66CDAA',
  MediumBlue: '#0000CD',
  MediumOrchid: '#BA55D3',
  MediumPurple: '#9370DB',
  MediumSeaGreen: '#3CB371',
  MediumSlateBlue: '#7B68EE',
  MediumSpringGreen: '#00FA9A',
  MediumTurquoise: '#48D1CC',
  MediumVioletRed: '#C71585',
  MidnightBlue: '#191970',
  MintCream: '#F5FFFA',
  MistyRose: '#FFE4E1',
  Moccasin: '#FFE4B5',
  NavajoWhite: '#FFDEAD',
  Navy: '#000080',
  OldLace: '#FDF5E6',
  Olive: '#808000',
  OliveDrab: '#6B8E23',
  Orange: '#FFA500',
  OrangeRed: '#FF4500',
  Orchid: '#DA70D6',
  PaleGoldenRod: '#EEE8AA',
  PaleGreen: '#98FB98',
  PaleTurquoise: '#AFEEEE',
  PaleVioletRed: '#DB7093',
  PapayaWhip: '#FFEFD5',
  PeachPuff: '#FFDAB9',
  Peru: '#CD853F',
  Pink: '#FFC0CB',
  Plum: '#DDA0DD',
  PowderBlue: '#B0E0E6',
  Purple: '#800080',
  RebeccaPurple: '#663399',
  Red: '#FF0000',
  RosyBrown: '#BC8F8F',
  RoyalBlue: '#4169E1',
  SaddleBrown: '#8B4513',
  Salmon: '#FA8072',
  SandyBrown: '#F4A460',
  SeaGreen: '#2E8B57',
  SeaShell: '#FFF5EE',
  Sienna: '#A0522D',
  Silver: '#C0C0C0',
  SkyBlue: '#87CEEB',
  SlateBlue: '#6A5ACD',
  SlateGray: '#708090',
  SlateGrey: '#708090',
  Snow: '#FFFAFA',
  SpringGreen: '#00FF7F',
  SteelBlue: '#4682B4',
  Tan: '#D2B48C',
  Teal: '#008080',
  Thistle: '#D8BFD8',
  Tomato: '#FF6347',
  Turquoise: '#40E0D0',
  Violet: '#EE82EE',
  Wheat: '#F5DEB3',
  White: '#FFFFFF',
  WhiteSmoke: '#F5F5F5',
  Yellow: '#FFFF00',
  YellowGreen: '#9ACD32',
};