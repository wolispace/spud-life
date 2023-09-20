class Cart extends game.Item {
  constructor() {
    let params = {
      id: 'cart',
      x: (sprite.width * game.grid.x) - (sprite.width * 3),
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2
    };

    super(params);
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
