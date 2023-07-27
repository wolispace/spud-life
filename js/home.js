const home = {
  enter: function () {
    character.hide();
    if (player.daytime) {
      home.day();
    } else {
      home.night();
    }
  },

  exit: function () {
    dialog.hide(); 
    character.render();
  },

  day: function () {
    let content = `<div class="dialog-message-content">`;
    

    content += `<div>${svg.inline('house')} ${home.lookInside()}.</div>`;
    content += `<div>Go outside and use your spade to dig for potatoes.</div>`;
    content += `<div>${hint.random()}.</div>`;
    content += `<div>Check your scanner to adjust settings.</div>`;
    content += `</div>`;
    let title = "Home sweet home";
    let footer = `<button class="buttonize" onclick="character.customize()">Wardrobe</button>`;
    footer += `<button class="buttonize" onclick="home.quickBed()">Start night</button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()">Go outside</button>`;
    dialog.okButton = function () { home.exit(); };
    dialog.cancelButton = function () { home.exit(); };
    dialog.render(title, content, footer);
  },

  lookInside: function () {
    let insides = [
      "Your house is a little messy",
      "Your house looks so much nicer after that fresh coat of paint",
      "Your house is small",
      "Your house is bigger on the inside",
      "Your house is where you lay your hat",
      "Your house is a very nice house",
      "Your house looks a lot like my house",
      "Your house is your castle",
      "Your house is cozy",
    ];

    return insides[rnd(insides.length)];
  },

  quickBed: function () {
    sky.goDark(true); 
    dialog.hide();
  },

  night: function () {
    dialog.hide();
    tools.reset();
    tools.render();
    fields.rollPatches();
    if (player.body) {
      home.dream();
      sky.goLight();
      sky.darkDoor();
      fields.resetPlayer();
    } else {
      character.customize();
    }
  },

  dream: function() {
    let dreams = [
      "You dreamt of living in a park, but were rudely awoken by the dustmen",
      "You dreamt you were a walrus",
      "You dreamt of holding onto nothing, to see how long nothing lasts",
      "You dreamt of spinning plates",
      "You didn't dream of anything, however you wake up, back to life, back to reality",
      "You dreamt you were a hero, just for one day",
      "You dreamt a little dreamt of me",
      "You dreamt the cake is a lie",
      "You dreamt about the delivery man",
      "You dreamt you were baba",
    ];
    let dream = `<div>` + dreams[rnd(dreams.length)] + `.</div>`;
  
    let games = [
      "Portal",
      "Baba is you",
      "Skyrim",
      "Sabatour",
    ];

    let sleeps = [
      "You got to sleep quickly.",
      "You had a hard time getting to sleep.",
      `You stayed up very late playing ` + games[rnd(games.length)] + ` and din't get much sleep.`,
      "Your pillow was unusually lumpy, maybe its time for a new one?",
      "you noticed a rabbit-shaped crack on your ceiling",
    ];
    let sleep = `<div>` + sleeps[rnd(sleeps.length)] + `</div>`;
    let reset = `<div>Your tools have all been refreshed.</div>`
    
    let sow = fields.resowField();
    let income = customers.getIncome();
  
    let content = `<div class="dialog-message-content">`;
    content += `${income}${sleep}${dream}${reset}${sow}`;
    content += `<div>`;
    let title = "Home sweet home";
    let footer = "";
    footer += `<button class="buttonize" onclick="dialog.confirm();"> Get out of bed </button>`;
    dialog.okButton = function () { home.wake(); };
    dialog.cancelButton = function () { home.wake(); };
    dialog.render(title, content, footer);
  },

  wake: function() {
    let playerSprite = document.querySelector(`#playerSprite svg`);
    svg.animate(playerSprite, `grow`, 1, () => {character.render();});
    setPhase('field');
    dialog.hide();
    character.render();
  }
  
};