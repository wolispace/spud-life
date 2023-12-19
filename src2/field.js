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
    game.setUid(params.id);
    if (!svg.imgList[params.item]) {
      params.svg = spuds.build(params.item); // svg.render('spud1');
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

  addRandom: function (fieldId) {
    let topNoSeed = (sprite.height * (sky.height + 0.5));
    let leftNoSeed = (sprite.width * 3);
    // reset field data..
    player.fields[fieldId] = [[], [], []];
    let layer = game.ABOVEGROUND;
    let fieldHeight = containerBox.height - (sprite.height * 2) - topNoSeed;
    let fieldWidth = containerBox.width - sprite.width - leftNoSeed;
    let totalItems = (game.grid.x * game.grid.y) / 3;
    for (let step = 0; step < totalItems; step++) {
      let y = rnd(fieldHeight) + topNoSeed + rnd(sprite.height);
      let x = rnd(fieldWidth) + leftNoSeed;
      // if below controls allow full width
      if (y > topNoSeed + (sprite.height * 4)) {
        x = rnd(fieldWidth + leftNoSeed);
      }
      let qty = game.blockerHits;
      let item = rnd(2) == 1 ? 'log' : 'rock';
      let params = {
        id: game.getUid(),
        x: x,
        y: y,
        w: sprite.width,
        h: sprite.height,
        qty: qty,
        classes: '',
        item: item,
        autoRender: false,
      }
      let newItem = new game.Item(params);
      player.fields[fieldId][layer].push(newItem);
    }
    layer = game.UNDERGROUND;
    fieldHeight = containerBox.height - (sprite.height * 2);
    fieldWidth = containerBox.width;
    let maxItems = list.buriable.length;
    totalItems = (game.grid.x * game.grid.y) / 5;
    for (let step = 0; step < totalItems; step++) {
      let params = {
        id: game.getUid(),
        x: rnd(fieldWidth),
        y: rnd(fieldHeight) + (sprite.height * 2),
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
        let itemInfo = list.buriable[rnd(maxItems)];
        params.item = itemInfo.name;
      }
      let newItem = new game.Item(params);
      player.fields[fieldId][layer].push(newItem);
    }
  },

  add: function (fieldId) {
    //console.log('add a new spud underground in field ', player);
    layer = game.UNDERGROUND;
    fieldHeight = containerBox.height - (sprite.height * 2);
    fieldWidth = containerBox.width;
    let params = {
      id: game.getUid(),
      x: rnd(fieldWidth),
      y: rnd(fieldHeight) + (sprite.height * 2),
      w: sprite.width,
      h: sprite.height,
      qty: 1,
      autoRender: false,
    }
    params.qty = rnd(4) + 2;
    let itemInfo = spuds.select(fieldId);
    params.item = itemInfo.name;
    params.svg = spuds.build(itemInfo.name); //svg.render('spud1');
    let newItem = new game.Item(params);
    player.fields[fieldId][layer].push(newItem);
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
      item.show();
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
      item.svg = svg.render('hole', 5);
      item.render();
      item.sprite.style.opacity = field.holeState(item);
      game.setUid(item.id);
    });
    player.fields[player.currentField][game.ABOVEGROUND].forEach((item) => {
      item.svg = svg.render(item.item);
      item.render();
      if (item.reduced !== true) {
        // scale down if not 5
        let itemQty = 5;
        if (item.qty < 5) {
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
      x: ((game.grid.x * sprite.width) / (player.g.x * player.g.w)),
      y: ((game.grid.y * sprite.height) / (player.g.y * player.g.h)),
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
          //console.log('removing blank hole', fieldId, index);
          field.add(fieldId);
          player.reseed = true;
        } else {
          if (item.sprite) {
            item.sprite.style.opacity = field.holeState(item);
          } else {
            console.log('missing item', index, item);
          }
        }
      });
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
    if (direction == 'right') {
      player.currentField++;
      player.x = 5;      
    } else {
      player.currentField--;
      player.x = (sprite.width * game.grid.x) - sprite.width - 6;
    }
    field.redraw();
    controls.endInput();
    game.playerItem.look(direction);
  }


};

