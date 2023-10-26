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

    if (!hintBox) {
      addToBody(`
        <div class='hintArrow'></div>
        <div class='hintMsg'></div>
      `);
    }
    hint.arrow = document.querySelector(`.hintArrow`);
    hint.msg = document.querySelector(`.hintMsg`);
    hint.hide();
  },

  test: function () {
    dialog.hide();
    hint.target = buildings.list.home;
    hint.target = buildings.list.cart;
    //hint.target = tools.list.scanner;
    hint.render();
  },

  render: function () {
    if (player.hinted[hint.group] || !player.hints) {
      hint.hide();
      return;
    }
    hint.pointAt();
    hint.show();
  },

  pointAt: function () {
    let orient = hint.orient();
    let tCtr = hint.target.centre();
    console.log('orient', orient);
    let newPos = {
      x: tCtr.x,
      y: tCtr.y,
    }
    if (orient.x < 1) {
      newPos.x = newPos.x + hint.arrow.w;
    }
    if (orient.y > 1) {
      newPos.y = newPos.y - hint.arrow.h;
    }
    console.log(`newPos`, newPos);
    hint.arrow.style.left = `${newPos.x}px`;
    hint.arrow.style.top = `${newPos.y}px`;

  },
  
  // is the target < or > the centre of the world
  orient: function () {
    let worldCentre = {
      x: sprite.width * game.grid.x / 2,
      y: sprite.height * game.grid.y / 2,
    }
    console.log('ctr', worldCentre, hint.target.centre());

    return {
      x: (hint.target.centre.x < worldCentre.x) ? -1 : 1,
      y: (hint.target.centre.y < worldCentre.y) ? -1 : 1,
    }
  },

  hide: function () {
    hint.msg.style.display = 'none';
    hint.arrow.style.display = 'none';
  },

  show: function () {
    hint.msg.style.display = 'block';
    hint.arrow.style.display = 'block';
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
