const field = {
  log: [], 
  rock: [], 
  spuds: [],

  addRandom: function () {
    clearBody();
    for (let step = 0; step < qty; step++) {
      let x = rnd(containerBox.width - sprite.width);
      let y = rnd(containerBox.height - sprite.height);
      let item = rnd(2) == 1 ? 'log': 'rock';
      let itemSvg = svg.render(`${item}2`, 1, ''); 
      let log2 = {scale: 0.8};
      sprite.render(x, y, itemSvg, sprite.width * log2.scale, sprite.height * log2.scale, 'block');
      field[item][step] = { x: x, y: y, q: 5};
    }
  },
  
  redraw: function () {
    setContainerBox();
    sprite.setSize();
    clearBody();
    let itemSvg = svg.render('log2', 1, ''); 
    let log2 = {scale: 0.8};
    field.log.forEach( (item) => {
      sprite.render(item.x, item.y, itemSvg, sprite.width * log2.scale, sprite.height * log2.scale, 'block');
    });
    setupThings();
  }
};

