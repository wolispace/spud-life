const scanner = {
  // show scanner dialog.. could be used to show where things are
  show: function (scanState) {
    player.scanState = scanState;
    let scannerCheckbox = scanner.checkbox();
    let content = `<div class="dialog-message-content">`;
    content += `<div>Your scanner blinks if there is something underground near you.</div>`;
    content += `<div>You have a basic level ${player.scanLevel} scanner. This detects all squares directly next to you and under you.</div>`;
    content += `<div>${scannerCheckbox}</div>`;
     content += `<div><div>`;
    let title = "Scanner";
    let footer = `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.okButton = function () { scanner.save(); };
    dialog.render(title, content, footer);
    scanner.check();
  },
  save: function () {
    let chk = document.querySelector(`#scannerCheckbox`);
    player.scanState = chk.checked;
    state.save();
  },
  checkbox: function () {
    let checked = player.scanState ? 'checked' : '';
    let scannerCheckbox = `<span class="checkboxSpan">`;
    scannerCheckbox += `<input type="checkbox" id="scannerCheckbox" ${checked} />`;
    scannerCheckbox += `<label class="checkboxLabel" for="scannerCheckbox">Enable scanner </label></span>`;

    return scannerCheckbox;
  },
  // show if spuds in range using current level spud diviner
  check: function () {
    if (player.scanState) {
      if (scanner.inRange()) {
        scanner.on();
      } else {
        scanner.off();
      }
    } else {
      scanner.off();
    }
  },
  // stet the state to true or false
  setState: function (state) {
    player.scanState = state;
  },

  on: function () {
    let scannerIcon = document.querySelector(`#scanner-screen`);
    if (scannerIcon) {
      scannerIcon.classList.add("inRange");
      let duration = 0.5;
      let delay = 0;
      scannerIcon.style.animation = `glow ${duration}s ${delay}s linear infinite`;
    }
  },
  off: function () {
    let scannerIcon = document.querySelector(`#scanner-screen`);
    if (scannerIcon) {
      scannerIcon.classList.remove("inRange");
      scannerIcon.style.animation = null;
    }
  },

  // returns true if there is a spud in range 'spud diviner' of the current pos
  // upgrades to the scanner will reduce the range:      
  // focus 1=kings squares, 2=plus, 3=horizontal, 4=infront.
  inRange: function () {
    let field = player.fields[player.currentField];
    let inRange = false;
    let scope = scanner.scope();
    scope.forEach((patchId) => {
        if (!inRange && scanner.checkPatches(field, player.pos + patchId)) {
        inRange = true;
      }
    });
    return inRange;
  },
  scope: function () {
    // cos is a global defined in player.js
    // depending on player.scanLevel (scan level 0 is off, 1 is full area.)
    let scanLevels = [
      [],
      [-cols-1, -cols, -cols+1, -1, 0, 1, cols-1, cols, cols+1],
      [-cols, -1, 0, 1,  cols],
      [-1, 0, 1],
      [0],
    ];
    let squares = scanLevels[player.scanLevel];
    return squares;
  },
  // look at a patch and return true if its got something buried
  checkPatches: (field, patchId) => {
    if (field[patchId] && (field[patchId].item || (field[patchId].spud && field[patchId].spud.qty > 0))) {
      return true;
    }
  },

}