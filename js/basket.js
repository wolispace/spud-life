const basket = {
  // count how many items are in the basket, spuds or other stuff
  count: () => {
    let spuds = 0;
    Object.entries(player.basket).forEach(([spudName, spudQty]) => {
      spuds += spudQty;
    });

    return spuds;
  },
  // show contents of the basket
  render: () => {
    let basketList = "";
    let style = `style="width:2rem;"`;
    Object.entries(player.basket).forEach(([spudName, spudQty]) => {
      let spudInfo = player.spuds.filter((spud) => spud.name == spudName)[0];
      if (spudInfo) {
        let spudDesc = spuds.desc(spudInfo);
        let icon = spuds.render(spudInfo.name, style);
        let machine = player.shop.machines[player.shop.selected];
        basketList += `<div class="basketSpuds buttonize">`;
        basketList += `<div class="basketSpudName">${icon} ${spudQty} ${spudInfo.fullName}</div>`;
        basketList += `<div class="basketListButtons">`;
        if (spudQty > 0) {
          basketList += `<div class="spudListButton" onclick="spuds.move('${spudName}', ${spudQty})">&lt;&lt;</div>`;
          basketList += `<div class="spudListButton" onclick="spuds.move('${spudName}', 1)">&lt;</div>`;
        } else {
          basketList += `<div class="spudListButton" >&lt;&lt;</div>`;
          basketList += `<div class="spudListButton" >&lt;</div>`;
        }
        if (machine && machine.hopper && machine.hopper[spudName] > 0) {
          basketList += `<div class="spudListButton" onclick="spuds.move('${spudName}', -1)">&gt;</div>`;
        } else {
          basketList += `<div class="spudListButton" >&gt;</div>`;
        }
        basketList += `</div>`;
        basketList += `<div class="basketSpudDesc">${spudDesc}</div>`;
        basketList += `</div>`;
      }
    });

    element = document.querySelector(".basket");
    element.innerHTML = basketList;
  },
  // show or hide the basket via a dialog
  show: () => {
    if (hint.visible || dialog.visible) {
      return;
    }
    let content = "";
    let content2 = "";
    let style = `style="width:3rem;"`;
    Object.entries(player.basket).forEach(([itemName, itemQty]) => {
      if (itemQty > 0 ) {
        let spudInfo = player.spuds.filter((spud) => spud.name == itemName)[0];
        if (spudInfo) {
          let icon = spuds.render(spudInfo.name, style);
          let spudDesc = spuds.desc(spudInfo);
  
          content += `<div  class="hardware-button buttonize">`;
          content += ` <div class="hardware-button-icon">${icon}</div>`;
          content += ` <div class="hardware-button-desc"> ${itemQty} <b>${spudInfo.fullName}.</b> ${spudDesc}</div>`;
          content += `</div>`;
        } else {
          let itemInfo = hardware.items[itemName];
          let icon = svg.render(itemName, 1, style);
          content2 += `<div  class="hardware-button buttonize">`;
          content2 += ` <div class="hardware-button-icon">${icon}</div>`;
          content2 += ` <div class="hardware-button-desc"> <b>${itemName}.</b> ${itemInfo.desc}</div>`;
          content2 += `</div>`;
        }
      }
    });

    let footer = "";
    footer += `<button class="buttonize" onclick="potatadex.render()"> Potatádex </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render("Inventory", `${content}${content2}`, footer);
  },
  // sell something
  sellItem: (itemName) => {
    let item = hardware.items[itemName];
    let itemQty = player.basket[itemName] ?? 0;

    player.wallet = player.wallet + (item.price * itemQty);
    player.basket[itemName] = 0;
    state.save();
    let thisBlock = document.querySelector(`#hardware_${itemName}`);
    hardware.refresh(thisBlock);
  },
};

