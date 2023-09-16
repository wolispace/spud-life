const tools = {

  list: {},

  setup: function () {
    let toolList = ['wallet', 'scanner', 'basket','axe', 'pick' ];

    let qty = 1;

    let padding = 20;
    let newLeft = (game.grid.x * sprite.width) - sprite.width - padding;
    let newTop = (game.grid.y * sprite.height) - sprite.height - padding;


    toolList.forEach((itemName) => {
      tools.list[itemName] = new Tool(itemName, newLeft , newTop, qty);
      tools.list[itemName].onClick = tools.clicks[itemName];
      newLeft = newLeft - tools.list[itemName].w - padding;
      qty++;
    });

    tools.list['spade'].updateQty(33);
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
    scanner: function () {
      let title = "Scanner";
      let content = `<div class="dialog-message-content">`;
      content += `This is your scanner.`;
      let footer = "";
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
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { console.log('wallet OK'); dialog.hide(); };
      dialog.render(title, content, footer);
    },
  }
};

