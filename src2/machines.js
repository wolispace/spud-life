const machines = {
  describe: function (itemName) {
    let itemInfo = items[itemName] ?? fixedItems[itemName];

    hint.force = true;
    hint.target = document.querySelector(`.machine_${itemName}`);
    hint.message = `<b>${itemInfo.fullName}</b></br>${itemInfo.desc}`;
    hint.okButton = 'hint.close';
    hint.group = ``,
    hint.render();
  },
  
  add: function (spriteBox) {
    let itemInfo = list.all[spriteBox.item];
    if (player.cart[spriteBox.item] > -1) {
      hint.gotMachine(itemInfo.fullName);
      tools.list.wallet.addQty(100);
    } else {
      hint.addMachine(itemInfo.fullName);
      player.cart[spriteBox.item] = 0;
    }
  },
};