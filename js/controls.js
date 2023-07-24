
const controls = {
  ArrowLeft: (player.cols * player.rows) - player.cols,
  ArrowDown: (player.cols * player.rows) - player.cols + 1,
  ArrowRight: (player.cols * player.rows) - player.cols + 2,
  ArrowUp: (player.cols * player.rows) - (player.cols*2) + 1,
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
      if (index == controls.ArrowUp && player.currentField == 0) {
        if (player.pos == 0) {
          // go into home
          let thisBlock = document.querySelector(`#playerSprite svg`);
          svg.animate(thisBlock, `shrink`, 1, () => {home.enter()});
        } else if (player.pos == 3) {
          let thisBlock = document.querySelector(`#playerSprite svg`);
          svg.animate(thisBlock, `shrink`, 1, () => {hardware.enter()});
        } else if (player.pos == 6) {
          let thisBlock = document.querySelector(`#playerSprite svg`);
          svg.animate(thisBlock, `shrink`, 1, () => {shop.enter()});
        }
      }

      if (index == controls.ArrowUp) {
        newPos -= player.cols;        
        if (newPos < player.cols && player.pos > player.cols) {
          hint.playerShrink(newPos);
        }
        direction = "up";
        character.look("up");
        if (newPos < 0) {
          newPos = player.pos;
        }
      }
      if (index == controls.ArrowLeft && player.pos % player.cols > 0) {
        newPos -= 1;
        direction = "left";
        character.look("left");
        if (newPos < 0) {
        }
      }
      if (index == controls.ArrowRight && player.pos % player.cols < (player.cols - 1)) {
        newPos += 1;
        direction = "right";
        character.look("right");
        if (newPos >= (player.cols * player.rows)) {
          newPos = player.pos;
        }
      }
      if (index == controls.ArrowDown) {
        newPos += player.cols;
        if (player.pos < player.cols && newPos > player.cols) {
          hint.playerGrow(newPos);
        }

        character.look("down");
        if (newPos >= (player.cols * player.rows)) {
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

          let tool = fields.whichTool(patch);
          let playerTool = player.tools[tool];
          if (playerTool) {
            tools.jiggle(tool);
          }

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
