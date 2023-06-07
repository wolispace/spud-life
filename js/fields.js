const fields = {
  // one off setup the grid of patches
  setupGrid() {
    const maxPatches = 99;
    let index = 0;
    let patches = "";
    while (index <= maxPatches) {
      let patchClass = index < 10 ? "sky" : "patch";
      patches += `<div class="${patchClass}" id="patch_${index}">${svg.render(
        "blank",
        player.grassQty
      )}</div>`;
      index++;
    }
    element = document.querySelector(".field");
    element.innerHTML = patches;
  },

  // player chose to switch to this field..
  switchField: (fieldId) => {
    player.pos = player.currentField < fieldId ? 0 : 9;
    player.currentField = fieldId;
    // if field is empty then fill it
    fields.fillField(fieldId);
    // wipe grid
    fields.setupGrid();
    // render current field
    fields.renderField();
    svg.hidePlayerSprite();
    fields.highlightCurrentPos();
    svg.showPlayerSprite();
    tools.render();
    state.save();
  },

  buyField: () => {
    // find highest field ID, add 1, set that field as an empty array so it can be filled
    player.fields[player.fields.length] = [];
    let patch = {
      id: "patch_9",
      block: { type: "control-field--right", qty: 1 },
    };
    player.fields[player.currentField][9] = patch;
    fields.renderPatch(patch);
    state.save();
  },

  // randomly fill the selected field (if empty) with rocks, logs and spuds - plus some random treasure!
  fillField: (fieldId) => {
    if (player.fields[fieldId].length < 1) {
      // first row
      // if this field has building on it..
      if (player.buildings[fieldId]) {
        // fill top row with nothing
        let i = 0;
        do {
          i++;
          player.fields[fieldId][i] = { id: `patch_${i}` };
        } while (i < 10);

        player.buildings[fieldId].forEach((building, index) => {
          player.fields[fieldId][building.pos] = {
            id: `patch_${building.pos}`,
            building: building.id,
          };
        });
      }
      // first row 0 and 10 may contain links to other fields
      if (player.fields[fieldId - 1]) {
        player.fields[fieldId][0] = {
          id: "patch_0",
          block: { type: "control-field--left", qty: 1 },
        };
      }
      if (player.fields[fieldId + 1]) {
        player.fields[fieldId][9] = {
          id: "patch_9",
          block: { type: "control-field--right", qty: 1 },
        };
      }

      // skip the first row
      let i = 10;
      while (i < 100) {
        if (rnd(2) > 0) {
          // rock, log or spud?
          let patch = {};
          switch (rnd(3)) {
            case 0:
              patch.block = { type: "rock", qty: rnd(5) + 1 };
              break;
            case 1:
              patch.block = { type: "log", qty: rnd(5) + 1 };
              break;
            case 2:
              patch.spud = {};
              break;
          }
          if (patch !== {}) {
            let newSpud = player.spuds[rnd(player.spuds.length)];
            patch.spud = { name: newSpud.name, qty: rnd(3) + 1 };
          }
          if (!player.fields[fieldId]) {
            player.fields[fieldId] = [];
          }
          player.fields[fieldId][i] = patch;
        }
        i++;
      }
      // put controls in
      let id = player.controls.start;
      player.fields[fieldId][id] = {
        id: `patch_${id}`,
        block: {
          type: "control-icon--up",
          qty: 1,
          onclick: `controls.click(${id})`,
        },
      };
      id += 10;
      player.fields[fieldId][id] = {
        id: `patch_${id}`,
        block: {
          type: "control-icon--left",
          qty: 1,
          onclick: `controls.click(${id})`,
        },
      };
      id += 1;
      player.fields[fieldId][id] = {
        id: `patch_${id}`,
        block: {
          type: "control-icon--right",
          qty: 1,
          onclick: `controls.click(${id})`,
        },
      };
      id += 9;
      player.fields[fieldId][id] = {
        id: `patch_${id}`,
        block: {
          type: "control-icon--down",
          qty: 1,
          onclick: `controls.click(${id})`,
        },
      };
    }
  },

  // loop through all fields and increment the holes and sow seeds if needed
  rollPatches: () => {
    player.fields.forEach((field, fieldId) => {
      if (field != []) {
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
              player.sowSeeds++;
            }
          }
        });
      }
    });
  },

  // add an svg to each patch
  renderField: () => {
    player.fields[player.currentField].forEach((patch, index) => {
      patch = patch ?? {};
      patch.id = `patch_${index}`;
      fields.renderPatch(patch, index);
    });
    fields.renderGrassLine();
  },

  renderGrassLine: () => {
    // move player spite
    let patch = getElementPos(`#patch_10`);
    let width = patch.width * 12;
    let height = patch.height / 3;

    let grassElement = document.querySelector(`#grassLine`);
    let grassBox = grassElement.getBoundingClientRect();
    let grassLineTop = patch.top - grassBox.height * 0.8;
    grassElement.style.top = `${grassLineTop}px`;

    // align the path the customer parade along
    let customerElement = document.querySelector(`#customerLine`);
    let customerBox = customerElement.getBoundingClientRect();
    let customerLineTop = patch.top - customerBox.height * 1.2;
    customerElement.style.top = `${customerLineTop}px`;
    // element.style.top = `${newY - 20}px`; //parseInt(posY) - 10;
    // element.style.left = `${patch.left}px`;
    // element.style.width = `${width}px`;
    customerElement.style.height = `${height}px`;

    // let cartPosX = patch.left - patch.width / 2;
    // element.style.left = `${cartPosX}px`;
    // let cartWidth = patch.width * 7;
    // element.style.width = `${cartWidth}px`;
  },

  // based on patch contents decide what to show
  renderPatch: (patch, index) => {
    let newPatch = " ";
    if (patch) {
      if (patch.block) {
        if (patch.block.type.indexOf("control") > -1) {
          newPatch = svg.render(patch.block.type, patch.block.qty);
          element = document.querySelector(`#${patch.id}`);
          element.innerHTML = svg.render(patch.block.type);
          if (patch.block.type.indexOf("icon") > -1) {
            element.classList.add("controlButton");
            element.classList.remove("patch");
            element.setAttribute("onclick", `controls.click('${patch.id}');`);
          }
        } else {
          newPatch = svg.render(patch.block.type, patch.block.qty);
        }
      }

      if (patch.spud) {
        if (patch.spud.qty > 0) {
          newPatch += ""; // `<br/>S=${patch.spud.qty}`
        } else {
          if (patch.spud.qty == -5 && patch.spud.name && patch.spudFound) {
            newPatch = spuds.render(patch.spud.name);
          } else {
            newPatch = svg.render("hole", 5);
          }
        }
      }
      if (patch.building) {
        newPatch = svg.render(patch.building, 1);
      }
    }
    // add the grass if below top row
    if (newPatch == " " && index > 9) {
      newPatch = svg.render("blank", player.grassQty);
    }
    if (newPatch) {
      let element = document.querySelector(`#${patch.id}`);
      element.innerHTML = newPatch;
      if (patch.spudFound) {
        delete patch.spudFound;
        let thisSpud = document.querySelector(`#${patch.id} svg`);

        function onEnd() {
          newPatch = svg.render("hole", 5);
          element.innerHTML = newPatch;
        }
        svg.animate(thisSpud, "dig-spud", 1, onEnd);
      }

      // if we drew a hole, make sure its opacity matches the spud qty -5 = 100%, 0 = 0%
      if (patch.spud && patch.spud.qty < 0) {
        let opacity = 0 - (patch.spud.qty * 20) / 100;
        let hole = document.querySelector(`#${patch.id} svg`);
        hole.style.opacity = opacity;
      }
    }
  },

  // randomly (ish) scatter more seeds and some get blocks on top
  resowField: () => {
    let sowMsg = "";
    if (player.sowSeeds > 0) {
      sowMsg =
        "<div>You find some seed potatoes at the bottom of your sack and scatter them randomly in the field</div>";
      let blankPatches = [];
      let i = 10;
      while (i < 100) {
        if (!player.fields[player.currentField][i]) {
          // sow seed and set i to 99
          blankPatches.push(i);
        }
        i++;
      }
      // add a few more seeds..
      player.sowSeeds += 5;
      // sow each seeds, some get blocks on top
      while (player.sowSeeds > 0) {
        player.sowSeeds--;
        let index = blankPatches[rnd(blankPatches.length)];
        let patch = {};
        switch (rnd(3)) {
          case 0:
            patch.block = { type: "rock", qty: rnd(5) + 1 };
            break;
          case 1:
            patch.block = { type: "log", qty: rnd(5) + 1 };
            break;
        }
        let newSpud = player.spuds[rnd(player.spuds.length)];
        patch.spud = { name: newSpud.name, qty: rnd(3) + 1 };
        player.fields[player.currentField][index] = patch;
      }
    }

    return sowMsg;
  },
  // dig for a spud in the current patch
  digPatch: () => {
    let patch = player.fields[player.currentField][player.pos];
    let tool = player.tools["spade"];
    let thisTool = document.querySelector(`.tool-spade svg`);
    svg.animate(thisTool, `jiggle-up`, 0.25);

    if (tool.uses > 0) {
      // if nothing defined for a patch then its an empty spud
      if (!patch || !patch.spud) {
        patch = { spud: { qty: 0 } };
      }
      patch.id = `patch_${player.pos}`;

      if (patch.spud.qty > 0) {
        // all spuds dug at once and moved to player sack
        let sackQty = player.sack[patch.spud.name] || 0;
        player.sack[patch.spud.name] = sackQty + patch.spud.qty;
        // sput qty in negative meaning it takes this many days to return to a fresh patch
        patch.spud.qty = player.spudRegen;
        patch.spudFound = true;
        tool.uses--;
      } else if (patch.spud.qty == 0) {
        patch.spud.qty = player.spudRegen;
        tool.uses--;
        player.fields[player.currentField][player.pos] = patch;
      } else {
        // leave holes alone
        return;
      }
      tools.render();

      if (patch) {
        fields.renderPatch(patch);
      }
    }
    state.save();
  },

  highlightCurrentPos: () => {
    let element = document.querySelector(`#patch_${player.pos}`);
    //element.classList.add("currentPos");

    if (fields.inRange()) {
      //element.classList.add("inRange");
    } else {
      //element.classList.remove("inRange");
    }

    // move player spite
    let patch = element.getBoundingClientRect();
    let posY = patch.top + "px";
    let posX = patch.left + "px";
    let height = patch.height + "px";
    let width = patch.width + "px";

    element = document.querySelector(`#playerSprite`);
    if (element.innerHTML == "") {
      element.innerHTML = svg.renderPerson(player.body); //svg.render("eye", 1, "person", { paths: svgPaths });
    }
    element.style.top = posY;
    element.style.left = posX;
    element.style.width = width;
    element.style.height = height;
    element.style.transition = "0.15s ease-in-out";
  },

  removeCurrentPosHighlight: () => {
    element = document.querySelector(`#patch_${player.pos}`);
    element.classList.remove("currentPos");
    element.classList.remove("inRange");
  },
  // player starts back at the entrace of the field
  // TODO: do we reset them to their first field or leave on last (an upgrade perhaps?)
  resetPlayer: () => {
    fields.removeCurrentPosHighlight();
    player.pos = 0;
    fields.highlightCurrentPos();
  },

  // update the dvg in a patch to have the same number of visible paths as the patches qty
  updatePatch: (patch) => {
    if (patch) {
      if (patch.block) {
        let existing = document.querySelectorAll(`#${patch.id} svg g`);
        if (existing) {
          let doneOne = false;
          let index = existing.length - 1;
          while (index >= 0) {
            let group = existing[index];
            if (!doneOne && !group.classList.contains("hidden")) {
              group.classList.add("hidden");
              doneOne = true;
            }
            index--;
          }
        }
      }
    }
  },

  // returns true if there is a spud in range of the current pos
  // upgrades to the scanner will reduce the range (kings moves, plus, straight vg.line, dot)
  inRange: () => {
    let field = player.fields[player.currentField];
    let inRange = false;
    player.scope.forEach((patchId) => {
      if (!inRange && fields.checkForSpuds(field, player.pos + patchId)) {
        inRange = true;
      }
    });

    return inRange;
  },

  checkForSpuds: (field, patchId) => {
    if (field[patchId] && field[patchId].spud && field[patchId].spud.qty > 0) {
      return true;
    }
  },
};
