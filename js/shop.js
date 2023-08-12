const shop = {
  enter: function () {
    character.hide();
    shop.render();
  },
  
  exit: function () {
    dialog.hide(); 
    character.render();
  },
  render: function () {
    // list all spuds in basket and all machines owned..
    let content = '<div class="allocateContent">';
    content += '<div class="machines"></div><div class="basket"></div></div>';

    let title = "Load spuds into machines";
    let footer = "";
    footer += `<button class="buttonize" onclick="dialog.cancel()"> Return to the field </button>`;
    dialog.okButton = function () {  shop.exit(); };
    if (player.daytime) {
      footer += `<button class="buttonize okButton" onclick="dialog.confirm()"> Open shop </button>`;
      dialog.okButton = function () { shop.checkMachines() };
    }
    dialog.cancelButton = function () { shop.exit(); };
    dialog.render(title, content, footer);
    // fill the parts of the dialog..
    machines.render();
    basket.render();
    hint.chipper();
    if (!player.daytime) {
      hint.itsNight();
    }
  },
  checkMachines: function () {
    // if no machine has any spuds..
    if (machines.areEmpty()) {
      if (confirm("You have no spuds in your machines.\n\nClick 'Ok' to open your shop and sell nothing today?")) {
        spuds.sell();
      } else {
        shop.render();
      }
    } else {
      spuds.sell();
    }
  }
};

