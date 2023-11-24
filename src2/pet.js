const pet = {
  state: 'sitting',
  add: function () {
    if (player.day > 1) {
      if (!game.petItem) {
        let params = {
          id: 'pet',
          x: (sprite.width * game.grid.x) - sprite.width,
          y: sprite.height,
          w: sprite.width,
          h: sprite.height,
          item: `pet-${pet.state}`,
        };

        game.petItem = new Mobile(params);
      }
    }
  },
  moveTo: function () {
    let params = {
      easing: 'linear',
      keyFrame: 'move-to',
      duration: 5,
      repeat: 'infinite',
      endItem: {
        x: (sprite.width * game.grid.x) / 2,
        y: (sprite.height * game.grid.y) / 2,
      },
      duration: 5000,
    }

    game.petItem.animatePath(params);
  },
}