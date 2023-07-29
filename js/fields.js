const fields = {
  digKey: ['Space'],
  // one off setup the grid of patches
  setupGrid() {
    let index = 0;
    let patches = "";
    while (index < (player.cols * player.rows)) {
      let patchClass = index < player.cols ? "sky" : "patch";
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
    character.hide();
    fields.highlightCurrentPos();
    character.render();
    tools.render();
    state.save();
  },

  buyField: () => {
    // find highest field ID, add 1, set that field as an empty array so it can be filled
    player.fields[player.fields.length] = [];
    // add the sign
    let patch = {
      id: "patch_9",
      block: { type: "control-field--right", qty: 1 },
    };
    player.fields[player.currentField][9] = patch;
    fields.renderPatch(patch);
  },

  // randomly fill the selected field (if empty) with rocks, logs and spuds - plus some random treasure!
  fillField: (fieldId) => {
    if (player.fields[fieldId].length < 1) {
      let items = hardware.items;
      // first row
      let i = 0;
      do {
        i++;
        player.fields[fieldId][i] = { id: `patch_${i}` };
      } while (i < player.cols);
      // if this field has building on it..
      if (player.buildings[fieldId]) {
        // fill top row with nothing

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
      i = player.cols;
      while (i < (player.cols * player.rows)) {
        let patch = {};
        if (rnd(2) > 0) {
          // rock, log or spud?
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
            let newSpud = spuds.byRareness(player.currentField + 1);
            patch.spud = { name: newSpud.name, qty: rnd(3) + 1 };
          }
        }

        // if no spud then randomly add another item..
        if (!patch.spud) {
          Object.entries(items).forEach(([itemName, item]) => {
            if (!patch.item)  {
              if (rnd(item.rareness) == 0) {
                patch.item = itemName;
              }
            }
          });
        }
        if (!player.fields[fieldId]) {
          player.fields[fieldId] = [];
        }
        player.fields[fieldId][i] = patch;

        i++;
      }
      // put controls in
      //120 - 10 * 3
      let id = controls.ArrowUp;
      player.fields[fieldId][id] = {
        id: `patch_${id}`,
        block: {
          type: "control-icon--up",
          qty: 1,
          onclick: `controls.click(${id})`,
        },
      };
      id = controls.ArrowLeft;
      player.fields[fieldId][id] = {
        id: `patch_${id}`,
        block: {
          type: "control-icon--left",
          qty: 1,
          onclick: `controls.click(${id})`,
        },
      };
      id = controls.ArrowRight;
      player.fields[fieldId][id] = {
        id: `patch_${id}`,
        block: {
          type: "control-icon--right",
          qty: 1,
          onclick: `controls.click(${id})`,
        },
      };
      id = controls.ArrowDown;
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
    let patch = getElementPos(`#patch_${player.cols}`);
    
    let grassElement = document.querySelector(`#grassLine`);
    let grassBox = grassElement.getBoundingClientRect();
    let grassLineTop = patch.top - (grassBox.height * 0.5);
    let grassLineWidth =  patch.width * player.cols;
    grassElement.style.top = `${grassLineTop}px`;
    grassElement.style.width = `${grassLineWidth}px`;
    
    // align the path the customer parade along
    let customerElement = document.querySelector(`#customerLine`);
    let customerBox = customerElement.getBoundingClientRect();
    let customerLineTop = patch.top - (customerBox.height * 1.3);
    let customerLineHeight = patch.height / 3;
    customerElement.style.top = `${customerLineTop}px`;
    customerElement.style.height = `${customerLineHeight}px`;
    customerElement.style.width = `${grassLineWidth}px`;
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
          newPatch = svg.render("hole", 5);
        }
      }
      if (patch.building) {
        let style=``;
        newPatch = svg.render(patch.building, 1, style);
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
        spuds.animate(patch);
        state.save();
        tools.render();
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
        "<div>You find some seed potatoes at the bottom of your basket and scatter them randomly.</div>";
      let blankPatches = [];
      let i = player.cols;
      while (i < (player.cols * player.rows)) {
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
    if (hint.visible || dialog.visible) {
      return;
    }
    let patch = player.fields[player.currentField][player.pos];
    let tool = player.tools["spade"];
    let thisTool = document.querySelector(`.tool-spade svg`);
    svg.animate(thisTool, `jiggle-up`, 0.25);

    if (tool.uses < 1) {
      hint.toolUsedUp('spade');
    }

    if (player.pos < player.cols) {
      hint.noDigHome();
    }

    if (tool.uses > 0 && player.pos >= player.cols) {
      // if nothing defined for a patch then its an empty patch
      if (!patch) {
        patch = {};
      }
      // make sure every patch have an id referencing itself
      patch.id = `patch_${player.pos}`;
      // if there is an item defined, dig it up and add it to the sack
      if (patch.item) {
        spuds.animate(patch);
        let item = hardware.items[patch.item];
        if (item.type == 'tool') {
          // upgrade the tool
          player.tools[patch.item] = player.tools[patch.item] ?? {};
          player.tools[patch.item].maxUses++;
          player.tools[patch.item].uses++;
          delete patch.item;
          state.save();
          tools.render();

        } else if (item.type == 'machine') {
          if (!player.shop.machines[patch.item]) {
            player.shop.machines[patch.item] = item.initial;
            delete patch.item;
            state.save();
            tools.render();
          }
        } else {
          // increment the players count of this item
          let sackQty = player.sack[patch.item] || 0;
          player.sack[patch.item] = sackQty + 1;
          delete patch.item;
          state.save();
          tools.render();
        }
      }
      
      // if no spuds then make sure we are quite clear there are no spuds
      if (!patch.spud) {
        patch.spud = { qty: 0 };
      }
      // if there are spuds then dig them up
      if (patch.spud.qty > 0) {
        // all spuds dug at once and moved to player sack
        let sackQty = player.sack[patch.spud.name] || 0;
        player.sack[patch.spud.name] = sackQty + patch.spud.qty;
        // spud qty in negative meaning it takes this many days to return to a fresh patch
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
      // match duration of spuds.animate() which is 1.5s
      setTimeout(() => {tools.jiggle('basket')}, 1500);

      if (patch) {
        fields.renderPatch(patch);
      }
    }
    state.save();
  },
  // based on a patch, what is the svg for the buried item
  getPatchSvg: function (patch) {
    let itemSvg = '';
    if(patch.item) {
      itemSvg = svg.render(patch.item);
    } else {
      itemSvg = spuds.render(patch.spud.name);
    }

    return itemSvg;
  },

  highlightCurrentPos: () => {
    // move player spite
    let element = document.querySelector(`#patch_${player.pos}`);
    let patch = element.getBoundingClientRect();
    let posY = patch.top + "px";
    let posX = patch.left + "px";
    let height = patch.height + "px";
    let width = patch.width + "px";

    // player is smaller on top row
    if (player.pos < player.cols) {
      height = patch.height / 2 + "px";
      width = patch.width / 2 + "px";
      posY = patch.top + (patch.height / 2) + "px";
      posX = patch.left + (patch.width / 4) + "px";
    }
    
    let playerSprite = document.querySelector(`#playerSprite`);
 
    if (playerSprite.innerHTML == "") {
      playerSprite.innerHTML = svg.renderPerson(player.body);
    }
    playerSprite.style.top = posY;
    playerSprite.style.left = posX;
    playerSprite.style.width = width;
    playerSprite.style.height = height;
 

    scanner.check();
  },

  removeCurrentPosHighlight: () => {
    element = document.querySelector(`#playerSprite`);
    //scanner.off();
  },
  // player starts back at the entrance of the field
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

  whichTool: function (patch) {
    let tool = '';
    if (patch.block.type == "rock") {
      tool = "pick";
    } else if (patch.block.type == "log") {
      tool = "axe";
    }
    return tool;
  }

};


