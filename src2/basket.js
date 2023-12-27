const basket = {
  add: function (item) {
    if (tools.list.basket.list[item.item]) {
      tools.list.basket.list[item.item] = tools.list.basket.list[item.item] + item.qty;
    } else {
      tools.list.basket.list[item.item] = item.qty;
    }
    hint.dugItem();
    basket.recount();
  },

  recount: function () {
    let count = 0; 
    Object.entries(tools.list.basket.list).forEach(([itemName, qty]) => {
      count += qty;
    });
    tools.list.basket.setQty(count);
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

    if (content == '') {
      content = `<div class="dialog-message-content">`;
      content += `Your basket is empty. Dig to find things.`;
    }

    
    let footer = "";
    footer += `<div></div>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render(title, content, footer);
    },

  makeButton: function (params) {
    let itemInfo = items[params.item];
    let icon;
    if (itemInfo.type == 'spuds') {
      icon = spuds.build(itemInfo.name); //svg.render('spud1');
      itemInfo.desc = spuds.desc(itemInfo);
    } else {
      icon = svg.render(params.item);
    }

    icon = svg.addOrientationClass(icon);

    let content = `<div  class="hardware-button buttonize">`;
    content += ` <div class="hardware-button-desc"><b>${itemInfo.fullName}.</b> ${itemInfo.desc} </div>`;
    content += ` <div class="hardware-button-sub"><div class="hardware-button-icon">${icon}</div>${params.qty}</div>`;
    content += `</div>`;

    return content;
  },
  
  buyItem: function (itemName, qty, cost) {
    let itemInfo = items[itemName];
    if (itemInfo.type == 'machines') {
      player.cart[itemName] = 0;
      player.meals[itemInfo.makes] = 0;
    } else if (itemInfo.type == 'land') {
      field.addField();
    } else if (itemName == 'scanner') {
      if (tools.list.scanner.qty > 1) {
        scanner.upgrade();
      } else {
        return;
      }
    } else {
      // its a tool.. increment
      let itemClass = tools.list[itemName];
      if (!itemClass) {
        itemClass = controls.list[itemName];
      }
      qty = (itemClass.max == 0) ? 8 : 2;
      itemClass.show();
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

  hasSpuds: function () {
    let hasSpuds = false;

      Object.entries(tools.list.basket.list).forEach(([itemName, qty]) => {
        if (qty > 0) {
          let itemInfo = items[itemName];
          if (itemInfo.type == 'spuds') {
            hasSpuds = true;
          }
        }
      });

    return hasSpuds;
  },

  spudList: function () {
    let spudList = {};
    Object.entries(tools.list.basket.list).forEach(([itemName, qty]) => {
      if (qty > 0) {
        let itemInfo = items[itemName];
        if (itemInfo.type == 'spuds') {
          spudList[itemName] = {qty: qty, itemInfo: itemInfo};
        }
      }
    });

    return spudList;
  },

  firstNotFoundItemName: function (fieldId) {
    let missingItem;
    // pick an item they have not found yet eg 'caps'
    Object.entries(list.items.byName).forEach(([itemName, itemInfo]) => {
      if (!missingItem) {
        if (!tools.list.basket.list[itemName]) {
          missingItem = itemName;
          // does the missingItem exist in the current field?
          player.fields[fieldId][game.UNDERGROUND].forEach((item) => {
            if (item.item == missingItem) {
              missingItem = null;
            }
          });
        }
      }
    });

    return missingItem;
  },
}

