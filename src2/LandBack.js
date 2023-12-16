class LandBack extends game.Item {
  visible = false;
  constructor() {
    let params = {
      id: 'land-back',
      x: 1,
      y: sprite.height,
      w: sprite.width,
      h: sprite.width,
      item: 'land-back',
      autoRender: false,
    };
    super(params);
  }

  enter() {
    field.change('left');
  }
  
  
};
