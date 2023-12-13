const controls = {
  list: {},

  // render control into the controls div not the world div
  renderControl: function (item) {
    let newSprite = `<div id="i${item.id}" class="sprite ${item.classes}">${item.svg}</div>`;
    addToControls(newSprite);
    item.sprite = sprite.get(item.id);
    item.position();
    item.shrinkWrap();
    item.position();
  },

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
        id: direction, x: newPos.x, y: newPos.y, qty: coords.qty,
        autoRender: false,
      }
      if (direction == 'spade') {
        tools.list[direction] = new Tool(params);
        let controlElement = sprite.get(direction);
        controls.stopDefaults(controlElement);
        controls.addDigEvent(controlElement);
      } else {
        controls.list[direction] = new Tool(params);
        let controlElement = sprite.get(direction);
        controls.stopDefaults(controlElement);
        controls.addMoveEvent(controlElement, direction);
      }

    });
  },

  addMoveEvent: function (controlElement, direction) {
    if (dialog.visible) {
      return;
    }
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
  },

  buttonUp: function () {
    timers.moving = false;
  },

  dig: function () {
    if (game.digging) {
      return;
    }
    let skyBottom = (sprite.height * sky.height) - (sprite.height / 4);
    if (game.playerItem.y > skyBottom) {
      if (tools.list['spade'].qty > 0) {
        game.digging = true;

        let onEnd = function () {
          game.playerItem.restorePos();
          let params = {
            id: game.getUid(),
            x: player.x,
            y: player.y,
            w: sprite.width,
            h: sprite.height,
            qty: 5,
            classes: '',
            item: 'hole'
          }
          let newHole = new game.Item(params);
          player.fields[player.currentField][game.SURFACE].push(newHole);
          game.playerItem.checkCollisions(game.UNDERGROUND);
          tools.list['spade'].decrQty();
          game.digging = false
          game.save();
        };
        game.playerItem.fixPos();
        game.playerItem.jumpUp(onEnd, 0.3);
      } else {
        hint.toolUsedUp('spade');
        tools.list.spade.jiggle('down');
      }
    } else {
      let onEnd = function () {
        game.playerItem.restorePos();
      };
      game.playerItem.fixPos();
      game.playerItem.jiggle('left', onEnd);
      hint.noDigHome();
    }
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
    if (game.direction) {
      controls.buttonUp(game.direction);
      clearInterval(timers[game.direction]);
      scanner.scan();
      game.save();
      timers.moving = false;
    }
  },
};

