const controls = {
  // allocate 4 patches to be movement buttons - they cant be dug
  render: () => {
    let id = player.controls.start;
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
    element.innerHTML = svg.render(`control-icon--${dir}`);
    element.classList.add("controlButton");
    element.classList.remove('patch');
    element.setAttribute("onclick", `controls.click(${id});`);
    player.fields[player.currentField][id] = { block: { type: "control" } };
  },

  click: (index) => {
    // user clicked a control to move up, down, left or right - interact with the patch we are moving into

    if (player.animating) {
      setTimeout(player.animating = false, 2000);
      return;
    }
    if (player.controlIds.indexOf(index) > -1) {
      // we are trying to move
      element = document.querySelector(`#patch_${player.pos}`);
      element.classList.remove("currentPos");
      let newPos = player.pos;
      let direction = 'down';

      if (index == 60) {
        newPos -= 10;
        direction = 'up';
        if (newPos < 0) {
          newPos = player.pos;
        }
      }
      if (index == 70 && player.pos % 10 > 0) {
        newPos -= 1;
        direction = 'left';
        if (newPos < 0) {
          // If there is an patch-1 then switch to that patch and put player in patch_9
          newPos = player.pos;
        }
      }
      if (index == 71 && player.pos % 10 < 9) {
        newPos += 1;
        direction = 'right';
        if (newPos == 10 && player.fields[player.currentField + 1]) {
          player.currentField++;
          player.pos = 9;
          fields.renderPatches();
          exit;
        }
        if (newPos > 99) {
          newPos = player.pos;
        }
      }
      if (index == 80) {
        newPos += 10;
        if (newPos > 99) {
          newPos = player.pos;
        }
      }

      if (player.controlIds.indexOf(newPos) > -1) {
        newPos = player.pos;
      }

      if (newPos !== player.pos) {
        let patch = player.fields[player.currentField][newPos];
        if (patch && patch.block) {
          // animate..
          let thisBlock = document.querySelector(`#${patch.id} svg`);
          svg.animate(thisBlock, `jiggle-${direction}`, 0.25);

          let tool = '';
          if (patch.block.type == 'rock') {
            tool = 'pick';
          } else {
            tool = 'axe';
          }
          let thisTool = document.querySelector(`.tool-${tool} svg`);

          svg.animate(thisTool, `jiggle-up`, 0.25);
          let playerTool = player.tools[tool];
          if (playerTool && playerTool.uses > 0) {
            // if the patch is blocked.. the click reduces until zero and the block is removed
            player.sack[patch.block.type] = player.sack[patch.block.type] ?? 0;
            player.sack[patch.block.type]++;
            if (patch.block.qty > 1) {
              patch.block.qty--;
            } else {
              delete patch.block;
              let element = document.querySelector(`#${patch.id}`);
              setTimeout(() => { element.innerHTML = svg.render('blank', player.grassQty); }, 250, element, player);
            }
            playerTool.uses--;
            tools.render();

            if (patch) {
              updatePatch(patch);
            }
            if (patch.block) {
              newPos = player.pos;
            }
          } else {
            newPos = player.pos;
          }
        }
      }
      player.pos = newPos;
      fields.highlightCurrentPos();
      // so the day can be cycled on first loading..
      player.phase = 'night';
      state.save();
      player.phase = 'field';
    };
  }

}
