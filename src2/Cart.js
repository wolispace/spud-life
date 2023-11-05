class Cart extends game.Item {
  machines = {
    max: {
      pricePerItem: 0,
      name: 'unknown',
      qty: 0,
    }
  };
  qty = 0;
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
      this.summariseMachines();
      console.log(this.machineSummary);
      if (this.qty > 0) {
        buildings.list.cart.readyDialog();
      } else {
        buildings.list.cart.dayDialog();
      }
    } else {
      buildings.list.cart.nightDialog();
    }
  }

  summariseMachines() {
    this.machineSummary = {};
    Object.entries(player.cart).forEach(([itemName, qty]) => {
      let itemInfo = items[itemName];
      this.qty += qty;
      this.machineSummary[itemName] = {
        qty: qty,
        makes: itemInfo.makes,
        pricePerItem: itemInfo.pricePerItem,
        total: itemInfo.pricePerItem * qty,
      }
    });    
  }

  dayDialog() {
    let title = "Your food cart";
    let content = `<div class="dialog-message-content">`;
    content += this.ownedIcons();
    let footer = "";
    if (basket.hasSpuds()) {
      content += `Load your machines with spuds and start them cooking`;
      footer += `<button class="buttonize" onclick="buildings.list.cart.load()"> Load machines </button>`;
    } else {
      content += `<div>You haven't found any potatoes yet.</div>`;
      content += `<div>Go out and dig for some or sleep till tomorrow to refresh your tools.</div>`;
    }
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Exit </button>`;
    dialog.cancelButton = function () { buildings.list.cart.exit(); };
    dialog.okButton = function () { buildings.list.cart.exit(); };
    dialog.render(title, content, footer);
  }

  readyDialog() {
    let title = "Your food cart";
    let mealQty = 0;
    let content = `<div class="dialog-message-content">`;
    content += this.ownedIcons();
    content += '<div><ul>';    
    Object.entries(this.machineSummary).forEach(([itemName, info]) => {
      content += `<li>${itemName} makes ${info.makes}: ${info.qty} x ${info.pricePerItem} = ${info.total}</li>`;
      mealQty += info.qty;
    });
    content += '</ul></div>';
    let s = mealQty == 1 ? '' : 's';
    content += `<div>It's time to open your cart and sell your ${mealQty} potato-based meal${s}</div>`;
    
    let footer = "";
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Open </button>`;
    dialog.cancelButton = function () { buildings.list.cart.open(); };
    dialog.okButton = function () { buildings.list.cart.open(); };
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
    this.qty = 0;
    Object.entries(player.cart).forEach(([itemName, qty]) => {
      player.cart[itemName] = 0;
    });
  }

  load() {
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
    this.readyDialog();
  }
  
  open() {
    customers.find(this.machineSummary);
    this.reset();
  }

  allocate() {
    // loop through basket finding spuds
    // look for a machine that is best..
    this.machineList();
    // otherwise put them in the machine that makes the most
    Object.entries(tools.list.basket.list).forEach(([itemName, qty]) => {
      let itemInfo = items[itemName];
      if (itemInfo.type == "spuds") {
        //if we dont have a machine for this spuds bestfor then dump it into the max machine
        let bestFor = this.machines[itemInfo.bestFor] ? itemInfo.bestFor : 'max';
        this.machines[bestFor].qty += qty;
        player.cart[this.machines[bestFor].name] += qty;
        // remove item from basket (ie se its to zero)
        tools.list.basket.list[itemName] = 0;
        tools.list.basket.addQty(0 - qty);
      }
    });
    this.summariseMachines();
  }

  // builds a list of things machines make and the max price for it
  // {max: {pricePerItem: 20, qty: 0}, chips: {pricePerItem: 15, qty: 0}, soup: {pricePerItem:20, qty: 0}}

  machineList() {
    Object.entries(player.cart).forEach(([itemName, qty]) => {
      let itemInfo = items[itemName];
      if (!this.machines[itemInfo.makes]
        || (this.machines[itemInfo.makes]
          && this.machines[itemInfo.makes].pricePerItem < itemInfo.pricePerItem)) {
        this.machines[itemInfo.makes] = {
          pricePerItem: itemInfo.pricePerItem,
          name: itemName,
          makes: itemInfo.makes,
          qty: qty,
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
