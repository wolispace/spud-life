const svg = {

  inline: function (itemName, num = 3) {
    let style = `style="width: ${num}rem;"`;
    return svg.render(itemName, 1, style);
  },

  render: (svgName, repeat = 1, style = "", svgInfo = null) => {
    let svgHtml = "";
    svgInfo = svgInfo ?? svg.imgList[svgName];
    if(!svgInfo) {
      console.trace('could not find ', svgName);
      svgInfo = svg.imgList['blank'];
    }
    
    let svgClass = svgInfo.class ?? "";

    let thisScale = "";
    let thisShift = "";
    let thisRotate = "";

    if (svgInfo.paths) {
      let paths = "";

      // add the images name into the class list
      svgClass = svg.setClass(svgClass, svgName);
      while (repeat> 0) {
        if (svgInfo.shift) {
          let shiftX = svgInfo.shift.x
            ? halfRnd(svgInfo.shift.x) + svgInfo.shift.x / 2
            : 0;
          let shiftY = svgInfo.shift.y
            ? halfRnd(svgInfo.shift.y) + svgInfo.shift.y / 2
            : 0;
          thisShift = `translate(${shiftX} ${shiftY})`;
        }
        // random between 50 and 100
        if (svgInfo.scale) {
          let scale = svgInfo.scale
            ? (svgInfo.scale + rnd(100 - svgInfo.scale)) / 100
            : 1;
          thisScale = `scale(${scale}, ${scale})`;
        }
        if (svgInfo.rotate) {
          let rotate = halfRnd(svgInfo.rotate);
          thisRotate = `rotate(${rotate}, 50, 50)`;
        }

        paths += `<g transform="${thisShift} ${thisScale} ${thisRotate}">`;

        svgInfo.paths.forEach((path) => {
          let svgCls = path.c ? `${svgClass}-${path.c}` : svgClass;
          let pathStyle = path.s ?? "";
          // path
          if (path.d) {
            let onePath = svgName == "spud" ? svg.jiggle(path.d, 1) : path.d;
            paths += `<path class="${svgCls}" style="${pathStyle}" d="${onePath}" />`;
          }
          // circle
          if (path.r) {
            paths += `<circle class="${svgCls}" style="${pathStyle}" cx="${path.cx}" cy="${path.cy}" r="${path.r}" />`;
          }
        });
        repeat--;
        paths += "</g>";
      }
      let highlight = svgName == "spud" ? svg.highlight() : "";

      svgHtml = svg.wrap(svgClass, style, `${paths}${highlight}`);
    } else {
      svgHtml = svg.imgList[svgName];
      if (style != "") {
        // inject our style
        svgHtml = svgHtml.replace(`<svg `, `<svg ${style} `); 
      }
    }

    return svgHtml;
  },

  wrap: (svgClass, style, guts) => {
    return `<svg class="${svgClass}" ${style}
    viewBox="0 0 100 100" 
   >
      ${guts}
    </svg>`;
  },

  wrapPlayer: (guts) => {
    return `<svg
    viewBox="0 0 50 100" 
   >
      ${guts}
    </svg>`;
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

  // slightly move the path points +/- the amp(litude)
  jiggle: (path, amp) => {
    let bits = path.split(/( |,)/);
    let res = "";
    bits.forEach((bit) => {
      if (parseInt(bit)> 0) {
        bit = parseInt(bit) + halfRnd(amp);
      }
      res += bit;
    });

    return res;
  },

  // remember to wrap functions in functions before passing them as onEnd
  animate: (element, type, duration, onEnd) => {
    if (element && element.style) {
      element.style.animation = `${type} ${duration}s ease-in-out 0s 1 normal forwards`;
      element.addEventListener("animationstart", function handler() {
        this.removeEventListener("animationstart", handler);
      });
      
      element.addEventListener("animationend", function handler() {
        element.style.animation = "";
        if (typeof onEnd == "function") {
          onEnd();
        }
        this.removeEventListener("animationend", handler);
      });
    }
  },

  renderPerson: (person) => {
    if (!person) {
      return '';
    }
    let paths = svg.assemblePerson(person);
    // separate the first element of paths so we can wrap in <g>
    let body = paths.pop();
    let head = ``;

    paths.forEach((path) => {
      // path
      if (path.d) {
        head += `<path d="${path.d}" style="${path.s}" />`;
      }
      // circle
      if (path.r) {
        head += `<circle cx="${path.cx}" cy="${path.cy}" r="${path.r}" style="${path.s}" />`;
      }
    });

    let guts = `<g class="playerBody"><path style="${body.s}" d="${body.d}"></g><g class="playerHead">${head}</g>`;

    return svg.wrapPlayer(guts);
  },

  // puts the bits of a human together
  assemblePerson(body) {
    // group everything but the body
    // then wrap in another group
    let paths = [];
    Object.entries(body).forEach(([key, part]) => {
      if (key != "body") {
        paths.push(svg.buildPath(part.type, part.colour));
      }
    });
    // add the body last so it is put in a separate svg group
    paths.push(svg.buildPath(body.body.type, body.body.colour));

    return paths;
  },

  buildPath(partName, colour) {
    let path = svg.imgList[partName].paths[0];
    let bits = partName.split("-");
    path.c = ` ${bits[0]}`;
    path.s = `fill: ${colour}; stroke: ${colour}`;

    return path;
  },

  hideElement(elementQuery) {
    let thisElement = document.querySelector(elementQuery);
    thisElement.style.display = "none";
  },

  showElement(elementQuery) {
    let thisElement = document.querySelector(elementQuery);
    thisElement.style.display = "flex";
  },

  colourOptions(selectedColour = "") {
    let options = "";
    Object.entries(lists.raw.colorNames).forEach(([key, part]) => {
      let selected = key == selectedColour ? 'selected="selected"' : "";
      options += `<option value="${key}" ${selected} style="background: ${key};">&nbsp;</option>`;
    });
    return options;
  },

  // TODO: returns different types of body parts
  bodyPartOptions(type, currentType) {
    let options = "";

    Object.entries(svg.imgList).forEach(([key, part]) => {
      let selected = currentType == key ? 'selected="selected"' : '';
      if (`${key}-`.indexOf(type)> -1) {
        let bits = key.split("-");
        options += `<option value="${key}" ${selected}>${bits[1]}</option>`;
      }
    });

    return options;
  },

  orientation(svgSrc) {
    // return width and height from viewbox to decide if its a wide or high image
    // NOTE: for simplicity viewbox should be integers!!!
    let bits = svgSrc.match(/viewBox=\"(\d+) (\d+) (\d+) (\d+)\"/);
    return (parseInt(bits[3]) > parseInt(bits[4])) ? 'wide' : 'height';
  },

  addOrientationClass: function(svgSrc) {
    let orientation = svg.orientation(svgSrc);
    return svgSrc.replace(/ viewBox=\"/, ` class=\"${orientation}\" viewBox=\"`);
  },

};

