const customers = {
	list: [],
	qty: 0,
  done: 0,

	find: function (qty) {
		dialog.hide();
		customers.qty = qty;
		// add as many customers as we have qty
		let counter = 0;
		while (counter++ < qty) {
			let params = {
				id: `customer_${counter}`,
				x: sprite.width * (game.grid.x + 1),
				y: (game.playerItem.h * sky.height) - game.playerItem.h + 5,
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
			let endItem = {x: buildings.list.cart.x - rnd(sprite.width/2), y: customer.y};
			let delay = (rnd(4000 * customer.qty));
			setTimeout(customers.animatePath, delay, customer, endItem);
		});
	},

  paradeEnd: function () {
    console.log('end of customers');
    customers.list = [];
    customers.qty = 0;
    customers.done = 0;
  },

	makePath: function (startItem, endItem) {
		let startX = 0 + (startItem.w / 2);
		let startY = 0 + (startItem.h / 2);
		let endX = endItem.x - startItem.x + (startItem.w / 2);
		let endY = endItem.y - startItem.y + (startItem.h / 2);
		return `path('M ${startX},${startY} ${endX},${endY}')`;
    // TODO: we could add some jiggle to the path
		//return `path('M ${startX},${startY} ${endX+5},${endY} ${endX-3},${endY} ${endX+6},${endY} ${endX-4},${endY} ${endX},${endY} ${startX},${startY}')`;
	},

	animatePath(startItem, endItem, onEnd) {
		// slow start fast middle
		var easing = 'cubic-bezier(0, 0, .25, 0)';
		// slow and get faster
		//easing = 'cubic-bezier(0.3, 0, 1, 1)';
		//easing = 'ease-in';
		easing = 'linear';
		startItem.sprite.style.display = 'block';
		startItem.sprite.style.offsetPath = customers.makePath(startItem, endItem);
		startItem.sprite.style.offsetRotate = `0deg`;
		startItem.sprite.style.animation = `parade2 8s ${easing} 0s 1 normal forwards`;
		startItem.sprite.addEventListener("animationend", function handler() {
			let id = this.getAttribute('id').split('_')[1]-1;
      customers.done++;
      
      if(customers.qty == customers.done) {
        customers.paradeEnd();
      }

			// setTimeout(() => {customers.list[id].moveStep('right', 10);}, 1000 );
			// setTimeout(() => {customers.list[id].moveStep('left', 20);}, 2000 );
			// setTimeout(() => {customers.list[id].moveStep('right', 15);}, 3000 );
			// setTimeout(() => {customers.list[id].moveStep('left', 10);}, 4000 );
			// // this is the spriteBox
			// if (startItem) {
			// 	startItem.style.animation = 'none';
			// 	startItem.style.display = 'none';
			// 	if (typeof onEnd == "function") {
			// 		onEnd();
			// 	}
			// }
			this.removeEventListener("animationend", handler);
		});
	}


}