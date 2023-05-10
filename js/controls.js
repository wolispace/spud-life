USER_KEY_UP = 60;
USER_KEY_LEFT = 70;
USER_KEY_RIGHT = 71;
USER_KEY_DOWN = 80;

const controls = {
  click: (indexId) => {
    // user clicked a control to move up, down, left or right - interact with the patch we are moving into
    let bits = indexId.split("_");
    let index = parseInt(bits[1]);
    if (player.animating) {
      setTimeout((player.animating = false), 2000);
      return;
    }
    if (player.controlIds.indexOf(index) > -1) {
      // we are trying to move
      fields.removeCurrentPosHighlight();
      // use current pos unless is Ok to move
      let newPos = player.pos;
      let direction = "down";

      // move to next/prev fields
      if (index == USER_KEY_LEFT && player.pos == 0) {
        let newField = player.currentField - 1;
        if (player.fields[newField]) {
          fields.switchField(newField);
          return;
        }
      }
      if (index == USER_KEY_RIGHT && player.pos == 9) {
        let newField = player.currentField + 1;
        if (player.fields[newField]) {
          fields.switchField(newField);
          return;
        }
      }
      if (index == USER_KEY_UP) {
        if (player.pos == 0) {
          // go into home
          console.log("going home");
        } else if (player.pos == 3) {
          console.log("going shopping");
        } else if (player.pos == 6) {
          console.log("going selling");
        }
      }

      if (index == USER_KEY_UP) {
        newPos -= 10;
        direction = "up";
        svg.directPlayerSprite("up");
        if (newPos < 0) {
          newPos = player.pos;
        }
      }
      if (index == USER_KEY_LEFT && player.pos % 10 > 0) {
        newPos -= 1;
        direction = "left";
        svg.directPlayerSprite("left");
        if (newPos < 0) {
        }
      }
      if (index == USER_KEY_RIGHT && player.pos % 10 < 9) {
        newPos += 1;
        direction = "right";
        svg.directPlayerSprite("right");
        if (newPos > 99) {
          newPos = player.pos;
        }
      }
      if (index == USER_KEY_DOWN) {
        newPos += 10;
        svg.directPlayerSprite("down");
        if (newPos > 99) {
          newPos = player.pos;
        }
      }

      if (player.controlIds.indexOf(newPos) > -1) {
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
