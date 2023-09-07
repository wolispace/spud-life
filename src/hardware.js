const hardware = {
	id: 'hardware',
	x: 0,
	y: 0,
	render: function () {
		hardware.itemSvg = svg.render('hardware');
		console.log(game);
		hardware.x = ((game.grid.x - 4) * sprite.width) / 2;
		hardware.y = 1;
		hardware.w = sprite.width * 2;
		hardware.h = sprite.height * 2;
		sprite.render(hardware.id, hardware.x, hardware.y, hardware.itemSvg, hardware.w, hardware.h);
	}
};

