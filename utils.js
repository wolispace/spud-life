function rnd(max) {
  return Math.floor(Math.random() * max);
}

function svgImg(svgName, svgClass = '', repeat = 0) {
  let paths = ''
  let svgHtml = '';
  svgClass = svgClass != '' ? svgClass : svgName;
  let svgInfo = svgImags[svgName];
  console.log(svgInfo);
  if (svgInfo && svgInfo.length > 0) {
    while (repeat > 0) {
      svgInfo.paths.forEach((path) => {
        svgClass = path.c ? `${svgClass}-${path.c}` : svgClass;
        paths += `<p class="${svgClass}" d="${path.d}" />`;
      });
    }

    svgHtml = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
       ${paths}
     </svg>`
  } else {
    svgHtml = images[svgName];
  }
  console.log(svgHtml);
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