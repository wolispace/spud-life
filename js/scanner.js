const scanner = {
  // show scanner dialog.. could be used to show where things are
  show: function (scanState) {
    player.scanState = scanState;
    let content = `<div class="dialog-message-content">`;
    content += `<div>Your scanner blinks if there is something underground near you.</div>`;
    content += `<div>You have a basic level ${player.scanLevel} scanner. This detects all squares directly next to you and under you.</div>`;
    content += `<div><button class="scan-off-${scanState}" onclick="scanner.show(false);">OFF</button>`;
    content += `<button class="scan-on-${scanState}" onclick="scanner.show(true);">ON</button>`;
    content += `<div><div>`;
    let title = "Scanner";
    let footer = `<button onclick="dialog.hide()">Ok</button>`;
    dialog.render(title, content, footer);
    scanner.check();
    state.save();
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
    player.scope.forEach((patchId) => {
        if (!inRange && scanner.checkPatches(field, player.pos + patchId)) {
        inRange = true;
      }
    });

    return inRange;
  },
  // look at a patch and return true if its got something buried
  checkPatches: (field, patchId) => {
    if (field[patchId] && (field[patchId].item || (field[patchId].spud && field[patchId].spud.qty > 0))) {
      return true;
    }
  },

}