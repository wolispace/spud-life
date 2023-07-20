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
  }
};