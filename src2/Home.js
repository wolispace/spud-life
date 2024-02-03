class Home extends game.Item {

  field = 0;

  constructor() {

    let params = {
      id: 'home',
      x: sprite.width,
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2,
      item: 'home',
      autoRender: false,
      classes: 'building',
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
    footer += `<button class="buttonize" onclick="upgrade.show()"> Upgrades </button>`;
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
    footer += `<button class="buttonize" onclick="upgrade.show()"> Upgrades </button>`;
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
    if (isDev) {
      sky.nightDuration = 0.1;
    }
    sky.goDark(true);

  }

  sleep() {
    dialog.hide();
    setTimeout(buildings.list.home.dawn, 2000);
  }

  dawn() {
    sky.goLight();
    setTimeout(buildings.list.home.morning, 2000);
  }

  nightEvent() {
    let html = `<div>${getFromList('weatherList')}</div>`;
    let doIt = rnd(game.nightEvent);
    if (doIt == 1) {
      field.init(game.ABOVEGROUND);
      let item = rnd(2) == 1 ? 'log' : 'rock';
      let maxItems = rnd(5) + 5;
      for (let fieldId = 0; fieldId < player.fields.length; fieldId++) {
        for (let items = 0; items < maxItems; items++) {
          field.addBlocker(fieldId, item);
        }
      }
      if (item == 'rock') {
        html = `<div>There was a meteor shower last night resulting in some rocks strewn randomly!</div>`;
      } else {
        html = `<div>There was a violent storm last night resulting in some logs strewn randomly!</div>`;
      }
    } 
    return html;
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
    content += buildings.list.home.nightEvent();

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
    if (player.fields[0][game.SURFACE].length > 0) {
      hint.holeLife();
    }
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
