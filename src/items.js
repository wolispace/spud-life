let items = {
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
  masher: {
    type: "machine",
    name: "Monster masher",
    desc: "Makes light and fluffy mashed potato",
    price: 200,
    rareness: 300,
    upgradeCost: 100,
    maxUpgrades: 100,
    initial: {
      pricePerItem: 15,
      makes: "mashed potato",
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
      pricePerItem: 15,
      makes: "soup",
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
      pricePerItem: 20,
      makes: "baked potatoes",
      hopper: {},
    },
  },
  curly: {
    type: "machine",
    name: "Curly cooker",
    desc: "Cooks a potato into a curly-fry",
    price: 250,
    rareness: 300,
    upgradeCost: 100,
    maxUpgrades: 100,
    initial: {
      pricePerItem: 20,
      makes: "curly-fries",
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
      pricePerItem: 30,
      makes: "chips",
      hopper: {},
    },
  },
  rosti: {
    type: "machine",
    name: "Rösti squasher",
    desc: "A fancy machine for making crispy rösti",
    price: 500,
    rareness: 400,
    upgradeCost: 100,
    maxUpgrades: 100,
    initial: {
      pricePerItem: 30,
      makes: "rosti",
      hopper: {},
    },
  },
  croquette: {
    type: "machine",
    name: "Croquette roller",
    desc: "Makes small golden balls of potato croquettes",
    price: 550,
    rareness: 400,
    upgradeCost: 100,
    maxUpgrades: 100,
    initial: {
      pricePerItem: 40,
      makes: "croquette",
      hopper: {},
    },
  },
  land: {
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
    rareness: 10,
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
};

