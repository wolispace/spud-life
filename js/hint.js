const hint = {
  render: function (item, text, okButton, showOff = true) {
    if (!player.hints) {
      return;
    }
    // if itemBox is below player.cols / 2 arrow is on left else right
    let itemObj = document.querySelector(item);
    let itemBox = itemObj.getBoundingClientRect();
    let posY = itemBox.top + (itemBox.height / 2);
    let posX = itemBox.left + (itemBox.width / 2);

    // itemBox is below half way, arrow is on top else bottom
    let arrowTop = (posY < (window.innerHeight / 2));
    let arrowLeft = (posX < (window.innerWidth / 2));

    let flipTop = arrowTop ? '1' : `-1`;
    let flipLeft = arrowLeft ? '1' : '-1';
    let style = `style="transform: scale(${flipLeft}, ${flipTop});`;

    let arrowClass = arrowLeft ? 'Left' : 'Right';

    let hintSprite = document.querySelector('#hintSprite');
    let arrowSvg = svg.render('arrow', 1, style);
    let offButton = showOff ? `<button class="button buttonize" onclick="hint.off()"> Skip hints </button>` : '';
    let buttonStart = `<div class="hintButtons">${offButton}`;
    buttonStart += ` <button class="button buttonize" onclick="${okButton}()"> `;
    let buttonEnd = `</button></div>`;
    text = text.replace('[', buttonStart);
    text = text.replace(']', buttonEnd);
    let content = ``;
    if (arrowTop) {
      content += `<div id="hintArrow" class="hintArrowTop hintArrow${arrowClass}">${arrowSvg}</div>`;
    }
    content += `<div id="hintText">${text}</div>`;
    if (!arrowTop) {
      content += `<div id="hintArrow" class="hintArrowButton hintArrow${arrowClass}">${arrowSvg}</div>`;
    }

    // position sprite on itemBox..
    hintSprite.innerHTML = content;
    let hintBox = hintSprite.getBoundingClientRect();

    // use hint size to calc corner positions
    if (!arrowTop) {
      posY -= hintBox.height - 20;
    } else {
      posY -= 20;
    }

    if (!arrowLeft) {
      posX -= hintBox.width;
    }
    hintSprite.style.top = `${posY}px`;
    hintSprite.style.left = `${posX}px`;
    let patchObj = document.querySelector('#patch_1');
    let patch = patchObj.getBoundingClientRect();
    let hintWidth = patch.width * player.cols / 1.7;
    hintSprite.style.width = `${hintWidth}px`;

    let arrowObj = document.querySelector('.hintArrowRight');
    if (arrowObj) {
      arrowObj.style.left = `${hintWidth-50}px`;
    }
  },


  close: function () {
    let hintSprite = document.querySelector('#hintSprite');
    hintSprite.style.top = "-1000px";
  },

  off: function () {
    hint.close();
    player.hints = false;
    state.save();
  },

  test: function () {
    hideDialog();
    setTimeout(() => { hint.render(`#patch_111`, "Use your spade to dig for potatoes. [Got that]", 'hint.close') }, 1);
    //setTimeout( () => {hint.render(`#patch_3`,"The hardware shop where you can buy an upgrade items. [Got that]")}, 3000);
    setTimeout(() => { hint.render(`#patch_6`, "Your food truck where you sell your delicious potato-centric dishes. [Got that]", 'hint.close') }, 2000);
    //setTimeout( () => {hint.render(`#patch_119`,"Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. Usually under anything that blocks you way will be a potato. [Got that]", 'hint.close')}, 9000);
    setTimeout(() => { hint.render(`.tool-spade`, "Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. [Ok]", 'hint.close') }, 4000);
    setTimeout(() => { hint.render(`.tool-pick`, "Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. Usually under anything that blocks you way will be a potato. [Sure thing]", 'hint.close') }, 6000);
    setTimeout(() => { hint.render(`.tool-axe`, "Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. [Right!]", 'hint.close') }, 8000);
    setTimeout(() => { hint.render(`.tool-scanner`, "Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. Usually under anything that blocks you way will be a potato. [Got that]", 'hint.close') }, 10000);
    setTimeout(() => { hint.render(`.tool-basket`, "Some logs that are blocking your way.. [Got that]", 'hint.close') }, 12000);
    setTimeout(() => { hint.render(`.tool-wallet`, "Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. Usually under anything that blocks you way will be a potato. [Got that]", 'hint.close') }, 14000);

  },
  // a random OK message
  ok: function () {
    okText = [
     "Ok",
     "Okay",
     "Righto",
     "Gotcha",
     "I see",
     "Interesting",
     "Thanks",
     "Got that",
     "Roger",
     "Understood",
     "Aha",
    ];
    return okText[rnd(okText.length)];
  },
  player: function () {
    const msg = `This is you. In front of your house. [${hint.ok()}..]`;
    hint.render(`#patch_0`, msg, 'hint.controls', false);
  },
  controls: function () {
    const msg = `Use these to move around the field. [${hint.ok()}..]`;
    hint.render(`#patch_111`, msg, 'hint.field', false);
  },
  field: function () {
    const msg = `Use the spade to dig where you stand. [${hint.ok()}..]`;
    hint.render(`.tool-spade`, msg, 'hint.spade', false);
  },
  spade: function () {
    const msg = `Rocks and logs block your path. [Let's start digging!]`;
    hint.render(`#patch_53`, msg, 'hint.close', false);
  },   

  noDigHome: function () {
    console.log(player.pos);
    const msg = `You can't dig on the top row. Move down onto an empty patch and dig there. [${hint.ok()}]`;
    hint.render(`#patch_${player.pos}`, msg, 'hint.close', false);
  },

  toolUsedUp: function (toolName) {
    const msg = `Your ${toolName} is exhausted. Tomorrow morning it will be refreshed and you can use it again. [${hint.ok()}]`;
    hint.render(`.tool-${toolName}`, msg, 'hint.close', false);
  },

  home: function () {
    const msg = `Your home. Stand in front and press UP to go inside. [${hint.ok()}]`;
    hint.render(`#patch_0`, msg, 'hint.hardware');
  },

  hardware: function () {
    const msg = `Your local hardware shop. Stand in front and press UP to go inside. [${hint.ok()}]`;
    hint.render(`#patch_3`, msg, 'hint.close');
  } ,
}