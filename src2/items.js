let items = {
  spade: {
    type: "tools",
    fullName: "Spade",
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
    type: "tools",
    fullName: "Pick",
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
    type: "tools",
    fullName: "Axe",
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
    type: "tools",
    fullName: "Scanner",
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
    type: "machines",
    fullName: "Humble Chipper",
    desc: "A basic heavy-duty chip-maker",
    price: 150,
    rareness: 300,
    upgradeCost: 100,
    maxUpgrades: 100,
    pricePerItem: 5,
    makes: "chips",
  },
  masher: {
    type: "machines",
    fullName: "Monster masher",
    desc: "Makes light and fluffy mashed potato",
    price: 200,
    rareness: 300,
    upgradeCost: 100,
    maxUpgrades: 100,
    pricePerItem: 15,
    makes: "mash",
  },
  souper: {
    type: "machines",
    fullName: "Soup spinner",
    desc: "Makes a hearty potato soup",
    price: 200,
    rareness: 300,
    upgradeCost: 100,
    maxUpgrades: 100,
    pricePerItem: 15,
    makes: "soup",
  },
  baker: {
    type: "machines",
    fullName: "Bake-o-matic",
    desc: "Makes an excellent baked potato",
    price: 250,
    rareness: 300,
    upgradeCost: 100,
    maxUpgrades: 100,
    pricePerItem: 20,
    makes: "baked",
  },
  curler: {
    type: "machines",
    fullName: "Curly cooker",
    desc: "Cooks a potato into a curly-fry",
    price: 250,
    rareness: 300,
    upgradeCost: 100,
    maxUpgrades: 100,
    pricePerItem: 20,
    makes: "curly",
  },
  chipper2000: {
    type: "machines",
    fullName: "Chipper 2000",
    desc: "The latest upgrade of the tried-and-tested chip maker",
    price: 500,
    rareness: 300,
    upgradeCost: 100,
    maxUpgrades: 100,
    pricePerItem: 30,
    makes: "chips",
  },
  roster: {
    type: "machines",
    fullName: "Rösti squasher",
    desc: "A fancy machine for making crispy rösti",
    price: 500,
    rareness: 400,
    upgradeCost: 100,
    maxUpgrades: 100,
    pricePerItem: 30,
    makes: "rosti",
  },
  croquetter: {
    type: "machines",
    fullName: "Croquette roller",
    desc: "Makes small golden balls of potato croquettes",
    price: 550,
    rareness: 400,
    upgradeCost: 100,
    maxUpgrades: 100,
    pricePerItem: 40,
    makes: "croquette",
  },
  land: {
    type: "land",
    fullName: "A field for sale",
    desc: "Next to your plot of land is another, you can expand your digging activities and maybe find rarer potatoes",
    price: 1000,
  },
  bone: {
    type: "items",
    name: "bone",
    fullName: "An old bone",
    desc: "I think a dog buried it",
    price: 5,
    rareness: 10,
  },
  gold: {
    type: "items",
    name: "gold",
    fullName: "A few gold coins",
    desc: "A small hoard of old gold coins maybe dating back to Anglo-Saxon times",
    price: 100,
    rareness: 150,
  },
  diamond: {
    type: "items",
    name: "diamond",
    fullName: "A small diamond",
    desc: "Maybe it fell out of someones wedding ring",
    price: 50,
    rareness: 150,
  },
  tin: {
    type: "items",
    name: "tin",
    fullName: "A rusty tin",
    desc: "Looks like it once stored baked beans",
    price: 1,
    rareness: 20,
  },
  pottery: {
    type: "items",
    name: "pottery",
    fullName: "A piece of pottery",
    desc: "Possibly from a broken terracotta flowerpot",
    price: 1,
    rareness: 20,
  },
  bottle: {
    type: "items",
    name: "bottle",
    fullName: "A glass bottle",
    desc: "it has mud inside and looks rather old and maybe medicinal",
    price: 10,
    rareness: 30,
  },
  marble: {
    type: "items",
    name: "marble",
    fullName: "A small marble",
    desc: "Wipe the dirt off and it has an almost magical glow",
    price: 20,
    rareness: 50,
  },
  caps: {
    type: "items",
    name: "caps",
    fullName: "A few bottle caps",
    desc: "They are rusty and bent, but you can make out some letters: Nuka..",
    price: 50,
    rareness: 50,
  },
  rock: {
    type: "blocker",
    name: "rock",
    fullName: "A rock",
    desc: "Found while cleared the field. Rocks are heavy, hard and doesn't taste nice",
    price: 1,
    rareness: 20,
  },
  log: {
    type: "blocker",
    name: "log",
    fullName: "A log",
    desc: "These logs are weathered and splintered, however neatly cut",
    price: 1,
    rareness: 20,
  },
};

