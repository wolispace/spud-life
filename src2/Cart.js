class Cart extends game.Item {
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
  };
  