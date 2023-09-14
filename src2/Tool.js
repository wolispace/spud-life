class Tool extends game.Item {
  constructor(toolName, x, y) {
    super(toolName, x, y, sprite.width, sprite.height, 'control');
    //this.setup();
  }

  setup () {
    //this.sprite = this.getSprite();
    this.render();
    this.sprite = document.querySelector(`#i${this.id}`);
    this.onClick = function () {alert('hi')};
    console.log(`#i${this.id}`);
    document.getElementById(`#i${this.id}`).addEventListener("click", function(){
      console.log('clicked');
    });

    console.trace('setup', this);
    if (true) {
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
  }


  onClick = function () {
    console.log('default onclick');
  }

  onClickEnd = function () {
    console.log('default onclickEnd');
  }

};
