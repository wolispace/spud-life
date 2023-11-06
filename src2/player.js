const rows = 14;
const cols = 10;

let player = {
  name: 'Ashley',
  hints: true,
  hinted: {},
  x: 1,
  y: 1,
  daytime: true,
  day: 0,
  cols: cols,
  rows: rows,
  spuds: {},
  scanLevel: 1,
  scanState: true,
  spudRegen: -5,
  sowSeeds: 0,
  grassQty: 7,
  tools: {
    spade: { qty: 8, max: 8 },
    axe: { qty: 0, max: 0 },
    pick: { qty: 0, max: 0 },
    basket: { qty: 0, list: {} },
    scanner: { qty: 4, on: true },
    wallet: { qty: 5000 },
  },
  currentField: 0,
  fields: [[[], [], []]],
  cart: {'chipper': 0},
};

