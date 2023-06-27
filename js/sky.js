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
    let width = patch.width * 10;

    let element = document.querySelector(`#cloudLine`);
    element.style.width = `${width}px`;
    element.style.height = `${patch.height}px`;

    element = document.querySelector(`#nightShade`);
    element.style.width = `${width}px`;
    element.style.height = `${patch.height}px`;
  },

  clouds: () => {
    let cloudLine = document.querySelector(`#cloudLine`);
    let maxClouds = 5;
    let patch = getElementPos(`#patch_10`);
    let i = 0;

    while (i++ < maxClouds) {
      let cloudSprite = `<div id="cloud-${i}" class="cloud cloudBox"></div>`;

      // add the div that hold the svg to the sky cloudLine
      cloudLine.innerHTML += cloudSprite;
      let cloudBox = document.querySelector(`#cloud-${i}`);

      // set the cloudBox size
      Object.assign(cloudBox.style, {
        top: 0 + "px",
        left: patch.width + "px",
        width: patch.width + "px",
        height: patch.height + "px",
      });
      // restart with a new cloud and a new speed
      //cloudBox.addEventListener("animationiteration", sky.changeCloud());
      cloudBox.addEventListener("animationiteration", (event) => {
        if (i <= maxClouds) {
          sky.changeCloud(i);
        }
      });
      sky.changeCloud(i);
      let duration = rnd(250) + 50;
      let delay = rnd(50);
      cloudBox.style.left = "-100px";
      cloudBox.style.animation = `drift ${duration}s ${delay}s linear infinite`;
      
    }
  },
  
  changeCloud: (i) => {
    let svgInfo = sky.buildCloud();
    let cloudBox = document.querySelector(`#cloud-${i}`);
    if (!cloudBox) {
      console.log(`cant find #cloud-${i}`);
    } else {
      cloudBox.innerHTML = svgInfo;
    }
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
