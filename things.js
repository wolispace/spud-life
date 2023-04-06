function initApp() {
  return {
    state: {
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
      hardware: hardwareStore(),
      controls: { start: 60 },
      controlIds: [60, 70, 71, 80],
      controlPos: {
        "ArrowUp": 0,
        "ArrowLeft": 10,
        "ArrowRight": 11,
        "ArrowDown": 20
      },
      animating: false,
    },
    save: () => {
      let compressed = LZString.compressToUTF16(JSON.stringify(app.state));
      localStorage.setItem("state", compressed);
    },
    load: () => {
      let compressed = localStorage.getItem("state");
      if (compressed) {
        let decompressed = LZString.decompressFromUTF16(compressed);
        return JSON.parse(decompressed);
      }
    },

  };

}

// all the svg images
const svgImags = {
  "blank": {
    "class": "grass",
    "paths": [{ "c": "", "d": "m 50,50 -3,-5 m 8,6 0,-8 m 5,8 2,5" }],
    "shift": { "x": 70, "y": 70 },
    "rotate": 10,
  },
  "control-icon--up": {
    "class": "thick control-icon",
    "paths": [{ "c": "", "d": "m 20,80 30,-60 30,60" }]
  },
  "control-icon--right": {
    "class": "thick control-icon",
    "paths": [{ "c": "", "d": "m 20,20 60,30 -60,30" }]
  },
  "control-icon--down": {
    "class": "thick control-icon",
    "paths": [{ "c": "", "d": "m 20,20 30,60 30,-60" }]
  },
  "control-icon--left": {
    "class": "thick control-icon",
    "paths": [{ "c": "", "d": "m 80,20 -60,30 60,30" }]
  },
  "hole": {
    "class": "thick",
    "paths": [{ "c": "", "d": "m 30,50 5,-10 6,-18 13,-2 9,8 5,2 12,10 -8,12 -2,15 -11,8 -3,-5 -7,2 z" }],
    "shift": { "x": 10, "y": 10 },
    "scale": { "x": 100, "y": 2 },
    "rotate": 360,
  },
  "rock": {
    "class": "thick",
    "paths": [
      { "c": "", "d": "m 30,55 10,-10 15,0 5,3 10,15 0,10 -15,4 -6,0 -13,-9 z" },
      { "c": "lo", "d": "m 30,55 10,-10 15,0 5,3 10,15 0,10 -15,4 -6,0 -13,-9 z" },
      { "c": "hi", "d": "m 34,55 6,-6 11,0 7,8 4,11 -10,3 -5,-2 z" },
    ],
    "shift": { "x": 20, "y": 20 },
    "scale": { "x": 100, "y": 2 },
    "rotate": 360,
  },
  "log": {
    "class": "thick",
    "paths": [
      { "c": "", "d": "m 30,35 -5,5 0,12 5,5 45,0 5,-5 0,-12 -5,-5 z" },
      { "c": "lo", "d": "m 40,55 30,0 z" },
      { "c": "hi", "d": "m 31,38 -3,3 0,10 3,3 3,-3 0,-10 z" },
    ],
    "shift": { "x": 30, "y": 30 },
    "scale": { "x": 100, "y": 4 },
    "rotate": 90,
  },
  "spud": {
    "class": "thick",
    "paths": [
      { "c": "", "d": "m 20,65 t -5,-10 5,-20 22,-14 25,4, 15,20 -1,20 -20,12 -40,-11 z" },
      // { "c": "lo", "d": "m 30,70 t 22,5 30,-25 " },
      { "c": "hi thin", "d": "m 50,30 1,1 m 10,-5 1,1 m 6,11 1,1 " },

    ],
    "shXift": { "x": 30, "y": 30 },
    "scaXle": { "x": 100, "y": 2 },
    "rotXate": 360,
  },

}


function hardwareStore() {
  return {
    "spade": {
      type: "tool",
      name: "Spade",
      desc: "A useful tool for diging up spods",
      price: 0,
      upgradeCost: 50,
      maxUpgrades: 100,
      initial: {
        uses: 0,
        maxUses: 5,
      }
    },
    "pick": {
      type: "tool",
      name: "Pick",
      desc: "A tool for breaking rocks",
      price: 100,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        uses: 0,
        maxUses: 5,
      }
    },
    "axe": {
      type: "tool",
      name: "Axe",
      desc: "A tool for clearing logs",
      price: 150,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        uses: 0,
        maxUses: 5,
      }
    },
    "chipper": {
      type: "machine",
      name: "Basic Chipper",
      desc: "A basic all-purpose chip-maker",
      price: 150,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 5,
        makes: "chips",
        hopper: {}
      }
    },
    "chipper-2000": {
      type: "machine",
      name: "Chipper 2000",
      desc: "The latest upgrade of the tried-and-tested chip maker",
      price: 500,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 20,
        makes: "chips",
        hopper: {}
      }
    },
    "back-o-matic": {
      type: "machine",
      name: "Bake-o-matic",
      desc: "Makes an excellent baked potato",
      price: 250,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 15,
        makes: "baked potatoes",
        hopper: {}
      }
    },
    "curly-cooker": {
      type: "machine",
      name: "Curly cooker",
      desc: "Cooks a potato into a curly-fry",
      price: 400,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 20,
        makes: "curly-fries",
        hopper: {}
      }
    },
    "soup-spinner": {
      type: "machine",
      name: "Soup spinner",
      desc: "Makes a hearly potato soup",
      price: 200,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 10,
        makes: "soup",
        hopper: {}
      }
    },

  }
}

function initControls() {
  return {
    // allocate 4 patches to be movement buttons - they cant be dug
    render: () => {
      let id = app.state.controls.start;
      controls.renderControl(id, 'up');
      id += 10;
      controls.renderControl(id, 'left');
      id += 1;
      controls.renderControl(id, 'right');
      id += 9;
      controls.renderControl(id, 'down');
    },

    // draw navigation buttons
    renderControl: (id, dir) => {
      element = document.querySelector(`#patch_${id}`);
      element.innerHTML = svgImg(`control-icon--${dir}`);
      element.classList.add("controlButton");
      element.classList.remove('patch');
      element.setAttribute("onclick", `controlClick(${id});`);
      app.state.fields[app.state.currentField][id] = { block: { type: "control" } };
    }

  }

}

function initTools() {
  return {
    // draw the tools across the bottom
    render: () => {
      let tools = '';
      let dummyImg = svgImg(`control-icon--up`);
      Object.entries(app.state.tools).forEach(([toolName, tool]) => {
        tools += `<div  class="tool-${toolName}" onclick="fields.digPatch()">${toolName}=${tool.uses} ${dummyImg}</div>`;
      });
      tools += `<div class="tool-purse" onclick="showSack()">Purse=${app.state.purse}`;
      tools += `<br/>Sack=${countSack()}</div>`;
      tools += `<div class="tool-next" onclick="dayCycle()">Next &gt;</div>`;
      element = document.querySelector('.tools');
      element.innerHTML = tools;
    },
    // TODO: not used!?! returns the players tool
    selectTool: (patch) => {
      let tool = 'spade';
      if (patch.block) {
        if (patch.block.type == 'rock') {
          tool = 'pick';
        } else {
          tool = 'axe';
        }
      }
      return app.state.tools[tool];
    },
    // buy a tool or an upgrade to a tool or machine
    buyTool: (toolName) => {
      let tool = app.state.hardware[toolName];
      if (tool.type == 'tool') {
        if (app.state.tools[toolName]) {
          // upgrade
          app.state.tools[toolName].maxUses++;
          app.state.tools[toolName].uses++;
          app.state.purse = app.state.purse - app.state.hardware[toolName].upgradeCost;
        } else {
          // buy
          app.state.tools[toolName] = app.state.hardware[toolName].initial;
          app.state.purse = app.state.purse - app.state.hardware[toolName].price;
        }
      } else {
        // buy machine
        app.state.shop.machines[toolName] = app.state.hardware[toolName].initial;
        app.state.purse = app.state.purse - app.state.hardware[toolName].price;
      }
      tools.render();
      renderHardware();
    },
  };
}

function initFields() {
  return {
    // one off setup the grid of patches
    render() {
      const maxPatches = 99;
      let index = 0;
      let patches = '';
      while (index <= maxPatches) {
        patches += `<div class="patch" id="patch_${index}">${svgImg('blank', app.state.grassQty)}</div>`;
        index++;
      }
      element = document.querySelector('.field');
      element.innerHTML = patches;
    },

    // randomly fill the current field with rocks, logs and spuds - plus some ranom treasure!
    fillField: (fieldId) => {
      if (!app.state.fields[fieldId]) {
        app.state.fields[fieldId] = [];
      }

      // first row 0 and 10 may contain links to other fields
      if (app.state.fields[fieldId - 1]) {
        app.state.fields[fieldId][0] = { id: "patch_0", block: { type: "control-icon--left", qty: 1, onclick: `switchField(${fieldId - 1})` } };
      }
      if (app.state.fields[fieldId + 1]) {
        app.state.fields[fieldId][9] = { id: "patch_9", block: { type: "control-icon--right", qty: 1, onclick: `switchField(${fieldId + 1})` } };
      }
      // skip the fisrt row
      let i = 10;
      while (i < 100) {
        if (rnd(2) > 0) {
          // rock, log or spud?
          let patch = {};
          switch (rnd(3)) {
            case 0:
              patch.block = { "type": "rock", "qty": rnd(5) + 1 };
              break;
            case 1:
              patch.block = { "type": "log", "qty": rnd(5) + 1 };
              break;
            case 2:
              patch.spud = {};
              break;
          }
          if (patch !== {}) {
            let newSpud = app.state.spuds[rnd(app.state.spuds.length)];
            patch.spud = { "name": newSpud.name, "qty": rnd(3) + 1 };
          }
          if (!app.state.fields[fieldId]) {
            app.state.fields[fieldId] = [];
          }
          app.state.fields[fieldId][i] = patch;
        }
        i++;
      };
    }
    ,
    // loop through all fields and increment the holes and sow seeds if needed
    rollPatches: () => {
      app.state.fields.forEach((field, fieldId) => {
        field.forEach((patch, index) => {
          patch = patch ?? {};
          patch.id = `patch_${index}`;
          // roll the spuds so holes slowly get fill and can be re-seeded
          if (patch.spud) {
            if (patch.spud.qty < 0) {
              patch.spud.qty++;
            }
            if (patch.spud.qty == 0) {
              delete patch.spud;
              app.state.sowSeeds++;
            }
          }
        });
      });
    },
    // add an svg to each patch
    renderPatches: () => {
      app.state.fields[app.state.currentField].forEach((patch, index) => {
        patch = patch ?? {};
        patch.id = `patch_${index}`;
        if (patch.block && patch.block.type == 'control') {
          // leave alone
          fields.renderPatch(patch);
        } else {
          fields.renderPatch(patch);
        }
      });
    },

    // based on patch contents decide what to show
    renderPatch: (patch) => {
      let newPatch = ' ';
      if (patch) {
        if (patch.block) {
          if (patch.block.type == 'control') {
            //newPatch = svgImg(patch.block.type, patch.block.qty);
          } else {
            newPatch = svgImg(patch.block.type, patch.block.qty);
          }
        }

        if (patch.spud) {
          if (patch.spud.qty > 0) {
            newPatch += ''; // `<br/>S=${patch.spud.qty}` 
          } else {
            if (patch.spud.qty == -5 && patch.spud.name) {
              newPatch = svgImg('spud');
              patch.spudFound = true;
            } else {
              newPatch = svgImg('hole', 5);
            }
          }
        }
      }
      if (newPatch == ' ') {
        newPatch = svgImg('blank', app.state.grassQty);
      }
      if (newPatch) {
        let element = document.querySelector(`#${patch.id}`);
        element.innerHTML = newPatch;

        if (patch.spudFound) {
          delete patch.spudFound;
          let thisSpud = document.querySelector(`#${patch.id} svg`);

          function onEnd() {
            newPatch = svgImg('hole', 5);
            element.innerHTML = newPatch;
          }
          animate(thisSpud, 'dig-spud', 1, onEnd);
        }

        // if we drew a hole, make sure its opacity matches the spud qty -5 = 100%, 0 = 0%
        if (patch.spud && patch.spud.qty < 0) {
          let opacity = 0 - patch.spud.qty * 20 / 100;
          let hole = document.querySelector(`#${patch.id} svg`);
          hole.style.opacity = opacity;
        }
      }
    },

    // randomly (ish) scatter more seeds and some get blocks on top
    resowField: () => {
      let sowMsg = '';
      if (app.state.sowSeeds > 0) {
        sowMsg = '<div>You find some seed potaoes at the bottom of your sack and scatter them randomly in the field</div>';
        let blankPatches = [];
        let i = 10;
        while (i < 100) {
          if (!app.state.fields[app.state.currentField][i]) {
            // sow seed and set i to 99
            blankPatches.push(i);
          }
          i++;
        }
        // add a few more seeds..
        app.state.sowSeeds += 5;
        // sow each seeds, some get blocks on top
        while (app.state.sowSeeds > 0) {
          app.state.sowSeeds--;
          let index = blankPatches[rnd(blankPatches.length)];
          let patch = {};
          switch (rnd(3)) {
            case 0:
              patch.block = { "type": "rock", "qty": rnd(5) + 1 };
              break;
            case 1:
              patch.block = { "type": "log", "qty": rnd(5) + 1 };
              break;
          }
          let newSpud = app.state.spuds[rnd(app.state.spuds.length)];
          patch.spud = { "name": newSpud.name, "qty": rnd(3) + 1 };
          app.state.fields[app.state.currentField][index] = patch;
        };
      }

      return sowMsg;
    },
    // dig for a pus in the current patch
    digPatch: () => {
      let patch = app.state.fields[app.state.currentField][app.state.pos];
      let tool = app.state.tools['spade'];
      let thisTool = document.querySelector(`.tool-spade svg`);
      animate(thisTool, `jiggle-up`, 0.25);

      if (tool.uses > 0) {
        // if nothing defined for a patch then its an empty spud
        if (!patch || !patch.spud) {
          patch = { spud: { qty: 0 } };
        }
        patch.id = `patch_${app.state.pos}`;

        if (patch.spud.qty > 0) {
          // all spuds dug at once and moved to player sack
          let sackQty = app.state.sack[patch.spud.name] || 0;
          app.state.sack[patch.spud.name] = sackQty + patch.spud.qty;
          // sput qty in negative meaning it takes this many days to return to a fresh patch
          patch.spud.qty = app.state.spudRegen;
          tool.uses--;
        } else if (patch.spud.qty == 0) {
          patch.spud.qty = app.state.spudRegen;
          tool.uses--;
          app.state.fields[app.state.currentField][app.state.pos] = patch;
        } else {
          // leave holes alone
          return;
        }
        tools.render();

        if (patch) {
          fields.renderPatch(patch);
        }
      }
    },




  }
}
