const scanner = {
  // show scanner dialog.. could be used to show where things are
  show: function () {
    let content = `<div>Scanner level ${player.scanner}</div>`;
    let title = "Scanner";
    let footer = "";
    showDialog(title, content, footer);
  },
  // show if spuds in range using current level spud diviner
  check: function () {
    if (scanner.inRange()) {
      scanner.on();
    } else {
      scanner.off();
    }
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