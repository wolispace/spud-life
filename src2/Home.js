class Home extends game.Item {
  constructor() {

    let params = {
      id: 'home',
      x: sprite.width,
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2
    };

    super(params);
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
};
