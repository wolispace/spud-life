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
  scanLevel: 1,
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

  // make a random body
  randomBody: function() {
    //let name = spudBits.prefix[rnd(spudBits.prefix.length)];
    let newBody = {};
    let skinTones = ["Cornsilk", "Bisque", "Wheat", "Tan", "SaddleBrown"];

    let colourNames = Object.keys(CSS_COLOR_NAMES);
    let skinTone = skinTones[rnd(skinTones.length)];

    Object.keys(bodySet).forEach((bodyPart) => {
      let variations = bodySet[bodyPart];
      let variation = variations[rnd(variations.length)];
      let colour = colourNames[rnd(colourNames.length)];
      if (",head,nose".indexOf(bodyPart) > 0) {
        colour = skinTone;
      }
      newBody[bodyPart] = {
        type: variation,
        colour: colour,
      };
    });

    return newBody;
  },

  // the default
 defaultBody: {
    body: {
      type: "body-big",
      colour: "Navy",
    },

    head: {
      type: "head-head",
      colour: "Wheat",
    },
    nose: {
      type: "nose-triangle",
      colour: "Wheat",
    },
    brows: {
      type: "brows-wave",
      colour: "Black",
    },
    eye: {
      type: "eye-eye",
      colour: "DodgerBlue",
    },
    facial: {
      type: "facial-mustache",
      colour: "Brown",
    },
    hair: {
      type: "hair-curly",
      colour: "Brown",
    },
  },
}

