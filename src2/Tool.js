class Tool extends game.Item {
  constructor(toolName, x, y) {
    super(toolName, x, y, sprite.width, sprite.height, 'control');
    this.setup();
  }

  setup() {
    //this.sprite = this.getSprite();
    this.render();

    document.querySelector(`#i${this.id}`).addEventListener("click", () => {
      this.onClick();
    });

    return;

    this.sprite.addEventListener("keydown", (event) => {
      console.trace('setup?');
      //event.preventDefault();
      this.onClick();
    });

    this.sprite.addEventListener("keyup", (event) => {
      //event.preventDefault();
      this.onClickEnd();
    });
  }

  onClick = function () {
    console.log('default onclick');
  }

  onClickEnd = function () {
    console.log('default onclickEnd');
  }

};
