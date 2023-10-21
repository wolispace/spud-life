class Home extends game.Item {
  constructor() {

    let params = {
      id: 'home',
      x: sprite.width,
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2,
      item: 'home',
      autoRender: false,
    };
    super(params);
  }

  enter() {
    let title = "Welcome home";
    let content = `<div class="dialog-message-content">`;
    content += `This is your home.`;
    let footer = "";
    
    footer += `<button class="buttonize" onclick="character.customize()"> Wardrobe </button>`;
    footer += `<button class="buttonize" onclick="dialog.cancel()"> Exit </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Wake </button>`;
    dialog.cancelButton = function () { buildings.list.home.exit(); };
    dialog.okButton = function () { buildings.list.home.morning(); };
    dialog.render(title, content, footer);
  }

  exit() {
    dialog.hide();
    buildings.exit();
  }

  morning() {
    buildings.list.home.exit();
    // sky.goLight();
    // home.darkDoor();
    tools.reset();
  }

};
