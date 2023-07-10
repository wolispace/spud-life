
const controls = {
  ArrowLeft: player.maxPatches - player.cols,
  ArrowDown: player.maxPatches - player.cols + 1,
  ArrowRight: player.maxPatches - player.cols + 2,
  ArrowUp: player.maxPatches - (player.cols*2) + 1,
  click: (indexId) => {
    let controlIds = [controls.ArrowUp, controls.ArrowLeft, controls.ArrowRight, controls.ArrowDown];
    // user clicked a control to move up, down, left or right - interact with the patch we are moving into
    let bits = indexId.split("_");
    let index = parseInt(bits[1]);
    if (player.animating) {
      setTimeout((player.animating = false), 2000);
      return;
    }
    if (controlIds.indexOf(index) > -1) {
      // we are trying to move
      fields.removeCurrentPosHighlight();
      // use current pos unless is Ok to move
      let newPos = player.pos;
      let direction = "down";

      // move to next/prev fields
      if (index == controls.ArrowLeft && player.pos == 0) {
        let newField = player.currentField - 1;
        if (player.fields[newField]) {
          fields.switchField(newField);
          return;
        }
      }
      if (index == controls.ArrowRight && player.pos == player.cols - 1) {
        let newField = player.currentField + 1;
        if (player.fields[newField]) {
          fields.switchField(newField);
          return;
        }
      }
      if (index == controls.ArrowUp) {
        if (player.pos == 0) {
          // go into home
          let thisBlock = document.querySelector(`#playerSprite svg`);
          svg.animate(thisBlock, `shrink`, 1, () => {setPhase("night")});
        } else if (player.pos == 3) {
          let thisBlock = document.querySelector(`#playerSprite svg`);
          svg.animate(thisBlock, `shrink`, 1, () => {setPhase("hardware")});
        } else if (player.pos == 6) {
          let thisBlock = document.querySelector(`#playerSprite svg`);
          svg.animate(thisBlock, `shrink`, 1, () => {setPhase("allocate")});
        }
      }

      if (index == controls.ArrowUp) {
        newPos -= player.cols;
        direction = "up";
        svg.directPlayerSprite("up");
        if (newPos < 0) {
          newPos = player.pos;
        }
      }
      if (index == controls.ArrowLeft && player.pos % player.cols > 0) {
        newPos -= 1;
        direction = "left";
        svg.directPlayerSprite("left");
        if (newPos < 0) {
        }
      }
      if (index == controls.ArrowRight && player.pos % player.cols < 9) {
        newPos += 1;
        direction = "right";
        svg.directPlayerSprite("right");
        if (newPos >= player.maxPatches) {
          newPos = player.pos;
        }
      }
      if (index == controls.ArrowDown) {
        newPos += player.cols;
        svg.directPlayerSprite("down");
        if (newPos >= player.maxPatches) {
          newPos = player.pos;
        }
      }

      if (controlIds.indexOf(newPos) > -1) {
        newPos = player.pos;
      }

      if (newPos !== player.pos) {
        let patch = player.fields[player.currentField][newPos];
        if (patch && patch.block && patch.block.type.indexOf("control") < 0) {
          // animate..
          let thisBlock = document.querySelector(`#${patch.id} svg`);
          svg.animate(thisBlock, `jiggle-${direction}`, 0.25);

          let tool = "";
          if (patch.block.type == "rock") {
            tool = "pick";
          } else if (patch.block.type == "log") {
            tool = "axe";
          } else {
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
              setTimeout(
                () => {
                  element.innerHTML = svg.render("blank", player.grassQty);
                },
                250,
                element,
                player
              );
            }
            playerTool.uses--;
            tools.render();

            if (patch) {
              fields.updatePatch(patch);
            }
            if (patch.block) {
              newPos = player.pos;
            }
          } else {
            // not something we can chop or cut..
            if (patch.block.pos) {
            } else {
              newPos = player.pos;
            }
          }
        }
      }
      player.pos = newPos;
      fields.highlightCurrentPos();
      // so the day can be cycled on first loading..
      state.save();
      player.phase = "field";
    }
  },
};
