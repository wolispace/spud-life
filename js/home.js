const home = {
  enter: function () {
    if (player.daytime) {
      home.day();
    } else {
      home.night();
    }
  },
  day: function () {
    let content = `<div class="dialog-message-content">`;
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

    content += `<div>${svg.inline('house')} ${insides[rnd(insides.length)]}.</div>`;
    content += `<div>Go outside and use your spade to dig for potatoes.<div>`;
    content += `<div>Your scanner flashes when something is buried in the patches directly next to you and under you.<div>`;
    let title = "Home sweet home";
    let footer = `<button class="buttonize" onclick="character.customize()"> Customize </button>`;
    footer += `<button class="buttonize" onclick="sky.goDark(); dialog.hide();">Start night</button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()">Go outside</button>`;

    dialog.render(title, content, footer);
  },
  night: function () {
    dialog.hide();
    tools.reset();
    tools.render();
    fields.rollPatches();
    if (player.body) {
      dream();
      sky.goLight();
      sky.darkDoor();
      fields.resetPlayer();
    } else {
      character.customize();
    }
  },
  
};