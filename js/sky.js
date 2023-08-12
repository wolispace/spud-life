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
    let width = patch.width * player.cols;

    let element = document.querySelector(`#cloudLine`);
    element.style.width = `${width}px`;
    element.style.height = `${patch.height}px`;

    element = document.querySelector(`#nightShade`);
    element.style.width = `${width}px`;
    element.style.height = `${patch.height}px`;

    element = document.querySelector(`#starField`);
    element.style.width = `${width}px`;
    element.style.height = `${patch.height}px`;

  },

  clouds: () => {
    let cloudLine = document.querySelector(`#cloudLine`);
    let maxClouds = 10;
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
      let duration = rnd(300) + 50;
      let delay = rnd(50);
      cloudBox.style.left = "-100px";
      cloudBox.style.animation = `drift ${duration}s ${delay}s linear infinite`;
      
    }
  },
  
  changeCloud: (i) => {
    let svgInfo = sky.buildCloud();
    let cloudBox = document.querySelector(`#cloud-${i}`);
    if (cloudBox) {
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

  goDark: (straightToBed) => {
    // nightime.. when it ends..wait for customers to finish parade
    let nightShade = document.querySelector(`#nightShade`);
    let starField = document.querySelector(`#starField`);
    svg.animate(starField, "go-dark", 9, function () {
      starField.style.opacity = 1;
    });

    svg.animate(nightShade, "go-dark", 8, function () { 
      let nightShade = document.querySelector(`#nightShade`);
      nightShade.style.opacity = 1;
      sky.lightDoor();
      player.daytime = false;
      if (straightToBed) {
        home.enter();
      }
      state.save();
    });
    //element.style.animation = `${type} ${duration}s ease-in-out 0s 1 normal forwards`;
  },
  goLight: () => {
    // daytime.. when it ends.. wake up
    let nightShade = document.querySelector(`#nightShade`);
    let starField = document.querySelector(`#starField`);
    svg.animate(starField, "go-light", 4, function () {
      starField.style.opacity = 0;
    });
    svg.animate(nightShade, "go-light", 4, function () { 
      let nightShade = document.querySelector(`#nightShade`);
      nightShade.style.opacity = 0;
      player.daytime = true;
      state.save();
    });
  },
  
  lightDoor: () => {
    let houseDoor = document.querySelector(`#house-door`);
    if (houseDoor) {
      houseDoor.style.fill = 'yellow';
      hint.goHome();
    }
  },
  
  darkDoor: () => {
    let nightShade = document.querySelector(`#house-door`);
    nightShade.style.fill = 'black';
  },
  
  stars: function () {
    let patch = getElementPos(`#patch_0`);
    let width = patch.width * player.cols;
    let height = patch.height;
    let guts = '';
    let paths = [];

    let i = 0;
    
    while (i++ < 100) {
      paths.push({
        s: "",
        cx: rnd(width),
        cy: rnd(height),
        r: rnd(5) / 4,
      });
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

    let svgImg = `<svg class="stars" viewBox="0 0 ${width} ${height}" 
    xmlns="http://www.w3.org/2000/svg">
    ${guts}
    </svg>`;
    let starField = document.querySelector(`#starField`);
    starField.innerHTML = svgImg;
  },
};


