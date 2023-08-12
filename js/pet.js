const pet = {
  sprite: document.querySelector(`#petSprite`),
  render: function () {
    if (!player.pet || player.pet.pos < 0) {
      player.pet = {
        pos: player.cols-1, 
        state: 'standing'
      };
    }
    let patch = getElementPos(`#patch_${player.pet.pos}`);

    if (pet.sprite.innerHTML == "") {
      pet.sprite.innerHTML = svg.render(`pet-${player.pet.state}`);
    }
    pet.sprite.style.top = `${patch.top}px`;
    pet.sprite.style.left = `${patch.left}px`;
    pet.sprite.style.width = `${patch.width}px`;
    pet.sprite.style.height = `${patch.height}px`;
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

