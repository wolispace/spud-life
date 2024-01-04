class Library extends game.Item {
  
  field = 2;

  constructor() {

    let params = {
      id: 'library',
      x: (game.grid.x * sprite.width / 2) - sprite.width,
      y: 1,
      w: sprite.width * 2,
      h: sprite.width * 2,
      item: 'library',
      autoRender: false,
    };
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
    let title = `Public Library`;
    let content = `<div class="dialog-message-content">`;
    content += `<div>TODO: Return library books here..</div>`;
    content += books.listBooks();
    content += `</div>`;

    let footer = "";
    footer += `<button class="buttonize" onclick="books.test()"> Test </button>`;
    footer += `<button class="buttonize" onclick="dialog.cancel()"> Exit </button>`;
    dialog.cancelButton = function () { buildings.list.library.exit(); };
    dialog.render(title, content, footer);    
  }

  enterNighttime() {
    buildings.list.library.enterDaytime();
  }

  exit() {
    dialog.hide();
    buildings.exit();
  }

};
