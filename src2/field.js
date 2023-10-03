const field = {

  /*
  player.fields[0][0]["10,10,croquette,1", "100,200,log,1", "120,120,hole,4" 

  */
  list: [],
  gridList: [],

  decode: function (infoString) {
    let bits = infoString.split(',');

    let params = {
      x: parseInt(bits[0]),
      y: parseInt(bits[1]),
      w: sprite.width,
      h: sprite.height,
      item: bits[2],
      qty: parseInt(bits[3]),
      id: parseInt(bits[4])
    };

    return new game.Item(params);
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
      let params = {
        id: id, x: x, y: y, w: sprite.width, h: sprite.height, qty: qty, classes: '', item: item
      }
      let newItem = new game.Item(params);
      player.fields[player.currentField][layer][id] = newItem;
      newItem.render(itemSvg);
    }
    layer = game.SURFACE;
    for (let step = 0; step < 1; step++) {
      let x = rnd(fieldWidth);
      let y = rnd(fieldHeight) + skyBottom;
      let qty = 5;
      let item = 'hole';
      let id = game.uid++;
      game.setUid(item.uid);
      let params = {
        id: id, x: x, y: y, 
        w: sprite.width, h: sprite.height, 
        qty: qty, classes: '', item: item,
      }
      let newItem = new game.Item(params);
      player.fields[player.currentField][layer].push(newItem);
      newItem.render();
    }
    layer = game.UNDERGROUND;
    let maxSpuds = list.spuds.list.length;
    let maxItems = list.items.list.length;
    for (let step = 0; step < 50; step++) {
      let params = {
        id: game.uid++, 
        x: rnd(fieldWidth), 
        y: rnd(fieldHeight) + skyBottom, 
        w: sprite.width, 
        h: sprite.height,
        qty: 1,
      }
      // player.currentField dictates how rare we get
      if (rnd(3) > 0) {
        params.qty = rnd(4) + 2;
        // TODO take rarity into account
        let itemInfo = spuds.select(); //list.spuds.list[rnd(maxSpuds)];
        params.item = itemInfo.name;
        params.svg = svg.render('spud1');
      } else {
        itemInfo = list.items.list[rnd(maxItems)];
        params.item = itemInfo.name;
      }
      game.setUid(params.id);
      player.fields[player.currentField][layer][params.id] = new game.Item(params);
    }
  },

  addGrid: function () {
    let index = 0;
    for (let x = 0; x < game.grid.x; x++) {
      for (let y = 0; y < game.grid.y; y++) {
        index++;
        let params = {
          id: `grid${index}`, 
          x: x * sprite.width, 
          y: y * sprite.height, 
          w: sprite.width, h: 
          sprite.height, qty: 1, classes: 'grid',
          item: 'blank',
        }
        field.gridList[index] = new game.Item(params);
      }
    }
  },

  removeGrid() {
    // TODO move elements from dom and classes from field.gridList[]
  },

  redraw: function () {
    setContainerBox();
    clearBody();
    field.refresh();

    setupThings();
  },

  refresh: function () {
    player.fields[player.currentField][game.SURFACE].forEach((item) => {
      item.svg = svg.render('hole', item.qty);
      item.render();
      game.setUid(item.id);
    });
    player.fields[player.currentField][game.ABOVEGROUND].forEach((item) => {
      item.svg = svg.render(item.item);
      item.render();
      game.setUid(item.id);
    });
  },

  clear: function () {
    player.fields[player.currentField][game.SURFACE] = [];
    game.save();
    field.refresh();
  },


};

