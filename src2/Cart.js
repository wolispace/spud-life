class Cart extends game.Item {
  constructor() {
    let params = {
      id: 'cart',
      x: (sprite.width * game.grid.x) - (sprite.width * 3),
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2,
      item: 'cart',
    };
    super(params);
  }
  
  enter() {
    let title = "Your food cart";
    let content = `<div class="dialog-message-content">`;
    content += `Sell meals`;
    let footer = "";
    footer += `<button class="buttonize" onclick="buildings.list.cart.sell()"> Cook </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render(title, content, footer);
  }

  exit() {
    console.log('exiting the cart');
  }

  sell() {
    // loop through basket finding spuds
    // look for a machine that is best..
    let machines = this.machineList();
    // otherwise put them in the machine that makes the most
    Object.entries(tools.list.basket.list).forEach(([itemName, qty]) => {
      let itemInfo = items[itemName];
      if (itemInfo.type == "spuds") {
        //we we dont have a machine for this spuds bestfor then dumpt it into the max machine
        console.log(itemInfo.bestFor);
        let bestFor = machines[itemInfo.bestFor] ? itemInfo.bestFor : 'max';
        machines[bestFor].qty += qty;
      }
    });
    console.log(machines);
  }

  // returns a list of things machines make and the max price for it
  // {max: {pricePerItem: 20, qty: 0}, chips: {pricePerItem: 15, qty: 0}, soup: {pricePerItem:20, qty: 0}}

  machineList() {
    let machineList = {max: {pricePerItem: 0, qty: 0}};
    Object.entries(player.cart).forEach(([itemName]) => {
      let itemInfo = items[itemName];
      if (!machineList[itemInfo.makes] || (machineList[itemInfo.makes] && machineList[itemInfo.makes].pricePerItem < itemInfo.pricePerItem)) {
        machineList[itemInfo.makes] = {pricePerItem: itemInfo.pricePerItem, qty: 0};
      }
      // record the max if there are no bestfors that match each spud
      if (machineList['max'].pricePerItem < itemInfo.pricePerItem) {
        machineList['max'].pricePerItem  = itemInfo.pricePerItem;
      }
    });

    return machineList;
  }
};
