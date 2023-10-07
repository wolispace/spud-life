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
    itemInfo.qty = 0;
    if (itemInfo.type == "tools") {
      let itemClass = tools.list[itemName];
      if (!itemClass) {
        itemClass = controls.list[itemName];
      }
      itemInfo.qty = 0 + itemClass.qty;
      icon = itemClass.svg;
    }
    if (['machines', 'land', 'items'].includes(itemInfo.type)) {
      icon = svg.render(itemName);
      icon = svg.addOrientationClass(icon);
      itemInfo.qty = player.cart[itemName] ? 0 : 1;
    }
    if (['items'].includes(itemInfo.type)) {
      icon = svg.render(itemName);
      icon = svg.addOrientationClass(icon);
      let basket = tools.list.basket.list;
      itemInfo.qty = basket[itemName] ?? 0; 
    }
    // if there is nothing then return so no button
    if (itemInfo.qty < 1) {
      return '';
    }

    let content = `<div  class="hardware-button buttonize button-${itemInfo.type}">`;
    content += ` <div class="hardware-button-icon">${icon}</div>`;
    content += ` <div class="hardware-button-desc"><b>${itemInfo.fullName}.</b> ${itemInfo.desc} </div>`;
    content += this.saleButton(itemInfo);


    content += `</div>`;

    return content;
  }

  saleButton(itemInfo) {
    let buy = 'buy';
    let caption = 'Buy';
    if (itemInfo.type == "items") {
      buy = 'sell';
      caption = 'Sell';
    }
    // if they already have some then this becomes 'upgrade'

    let html = ` <div class="hardware-button-${buy} buttonize button "
     onclick="tools.buyItem('${itemInfo.name}')">
     ${caption}<br>${itemInfo.price * itemInfo.qty}
   </div>`;
    return html;
  }
};
