const controls = {

  click: (indexId) => {
    // user clicked a control to move up, down, left or right - interact with the patch we are moving into
    let bits = indexId.split('_');
    let index = parseInt(bits[1]);
    if (player.animating) {
      setTimeout(player.animating = false, 2000);
      return;
    }
    if (player.controlIds.indexOf(index) > -1) {
      // we are trying to move
      fields.removeCurrentPosHighlight();
      let newPos = player.pos;
      let direction = 'down';

      // move to next/prev fields
      if (index == 70 && player.pos == 0) {
        let newField = player.currentField - 1;
        if (player.fields[newField]) {
          fields.switchField(newField);
          return;
        }
      }
      if (index == 71 && player.pos == 9) {
        let newField = player.currentField + 1;
        if (player.fields[newField]) {
          fields.switchField(newField);
          return;
        }
      }

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

        }
      }
      if (index == 71 && player.pos % 10 < 9) {
        newPos += 1;
        direction = 'right';

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
        if (patch && patch.block && patch.block.type.indexOf('control') < 0) {
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
              fields.updatePatch(patch);
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
      state.save();
      player.phase = 'field';
    };
  }

}
