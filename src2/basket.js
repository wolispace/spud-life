const basket = {
  add: function (item) {
    if (tools.list.basket.list[item.item]) {
      tools.list.basket.list[item.item] = tools.list.basket.list[item.item] + item.qty;
    } else {
      tools.list.basket.list[item.item] = item.qty;
    }
    tools.list.basket.addQty(item.qty);
  },

  show: function () {
    let title = "Basket";
    let content = ''; //`<div class="dialog-message-content">`;

    Object.entries(tools.list.basket.list).forEach(([itemName, qty]) => {
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
    let itemInfo = items[params.item];
    let icon = svg.render(params.item);
    if (itemInfo.type == 'spuds') {
      icon = svg.render('spud1');
      itemInfo.desc = spuds.desc(itemInfo);
    }

    icon = svg.addOrientationClass(icon);

    let content = `<div  class="hardware-button buttonize">`;
    content += ` <div class="hardware-button-icon">${icon}</div>`;
    content += ` <div class="hardware-button-desc"><b>${itemInfo.fullName}.</b> ${itemInfo.desc} (x ${params.qty}) </div>`;
    content += `</div>`;

    return content;
  },
  

}

