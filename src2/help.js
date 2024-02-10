const help = {
  content: [
    [
      'Use your spade [spade] to dig where you stand.',
      'Use your pick [pick] to or axe [axe] to break things.',
      'Move up [up] or click on buildings [home] to enter.',
      'Something [here] here.'
    ],
  ],

  setup: function () {
    let helpButton = document.querySelector('#ihelp');
    if (!helpButton) {
      let html = '<div id="ihelp" onclick="help.show();">?</div>';
      addToBody(html);
    }
  },

  show: function () {
    //dialog.push();
    let title = `Help with Spud Life`;
    let content = `<div class="dialog-message-content">`;
    content += help.page();
    content += `</div>`;

    let footer = ``;
    footer += `<button class="buttonize" onclick="aboutGame()"> About </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { change.hide(); };
    dialog.okButton = function () { change.hide() };
    dialog.render(title, content, footer);
  },

  hide: function () {
    dialog.hide();
    //dialog.pop();
  },

  page: function (num = 0) {
    let html = '';
    lists.raw.helpPage[num].forEach((msg) => {
      html += `<div class="hintRow">${help.parse(msg)}.</div>`;
    });
    return html;
  },

  parse: function (msg) {
    return msg.replace(/\[(.*?)\]/g, function (_, key) {
      return help.getSvg(key);
    });
  },

  getSvg: function (item) {
    let svgIcon = svg.inline(item, 2);
    if (svgIcon != '') {
      return svgIcon;
    } 
    // TODO: if its a spud or a book.. build one somehow
    return '';
  },

};
