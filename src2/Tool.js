class Tool extends game.Item {

  max = 0;
  list = {};
  state = true;

  constructor(params) {
    params.w = sprite.width;
    params.h = sprite.width;
    params.classes = 'control';
    params.item = params.id;
    params.autoRender = false;
    super(params);

    controls.renderControl(this);

    // setup always uses players values of current use and max uses, lists (for basket) and state (for scanner).
    if (player.tools[this.item]) {
      this.qty = player.tools[this.item].qty;
      this.max = player.tools[this.item].max;
      this.list = player.tools[this.item].list;
      this.state = player.tools[this.item].state;
    }
    this.updateMax();
    if (this.qty !== '') {
      this.renderQty();
    }
  }

  setup() {
    if (this.autoRender) {
      this.render();
    }
  }

  setQty(newQty) {
    this.qty = newQty;
    this.updateQty();
  }

  addQty(newQty) {
    this.qty = this.qty + parseInt(newQty);
    this.updateQty();
  }

  updateMax() {
    this.max = (this.qty >= this.max) ? this.qty : this.max;
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
    if (this.max > 0) {
      this.qty = this.max;
      this.updateQty();
    }
  }

  renderQty() {
    let html = `<div class="qty">${this.qty}</div>`;
    this.sprite.insertAdjacentHTML('beforeend', html);
  }

  updateQty() {
    this.updateMax();
    sprite.get(`${this.id} .qty`).innerHTML = this.qty;
    this.jiggle('down');
  }

  onClick = function () {
    // this gets overridden
    console.log('generic click');
  }

};
