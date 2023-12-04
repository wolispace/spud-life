const hint = {
  target: null,
  arrow: null,
  msg: null,
  message: '',
  okButton: '',
  btnText: null,
  group: '',
  visible: false,
  force: false,
  reminder: {},

  defaultParams: {
    autoRender: false,
  },

  setup: function () {
    // make two objects.. the body and the arrow
    let hintBox = document.querySelector(`.hintArrow`);
    let arrowSvg = svg.render('arrow', 1, '');

    if (!hintBox) {
      addToBody(`
        <div id='hintOverlay' class='overlay' onclick='hint.overlayClicked()'></div>
        <div class='hintArrow'>${arrowSvg}</div>
        <div class='hintMsg'></div>
      `);
    }
    hint.overlay = document.querySelector(`#hintOverlay`);
    hint.msg = document.querySelector(`.hintMsg`);
    hint.arrow = document.querySelector(`.hintArrow`);

    hint.hide();
  },

  test: function () {
    hint.target = document.querySelector(`.close`);
    hint.group = '';
    hint.force = true;
    hint.okButton = 'hint.test2';
    hint.message = 'This is the close button. This is not a pipe. This is not a pipe. This is not a pipe. This is not a pipe. This is not a pipe. ';
    hint.render();
  },

  test2: function () {
    dialog.hide();
    hint.target = game.playerItem;
    hint.group = '';
    hint.force = true;
    hint.okButton = 'hint.controls';
    hint.message = 'This is not a pipe. This is not a pipe. This is not a pipe. This is not a pipe. This is not a pipe. ';
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
    if ((player.hinted[hint.group] || !player.hints) && !hint.force) {
      hint.hide();
      return;
    }
    let btnText = hint.btnText || hint.ok();
    // hints show once
    // let skipCheckbox = hint.buildSkip();
    let input = `<div class="hintButtons">`;
    // input += `${skipCheckbox}`;
    input += ` <button class="button buttonize" onclick="hint.confirm()">${btnText}</button></div>`;
    hint.msg.innerHTML = `${hint.message} ${input}`;
    hint.pointAt();
    hint.showMsg();
    hint.overlay.style.display = 'block';
    // only show each hint one.
    player.hinted[hint.group] = true;
    game.save();
  },

  overlayClicked: function () {
    // do nothing so player has to acknowledge the hint
    //hint.confirm();
  },

  close: function () {
    hint.hide();
  },

  hide: function () {
    hint.msg.style.top = '-200px';
    hint.arrow.style.top = '-200px';
    hint.overlay.style.display = 'none';
    hint.msg.innerHTML = '';
    hint.btnText = null;
    hint.force = false;
  },

  confirm: function () {
    hint.isItSkipped();
    hint.hide();
    // if they don't want to see this again, then mark it as hinted
    if (hint.okButton == 'hint.confirm') {
      hint.okButton = 'hint.close';
    }
    eval(`${hint.okButton}()`);
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

  isItSkipped: function () {
    player.hinted[hint.group] = true;
    game.save();
  },

  reset: function () {
    dialog.hide();
    player.hinted = [];
    hint.resetHints();
  },

  pointAt: function () {
    if (!hint.target) {
      console.trace('pointing at nothing!');
      return;
    }
    hint.addCtr();
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

  addCtr: function () {
    if (hint.target.centre) {
      return;
    }
    hint.target.centre = function () {
      let icon = {
        x: hint.target.offsetLeft,
        y: hint.target.offsetTop,
        w: hint.target.offsetWidth,
        h: hint.target.offsetHeight,
      };
      return {
        x: icon.x + (icon.w / 2),
        y: icon.y + (icon.h),
      }
    }
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
      "Cool",
      "Yes",
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
      `There are ${game.maxScan} levels of scanner upgrade. The ${game.maxScan}th shows what's directly under you`,
      "Everything is saved, all the time (in your browser's local storage)",
      "If you have a keyboard, use cursor, space, enter and escape keys",
      "It takes 30 random white circles to make one cloud",
      "The rarest potatoes are found on the furthest fields",
    ];

    return randomHint[rnd(randomHint.length)];
  },

  myName: function () {
    hint.target = document.querySelector('#playerName');
    hint.message = `What is your name? Leave blank for a random name.`;
    hint.okButton = 'hint.part';
    hint.group = '1';
    hint.render();
  },

  part: function () {
    hint.target = document.querySelector('.part_body');
    hint.message = `Select a body part.<br/>Change its type with arrows`;
    hint.okButton = 'hint.colour';
    hint.group = '2';
    hint.render();
  },

  colour: function () {
    hint.target = document.querySelector('.color-group');
    hint.message = `Also change it's colour`;
    hint.okButton = 'hint.confirm';
    hint.group = '3';
    hint.render();
  },

  buyPick: function () {
    hint.target = document.querySelectorAll('.hardware-button-buy')[1];
    hint.message = `I suggest you first buy a pick or an axe to clear the ground`;
    hint.okButton = 'hint.confirm';
    hint.group = '4';
    hint.render();
  },

  player: function () {
    hint.target = game.playerItem;
    hint.message = `This is you`;
    hint.okButton = 'hint.controls';
    hint.group = '5';
    hint.render();
  },
  controls: function () {
    hint.isItSkipped();
    hint.target = controls.list.right;
    hint.message = `Use these arrows to move.`;
    hint.okButton = 'hint.house';
    hint.group = '6';
    hint.render();
  },
  house: function () {
    hint.target = buildings.list.home;
    hint.message = `Move UP when in front of a building to go inside.`;
    hint.okButton = 'hint.spade';
    hint.group = '7';
    hint.render();
  },
  spade: function () {
    hint.target = tools.list.spade;
    hint.message = `Use your spade to dig where you stand.`;
    hint.okButton = 'hint.field';
    hint.group = '8';
    hint.render();
  },
  field: function () {
    hint.target = player.fields[0][0][0];
    hint.btnText = `Let's start digging!`;
    hint.message = `Rocks and logs block your path.`;
    hint.okButton = 'hint.confirm';
    hint.group = '9';
    hint.render();
  },

  hintPrompts: [
    ['You'],
    [
      'Yes, you',
      'Like I said, you',
      'Again, you',
      'I repeat, you',
    ],
    [
      'One more time, you',
      `I'll say it again, you`,
      'For the third time, you',
    ],
    [
      'Ahem.. You',
      'Oi! You',
      'Hay! You',
      "What!? You"
    ],
    [
      `Pay attention, you`,
      `It's actually quite important, you`,
      `I told you before and I'll tell you again, you`,
      `Its important that you know, you`,
    ],
    [
      `Really!! You`,
      `Wow! Look at you! You`,
      `I'm impressed with your stamina. You`,
    ],
    [
      `For the umpteenth time, you`,
      `For the last time!! You`,
      `Didn't I just tell you? You`,
    ],
    [
      `I don't think you understand. You`,
      'Maybe you were not paying attention, you',
      'Really? Really!?! You',
      'What! What!!  You',
    ],
    [
      `Ok, one more time, you`,
      'Listen up, you',
      'Pay attention, you',
      'Maybe I didn`t make myself clear, you',
    ],
    [
      `I'm getting tired of reminding you that you`,
    ],
    [
      `I'm exhausted! You`,
    ],
    [
      `Ok, you win. This is the last. You`,
    ]
  ],

  // returns -1 if we have exceeded max msgs, otherwise return the reminderCount 
  getReminderCount: function (hintSet) {
    let reminderCount = hint.reminder[hintSet] ?? 0;
    return reminderCount > hint.hintPrompts.length ? -1 : reminderCount;
  },

  getReminder: function (hintSet, suffix) {
    let reminderCount = hint.getReminderCount(hintSet);
    if (reminderCount < 0) {
      return '';
    }
    let msgList = hint.hintPrompts[reminderCount];
    if (!msgList) {
      return '';
    }
    let prefix = msgList[rnd(msgList.length)];

    hint.reminder[hintSet] = reminderCount + 1;

    return `${prefix}${suffix}`;
  },

  noDigHome: function () {
    hint.target = game.playerItem;
    hint.message = hint.getReminder('noDigHome', ` can't dig here. Move down a bit and try again.`);
    hint.okButton = 'hint.confirm';
    hint.group = '';
    hint.force = hint.message.length > 0;
    hint.render();
  },

  toolUsedUp: function (toolName) {
    hint.target = tools.list[toolName];
    hint.message = hint.getReminder('toolUsedUp', `r ${toolName} is exhausted. Tomorrow morning it will be refreshed and you can use it again.`);
    hint.okButton = 'hint.confirm';
    if (toolName == 'spade') {
      hint.okButton = 'hint.letsCook';
    }
    hint.group = '';
    hint.force = hint.message.length > 0;
    hint.render();
  },

  toolNone: function (toolName) {
    let an = pluraliser(toolName, 'a', 'an');
    hint.target = buildings.list.hardware;
    hint.message = hint.getReminder(`no_${toolName}`, ` should go to the hardware store and buy ${an} ${toolName} to clear this.`);
    hint.okButton = 'hint.confirm';
    hint.group = '';
    hint.force = hint.message.length > 0;
    hint.render();
  },

  letsCook: function () {
    if (basket.hasSpuds()) {
      hint.target = buildings.list.cart;
      hint.message = `It's time to cook up some spuds using your machines. `;
      hint.group = 'letsCook';
    } else {
      hint.target = tools.list.basket;
      hint.message = `You found no spuds today.`;
      hint.group = 'letsSleep';
    }
    hint.okButton = 'hint.toolHW';
    hint.render();
  },

  toolHW: function () {
    hint.target = buildings.list.hardware;
    hint.message = `Check the hardware store for things to buy and sell.`;
    hint.okButton = 'hint.toolHome';
    hint.group = '11';
    hint.render();
  },

  toolHome: function () {
    hint.target = buildings.list.home;
    hint.message = `Then go home and get some sleep. Try again tomorrow.`;
    hint.okButton = 'hint.confirm';
    hint.group = '12';
    hint.render();
  },


  itsNight: function () {
    hint.target = `.dialog .close`;
    hint.message = `It's night time and too late to open your shop. Go home and get some sleep.`;
    hint.okButton = 'hint.confirm';
    hint.group = '13';
    hint.render();
  },

  goHome: function () {
    hint.target = buildings.list.home;
    hint.message = `It's getting late. Go home and get some sleep.`;
    hint.okButton = 'hint.confirm';
    hint.group = '14';
    hint.render();
  },

  openShop: function () {
    hint.target = `.dialog .okButton`;
    hint.message = `When your ready, open your shop and sell your potato-based meals.`;
    hint.okButton = 'hint.confirm';
    hint.group = '15';
    hint.render();
  },

  dugItem: function () {
    hint.target = tools.list.basket;
    hint.message = `You dug up something. Click your basket to see what you found.`;
    hint.okButton = 'hint.confirm';
    hint.group = '16';
    hint.render();
  },

  dugTool: function (item) {
    hint.target = tools.list[toolName];
    hint.message = `You dug up a ${item.name} to add to your collection.`;
    hint.okButton = 'hint.confirm';
    hint.group = '17';
    hint.render();
  },

  dugMachine: function (tool) {
    hint.target = buildings.list.cart;
    hint.message = `You dug up a ${tool.name}. It's going straight to work.`;
    hint.okButton = 'hint.confirm';
    hint.group = '18';
    hint.render();
  },

  scanner: function () {
    player.hinted['scanner'] = true;
    hint.target = tools.list.scanner;
    hint.message = `You scanner flashes when something is buried near by.`;
    hint.okButton = 'hint.confirm';
    hint.group = '';
    hint.render();
  },

  scannerUpgrade: function (tool) {
    hint.target = tools.list.scanner;
    hint.message = `You dug up a ${tool.name}. It's going straight to work.`;
    hint.okButton = 'hint.confirm';
    hint.group = '20';
    hint.render();
  },

  petIntro: function () {
    hint.target = game.petItem;
    hint.message = `Oh look.. a small black fluffy animal. I think its a stray`;
    hint.okButton = 'hint.petHome';
    hint.group = '21';
    hint.render();
  },

  petHome: function () {
    hint.target = buildings.list.home;
    hint.message = `Go home to interact with it`;
    hint.okButton = 'hint.confirm';
    hint.group = '22';
    hint.render();
  },

  resetHints: function () {
    hint.target = game.playerItem;
    hint.message = `This is you, and your hints have been reset`;
    hint.okButton = 'hint.confirm';
    hint.group = '23';
    hint.render();
  },

};
