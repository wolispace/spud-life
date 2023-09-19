const game = {
  ABOVEGROUND: 0,
  SURFACE: 1,
  UNDERGROUND: 2,
  grid: { x: 10, y: 10 },
  uid: 1, // as we add elements to the page they get an incremental id
  directions: ['up', 'down', 'left', 'right'],
  qty: [0, 20, 30],
  playerItem: null,
  digging: false,

  // everything show on the page is an Item with coords and an svg
  Item: class {
    id = '';
    item = ''; // match the item[item]
    x = 1;
    y = 1;
    w = 1;
    h = 1;
    qty = 1;
    svg = '';
    classes = '';
    sprite = null;

    constructor(id, x, y, w, h, qty = 1, classes = '', item = '') {
      this.id = id;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.qty = qty;
      this.classes = classes;
      this.item = item;
    }

    render(itemSvg) {
      this.svg = itemSvg ?? svg.render(this.id);
      this.svg = sprite.orientSvg(this.svg);

      let newSprite = `<div id="i${this.id}" class="sprite ${this.classes}">${this.svg}</div>`;
      addToBody(newSprite);
      this.position();
      this.shrinkWrap();
      this.position();
    }

    shrinkWrap() {
      let itemSvg = sprite.get(`${this.id} > svg`);
      if (itemSvg) {
        let itemSvgBox = itemSvg.getBoundingClientRect();
        this.w = itemSvgBox.width;
        this.h = itemSvgBox.height;
      }
    }

    position() {
      this.sprite = sprite.get(this.id);
      this.sprite.style.width =`${this.w}px`;
      this.sprite.style.height =`${this.h}px`;
      this.sprite.style.top =`${this.y}px`;
      this.sprite.style.left =`${this.x}px`;
    }

    remove() {
      this.sprite.remove();
    }

    jiggle(direction, onEnd) {
      svg.animate(this.sprite, `jiggle-${direction}`, 0.25, onEnd);
    }
  },

  // ---------------------------------

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

