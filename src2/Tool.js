class Tool extends game.Item {
  constructor(toolName, x, y) {
    super(toolName, x, y, sprite.width, sprite.height, 'control');
    this.setup();
  }

  setup() {
    this.render();

    document.querySelector(`#i${this.id}`).addEventListener("click", () => {
      this.onClick();
    });
  }

  onClick = function () {
    console.log('default onclick');
  }

  onClickEnd = function () {
    console.log('default onclickEnd');
  }

};
