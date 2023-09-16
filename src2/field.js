const field = {

  /*
  player.fields[0][0]["10,10,croquette,1", "100,200,log,1", "120,120,hole,4" 

  */

  decode: function (infoString) {
    let bits = infoString.split(',');
    return { 
      x: parseInt(bits[0]),
      y: parseInt(bits[1]), 
      item: bits[2], 
      qty: parseInt(bits[3]), 
      uid: parseInt(bits[4]) };
  },

  encode: function (itemInfo) {
    return `${itemInfo.x},${itemInfo.y},${itemInfo.item},${itemInfo.qty},${itemInfo.uid}`;
  },

  encodeAll: function (fieldList, encode = true) {
    let newFields = [];
    fieldList.forEach((thisField) => {
      let newField = [];
      thisField.forEach((surface) => {
        let newSurface = [];
        surface.forEach((patch) => {
          let newPatch = encode ? field.encode(patch) : field.decode(patch);
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
    let skyBottom = (sprite.height * sky.height);
    // reset field data..
    player.fields[player.currentField] = [[], [], []];
    let layer = game.ABOVEGROUND; // 0 =  top, 1 to below
    let fieldHeight = containerBox.height - sprite.height - skyBottom;
    let fieldWidth = containerBox.width - sprite.width;
    for (let step = 0; step < qty; step++) {
      let x = rnd(fieldWidth);
      let y = rnd(fieldHeight) + skyBottom;
      let qty = rnd(5) + 1;
      let item = rnd(2) == 1 ? 'log' : 'rock';
      let itemSvg = svg.render(`${item}2`, 1, '');
      let newBox = sprite.render(game.uid++, x, y, itemSvg, sprite.width, sprite.height, 'block');
      field.addItem(layer, x, y, newBox.width, newBox.height, item, qty, newBox.uid);
    }
  },

  addItem: function (layer, x, y, width, height, item, qty, uid) {
    let itemInfo = { x: x, y: y, width: width, height: height, item: item, qty: qty, uid: uid };
    player.fields[player.currentField][layer].push(itemInfo);
  },

  updateItem: function (layer, x, y, width, height, qty, uid) {
    player.fields[player.currentField][layer].forEach((item) => {
      if (item.uid == uid) {
        item.x = x;
        item.y = y;
        item.width = width;
        item.height = height;
        item.qty = qty;
      }
    });
  },

  addGrid: function () {
    let itemSvg = svg.render('blank');
    for(let x = 0; x < game.grid.x; x++) {
      for(let y = 0; y < game.grid.y; y++) {
        let xx = x * sprite.width;
        let yy = y * sprite.height;
        sprite.render(`grid_${x}_${y}`, xx, yy, itemSvg, sprite.width, sprite.height, 'grid');
      }
    }
  },

  redraw: function () {
    setContainerBox();
    clearBody();

    let layer = game.ABOVEGROUND;
    player.fields[player.currentField][layer].forEach((item) => {
      let itemSvg = svg.render(`${item.item}2`, item.qty, '');
      let newBox = sprite.render(game.uid++, item.x, item.y, itemSvg, sprite.width, sprite.height, 'block');
      item.width = newBox.width;
      item.height = newBox.height;
    });
    layer = game.SURFACE;
    player.fields[player.currentField][layer].forEach((item) => {
      let itemSvg = svg.render(`hole`, item.qty, '');
      let newBox = sprite.render(game.uid++, item.x, item.y, itemSvg, sprite.width, sprite.height, 'hole');
      item.width = newBox.width;
      item.height = newBox.height;
    });
    setupThings();
  },

};

