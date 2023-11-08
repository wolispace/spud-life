
class Scanner extends game.Item {
  id = 'scanner';
  duration = 0.5;
  delay = 0;

  constructor() {
    super();
    this.setup();
  }

  setup() {
    // the bigger the player.scanLevel the larger the distance from the player
    // decrease by one part of a grid - start at 4
    this.scanDepth = parseInt(sprite.width / game.maxScan) * tools.list.scanner.qty;
    this.setRange();
  }

  upgrade() {
    tools.list.scanner.addQty(-1);
    this.setup();
  }

  setRange() {
    this.scannerScreen = document.querySelector(`#scanner-screen`);
    this.x = game.playerItem.x - this.scanDepth;
    this.y = game.playerItem.y - this.scanDepth;
    this.w = game.playerItem.w + (this.scanDepth * 2);
    this.h = game.playerItem.h + (this.scanDepth * 2);
  }

  scan() {
    if (player.scanState) {

      this.setRange();
      let spritesList = player.fields[player.currentField][game.UNDERGROUND];
      let foundItem = null;

      spritesList.forEach((spriteBox, index) => {
        if (!foundItem && this.collides(spriteBox)) {
          foundItem = spriteBox;
        }
      });

      if (foundItem) {
        if (isDev) {
          this.showRange(foundItem);
        }
        this.on();
      } else {
        if (isDev) {
          this.hideRange();
        }
        this.off();
      }
    } else {
      this.off();
    }
  }

  on() {
    if (this.scannerScreen) {
      if (!player.hinted['scanner'] && player.hints) {
        hint.scanner();
      }
      this.scannerScreen.style.animation = `glow ${this.duration}s ${this.delay}s linear infinite`;
    }
  }

  off() {
    if (this.scannerScreen) {
      this.scannerScreen.style.animation = null;
    }
  }

  render() {
    let title = "Your scanner";
    let content = `<div class="dialog-message-content">`;
    content += `<div>Upgrade your scanner to be more precise in the hardware store.</div>`;
    content += `<div>'Show' scanner range and check what you have found in the 'Potatedex' Gotta find them all!</div>`;
    let footer = "";
    if (isDev) {
      content += dialog.makeCheckbox("scanOn", "Turn scanner on/off", player.scanState);
      content += dialog.makeCheckbox("hintsOn", "Show hints on/off", player.hints);
      footer += `<button class="buttonize" onclick="game.clear(true)"> Reset </button>`;
    }
    footer += `<button class="buttonize" onclick="scanner.showScanner()"> Show </button>`;
    footer += `<button class="buttonize" onclick="potatadex.show()"> Potatádex </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = scanner.closeDialog;
    dialog.okButton = scanner.closeDialog;
    dialog.render(title, content, footer);
  }

  closeDialog() {
    player.scanState = dialog.isChecked("scanOn");
    player.hints = dialog.isChecked("hintsOn");
    dialog.hide();
    game.save();
    scanner.scan();
  }

  showScanner() {
    dialog.hide();
    this.showRange(this);
    setTimeout(this.hideRange, 1500);
  }

  showRange(itemInfo) {
    let scannerRange = document.querySelector(`#scanner-range`);
    if (!scannerRange) {
      addToBody(`<div id="scanner-range"></div>`);
      scannerRange = document.querySelector(`#scanner-range`);
    }
    scannerRange.style.display = "block";
    scannerRange.style.top = `${itemInfo.y}px`;
    scannerRange.style.left = `${itemInfo.x}px`;
    scannerRange.style.width = `${itemInfo.w}px`;
    scannerRange.style.height = `${itemInfo.h}px`;
  }

  hideRange() {
    let scannerRange = document.querySelector(`#scanner-range`);
    if (!scannerRange) {
      addToBody(`<div id="scanner-range"></div>`);
      scannerRange = document.querySelector(`#scanner-range`);
    }
    svg.animate(scannerRange, 'shrink', 1, function () {
      scannerRange.style.display = 'none';
    });
  }
}

