class Land extends game.Item {
  visible = false;
  constructor() {
    let params = {
      id: 'land',
      x: (sprite.width * game.grid.x) - sprite.width,
      y: sprite.height,
      w: sprite.width,
      h: sprite.height,
      item: 'land',
      autoRender: false,
    };
    super(params);
  }

  enter() {
    field.change('right');
  }
  
};
