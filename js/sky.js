/*
layers:
0 = field rectangle sky
1 = night overlay
2 = star overlay
3 = clouds
4 = buildings
5 = customers
6 = player
7 = grassLine
*/

const sky = {
  render: () => {
    // find patch_10
    let patch = getElementPos(`#patch_10`);
    let height = patch.height;

    let element = document.querySelector(`#skyBox`);
    // element.style.width = `${width}px`;
    element.style.height = `${height}px`;
  },

  clouds: () => {
    //https://codepen.io/NvIGA/pen/geRNmv
    let svgInfo = sky.buildCloud(); // svg.render("cloud-004");

    let element = document.querySelector(`#skyBox`);
    let cloudSprite = `<div id="cloud-001" class="cloud">${svgInfo}</div>`;
    element.innerHTML = cloudSprite;
    let cloudBox = document.querySelector(`#cloud-001`);

    let patch10 = document.querySelector(`#patch_10`);
    let patch = patch10.getBoundingClientRect();
    let posY = 0 + "px";
    let posX = patch.width + "px";
    let height = patch.height + "px";
    let width = patch.width + "px";
    cloudBox.style.top = posY;
    cloudBox.style.left = posX;
    cloudBox.style.width = width;
    cloudBox.style.height = height;
    let duration = rnd(3) + 20;
    cloudBox.style.animation = "move-cloud 20s linear infinite";
  },

  buildCloud: () => {
    let guts = "";
    let paths = [];
    let size = rnd(20) + 1;
    let yPos = rnd(40) + size / 2;
    let xPos = size;
    let i = 0;

    while (i++ < 20) {
      paths.push({
        c: "",
        cx: xPos,
        cy: yPos,
        r: size,
      });
      size = rnd(20) + 2;
      xPos += rnd(10);
      yPos = rnd(40) + size / 2;
      // stop when we hit the edge
      if (xPos + size / 2 > 100) {
        i = 999;
      }
    }
    // // TODO: build this..
    // let paths = [
    //   { c: "", cx: 19, cy: 21, r: 8 },
    //   { c: "", cx: 9, cy: 30, r: 6 },
    //   { c: "", cx: 29, cy: 31, r: 4 },
    //   { c: "", cx: 76, cy: 21, r: 11 },
    //   { c: "", cx: 58, cy: 17, r: 7 },
    //   { c: "", cx: 36, cy: 17, r: 5 },
    // ];

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
    let element = document.querySelector(`#skyBox`);
    element.style.opacity = 0.75;
  },
};
