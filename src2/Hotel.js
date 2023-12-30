class Hotel extends game.Item {
  
  field = 1;
  nameList = ['California', 'Kennebec', 'Cauliflower'];

  constructor() {

    let params = {
      id: 'hotel',
      x: (game.grid.x * sprite.width / 2) - sprite.width,
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2,
      item: 'hotel',
      autoRender: false,
    };
    player.hotelName = player.hotelName ?? 'California';
    super(params);
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
    content += `<div>${buildings.list.hotel.buildNameSelect()}</div>`;
    content += buildings.list.hotel.critics();
    content += `</div>`;

    let footer = "";
    footer += `<button class="buttonize" onclick="buildings.list.hotel.checkout()"> Checkout </button>`;
    footer += `<button class="buttonize" onclick="dialog.cancel()"> Leave </button>`;
    dialog.cancelButton = function () { buildings.list.hotel.leave(); };
    dialog.render(title, content, footer);    
  }

  enterNighttime() {
    buildings.list.hotel.enterDaytime();
  }

  
  checkout() {
    if (player.hotelName == "California") {
      hint.hotelCheckout();
      return;
    }
    buildings.list.hotel.exit();
  }

  leave() {
    if (player.hotelName == "California") {
      hint.hotelLeave();
      return;
    }
    buildings.list.hotel.exit();
  }

  exit() {
    dialog.hide();
    buildings.exit();
  }

  buildNameSelect () {

    let selectName = `<div class="part part_name buttonize">`;
    selectName += `<div class="part-name">Name</div>`;
    if (buildings.list.hotel.nameList.length > 1) {
      selectName += `<div class="button buttonize" onclick="buildings.list.hotel.prevName()"><</div>`;
      selectName += `<div class="button buttonize" onclick="buildings.list.hotel.nextName()">></div>`;
    }
    selectName += `</div>`;

    return selectName;
  }

  nextName() {
    let oldName = player.hotelName;
    let pos = buildings.list.hotel.nameList.indexOf(player.hotelName) + 1;
    if (pos >= buildings.list.hotel.nameList.length) {
      pos = 0;
    };
    player.hotelName = buildings.list.hotel.nameList[pos];
    buildings.list.hotel.setName(oldName);
  }

  prevName() {
    let oldName = player.hotelName;
    let pos = buildings.list.hotel.nameList.indexOf(player.hotelName) - 1;
    if (pos < 0) {
      pos = buildings.list.hotel.nameList.indexOf(player.hotelName) - 1;
    };
    player.hotelName = buildings.list.hotel.nameList[pos];
    buildings.list.hotel.setName(oldName);
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
};
