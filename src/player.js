const rows = 14;
const cols = 10;

let player = {
  name: character.randomName(),
  hints: true,
  hinted: {},
  x: 1,
  y: 1,
  daytime: true,
  days: 0,
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
  },
  currentField: 0,
  fields: [[[], [], []]],
  uid: 1,
  shop: {
    machines: {},
  },
};

