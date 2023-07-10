const rows = 13;
const cols = 10;

let player = {
  phase: "field",
  maxPatches: cols * rows,
  cols: cols,
  rows: rows,
  sack: {},
  wallet: 1000,
  scanner: 1,
  pos: 0,
  spudRegen: -5,
  sowSeeds: 0,
  grassQty: 7,
  scope: [-cols-1, -cols, -cols+1, -1, 0, 1, cols-1, cols, cols+1],
  dialog: false,
  tools: {
    spade: {
      uses: 0,
      maxUses: 55,
    },
    pick: {
      uses: 0,
      maxUses: 55,
    },
    axe: {
      uses: 0,
      maxUses: 55,
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
