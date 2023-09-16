const game = {
  ABOVEGROUND: 0,
  SURFACE: 1,
  UNDERGROUND: 2,
  grid: { x: 10, y: 10 },
  uid: 1, // as we add elements to the page they get an incremental id
  directions: ['up', 'down', 'left', 'right'],
  qty: [0, 20, 30],

  // everything show on the page is n Item with coords and an svg
  Item: class {
    id = '';
    x = 1;
    y = 1;
    w = 1;
    h = 1;
    qty = 1;
    svg = '';
    classes = '';
    sprite = null;

    constructor(id, x, y, w, h, qty = 1, classes = '') {
      this.id = id;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.qty = qty;
      this.classes = classes;
    }

    render() {
      this.svg = svg.render(this.id);
       sprite.render(this.id, this.x, this.y, this.svg, this.w, this.h, this.classes);
       this.sprite = sprite.get(this.id);
    }
  },

  setUid(itemUid) {
    if (itemUid >= game.uid) {
      game.uid = itemUid + 1;
    }
  },

  getDirection: function (event) {
    return event.code.toLowerCase().replace('arrow', '');
  },

  isDirection: function (direction) {
    return game.directions.includes(direction);
  },

};

