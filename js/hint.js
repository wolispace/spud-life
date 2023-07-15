const hint = {
  render: function (item, text, toolPointer) {
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
    let buttonStart = `<button class="button buttonize" onclick="hint.close()"> `;
    let buttonEnd = `</button>`;
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
  },
  close: function () {
    let element = document.querySelector('#hintSprite');
    hintSprite.style.top = "-1000px";
  },
  test: function () {
    hideDialog();
    setTimeout(() => { hint.render(`#patch_111`, "Use your spade to dig for potatoes. [Got that]") }, 1000);
    //setTimeout( () => {hint.render(`#patch_3`,"The hardware shop where you can buy an upgrade items. [Got that]")}, 3000);
    setTimeout(() => { hint.render(`#patch_6`, "Your food truck where you sell your delicious potato-centric dishes. [Got that]") }, 6000);
    //setTimeout( () => {hint.render(`#patch_119`,"Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. Usually under anything that blocks you way will be a potato. [Got that]")}, 9000);
    setTimeout(() => { hint.render(`.tool-spade`, "Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. Usually under anything that blocks you way will be a potato. [Got that]") }, 12000);
    setTimeout(() => { hint.render(`.tool-pick`, "Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. Usually under anything that blocks you way will be a potato. [Got that]") }, 14000);
    setTimeout(() => { hint.render(`.tool-axe`, "Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. Usually under anything that blocks you way will be a potato. [Got that]") }, 16000);
    setTimeout(() => { hint.render(`.tool-scanner`, "Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. Usually under anything that blocks you way will be a potato. [Got that]") }, 18000);
    setTimeout(() => { hint.render(`.tool-basket`, "Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. Usually under anything that blocks you way will be a potato. [Got that]") }, 20000);
    setTimeout(() => { hint.render(`.tool-wallet`, "Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way.Some logs that are blocking your way. Usually under anything that blocks you way will be a potato. [Got that]") }, 22000);

  }
}