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
    content += `<div>${svg.inline('home')} Your house ${this.lookInside()}.</div>`;
    content += `<div>Go outside and use your spade to dig for potatoes.</div>`;
    content += `<div>You can change how you look any time in your wardrobe.</div>`;
    content += `<div>Bring on the night any time, even if you have no spuds to sell.</div>`;
    content += `<div>${hint.random()}.</div>`;
    content += `<div>Click on your scanner to adjust settings.</div>`;
    content += `</div>`;

    let footer = "";
    footer += `<button class="buttonize" onclick="character.customize()"> Wardrobe </button>`;
    if (game.petItem) {
      footer += `<button class="buttonize" onclick="pet.interact()"> Pet </button>`;
    }
    footer += `<button class="buttonize" onclick="buildings.list.home.evening()"> Bring on the night </button>`;
    footer += `<button class="buttonize" onclick="dialog.cancel()"> Exit </button>`;
    dialog.cancelButton = function () { buildings.list.home.exit(); };
    dialog.render(title, content, footer);
    
  }

  enterNighttime() {
    let title = "Welcome home";
    let content = `<div class="dialog-message-content">`;
    content += `Its nighttime. You need to sleep`;

    let footer = "";
    footer += `<button class="buttonize" onclick="character.customize()"> Wardrobe </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Sleep </button>`;
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
    //  `${income}${sleep}${dream}${reset}${sow}`;
    content += `<div>${buildings.list.home.sleepHow()}</div>`;
    content += `<div>${buildings.list.home.dream()}.</div>`;
    content += `<div>Your tools have been refreshed.</div>`;

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
    if (player.day > pet.daysToPet) {
      pet.show();
      hint.petIntro();
    }
  }

  lookInside() {
    let insides = [
      "is a little messy",
      "looks so much nicer after that fresh coat of paint",
      "is small",
      "is bigger on the inside",
      "is where you lay your hat",
      "is a very nice house",
      "looks a lot like my house",
      "is your castle",
      "is cozy",
    ];

    return insides[rnd(insides.length)];
  }

  dream() {
    let dreams = [
      "You dreamt of living in a park, but were rudely awoken by the dustmen",
      "You dreamt you were a walrus",
      "You dreamt of holding onto nothing, to see how long nothing lasts",
      "You dreamt of spinning plates",
      "You didn't dream of anything, however you wake up, back to life, back to reality",
      "You dreamt you were a hero, just for one day",
      "You dreamt a little dream of me",
      "You dreamt the cake was a lie",
      "You dreamt about the delivery man",
      "You dreamt you were Baba",
      "You dreamt that you finally wound up like a spring",
      "you dreamt that the sun machine was coming down and you had a party",
      "You dreamt you were in a boat on a river with tangerine trees and marmalade skies",
    ];
    return dreams[rnd(dreams.length)];
  }

  game() {
    let games = [
      "Portal",
      "Baba is you",
      "Skyrim",
      "The Saboteur",
      "The Stanley Parable",
      "Visual Pinball X",
      "with ChatGPT",
      "Tony Hawk's P_o ___tater 2"
    ];

    return games[rnd(games.length)];
  }

  sleepHow() {
    let sleeps = [
      "You got to sleep quickly.",
      "You had a hard time getting to sleep.",
      `You stayed up very late playing ${buildings.list.home.game()} and didn't get much sleep.`,
      `You were up late fixing your scanner, you're handy like that.`,
      "Your pillow was unusually lumpy, maybe its time for a new one?",
      "You noticed a rabbit-shaped crack on your ceiling.",
    ];

    return sleeps[rnd(sleeps.length)];
  }

};
