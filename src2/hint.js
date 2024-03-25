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
    return player.hinted.indexOf(`,${key},`) > -1;
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
    //console.log('pushed', hint.stack);
  },

  pop: function () {
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
    //console.log('popped', hint.stack);
  },

  // use params from list.hintSet, override target in params, replace [word] in message with params as well
  show: function (hintName, params = {}) {
    let hintInfo = hint.info(hintName);
    //console.log('show', hintName, params, hintInfo);
    hint.target = params.target || document.querySelector(hintInfo[0]);
    hint.group = params.group || hintInfo[1] || '';
    hint.message = params.message || hint.parse(hintInfo[2], params);
    hint.next = params.next || hintInfo[3] || '';
    hint.force = params.force || hintInfo[4] || '';
    hint.okButton = params.okButton || 'hint.confirm';
    hint.render();
  },

  info: function (hintName) {
    let hintSet = lists.raw.hintSet[hintName];
    return hintSet.split('|');
  },

  parse: function (msg, params) {
    return msg.replace(/\[(.*?)\]/g, function (_, key) {
      return params[key];
    });
  },

  render: function () {
    if (hint.visible || game.animating) {
      hint.push();
      return;
    }
    if ((hint.isHinted(hint.group) || !player.hints) && hint.force == '') {
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
      hint.msg.innerHTML = `${hint.message}.${input}`;
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
    hint.show('resetHints');
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
    hint.next = 'toolHW';
    hint.render();
  },

  dugItem: function (item) {
    let itemInfo = items[item.item];
    let bookInfo = books.isBook(item.item);
    let fullName = '';
    let icon = '';
    if (!bookInfo && itemInfo.type == 'spuds') {
      icon = spuds.build(itemInfo.name);
      fullName = `A spud called ${itemInfo.fullName}`;
    } else {
      if (bookInfo) {
        icon = bookInfo.icon;
        fullName = bookInfo.name;
      } else {
        icon = svg.render(item.item);
        fullName = itemInfo.fullName;
      }
    }

    let wowMsg = getFromList('wowMsgList');
    hint.target = tools.list.basket;
    hint.message = `${wowMsg} You just found<br/><b>${fullName}</b>`;
    hint.message += `<div class="hintIcon">${icon}</div>`;
    if (!hint.hintBasket) {
      hint.message += `Check your basket to see what you found`;
    }
    hint.hintBasket = true;
    hint.group = item.item;
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

};
