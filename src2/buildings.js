const buildings = {
    list: {},

    setup: function () {
      buildings.list.home = new Home();
      buildings.list.hardware = new Hardware();
      buildings.list.cart = new Cart();
      buildings.list.land = new Land();
      buildings.list.landBack = new LandBack();
      
    },

    render: function () {
      if (player.currentField == 0) {
        buildings.list.home.render();
        buildings.list.hardware.render();
        buildings.list.cart.render();
      } else {
        buildings.list.home.hide();
        buildings.list.hardware.hide();
        buildings.list.cart.hide();
      }

      if (player.fields.length-1 > player.currentField) {
        buildings.list.land.render();
      } else {
        buildings.list.land.hide();
      }
      if (player.currentField > 0) {
        buildings.list.landBack.render();
      } else {
        buildings.list.landBack.hide();   
      }
    }

  }
  
  