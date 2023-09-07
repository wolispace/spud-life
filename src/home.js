const home = {
	id: 'home',
	x: 0,
	y: 0,
	render: function () {
    home.itemSvg = svg.render('home');
		home.x = sprite.width;
    home.y = 1;
		home.w = sprite.width * 2;
		home.h = sprite.height * 2;
		sprite.render(home.id, home.x, home.y, home.itemSvg, home.w, home.h);
	}
}