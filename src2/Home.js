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
    if (player.daytime) {
      this.enterDaytime();
    } else {
      this.enterNighttime();
    }
  }
  
  enterDaytime() {
    let title = "Welcome home";
    let content = `<div class="dialog-message-content">`;
    content += `This is your home  during daylight hours.`;
    let footer = "";
    
    footer += `<button class="buttonize" onclick="character.customize()"> Wardrobe </button>`;
    footer += `<button class="buttonize" onclick="buildings.list.home.evening()"> Sleep </button>`;
    footer += `<button class="buttonize" onclick="dialog.cancel()"> Exit </button>`;
    dialog.cancelButton = function () { buildings.list.home.exit(); };
    dialog.render(title, content, footer);
    
  }

  enterNighttime() {
    let title = "Welcome home";
    let content = `<div class="dialog-message-content">`;
    content += `Its nighttime. You need to seep`;
    let footer = "";
    
    footer += `<button class="buttonize" onclick="character.customize()"> Wardrobe </button>`;
    footer += `<button class="buttonize" onclick="dialog.cancel()"> Exit </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Sleep </button>`;
    dialog.cancelButton = function () { buildings.list.home.exit(); };
    dialog.okButton = function () { buildings.list.home.sleep(); };
    dialog.render(title, content, footer);
  }

  exit() {
    dialog.hide();
    buildings.exit();
  }

  evening() {
    sky.goDark();
    buildings.list.home.sleep();
  }

  sleep() {
    dialog.hide();
    setTimeout( buildings.list.home.dawn, 2000);
  }

  dawn() {
    sky.goLight();
    setTimeout( buildings.list.home.morning, 2000);
  }
  
  morning() {
    tools.reset();
    field.roll();
    player.day++;
    let title = "Morning";
    let content = `<div class="dialog-message-content">`;
    content += `It's morning. All of your tools have been refreshed!`;
    let footer = "";
    
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Wake </button>`;
    dialog.cancelButton = function () { buildings.list.home.exit(); };
    dialog.okButton = function () { buildings.list.home.wake(); };
    dialog.render(title, content, footer);
  }

  wake() {
    dialog.hide();
    buildings.list.home.exit();
  }

};
