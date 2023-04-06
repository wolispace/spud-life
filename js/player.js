let player = {
  phase: "night",
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
  controls: { start: 60 },
  controlIds: [60, 70, 71, 80],
  controlPos: {
    "ArrowUp": 0,
    "ArrowLeft": 10,
    "ArrowRight": 11,
    "ArrowDown": 20
  },
  animating: false,
}