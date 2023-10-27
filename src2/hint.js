const hint = {
  target: null,
  arrow: null,
  msg: null,
  message: '',
  okButton: '',
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
    hint.render(game.playerItem);
  },

  render: function (item) {
    hint.target = item;
    if (player.hinted[hint.group] || !player.hints) {
      hint.hide();
      return;
    }
    hint.pointAt();
    hint.show();
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

  show: function () {
    // align msg with arrow that is already pointing at the item
    hint.msg.style.top = ``
    if (hint.orient.x == -1) {
    };
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
