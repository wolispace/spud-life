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
  toolNoneCount: -1,
  hintBasket: false,
  stack: [],

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

  addHinted: function (key) {
    if (!hint.isHinted(key)) {
      player.hinted += `${key},`;  
    }
  },

  isHinted: function (key) {
    return player.hinted.indexOf(`${key},`) > -1;
  },

  done: function () {
    hint.hide();
  },

  push: function () {
    hint.stack.push({
      target: hint.target,
      message: hint.message,
      group: hint.group,
      next: hint.next,
      force: hint.force,
    });
  },

  pop: function() {
    // remove the current hint from the stack
    let lastState = hint.stack.pop();
    if (lastState) {
      hint.target = lastState.target;
      hint.message = lastState.message;
      hint.group = lastState.group;
      hint.next = lastState.next;
      hint.force = lastState.force;
      hint.render();
    }
  },

  render: function () {
    if (hint.visible) {
      hint.push();
      return;
    }
    if ((hint.isHinted(hint.group) || !player.hints) && hint.force != '') {
      hint.hide();
      return;
    }
    if (isDev) {
      //return;
    }

    if (dialog.visible) {
      // scroll the target into view..
      var parentDiv = document.querySelector('.dialog .content');
      var targetDiv = hint.target.sprite || hint.target;
      if (targetDiv) {
        var pos = dialog.calculatePos(parentDiv, targetDiv);
        dialog.scrollToSmoothly(parentDiv, pos, 100);
      }
    }

    setTimeout(() => {
      character.stopMoving(false);

      hint.visible = true;
      let btnText = hint.btnText || hint.ok();
      let input = `<div class="hintButtons">`;
      input += ` <button class="button buttonize" onclick="hint.confirm()">${btnText}</button></div>`;
      hint.msg.innerHTML = `${hint.message} ${input}`;
      hint.pointAt();
      hint.showMsg();
      hint.overlay.style.display = 'block';
      // only show each hint one.
      hint.addHinted(hint.group);
      game.save();

    }, 200);

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
    hint.visible = false;
    hint.pop();
  },

  confirm: function () {
    hint.hide();
    // if they don't want to see this again, then mark it as hinted
    if (hint.okButton == 'hint.confirm') {
      hint.okButton = 'hint.close';
    }
    if (hint.next) {
      hint.show(hint.next);
    } else {
      eval(`${hint.okButton}()`);
    }
  },

  reset: function () {
    dialog.hide();
    player.hinted = '';
    character.resetMoved();
    hint.resetHints();
  },

  pointAt: function () {
    if (!hint.target) {
      console.trace('pointing at nothing!');
      hint.hide();
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
      var rect = hint.target.getBoundingClientRect();
      let icon = {
        x: rect.left,
        y: rect.top,
        w: hint.target.offsetWidth,
        h: hint.target.offsetHeight,
      };
      return {
        x: icon.x + (icon.w / 2),
        y: icon.y + (icon.h / 2),
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
    return getFromList('okText');
  },

  random: function () {
    let randomHintMsg = getFromList('randomHint');
    return randomHintMsg.replaceAll('[maxScan]', game.maxScan);
  },

  show(hintName) {
    let hintSet = lists.raw.hintSet[hintName];
    let hintInfo = hintSet.split('|');
    hint.target = document.querySelector(hintInfo[0]);
    // TODO: if target is null do something special like selecting first rock
    hint.group = hintInfo[1] ?? '';
    hint.message = hintInfo[2];
    hint.next = hintInfo[3] || '';
    hint.force = hintInfo[4] || '';
    hint.okButton = hintInfo.okButton ?? 'hint.confirm';
    hint.render();
  },

  buyTool: function () {
    hint.target = document.querySelectorAll('.hardware-button-buy')[0];
    hint.message = `I suggest you first buy a pick or an axe to clear the ground`;
    hint.okButton = 'hint.confirm';
    hint.group = 'q';
    hint.render();
  },

  house: function () {
    hint.target = buildings.list.home;
    hint.message = `Move UP<br/>...or tap a building to go inside.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'u';
    hint.render();
  },
  spade: function () {
    hint.target = tools.list.spade;
    hint.message = `Use your spade<br/>...or tap on yourself to dig where you stand.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'v';
    hint.render();
  },
  field: function () {
    hint.target = player.fields[0][0][0];
    hint.message = `Rocks and logs block your path.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'w';
    hint.render();
  },

  // returns -1 if we have exceeded max msgs, otherwise return the reminderCount 
  getReminderCount: function (hintSet) {
    let reminderCount = hint.reminder[hintSet] ?? 0;
    return reminderCount > lists.raw.hintPrompts.length ? -1 : reminderCount;
  },

  getReminder: function (hintSet, suffix) {
    let reminderCount = hint.getReminderCount(hintSet);
    if (reminderCount < 0) {
      return '';
    }
    let msgList = lists.raw.hintPrompts[reminderCount];
    if (!msgList) {
      return '';
    }
    let prefix = msgList[rnd(msgList.length)];

    hint.reminder[hintSet] = reminderCount + 1;

    return `${prefix}${suffix}`;
  },

  resetReminders: function () {
    hint.reminder = {};
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
    // only show the hint every 5 times.. 0, 5, 10
    hint.toolNoneCount++;
    if (hint.toolNoneCount >= 5) {
      hint.toolNoneCount = 0;
    }
    if (hint.toolNoneCount > 0) {
      return;
    }
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
    // only show the hint every 5 times.. 0, 5, 10
    hint.toolNoneCount++;
    if (hint.toolNoneCount >= 5) {
      hint.toolNoneCount = 0;
    }
    if (hint.toolNoneCount > 0) {
      return;
    }

    let an = pluraliser(toolName, 'a', 'an');
    let item = toolName == 'pick' ? 'rocks' : 'logs';
    hint.target = buildings.list.hardware;
    hint.message = hint.getReminder(`no_${toolName}`, ` should go to the hardware store and buy ${an} ${toolName} to clear ${item}.`);
    hint.okButton = 'hint.confirm';
    hint.group = '';
    hint.force = hint.message.length > 0;
    hint.render();
  },

  firstTool: function (hitItem) {
    hint.target = hitItem;
    hint.message = `You need to hit this ${game.blockHits - 1} more times to remove it completely`;
    hint.okButton = 'hint.confirm';
    hint.group = 'x';
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
    hint.group = 'a';
    hint.render();
  },

  toolHome: function () {
    hint.target = buildings.list.home;
    hint.message = `Then go home and get some sleep. Try again tomorrow.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'b';
    hint.render();
  },


  itsNight: function () {
    hint.target = `.dialog .close`;
    hint.message = `It's night time and too late to open your shop. Go home and get some sleep.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'c';
    hint.render();
  },

  goHome: function () {
    hint.target = buildings.list.home;
    hint.message = `It's getting late. Go home and get some sleep.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'd';
    hint.render();
  },

  openShop: function () {
    hint.target = `.dialog .okButton`;
    hint.message = `When your ready, open your shop and sell your potato-based meals.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'e';
    hint.render();
  },

  dugItem: function (item) {
    let itemInfo = items[item.item];
    let bookInfo = books.isBook(item.item);
    if (!bookInfo && itemInfo.type == 'spuds') {
      icon = spuds.build(itemInfo.name); //svg.render('spud1');
      itemInfo.desc = spuds.desc(itemInfo);
      itemInfo.fullName = `A spud called ${itemInfo.fullName}`;
    } else {
      if (bookInfo) {      
        icon =  bookInfo.icon;
        itemInfo = {
          desc: bookInfo.desc,
          fullName: bookInfo.name,
        };
      } else {
        icon = svg.render(item.item);
      }
    }

    let wowMsg = getFromList('wowMsgList');
    hint.target = tools.list.basket;
    hint.message = `${wowMsg} You just dug up:<br/><b>${itemInfo.fullName}</b>`;
    hint.message += `<div class="hintIcon">${icon}</div>`;
    if (!hint.hintBasket) {
      hint.message += `<div>Check your basket to see what you found.</div>`;
    }
    hint.hintBasket = true;
    hint.group = item.item;
    hint.render();
  },

  holeLife: function () {
    hint.target = player.fields[0][game.SURFACE][0];
    hint.message = `Each hole clears after 5 days, then a new spud is randomly sown`;
    hint.okButton = 'hint.confirm';
    hint.group = 'f2';
    hint.render();
  },

  dugTool: function (item) {
    hint.target = tools.list[toolName];
    hint.message = `You dug up a ${item.name} to add to your collection.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'g';
    hint.render();
  },

  dugMachine: function (tool) {
    hint.target = buildings.list.cart;
    hint.message = `You dug up a ${tool.name}. It's going straight to work.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'h';
    hint.render();
  },


  scannerUpgrade: function (tool) {
    hint.target = tools.list.scanner;
    hint.message = `You dug up a ${tool.name}. It's going straight to work.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'j';
    hint.render();
  },

  petIntro: function () {
    hint.target = game.petItem;
    hint.message = `Oh look.. a small black fluffy animal. I think its a stray`;
    hint.okButton = 'hint.petHome';
    hint.group = 'k';
    hint.render();
  },

  petHome: function () {
    hint.target = buildings.list.home;
    hint.message = `Go home to interact with it`;
    hint.okButton = 'hint.confirm';
    hint.group = 'l';
    hint.render();
  },

  petMsg: function () {
    if (dialog.visible || hint.visible) {
      return;
    }
    hint.target = game.petItem;
    let rndMsg = getFromList('petMsgList');
    hint.message = `${pet.name} ${rndMsg}`;
    hint.okButton = 'hint.confirm';
    hint.group = '';
    hint.force = true;
    hint.render();
  },

  resetHints: function () {
    hint.target = game.playerItem;
    hint.message = `This is you, and your hints have been reset.`;
    hint.okButton = 'hint.controls';
    hint.group = 'm';
    hint.render();
  },

  scanner: function () {
    hint.target = tools.list.scanner;
    hint.message = `When your scanner flashes, something is buried near by.`;
    hint.okButton = 'hint.confirm';
    hint.group = 's';
    hint.render();
  },
  scanner2: function () {
    hint.target = tools.list.scanner;
    hint.message = `Click your scanner to change settings.`
    hint.okButton = 'hint.confirm';
    hint.group = 's2';
    hint.render();
  },

  addTool: function (itemInfo) {
    hint.target = itemInfo;
    hint.message = `You dug up a ${itemInfo.item}. It's going straight to work.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'y';
    hint.render();
  },
  addMachine: function (machineName) {
    hint.target = buildings.list.cart;
    hint.message = `You dug up a ${machineName}. It's going straight to work.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'z';
    hint.render();
  },
  gotMachine: function (machineName) {
    hint.target = buildings.list.hardware;
    hint.message = `You dug up a ${machineName}. You already have one so sell this muddy one.`;
    hint.okButton = 'hint.confirm';
    hint.group = 'z2';
    hint.render();
  },
  hotelCheckout: function () {
    hint.target = document.querySelector('.part_name');
    hint.message = `You can checkout any time you like...`;
    hint.okButton = 'hint.confirm';
    hint.group = '';
    hint.force = true;
    hint.render();
  },
  hotelLeave: function () {
    hint.target = document.querySelector('.part_name');
    hint.message = `.. but you can never leave.`;
    hint.okButton = 'hint.confirm';
    hint.group = '';
    hint.force = true;
    hint.render();
  },


};
