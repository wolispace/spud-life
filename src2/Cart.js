class Cart extends game.Item {
  machines = {
    max: {
      pricePerItem: 0,
      name: 'unknown',
      qty: 0,
    }
  };
  meals = 0;
  income = 0;
  list = {};

  constructor() {
    let params = {
      id: 'cart',
      x: (sprite.width * game.grid.x) - (sprite.width * 3),
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2,
      item: 'cart',
      autoRender: false,
    };
    super(params);
  }

  enter() {
    if (player.daytime) {
      buildings.list.cart.dayDialog();
    } else {
      buildings.list.cart.nightDialog();
    }
  }

  dayDialog() {
    let title = "Your food cart";
    let content = `<div class="dialog-message-content">`;
    content += this.ownedIcons();
    let footer = "";
    if (basket.hasSpuds()) {
      content += `Sell meals`;
      footer += `<button class="buttonize" onclick="buildings.list.cart.cook()"> Cook </button>`;
    } else {
      content += `<div>You haven't found any potatoes yet.</div>`;
      content += `<div>Go out and dig for some or sleep till tomorrow to refresh your tools.</div>`;
    }
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Exit </button>`;
    dialog.cancelButton = function () { buildings.list.cart.exit(); };
    dialog.okButton = function () { buildings.list.cart.exit(); };
    dialog.render(title, content, footer);
  }

  nightDialog() {
    let title = "Your food cart";
    let content = `<div class="dialog-message-content">`;
    content += `<div>It's nighttime and everyone has gone to sleep.</div>`;
    content += `<div>Go home and get some sleep.</div>`;   
    let footer = "";
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Exit </button>`;
    dialog.cancelButton = function () { buildings.list.cart.exit(); };
    dialog.okButton = function () { buildings.list.cart.exit(); };
    dialog.render(title, content, footer);
  }

  exit() {
    dialog.hide();
    buildings.exit();
  }

  reset() {
    this.meals = 0;
    this.income = 0;
    this.list = {};
  }

  cook() {
    this.reset();
    dialog.hide();
    this.allocate();
    Object.entries(this.machines).forEach(([key, machine]) => {
      if (machine.qty > 0) {
        let income = machine.qty * machine.pricePerItem;
        this.meals += machine.qty;
        this.income += income;
        if (!this.list[machine.makes]) {
          this.list[machine.makes] = { meals: 0, income: 0 };
        }
        this.list[machine.makes].meals += machine.qty;
        this.list[machine.makes].income += income;
      }
    });
    customers.find(this.meals);
  }

  allocate() {
    // loop through basket finding spuds
    // look for a machine that is best..
    this.machineList();
    // otherwise put them in the machine that makes the most
    Object.entries(tools.list.basket.list).forEach(([itemName, qty]) => {
      let itemInfo = items[itemName];
      if (itemInfo.type == "spuds") {
        //we we dont have a machine for this spuds bestfor then dump it into the max machine
        let bestFor = this.machines[itemInfo.bestFor] ? itemInfo.bestFor : 'max';
        this.machines[bestFor].qty += qty;
        // remove item from basket (ie se its to zero)
        tools.list.basket.list[itemName] = 0;
        tools.list.basket.addQty(0 - qty);

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
          makes: itemInfo.makes,
          qty: 0
        };
      }
      // record the max if there are no bestfors that match each spud
      if (this.machines['max'].pricePerItem < itemInfo.pricePerItem) {
        this.machines['max'].pricePerItem = itemInfo.pricePerItem;
        this.machines['max'].name = itemName;
        this.machines['max'].makes = itemInfo.makes;
      }
    });
  }

  summarise() {
    let html = '';
    Object.entries(this.list).forEach(([machineName, itemInfo]) => {
      html += `<div>${itemInfo.meals} meals of ${machineName} is $${itemInfo.income}<//div>`;
    });
    html += `<div><br/><strong>${this.meals} total meals is $${this.income}</string></div>`;
    return html;
  }

  ownedIcons() {
    let html = '';
    Object.entries(player.cart).forEach(([machineName, info]) => {
      let itemSvg = svg.render(machineName);
      html += `<div class="cartMachine buttonize button machine_${machineName}" onclick="machines.describe('${machineName}')">${itemSvg}</div>`;
    });
    return `<div class="cartMachines">${html}</div>`;
  }

};
