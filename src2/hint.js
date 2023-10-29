const hint = {
  target: null,
  arrow: null,
  msg: null,
  message: '',
  okButton: '',
  btnText: 'Ok',
  group: '',
  visible: false,

  defaultParams: {
    autoRender: false,
  },

  setup: function () {
    // make two objects.. the body and the arrow
    let hintBox = document.querySelector(`.hintArrow`);
    let arrowSvg = svg.render('arrow', 1, '');

    if (!hintBox) {
      addToBody(`
        <div class='hintArrow'>${arrowSvg}</div>
        <div class='hintMsg'></div>
      `);
    }
    hint.arrow = document.querySelector(`.hintArrow`);
    hint.msg = document.querySelector(`.hintMsg`);

    hint.hide();
  },

  test: function () {
    dialog.hide();
    hint.target = game.playerItem;
    hint.group = 'test';
    hint.btnText = hint.ok();
    hint.okButton = 'hint.controls';
    hint.text = 'This is not a pipe. This is not a pipe. This is not a pipe. This is not a pipe. This is not a pipe. ';
    hint.render();
  },

  // controls: function () {
  //   hint.hide();
  //   hint.target = tools.list.basket;
  //   hint.group = 'test';
  //   hint.btnText = hint.ok();
  //   hint.okButton = 'hint.done';
  //   hint.text = 'Items end up in your basket.';
  //   hint.render();
  // },

  done: function () {
    hint.hide();
  },

  render: function () {
    if (player.hinted[hint.group] || !player.hints) {
      hint.hide();
      return;
    }
    let skipCheckbox = hint.buildSkip();
    let input = `<div class="hintButtons">${skipCheckbox}`;
    input += ` <button class="button buttonize" onclick="hint.confirm()">${hint.btnText}</button></div>`;
    hint.msg.innerHTML = `${hint.message} ${input}`;
    hint.pointAt();
    hint.showMsg();
  },

  close: function () {
    hint.hide();
  },

  buildSkip: function () {
    let skipCheckbox = '';
    if (hint.group) {
      skipCheckbox = `<span class="checkboxSpan">`;
      skipCheckbox += `<input type="checkbox" id="hintSkip" />`;
      skipCheckbox += `<label class="checkboxLabel" for="hintSkip">Hide</label></span>`;
    }
    return skipCheckbox;
  },

  confirm: function () {
    hint.hide();
    // if they don't want to see this again, then mark it as hinted
    hint.isItSkipped();
    eval(`${hint.okButton}()`);
  },

  isItSkipped: function () {
    let skipHint = document.querySelector('#hintSkip');
    if (skipHint && skipHint.checked) {
      player.hinted[hint.group] = true;
      game.save();
      hint.hide();
    }
  },

  pointAt: function () {
    hint.setOrient();
    let tCtr = hint.target.centre();
    let newPos = {
      x: tCtr.x,
      y: tCtr.y,
    }
    if (hint.orient.x == -1) {
      newPos.x = newPos.x - hint.arrow.offsetWidth;
    }
    if (hint.orient.y == -1) {
      newPos.y = newPos.y - hint.arrow.offsetWidth;
    }
    hint.arrow.style.left = `${newPos.x}px`;
    hint.arrow.style.top = `${newPos.y}px`;
    // flip the image to point at a corner.
    hint.arrow.style.transform = `scale(${hint.orient.x}, ${hint.orient.y})`;
  },

  // is the target < or > the centre of the world
  setOrient: function () {
    let worldCentre = {
      x: (sprite.width * game.grid.x) / 2,
      y: (sprite.height * game.grid.y) / 2,
    }
    let tCtr = hint.target.centre();

    hint.orient = {
      x: (tCtr.x < worldCentre.x) ? 1 : -1,
      y: (tCtr.y < worldCentre.y) ? 1 : -1,
    }
  },

  hide: function () {
    hint.msg.style.top = '-1000px';
    hint.arrow.style.top = '-1000px';
  },

  showMsg: function () {
    // align msg with arrow that is already pointing at the item
    let verticalOffset = 6;

    let msgPos = {
      x: hint.arrow.offsetLeft + (hint.arrow.offsetWidth / 2),
      y: hint.arrow.offsetTop + (hint.arrow.offsetHeight / 2),
    }
    if (hint.orient.x == -1) {
      // shift things back by the width of the msg box
      msgPos.x = msgPos.x - hint.msg.offsetWidth;
    };
    if (hint.orient.y == -1) {
      // shift things up by the width of the msg box - add some verticalOffset
      msgPos.y = msgPos.y - hint.msg.offsetHeight - verticalOffset;
    } else {
      msgPos.y = msgPos.y + verticalOffset;
    };
    hint.msg.style.left = `${msgPos.x}px`;
    hint.msg.style.top = `${msgPos.y}px`;
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
    hint.target = game.playerItem;
    hint.message = `This is you, near your house.`;
    hint.okButton = 'hint.controls';
    hint.group = 'player',
    hint.render();
  },
  controls: function () {
    hint.isItSkipped();
    hint.target = controls.list.up;
    hint.message = `Use these arrows to move.`;
    hint.okButton = 'hint.spade';
    hint.group = 'controls',
    hint.render();
  },
  spade: function () {
    hint.target = controls.list.spade;
    hint.message = `Use your spade to dig where you stand.`;
    hint.okButton = 'hint.field';
    hint.group = 'spade',
    hint.render();
  },
  field: function () {
    hint.target = player.fields[0][0][10];
    hint.btnText = `Let's start digging!`;
    hint.message = `Rocks and logs block your path.`;
    hint.okButton = 'hint.close';
    hint.group = 'field',
    hint.render();
  },   

  noDigHome: function () {
    hint.target = game.playerItem;
    hint.message = `You can't dig here. Move down onto an empty patch and dig there.`;
    hint.okButton = 'hint.close';
    hint.group = 'noDigHome';
    hint.render();
  },

  toolUsedUp: function (toolName) {
    hint.target = tools.list[toolName];
    hint.message = `Your ${toolName} is exhausted. Tomorrow morning it will be refreshed and you can use it again.`;
    hint.okButton = 'hint.close';
    if (toolName == 'spade') {
      hint.okButton = 'hint.letsCook';
    }
    hint.group = toolName;
    hint.render();
  },

  letsCook: function () {
    if (tools.list.basket.hasSpuds()) {
      hint.target = buildings.list.cart;
      hint.message = `It's time to cook up some spuds using your machines. `;
      hint.group = 'letsCook';
    } else {
      hint.target = buildings.list.home;
      hint.message = `You found no spuds today so go home and get some sleep. Tomorrow you can try again.`;
      hint.group = 'letsSleep';
    }
    hint.okButton = 'hint.close';
    hint.render();
  },

  toolHome: function () {
    hint.target = buildings.list.home;
    
    hint.message = `If you have no spuds, go home and bring on the night.`;
    hint.okButton = 'hint.toolHW';
    hint.group = 'toolHome';
    hint.render();
  },

  toolHW: function () {
    hint.target = buildings.list.hardware;
        hint.message = `Remember to check the hardware store for things to buy and sell.`;
    hint.okButton = 'hint.close';
    hint.group = 'toolHW';
    hint.render();
  },

  itsNight: function () {
    hint.target = `.dialog .close`;
        hint.message = `It's night time and too late to open your shop. Go home and get some sleep.`;
    hint.okButton = 'hint.close';
    hint.group = 'itsNight';
    hint.render();
  },

  goHome: function () {
    hint.target = game.playerItem;
    hint.message = `It's getting late. Go home and get some sleep.`;
    hint.okButton = 'hint.close';
    hint.group = 'goHome';
    hint.render();
  },

  openShop: function () {
    hint.target = `.dialog .okButton`;
    hint.message = `When your ready, open your shop and sell your potato-based meals.`;
    hint.okButton = 'hint.close';
    hint.group = 'allocate';
    hint.render();
  },

  dugItem: function () {
    hint.target = tools.list.basket;
    hint.message = `You dug up something. Click your basket to see what you found.`;
    hint.okButton = 'hint.close';
    hint.group = 'dugItem';
    hint.render();
  },

  dugTool: function (item) {
    hint.target = tools.list[toolName];
    hint.message = `You dug up a ${item.name} to add to your collection.`;
    hint.okButton = 'hint.close';
    hint.group = 'dugTool';
    hint.render();
  },

  dugMachine: function (tool) {
    hint.target = buildings.list.cart;
    hint.message = `You dug up a ${tool.name}. It's going straight to work.`;
    hint.okButton = 'hint.close';
    hint.group = 'dugMachine';
    hint.render();
  },

  scannerUpgrade: function (tool) {
    hint.target = tools.list.scanner;
    hint.message = `You dug up a ${tool.name}. It's going straight to work.`;
    hint.okButton = 'hint.close';
    hint.group = 'scannerUpgrade';
    hint.render();
  },

  petIntro: function () {
    hint.target = game.petItem;
    hint.message = `Oh look.. a small black fluffy animal. I think its a stray`;
    hint.okButton = 'hint.close';
    hint.group = 'petIntro';
    hint.render();
  },

};
