const potatadex = {
  show: function () {
    if (hint.visible) {
      return;
    }
    let maxItems = 0;
    let foundItems = 0;
    let content = `<div class="header-msg">The things you have found:</div>`;

    Object.entries(items).forEach(([itemName, itemInfo]) => {
      itemInfo.name = itemName;
      maxItems++;
      // work out if we have seen this.. check basket..
      itemInfo.found = tools.list.basket.list[itemName];
      content += potatadex.makeButton(itemInfo);
      if (itemInfo.found) {
        foundItems++;
      }
    });

    let footer = `<span class="footer-msg">`;
    if (foundItems == maxItems) {
      footer += 'You found all of the things!';
    } else {
      footer += `You have found ${foundItems} of the ${maxItems} things.`;
    }
    footer += `</span>`;

    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render("Potatádex", content, footer);
  },

  makeButton: function (itemInfo) {
    let icon;
    if (itemInfo.type == 'spuds') {
      icon = svg.render('spud1');
      itemInfo.desc = spuds.desc(itemInfo);
    } else {
      icon = svg.render(itemInfo.name);
    }

    icon = svg.addOrientationClass(icon);

    if (!itemInfo.found) {
      icon = '???';
    }

    let content = `<div  class="hardware-button buttonize">`;
    content += ` <div class="hardware-button-icon">${icon}</div>`;
    content += ` <div class="hardware-button-desc"><b>${itemInfo.fullName}.</b> ${itemInfo.desc}</div>`;
    content += `</div>`;

    return content;
  },
};

