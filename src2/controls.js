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
    if (!player.cursors) {
      return;
    }
    let buttons = {
      up: { x: 1, y: 0, qty: '', px: game.tool.padding, py: -game.tool.padding },
      left: { x: 0, y: 1, qty: '', px: 0, py: 0 },
      right: { x: 2, y: 1, qty: '', px: game.tool.padding * 2, py: 0 },
      down: { x: 1, y: 2, qty: '', px: game.tool.padding, py: game.tool.padding },
    }

    controls.addBacking();

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
      controls.list[direction] = new Tool(params);
      let controlElement = sprite.get(direction);
      controls.stopDefaults(controlElement);
      controls.addMoveEvent(controlElement, direction);
    });
    controls.backingPos();
  },

  addBacking: function () {
    let html = `<div class="controlsBacking ex"></div>`;
    html += `<div class="controlsBacking why"></div>`;
    html += `<div class="controlsBacking spd"></div>`;
    addToControls(html);
  },

  backingPos: function () {
    // the X
    let backing = document.querySelector(".ex");
    let start = controls.list['left'];
    let end = controls.list['right'];
    let padding = start.w / 2;
    backing.style.left = `${start.x - padding}px`;
    backing.style.top = `${start.y - padding}px`;
    backing.style.width = `${end.x + end.w + padding * 2}px`;
    backing.style.height = `${start.h + padding * 2}px`;
    

    backing = document.querySelector(".why");
    start = controls.list['up'];
    end = controls.list['down'];

    backing.style.left = `${start.x - padding}px`;
    backing.style.top = `${start.y - padding}px`;
    backing.style.width = `${start.w + padding * 2}px`;
    backing.style.height = `${end.y + end.h - start.y + padding * 2}px`
    
  },

  removeAll: function () {
    var elements = document.getElementsByClassName("control");

    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  },

  removeCursors: function () {
    var ids = ["iup", "idown", "ileft", "iright"];

    ids.forEach(function (id) {
      var element = document.getElementById(id);
      if (element) {
        element.parentNode.removeChild(element);
      }
    });
  },

  addMoveEvent: function (controlElement, direction) {
    if (dialog.visible) {
      return;
    }
    controlElement.onmousedown = function () { game.playerItem.move(direction); };
    controlElement.onmouseup = function () { controls.endInput(true); };
    //controlElement.onmouseout = function () { controls.endInput(direction); };
    controlElement.addEventListener("touchstart", function () { game.playerItem.move(direction); }, false);
    controlElement.addEventListener("touchend", function () { controls.endInput(true); });
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
    if (game.digging || dialog.visible) {
      return;
    }
    let skyBottom = (sprite.height * sky.height) - (sprite.height / 4);
    if (game.playerItem.y > skyBottom - (sprite.height / 2)) {
      if (tools.list['spade'].qty > 0) {
        game.digging = true;

        let onEnd = function () {
          game.playerItem.restorePos();
          let params = {
            id: game.getUid(),
            x: player.x,
            y: player.y + (sprite.height / 2),
            w: sprite.width,
            h: sprite.height,
            qty: game.holeLife,
            classes: '',
            item: 'hole'
          }
          let newHole = new game.Item(params);
          player.fields[player.currentField][game.SURFACE].push(newHole);
          game.digging = false;
          game.playerItem.checkCollisions(game.UNDERGROUND);
          tools.list['spade'].decrQty();
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

  endInput: function (wasMoving = false) {
    if (wasMoving) {
      character.moved();
    }
    if (game.direction) {
      controls.buttonUp(game.direction);
      clearInterval(timers[game.direction]);
      scanner.scan();
      game.save();
      timers.moving = false;
    }
  },
};

