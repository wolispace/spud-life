const hardware = {
  // draw tools and machines for sale 
  render: () => {
    let tools = '';
    Object.entries(player.hardware).forEach(([toolName, tool]) => {
      let state = 'buy';
      let cost = tool.price;
      if (player.tools[toolName]) {
        state = 'upgrade'
        cost = tool.upgradeCost;
      }
      let onClick = '';
      let canBuyClass = 'tooMuch';
      if (cost <= player.purse) {
        onClick = `onclick="tools.buyTool('${toolName}')"`;
        canBuyClass = ``;

      }
      if (!player.shop.machines[toolName]) {
        tools += `<div class="buttonize button_${tool.type} ${canBuyClass}" ${onClick} id="hardware_${toolName}" ${onClick}>`;
        tools += `<strong>${tool.name}. </strong>`;
        tools += `${tool.desc}<br/>${state}=${cost}</div>`;
      }
    });

    element = document.querySelector('.hardware');
    element.innerHTML = tools;
  },
  // loop through each tool on sale and change style if we can afford it or not
  refresh: () => {
    let elements = document.querySelector('.hardware div');
    elements.each((element) => {
    });
  },

  store: () => {
    return {
      "spade": {
        type: "tool",
        name: "Spade",
        desc: "A useful tool for diging up spods",
        price: 0,
        upgradeCost: 50,
        maxUpgrades: 100,
        initial: {
          uses: 0,
          maxUses: 5,
        }
      },
      "pick": {
        type: "tool",
        name: "Pick",
        desc: "A tool for breaking rocks",
        price: 100,
        upgradeCost: 100,
        maxUpgrades: 100,
        initial: {
          uses: 0,
          maxUses: 5,
        }
      },
      "axe": {
        type: "tool",
        name: "Axe",
        desc: "A tool for clearing logs",
        price: 150,
        upgradeCost: 100,
        maxUpgrades: 100,
        initial: {
          uses: 0,
          maxUses: 5,
        }
      },
      "chipper": {
        type: "machine",
        name: "Humble Chipper",
        desc: "A basic heavy-duty chip-maker",
        price: 150,
        upgradeCost: 100,
        maxUpgrades: 100,
        initial: {
          pricePerItem: 5,
          makes: "chips",
          hopper: {}
        }
      },
      "chipper-2000": {
        type: "machine",
        name: "Chipper 2000",
        desc: "The latest upgrade of the tried-and-tested chip maker",
        price: 500,
        upgradeCost: 100,
        maxUpgrades: 100,
        initial: {
          pricePerItem: 20,
          makes: "chips",
          hopper: {}
        }
      },
      "back-o-matic": {
        type: "machine",
        name: "Bake-o-matic",
        desc: "Makes an excellent baked potato",
        price: 250,
        upgradeCost: 100,
        maxUpgrades: 100,
        initial: {
          pricePerItem: 15,
          makes: "baked potatoes",
          hopper: {}
        }
      },
      "curly-cooker": {
        type: "machine",
        name: "Curly cooker",
        desc: "Cooks a potato into a curly-fry",
        price: 400,
        upgradeCost: 100,
        maxUpgrades: 100,
        initial: {
          pricePerItem: 20,
          makes: "curly-fries",
          hopper: {}
        }
      },
      "soup-spinner": {
        type: "machine",
        name: "Soup spinner",
        desc: "Makes a hearly potato soup",
        price: 200,
        upgradeCost: 100,
        maxUpgrades: 100,
        initial: {
          pricePerItem: 10,
          makes: "soup",
          hopper: {}
        }
      },

    }
  }
}