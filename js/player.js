const rows = 12;
const cols = 10;

let player = {
  hints: true,
  phase: "field",
  daytime: true,
  cols: cols,
  rows: rows,
  sack: {},
  wallet: 0,
  scanLevel: 1,
  scanState: true,
  pos: 0,
  spudRegen: -5,
  sowSeeds: 0,
  grassQty: 7,
  scope: [-cols-1, -cols, -cols+1, -1, 0, 1, cols-1, cols, cols+1],
  dialog: false,
  tools: {
    spade: {
      uses: 0,
      maxUses: 5,
    },
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
  controlPos: {
    ArrowUp: 0,
    ArrowLeft: cols,
    ArrowRight: cols+1,
    ArrowDown: cols*2,
  },
  animating: false,
};
