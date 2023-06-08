/*
layers:
0 = field rectangle sky
1 = nightShade
2 = starField
3 = cloudLine
4 = buildingLine
5 = customerLine
6 = playerSprite
7 = grassLine
*/

const sky = {
  render: () => {
    // find patch_10
    let patch = getElementPos(`#patch_10`);
    let height = patch.height;

    let element = document.querySelector(`#cloudLine`);
    // element.style.width = `${width}px`;
    element.style.height = `${height}px`;
  },

  clouds: () => {
    //https://codepen.io/NvIGA/pen/geRNmv
    let svgInfo = sky.buildCloud(); // svg.render("cloud-004");

    let element = document.querySelector(`#cloudLine`);
    let cloudSprite = `<div id="cloud-001" class="cloud cloudBox">${svgInfo}</div>`;
    element.innerHTML = cloudSprite;
    let cloudBox = document.querySelector(`#cloud-001`);

    let patch = getElementPos(`#patch_10`);
    cloudBox.style.top = 0 + "px";
    cloudBox.style.left = patch.width + "px";
    cloudBox.style.width = patch.width + "px";
    cloudBox.style.height = patch.height + "px";
    let duration = 3; //rnd(100) + 50;
    //cloudBox.style.animation = `move-cloud ${duration}s linear`;

    // restart with a new cloud and a new speed
    //cloudBox.addEventListener("animationiteration", sky.changeCloud());
    cloudBox.addEventListener("animationiteration", (event) => {
      sky.changeCloud();
    });
  },
  changeCloud: () => {
    let svgInfo = sky.buildCloud();
    let cloudBox = document.querySelector(`#cloud-001`);
    cloudBox.innerHTML = svgInfo;
  },

  buildCloud: () => {
    let guts = "";
    let paths = [];
    let yMax = 20;
    let sizeMax = 15;
    let widthMax = rnd(30) + 10;
    let size = rnd(sizeMax) + 4;
    let yPos = rnd(yMax) + size;
    let xPos = size;
    let i = 0;

    while (i++ < widthMax) {
      paths.push({
        s: "",
        cx: xPos,
        cy: yPos,
        r: size,
      });
      size = rnd(sizeMax) + 4;
      xPos += 3;
      if (xPos < size) {
        xPos = size;
      }
      yPos = rnd(yMax) + size;
      // stop when we hit the edge
      if (xPos + size > 100) {
        i = 999;
      }
    }

    paths.forEach((path) => {
      // path
      if (path.d) {
        guts += `<path d="${path.d}" style="${path.s}" />`;
      }
      // circle
      if (path.r) {
        guts += `<circle cx="${path.cx}" cy="${path.cy}" r="${path.r}"  style="${path.s}" />`;
      }
    });

    return svg.wrap("", "", guts);
  },

  dim: () => {
    let element = document.querySelector(`#cloudLine`);
    element.style.opacity = 0.75;
  },
};
