class Tool extends game.Item {
  constructor(params) {
    params.w = sprite.width;
    params.h = sprite.width;
    params.classes = 'control';
    params.item = params.id;
    super(params);
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
