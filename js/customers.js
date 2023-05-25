const customers = {
  qty: 10,

  // show all of the customers for the night
  render() {
    let customerList = "";
    for (let customer = 0; customer < customers.qty; customer++) {
      // build a random customer
      let customerBody = randomBody();

      customerList +=
        `<div class="customer" id="customer_${customer}">` +
        svg.renderPerson(customerBody) +
        `</div>`;
    }
    let element = document.querySelector(`#customerParade`);
    element.innerHTML = customerList;
  },

  move() {
    for (let customer = 0; customer < customers.qty; customer++) {
      let element = document.querySelector(`#customer_${customer}`);
      svg.animate(element, `move-customer`, 10 + customer);
    }
  },
};
