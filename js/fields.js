const fields = {
  // one off setup the grid of patches
  setupGrid() {
    const maxPatches = 99;
    let index = 0;
    let patches = '';
    while (index <= maxPatches) {
      patches += `<div class="patch" id="patch_${index}">${svg.render('blank', player.grassQty)}</div>`;
      index++;
    }
    element = document.querySelector('.field');
    element.innerHTML = patches;
  },

  // player chose to switch to this field..
  switchField: (fieldId) => {
    player.currentField = fieldId;
    // if field is empty then fill it
    fields.fillField(fieldId);
    // wipe grid
    fields.setupGrid();
    // render current field
    fields.renderField();
    // reset player to 0
    state.save();

  },

  buyField: () => {
    // find highest field ID, add 1, set that field as an empty array so it can be filled
    player.fields[player.fields.length] = [];
    state.save(true);
  },

  // randomly fill the selecte field (if empty) with rocks, logs and spuds - plus some ranom treasure!
  fillField: (fieldId) => {
    if (player.fields[fieldId].length < 1) {
      // first row 0 and 10 may contain links to other fields
      if (player.fields[fieldId - 1]) {
        player.fields[fieldId][0] = { id: "patch_0", block: { type: "control-icon--left", qty: 1, onclick: `switchField(${fieldId - 1})` } };
      }
      if (player.fields[fieldId + 1]) {
        player.fields[fieldId][9] = { id: "patch_9", block: { type: "control-icon--right", qty: 1, onclick: `switchField(${fieldId + 1})` } };
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
            let newSpud = player.spuds[rnd(player.spuds.length)];
            patch.spud = { "name": newSpud.name, "qty": rnd(3) + 1 };
          }
          if (!player.fields[fieldId]) {
            player.fields[fieldId] = [];
          }
          player.fields[fieldId][i] = patch;
        }
        i++;
      };
      // put controls in
      let id = player.controls.start;
      player.fields[fieldId][id] = { id: `patch_${id}`, block: { type: "control-icon--up", qty: 1, onclick: `controls.click(${id})` } };
      id += 10;
      player.fields[fieldId][id] = { id: `patch_${id}`, block: { type: "control-icon--left", qty: 1, onclick: `controls.click(${id})` } };
      id += 1;
      player.fields[fieldId][id] = { id: `patch_${id}`, block: { type: "control-icon--right", qty: 1, onclick: `controls.click(${id})` } };
      id += 9;
      player.fields[fieldId][id] = { id: `patch_${id}`, block: { type: "control-icon--down", qty: 1, onclick: `controls.click(${id})` } };
    }
    console.log(player);
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

  // add an svg to each patsch
  renderField: () => {
    player.fields[player.currentField].forEach((patch, index) => {
      patch = patch ?? {};
      patch.id = `patch_${index}`;
      fields.renderPatch(patch);
    });
  },

  // based on patch contents decide what to show
  renderPatch: (patch) => {
    let newPatch = ' ';
    if (patch) {
      if (patch.block) {
        if (patch.block.type.indexOf('control') > -1) {
          newPatch = svg.render(patch.block.type, patch.block.qty);
          element = document.querySelector(`#${patch.id}`);
          element.innerHTML = svg.render(patch.block.type);
          element.classList.add("controlButton");
          element.classList.remove('patch');
          element.setAttribute("onclick", `controls.click('${patch.id}');`);
        } else {
          newPatch = svg.render(patch.block.type, patch.block.qty);
        }
      }

      if (patch.spud) {
        if (patch.spud.qty > 0) {
          newPatch += ''; // `<br/>S=${patch.spud.qty}` 
        } else {
          if (patch.spud.qty == -5 && patch.spud.name) {
            newPatch = svg.render('spud');
            patch.spudFound = true;
          } else {
            newPatch = svg.render('hole', 5);
          }
        }
      }
    }
    if (newPatch == ' ') {
      newPatch = svg.render('blank', player.grassQty);
    }
    if (newPatch) {
      let element = document.querySelector(`#${patch.id}`);
      element.innerHTML = newPatch;

      if (patch.spudFound) {
        delete patch.spudFound;
        let thisSpud = document.querySelector(`#${patch.id} svg`);

        function onEnd() {
          newPatch = svg.render('hole', 5);
          element.innerHTML = newPatch;
        }
        svg.animate(thisSpud, 'dig-spud', 1, onEnd);
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
    if (player.sowSeeds > 0) {
      sowMsg = '<div>You find some seed potaoes at the bottom of your sack and scatter them randomly in the field</div>';
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
            patch.block = { "type": "rock", "qty": rnd(5) + 1 };
            break;
          case 1:
            patch.block = { "type": "log", "qty": rnd(5) + 1 };
            break;
        }
        let newSpud = player.spuds[rnd(player.spuds.length)];
        patch.spud = { "name": newSpud.name, "qty": rnd(3) + 1 };
        player.fields[player.currentField][index] = patch;
      };
    }

    return sowMsg;
  },
  // dig for a pus in the current patch
  digPatch: () => {
    let patch = player.fields[player.currentField][player.pos];
    let tool = player.tools['spade'];
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
  },
  highlightCurrentPos: () => {
    let element = document.querySelector(`#patch_${player.pos}`);
    element.classList.add("currentPos");
  },
  // player starts back at the entrace of the field
  // TODO: do we reset them to their first field or leave on last (an upgrade perhaps?)
  resetPlayer: () => {
    element = document.querySelector(`#patch_${player.pos}`);
    element.classList.remove("currentPos");
    player.pos = 0;
    element = document.querySelector(`#patch_${player.pos}`);
    element.classList.add("currentPos");
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
            if (!doneOne && !group.classList.contains('hidden')) {
              group.classList.add('hidden');
              doneOne = true;
            }
            index--;
          }
        }
      }
    }
  }

}
