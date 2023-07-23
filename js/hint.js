const hint = {
  sprite: null,
  visible: false,
  pointTo: null,
  message: '',  
  okButton: null,
  group: '',

  render: function () {
    if (player.hinted[hint.group]) {
      return;
    }
    hint.visible = true;

    // if hint.pointTo is below player.cols / 2 arrow is on left else right
    let posY = hint.pointTo.top + (hint.pointTo.height / 2);
    let posX = hint.pointTo.left + (hint.pointTo.width / 2);

    // hint.pointTo is below half way, arrow is on top else bottom
    let arrowTop = (posY < (window.innerHeight / 2));
    let arrowLeft = (posX < (window.innerWidth / 2));

    let flipTop = arrowTop ? '1' : `-1`;
    let flipLeft = arrowLeft ? '1' : '-1';
    let style = `style="transform: scale(${flipLeft}, ${flipTop});`;

    let arrowClass = arrowLeft ? 'Left' : 'Right';

    let arrowSvg = svg.render('arrow', 1, style);
    let skipCheckbox = hint.buildSkip();
    let buttonStart = `<div class="hintButtons">${skipCheckbox}`;
    buttonStart += ` <button class="button buttonize" onclick="${hint.okButton}()"> `;
    let buttonEnd = `</button></div>`;
    hint.message = hint.message.replace('[', buttonStart);
    hint.message = hint.message.replace(']', buttonEnd);
    let content = ``;
    if (arrowTop) {
      content += `<div id="hintArrow" class="hintArrowTop hintArrow${arrowClass}">${arrowSvg}</div>`;
    }
    content += `<div id="hintText">${hint.message}</div>`;
    if (!arrowTop) {
      content += `<div id="hintArrow" class="hintArrowButton hintArrow${arrowClass}">${arrowSvg}</div>`;
    }

    // position sprite on hint.pointTo..
    hint.sprite.innerHTML = content;
    let hintBox = hint.sprite.getBoundingClientRect();

    // use hint size to calc corner positions
    if (!arrowTop) {
      posY -= hintBox.height - 20;
    } else {
      posY -= 20;
    }

    if (!arrowLeft) {
      posX -= hintBox.width;
    }
    hint.sprite.style.top = `${posY}px`;
    hint.sprite.style.left = `${posX}px`;
    let patch = getElementPos(`#patch_0`);
    let hintWidth = patch.width * player.cols / 1.7;
    hint.sprite.style.width = `${hintWidth}px`;

    let arrowObj = document.querySelector('.hintArrowRight');
    if (arrowObj) {
      arrowObj.style.left = `${hintWidth-50}px`;
    }
  },

  buildSkip: function () {
    let skipCheckbox = '';
    if (hint.group) {
      skipCheckbox = `<span class="checkboxSpan">`;
      skipCheckbox += `<input type="checkbox" id="hintSkip" data-hint="${hint.group}" />`;
      skipCheckbox += `<label class="checkboxLabel" for="hintSkip">Skip this </label></span>`;
    }
    return skipCheckbox;
  },

  confirm: function () {
    eval(`${hint.okButton}()`);
  },
  isItSkipped: function () {
    let skipHint = document.querySelector('#hintSkip');
    if (skipHint && skipHint.checked) {
      player.hinted[skipHint.dataset.hint] = true;
      hint.hide();
    }
  },
  close: function () {
    // if they dont want to see this again, then mark it as hinted
    hint.isItSkipped();
    hint.hide();
  },
  hide: function () {
    hint.sprite.style.top = "-1000px";
    hint.visible = false;
  },

  off: function () {
    hint.close();
    state.save();
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
     "Go",
     "Yup",
     "Makes sense",
     "Agreed",
     "Affirmative",
    ];
    return okText[rnd(okText.length)];
  },
  player: function () {
    hint.pointTo = getElementPos(`#patch_0`);
    hint.message = `This is you. In front of your house. [${hint.ok()}..]`;
    hint.okButton = 'hint.controls';
    hint.group = 'into',
    hint.render();
    //hint.render(`#patch_0`, msg, 'hint.controls', 'intro');
  },
  controls: function () {
    hint.isItSkipped();
    hint.pointTo = getElementPos(`#patch_111`);
    hint.message = `Use these to move around the field. [${hint.ok()}..]`;
    hint.okButton = 'hint.spade';
    hint.group = 'into',
    hint.render();
  },
  spade: function () {
    hint.isItSkipped();
    hint.pointTo = getElementPos(`.tool-spade`);
    hint.message = `Use the spade to dig where you stand. [${hint.ok()}..]`;
    hint.okButton = 'hint.field';
    hint.group = 'into',
    hint.render();
  },
  field: function () {
    hint.isItSkipped();
    hint.pointTo = getElementPos(`#patch_53`);
    hint.message = `Rocks and logs block your path. [Let's start digging!]`;
    hint.okButton = 'hint.close';
    hint.group = 'into',
    hint.render();
  },   

  noDigHome: function () {
    hint.pointTo = getElementPos(`#patch_${player.pos}`);
    hint.message = `You can't dig on the top row. Move down onto an empty patch and dig there. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'noDigHome';
    hint.render();
  },

  toolUsedUp: function (toolName) {
    hint.pointTo = getElementPos(`.tool-${toolName}`);
    hint.message = `Your ${toolName} is exhausted. Tomorrow morning it will be refreshed and you can use it again. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'toolUsedUp';
    hint.render();
  },

  goHome: function () {
    hint.pointTo = getElementPos(`#patch_0`);
    hint.message = `Its getting late. Go home and get some sleep. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'goHome';
    hint.render();
  },

  home: function () {
    hint.pointTo = getElementPos(`#patch_0`);
    hint.message = `Your home. Stand in front and press UP to go inside. [${hint.ok()}]`;
    hint.okButton = 'hint.hardware';
    hint.group = 'home';
    hint.render();
  },

  hardware: function () {
    hint.pointTo = getElementPos(`#patch_3`);
    hint.message = `Your local hardware shop. Stand in front and press UP to go inside. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'hardware';
    hint.render();
  } ,
}