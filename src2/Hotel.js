class Hotel extends game.Item {

  field = 1;
  nameList = ['California', 'Kennebec', 'Cauliflower'];
  findMax = 5;
  findDone = false;
  added = 0;
  foundAll = false;

  constructor() {
    let params = {
      id: 'hotel',
      x: (game.grid.x * sprite.width / 2) - sprite.width,
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2,
      item: 'hotel',
      autoRender: false,
      classes: 'building',
    };
    player.hotelName = player.hotelName ?? 'California';
    super(params);
    this.prepSpuds();
  }

  prepSpuds() {
    if (!player.hotel) {
      player.hotel = {};
    }
    Object.entries(player.spuds).forEach(([spudName, _]) => {
      if (!player.hotel[spudName]) {
        player.hotel[spudName] = 0;
      }
    });
  }

  enter() {
    if (player.daytime) {
      this.enterDaytime();
    } else {
      this.enterNighttime();
    }
  }

  enterDaytime() {
    let title = `Welcome to the Hotel ${player.hotelName}`;
    let content = `<div class="dialog-message-content">`;
    content += `<div class="hotelName">`;
    content += `<div class="left">`;
    content += this.buildNameSelect();
    content += `</div>`;
    content += `<div class="right"></div>`;
    content += `</div>`;
    content += this.quests();
    content += `<div class="paper">`;
    content += this.critics();
    content += `</div>`;
    content += `</div>`;

    let footer = "";
    if (isDev) {
      footer += `<button class="buttonize devButton" onclick="buildings.list.hotel.test()"> Test </button>`;
    }
    footer += `<button class="buttonize" onclick="buildings.list.hotel.checkout()"> Checkout </button>`;
    footer += `<button class="buttonize" onclick="dialog.cancel()"> Leave </button>`;
    dialog.cancelButton = function () { buildings.list.hotel.leave(); };
    dialog.render(title, content, footer);
  }

  enterNighttime() {
    this.enterDaytime();
  }

  checkout() {
    if (player.hotelName == "California") {
      hint.hotelCheckout();
      return;
    }
    this.exit();
  }

  leave() {
    if (player.hotelName == "California") {
      hint.hotelLeave();
      return;
    }
    this.exit();
  }

  exit() {
    dialog.hide();
    buildings.exit();
  }

  buildNameSelect() {
    let selectName = `<div class="part part_name buttonize">`;
    selectName += `<div class="part-name">Name</div>`;
    if (this.nameList.length > 1) {
      selectName += `<div class="button buttonize" onclick="buildings.list.hotel.prevName()"><</div>`;
      selectName += `<div class="button buttonize" onclick="buildings.list.hotel.nextName()">></div>`;
    }
    selectName += `</div>`;

    return selectName;
  }

  nextName() {
    let oldName = player.hotelName;
    let pos = this.nameList.indexOf(player.hotelName) + 1;
    if (pos >= this.nameList.length) {
      pos = 0;
    };
    player.hotelName = this.nameList[pos];
    this.setName(oldName);
  }

  prevName() {
    let oldName = player.hotelName;
    let pos = this.nameList.indexOf(player.hotelName) - 1;
    if (pos < 0) {
      pos = this.nameList.length - 1;
    };
    player.hotelName = this.nameList[pos];
    this.setName(oldName);
  }

  setName(oldName) {
    let titleElement = document.querySelector('.title');
    let title = titleElement.innerHTML;
    title = title.replace(oldName, player.hotelName);
    titleElement.innerHTML = title;
  }

  critics() {
    let html = '<div>What the critics are saying about Spud life:</div>';

    html += `<div><i>"This is terrible."</i></div>`;
    html += `<div><i>"Endearing. Played longer than I should have."</i></div>`;

    return html;
  }

  quests() {
    this.checkActive();
    this.addSpuds();
    let html = `<div class="dialog-message-groups">`;
    if (this.foundAll) {
      html += `<div>You have found them all!</div>`;
      confetti.render();
    } else {
      html += `<div>The matrade rushes up and says:</div>`;
      if (player.findSpud != '') {
        html += `<div><i>"I need ${this.findMax} ${player.findSpud} potatoes in a hurry.</i></div>`;
      }
      if (this.added > 0) {
        if (this.findDone) {
          html += `<div><i>&nbsp;Wonderful. Thanks for giving me ${this.added} ${player.findSpud}."</i></div>`;
        } else {
          html += `<div><i>&nbsp;Wonderful. Thankyou for giving me all ${this.findMax} ${player.findSpud}."</i></div>`;
          // add rewards
        }
      } else {
        html += `<div><i>&nbsp;Please find them for me."</i></div>`;
      }
      html += `<div>You have found ${this.showQty()} of the ${this.findMax} so far.</div>`;
      html += `</div>`;

      if (this.findDone) {
        player.findSpud = '';
        this.checkActive();
      }
    }
    game.save();
    return html;
  }

  showQty() {
    let qty = player.hotel[player.findSpud];
    return qty < 0 ? 0 : qty;
  }

  checkActive() {
    if (player.findSpud && player.findSpud != '') {
      return;
    }
    player.findSpud = '';

    // loop through spuds (in rareness order) and set findSpud as the first qty = 0
    Object.entries(player.hotel).forEach(([spudName, qty]) => {
      if (qty < this.findMax && player.findSpud == '') {
        player.findSpud = spudName;
      }
    });
    if (player.findSpud == '') {
      // we have found them all!
      this.foundAll = true;
    }


  }

  addSpuds() {
    this.added = tools.list.basket.list[player.findSpud] ?? 0;
    // check basket for current spud to find.. if any add them all up to max into hotel
    if (this.added > 0) {
      // we have required spuds to add..
      this.add();
    }
  }

  add() {
    let excessQty = 0;
    let newQty = player.hotel[player.findSpud] + this.added;
    console.log(player.findSpud, player.hotel[player.findSpud], this.added, newQty, excessQty);
    if (newQty > this.findMax) {
      excessQty = newQty - this.findMax;
    }

    this.added = this.added - excessQty;
    console.log(player.findSpud, this.added, newQty, excessQty);
    player.hotel[player.findSpud] += this.added;
    basket.add({ item: player.findSpud, qty: - this.added });
    this.findDone = excessQty >= 0;
  }

  test() {
    if (isDev) {
      basket.add({ item: player.findSpud, qty: 3 });
    }
  }
};
