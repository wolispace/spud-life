let player = {
  phase: "field",
  sack: {},
  purse: 1000,
  pos: 0,
  spudRegen: -5,
  sowSeeds: 0,
  grassQty: 7,
  dialog: false,
  tools: {
    spade: {
      uses: 0,
      maxUses: 5,
    },
    "pick": {
      "uses": 0,
      "maxUses": 5
    },
    "axe": {
      "uses": 0,
      "maxUses": 5
    }
  },

  spuds: [],
  currentField: 0,
  fields: [],

  shop: {
    machines: {}
  },
  hardware: hardwareStore(),
  controls: { start: 60 },
  controlIds: [60, 70, 71, 80],
  controlPos: {
    "ArrowUp": 0,
    "ArrowLeft": 10,
    "ArrowRight": 11,
    "ArrowDown": 20
  },
  animating: false,
};

// all the svg images
const svgImags = {
  "blank": {
    "class": "grass",
    "paths": [{ "c": "", "d": "m 50,50 -3,-5 m 8,6 0,-8 m 5,8 2,5" }],
    "shift": { "x": 70, "y": 70 },
    "rotate": 10,
  },
  "control-icon--up": {
    "class": "thick control-icon",
    "paths": [{ "c": "", "d": "m 20,80 30,-60 30,60" }]
  },
  "control-icon--right": {
    "class": "thick control-icon",
    "paths": [{ "c": "", "d": "m 20,20 60,30 -60,30" }]
  },
  "control-icon--down": {
    "class": "thick control-icon",
    "paths": [{ "c": "", "d": "m 20,20 30,60 30,-60" }]
  },
  "control-icon--left": {
    "class": "thick control-icon",
    "paths": [{ "c": "", "d": "m 80,20 -60,30 60,30" }]
  },
  "hole": {
    "class": "thick",
    "paths": [{ "c": "", "d": "m 30,50 5,-10 6,-18 13,-2 9,8 5,2 12,10 -8,12 -2,15 -11,8 -3,-5 -7,2 z" }],
    "shift": { "x": 10, "y": 10 },
    "scale": { "x": 100, "y": 2 },
    "rotate": 360,
  },
  "rock": {
    "class": "thick",
    "paths": [
      { "c": "", "d": "m 30,55 10,-10 15,0 5,3 10,15 0,10 -15,4 -6,0 -13,-9 z" },
      { "c": "lo", "d": "m 30,55 10,-10 15,0 5,3 10,15 0,10 -15,4 -6,0 -13,-9 z" },
      { "c": "hi", "d": "m 34,55 6,-6 11,0 7,8 4,11 -10,3 -5,-2 z" },
    ],
    "shift": { "x": 20, "y": 20 },
    "scale": { "x": 100, "y": 2 },
    "rotate": 360,
  },
  "log": {
    "class": "thick",
    "paths": [
      { "c": "", "d": "m 30,35 -5,5 0,12 5,5 45,0 5,-5 0,-12 -5,-5 z" },
      { "c": "lo", "d": "m 40,55 30,0 z" },
      { "c": "hi", "d": "m 31,38 -3,3 0,10 3,3 3,-3 0,-10 z" },
    ],
    "shift": { "x": 30, "y": 30 },
    "scale": { "x": 100, "y": 4 },
    "rotate": 90,
  },
  "spud": {
    "class": "thick",
    "paths": [
      { "c": "", "d": "m 20,65 t -5,-10 5,-20 22,-14 25,4, 15,20 -1,20 -20,12 -40,-11 z" },
      { "c": "lo", "d": "m 30,70 t 22,5 30,-25 " },
      { "c": "hi thin", "d": "m 50,30 1,1 m 10,-5 1,1 m 6,11 1,1 " },

    ],
    "shXift": { "x": 30, "y": 30 },
    "scaXle": { "x": 100, "y": 2 },
    "rotXate": 360,
  },

}


function hardwareStore() {
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
      name: "Basic Chipper",
      desc: "A basic all-purpose chip-maker",
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


