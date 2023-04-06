const fields = {
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
  highlightCurrentPos: () => {
    let element = document.querySelector(`#patch_${app.state.pos}`);
    element.classList.add("currentPos");
  },
  // player starts back at the entrace of the field
  // TODO: do we reset them to their first field or leave on last (an upgrade perhaps?)
  resetPlayer: () => {
    element = document.querySelector(`#patch_${app.state.pos}`);
    element.classList.remove("currentPos");
    app.state.pos = 0;
    element = document.querySelector(`#patch_${app.state.pos}`);
    element.classList.add("currentPos");
  },

}
