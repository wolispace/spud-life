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
  basket: {},
  wallet: 100,
  scanLevel: 1,
  scanState: true,
  spudRegen: -5,
  sowSeeds: 0,
  grassQty: 7,
  tools: {
    spade: 8,
  },
  currentField: 0,
  fields: [[[], [], []]],
  shop: {
    machines: {},
  },
};

