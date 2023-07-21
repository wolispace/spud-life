const home = {
  enter: function () {
    if (player.daytime) {
      home.day();
    } else {
      home.night();
    }
  },
  day: function () {
    console.log('day');
  },
  night: function () {
    console.log('night');
    hideDialog();
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