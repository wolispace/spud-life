const upgrade = {
  list: [],

  encode: function () {
    return upgrade.list.join(',');
  },

  decode: function (encodedString) {
    if (!encodedString) {
      return;
    }

    upgrade.list = encodedString.split(',');

  },

  add: function (itemName) {
    upgrade.list.push(itemName);
    console.log('add upgrade', itemName);
    this.speed();
    this.blockHits();

  },

  speed: function () {
    game.speed.player = 1;
    if (upgrade.list.includes('boots')) {
      game.speed.player++;
    }
    if (upgrade.list.includes('ringSpeed')) {
      game.speed.player++;
    }
    game.step.x = game.step.base.x * game.speed.player;
    game.step.y = game.step.base.y * game.speed.player;
  },

  blockHits: function () {
    game.blockHits = 5;
    if (upgrade.list.includes('glovesPower')) {
      game.blockHits -= 2;
    }
  },
}