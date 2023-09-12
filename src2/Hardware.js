class Hardware extends game.Item {
    constructor() {
      let newX = (game.grid.x * sprite.width / 2) - sprite.width;
      super('hardware', newX, 1, sprite.width * 2, sprite.height * 2);
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
