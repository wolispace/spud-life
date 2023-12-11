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
    let title = "Home sweet home";
    let content = `<div class="dialog-message-content">`;
    content += `<div>${svg.inline('home')} Your house ${getFromList('insideList')}.</div>`;
    content += `<div class="hasButton"><button class="buttonize" onclick="buildings.list.home.evening()"> Bring on the night </button> If you have no spuds to sell.</div>`;
    content += `<div>Go outside and use your spade to dig for potatoes.</div>`;
    content += `<div>You can change how you look any time in your wardrobe.</div>`;
    content += `<div>${hint.random()}.</div>`;
    content += `<div>Click on your scanner to adjust settings.</div>`;
    content += `</div>`;

    let footer = "";
    footer += `<button class="buttonize" onclick="character.customize()"> Wardrobe </button>`;
    if (game.petItem) {
      footer += `<button class="buttonize" onclick="pet.interact()"> Pet </button>`;
    }
    footer += `<button class="buttonize" onclick="dialog.cancel()"> Exit </button>`;
    dialog.cancelButton = function () { buildings.list.home.exit(); };
    dialog.render(title, content, footer);
    
  }

  enterNighttime() {
    let title = "Welcome home";
    let content = `<div class="dialog-message-content">`;
    content += `Its nighttime. You need to sleep`;
    content += `<div><button class="buttonize" onclick="dialog.confirm()"> Sleep </button></div>`;

    let footer = "";
    footer += `<button class="buttonize" onclick="character.customize()"> Wardrobe </button>`;
    footer += `<button class="buttonize" onclick="dialog.cancel()"> Exit </button>`;
    dialog.cancelButton = function () { buildings.list.home.exit(); };
    dialog.okButton = function () { buildings.list.home.sleep(); };
    dialog.render(title, content, footer);
  }

  exit() {
    dialog.hide();
    buildings.exit();
  }

  evening() {
    dialog.hide();
    sky.nightDuration = 2;
    sky.goDark(true);
       
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
    let title = "Morning!";

    let content = `<div class="dialog-message-content">`;
    content += `<div>${buildings.list.home.days()}</div>`;
    content += `<div>${getFromList('sleepList')}</div>`;
    content += `<div>${getFromList('dreamList')}.</div>`;

    content += `<div>${getFromList('weatherList')}</div>`;

    let seedMsg = '';
    if (player.reseed) {
      seedMsg = ` and you hear new potatoes growing underground`;
      player.reseed = false;
    }
    content += `<div>Your tools have been refreshed${seedMsg}.</div>`;

    let footer = "";
    footer += `<div></div>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Get out of bed </button>`;
    dialog.cancelButton = function () { buildings.list.home.wake(); };
    dialog.okButton = function () { buildings.list.home.wake(); };
    dialog.render(title, content, footer);
  }

  wake() {
    dialog.hide();
    buildings.list.home.exit();
    hint.resetReminders();
    if (game.petItem) {
      pet.locked = false;
      pet.goPlayer();
    } else if (player.day == pet.daysToPet) {
      pet.show();
      hint.petIntro();
    }
  }

  days() {
    let dayMsg = getFromList('dayMsgList');
    return dayMsg.replaceAll('[days]', player.day);
  }

};
