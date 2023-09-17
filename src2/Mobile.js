class Mobile extends game.Item {
    constructor(itemName, x, y, qty, classList) {
      let itemWidth = sprite.width ;
      
      super(itemName, x, y, itemWidth, itemWidth, qty, `mobile ${classList}`);
      this.setup();
    }
  
    setup() {
      this.render();
    }
}