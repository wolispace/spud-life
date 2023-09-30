class Tool extends game.Item {

  maxQty = 0;
  list = {};
  state = true;

  constructor(params) {
    params.w = sprite.width;
    params.h = sprite.width;
    params.classes = 'control';
    params.item = params.id;
    super(params);
  }

  setup() {
    this.render();
    // setup always uses players values of current use and max uses and other stuff (deciphered per tool like basket).
    if (player.tools[this.item]) {
      this.qty = player.tools[this.item].qty;
      this.maxQty = player.tools[this.item].max;
      this.list = player.tools[this.item].list;
      this.state = player.tools[this.item].state;
    }

    if (this.qty !== '') {
      this.addQty();
    }

    this.sprite.addEventListener("click", () => {
      this.onClick();
    });
  }

  updatePlayer() {
    player.tools[this.item][0] = this.qty ;
    player.tools[this.item][1] = this.maxQty;
  }

  setQty(newQty) {
    this.qty = newQty;
    this.updateQty();
  }

  incrQty() {
    this.qty = this.qty + game.tool.incrementQty;
    this.updateQty();
  }
  
  decrQty() {
    this.jiggle('up');
    this.qty = this.qty > 0 ? this.qty = this.qty - 1 : 0;
    this.updateQty();
  }
  
  resetQty() {
    this.qty = this.maxQty;
    this.updateQty();
  }
  
  addQty() {
    let html = `<div class="qty">${this.qty}</div>`;
    this.sprite.insertAdjacentHTML('beforeend', html);
  }
  
  updateQty() {
    this.maxQty = this.qty > this.maxQty ? this.qty : this.maxQty;
    sprite.get(`${this.id} .qty`).innerHTML = this.qty;
    this.updatePlayer();
  }
  
  onClick = function () {
    // this gets overridden
  }

};
