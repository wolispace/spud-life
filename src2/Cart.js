class Cart extends game.Item {
  machines = {
    max: {
      pricePerItem: 0,
      name: 'unknown', 
      qty: 0,
    }
  };

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
    footer += `<button class="buttonize" onclick="buildings.list.cart.cook()"> Cook </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render(title, content, footer);
  }

  exit() {
    console.log('exiting the cart');
  }

  cook() {
    this.allocate();
    console.log(this.machines);
    Object.entries(this.machines).forEach(([key, machine]) => {
      let saleAmount = machine.qty * machine.pricePerItem;
      tools.list.wallet.addQty(saleAmount);
    });
  }

  allocate() {
    // loop through basket finding spuds
    // look for a machine that is best..
    this.machineList();
    // otherwise put them in the machine that makes the most
    Object.entries(tools.list.basket.list).forEach(([itemName, qty]) => {
      let itemInfo = items[itemName];
      if (itemInfo.type == "spuds") {
        //we we dont have a machine for this spuds bestfor then dumpt it into the max machine
        let bestFor = this.machines[itemInfo.bestFor] ? itemInfo.bestFor : 'max';
        this.machines[bestFor].qty += qty;
        // remove item from basket (ie se its to zero)
        tools.list.basket.list[itemName] = 0;
        tools.list.basket.addQty(0-qty);
       
      }
    });
  }

  // returns a list of things machines make and the max price for it
  // {max: {pricePerItem: 20, qty: 0}, chips: {pricePerItem: 15, qty: 0}, soup: {pricePerItem:20, qty: 0}}

  machineList() {
    
    Object.entries(player.cart).forEach(([itemName]) => {
      let itemInfo = items[itemName];
      if (!this.machines[itemInfo.makes] 
        || (this.machines[itemInfo.makes] 
            && this.machines[itemInfo.makes].pricePerItem < itemInfo.pricePerItem)) {
        this.machines[itemInfo.makes] = {
          pricePerItem: itemInfo.pricePerItem, 
          name: itemName, 
          qty: 0
        };
      }
      // record the max if there are no bestfors that match each spud
      if (this.machines['max'].pricePerItem < itemInfo.pricePerItem) {
        this.machines['max'].pricePerItem  = itemInfo.pricePerItem;
        this.machines['max'].name = itemName;
      }
    });
  }
};
