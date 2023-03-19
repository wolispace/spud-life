function rnd(max) {
  return Math.floor(Math.random() * max);
}

function svgImg(svgName, svgClass = '', repeat = 1) {
  let svgHtml = '';
  let svgInfo = svgImags[svgName];
  let isSingle = repeat == 1;
  let scale = 15;
  if (svgInfo) {

    let paths = '';
    svgClass = svgClass != '' ? svgClass : svgName;
    while (repeat > 0) {
      let tx = 0;
      let ty = 0;
      let sx = 1;
      let sy = 1;
      let rotate = 0;
      if (!isSingle) {

        tx += rnd(scale) - (scale / 2);
        ty += rnd(scale) - (scale / 2);
        sx += (rnd(scale) - (scale / 2)) / 100;
        sy += (rnd(scale) - (scale / 2)) / 100;
        rotate = rnd(scale * 2) - (scale * 2 / 2);
      }
      paths += `<g transform="
       translate(${tx},${ty}) 
       scale(${sx} ${sy})
       rotate(${rotate}) " >`;

      svgInfo.paths.forEach((path) => {
        let svgCls = path.c ? `${svgClass}-${path.c}` : svgClass;
        paths += `<path class="${svgCls}" d="${path.d}" />`;
      });
      repeat--;
      paths += '</g>';
    }

    svgHtml = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
       ${paths}
     </svg>`
  } else {
    svgHtml = images[svgName];
  }

  return svgHtml;
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