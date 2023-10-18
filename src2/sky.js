const sky = {
  height: 2,
  id: 'skyBox',
  clouds: [],

  render: function () {
    // make sure we have a sky div that is 0,0, 100% sprite.height * sky.height
    let skyBox = document.querySelector(`.${sky.id}`);
    if (!skyBox) {
      addToBody(`<div class="${sky.id}" ></div>`);
    }
    skyBox = document.querySelector(`.${sky.id}`);
    skyBox.style.height = `${sprite.height * sky.height}px`;
    sky.seedClouds();
  },

  seedClouds: function () {
    let cloudCount = 10;
    let params = {
      x: sprite.width /2,
      y: sprite.height / 2,
      w: sprite.width,
      h: sprite.height,
      item: 'blank',
    };

    while (cloudCount-- > 0) {
      params.id = `cloud_${cloudCount}`;
      let cloud = new Cloud(params);
      sky.clouds.push(cloud);
    }

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

