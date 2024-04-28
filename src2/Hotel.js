class Hotel extends game.Item {

  field = 1;
  nameList = ['California', 'Kennebec', 'Cauliflower', 'Carrot', 'Cupcake', 'Cardiff', 'Clementine'];
  defaultName = 'California';
  findMax = 5;
  added = 0;
  rewardAmount = 200;
  restCost = 10;
  rested = false;
  restDelay = 500;

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
    super(params);
    player.hotelName = player.hotelName ?? this.defaultName;
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
    content += `<div>`;
    content += this.greet();
    content += this.quest();
    content += this.summary();
    content += this.restMsg();
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
      hint.show('hotelCheckout');
      return;
    }
    this.exit();
  }

  leave() {
    if (player.hotelName == "California") {
      hint.show('hotelLeave');
      return;
    }
    this.exit();
  }

  exit() {
    this.rested = false;
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

  greet() {
    return `The maitre d' ${getFromList('hotelGreetList')}`;
  }

  restMsg() {
    const restButton = `<button class="buttonize" onclick="buildings.list.hotel.rest()"> Rest </button>`;
    return `<div>${restButton} and refresh your tools for ${this.restCost}</div>`;
  }

  rest() {
    if (this.rested) {
      alert('You are well rested already. No charge.');
      return;
    } else {
      this.rested = true;
      // refresh tools
      tools.reset();
      // reduce money
      tools.list.wallet.addQty(0-this.restCost);
      game.save();
      // confirm
      setTimeout(() => {alert('Your feel refreshed and so to your tools!');}, this.restDelay);
    }
  }

  accept() {
    return `The maitre d' ${getFromList('hotelAcceptList')}`;
  }

  acceptSpuds() {
    let html = '';
    if (this.added > 0) {
      html += `<div><br/>${this.accept()}:</div>`;
      html += `<div class="quote"><q>`;
      if (this.findDone()) {
        html += `Wonderful. Thankyou for brining me all ${this.findMax} ${this.findName()}`;
        html += `. Here is ${this.rewardAmount} for your troubles.`;
      } else {
        html += `Wonderful. Thanks for bringing me ${this.added} ${this.findName()}`;
      }
      html += `</q></div>`;
    }
    return html;
  }

  quest() {
    if (this.foundAll()) {
      return  ``;
    }

    this.checkActive();
    this.addSpuds();
    let html = `<div class="quote"><q>`;
    html += `${getFromList('hotelMsgList')} `;
    if (player.findSpud != '') {
      html += `I need ${this.findMax} ${this.findName()}potatoes in a hurry.`;
    }
    html += `</q></div>`;
    html += this.acceptSpuds();

    return html;
  }

  findName() {
    let spudSvg = spuds.inline(player.findSpud);

    return `${player.findSpud} ${spudSvg}`;
  }
  
  summary() {
    let html = `<div class="quote"><q>`;
    if (this.foundAll()) {
      html += `Oh, well done!! You have found them all and made me so happy!`;
      confetti.render();
    } else if (this.findDone()) {
      this.addReward();
      this.checkActive();
      html += "I hope to see you again soon.";
    } else {
      let findLeft = this.findMax - player.hotel[player.findSpud];
      if (findLeft == this.findMax) {
        html += `Please bring me ${this.findMax} ${this.findName()}`;
      } else {
        html += `You just need to bring me ${findLeft} more.`;
      }
    }
    html += `</q></div>`;
    game.save();
    
    return html;
  }
  
  addReward() {
    player.findSpud = '';
    tools.list.wallet.addQty(this.rewardAmount);
  }

  checkActive() {
    if (player.findSpud && player.findSpud != '') {
      return;
    }
    player.findSpud = '';

    let rarenessList = spuds.rarenessList();
    rarenessList.forEach((spudName, _) => {
      if(player.hotel[spudName] < this.findMax && player.findSpud == '') {
        player.findSpud = spudName;
      }
    });
  }

  // returns true if we have found all spuds
  foundAll() {
    let count = 0;
    let found = 0;
    Object.entries(player.hotel).forEach(([_, qty]) => {
      count++;
      if (qty == this.findMax) {
        found++;
      }
    });

    return count == found;
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
    if (newQty > this.findMax) {
      excessQty = newQty - this.findMax;
    }

    this.added = this.added - excessQty;
    player.hotel[player.findSpud] += this.added;
    basket.add({ item: player.findSpud, qty: - this.added });
  }

  // return true if we have found all of this spud type
  findDone() {
    return player.hotel[player.findSpud] == this.findMax;
  }

  test() {
    if (isDev) {
      basket.add({ item: player.findSpud, qty: 3 });
    }
  }
};
