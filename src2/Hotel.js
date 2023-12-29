class Hotel extends game.Item {
  
  field = 1;

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
    content += `<div>The Hotel ${buildings.list.hotel.nameSelector()}</div>`;
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

    player.hotelName = document.querySelector('#nameSelector option:checked').value;
    if (player.hotelName == "California") {
      hint.hotelCheckout();
      return;
    }
    buildings.list.hotel.exit();
  }

  leave() {
    player.hotelName = document.querySelector('#nameSelector option:checked').value;
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

  nameSelector() {
    let html = `<select id="nameSelector">`;
    let nameList = ['California', 'Kennebec', 'Cauliflower'];
    nameList.forEach(oneName => {
      let selected = player.hotelName == oneName ? 'selected' : '';
      html += `<option ${selected}>${oneName}</option>`;      
    });
    html += `</select>`;

    return html;
  }

  critics() {
    let html = '<div>What the critics are saying about Spud life:</div>';

    html += `<div><i>"This is terrible."</i></div>`;
    html += `<div><i>"Endearing. Played longer than I should have."</i></div>`;

    return html;

  }
};
