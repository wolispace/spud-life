const controls = {
  render: function () {
    const directions = ['left', 'dig', 'down', 'up', 'right'];
    let padding = 10;
    const positions = [
      [1, containerBox.height - (sprite.height * 5)],
      [sprite.width + padding, containerBox.height - (sprite.height * 5)],
      [sprite.width + padding, containerBox.height - (sprite.height * 4 - padding)],
      [sprite.width + padding, containerBox.height - (sprite.height * 6 + padding)],
      [((sprite.width + padding) * 2), containerBox.height - (sprite.height * 5)]
    ];

    directions.forEach((direction, index) => {
      let [x, y] = positions[index];
      let iconSvg = svg.render(`control-icon--${direction}`);
      if (['dig'].includes(direction)) {
        iconSvg = svg.render(`spade`);
      }
      let controlId = sprite.render(x, y, iconSvg, sprite.width, sprite.height, 'control');
      let controlElement = document.querySelector(`#i${controlId}`);

      controls.stopDefaults(controlElement);
      if (['dig'].includes(direction)) {
        controls.onDig(controlElement);
      } else {
        controls.onMove(controlElement, direction);
      }
    });
  },

  onMove: function (controlElement, direction) {
    controlElement.onmousedown = function () { character.movePlayer(direction); };
    controlElement.onmouseup = function () { controls.endInput(direction); };
    controlElement.addEventListener("touchstart", function () { character.movePlayer(direction); }, false);
    controlElement.addEventListener("touchend", function () { controls.endInput(direction); });
  },

  onDig: function (controlElement) {
    controlElement.onmousedown = function () { controls.dig(); };
    controlElement.addEventListener("touchstart", function () { controls.dig(); }, false);
  },

  dig: function () {
    let itemSvg = svg.render("hole", 5);
    let hole = {scale: 1};
    let playerBox = character.getPlayerBox();
    sprite.render(playerBox.x, playerBox.y, itemSvg, sprite.width * hole.scale, sprite.height * hole.scale, 'hole');
  
  },

  

  stopDefaults: function (controlElement) {
    // stop things like text selection and RMB menu
    controlElement.oncontextmenu = function (event) {
      event.preventDefault();
      event.stopPropagation(); // not necessary in my case, could leave in case stopImmediateProp isn't available? 
      event.stopImmediatePropagation();
      return false;
    };
  },

  endInput: function (direction) {

    clearInterval(timers[direction]);
    timers.moving = false;
  },

};

