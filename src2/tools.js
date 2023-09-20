const tools = {

  list: {},

  setup: function () {
    let toolList = ['wallet', 'scanner', 'basket', 'axe', 'pick'];

    let padding = 20;
    let params = {
      x: (game.grid.x * sprite.width) - sprite.width - padding,
      y: (game.grid.y * sprite.height) - sprite.height - padding,
    }


    toolList.forEach((itemName) => {
      params.id = itemName;
      tools.list[itemName] = new Tool(params);
      tools.list[itemName].onClick = tools.clicks[itemName];
      params.x = params.x - tools.list[itemName].w - padding;
    });
  },

  show: function () {

  },

  hide: function () {

  },

  clicks: {
    pick: function () {
      let title = "Pick";
      let content = `<div class="dialog-message-content">`;
      content += `This is your pick.`;
      let footer = "";
      footer += `<button class="buttonize" onclick="dialog.okButton()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    },
    axe: function () {
      let title = "axe";
      let content = `<div class="dialog-message-content">`;
      content += `This is your axe.`;
      let footer = "";
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    },
    basket: function () {
      let title = "Basket";
      let content = `<div class="dialog-message-content">`;
      content += `This is your basket.`;
      let footer = "";
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    },
    scanner: function () {
      let title = "Scanner";
      let content = `<div class="dialog-message-content">`;
      content += `This is your scanner.`;
      let footer = "";
      footer += `<button class="buttonize" onclick="field.clear()"> Clear </button>`;
      footer += `<button class="buttonize" onclick="state.clear(true)"> Reset </button>`;
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    },
    wallet: function () {
      let title = "Wallet";
      let content = `<div class="dialog-message-content">`;
      content += `This is your wallet.`;
      let footer = "";
      footer += `<button class="buttonize" onclick="field.addGrid()"> Show grid </button>`;
      //footer += `<button class="buttonize" onclick="field.removeGrid()">Off </button>`;
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { console.log('wallet OK'); dialog.hide(); };
      dialog.render(title, content, footer);
    },
  }
};

