const cart = {
	id: 'cart',
	x: 0,
	y: 0,
	render: function () {
		cart.itemSvg = svg.render('cart');
		cart.x = (sprite.width * game.grid.x) - (sprite.width * 5);
		cart.y = 1;
		cart.w = sprite.width * 2;
		cart.h = sprite.height * 2;
		sprite.render(cart.id, cart.x, cart.y, cart.itemSvg, cart.w, cart.h);
	}
}