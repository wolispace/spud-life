function rnd(max) {
  return Math.floor(Math.random() * max);
}

// returns a randome number equally half plus or minus the number eg 3 = -1 to 1
function halfRnd(num) {
  return rnd(num) - num / 2;
}

function svgImg(svgName, repeat = 1) {
  let svgHtml = '';
  let svgInfo = svgImags[svgName];
  let svgClass = svgInfo.class;

  let thisScale = '';
  let thisShift = '';
  let thisRotate = '';
  if (svgInfo) {

    let paths = '';
    let highlight = svgName != 'spud' ? '' : `
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

    // add the images name into the class list
    if (svgClass && svgClass != svgName) {
      svgClass = `${svgClass} ${svgName}`;
    }
    while (repeat > 0) {
      if (svgInfo.shift) {
        let shiftX = (svgInfo.shift.x) ? halfRnd(svgInfo.shift.x) : 0;
        let shiftY = (svgInfo.shift.y) ? halfRnd(svgInfo.shift.y) : 0;
        thisShift = `translate(${shiftX} ${shiftY})`;
      }
      if (svgInfo.scale) {
        let scale = (svgInfo.scale.x) ? (svgInfo.scale.x + (halfRnd(svgInfo.scale.x) / svgInfo.scale.y)) / 100 : 1;
        thisScale = `scale(${scale} ${scale})`;
      }
      if (svgInfo.rotate) {
        let rotate = halfRnd(svgInfo.rotate);
        thisRotate = `rotate(${rotate}, 50, 50)`;
      }

      paths += `<g transform="${thisShift} ${thisScale} ${thisRotate}" >`;

      svgInfo.paths.forEach((path) => {
        let svgCls = path.c ? `${svgClass}-${path.c}` : svgClass;
        paths += `<path class="${svgCls}" d="${path.d}" />`;
      });
      repeat--;
      paths += '</g>';
    }

    svgHtml = `<svg class="${svgClass}"
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg">
      ${paths}
      ${highlight}
      <cXircle cx="50" cy="50" r="40" fill="url('#spudHi')" />
     </svg>`
  } else {
    svgHtml = images[svgName];
  }

  return svgHtml;
}

// add animation then remove it after a timeout so it can be re-applied
function animate(element, type, duration, onEnd) {
  if (element && element.style) {
    element.style.animation = `${type} ${duration}s ease-in-out`;

    element.addEventListener("animationstart", function () {
      app.state.animating = true;
      console.log('ani start');
    });
    element.addEventListener("animationend", function () {
      app.state.animating = false;
      console.log('ani end');
      element.style.animation = '';
      if (typeof (onEnd) == 'function') {
        onEnd();
      }
    });

    //setTimeout(() => { element.style.animation = '' }, duration * 1000, element);
  }
}

function html(selector, text) {
  let elem = checkSelector(selector);

  if (text) {
    elem.innerHTML = text;
  } else {
    return elem.innerHTML;
  }
  return elem;
}

function checkSelector(selector) {
  let elem = selector;
  if (typeof (selector) === 'string') {
    elem = document.querySelector(selector);
  }
  return elem;
}

function css(selector, styles) {
  let elem = checkSelector(selector);
  Object.assign(elem.style, styles);
  return selector;
}