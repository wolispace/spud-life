class Land extends game.Item {

  constructor() {
    let params = {
      id: 'land',
      x: (sprite.width * game.grid.x) - sprite.width,
      y: sprite.height,
      w: sprite.width,
      h: sprite.width,
      item: 'land',
    };
    super(params);
  }
  
};