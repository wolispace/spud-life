class Tool extends game.Item {
  constructor(toolName, x, y, qty) {
    let toolWidth = sprite.width ;
    
    super(toolName, x, y, toolWidth, toolWidth, qty, 'control');
    this.setup();
  }

  setup() {
    this.render();
    this.addQty();


    document.querySelector(`#i${this.id}`).addEventListener("click", () => {
      this.onClick();
    });
  }

  addQty = function () {
    let html = `<div class="qty">${this.qty}</div>`;
    document.querySelector(`#i${this.id}`).insertAdjacentHTML('beforeend', html);
  }

  onClick = function () {
    console.log('default onclick');
  }

  onClickEnd = function () {
    console.log('default onclickEnd');
  }

};
