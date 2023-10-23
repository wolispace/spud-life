const hint = {
  pointAt: null,
  body: null,
  arrow: null,
  message: '',
  okButton: '',
  group: '',
  defaultParams: {
    autoRender: false,
  },
  visible: false,

  setup: function () {
    // make two objects.. the body and the arrow
    if (!hint.body) {
      hint.defaultParams.svg = svg.render('blank', 1, '');
      hint.body = new game.Item(hint.defaultParams);
    }
    if (!hint.arrow) {
      hint.defaultParams.svg = svg.render('arrow', 1, '');
      hint.arrow = new game.Item(hint.defaultParams);
    }
  },

  render: function () {
    if (player.hinted[hint.group] || !player.hints) {
      hint.hide();
      return;
    }
    hint.visible = true;
  },

  hide: function () {
    hint.body.hide();
    hint.arrow.hide();
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
