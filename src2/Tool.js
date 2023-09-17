class Tool extends game.Item {
  constructor(toolName, x, y, qty) {
    let toolWidth = sprite.width ;
    
    super(toolName, x, y, toolWidth, toolWidth, qty, 'control');
    this.setup();
  }

  setup() {
    this.render();
    if (this.qty !== '') {
      this.addQty();
    }

    this.sprite.addEventListener("click", () => {
      this.onClick();
    });
  }

  addQty() {
    let html = `<div class="qty">${this.qty}</div>`;
    this.sprite.insertAdjacentHTML('beforeend', html);
  }
  updateQty(qty) {
    this.qty = qty;
    sprite.get(`${this.id} .qty`).innerHTML = this.qty;
  }

  onClick = function () {
    // this gets overridden
  }

};
