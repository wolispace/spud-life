class Mobile extends game.Item {
  constructor(params) {
    params.w = sprite.width;
    params.h = sprite.width;
    params.classes = 'control';
    super(params);
    this.setup();
  }
  
    setup() {
      this.render();
    }
}