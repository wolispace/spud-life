class Hardware extends game.Item {
  constructor() {

    let params = {
      id: 'hardware',
      x: (game.grid.x * sprite.width / 2) - sprite.width,
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2,
      item: 'hardware',
      autoRender: false,
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
    footer += `<span id="basketWallet">Current balance ${tools.list.wallet.qty}</span>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { buildings.list.hardware.exit(); };
    dialog.okButton = function () { buildings.list.hardware.exit(); };
    dialog.render(title, content, footer);
    hint.buyPick();
  }

  exit() {
    dialog.hide();
    buildings.exit();
  }

  makeButton(itemName) {
    let itemInfo = items[itemName];
    if (['machines'].includes(itemInfo.type)) {
      if (character.has(itemName) !== undefined) {
        return '';
      }
    }
    if (itemName == 'scanner' && tools.list.scanner.qty <= 1) {
      return '';
    }
    let icon;
    itemInfo.qty = 0;
    itemInfo.name = itemName;
    if (itemInfo.type == "tools") {
      let itemClass = tools.list[itemName];
      if (!itemClass) {
        itemClass = controls.list[itemName];
      }
      itemInfo.qty = 1;
      icon = itemClass.svg;
    }
    if (['machines', 'land', 'items', 'blocker'].includes(itemInfo.type)) {
      icon = svg.render(itemName);
      icon = svg.addOrientationClass(icon);
      itemInfo.qty = player.cart[itemName] ? 0 : 1;
    }
    if (['items', 'blocker'].includes(itemInfo.type)) {
      let basket = tools.list.basket.list;
      itemInfo.qty = basket[itemName] ?? 0;
    }
    // if there is nothing then return so no button
    if (itemInfo.qty < 1) {
      return '';
    }

    let content = `<div id="hardware-${itemName}" class="hardware-button buttonize button-${itemInfo.type}">`;
    content += ` <div class="hardware-button-icon">${icon}</div>`;
    content += ` <div class="hardware-button-desc"><b>${itemInfo.fullName}.</b> ${itemInfo.desc} </div>`;
    content += this.saleButton(itemInfo);
    content += `</div>`;

    return content;
  }

  saleButton(itemInfo) {
    let buy = 'buy';
    let caption = 'Buy';
    if (['items', 'blocker'].includes(itemInfo.type)) {
      buy = 'sell';
      caption = 'Sell';
    }
    let cost = itemInfo.price * itemInfo.qty;
    let tooMuch = '';
    let onClick = `onclick="basket.${buy}Item('${itemInfo.name}', ${itemInfo.qty}, ${cost})"`;
    
    if (buy == 'buy' && cost > tools.list.wallet.qty) {
      tooMuch = 'tooMuch';
      onClick = '';

    } 

    
    // if they already have some then this becomes 'upgrade'
    if (['spade', 'axe', 'pick', 'scanner'].includes(itemInfo.name)) {
      if (tools.list[itemInfo.name].max > 0 || itemInfo.name == 'scanner') {
        caption = 'Upgrade';
      }
    }

    let html = ` <div class="hardware-button-${buy} buttonize button ${tooMuch}"
     ${onClick}>
     ${caption}<br>${cost}
   </div>`;
    return html;
  }

  // redisplay the hardware dialog after animating the item away
  refresh(itemName) {
    let thisElement = document.querySelector(`#hardware-${itemName}`);
    svg.animate(thisElement, 'shrink', 0.6, function () {
      buildings.list.hardware.enter();
    });
  }
};
