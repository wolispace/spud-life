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
    spade: { qty: 20, max: 20 },
    axe: { qty: 20, max: 20 },
    pick: { qty: 20, max: 20 },
    basket: { qty: 0, list: {} },
    scanner: { qty: 1, on: true },
    wallet: { qty: 1000 },
  },
  currentField: 0,
  fields: [[[], [], []]],
  cart: {'chipper': {}},
};

