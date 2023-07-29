const customers = {
  qty: 0,
  meals: 0,
  income: 0,

  // show all of the customers for the night
  render: (qty = 0) => {
    customers.qty = qty > 0 ? qty : customers.qty;
    character.hide();
    let customerList = "";
    for (let id = 0; id < customers.qty; id++) {
      customerList += customers.build(id);
    }
    let element = document.querySelector(`#customerLine`);
    element.innerHTML = customerList;
    if (customers.qty > 0) {
      customers.animate();
    }
    sky.goDark();
  },

  /**
   * Returns the html of a customer for adding into the customerLine
   * @param {id} id
   * @returns
   */
  build: (id) => {
    // build a random customer
    let customerBody = character.randomBody();
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
    customerSprite.addEventListener("animationend", function handler() {
      customers.meals++;
      // when every customer has had their meal its time for bed 
      if (customers.qty == customers.meals) {
        customers.endSale();
      }
      this.removeEventListener("animationend", handler);
    });
  },
  endSale: () => {
    // let element = document.querySelector(`#customerLine`);
    // element.innerHTML = customerList;
    character.render();
    player.phase = 'night';
    customers.showMoney();
    tools.render();
    // turn light on in house

  },
  showMoney: function () {
    let startPatch = `#patch_6`;
    let endTool = `.tool-wallet`;
    let itemSvg = svg.render('gold');
    svg.animateArc(startPatch, endTool, itemSvg);
  },
  getIncome: function () {
    let msg = '';
    if (customers.qty) {
      msg = `<div>You sold ${customers.qty} meals and made $${customers.income}.</div>`;
    } else {
      msg = `<div>You didn't sell anything.</div>`;
    }
    // reset the customer numbers
    customers.qty = 0;
    customers.meals = 0;
    customers.income = 0;

    return msg;
  },
};


