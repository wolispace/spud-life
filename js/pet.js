const pet = {
  sprite: document.querySelector(`#petSprite`),
  keyLeft: 'KeyA',
  keyRight: 'KeyD',
  keyUp: 'KeyW',
  keyDown: 'KeyS',

  render: function () {
    console.trace();
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

  moveLeft: function () {
    if (player.pet.pos % player.cols > 0) {
      player.pet.pos--;
    }
    state.save();
    pet.render();
  },

  moveRight: function () {
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

  show: function () {
    svg.showElement("#petSprite");
    let thisBlock = document.querySelector(`#petSprite svg`);
    svg.animate(thisBlock, `grow`, 1);
  },

  hide: function () {
    svg.hideElement("#petSprite");
  },
};

