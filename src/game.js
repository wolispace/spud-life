const game = {
  ABOVEGROUND: 0,
  SURFACE: 1,
  UNDERGROUND: 2,
  grid: { x: 10, y: 10 },


  // everything show on the page is n Item with coords and an svg
  Item: class {
    id = '';
    x = 1;
    y = 1;
    w = 1;
    h = 1;
    svg = '';
    classes = '';

    constructor(id, x, y, w, h, classes = '') {
      this.id = id;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.classes = classes;
    }

    render() {
      this.svg = svg.render(this.id);
      sprite.render(this.id, this.x, this.y, this.svg, this.w, this.h, this.classes);
    }
  },
  

  getDirection: function (event) {
    return event.code.toLowerCase().replace('arrow', '');
  },

  isDirection: function (direction) {
    return ['up', 'down', 'left', 'right'].includes(direction);
  },

};

const building = {
  list: {},
  Home: class extends game.Item {
    constructor() {
      super('home', sprite.width, 1, sprite.width * 2, sprite.height * 2);
    }
    enter() {
      let title = "Welcome home";
      let content = `<div class="dialog-message-content">`;
      content += `This is your home.`;
      let footer = "";
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    }
    exit() {
      console.log('exiting the house');
    }
  },

  Hardware: class extends game.Item {
    constructor() {
      super('hardware', ((game.grid.x - 4) * sprite.width) / 2, 1, sprite.width * 2, sprite.height * 2);
    }
    enter() {
      let title = "Hardware store";
      let content = `<div class="dialog-message-content">`;
      content += `Buy and sell.`;
      let footer = "";
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    }
    exit() {
      console.log('exiting the hardware store');
    }
  },

  Cart: class extends game.Item {
    constructor() {
      super('cart', (sprite.width * game.grid.x) - (sprite.width * 5), 1, sprite.width * 2, sprite.height * 2);
    }
    enter() {
      let title = "Your food cart";
      let content = `<div class="dialog-message-content">`;
      content += `Sell meals`;
      let footer = "";
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    }
    exit() {
      console.log('exiting the cart');
    }
  },
  //
}

