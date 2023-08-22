const hint = {
  sprite: null,
  visible: false,
  message: '',  
  okButton: null,
  group: '',
  pointAt: '',

  render: function () {
    if (player.hinted[hint.group] || !player.hints) {
      hint.hide();
      return;
    }
    hint.visible = true;
    // if hint.pointTo is below player.cols / 2 arrow is on left else right
    
    // point to the middle of the element
    let pointTo = getElementPos(hint.pointAt);
    let posY = pointTo.top + (pointTo.height / 2);
    let posX = pointTo.left + (pointTo.width / 2);

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
    buttonStart += ` <button class="button buttonize" onclick="hint.confirm()"> `;
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
    let hintWidth = patch.width * player.cols / 1.6;
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
      skipCheckbox += `<input type="checkbox" id="hintSkip" />`;
      skipCheckbox += `<label class="checkboxLabel" for="hintSkip">Hide next time </label></span>`;
    }
    return skipCheckbox;
  },

  confirm: function () {
    // if they don't want to see this again, then mark it as hinted
    hint.isItSkipped();
    eval(`${hint.okButton}()`);
  },

  isItSkipped: function () {
    let skipHint = document.querySelector('#hintSkip');
    if (skipHint && skipHint.checked) {
      player.hinted[hint.group] = true;
      state.save();
      hint.hide();
    }
  },

  close: function () {
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
    hint.pointAt = `#patch_0`;
    hint.message = `This is you. In front of your house. [${hint.ok()}..]`;
    hint.okButton = 'hint.controls';
    hint.group = 'player',
    hint.render();
    //hint.render(`#patch_0`, msg, 'hint.controls', 'intro');
  },
  controls: function () {
    hint.isItSkipped();
    hint.pointAt = `#patch_${controls.ArrowUp}`;
    hint.message = `Use these to move around the field. [${hint.ok()}..]`;
    hint.okButton = 'hint.spade';
    hint.group = 'controls',
    hint.render();
  },
  spade: function () {
    hint.pointAt = `.tool-spade`;
    hint.message = `Use the spade to dig where you stand. [${hint.ok()}..]`;
    hint.okButton = 'hint.field';
    hint.group = 'spade',
    hint.render();
  },
  field: function () {
    hint.pointAt = `#patch_53`;
    hint.message = `Rocks and logs block your path. You always find spuds under them. [Let's start digging!]`;
    hint.okButton = 'hint.close';
    hint.group = 'field',
    hint.render();
  },   

  noDigHome: function () {
    hint.pointAt = `#patch_${player.pos}`;
    hint.message = `You can't dig on the top row. Move down onto an empty patch and dig there. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'noDigHome';
    hint.render();
  },

  toolUsedUp: function (toolName) {
    hint.pointAt = `.tool-${toolName}`;
    hint.message = `Your ${toolName} is exhausted. Tomorrow morning it will be refreshed and you can use it again. [${hint.ok()}..]`;
    hint.okButton = 'hint.toolCart';
    hint.group = 'toolUsedUp';
    hint.render();
  },

  toolCart: function () {
    hint.pointAt = `#patch_6`;
    
    hint.message = `It's time to load your machines with spuds and open for the night. [${hint.ok()}..]`;
    hint.okButton = 'hint.toolHome';
    hint.group = 'toolCart';
    hint.render();
  },

  toolHome: function () {
    hint.pointAt = `#patch_0`;
    
    hint.message = `If you have no spuds, go home and bring on the night. [${hint.ok()}..]`;
    hint.okButton = 'hint.toolHW';
    hint.group = 'toolHome';
    hint.render();
  },

  toolHW: function () {
    hint.pointAt = `#patch_3`;
        hint.message = `Remember to check the hardware store for things to buy and sell. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'toolHW';
    hint.render();
  },

  itsNight: function () {
    hint.pointAt = `.dialog .close`;
        hint.message = `It's night time and too late to open your shop. Go home and get some sleep. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'itsNight';
    hint.render();
  },

  goHome: function () {
    hint.pointAt = `#patch_0`;
    hint.message = `It's getting late. Go home and get some sleep. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'goHome';
    hint.render();
  },

  playerGrow: function (newPos) {
    hint.pointAt = `#patch_${newPos}`;
    hint.message = `Due to perspective you look larger when walking around the field. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'playerGrow';
    hint.render();
  },
  playerShrink: function (newPos) {
    hint.pointAt = `#patch_${newPos}`;
    hint.message = `Due to perspective you look smaller when walking near buildings. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'playerShrink';
    hint.render();
  },

  chipper: function () {
    hint.pointAt = `#machine_chipper`;
    let spuds = document.querySelector('.basketSpuds');
    if (spuds) {
      hint.message = `Choose a machine you want to load with spuds. [${hint.ok()}..]`;
      hint.okButton = 'hint.moveSpuds';
      hint.group = 'allocate';
    } else {
      hint.message = `When you find spuds, load them into your machines.<p>Your machines make meals for you to sell when you open your shop.</p> [${hint.ok()}..]`;
      hint.okButton = 'hint.noSales';
      hint.group = 'allocateIntro';
    }
    hint.render();
  },
  noSales: function () {
    hint.pointAt = `.dialog .okButton`;
    hint.message = `Your machines have no spuds.<p>Open for the night will not make any money but you will refresh your tools.</p> [${hint.ok()}]`;
    hint.okButton = 'hint.howToClose';
    hint.group = 'noSales';
    hint.render();
  },
  howToClose: function () {
    hint.pointAt = `.dialog .close`;
    hint.message = `You can also click this to return to the field. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'howToClose';
    hint.render();
  },
  moveSpuds: function () {
    hint.pointAt = `.basketSpuds`;
    hint.message = `Move all, or one at a time, to the selected machine. [${hint.ok()}..]`;
    hint.okButton = 'hint.spudTypes';
    hint.group = 'allocate';
    hint.render();
  },
  spudTypes: function () {
    hint.pointAt = `.basketSpudDesc`;
    hint.message = `Use the matching machine to make more money per meal. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'allocate';
    hint.render();
  },
  openShop: function () {
    hint.pointAt = `.dialog .okButton`;
    hint.message = `When your ready, open your shop and sell your potato-based meals. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'allocate';
    hint.render();
  },

  dugItem: function () {
    hint.pointAt = `.tool-basket`;
    hint.message = `You dug up something. Click your basket to see what you found. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'dugItem';
    hint.render();
  },

  dugTool: function (item) {
    hint.pointAt = `.tool-${item.id}`;
    hint.message = `You dug up a ${item.name} to add to your collection. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'dugTool';
    hint.render();
  },

  dugMachine: function (tool) {
    hint.pointAt = `#patch_6`;
    hint.message = `You dug up a ${tool.name}. It's going straight to work. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'dugMachine';
    hint.render();
  },

  scannerUpgrade: function (tool) {
    hint.pointAt = `.tool-scanner`;
    hint.message = `You dug up a ${tool.name}. It's going straight to work. [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'scannerUpgrade';
    hint.render();
  },

  petIntro: function () {
    hint.pointAt = `#petSprite`;
    hint.message = `Oh look.. a small black fluffy animal. I think its a stray [${hint.ok()}]`;
    hint.okButton = 'hint.close';
    hint.group = 'petIntro';
    hint.render();
  },

};

