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
    content += `<div>${svg.inline('house')} Your home is a little messy.</div>`;
    content += `<div>Go outside and use your spade to dig for potatoes.<div>`;
    content += `<div>Your scanner flashes when something is buried in the patches directly next to you and under you.<div>`;
    let title = "Home sweet home";
    let footer = `<button onclick="dialog.hide()">Go outside</button>`;
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
      defineCharacter();
    }
  }
};