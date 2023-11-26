const pet = {
  state: 'sitting',
  name: 'Stray',
  currentField: 0,
  moving: false,
  timer: null,
  fieldDelim: '|',

  encode: function () {
    if (game.petItem) {
      return `${pet.name}${pet.fieldDelim}${pet.currentField}${pet.fieldDelim}${game.petItem.x}${pet.fieldDelim}${game.petItem.y}`;
    }
  },

  decode: function (encodedString) {
    let bit = encodedString.split(pet.fieldDelim);
    pet.name = bit[0];
    pet.currentField = bit[1];
    game.petItem.x = bit[2];
    game.petItem.y = bit[3];
  },

  show: function () {
    console.log(player.currentField, pet.currentField);
    if (player.currentField != pet.currentField) {
      pet.finished();
      game.petItem.hide();
    } else {
      pet.add();
    }
  },

  add: function () {
    if (player.day > 1) {
      if (!game.petItem) {
        let params = {
          id: 'pet',
          x: (sprite.width * game.grid.x) - sprite.width,
          y: sprite.height,
          w: sprite.width,
          h: sprite.height,
          item: `pet-${pet.state}`,
        };
        game.petItem = new Mobile(params);
      } else {
        game.petItem.render();
      }
      game.petItem.show();
      pet.think();      
    }
  },

  setState: function (newState) {
    pet.state = newState;
    let newSvg = svg.render(`pet-${pet.state}`);
    game.petItem.refresh(newSvg);
  },

  think: function () {
    // TODO do more things like sleep, scratch.. for we just move to a buried item
    let paws = (rnd(2) + 5) * 1000;
    setTimeout( pet.moveToRandomItem, paws);
  },

  moveToRandomItem() {
    // find a random item underground in the same field as the pet..
    let buried = player.fields[pet.currentField][game.UNDERGROUND];
    let endItem = buried[Math.floor(Math.random() * buried.length)];
    pet.moveTo(endItem);
  },

  distanceToEndItem: function (endItem) {
    // returns seconds so pet moves at a consistent speed no matter how far they travel
    let distance = {
      x: Math.abs(game.petItem.x - endItem.x) / sprite.width,
      y: Math.abs(game.petItem.y - endItem.y) / sprite.height,
    };
    let diagonal = calculateDiagonal(distance.y, distance.x);
    let duration = parseInt(diagonal / 2) + 0.5;

    return duration;
  },

  facing: function (endItem) {
    let petSprite = document.querySelector("#ipet > svg");
    if (game.petItem.x > endItem.x) {
      // flip
      petSprite.setAttribute("transform", "translate(0, 0) scale(-1, 1)");
    } else {
      petSprite.setAttribute("transform", "translate(0, 0) scale(1, 1)");
    }
  },

  moveTo: function (endItem) {
    if (pet.moving || player.currentField != pet.currentField) {
      return;
    }
    pet.setState('standing');
    pet.facing(endItem);
    pet.moving = true;
    let params = {
      easing: 'linear',
      keyFrame: 'move-to',
      duration: pet.distanceToEndItem(endItem),
      repeat: '1',
      endItem: endItem,
      onEnd: function () {
        game.petItem.x = endItem.x;
        game.petItem.y = endItem.y;
        pet.setState('sitting');
        pet.think();
        pet.finished();

      }
    }

    game.petItem.animatePath(params);
  },

  finished: function () {
    pet.moving = false;
    game.petItem.fixPos();
    game.petItem.resetAnimation();
  }
}