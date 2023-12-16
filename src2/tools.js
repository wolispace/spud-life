const tools = {

  recordDelim: '^',
  fieldDelim: '|',
  list: {},
  buyable: ['axe', 'pick'],

  setup: function () {
    let toolList = ['wallet', 'scanner', 'basket', 'axe', 'pick', 'spade'];

    let padding = 20;
    let params = {
      x: (game.grid.x * sprite.width) - sprite.width - padding,
      y: (game.grid.y * sprite.height) - sprite.height - padding,
      autoRender: false,
    }

    toolList.forEach((itemName) => {
      if (itemName != 'spade' || !player.cursors) {
        params.id = itemName;
        // start scanner at max
        if (itemName == 'scanner') {
          params.qty = game.maxScan;
        }
        params.name = itemName;
        tools.list[itemName] = new Tool(params);
        tools.list[itemName].sprite.onclick = tools.clicks[itemName];
        params.x = params.x - tools.list[itemName].w - padding;
        tools.list[itemName].total = player.tools[itemName].total ?? 0;
        if (tools.buyable.includes(itemName) && player.tools[itemName].max === 0) {
          tools.list[itemName].hide();
        }
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
        max: parseInt(bit[2]),
        list: JSON.parse(bit[3]),
        state: bit[4],
        total: parseInt(bit[5]),
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
      encodedString += `${toolInfo.total || 0}${d}`;
      r = tools.recordDelim;
    });

    return encodedString;
  },

  clicks: {
    spade: function () {
      controls.dig();
    },
    pick: function () {
      let title = "Pick";
      let content = `<div class="dialog-message-content">`;
      content += `This is your pick.`;
      content += `You have used it ${tools.list.pick.total} times.`;
      let footer = "";
      footer += `<div></div>`;
      footer += `<button class="buttonize" onclick="dialog.okButton()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    },

    axe: function () {
      let title = "axe";
      let content = `<div class="dialog-message-content">`;
      content += `This is your axe.`;
      content += `You have used it ${tools.list.axe.total} times.`;
      let footer = "";
      footer += `<div></div>`;
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
      content += `Summary of your sales this session:`;
      content += buildings.list.cart.summarise();
      let footer = "";
      if (isDev) {
        footer += `<button class="buttonize devButton" onclick="lists.compress()"> Compress </button>`;
        footer += `<button class="buttonize devButton" onclick="field.showAll()"> Show all </button>`;
        footer += `<button class="buttonize devButton" onclick="tools.addMoney(1000)"> Add 1k </button>`;
      }
      footer += `<button class="buttonize" onclick="aboutGame()"> About </button>`;
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { dialog.hide(); };
      dialog.okButton = function () { dialog.hide(); };
      dialog.render(title, content, footer);
    },
  },

  addMoney: function (amount) {
    tools.list.wallet.addQty(amount);
  },

  reset: function () {
    let skipTools = ['basket', 'wallet', 'scanner'];
    Object.entries(tools.list).forEach(([toolName, toolInfo]) => {
      if (!skipTools.includes(toolName)) {
        toolInfo.resetQty();
      }
    });
  },

  add: function (itemInfo) {
    console.log('addTool', itemInfo);
    let thisTool = tools.list[itemInfo.item];
    let addQty = game.tool.incrementQty;
    if (thisTool.max < 1) {
      thisTool.show();
      addQty = game.tool.initialQty;
    }
    thisTool.addQty(addQty);
    hint.addTool(thisTool);
  },

};

