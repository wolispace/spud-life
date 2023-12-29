const buildings = {
  list: {},

  setup: function () {
    buildings.list.home = new Home();
    buildings.list.hardware = new Hardware();
    buildings.list.cart = new Cart();
    buildings.list.land = new Land();
    buildings.list.landBack = new LandBack();
    buildings.list.hotel = new Hotel();

  },

  render: function () {
    Object.keys(buildings.list).forEach((itemName) => {
      let building = buildings.list[itemName];
      if (building.field == player.currentField) {
        building.render();
      } else {
        building.hide();
      }
    });

    
    if (player.currentField == 0) {
      buildings.list.home.render();
      buildings.list.hardware.render();
      buildings.list.cart.render();
      buildings.list.hotel.hide();
    } else {
      buildings.list.home.hide();
      buildings.list.hardware.hide();
      buildings.list.cart.hide();
      buildings.list.hotel.render();
    }

    if (player.fields.length - 1 > player.currentField) {
      buildings.list.land.render();
    } else {
      buildings.list.land.hide();
    }
    if (player.currentField > 0) {
      buildings.list.landBack.render();
    } else {
      buildings.list.landBack.hide();
    }
  },

  enter: function (itemName) {
    buildings.entering = itemName;
    game.playerItem.fixPos();
    svg.animate(game.playerItem.sprite, 'shrink', 0.6, function () {
      game.playerItem.hide();
      buildings.list[buildings.entering].enter();
    });
  },

  exit: function () {
    game.playerItem.show();
    svg.animate(game.playerItem.sprite, 'grow', 0.6, function () {
      game.playerItem.show();
      game.playerItem.restorePos();
    });
  },

}

