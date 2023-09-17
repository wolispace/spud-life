const field = {

  /*
  player.fields[0][0]["10,10,croquette,1", "100,200,log,1", "120,120,hole,4" 

  */
 list: [],
 gridList: [],

  decode: function (infoString) {
    let bits = infoString.split(',');
    return { 
      x: parseInt(bits[0]),
      y: parseInt(bits[1]),
      w: sprite.width,
      h: sprite.height, 
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
    let layer = game.ABOVEGROUND;
    let fieldHeight = containerBox.height - sprite.height - skyBottom;
    let fieldWidth = containerBox.width - sprite.width;
    for (let step = 0; step < 15; step++) {
      let x = rnd(fieldWidth);
      let y = rnd(fieldHeight) + skyBottom;
      let qty = rnd(5) + 1;
      let item = rnd(2) == 1 ? 'log' : 'rock';
      let itemSvg = svg.render(`${item}2`, 1, '');
      let id = game.uid++;
      field.list[id] = new game.Item(id, x, y, sprite.width, sprite.height, qty, 'block');
      field.list[id].render(itemSvg);
      field.addItem(layer, x, y, sprite.width, sprite.height, item, qty, id);
    }
    layer = game.UNDERGROUND;
    let maxSpuds = list.spuds.list.length;
    let maxItems = list.items.list.length;
    for (let step = 0; step < 30; step++) {
      let x = rnd(fieldWidth);
      let y = rnd(fieldHeight) + skyBottom;
      let qty = 1; 
      let item = '';
      // player.currentField dictates how rare we get
      if (rnd(3) == 1 ) {
        qty = rnd(4) + 2;
        // TODO take rarity into account
        let itemInfo = list.spuds.list[rnd(maxSpuds)];
        item = itemInfo.name;
      } else {
        itemInfo = list.items.list[rnd(maxItems)];
        item = itemInfo.name;
      }
      let newBox = {
        width: sprite.width,
        height: sprite.height,
        uid: game.uid++,
      }
      field.addItem(layer, x, y, newBox.width, newBox.height, item, qty, newBox.uid);
    }
  },

  addItem: function (layer, x, y, width, height, item, qty, uid) {
    let itemInfo = { z: 0, x: x, y: y, w: width, h: height, width: width, height: height, item: item, qty: qty, uid: uid };
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
    let index = 0;
    for(let x = 0; x < game.grid.x; x++) {
      for(let y = 0; y < game.grid.y; y++) {
        let xx = x * sprite.width;
        let yy = y * sprite.height;
        index++;
        //sprite.render(`grid_${x}_${y}`, xx, yy, itemSvg, sprite.width, sprite.height, 'grid');
        field.gridList[index] = new game.Item(index, xx, yy, sprite.width, sprite.height, 1, 'grid');
        field.gridList[index].render();
      }
    }
  },

  removeGrid() {
   // TODO move elements from dom and classes from field.gridList[]
  },

  redraw: function () {
    setContainerBox();
    clearBody();

    let layer = game.ABOVEGROUND;
    player.fields[player.currentField][layer].forEach((item) => {
      let itemSvg = svg.render(`${item.item}2`, item.qty, '');
      let newBox = sprite.render(item.uid, item.x, item.y, itemSvg, sprite.width, sprite.height, 'block');
      item.width = newBox.width;
      item.height = newBox.height;
      game.setUid(item.uid);
    });
    layer = game.SURFACE;
    player.fields[player.currentField][layer].forEach((item) => {
      let itemSvg = svg.render(`hole`, item.qty, '');
      let newBox = sprite.render(item.uid, item.x, item.y, itemSvg, sprite.width, sprite.height, 'hole');
      item.width = newBox.width;
      item.height = newBox.height;
      game.setUid(item.uid);
    });
    setupThings();
  },

};

