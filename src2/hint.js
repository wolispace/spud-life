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
    hint.group = 'test';
    hint.okButton = 'hint.controls';
    hint.text = 'This is not a pipe. This is not a pipe. This is not a pipe. This is not a pipe. This is not a pipe. ';
    hint.render(game.playerItem);
  },
  controls: function () {
    hint.hide();
    console.log('blah');
  },

  render: function (item) {
    hint.target = item;
    if (player.hinted[hint.group] || !player.hints) {
      hint.hide();
      return;
    }
    let skipCheckbox = hint.buildSkip();
    let input = `<div class="hintButtons">${skipCheckbox}`;
    input += ` <button class="button buttonize" onclick="hint.confirm()">${hint.btnText}</button></div>`;
    hint.msg.innerHTML = `${hint.text} ${input}`;
    hint.pointAt();
    hint.showMsg();
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

};
