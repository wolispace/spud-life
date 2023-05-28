const customers = {
  qty: 10,

  // show all of the customers for the night
  render: () => {
    let customerList = "";
    for (let id = 0; id < customers.qty; id++) {
      customers.add(id);
    }
    for (let id = 0; id < customers.qty; id++) {
      let interval = (1 + id) * 1000; // rnd(15000) + 500;
      setTimeout(function () {
        customers.run(id);
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
  },

  run: (id) => {
    console.log(id);
    let customerSprite = document.querySelector(`#customer_${id}`);
    let duration = 5; //rnd(30) + 3;
    customerSprite.style.animation = `move-customer ${duration}s ease-in-out`;
  },
};
