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
    let content = ''; //`<div class="dialog-message-content">`;

    Object.entries(player.basket).forEach(([itemName, qty]) => {
      let params = {
        qty: qty,
        item: itemName,
      }
      content += basket.makeButton(params);

    });
    let footer = "";
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render(title, content, footer);
    },

  makeButton: function (params) {
    let style = `style="width: 2rem;"`;
    let icon = svg.render(params.item, 11, style);
    let itemInfo = items[params.item];
    if (!itemInfo) {
     itemInfo = {fullName: "A spud"};
    }

    let content = `<div  class="hardware-button buttonize">`;
    content += ` <div class="hardware-button-icon">${icon}</div>`;
    content += ` <div class="hardware-button-desc"> ${params.qty} <b>${itemInfo.fullName}.</b> ${itemInfo.desc} (x ${params.qty}) </div>`;
    content += `</div>`;

    return content;
  },
  

}

