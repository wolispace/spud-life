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

      let params = {
        id: direction, x: newPos.x, y: newPos.y, qty: coords.qty
      }
      controls.list[direction] = new Tool(params);
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
    // possibly use eventStreams to filter out excessive mousedown events
    // https://stackoverflow.com/questions/20775530/move-box-with-the-mouse-cursor

    controlElement.onmousedown = function () { game.playerItem.move(direction); };
    controlElement.onmouseup = function () { controls.endInput(); };
    //controlElement.onmouseout = function () { controls.endInput(direction); };
    controlElement.addEventListener("touchstart", function () { game.playerItem.move(direction); }, false);
    controlElement.addEventListener("touchend", function () { controls.endInput(); });
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
      // add the hole first
      let params = {
        id: game.uid++, x: player.x, y: player.y, w: sprite.width, h: sprite.height, qty: 5, classes: '', item: 'hole'
      }
      let newHole = new game.Item(params);
      player.fields[player.currentField][game.SURFACE].push(newHole);

      let foundItem = game.playerItem.checkCollisions(game.UNDERGROUND);

      if (foundItem) {
        let foundSvg = svg.render(foundItem, 1);
        if (!foundSvg) {
          // TODO: this needs to be a spud
          foundItem = 'rock2';
        }
        let params = {
          id: foundItem, x: game.playerItem.x, y: game.playerItem.y, w: sprite.width, h: sprite.height
        }
        let itemSprite = new game.Item (params);
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
      // TODO: z-index should be above hole

      player.tools.spade--;
      controls.list['spade'].updateQty(player.tools.spade);
      game.save();
    }
  },

  collision: function (playerItem) {
    return game.playerItem.checkCollisions(game.UNDERGROUND);
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
    controls.buttonUp(game.playerItem.direction);
    clearInterval(timers[game.playerItem.direction]);
    game.save();
    timers.moving = false;
  },

};

