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
    if (game.digging) {
      return;
    }
    let skyBottom = (sprite.height * sky.height);
    
    controls.buttonDown('spade');
    
    if (game.playerItem.y > skyBottom && player.tools.spade > 0) {
      game.digging = true;
      let foundItem = controls.collision(game.playerItem);
      if (foundItem) {
        let foundSvg = svg.render(foundItem, 1);
        if (!foundSvg) {
          // TODO: this needs to be a spud
          foundItem = 'rock2';
        }
        let itemSprite = new game.Item (foundItem, game.playerItem.x, game.playerItem.y,sprite.width, sprite.height);
        itemSprite.render();
        let endItem = tools.list.basket;
        onEnd = function () { 
          itemSprite.remove();
          delete itemSprite;
          setTimeout( () => {
            game.digging = false;
            endItem.jiggle('down');
            setTimeout( () => {
              endItem.updateQty(endItem.qty + 1);
            }, 200);
          }, 1);

        };
        sprite.animateArc(itemSprite, endItem, onEnd);

      } else {
        game.digging = false;
      }
      let newHole = new game.Item(game.uid++, player.x, player.y, sprite.width, sprite.height, 5, '', 'hole');
      let itemSvg = svg.render("hole", 5);
      newHole.render(itemSvg);
      console.log(game.uid, newHole);
      player.fields[player.currentField][game.SURFACE][game.uid] = newHole;
      player.tools.spade--;
      controls.list['spade'].updateQty(player.tools.spade);
      state.save();
    }
  },

  collision: function (playerItem) {
    let retValue = false;
    let spritesList = player.fields[player.currentField][game.UNDERGROUND];
  
    for (let i = 0; i < spritesList.length; i++) {
      if (sprite.collides(playerItem, spritesList[i])) {
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

