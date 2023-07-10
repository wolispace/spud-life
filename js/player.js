let player = {
  phase: "field",
  maxPatches: 120,
  sack: {},
  wallet: 1000,
  scanner: 1,
  pos: 0,
  spudRegen: -5,
  sowSeeds: 0,
  grassQty: 7,
  scope: [-11, -10, -9, -1, 0, 1, 9, 10, 11],
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
    ArrowLeft: 10,
    ArrowRight: 11,
    ArrowDown: 20,
  },
  animating: false,
};
