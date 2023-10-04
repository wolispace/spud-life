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
    if (itemInfo.type == 'spuds') {
      icon = svg.render('spud1');
      itemInfo.desc = spuds.desc(itemInfo);
    } else {
      icon = svg.render(itemName);
    }

    icon = svg.addOrientationClass(icon);

    let content = `<div  class="hardware-button buttonize">`;
    content += ` <div class="hardware-button-icon">${icon}</div>`;
    content += ` <div class="hardware-button-desc"><b>${itemInfo.fullName}.</b> ${itemInfo.desc} </div>`;
    content += `</div>`;

    return content;
  }
};
