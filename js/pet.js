const pet = {
  sprite: document.querySelector(`#petSprite`),
  keyLeft: 'KeyA',
  keyRight: 'KeyD',
  keyUp: 'KeyW',
  keyDown: 'KeyS',
  dayDelay: 3,
  initState: {
    pos: 9,
    state: 'standing',
  },
  introDelay: 5000,
  moveTimer: 3000,
  timer: null,


  render: function () {
    if (!player.pet || player.pet.pos < 0) {
      player.pet = {
        pos: player.cols-1, 
        state: 'standing',
      };
    }
    let patch = getElementPos(`#patch_${player.pet.pos}`);

    if (pet.sprite.innerHTML == "") {
      pet.sprite.innerHTML = svg.render(`pet-${player.pet.state}`);
    }

    let posY = patch.top + "px";
    let posX = patch.left + "px";
    let height = patch.height + "px";
    let width = patch.width + "px";

    if (player.pet.pos < player.cols) {
      height = patch.height / 2 + "px";
      width = patch.width / 2 + "px";
      posY = patch.top + (patch.height / 2) + "px";
      posX = patch.left + (patch.width / 4) + "px";
    }
    pet.sprite.style.top = posY;
    pet.sprite.style.left = posX;
    pet.sprite.style.width = width;
    pet.sprite.style.height = height;
  },

  start: function () {
    pet.timer = setInterval( pet.move, pet.moveTimer);
  },

  stop: function () {
    clearInterval(pet.timer); 
  },

  move: function () {
    if (rnd(2) == 1) {
      pet.moveLeft();
    } else {
      pet.moveRight();
    }
  },

  moveLeft: function () {
    let petSvg = document.querySelector(`#petSprite svg`);
    petSvg.style.transform = 'scale(-1,1)';
    if (player.pet.pos % player.cols > 0) {
      player.pet.pos--;
    }
    state.save();
    pet.render();
  },

  moveRight: function () {
    let petSvg = document.querySelector(`#petSprite svg`);
    petSvg.style.transform = 'scale(1,1)';
    if ((player.pet.pos % player.cols) - (player.cols - 1)) {
      player.pet.pos++;
    }
    state.save();
    pet.render();
  },

  moveUp: function () {
    if (player.pet.pos > player.cols - 1) {
      player.pet.pos -= player.cols;
    }
    state.save();
    pet.render();
  },

  moveDown: function () {
    if (player.pet.pos < (player.cols * player.rows) - player.cols) {
      player.pet.pos += player.cols;
    }
    state.save();
    pet.render();
  },
   animateOn: function() {
    pet.sprite.style.transition = "2s ease-in-out";
  },
  
   animateOff: function() {
    pet.sprite.style.transition = "";
  },
  

  show: function () {
    svg.showElement("#petSprite");
    let thisBlock = document.querySelector(`#petSprite svg`);
    svg.animate(thisBlock, `grow`, 1);
  },

  hide: function () {
    svg.hideElement("#petSprite");
  },

  check: function () {
    if (player.days > pet.dayDelay) {
      if (!player.pet) {
        player.pet = pet.initState;
        setTimeout( () => {pet.intro()}, pet.introDelay);
      }
    }
  },

  intro: function () {
    pet.render();
    hint.petIntro();
  }


};

