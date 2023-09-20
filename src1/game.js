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

    constructor(params) {
      // id, x, y, w, h, qty = 1, classes = '', item = ''
      this.id = params.id;
      this.x = params.x;
      this.y = params.y;
      this.w = params.w;
      this.h = params.h;
      this.qty = params.qty ?? 1;
      this.classes = params.classes ?? '';
      this.item = params.item ?? '';
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

    reduce() {
      // reduce by 20%
      let less = {w: this.w * .2, h: this.h * .2};
      this.w = this.w - less.w;
      this.h = this.h - less.h;
      this.y = this.y + less.h / 2;
      this.x = this.x + less.w / 2;
      this.position();

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

