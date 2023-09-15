class Tool extends game.Item {
  constructor(toolName, x, y) {
    super(toolName, x, y, sprite.width, sprite.height, 'control');
    this.setup();
  }

  setup () {
    //this.sprite = this.getSprite();
    this.render();

    document.querySelector(`#i${this.id}`).addEventListener("click", () => {
      this.onClick();
    });

    return;
    
    let idx = `#i${this.id}`;
    let pick = document.querySelector("#ipick");
    console.log('pick', pick);
    this.thing.addEventListener("click", function(){
      console.log('clicked');
      tools.list['pick'].onClick;
    });
    console.log('tool setop', this, idx);
    

    let id = `#i${this.id}`;
    this.sprite = document.querySelector(id);
                  
    this.onClick = function () {alert('hi')};


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
