class Hardware extends game.Item {
  constructor() {

    let params = {
      id: 'hardware',
      x: (game.grid.x * sprite.width / 2) - sprite.width,
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2,
      item: 'hardware',
    };
    super(params);
  }

  enter() {
    let title = "Hardware store";
    let content = ''; //`<div class="dialog-message-content">`;

    Object.keys(list.all).forEach((itemName) => {
      content += this.makeButton(itemName);
    });

    let footer = "";
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render(title, content, footer);
  }

  exit() {
    console.log('exiting the hardware store');
  }

  makeButton(itemName) {
    let itemInfo = items[itemName];

    let icon;
    let qty = 0;
    if (itemInfo.type == "tools") {
      let itemClass = tools.list[itemName];
      if (!itemClass) {
        itemClass = controls.list[itemName];
      }
      qty = 0 + itemClass.qty;
      icon = itemClass.svg;
    }
    if (['machines', 'land'].includes(itemInfo.type)) {
      icon = svg.render(itemName);
      icon = svg.addOrientationClass(icon);
      qty = player.cart[itemName] ? 0 : 1;
    }

    // if there is nothing then return so no button
    if (qty == 0) {
      return '';
    }

    let content = `<div  class="hardware-button buttonize button-${itemInfo.type}">`;
    content += ` <div class="hardware-button-icon">${icon}</div>`;
    content += ` <div class="hardware-button-desc"><b>${itemInfo.fullName}.</b> ${itemInfo.desc} </div>`;
    content += `</div>`;

    return content;
  }
};
