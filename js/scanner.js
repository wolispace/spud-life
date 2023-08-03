const scanner = {
  // show scanner dialog.. could be used to show where things are
  show: function (scanState) {
    if (hint.visible || dialog.visible) {
      return;
    }
    character.hide();
    player.scanState = scanState;
    let scannerCheckbox = scanner.checkbox();
    let resetCheckbox = dialog.makeCheckbox('resetHints', 'Reset hints. Do this if you have forgotten stuff', false);
 
    let levelDesc = scanner.levelDesc();

    let content = `<div class="dialog-message-content">`;
    content += `<div>Your scanner blinks if there is something underground near you.</div>`;
    content += `<div>You level ${player.scanLevel} scanner detects ${levelDesc[player.scanLevel]}.</div>`;
    content += `<div>The next upgrade will detect ${levelDesc[player.scanLevel+1]}.</div>`;
    content += `<div>You can Reset and start a new game any time.</div>`;
    content += `<div>You can Transfer your current progress to a new device.</div>`;
    
    content += `<div class="checkbox-list">`;
    content += `<div>${scannerCheckbox}</div>`;
    content += `<div>${resetCheckbox}</div>`;
    content += `<div><div>`;
    let title = "Scanner";
    let footer = '';
    footer += `<button class="buttonize" onclick="character.reset()"> Reset! </button>`;
    footer += `<button class="buttonize" onclick="aboutGame()"> About </button>`;
    footer += `<button class="buttonize" onclick="loadSave()"> Transfer </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.okButton = function () { scanner.save(); };
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.render(title, content, footer);
    scanner.check();
  },
  save: function () {
    player.scanState = dialog.isChecked(`#scannerCheckbox`);
    if (dialog.isChecked(`#resetHints`)) {
      player.hinted = {};
    };
    state.save();
    dialog.hide();
    character.render();
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
    let scanLevels = scanner.levels();

    let squares = scanLevels[player.scanLevel];
    return squares;
  },

  levels: function () {
    return [
      [],
      [-player.cols-1, -player.cols, -player.cols+1, -1, 0, 1, player.cols-1, player.cols, player.cols+1],
      [-player.cols, -1, 0, 1,  player.cols],
      [-1, 0, 1],
      [0],
    ];
  },

  levelDesc: function () {
    return [
      '',
      'all 8 patches around you as well as the one you stand on',
      'a plus shape: the patches above, below, left and right plus the one you stand on',
      'just the patches left and right plus the one you stand on',
      'just the patch you stand on',
      '.. oh wait.. there are no more upgrades. Well done!'
    ];
  },

  // look at a patch and return true if its got something buried
  checkPatches: (field, patchId) => {
    if (field[patchId] && (field[patchId].item || (field[patchId].spud && field[patchId].spud.qty > 0))) {
      return true;
    }
  },

};

