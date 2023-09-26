const basket = {
  add: function (item) {
    if (player.basket[item.item]) {
      player.basket[item.item]++;
    } else {
      player.basket[item.item] = 1;
    }
  },

  show: function () {
    let title = "Basket";
    let content = `<div class="dialog-message-content">`;
    content += `This is your basket.`;

    Object.entries(player.basket).forEach(([itemName, qty]) => {
      let itemInfo = list.items.byName[itemName];
      if(!itemInfo) {
       itemInfo = list.spuds.byName[itemName];
      }
      console.log(itemInfo);
      if (itemInfo) {
        content += `<div>${itemInfo.fullName} qty=${qty}</div>`;
      } else {
        content += `<div> where is ${itemName} qty=${qty}</div>`;
      }

    });
    let footer = "";
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render(title, content, footer);
  }

}