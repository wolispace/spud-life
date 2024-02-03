const field = {

  /*
  player.fields[0][0]["10,10,croquette,1", "100,200,log,1", "120,120,hole,4" 

  */
  list: [],
  gridList: [],
  fieldHeight: 0,
  fieldWidth: 0,
  topNoSeed: 0,
  leftNoSeed: 0,

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
    game.setUid(params.id);
    if (!svg.imgList[params.item]) {
      let bookInfo = books.isBook(params.item);
      if (bookInfo) {
        params.svg =  bookInfo.icon;
      } else {
        params.svg = spuds.build(params.item);
      }
    }

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

  addField: function () {
    buildings.list.land.show();
    let newField = player.fields.length++;
    field.addRandom(newField);
  },

  init: function (layer = game.UNDERGROUND) {
    field.topNoSeed = (sprite.height * (sky.height + 0.5));
    field.leftNoSeed = (sprite.width * 3);
    if (layer == game.ABOVEGROUND) {
      field.fieldHeight = containerBox.height - (sprite.height * 2) - field.topNoSeed;
      field.fieldWidth = containerBox.width - sprite.width - field.leftNoSeed;
    } else {
      field.fieldHeight = containerBox.height - (sprite.height * 2);
      field.fieldWidth = containerBox.width;
    }
    //console.trace('init', field, layer);
  },

  // adds a log or a rock to the field
  addBlocker: function (fieldId, item) {
    let y = rnd(field.fieldHeight) + field.topNoSeed + rnd(sprite.height);
    let x = rnd(field.fieldWidth) + field.leftNoSeed;
    // if below controls allow full width
    if (y > field.topNoSeed + (sprite.height * 4)) {
      x = rnd(field.fieldWidth + field.leftNoSeed);
    }
    let qty = game.blockerHits;
    let params = {
      id: game.getUid(),
      x: x,
      y: y,
      w: sprite.width,
      h: sprite.height,
      qty: qty,
      classes: '',
      item: item,
      type: 'blocker',
      autoRender: (fieldId == player.currentField),

    }
    let newItem = new game.Item(params);
    //console.trace(params);
    player.fields[fieldId][game.ABOVEGROUND].push(newItem);
  },
  
  addRandom: function (fieldId) {
    field.init(game.ABOVEGROUND);
    // reset field data..
    player.fields[fieldId] = [[], [], []];

    let totalItems = field.totalItems();
    for (let step = 0; step < totalItems; step++) {
      let item = rnd(2) == 1 ? 'log' : 'rock';
      field.addBlocker(fieldId, item);
    }
    let layer = game.UNDERGROUND;
    field.init(layer);
    for (let step = 0; step < totalItems; step++) {
      let params = {
        id: game.getUid(),
        x: rnd(field.fieldWidth - sprite.width),
        y: rnd(field.fieldHeight - sprite.height) + (sprite.height * 2),
        w: sprite.width,
        h: sprite.height,
        qty: 1,
        autoRender: false,
      }
      // fieldId dictates how rare we get
      if (rnd(3) > 0) {
        params.qty = rnd(4) + 2;
        let itemInfo = spuds.select(fieldId);
        params.item = itemInfo.name;
        params.svg = spuds.build(itemInfo.name);
      } else {
        // use rarity to choose item
        let itemInfo = field.rarenessItem();
        params.item = itemInfo.name;
      }
      let newItem = new game.Item(params);
      player.fields[fieldId][layer].push(newItem);
    }
    // add any books for his field
    books.addAllToField(fieldId);
  },

  totalItems: function () {
    let totalItems = (game.grid.x * game.grid.y) / 5;
    if (isDev) {
      totalItems = 5;
    }

    return totalItems;
  },
  
  // return an items based on its rareness, defaulting to most common
  rarenessItem: function() {
    let counter = 0;
    let maxItems = list.buriable.length;
    while (counter < maxItems) {
      let itemInfo = list.buriable[counter];
      if (itemInfo && itemInfo.rareness) {
        
        if (rnd(itemInfo.rareness) < itemInfo.rareness/2) {
          return itemInfo;
        }
      } else {
        console.log('no rareness in', counter, itemInfo);
      }
      counter++;
    }

    return list.items.byName['bone'];
  },

  add: function (fieldId) {
    // add a spud if the field is not already at max capacity
    let layer = game.UNDERGROUND;
    if (player.fields[fieldId][layer].length >= field.totalItems()) {
      return;
    }
    field.init(layer);
    let params = {
      id: game.getUid(),
      x: rnd(field.fieldWidth - sprite.width),
      y: rnd(field.fieldHeight - sprite.height) + (sprite.height * 2),
      w: sprite.width,
      h: sprite.height,
      qty: rnd(4) + 2,
      autoRender: false,
    }

    let itemInfo = spuds.select(fieldId);
    params.item = itemInfo.name;
    params.svg = spuds.build(itemInfo.name); //svg.render('spud1');
    let newItem = new game.Item(params);
    player.fields[fieldId][layer].push(newItem);
  },

  addItem: function (fieldId) {
    // adds an item the player hasnt found yet.
    let layer = game.UNDERGROUND;
    if (player.fields[fieldId][layer].length >= field.totalItems()) {
      return;
    }
    field.init(layer);
    let params = {
      id: game.getUid(),
      x: rnd(field.fieldWidth - sprite.width),
      y: rnd(field.fieldHeight - sprite.height) + (sprite.height * 2),
      w: sprite.width,
      h: sprite.height,
      qty: 1,
      autoRender: false,
    }

    // what item has not been found yet and add it.
    let notFoundItemName = basket.firstNotFoundItemName(fieldId);
    if (notFoundItemName) {
      params.item = notFoundItemName;
      params.svg = svg.render(notFoundItemName);
      let newItem = new game.Item(params);
      player.fields[fieldId][layer].push(newItem);
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

  showAll() {
    dialog.hide();
    player.fields[player.currentField][game.UNDERGROUND].forEach((item) => {
      item.render();
    });
  },

  removeGrid() {
    // TODO move elements from dom and classes from field.gridList[]
  },

  redraw: function () {
    setContainerBox();
    clearWorld();
    field.refresh();
    setupThings();
    sky.refresh();
    field.grass();
    if (pet.currentField == player.currentField && player.day > pet.daysToPet) {
      pet.add();
    }
  },

  refresh: function () {
    player.fields[player.currentField][game.SURFACE].forEach((item) => {
      item.svg = svg.render('hole', game.holeLife);
      item.render();
      item.sprite.style.opacity = field.holeState(item);
      game.setUid(item.id);
    });
    player.fields[player.currentField][game.ABOVEGROUND].forEach((item) => {
      item.svg = svg.render(item.item);
      item.render();
      if (item.reduced !== true) {
        // scale down if not 5
        let itemQty = game.blockHits;
        if (item.qty < game.blockHits) {
          while (itemQty > item.qty) {
            item.reduceSize();
            itemQty--;
          }
          item.render();
        }
      }
      game.setUid(item.id);
    });
  },

  clear: function () {
    player.fields[player.currentField][game.SURFACE] = [];
    game.save();
    field.refresh();
  },

  holeState: function (item) {
    return item.qty / game.holeLife;
  },

  resize: function () {
    if (!player.g) {
      return;
    }
    let scale = {
      x: round((game.grid.x * sprite.width) / (player.g.x * player.g.w)),
      y: round((game.grid.y * sprite.height) / (player.g.y * player.g.h)),
    }

    player.fields.forEach((field) => {
      field.forEach((layer, index) => {
        layer.forEach((item) => {
          item.x *= scale.x;
          item.y *= scale.y;
          if (index < 2) {
            item.position();
          }
        });
      });
    });

  },

  roll: function () {
    player.fields.forEach((fieldSpace, fieldId) => {
      fieldSpace[game.SURFACE].forEach((item, index) => {
        item.qty--;
        if (item.qty <= 0) {
          item.remove();
          delete fieldSpace[game.SURFACE][index];
          field.add(fieldId);
          if (rnd(5) == 1) {
            field.addItem(fieldId);
          }
          player.reseed = true;
        } else {
          if (item.sprite) {
            item.sprite.style.opacity = field.holeState(item);
          } else {
            console.log('missing item', index, item);
          }
        }
      });
      // if we added at least one spud then also add one item they have not found yet
      if (player.reseed) {
        field.addItem(fieldId);
      }      
    });

    game.save();
  },

  grass: function () {
    let grassField = document.querySelector(`.grassField`);
    let grassHeight = sprite.height / 7;
    let params = {
      x: 1,
      y: sprite.height * sky.height - grassHeight,
      w: sprite.width * game.grid.x,
      h: sprite.height * game.grid.y - sky.height,
    }
    grassField.style.left = `${params.x}px`;
    grassField.style.top = `${params.y}px`;
    grassField.style.width = `${params.w}px`;
    grassField.style.height = `${params.h}px`;

    let guts = '';
    let paths = [];

    let i = 0;
    let maxGrass = game.grid.x * game.grid.y * 3;

    while (i++ < maxGrass) {
      let upper = (rnd(10) == 1) ? rnd(grassHeight) + grassHeight : rnd(params.h) + grassHeight;
      let clump = {
        x: rnd(params.w),
        y: upper,
        dx: 0,
        dy: 10,
        mx: 5,
        my: 5,
        gap: rnd(3) + 3,
        peek: grassHeight,
      };
      let top = {
        x: clump.x - rnd(3),
        y: clump.y - clump.my,
      }
      let path = `M${clump.x},${clump.y} ${top.x + halfRnd(3) / 2},${top.y - rnd(clump.peek)}`;

      clump.x += clump.gap;
      top.x = clump.x + halfRnd(3);

      path += ` M${clump.x},${clump.y} ${top.x},${top.y - clump.peek}`;

      clump.x += clump.gap;
      top.x = clump.x + rnd(3);

      path += ` M${clump.x},${clump.y}  ${top.x + halfRnd(3) / 2},${top.y - rnd(clump.peek)}`;

      paths.push({
        s: "stroke-width:2;stroke-linecap:round;stroke:darkgreen;",
        d: path,
      });
    }

    paths.forEach((path) => {
      // path
      if (path.d) {
        guts += `<path d="${path.d}" style="${path.s}" />`;
      }
    });

    let svgImg = `<svg class="grass" viewBox="0 0 ${params.w} ${params.h}">
    ${guts}
    </svg>`;

    grassField.innerHTML = svgImg;
  },

  change: function (direction) {
    player.currentField += (direction == 'right')? 1 : -1;
    if (player.currentField < 0 ) {
      player.currentField = 0;
    }
    field.redraw();
    controls.endInput();
    game.playerItem.look(direction);
    game.playerItem.x = (direction == 'right') ? 5 : (sprite.width * game.grid.x) - sprite.width - 6;
    game.playerItem.position();
    game.playerItem.resetIfCollides();
  }

};

