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
  step: { x: 5, y: 5 },
  incrementQty: 2,

  // everything show on the page is an Item with coords and an svg
  Item: class {
    id = '';
    item = ''; // match the item[item]
    x = 1;
    y = 1;
    w = 1;
    h = 1;
    qty = 1;
    svg = null;
    classes = '';
    sprite = null;

    constructor(params) {
      if (params) {
        this.id = params.id;
        this.x = params.x;
        this.y = params.y;
        this.w = params.w ?? sprite.width;
        this.h = params.h ?? sprite.width;
        this.qty = params.qty ?? 1;
        this.classes = params.classes ?? '';
        this.item = params.item ?? '';
        this.svg = params.svg ?? svg.render(params.item, params.qty);
        this.orientSvg();
        this.setup();
      }
    }

    setup() {
      this.render();
    }

    render() {
      let newSprite = `<div id="i${this.id}" class="sprite ${this.classes}">${this.svg}</div>`;
      addToBody(newSprite);
      this.position();
      this.shrinkWrap();
      this.position();
    }

    orientSvg() {
      // get width and height from viewbox to decide if its a wide or high image
      // NOTE: for simplicity viewbox should be integers!!!
      let bits = this.svg.match(/viewBox=\"(\d+) (\d+) (\d+) (\d+)\"/);
      let orientation = (parseInt(bits[3]) > parseInt(bits[4])) ? 'wide' : 'high';
      this.svg = this.svg.replace(/ viewBox=\"/, ` class=\"${orientation}\" viewBox=\"`);
    }


    shrinkWrap() {
      let itemSvg = sprite.get(`${this.id} > svg`);
      if (itemSvg) {
        let itemSvgBox = itemSvg.getBoundingClientRect();
        this.w = itemSvgBox.width;
        this.h = itemSvgBox.height;
      }
    }
    // do these collide? objects with (x,y,width,height}
    collides(spriteBox) {
      return (spriteBox.x < this.x + this.w)
        && (spriteBox.x + spriteBox.w > this.x)
        && (spriteBox.y < this.y + this.h)
        && (spriteBox.y + spriteBox.h > this.y);
    }

    // sets the divs X and Y
    setPos() {
      this.sprite = sprite.get(this.id);
      if (this.sprite) {
        this.sprite.style.width = `${this.w}px`;
        this.sprite.style.height = `${this.h}px`;
        this.sprite.style.top = `${this.y}px`;
        this.sprite.style.left = `${this.x}px`;
        this.sprite.style.transform = '';
      } else {
        console.log('where is this?', this);
      }
    }

    // shifts the div from starting 1,1 x.y to improve animation speeds
    position() {
      this.sprite = sprite.get(this.id);
      this.sprite.style.width = `${this.w}px`;
      this.sprite.style.height = `${this.h}px`;
      // this.sprite.style.top = `${this.y}px`;
      // this.sprite.style.left = `${this.x}px`;

      this.sprite.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
      //this.sprite.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    reduce() {
      // reduce by 20%
      let less = { w: this.w * .2, h: this.h * .2 };
      this.w = this.w - less.w;
      this.h = this.h - less.h;
      this.y = this.y + less.h / 2;
      this.x = this.x + less.w / 2;
      this.setPos();
    }

    remove() {
      this.sprite.remove();
    }

    jiggle(direction, onEnd) {
      this.setPos();
      svg.animate(this.sprite, `jiggle-${direction}`, 0.25, onEnd);
    }

    animateArc(endItem, onEnd) {
      // slow start fast middle
      var easing = 'cubic-bezier(0, 0, .25, 0)';
      // slow and get faster
      easing = 'cubic-bezier(0.3, 0, 1, 1)';
      easing = 'ease-in';
      this.sprite.style.display = 'block';
      this.sprite.style.offsetPath = this.makeAcr(endItem);
      this.sprite.style.offsetRotate = `0deg`;
      this.sprite.style.animation = `into-basket 1.5s ${easing} 0s 1 normal forwards`;
      this.sprite.addEventListener("animationend", function handler() {
        if (this.sprite) {
          this.sprite.style.animation = 'none';
          this.sprite.style.display = 'none';
          if (typeof onEnd == "function") {
            onEnd();
          }
        }
        this.removeEventListener("animationend", handler);
      });
    }

    makeAcr(endItem) {
      let startX = 0 + (this.w / 2);
      let startY = 0 + (this.h / 2);
      let top = 0 - (this.y / 2);
      let endX = endItem.x - this.x + (this.w / 2);
      let endY = endItem.y - this.y + (this.h / 2);

      // everything must be relative to the patch - it is 0,0
      // calculate x2,y2 from the middle of the basket tool
      // calculate top.. or just use zero?
      // calculate offset for beizer control points (in a little from vertical based on distance between x1 and x2)
      // Mx1,y1 Cx1+(x2-x1/5),top x2-(x2-x1/5),top x2,y2
      let bit = (endX - startX) / 5;

      return `path('M ${startX},${startY} C ${startX + bit},${top} ${endX - bit},${top} ${endX},${endY}')`;
    }


  },

  // ---end of Item class ------------------------------

  save: () => {
    let saveFields = player.fields;
    let saveSpuds = player.spuds;
    player.x = game.playerItem.x;
    player.y = game.playerItem.y;

    player.fields = field.encodeAll(player.fields, true);
    player.spuds = spuds.encode(player.spuds);
    player.tools = tools.encode();
    
    //let compressed = LZString.compressToUTF16(JSON.stringify(player));
    let compressed = JSON.stringify(player);
    localStorage.setItem("state", compressed);
    player.fields = saveFields;
    player.spuds = saveSpuds;

  },

  load: () => {
    let compressed = localStorage.getItem("state");
    if (compressed) {
      //let decompressed = LZString.decompressFromUTF16(compressed);
      let decompressed = compressed;
      let newPlayer = JSON.parse(decompressed);
      newPlayer.fields = field.encodeAll(newPlayer.fields, false);
      newPlayer.spuds = spuds.decode(newPlayer.spuds);
      newPlayer.tools = tools.decode(newPlayer.tools);
      if (!player.pos) {
        player = newPlayer;
      }
    }
  },

  clear: (reload = false) => {
    localStorage.clear();
    if (reload) {
      window.location.reload();
    }
  },

  read: () => {
    return LZString.compressToBase64(JSON.stringify(player));
  },

  write: (compressed) => {
    let decompressed = LZString.decompressFromBase64(compressed);
    player = JSON.parse(decompressed);
    game.save();
  },

  // ------------------------------
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

