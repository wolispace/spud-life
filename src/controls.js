const controls = {
    render: function () {
        const directions = ['left', 'down', 'up', 'right'];
        const positions = [
          [1, containerBox.height - (sprite.height * 5)],
          [sprite.width, containerBox.height - (sprite.height * 5)],
          [sprite.width, containerBox.height - (sprite.height * 6)],
          [(sprite.width * 2), containerBox.height - (sprite.height * 5)]
        ];
      
        directions.forEach((direction, index) => {
          let [x, y] = positions[index];
          let controlId = addSprite(x, y, '', sprite.width, sprite.height, 'control');
          let controlElement = document.querySelector(`#i${controlId}`);
          controlElement.onmousedown = function () { movePlayer(direction) };
          controlElement.onmouseup = function () {
            clearInterval(timers[direction]);
            timers.moving = false;
          };
          controlElement.addEventListener("touchstart", function () { movePlayer(direction) }, false);
          controlElement.addEventListener("touchend", function () {
            clearInterval(timers[direction]);
            timers.moving = false;
          }, false);
        });
      }
      
}