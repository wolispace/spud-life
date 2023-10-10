const sprite = {
  width: 50,
  height: 50,

  get: function (uid) {
    return document.querySelector(`#i${uid}`);
  },

  setSize: function () {
    sprite.width = containerBox.width / 10;
    sprite.height = containerBox.height / 10;
    // make sure its square..
    if (sprite.height > sprite.width) {
      sprite.height = sprite.width;
    } else {
      sprite.width = sprite.height;
    }
    game.grid.x = parseInt(containerBox.width / sprite.width);
    game.grid.y = parseInt(containerBox.height / sprite.height);
  },

};

