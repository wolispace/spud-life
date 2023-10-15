
class Scanner extends game.Item {
  id = 'scanner';
  duration = 0.5;
  delay = 0;

  constructor() {
    super();
    this.setup();
  }

  setup() {
    // the bigger the player.scanLevel the smaller the distance from the player
    // 50 * 2 / 1
    this.scanDepth = sprite.width / player.scanLevel;
    this.setRange();
  }

  setRange() {
    this.scannerScreen = document.querySelector(`#scanner-screen`);
    this.x = game.playerItem.x - this.scanDepth;
    this.y = game.playerItem.y - this.scanDepth;
    this.w = game.playerItem.w + this.scanDepth;
    this.h = game.playerItem.h + this.scanDepth;
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
    }
  }

  on() {
    if (this.scannerScreen) {
      this.scannerScreen.style.animation = `glow ${this.duration}s ${this.delay}s linear infinite`;
    }
  }

  off() {
    if (this.scannerScreen) {
      this.scannerScreen.style.animation = null;
    }
  }

  render() {
    let title = "Scanner";
    let content = `<div class="dialog-message-content">`;
    content += `This is your scanner.`;
    content += `<br/>Scanner = ${player.scanState}`;
    let footer = "";
    footer += `<button class="buttonize" onclick="field.clear()"> Clear </button>`;
    footer += `<button class="buttonize" onclick="game.clear(true)"> Reset </button>`;
    footer += `<button class="buttonize" onclick="potatadex.show()"> Potatádex </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render(title, content, footer);
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
    scannerRange.style.display = "none";
  }
}
  
  