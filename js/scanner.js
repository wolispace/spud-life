const scanner = {
  show: function () {
    let content = `<div>Scanner level ${player.scanner}</div>`;
    let title = "Scanner";
    let footer = "";
    showDialog(title, content, footer);
  },
  check: function () {
    // show if spuds in range using current spud diviner
    let playerSprite = document.querySelector(`#playerSprite`);
    if (scanner.inRange()) {
        playerSprite.classList.add("inRange");
      } else {
        playerSprite.classList.remove("inRange");
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
  checkPatches: (field, patchId) => {
    if (field[patchId] && (field[patchId].item || (field[patchId].spud && field[patchId].spud.qty > 0))) {
      return true;
    }
  },

}