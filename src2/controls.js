const controls = {
  list: {},

  render: function () {
    let padding = 15;
    let buttons = {
      up: { x: 1, y: 0, qty: '', px: padding, py: -padding },
      left: { x: 0, y: 1, qty: '', px: 0, py: 0 },
      spade: { x: 1, y: 1, qty: 10, px: padding, py: 0 },
      right: { x: 2, y: 1, qty: '', px: padding * 2, py: 0 },
      down: { x: 1, y: 2, qty: '', px: padding, py: padding },
    }
    let start = { x: 0, y: sprite.height * 4 };


    Object.entries(buttons).forEach(([direction, coords]) => {
      let newPos = {
        x: start.x + sprite.width * coords.x + coords.px,
        y: start.y + sprite.height * coords.y + coords.py,
      };
      let iconSvg = svg.render(direction);
      //console.log(direction, iconSvg);

      controls.list[direction] = new Tool(direction, newPos.x, newPos.y, coords.qty);
      let controlElement = sprite.get(direction);

      controls.stopDefaults(controlElement);
      if (['spade'].includes(direction)) {
        controls.addDigEvent(controlElement);
      } else {
        controls.addMoveEvent(controlElement, direction);
      }
    });

    controls.list['spade'].updateQty(player.tools.spade);
  },

  addMoveEvent: function (controlElement, direction) {
    if (dialog.visible) {
      return;
    }
    controlElement.onmousedown = function () { character.movePlayer(direction); };
    controlElement.onmouseup = function () { controls.endInput(); };
    //controlElement.onmouseout = function () { controls.endInput(direction); };
    controlElement.addEventListener("touchstart", function () { character.movePlayer(direction); }, false);
    controlElement.addEventListener("touchend", function () { controls.endInput(); });
    state.save();
  },

  addDigEvent: function (controlElement) {
      controlElement.onmousedown = function () { controls.dig(); };
      controlElement.addEventListener("touchstart", function () { controls.dig(); }, false);

  },

  buttonDown: function (direction) {
    controls.direction = direction;
    let buttonDiv = document.querySelector(`.${direction}`);
    svg.animate(buttonDiv, 'buttonDown', 0.15);
    //console.log('button down - why not stopping', direction);
  },

  buttonUp: function () {
    timers.moving = false;
  },


  dig: function () {
    let skyBottom = (sprite.height * sky.height);

    controls.buttonDown('spade');
    let itemSvg = svg.render("hole", 5);
    let hole = { scale: 1 };
    let item = 'hole';
    let qty = 5;
    let playerBox = character.getPlayerBox();
    if (playerBox.top > skyBottom && player.tools.spade > 0) {
      let foundItem = controls.collision(playerBox);
      if (foundItem) {
        let foundSvg = svg.render(foundItem, 1);
        if (!foundSvg) {
          // TODO: this needs to be a spud
          foundItem = 'rock2';
        }
        let itemSprite = new game.Item (foundItem, playerBox.x, playerBox.y,sprite.width, sprite.height);
        itemSprite.render();
        let endItem = tools.list.basket;
        onEnd = function () { 
          itemSprite.remove();
          delete itemSprite;
          setTimeout( () => {
            endItem.jiggle('down');
            setTimeout( () => {
              endItem.updateQty(endItem.qty + 1);
            }, 200);
          }, 1);

        };
        sprite.animateArc(itemSprite, endItem, onEnd);

      }
      let newHole = new game.Item(game.uid++, player.x, player.y, sprite.width, sprite.height, 1, 'hole');
      newHole.render(itemSvg);

      field.addItem(game.SURFACE, newHole.x, newHole.y, newHole.y, newHole.h, item, qty, newHole.id);
      player.tools.spade--;
      controls.list['spade'].updateQty(player.tools.spade);
      state.save();
    }
  },

  collision: function (playerBox) {
    let retValue = false;
    let spritesList = player.fields[player.currentField][game.UNDERGROUND];
  
    for (let i = 0; i < spritesList.length; i++) {
      if (sprite.collides(playerBox, spritesList[i])) {
        retValue = spritesList[i].item;
        spritesList.splice(i, 1); // This will remove the item from the list
        break; // This will stop checking for collisions after the first one is found
      }
    }
  
    return retValue;
  },

  stopDefaults: function (controlElement) {
    if (isDev) {
      return;
    }

    // stop things like text selection and RMB menu
    controlElement.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation(); // not necessary in my case, could leave in case stopImmediateProp isn't available? 
      event.stopImmediatePropagation();
      return false;
    };
  },

  endInput: function () {
    controls.buttonUp(controls.direction);
    clearInterval(timers[controls.direction]);
    state.save();
  },

};

