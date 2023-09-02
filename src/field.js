const field = {
  log: [],
  rock: [],

  /*
  player.fields[0]["10,10,croquette,1", "100,200,log,1", "120,120,hole,4" 

  */

  decode: function (infoString) {
    let bits = infoString.split(',');
    return {x: bits[0], y: bits[1], item: bits[2], qty: bits[3]};
  },

  encode: function (itemInfo) {
    return `${itemInfo.x},${itemInfo.y},${itemInfo.item},${itemInfo.qty}`;
  },

  addRandom: function () {
    clearBody();
    for (let step = 0; step < qty; step++) {
      let x = rnd(containerBox.width - sprite.width);
      let y = rnd(containerBox.height - sprite.height);
      let qty = rnd(5) + 1;
      let item = rnd(2) == 1 ? 'log': 'rock';
      let itemSvg = svg.render(`${item}2`, 1, ''); 
      let log2 = {scale: 0.8};
      sprite.render(x, y, itemSvg, sprite.width * log2.scale, sprite.height * log2.scale, 'block');
      let itemInfo = { x: x, y: y, item: item, qty: qty};
      field[item][step] = itemInfo;
      player.fields[player.currentField].push(itemInfo);
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

