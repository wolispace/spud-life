const pet = {
  sprite: document.querySelector(`#petSprite`),
  keyLeft: 'KeyA',
  keyRight: 'KeyD',
  keyUp: 'KeyW',
  keyDown: 'KeyS',
  dayDelay: 3,
  initState: {
    pos: 9,
    state: 'sitting',
  },
  introDelay: 5000,
  moveTimer: 5000,
  moveDelay: 10,
  timer: null,
  lastPos: -1,
  interacting: false,

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
    player.pet.state = 'sitting';
    pet.render();
    pet.timer = setInterval( pet.move, pet.moveTimer + (rnd(pet.moveDelay) * 1000));
  },

  stop: function () {
    clearInterval(pet.timer); 
  },

  checkPos: function () {
    if (player.pet && (player.pos == player.pet.pos && player.pet.state == 'sitting')) {
      setTimeout(() => {pet.interact()}, 300);
    }
  },

  move: function () {
    if (pet.interacting) {
      return;
    }
    pet.stand();
    // pet is befriended full range of movement
    let r = rnd(5);
    switch (r) {
      case 0:
        pet.moveLeft();
        break;
      case 1:
        pet.moveRight();
        break;
      case 2:
        pet.moveUp();
        break;
      case 3:
        pet.moveDown();
        break;
      case 4:
        pet.maybeDig();
        break;
    }
  },

  moveLeft: function () {
    pet.lastPos = player.pet.pos;
    let petSvg = document.querySelector(`#petSprite svg`);
    petSvg.style.transform = 'scale(-1,1)';
    if (player.pet.pos % player.cols > 0) {
      player.pet.pos--;
    }
    pet.moveEnd();
  },

  moveRight: function () {
    pet.lastPos = player.pet.pos;
    let petSvg = document.querySelector(`#petSprite svg`);
    petSvg.style.transform = 'scale(1,1)';
    if ((player.pet.pos % player.cols) - (player.cols - 1)) {
      player.pet.pos++;
    }
    pet.moveEnd();
  },

  moveUp: function () {
    pet.lastPos = player.pet.pos;
    if (player.pet.pos > player.cols - 1) {
      player.pet.pos -= player.cols;
    }
    pet.moveEnd();
  },

  moveDown: function () {
    pet.lastPos = player.pet.pos;
    if (player.pet.pos < (player.cols * player.rows) - player.cols) {
      player.pet.pos += player.cols;
    }
    pet.moveEnd();
  },

  moveEnd: function () {
    // always sit after moving
    setTimeout( () => {pet.sit()}, 2100);
    state.save();
    pet.render();
  },

  maybeDig: function () {

  },

  animateOn: function() {
    pet.sprite.style.transition = "2s ease-in-out";
  },
  
  animateOff: function() {
    pet.sprite.style.transition = "";
  },
  
  stand: function () {
    player.pet.state = 'standing';
    pet.sprite.innerHTML = svg.render(`pet-${player.pet.state}`);
  },

  sit: function () {
    player.pet.state = 'sitting';
    pet.sprite.innerHTML = svg.render(`pet-${player.pet.state}`);
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
    pet.start();
  },

  interact: function () {
    pet.interacting = true;
    player.pet.name = player.pet.name ?? '';
    let title = 'The stray'; 
    let content = `<div class="dialog-message-content">`;
    if (player.pet.name == '') {
      content += `<div>${svg.inline('pet-sitting')}Befriend this stray by naming it:</div>`;
    } else {
      title = `Your friend ${player.pet.name}`;
      content += `<div>You can rename your furry friend if you like.</div>`;
    }
    content += '.... ' + pet.editName();

    let footer = "";
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = pet.interactCancel;
    dialog.okButton = pet.interactOk;
    dialog.hasInput = true;
    dialog.render(title, content, footer);
  },

  interactOk: function () {
    let dialogInput = document.querySelector(`#petName`);
    player.pet.name = cleanString(dialogInput.value);
    state.save();
    pet.interactEnd();
  },

  interactCancel: function () {
    pet.interactEnd();
  },

  interactEnd: function () {
    pet.interacting = false;
    character.show(); 
    dialog.hide();
  },

  editName: function () {
    return `<div><input type="text" id="petName" value="${player.pet.name}" /></div>`;
  },


};

