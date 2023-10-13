const customers = {
	list: [],
	qty: 0,

	find: function (qty) {
		dialog.hide();
		customers.qty = qty;
		// add as many customers as we have qty
		let counter = 0;
		while (counter++ < qty) {
			let params = {
				id: `customer_${counter}`,
				x: sprite.width * (game.grid.x + 2),
				y: (game.playerItem.h * sky.height) - game.playerItem.h + 5,
				w: sprite.width,
				h: sprite.height,
				qty: 1,
				svg: svg.renderPerson(character.randomBody()),
			}
			let customer = new Mobile(params);
			customers.list.push(customer);
		}
		setTimeout(customers.parade, 200);
	},

	parade: function () {
		dialog.hide();
		customers.list.forEach(customer => {
			let endItem = {x: buildings.list.cart.x + (buildings.list.cart.w / 2), y: customer.y};
			let delay = (rnd(5)* 1000) + 1000;
			setTimeout(customers.animatePath, delay, customer, endItem);
			//customers.animatePath(customer, endItem);
		});
	},

	makePath: function (startItem, endItem) {
		let startX = 0 + (startItem.w / 2);
		let startY = 0 + (startItem.h / 2);
		let endX = endItem.x - startItem.x + (startItem.w / 2);
		let endY = endItem.y - startItem.y + (startItem.h / 2);
    // M x,y x2,y2, {jiggle a bit} x,y
		return `path('M ${startX},${startY} ${endX},${endY}')`;
		return `path('M ${startX},${startY} ${endX+5},${endY} ${endX-3},${endY} ${endX+6},${endY} ${endX-4},${endY} ${endX},${endY} ${startX},${startY}')`;
	},

	animatePath(startItem, endItem, onEnd) {
		console.log(startItem, endItem);
		// slow start fast middle
		var easing = 'cubic-bezier(0, 0, .25, 0)';
		// slow and get faster
		//easing = 'cubic-bezier(0.3, 0, 1, 1)';
		//easing = 'ease-in';
		easing = 'linear';
		startItem.sprite.style.display = 'block';
		startItem.sprite.style.offsetPath = customers.makePath(startItem, endItem);
		startItem.sprite.style.offsetRotate = `0deg`;
		startItem.sprite.style.animation = `parade 3s ${easing} 0s 1 normal forwards`;
		startItem.sprite.addEventListener("animationend", function handler() {
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