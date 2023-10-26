const tools = {

  recordDelim: '^',
  fieldDelim: '|',
  list: {},

  setup: function () {
    let toolList = ['wallet', 'scanner', 'basket', 'axe', 'pick', 'spade'];

    let padding = 20;
    let params = {
      x: (game.grid.x * sprite.width) - sprite.width - padding,
      y: (game.grid.y * sprite.height) - sprite.height - padding,
      autoRender: false,
    }

    toolList.forEach((itemName) => {
      if (itemName != 'spade') {
        params.id = itemName;
        tools.list[itemName] = new Tool(params);
        tools.list[itemName].sprite.onclick = tools.clicks[itemName];
        params.x = params.x - tools.list[itemName].w - padding;
      }
    });
  },

  // cant use ^ or | in spud descriptions!
  decode: function (encodedString) {
    let decoded = {};
    let records = encodedString.split(tools.recordDelim);
    records.forEach((thisSpud) => {
      let bit = thisSpud.split(tools.fieldDelim);
      decoded[bit[0]] = {
        qty: parseInt(bit[1]),
        max: bit[2],
        list: JSON.parse(bit[3]),
        state: bit[4],
      };
    });

    return decoded;
  },

  encode: function () {
    let encodedString = '';
    let r = '';
    let d = tools.fieldDelim;
    Object.entries(tools.list).forEach(([toolName, toolInfo]) => {
      let stringOfList = JSON.stringify(toolInfo.list) || '{}';
      encodedString += `${r}${toolName}${d}`;
      encodedString += `${toolInfo.qty || 0}${d}`;
      encodedString += `${toolInfo.max || 0}${d}`;
      encodedString += `${stringOfList}${d}`;
      encodedString += `${toolInfo.state || true}${d}`;
      r = tools.recordDelim;
    });

    return encodedString;
  },


  clicks: {
    pick: function () {
      let title = "Pick";
      let content = `<div class="dialog-message-content">`;
      content += `This is your pick.`;
      let footer = "";
      footer += `<button class="buttonize" onclick="dialog.hide(); sky.goDark()"> Dark </button>`;
      footer += `<button class="buttonize" onclick="dialog.hide(); sky.goLight()"> Light </button>`;
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
      footer += `<button class="buttonize" onclick="dialog.hide(); game.playerItem.hide()"> Hide </button>`;
      footer += `<button class="buttonize" onclick="dialog.hide(); game.playerItem.show()"> Show </button>`;
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    },
    basket: function () {
      basket.show();
    },
    scanner: function () {
      scanner.render();
    },
    wallet: function () {
      let title = "Wallet";
      let content = `<div class="dialog-message-content">`;
      content += `Summary of your last sale`;
      content += buildings.list.cart.summarise();
      let footer = "";
      footer += `<button class="buttonize" onclick="hint.test()"> Hint </button>`;
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { console.log('wallet OK'); dialog.hide(); };
      dialog.render(title, content, footer);
    },
  },

  reset: function () {
    let skipTools = ['basket', 'wallet', 'scanner'];
    Object.entries(tools.list).forEach(([toolName, toolInfo]) => {
      if (!skipTools.includes(toolName)) {
        toolInfo.resetQty();
      }
    });

    controls.list.spade.resetQty();

  },

};

