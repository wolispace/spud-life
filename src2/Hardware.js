class Hardware extends game.Item {
  constructor() {

    let params = {
      id: 'hardware',
      x: (game.grid.x * sprite.width / 2) - sprite.width,
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2,
      item: 'hardware',
    };
    super(params);
  }

  setup() {
    this.render();
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
};
