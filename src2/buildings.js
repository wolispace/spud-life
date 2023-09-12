const buildings = {
    list: {},

    setup: function () {
      buildings.list.home = new Home();
      buildings.list.hardware = new Hardware();
      buildings.list.cart = new Cart();

      buildings.list.home.render();
      buildings.list.hardware.render();
      buildings.list.cart.render();
    },

  }
  
  