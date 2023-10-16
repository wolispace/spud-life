const customers = {
  list: [],
  qty: 0,
  done: 0,
  duration: 3,
  gap: 2000,


  find: function (qty) {
    dialog.hide();
    customers.qty = qty;
    customers.endItem = {
      x: buildings.list.cart.x - rnd(sprite.width / 2),
      y: (game.playerItem.h * sky.height) - game.playerItem.h
    };
    // add as many customers as we have qty
    let counter = 0;
    while (counter++ < qty) {
      let params = {
        id: `customer_${counter}`,
        x: sprite.width * (game.grid.x + 1),
        y: customers.endItem.y,
        w: sprite.width,
        h: sprite.height,
        qty: 1,
        classes: 'customer',
        svg: svg.renderPerson(character.randomBody()),
      }
      let customer = new Mobile(params);
      customer.fixPos();
      customers.list.push(customer);
    }
    customers.parade();
  },

  parade: function () {
    customers.list.forEach(customer => {
      let delay = (customer.qty * customers.gap) + rnd(customers.gap);
      setTimeout(customers.animateCustomer, delay, customer);
    });
  },

  animateCustomer: function (customer) {
    customers.onEnd = function () {
      customers.done++;
      if (customers.qty == customers.done) {
        customers.paradeEnd();
      }
    };
    customer.animatePath(customers);
  },

  paradeEnd: function () {
    customers.list.forEach(customer => {
      customer.remove();
    });
    customers.coins();
  },

  reset: function () {
    customers.list = [];
    customers.qty = 0;
    customers.done = 0;
  },

  // animate coins into basket
  coins: function () {
    let params = {
      x: buildings.list.cart.x,
      y: buildings.list.cart.y,
      svg: svg.render('gold'),
    };
    game.spriteBox = new game.Item(params);
    game.spriteBox.render();
    let endItem = tools.list.wallet;
    let onEnd = function () {
      game.spriteBox.remove();
      endItem.addQty(buildings.list.cart.income);
      game.save();
    };
    game.spriteBox.animateArc(endItem, onEnd);
  },

}