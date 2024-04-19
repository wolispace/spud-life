const change = {
  log: {
    "1.11.0": [
      "Clear url params so reloading doesn't redo last request",
      ".1 - Fixed missing hints",
      ".2 - Pet more inclined to look for items longer",
      ".3 - Can give more items as gifts to your pet",
      ".4 - Books don't break the game and pets are more eager to find things",
      ".5 - Hold off on hints if animating a dug item",
      ".6 - Clear hints by clicking outside and basket colours",
    ],
    "1.10.0": [
      "Added help dialog and reworked hints a bit",
      ".1 - Stop doubling up spud names",
    ],
    "1.9.0": [
      "Added hotel quests",
      ".1 - First dig books work now",
      ".2 - Added random night events",
      ".3 - Tap body part to select",
      ".4 - Pacing intro hints",
    ],    
    "1.8.0": [
      "Added upgrades",
      ".1 - Only reseed spuds to max field capacity",
      ".2 - Prevent player getting stuck after exiting a building",
      ".3 - Upgrades added to potatadex, fix hints in dialog alignment",
      ".4 - Choose spade pos and refined no-click zones",
      ".5 - Celebrate first items dug and scan after touch move",
      ".6 - Prevent moving while animating into basket",
      ".7 - Now an installable web app",
      ".8 - Clicking body in wardrobe doesn't try to dig",
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
    dialog.push();
    let title = `Change log`;
    let content = `<div class="dialog-message-content">`;
    content += change.summary();
    content += `</div>`;

    let footer = ``;
    footer += `<div></div>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { change.hide(); };
    dialog.okButton = function () { change.hide() };
    dialog.render(title, content, footer);
  },

  hide: function () {
    dialog.hide();
    dialog.pop();
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

