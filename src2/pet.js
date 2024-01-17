const pet = {
  state: 'sitting',
  name: 'Stray',
  daysToPet: 4, // they appear on the next day
  currentField: 0,
  moving: false,
  timer: null,
  pawsTime: 5,
  pawsMin: 5,
  locked: true,
  level: 0,

  encode: function () {
    if (game.petItem) {
      let encoded = `${pet.name}${game.fldDelim}${pet.currentField}${game.fldDelim}`;
      encoded += `${game.petItem.x}${game.fldDelim}${game.petItem.y}${game.fldDelim}${pet.level}`;
      return encoded;
    }
    else return '';
  },

  decode: function (encodedString) {
    if (encodedString) {
      pet.add();
      let bit = encodedString.split(game.fldDelim);
      pet.name = bit[0];
      pet.currentField = parseInt(bit[1]);
      game.petItem.x = parseInt(bit[2]);
      game.petItem.y = parseInt(bit[3]);
      game.level = parseInt(bit[4]) ?? 0;
      game.petItem.setPos();
    }
  },

  show: function () {
    if (player.currentField != pet.currentField) {
      pet.finished();
    } else {
      pet.add();
    }
  },

  add: function () {
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
    pet.locked = false;
    game.petItem.show();
    pet.think();
  },

  setState: function (newState) {
    pet.state = newState;
    let newSvg = svg.render(`pet-${pet.state}`);
    game.petItem.refresh(newSvg);
  },

  think: function () {
    // TODO do more things like sleep, scratch.. 
    let paws = (rnd(pet.pawsTime) + pet.pawsMin) * 1000;
    if (rnd(5) == 1 && pet.level > 0) {
      pet.timer = setTimeout(pet.moveToRandomItem, paws);
    } else {
      pet.timer = setTimeout(pet.goPlayer, paws);
    }
  },

  moveToRandomItem() {
    if (pet.locked) {
      return;
    }
    // find a random item underground in the same field as the pet..
    let buried = player.fields[pet.currentField][game.UNDERGROUND];
    let endItem = buried[Math.floor(Math.random() * buried.length)];
    if (endItem) {
      let endAction = function () {
        pet.setState('sitting');
        pet.finished();
        if (pet.level > 0) {
          pet.level--;
        }
        pet.think();
        pet.showMsg();
      }
      pet.moveTo(endItem, endAction);
    } else {
      pet.think();
      pet.showMsg();
    }
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
    //console.trace('pet?', pet, player, game);
    if (endItem) {
      let petSprite = document.querySelector("#ipet > svg");
      if (petSprite) {
        if (game.petItem.x > endItem.x) {
          // flip
          petSprite.setAttribute("transform", "translate(0, 0) scale(-1, 1)");
        } else {
          petSprite.setAttribute("transform", "translate(0, 0) scale(1, 1)");
        }
      } else {
        console.trace('no pet yet to face towards', endItem);
      }
    } else {
      console.trace('facing nothing!', endItem);
    }
  },

  moveTo: function (endItem, endAction, speed = 1) {
    if (hint.visible) {
      pet.think();
      return;
    }

    if (pet.locked || pet.moving || player.currentField != pet.currentField) {
      return;
    }
    pet.setState('standing');
    pet.facing(endItem);
    pet.moving = true;
    game.petItem.sprite.classList.add('moving');
    let params = {
      easing: 'linear',
      keyFrame: 'move-to',
      duration: pet.distanceToEndItem(endItem) * speed,
      repeat: '1',
      endItem: endItem,
      onEnd: function () {
        game.petItem.x = endItem.x;
        game.petItem.y = endItem.y;
        endAction();
      }
    }
    game.petItem.animatePath(params);
  },

  finished: function () {
    pet.moving = false;
    game.petItem.sprite.classList.remove('moving');
    if (pet.timer) {
      clearTimeout(pet.timer);
      //console.log('timeout cleared');
    }
    game.petItem.fixPos();
    game.petItem.resetAnimation();
  },

  save: function () {
    let dialogInput = document.querySelector(`#petName`);
    pet.name = cleanString(dialogInput.value) || character.randomName();
    player.petChatter = dialog.isChecked("petChatterOn");
    if (tools.list.basket.list.bone) {
      if (dialog.isChecked("boneQty")) {
        let boneQty = tools.list.basket.list.bone;
        pet.giveBones(boneQty);
      }
    }
    dialog.hide();
    game.save();
    buildings.list.home.enter();
  },

  interact: function () {
    let title = `${pet.name}`;

    let content = `<div class="dialog-message-content">`;
    content += `<div>Its small, black and fluffy. is it a dog or cat?</div>`;
    content += pet.editName();
    content += pet.showLevel();
    content += pet.showBones();
    content += dialog.makeCheckbox("petChatterOn", "Pet chatter", player.petChatter);
    let footer = "";
    footer += `<div></div>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { pet.save(); };
    dialog.okButton = function () { pet.save(); };
    dialog.render(title, content, footer);
    dialog.hasInput = true;
  },

  showLevel: function () {
    let html = `<div>`;
    if (pet.level > 0) {
      html += `${pet.name} is happy and it will look for buried treasure.`;
    } else {
      html += `${pet.name} is not all that interested in looking for buried treasure. Give it a present to cheer it up.`;
    }
    html += `</div>`;
    return html;
  },

  showBones: function () {
    let html = '<div>';
    let boneCount = tools.list.basket.list.bone;
    let itemSvg = svg.inline('bone', 2);
    if (boneCount > 0) {
      html += dialog.makeCheckbox("boneQty", `Give ${pet.name} ${boneCount} ${itemSvg}`, false);
    } else {
      html = `<div>You have no ${itemSvg} to give ${pet.name}.</div>`;
    }
    html += `</div>`;
    return html;
  },

  giveBones: function (boneQty) {
    tools.list.basket.list.bone = 0;
    basket.recount();
    pet.level += boneQty;
  },

  editName: function () {
    return `<div><label>You call it <input type="text" id="petName" 
      placeholder="Pet's name" value="${pet.name}" 
      maxlength="14" /></div>`;
  },

  goHome: function () {
    if (game.petItem) {
      pet.finished();
      let endAction = function () {
        pet.setState('sitting');
        game.petItem.hide();
        pet.finished();
        pet.locked = true;
      }
      pet.moveTo(buildings.list.home.centre(), endAction, 0.5);
      player.currentField = 0;
    }
  },

  goPlayer: function () {
    if (game.petItem) {
      //pet.finished();
      if (pet.currentField != player.currentField) {
        game.petItem.x = -sprite.width;
        if (pet.currentField > player.currentField) {
          game.petItem.x = (sprite.width * (game.grid.x + 1));
        }
        pet.currentField = player.currentField;
        game.petItem.render();
      }
      let endAction = function () {
        pet.setState('sitting');
        pet.finished();
        pet.think();
        pet.showMsg();
        game.petItem.sprite.classList.remove('moving');
      }
      pet.moveTo(game.playerItem.centre(), endAction, 0.5);
    }
  },

  showMsg: function () {
    if (!dialog.visible && !hint.visible) {      
      let paws = (rnd(2) + 2) * 1000;
      if (rnd(20) == 1) {
        setTimeout(hint.petMsg, paws);
      }
      game.petItem.fixPos();
    }
  },

}
