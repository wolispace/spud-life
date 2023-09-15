const tools = {

  list: {},

  setup: function () {
    let toolList = ['pick', 'spade', 'axe', 'scanner', 'wallet'];

    let leftX = 0.8;
    let leftY = 8.2;

    toolList.forEach((itemName) => {
      tools.list[itemName] = new Tool(itemName, sprite.width * leftX , sprite.height * leftY);
      tools.list[itemName].onClick = tools.clicks[itemName];
      leftX = leftX + 2;
    });
  },

  clicks: {
    pick: function () {
      let title = "Pick";
      let content = `<div class="dialog-message-content">`;
      content += `This is your pick.`;
      let footer = "";
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    },
    spade: function () {
      let title = "Spade";
      let content = `<div class="dialog-message-content">`;
      content += `This is your spade.`;
      let footer = "";
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
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
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    },
  }
};

