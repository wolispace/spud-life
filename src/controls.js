const controls = {
  render: function () {
    let padding = 15;
    let buttons = {
      up: { x: 1, y: 0, px: padding, py: -padding },
      left: { x: 0, y: 1, px: 0, py: 0 },
      spade: { x: 1, y: 1, px: padding, py: 0 },
      right: { x: 2, y: 1 , px: padding * 2, py: 0},
      down: { x: 1, y: 2 , px: padding, py: padding},
    }
    let start = { x: 0, y: sprite.height * 4 };

    
    Object.entries(buttons).forEach(([direction, coords]) => {
      let newPos = {
        x: start.x + sprite.width * coords.x + coords.px,
        y: start.y + sprite.height * coords.y + coords.py,
      };
      let iconSvg = svg.render(direction);
      //console.log(direction, iconSvg);

      let controlId = sprite.render(newPos.x, newPos.y, iconSvg, sprite.width, sprite.height, `control ${direction}`);
      let controlElement = document.querySelector(`#i${controlId}`);

      controls.stopDefaults(controlElement);
      if (['spade'].includes(direction)) {
        controls.onDig(controlElement);
      } else {
        controls.onMove(controlElement, direction);
      }
    });
  },

  onMove: function (controlElement, direction) {
    controlElement.onmousedown = function () { character.movePlayer(direction); };
    controlElement.onmouseup = function () { controls.endInput(direction); };
    //controlElement.onmouseout = function () { controls.endInput(direction); };
    controlElement.addEventListener("touchstart", function () { character.movePlayer(direction); }, false);
    controlElement.addEventListener("touchend", function () { controls.endInput(direction); });
    state.save();
  },

  onDig: function (controlElement) {
    controlElement.onmousedown = function () { controls.dig(); };
    controlElement.addEventListener("touchstart", function () { controls.dig(); }, false);
    state.save();
  },

  buttonDown: function (direction) {
    let buttonDiv = document.querySelector(`.${direction}`);
    svg.animate(buttonDiv, 'buttonDown', 0.15);
    //console.log('button down - why not stopping', direction);
  },

  buttonUp: function (direction) {
    //let buttonDiv = document.querySelector(`.${direction}`);
    //svg.animate(buttonDiv, 'buttonUp', 0.25);
    //console.log('button up', direction);
  },


  dig: function () {
    controls.buttonDown('spade');
    let itemSvg = svg.render("hole", 5);
    let hole = { scale: 1 };
    let item = 'hole';
    let qty = 5;
    let playerBox = character.getPlayerBox();
    sprite.render(playerBox.x, playerBox.y, itemSvg, sprite.width * hole.scale, sprite.height * hole.scale, item);
    field.addItem(game.SURFACE, playerBox.x, playerBox.y, item, qty);
    state.save();
  },

  stopDefaults: function (controlElement) {
    // DEBUG: so i can inspect things
    return;
    // stop things like text selection and RMB menu
    controlElement.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation(); // not necessary in my case, could leave in case stopImmediateProp isn't available? 
      event.stopImmediatePropagation();
      return false;
    };
  },

  endInput: function (direction) {
    controls.buttonUp(direction);
    clearInterval(timers[direction]);
    timers.moving = false;
    state.save();
  },

};

