const tools = {
  list: {},
  buyable: ['axe', 'pick'],

  setup: function () {
    let toolList = ['wallet', 'scanner', 'basket', 'axe', 'pick', 'spade'];

    let params = {
      x: (game.grid.x * sprite.width) - sprite.width - game.tool.padding,
      y: (game.grid.y * sprite.height) - sprite.height - game.tool.padding,
      autoRender: false,
    }

    toolList.forEach((itemName) => {
      if (player.cursors) {
        if (itemName == 'spade') {
          params = tools.spadeCoords(params);
        }
        params.id = itemName;
        // start scanner at max
        if (itemName == 'scanner') {
          params.qty = game.maxScan;
        }
        params.name = itemName;
        tools.list[itemName] = new Tool(params);
        tools.list[itemName].sprite.onclick = tools.clicks[itemName];
        params.x = params.x - tools.list[itemName].w - game.tool.padding;
        tools.list[itemName].total = player.tools[itemName].total ?? 0;
        if (tools.buyable.includes(itemName) && player.tools[itemName].max === 0) {
          tools.list[itemName].hide();
        }
        if (itemName == 'spade') {
          tools.spadePos();
        }
      }
    });
  },

  spadePos: function () {
    let params = tools.spadeCoords();
    tools.list['spade'].x = params.x;
    tools.list['spade'].y = params.y;
    tools.list['spade'].setPos();
    let backing = document.querySelector(".spd");
    let start = tools.list['spade'];
    let padding = start.w / 2;
    backing.style.left = `${start.x - padding}px`;
    backing.style.top = `${start.y - padding}px`;
    backing.style.width = `${start.w + padding * 2}px`;
    backing.style.height = `${start.h + padding * 2}px`;
  },

  spadeCoords: function (params = {}) {
    let target = controls.list['down'];
    if (player.spadePos) {
      target = tools.list['wallet'];
    }
    params.x = target.x;
    params.y = target.y - sprite.height - game.tool.padding;
    return params;
  },

  // cant use ^ or | in spud descriptions!
  decode: function (encodedString) {
    let decoded = {};
    let records = encodedString.split(game.recDelim);
    records.forEach((thisSpud) => {
      let bit = thisSpud.split(game.fldDelim);
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
    let d = game.fldDelim;
    Object.entries(tools.list).forEach(([toolName, toolInfo]) => {
      let stringOfList = JSON.stringify(toolInfo.list) || '{}';
      encodedString += `${r}${toolName}${d}`;
      encodedString += `${toolInfo.qty || 0}${d}`;
      encodedString += `${toolInfo.max || 0}${d}`;
      encodedString += `${stringOfList}${d}`;
      encodedString += `${toolInfo.state || true}${d}`;
      encodedString += `${toolInfo.total || 0}${d}`;
      r = game.recDelim;
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
      if (isDev) {
        content += tools.fieldCount();
      }
      let footer = "";
      footer += `<div></div>`;
      if (isDev) {
        footer += `<button class="buttonize" onclick="help.show()"> ? </button>`;
      }
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
      if (isDev) {
        content += tools.fieldCount();
      }
      let footer = "";
      footer += `<div></div>`;
      if (isDev) {
        footer += `<button class="buttonize" onclick="help.show()"> ? </button>`;
      }
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
        footer += `<button class="buttonize devButton" onclick="field.showAll()"> Show all </button>`;
        footer += `<button class="buttonize devButton" onclick="tools.addMoney(1000)"> Add 1k </button>`;
        footer += `<button class="buttonize devButton" onclick="tools.addItems()"> +items </button>`;
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
  
  addItems: function () {
    let items = ['log', 'rock', 'bottle', 'caps', 'diamond'];
    items.forEach((item => {
      basket.add({ item: item, qty: 1 });
    }));
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
    let thisTool = tools.list[itemInfo.item];
    let addQty = game.tool.incrementQty;
    if (thisTool.max < 1) {
      thisTool.show();
      addQty = game.tool.initialQty;
    }
    if (itemInfo.item == 'scanner') {
      thisTool.addQty(-1);
    } else {
      thisTool.addQty(addQty);
    }
    hint.show('addTool',{target: thisTool, name: itemInfo.item});
  },

  fieldCount: function () {
    let allItems = [];
    player.fields.forEach((field, fieldId) => {
      allItems[fieldId] = {};
      field.forEach((layer, _) => {
        layer.forEach((itemInfo, _) => {
          let type = 'unknown';
          let id = 'unknown';
          if (itemInfo) {
            type = itemInfo.type ?? itemInfo.item ?? 'unknown';
            id = itemInfo.id;
          }
          if (!allItems[fieldId][type]) {
            allItems[fieldId][type] = [];
          }
          allItems[fieldId][type].push(id);

        });
      });
    });

    let html = '<pre>Dev, this is in the field:<br/>';
    allItems.forEach((field, fieldId) => {
      Object.entries(field).forEach(([itemName, items]) => {
        html += `${itemName} = ${items.length}</br>`;
      });
    });
    html += '</pre>';
    return html;
  },

};

