let player = {
  name: 'Ashley',
  hints: true,
  hinted: {},
  x: 1,
  y: 1,
  daytime: true,
  day: 0,
  spuds: {},
  scanLevel: 1,
  scanState: true,
  sowSeeds: 0,
  tools: {
    spade: { qty: 8, max: 8 },
    axe: { qty: 0, max: 0 },
    pick: { qty: 0, max: 0 },
    basket: { qty: 0, list: {} },
    scanner: { qty: 4, on: true },
    wallet: { qty: 100 },
  },
  meals: {},
  currentField: 0,
  fields: [[[], [], []]],
  cart: {'chipper': 0},
};

