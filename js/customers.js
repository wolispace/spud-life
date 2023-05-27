const customers = {
  qty: 10,

  // show all of the customers for the night
  render: () => {
    let customerList = "";
    for (let id = 0; id < customers.qty; id++) {
      let interval = rnd(15000) + 500;
      setTimeout(function () {
        customers.add(id);
      }, interval);
    }
  },

  add: (id) => {
    // build a random customer
    let customerBody = randomBody();

    let customerHtml =
      `<div class="customer" id="customer_${id}">` +
      svg.renderPerson(customerBody) +
      `</div>`;

    let element = document.querySelector(`#customerParade`);
    element.innerHTML += customerHtml;
    let speed = rnd(30) + 3;
    element = document.querySelector(`#customer_${id}`);
    svg.animate(element, `move-customer`, speed);
    //console.log(`added ${id} speed ${speed} `);
  },
};
