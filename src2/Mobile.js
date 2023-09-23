class Mobile extends game.Item {
  constructor(params) {
    params.w = sprite.width;
    params.h = sprite.width;
    super(params);
  }

  setup() {
    this.render();
  }

}