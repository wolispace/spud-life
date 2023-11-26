const game = {
  version: '0.1.6',
  ABOVEGROUND: 0,
  SURFACE: 1,
  UNDERGROUND: 2,
  grid: { x: 10, y: 10 },
  uid: 1, // as we add elements to the page they get an incremental id
  directions: ['up', 'down', 'left', 'right'],
  qty: [0, 20, 30],
  playerItem: null,
  petItem: null,
  daysToPet: 5,
  digging: false,
  step: { x: 5, y: 5 },
  incrementQty: 2,
  holeLife: 5, // how long until a hole disappears
  blockerHits: 5, // how many hits on a blocker to clear it
  maxScan: 4,
  spudVarieties: 8, // how many different varieties
  compress: false,
  transferred: false,
  newPlayer: {}, // temp info loaded before its finished being decoded



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
        this.w = params.w || sprite.width;
        this.h = params.h || sprite.width;
        this.qty = params.qty ?? 1;
        this.classes = params.classes || '';
        this.item = params.item || '';
        this.svg = params.svg || svg.render(params.item, params.qty);
        this.autoRender = params.autoRender ?? true;
        this.orientSvg();
        this.setup();
      }
    }

    setup() {
      if (this.autoRender) {
        this.render();
      }
    }

    render() {
      if (document.querySelector(`#i${this.id}`)) {
        // its already here..
      } else {
      let newSprite = `<div id="i${this.id}" class="sprite ${this.classes}">${this.svg}</div>`;
      addToWorld(newSprite);
      this.sprite = sprite.get(this.id);
      this.position();
      this.shrinkWrap();
      this.position();
      }
    }

    refresh(newSvg) {
      this.svg = newSvg;
      this.sprite.innerHTML = this.svg;

    }

    orientSvg() {
      this.svg = svg.addOrientationClass(this.svg);
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
      if (this.sprite) {
        this.sprite.style.width = `${this.w}px`;
        this.sprite.style.height = `${this.h}px`;
        this.sprite.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
      }
    }

    // restore item to its transform3d position
    restorePos() {
      if (this.oldPos.y > 1) {
        this.sprite.style.top = '1px';
        this.sprite.style.left = '1px';
        this.x = this.oldPos.x;
        this.y = this.oldPos.y;
        this.position();
      }
      this.oldPos = {};
    }

    // fix the item at this position.. its not translated into this position
    fixPos() {
      this.oldPos = {
        x: this.x,
        y: this.y,
      };
      if (!this.sprite) {
        this.sprite = sprite.get(this.id);
      }
      if (this.sprite) {
        this.sprite.style.width = `${this.w}px`;
        this.sprite.style.height = `${this.h}px`;
        this.sprite.style.top = `${this.y}px`;
        this.sprite.style.left = `${this.x}px`;
        this.sprite.style.transform = null;
      }
    }

    reduceAndPosition() {
      this.reduce();
      this.setPos();
    }

    reduceSize() {
      // reduce by 20%
      let less = { w: this.w * .2, h: this.h * .2 };
      this.w = this.w - less.w;
      this.h = this.h - less.h;
      this.reduced = true;
    }

    reducePosition() {
      // reduce by 20%
      let less = { w: this.w * .2, h: this.h * .2 };
      this.y = parseInt(this.y + less.h / 2);
      this.x = parseInt(this.x + less.w / 2);
    }

    reduce() {
      // reduce by 20%
      this.reducePosition();
      this.reduceSize();
    }

    remove() {
      if (this.sprite) {
        this.sprite.remove();
      }
    }

    hide() {
      if (this.sprite) {
        this.sprite.style.display = 'none';
      }
    }

    show() {
      if (!this.sprite) {
        this.render();
      } else {
        this.sprite.style.display = 'block';
        console.log('showing');
      }
    }

    centre() {
      return {
        x: this.x + (this.w / 2),
        y: this.y + (this.h / 2),
      }
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
        // this is the spriteBox
        if (this) {
          this.style.animation = 'none';
          this.style.display = 'none';
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
    if (game.playerItem) {
      player.g = game.grid;
      player.g.w = sprite.width;
      player.g.h = sprite.height;
      player.v = game.version;
      player.x = game.playerItem.x;
      player.y = game.playerItem.y;

      player.fields = field.encodeAll(player.fields, true);
      player.spuds = spuds.encode(player.spuds);
      player.tools = tools.encode();
      player.pet = pet.encode();

      let compressed = JSON.stringify(player);
      if (game.compress) {
        compressed = LZString.compressToUTF16(compressed);
      }
      localStorage.setItem("state", compressed);
      player.fields = saveFields;
      player.spuds = saveSpuds;
    }
  },

  load: () => {
    let gameState = localStorage.getItem("state");
    if (gameState) {
      let decompressed = gameState;
      if (game.compress || gameState.indexOf('name') < 0) {
        decompressed = LZString.decompressFromUTF16(gameState);
      }
      game.newPlayer = JSON.parse(decompressed);
      game.newPlayer.spuds = spuds.decode(game.newPlayer.spuds);
      game.newPlayer.tools = tools.decode(game.newPlayer.tools);
      game.newPlayer.fields = field.encodeAll(game.newPlayer.fields, false);
      game.newPlayer.pet = pet.decode(game.newPlayer.pet);
      if (!player.pos) {
        player = game.newPlayer;
      }
    }
  },

  clear: (reload = false) => {
    if (confirm("Are you sure you want to start a new game?")) {
      localStorage.clear();
      if (reload) {
       game.reload();
      }
    }
  },

  read: () => {
    let gameState = localStorage.getItem("state");
    decompressed = LZString.decompressFromUTF16(gameState);
    return LZString.compressToBase64(decompressed);
  },

  write: (compressed) => {
    let gameState = LZString.decompressFromBase64(compressed);
    compressed = LZString.compressToUTF16(gameState);
    localStorage.setItem("state", compressed);
  },

  reload: () => {
    window.location.replace('/spudlife');
  },

  // ------------------------------
  setUid(itemUid) {
    if (itemUid >= game.uid) {
      game.uid = itemUid + 1;
    }
  },

  getDirection: function (event) {
    if (event.code) {
      return event.code.toLowerCase().replace('arrow', '');
    }
  },

  isDirection: function (direction) {
    return game.directions.includes(direction);
  },

};

