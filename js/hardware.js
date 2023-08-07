const hardware = {
  enter: function () {
    hardware.render();
    character.hide();
  },
  exit: function () {
    dialog.hide();
    character.render();
  },
  // draw tools and machines for sale
  render: () => {
    // return to the field when the dialog closes
    player.phase = 'field';
    let content = "";
    Object.entries(hardware.items).forEach(([toolName, tool]) => {
      let state = "Buy";
      let showItem = true;
      let buyCost = tool.price;
      let sellCost = tool.price;

      if (player.tools[toolName] || toolName == 'scanner') {
        state = "Upgrade";
        buyCost = tool.upgradeCost;
        if (toolName == 'scanner') {
          if (player.scanLevel >= tool.maxUpgrades) {
            showItem = false;
          }
        } else {
          if (player.tools[toolName].maxUses >= tool.maxUpgrades) {
            showItem = false;
          }
        }
      }
      let onClickBuy = "";
      let onClickSell = "";
      let canBuyClass = "tooMuch";
      let canSellClass = "tooMuch";
      if (player.basket[toolName]) {
        sellCost = sellCost * player.basket[toolName];
        onClickSell = `onclick="basket.sellItem('${toolName}')"`;
        canSellClass = '';
      }
      if (buyCost <= player.wallet) {
        onClickBuy = `onclick="tools.buyItem('${toolName}')"`;
        canBuyClass = ``;
      }
      if (player.shop.machines[toolName]) {
        showItem = false;
      }
      if ('item,block'.indexOf(tool.type) > -1 && !player.basket[toolName]) {
        showItem = false;
      }
      let showName = tool.name;
      if (tool.type == 'block' || tool.type == 'item') {
        let qty = (player.basket[toolName] > 1) ? `x ${player.basket[toolName]}` : '';
        showName = `${tool.name} ${qty}.`;
      } 

      if (showItem) {
        content += `<div class="hardware-button buttonize button_${tool.type} " id="hardware_${toolName}">`;
        content += ` <div class="hardware-button-icon">${svg.inline(toolName)}</div>`;
        content += ` <div class="hardware-button-desc"><strong>${showName}. </strong> ${tool.desc}</div>`;
        if (!player.tools[toolName] && player.basket[toolName]) {
          content += ` <div class="hardware-button-sell buttonize button  ${canSellClass}" ${onClickSell}>Sell<br/>$${sellCost}</div>`;
        }
        if (tool.type != 'item' && tool.type != 'block' ) {
          content += ` <div class="hardware-button-buy buttonize button ${canBuyClass}" ${onClickBuy}>${state}</br>$${buyCost}</div>`;
        }
        content += `</div>`;
      }
    });

    let title = "Hardware shop";
    let footer = "";
    footer += `<button class="buttonize" onclick="dialog.confirm()">Go outside</button>`;
    dialog.cancelButton = function () { hardware.exit(); };
    dialog.okButton = function () { hardware.exit(); };
    dialog.render(title, content, footer);
  },
  // loop through each tool on sale and change style if we can afford it or not
  refresh: () => {
    let elements = document.querySelector(".hardware div");
    elements.each((element) => {});
  },

  items: {
    spade: {
      type: "tool",
      name: "Spade",
      desc: "A useful tool for digging up spuds",
      price: 50,
      rareness: 100,
      upgradeCost: 50,
      maxUpgrades: 100,
      initial: {
        uses: 8,
        maxUses: 8,
      },
    },
    pick: {
      type: "tool",
      name: "Pick",
      desc: "A tool for breaking rocks",
      price: 100,
      rareness: 100,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        uses: 8,
        maxUses: 8,
      },
    },
    axe: {
      type: "tool",
      name: "Axe",
      desc: "A tool for clearing logs",
      price: 100,
      rareness: 100,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        uses: 8,
        maxUses: 8,
      },
    },
    scanner: {
      type: "tool",
      name: "Scanner",
      desc: "Scans the patches around you for buried items",
      price: 500,
      rareness: 500,
      upgradeCost: 500,
      maxUpgrades: 4,
      initial: {
        uses: 1,
        maxUses: 1,
      },
    },
    chipper: {
      type: "machine",
      name: "Humble Chipper",
      desc: "A basic heavy-duty chip-maker",
      price: 150,
      rareness: 300,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 5,
        makes: "chips",
        hopper: {},
      },
    },
    chipper2000: {
      type: "machine",
      name: "Chipper 2000",
      desc: "The latest upgrade of the tried-and-tested chip maker",
      price: 500,
      rareness: 300,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 20,
        makes: "chips",
        hopper: {},
      },
    },
    bake: {
      type: "machine",
      name: "Bake-o-matic",
      desc: "Makes an excellent baked potato",
      price: 250,
      rareness: 300,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 15,
        makes: "baked potatoes",
        hopper: {},
      },
    },
    curly: {
      type: "machine",
      name: "Curly cooker",
      desc: "Cooks a potato into a curly-fry",
      price: 400,
      rareness: 300,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 20,
        makes: "curly-fries",
        hopper: {},
      },
    },
    soup: {
      type: "machine",
      name: "Soup spinner",
      desc: "Makes a hearty potato soup",
      price: 200,
      rareness: 300,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 10,
        makes: "soup",
        hopper: {},
      },
    },
    "control-field--right": {
      type: "field",
      name: "A field for sale",
      desc: "Next to your plot of land is another, you can expand your digging activities and maybe find rarer potatoes",
      price: 1000,       
    },
    bone: {
      type: "item",
      name: "An old bone",
      desc: "I think a dog buried it",
      price: 5,
      rareness: 20,        
    },
    gold: {
      type: "item",
      name: "A few gold coins",
      desc: "A small hoard of old gold coins maybe dating back to Anglo-Saxon times",
      price: 100,
      rareness: 150,            
    },
    diamond: {
      type: "item",
      name: "A small diamond",
      desc: "Maybe it fell out of someones wedding ring",
      price: 50,
      rareness: 150,            
    },
    tin: {
      type: "item",
      name: "A rusty tin",
      desc: "Looks like it once stored baked beans",
      price: 1,
      rareness: 20,            
    }, 
    pottery: {
      type: "item",
      name: "A piece of pottery",
      desc: "Possibly from a broken terracotta flowerpot",
      price: 1,
      rareness: 20,            
    },
    bottle: {
      type: "item",
      name: "A glass bottle",
      desc: "it has mud inside and looks rather old and maybe medicinal",
      price: 10,
      rareness: 30, 
    },
    marble: {
      type: "item",
      name: "A small marble",
      desc: "Wipe the dirt off and it has an almost magical glow",
      price: 20,
      rareness: 50, 
    },
    caps: {        
      type: "item",
      name: "A few bottle caps",
      desc: "They are rusty and bent, but you can make out some letters: Nuka..",
      price: 50,
      rareness: 50, 
    },
    rock: {        
      type: "block",
      name: "A rock",
      desc: "Found while cleared the field. Rocks are heavy, hard and doesn't taste nice",
      price: 1,
      rareness: 20, 
    },
    log: {        
      type: "block",
      name: "A log",
      desc: "These logs are weathered and splintered, however neatly cut on each end",
      price: 1,
      rareness: 20, 
    },
  },
};

