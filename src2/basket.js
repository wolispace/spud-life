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
      if (qty > 0) {
        let params = {
          qty: qty,
          item: itemName,
        }
        content += basket.makeButton(params);
      }
    });
    
    let footer = "";
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render(title, content, footer);
    },

  makeButton: function (params) {
    let itemInfo = items[params.item];
    let icon;
    if (itemInfo.type == 'spuds') {
      icon = svg.render('spud1');
      itemInfo.desc = spuds.desc(itemInfo);
    } else {
      icon = svg.render(params.item);
    }

    icon = svg.addOrientationClass(icon);

    let content = `<div  class="hardware-button buttonize">`;
    content += ` <div class="hardware-button-icon">${icon}</div>`;
    content += ` <div class="hardware-button-desc"><b>${itemInfo.fullName}.</b> ${itemInfo.desc} (x ${params.qty}) </div>`;
    content += `</div>`;

    return content;
  },
  
  buyItem: function (itemName, qty, cost) {
    let itemInfo = items[itemName];
    if (itemInfo.type == 'machines') {
      player.cart[itemName] = {};
    } else if (itemInfo.type == 'land') {
      player.fields.push([[], [], []]);
        buildings.list.land.show();
    } else {
      // its a tool.. increment
      let itemClass = tools.list[itemName];
      if (!itemClass) {
        itemClass = controls.list[itemName];
      }
      qty = (itemClass.qty == 0) ? 8 : 2;
      itemClass.addQty(qty);
    }

    tools.list.wallet.addQty(0-cost);
    game.save();
    buildings.list.hardware.refresh(itemName);
  },

  sellItem: function (itemName, qty, cost) {
    tools.list.basket.list[itemName] = 0;
    tools.list.basket.addQty(0-qty);
    tools.list.wallet.addQty(cost);
    game.save();
    buildings.list.hardware.refresh(itemName);
  },
}

