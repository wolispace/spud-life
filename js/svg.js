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


  },

  render: (svgName, repeat = 1, style = '') => {
    let svgHtml = '';
    let svgInfo = svg.imgList[svgName];
    let svgClass = svgInfo.class;

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
          let onePath = svgName == 'spud' ? svg.jiggle(path.d, 1) : path.d;
          let svgCls = path.c ? `${svgClass}-${path.c}` : svgClass;
          paths += `<path class="${svgCls}" d="${onePath}" />`;
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
}
