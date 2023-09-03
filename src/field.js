const field = {
  log: [],
  rock: [],

  /*
  player.fields[0][0]["10,10,croquette,1", "100,200,log,1", "120,120,hole,4" 

  */

  decode: function (infoString) {
    let bits = infoString.split(',');
    return {x: bits[0], y: bits[1], item: bits[2], qty: bits[3]};
  },

  encode: function (itemInfo) {
    return `${itemInfo.x},${itemInfo.y},${itemInfo.item},${itemInfo.qty}`;
  },

  encodeAll: function (fieldList, encode = true) {
    let newFields = [];
    fieldList.forEach( (thisField) => {
      let newField = [];
      thisField.forEach((surface) => {
        let newSurface = [];
        surface.forEach((patch) => {
          let newPatch= encode ? field.encode(patch) : field.decode(patch);
          newSurface.push(newPatch);
        });
        newField.push(newSurface);
      });
      newFields.push(newField);
    });
    return newFields;
  },

  addRandom: function () {
    clearBody();
    // reset field data..
    player.fields[player.currentField] = [[], [], []];
    let layer = game.ABOVEGROUND; // 0 =  top, 1 to below
    for (let step = 0; step < qty; step++) {
      let x = rnd(containerBox.width - sprite.width);
      let y = rnd(containerBox.height - sprite.height);
      let qty = rnd(5) + 1;
      let item = rnd(2) == 1 ? 'log': 'rock';
      let log2 = {scale: 0.8};
      let itemSvg = svg.render(`${item}2`, 1, ''); 
      sprite.render(x, y, itemSvg, sprite.width * log2.scale, sprite.height * log2.scale, 'block');
      let itemInfo = { x: x, y: y, item: item, qty: qty};
      field[item][step] = itemInfo;
      player.fields[player.currentField][layer].push(itemInfo);
    }
  },
  
  redraw: function () {
    setContainerBox();
    clearBody();
    let layer = game.ABOVEGROUND;
    player.fields[player.currentField][layer].forEach((item) => {
      let log2 = {scale: 0.8};
      let itemSvg = svg.render(`${item.item}2`, 1, ''); 
      sprite.render(item.x, item.y, itemSvg, sprite.width * log2.scale, sprite.height * log2.scale, 'block');
    });
    setupThings();
  }
};

