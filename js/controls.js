const controls = {
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
    element.setAttribute("onclick", `controls.click(${id});`);
    app.state.fields[app.state.currentField][id] = { block: { type: "control" } };
  },

  click: (index) => {
    // user clicked a control to move up, down, left or right - interact with the patch we are moving into

    if (app.state.animating) {
      setTimeout(app.state.animating = false, 2000);
      return;
    }
    if (app.state.controlIds.indexOf(index) > -1) {
      // we are trying to move
      element = document.querySelector(`#patch_${app.state.pos}`);
      element.classList.remove("currentPos");
      let newPos = app.state.pos;
      let direction = 'down';

      if (index == 60) {
        newPos -= 10;
        direction = 'up';
        if (newPos < 0) {
          newPos = app.state.pos;
        }
      }
      if (index == 70 && app.state.pos % 10 > 0) {
        newPos -= 1;
        direction = 'left';
        if (newPos < 0) {
          // If there is an patch-1 then switch to that patch and put player in patch_9
          newPos = app.state.pos;
        }
      }
      if (index == 71 && app.state.pos % 10 < 9) {
        newPos += 1;
        direction = 'right';
        if (newPos == 10 && app.state.fields[app.state.currentField + 1]) {
          app.state.currentField++;
          app.state.pos = 9;
          fields.renderPatches();
          exit;
        }
        if (newPos > 99) {
          newPos = app.state.pos;
        }
      }
      if (index == 80) {
        newPos += 10;
        if (newPos > 99) {
          newPos = app.state.pos;
        }
      }

      if (app.state.controlIds.indexOf(newPos) > -1) {
        newPos = app.state.pos;
      }

      if (newPos !== app.state.pos) {
        let patch = app.state.fields[app.state.currentField][newPos];
        if (patch && patch.block) {
          // animate..
          let thisBlock = document.querySelector(`#${patch.id} svg`);
          animate(thisBlock, `jiggle-${direction}`, 0.25);

          let tool = '';
          if (patch.block.type == 'rock') {
            tool = 'pick';
          } else {
            tool = 'axe';
          }
          let thisTool = document.querySelector(`.tool-${tool} svg`);

          animate(thisTool, `jiggle-up`, 0.25);
          let playerTool = app.state.tools[tool];
          if (playerTool && playerTool.uses > 0) {
            // if the patch is blocked.. the click reduces until zero and the block is removed
            app.state.sack[patch.block.type] = app.state.sack[patch.block.type] ?? 0;
            app.state.sack[patch.block.type]++;
            if (patch.block.qty > 1) {
              patch.block.qty--;
            } else {
              delete patch.block;
              let element = document.querySelector(`#${patch.id}`);
              setTimeout(() => { element.innerHTML = svgImg('blank', app.state.grassQty); }, 250, element, app.state);
            }
            playerTool.uses--;
            tools.render();

            if (patch) {
              updatePatch(patch);
            }
            if (patch.block) {
              newPos = app.state.pos;
            }
          } else {
            newPos = app.state.pos;
          }
        }
      }
      app.state.pos = newPos;
      fields.highlightCurrentPos();
    }
  }

}
