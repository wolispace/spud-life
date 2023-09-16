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
      //controls.list[itemName].onClick = tools.clicks[itemName];
      //let newSprite = sprite.render(direction, newPos.x, newPos.y, iconSvg, sprite.width, sprite.height, `control ${direction}`);

      let controlElement = document.querySelector(`#i${direction}`);

      controls.stopDefaults(controlElement);
      if (['spade'].includes(direction)) {
        controls.onDig(controlElement);
      } else {
        controls.onMove(controlElement, direction);
      }
    });

    controls.list['spade'].updateQty(player.tools.spade);
  },

  onMove: function (controlElement, direction) {
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

  onDig: function (controlElement) {
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
        console.log(foundItem);
      }
      let newBox = sprite.render(game.uid++, playerBox.x, playerBox.y, itemSvg, sprite.width * hole.scale, sprite.height * hole.scale, item);
      field.addItem(game.SURFACE, playerBox.x, playerBox.y, newBox.width, newBox.height, item, qty, newBox.uid);
      player.tools.spade--;
      controls.list['spade'].updateQty(player.tools.spade);
      state.save();
    }
  },


  collision: function (playerBox) {
    let retValue = false;
    let spritesList = player.fields[player.currentField][game.UNDERGROUND];

    spritesList.forEach(spriteBox => {
      if (sprite.collides(playerBox, spriteBox)) {
        retValue = spriteBox.item;
      }
    });
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

