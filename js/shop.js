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
    footer += `<button class="buttonize okButton" onclick="dialog.confirm()"> Open shop </button>`;
    dialog.okButton = function () { spuds.sell(); };
    dialog.cancelButton = function () { shop.exit(); };
    dialog.render(title, content, footer);

    machines.render();
    basket.render();
    hint.chipper();
  }
};

