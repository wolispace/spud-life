const field = {

  /*
  player.fields[0][0]["10,10,croquette,1", "100,200,log,1", "120,120,hole,4" 

  */
  list: [],
  gridList: [],

  decode: function (infoString) {
    let bits = infoString.split(',');

    let temp = {
      x: parseInt(bits[0]),
      y: parseInt(bits[1]),
      w: sprite.width,
      h: sprite.height,
      item: bits[2],
      qty: parseInt(bits[3]),
      id: parseInt(bits[4])
    };

    return new game.Item(temp.id, temp.x, temp.y, temp.w, temp.h, temp.qty, '', temp.item);
  },


  encode: function (itemInfo) {
    return `${itemInfo.x},${itemInfo.y},${itemInfo.item},${itemInfo.qty},${itemInfo.id}`;
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
      let qty = 5;
      let item = rnd(2) == 1 ? 'log' : 'rock';
      let itemSvg = svg.render(`${item}2`, 1, '');
      let id = game.uid++;
      game.setUid(item.uid);
      let newItem = new game.Item(id, x, y, sprite.width, sprite.height, qty, '', item);
      player.fields[player.currentField][layer][id] = newItem;
      newItem.render(itemSvg);
      //field.addItem(layer, x, y, sprite.width, sprite.height, item, qty, id);
    }
    layer = game.UNDERGROUND;
    let maxSpuds = list.spuds.list.length;
    let maxItems = list.items.list.length;
    for (let step = 0; step < 30; step++) {
      let x = rnd(fieldWidth);
      let y = rnd(fieldHeight) + skyBottom;
      let qty = 1;
      let itemName = '';
      // player.currentField dictates how rare we get
      if (rnd(3) == 1) {
        qty = rnd(4) + 2;
        // TODO take rarity into account
        let itemInfo = list.spuds.list[rnd(maxSpuds)];
        itemName = itemInfo.name;
      } else {
        itemInfo = list.items.list[rnd(maxItems)];
        itemName = itemInfo.name;
      }
      let newBox = {
        w: sprite.width,
        h: sprite.height,
        id: game.uid++,
      }
      game.setUid(newBox.id);
      let newItem = new game.Item(newBox.id, x, y, newBox.w, newBox.h, qty, '', itemName);
      player.fields[player.currentField][layer][newBox.id] = newItem;
    }
  },

  addGrid: function () {
    let itemSvg = svg.render('blank');
    let index = 0;
    for (let x = 0; x < game.grid.x; x++) {
      for (let y = 0; y < game.grid.y; y++) {
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
      let itemType = item.item;
      let itemKey = `${itemType}2`;
      let itemSvg = svg.render(itemKey);
      item.render(itemSvg);
      game.setUid(item.id);
    });
    layer = game.SURFACE;
    player.fields[player.currentField][layer].forEach((item) => {
      let itemSvg = svg.render('hole');
      item.render(itemSvg);
      game.setUid(item.id);
    });
    setupThings();
  },


};

