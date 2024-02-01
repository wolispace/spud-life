const reviews = {
  list: [
    "This is terrible",
    "Endearing. Played longer than I should have",
  ],

  show: function () {
    dialog.push();
    let title = `Reviews`;
    let content = `<div class="dialog-message-content">`;
    content += reviews.critics();
    content += `</div>`;

    let footer = ``;
    footer += `<div></div>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { reviews.hide(); };
    dialog.okButton = function () { reviews.hide() };
    dialog.render(title, content, footer);
  },

  hide: function () {
    dialog.hide();
    dialog.pop();
  },

  critics() {
    let html = '<div>What the critics are saying about Spud life:</div>';
    reviews.list.forEach((review) => {
      html += `<div class="quote"><q>${review}.</q></div>`;
    });

    return html;
  },

};

