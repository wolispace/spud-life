const controls = {
  render: function () {
    const directions = ['left', 'down', 'up', 'right'];
    let padding = 10;
    const positions = [
      [1, containerBox.height - (sprite.height * 5)],
      [sprite.width + padding, containerBox.height - (sprite.height * 5)],
      [sprite.width + padding, containerBox.height - (sprite.height * 6 + padding)],
      [((sprite.width + padding) * 2), containerBox.height - (sprite.height * 5)]
    ];

    directions.forEach((direction, index) => {
      let [x, y] = positions[index];
      let controlId = sprite.render(x, y, '', sprite.width, sprite.height, 'control');
      let controlElement = document.querySelector(`#i${controlId}`);

      controls.stopDefaults(controlElement);


      controlElement.onmousedown = function () { movePlayer(direction); };
      controlElement.onmouseup = function () { controls.endInput(direction); };
      controlElement.addEventListener("touchstart", function () { movePlayer(direction); }, false);
      controlElement.addEventListener("touchend", function () { controls.endInput(direction); });
    });
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

