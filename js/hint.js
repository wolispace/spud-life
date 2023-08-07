const hint = {
  sprite: null,
  visible: false,
  pointTo: null,
  message: '',  
  okButton: null,
  group: '',
  debug: '',

  render: function () {
    if (player.hinted[hint.group] || !player.hints) {
      return;
    }
    hint.visible = true;
    console.log('hint pointTo', hint.debug, hint.pointTo, getElementPos(hint.debug));

    // if hint.pointTo is below player.cols / 2 arrow is on left else right
    
    // point to the middle of the element
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
      state.save();
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
  random: function () {
    let randomHint = [
      "You may find things other than potatoes buried beneath you",
      "There are 4 levels of scanner upgrade. The 4th shows what's directly under you",
      "Everything is saved, all the time (in your browser's local storage)",
      "If you have a keyboard, use cursor, space, enter and escape keys",
      "It takes 30 random white circles to make one cloud",
      "The rarest potatoes are found on the furthest fields",
    ];

    return randomHint[rnd(randomHint.length)];
  },

  player: function () {
    hint.debug = `#patch_0`;
    hint.pointTo = getElementPos(`#patch_0`);
    hint.message = `This is you. In front of your house. [${hint.ok()}..]`;
    hint.okButton = 'hint.controls';
    hint.group = 'into',
    hint.render();
    //hint.render(`#patch_0`, msg, 'hint.controls', 'intro');
  },
  controls: function () {
    hint.isItSkipped();
    hint.debug = `#patch_${controls.ArrowUp}`;
    hint.pointTo = getElementPos(`#patch_${controls.ArrowUp}`);
    hint.message = `Use these to move around the field. [${hint.ok()}..]`;
    hint.okButton = 'hint.spade';
    hint.group = 'into',
    hint.render();
  },
  spade: function () {
    hint.isItSkipped();
    hint.debug = `.tool-spade`;
    hint.pointTo = getElementPos(`.tool-spade`);
    hint.message = `Use the spade to dig where you stand. [${hint.ok()}..]`;
    hint.okButton = 'hint.field';
    hint.group = 'into',
    hint.render();
  },
  field: function () {
    hint.isItSkipped();
    hint.debug = `#patch_53`;
    hint.pointTo = getElementPos(`#patch_53`);
    hint.message = `Rocks and logs block your path. You always find spuds under them. [Let's start digging!]`;
    hint.okButton = 'hint.close';
    hint.group = 'into',
    hint.render();
  },   

  noDigHome: function () {
    hint.debug = `#patch_${player.pos}`;
    hint.pointTo = getElementPos(`#patch_${player.pos}`);
    hint.message = `You can't dig on the top row. Move down onto an empty patch and dig there. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'noDigHome';
    hint.render();
  },

  toolUsedUp: function (toolName) {
    hint.debug = `.tool-${toolName}`;
    hint.pointTo = getElementPos(`.tool-${toolName}`);
    hint.message = `Your ${toolName} is exhausted. Tomorrow morning it will be refreshed and you can use it again. [${hint.ok()}]`;
    hint.okButton = 'hint.toolCart';
    hint.group = 'toolUsedUp';
    hint.render();
  },

  toolCart: function () {
    hint.debug = `#patch_6`;
    hint.pointTo = getElementPos(`#patch_6`);
    hint.message = `It's time to load your machines with spuds and open for the night. [${hint.ok()}]`;
    hint.okButton = 'hint.toolHome';
    hint.group = 'toolCart';
    hint.render();
  },

  toolHome: function () {
    hint.debug = `#patch_0`;
    hint.pointTo = getElementPos(`#patch_0`);
    hint.message = `If you have no spuds, go home and bring on the night. [${hint.ok()}]`;
    hint.okButton = 'hint.toolHardware';
    hint.group = 'toolHome';
    hint.render();
  },

  toolHardware: function () {
    hint.debug = `#patch_3`;
    hint.pointTo = getElementPos(`#patch_3`);
    hint.message = `Remember to check the hardware store for things to buy and sell. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'toolHardware';
    hint.render();
  },

  itsNight: function () {
    console.log('its night');
    hint.debug = `.dialog .close`;
    hint.pointTo = getElementPos(`.dialog .close`);
    hint.message = `It's night time and too late to open your shop. Go home and get some sleep. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'itsNight';
    hint.render();
  },

  goHome: function () {
    hint.debug = `#patch_0`;
    hint.pointTo = getElementPos(`#patch_0`);
    hint.message = `It's getting late. Go home and get some sleep. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'goHome';
    hint.render();
  },

  playerGrow: function (newPos) {
    hint.debug = `#patch_${newPos}`;
    hint.pointTo = getElementPos(`#patch_${newPos}`);
    hint.message = `Due to perspective you look larger when walking around the field. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'playerGrow';
    hint.render();
  },
  playerShrink: function (newPos) {
    hint.debug = `#patch_${newPos}`;
    hint.pointTo = getElementPos(`#patch_${newPos}`);
    hint.message = `Due to perspective you look smaller when walking near buildings. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'playerShrink';
    hint.render();
  },

  chipper: function () {
    hint.debug = `#machine_chipper`;
    hint.pointTo = getElementPos(`#machine_chipper`);
    let spuds = document.querySelector('.basketSpuds');
    if (spuds) {
      hint.message = `Choose a machine you want to load with spuds. [${hint.ok()}]`;
      hint.okButton = 'hint.moveSpuds';
      hint.group = 'allocate';
    } else {
      hint.message = `When you have dug up some spuds you can load them into your machines.<p>When you open your shop, your machines will make meals for you to sell.</p> [${hint.ok()}]`;
      hint.okButton = 'hint.noSales';
      hint.group = 'allocateIntro';
    }
    hint.render();
  },
  noSales: function () {
    hint.isItSkipped();
    hint.debug = `.dialog .okButton`;
    hint.pointTo = getElementPos(`.dialog .okButton`);
    hint.message = `Your machines have no spuds.<p>Open for the night will not make any money but you will refresh your tools.</p> [${hint.ok()}]`;
    hint.okButton = 'hint.howToClose';
    hint.group = 'noSales';
    hint.render();
  },
  howToClose: function () {
    hint.isItSkipped();
    hint.debug = `.dialog .close`;
    hint.pointTo = getElementPos(`.dialog .close`);
    hint.message = `You can also click this to return to the field. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'howToClose';
    hint.render();
  },
  moveSpuds: function () {
    hint.isItSkipped();
    hint.debug = `.basketSpuds`;
    hint.pointTo = getElementPos(`.basketSpuds`);
    hint.message = `Move all, or one at a time, to the selected machine. [${hint.ok()}]`;
    hint.okButton = 'hint.spudTypes';
    hint.group = 'allocate';
    hint.render();
  },
  spudTypes: function () {
    hint.isItSkipped();
    hint.debug = `.basketSpudDesc`;
    hint.pointTo = getElementPos(`.basketSpudDesc`);
    hint.message = `Use the matching machine to make more money per meal. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'allocate';
    hint.render();
  },
  openShop: function () {
    hint.isItSkipped();
    hint.debug = `.dialog .okButton`;
    hint.pointTo = getElementPos(`.dialog .okButton`);
    hint.message = `When your ready, open your shop and sell your potato-based meals. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'allocate';
    hint.render();
  },

  dugItem: function () {
    hint.debug = `.tool-basket`;
    hint.pointTo = getElementPos(`.tool-basket`);
    hint.message = `You dug up something. Click your basket to see what you found. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'dugItem';
    hint.render();
  },

  dugTool: function (item) {
    hint.debug = `.tool-${item.id}`;
    hint.pointTo = getElementPos(`.tool-${item.id}`);
    hint.message = `You dug up a ${item.name} to add to your collection. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'dugTool';
    hint.render();
  },

  dugMachine: function (tool) {
    hint.debug = `#patch_6`;
    hint.pointTo = getElementPos(`#patch_6`);
    hint.message = `You dug up a ${tool.name}. It's going straight to work. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'dugMachine';
    hint.render();
  },

  scannerUpgrade: function (tool) {
    hint.debug = `.tool-scanner`;
    hint.pointTo = getElementPos(`.tool-scanner`);
    hint.message = `You dug up a ${tool.name}. It's going straight to work. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'scannerUpgrade';
    hint.render();
  },

};

