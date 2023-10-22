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

    let nightShade = document.querySelector(`.nightShade`);
    nightShade.style.height = `${sprite.height * sky.height}px`;

    let starField = document.querySelector(`.starField`);
    starField.style.height = `${sprite.height * sky.height}px`;

    sky.seedClouds();
    sky.moveClouds();
  },

  seedClouds: function () {
    let cloudCount = 10;
    let params = {
      w: sprite.width,
      h: sprite.height,
      item: 'blank',
    };
    while (cloudCount-- > 0) {
      params.id = `cloud_${cloudCount}`;
      params.x = - (sprite.width + rnd(sprite.width * 10));
      params.y = rnd(sprite.height/2);
      let cloud = new Cloud(params);
      sky.clouds.push(cloud);
    }
  },

  moveClouds: function () {
    let speed = 100;
    let params = {
      easing: 'linear',
      keyFrame: 'drift',
      repeat: 'infinite',
      endItem: {
        y: sprite.height / 2,

      },
      onEnd: function () {
        // fluff
        sky.moveClouds();
      }
    };
    sky.clouds.forEach(function (cloud) {
      params.endItem.x = sprite.width * (game.grid.x + rnd(2));
      params.duration = speed + cloud.y;
      
      cloud.animatePath(params);
    });

  },



  goDark: (straightToBed) => {
    // nightime.. when it ends..wait for customers to finish parade
    let nightShade = document.querySelector(`.nightShade`);
    let starField = document.querySelector(`.starField`);
    svg.animate(starField, "go-dark", 9, function () {
      starField.style.opacity = 1;
    });

    svg.animate(nightShade, "go-dark", 8, function () {
      let nightShade = document.querySelector(`.nightShade`);
      nightShade.style.opacity = 1;
      sky.lightDoor();
      player.daytime = false;
      if (straightToBed) {
        home.enter();
      }
      game.save();
    });
    //element.style.animation = `${type} ${duration}s ease-in-out 0s 1 normal forwards`;
  },

  goLight: () => {
    // daytime.. when it ends.. wake up
    let nightShade = document.querySelector(`.nightShade`);
    let starField = document.querySelector(`.starField`);
    svg.animate(starField, "go-light", 4, function () {
      starField.style.opacity = 0;
    });
    svg.animate(nightShade, "go-light", 4, function () {
      let nightShade = document.querySelector(`.nightShade`);
      nightShade.style.opacity = 0;
      sky.darkDoor();
      player.daytime = true;
      game.save();
    });
  },

  lightDoor: () => {
    let houseDoor = document.querySelector(`#house-door`);
    if (houseDoor) {
      houseDoor.style.fill = 'yellow';
      //hint.goHome();
    }
  },

  darkDoor: () => {
    let houseDoor = document.querySelector(`#house-door`);
    houseDoor.style.fill = 'black';
  },

  stars: function () {
    let starField = document.querySelector(`.starField`);
    let width = starField.offsetWidth;
    let height = starField.offsetHeight;
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

    let svgImg = `<svg class="stars" viewBox="0 0 ${width} ${height}">
    ${guts}
    </svg>`;

    starField.innerHTML = svgImg;
  },

};

