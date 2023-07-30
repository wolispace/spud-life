const rows = 14;
const cols = 10;

let player = {
  name: character.randomName(),
  hints: true,
  hinted: {},
  phase: "field",
  daytime: true,
  cols: cols,
  rows: rows,
  sack: {},
  wallet: 100,
  scanLevel: 1,
  scanState: true,
  pos: 0,
  spudRegen: -5,
  sowSeeds: 0,
  grassQty: 7,
  tools: {
  },
  buildings: [
    [
      { pos: 0, id: "house" },
      { pos: 3, id: "shop" },
      { pos: 6, id: "cart" },
    ],
  ],
  spuds: [],
  currentField: 0,
  fields: [[]],

  shop: {
    machines: {},
  },
  ctrlOffset: 30,
  controlPos: {
    ArrowUp: 0,
    ArrowLeft: cols,
    ArrowRight: cols + 1,
    ArrowDown: cols * 2,
  },
};

