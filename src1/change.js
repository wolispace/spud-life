const change = {
  log: {
    "1.8.0": [
      "Added upgrades",
      ".1 - Only reseed spuds to max field capacity",
      ".2 - Prevent player getting stuck after exiting a building",
      ".3 - Upgrades added to potatadex, fix hints in dialog alignment",
      ".4 - Choose spade pos and refined no-click zones",
      ".5 - Celebrate first items dug and scan after touch move",
    ], 
    "1.7.0": [
      "Added changelog",
    ],
    "1.6.0": [
      "Books and library added",
    ],
    "1.5.0": [
      "Added hotel",
    ],
    "1.4.0": [
      "Move between fields at field edge not just sign",
    ],
    "1.3.0": [
      "Reworked basket counting logic",
    ],
    "1.3.0": [
      "Reworked basket counting logic",
    ],
    "1.2.0": [
      "No-click zone added behind movement buttons",
    ],
    "1.1.0": [
      "Only show hints every 5 hits of a rock/log",
    ],
  },

  show: function () {
    let title = `Change log`;
    let content = `<div class="dialog-message-content">`;
    content += change.summary();
    content += `</div>`;

    let footer = ``;
    footer += `<div></div>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render(title, content, footer);
  },

  summary: function () {
    let html = `<div class="changelog">`;
    Object.entries(change.log).forEach(([version, notes]) => {
      html += `<div>${version}<ul>`;
      notes.forEach((note, _) => {
        html += `<li>${note}</li>`;
      });
      html += `</ul>`;
    });
    html += `</div>`;
    return html;
  },





};

