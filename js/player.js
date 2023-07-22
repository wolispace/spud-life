const rows = 12;
const cols = 10;

let player = {
  hints: true,
  hinted: {},
  phase: "field",
  daytime: true,
  cols: cols,
  rows: rows,
  sack: {},
  wallet: 999999,
  scanLevel: 2,
  scanState: true,
  pos: 0,
  spudRegen: -5,
  sowSeeds: 0,
  grassQty: 7,
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

const character = {
  render: function () {
    svg.showElement("#playerSprite");
  },
  hide: function () {
    svg.hideElement("#playerSprite");
  },

  look: function (direction) {
    let playerSprite = document.querySelector("#playerSprite > svg");
    let playerHead = document.querySelector("#playerSprite .playerHead");
    if (direction == "left") {
      playerHead.setAttribute("transform", "rotate(0, 51, 21.2)");
      playerSprite.setAttribute("transform", "translate(0, 0) scale(1, 1)");
    } else if (direction == "right") {
      playerHead.setAttribute("transform", "rotate(0, 51, 21.2)");
      playerSprite.setAttribute("transform", "translate(0, 0) scale(-1, 1)");
    } else if (direction == "up") {
      playerHead.setAttribute("transform", "rotate(45, 51, 21.2)");
    } else if (direction == "down") {
      playerHead.setAttribute("transform", "rotate(-30, 51, 21.2)");
    }
  },
}

