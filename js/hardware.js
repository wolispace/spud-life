const hardware = {
  // draw tools and machines for sale
  render: () => {
    let content = "";
    Object.entries(player.hardware).forEach(([toolName, tool]) => {
      let state = "buy";
      let cost = tool.price;
      if (player.tools[toolName]) {
        state = "upgrade";
        cost = tool.upgradeCost;
      }
      let onClick = "";
      let canBuyClass = "tooMuch";
      if (cost <= player.wallet) {
        onClick = `onclick="tools.buyTool('${toolName}')"`;
        canBuyClass = ``;
      }
      if (!player.shop.machines[toolName]) {
        content += `<div class="buttonize button button_${tool.type} ${canBuyClass}" ${onClick} id="hardware_${toolName}" ${onClick}>`;
        content += `<strong>${tool.name}. </strong>`;
        content += `${tool.desc}<br/>${state}=${cost}</div>`;
      }
    });

    let title = "Hardware shop";
    let footer = "";
    showDialog(title, content, footer);
  },
  // loop through each tool on sale and change style if we can afford it or not
  refresh: () => {
    let elements = document.querySelector(".hardware div");
    elements.each((element) => {});
  },

  store: () => {
    return {
      spade: {
        type: "tool",
        name: "Spade",
        desc: "A useful tool for digging up spuds",
        price: 50,
        rareness: 100,
        upgradeCost: 50,
        maxUpgrades: 100,
        initial: {
          uses: 0,
          maxUses: 5,
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
          uses: 0,
          maxUses: 5,
        },
      },
      axe: {
        type: "tool",
        name: "Axe",
        desc: "A tool for clearing logs",
        price: 150,
        rareness: 100,
        upgradeCost: 100,
        maxUpgrades: 100,
        initial: {
          uses: 0,
          maxUses: 5,
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
      "chipper-2000": {
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
      "back-o-matic": {
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
      "curly-cooker": {
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
      "soup-spinner": {
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

    };
  },
};
