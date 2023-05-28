const customers = {
  qty: 10,

  // show all of the customers for the night
  render: (qty) => {
    customers.qty = qty;
    svg.hidePlayerSprite();
    let customerList = "";
    for (let id = 0; id < customers.qty; id++) {
      customerList += customers.build(id);
    }
    let element = document.querySelector(`#customerParade`);
    element.innerHTML += customerList;
    customers.animate();
  },

  /**
   * Returns the html of a customer for adding into the customerParade
   * @param {id} id
   * @returns
   */
  build: (id) => {
    // build a random customer
    let customerBody = randomBody();
    return (
      `<div class="customer" id="customer_${id}">` +
      svg.renderPerson(customerBody) +
      `</div>`
    );
  },
  /**
   * Wait some random time before running the animation on all playerSprites
   */
  animate: () => {
    for (let id = 0; id < customers.qty; id++) {
      // start the customers animation a variation on their position in the queue
      let interval = (1 + id) * 200 + rnd(1000);
      setTimeout(function () {
        customers.run(id);
      }, interval);
    }
  },

  /**
   * Run the animation for the customerSprite for 5 to 7 seconds in duration
   */
  run: (id) => {
    let customerSprite = document.querySelector(`#customer_${id}`);
    let duration = rnd(3) + 6;
    customerSprite.style.animation = `move-customer ${duration}s ease-in-out`;
  },
};
