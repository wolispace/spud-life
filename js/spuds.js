const spuds = {
  //generate the the complete random list of spuds for this session
  bits: {
    prefix: ["Bo", "Sa", "Ru", "Kri", "Ar"],
    middle: ["sa", "cho", "ma", "nal", "sso", "li"],
    suffix: ["lor", "ker", "pry", "ly", "der", "mid"],
    bestFor: ["chips", "baked potatoes", "curly-fries", "soup"],
    color: [
      "white",
      "brick",
      "wheat",
      "teal",
      "orange",
      "maroon",
      "black",
      "navy",
      "pink",
      "purple",
      "red",
    ],
    showColors: ["white", "orange", "black", "pink", "purple", "red"],
    rareness: [1,2,3,4],
    rareNames: ["common", "standard", "fine", "rare"],
  },

  sprout: (qty) => {
    let counter = 0;
    // used next element from array cycling back to the start so its not completely random.
    let colorCycle = rnd(spuds.bits.color.length);
    let rarityCycle = rnd(spuds.bits.rareness.length);
    let bestForCycle = rnd(spuds.bits.bestFor.length);
    let namedSpuds = [];
    while (counter < qty) {
      let name = spuds.bits.prefix[rnd(spuds.bits.prefix.length)];
      name += spuds.bits.middle[rnd(spuds.bits.middle.length)];
      while (namedSpuds.includes(name)) {
        name += spuds.bits.middle[rnd(spuds.bits.middle.length)];
      }
      namedSpuds.push(name);
      if (rnd(3) > 1) {
        name += spuds.bits.suffix[rnd(spuds.bits.suffix.length)];
      }

      let colorName = spuds.bits.color[colorCycle];
      let rarityName = spuds.bits.rareNames[rarityCycle];
      let fullName = rnd(3) > 1 ? `${rarityName} ` : "";
      if (spuds.bits.showColors.includes(colorName)) {
        fullName += `${colorName} `;
      }
      fullName += name;
      // uppercase first letter
      fullName = fullName.charAt(0).toUpperCase() + fullName.slice(1);

      let svgInfo = svg.imgList["spud"];

      player.spuds[counter++] = {
        name: name,
        fullName: fullName,
        color: colorName,
        rareness: rarityCycle,
        bestFor: spuds.bits.bestFor[bestForCycle],
        path: svg.jiggle(svgInfo.paths[0].d, 3),
      };
      // roll on to next item in the list so everyone gets at least one of everything
      colorCycle = ++colorCycle >= spuds.bits.color.length ? 0 : colorCycle;
      rarityCycle = ++rarityCycle >= spuds.bits.rareness.length ? 0 : rarityCycle;
      bestForCycle =
        ++bestForCycle >= spuds.bits.bestFor.length ? 0 : bestForCycle;
    }
  },
  // selling the meals from the machines
  sell: () => {
    dialog.hide();
    let totalMeals = 0;
    let totalIncome = 0;

    // loop through all machines
    // if machine has spuds in its hopper
    // convert spuds into food (hopper.qty x spud.price)
    Object.entries(player.shop.machines).forEach(([machineName, machine]) => {
      if (machine.hopper) {
        Object.entries(machine.hopper).forEach(([spudName, spudQty]) => {
          let spudInfo = player.spuds.filter((spud) => spud.name == spudName);
          let bonus = (machine.makes = spudInfo.bestFor) ? 2 : 1;
          let salePrice = machine.pricePerItem * bonus * spudQty;
          totalMeals = totalMeals + spudQty;
          totalIncome = totalIncome + salePrice;
        });
        // empty the machine
        machine.hopper = {};
      }
    });

    // inform the customers so they know how many to parade
    customers.qty = totalMeals;
    customers.income = totalIncome;

    customers.render();
    state.save();

  },

  // move spuds from sack to machine hoppers
  move: (spudName, spudQty) => {
    let machine = player.shop.machines[player.shop.selected];

    if (!machine.hopper[spudName]) {
      machine.hopper[spudName] = 0;
    }
    let existing = machine.hopper[spudName];

    machine.hopper[spudName] = spudQty + existing;
    player.sack[spudName] -= spudQty;

    sack.render();
    machines.renderHopper(player.shop.selected);
  },

  // draw a variety of potato in a predictable way
  render: (spudName, style = "") => {
    let spudInfo = player.spuds.filter((spud) => spud.name == spudName)[0];
    let svgInfo = svg.imgList["spud"];
    let svgClass = svgInfo.class;
    svgClass = svg.setClass(svgClass, "spud");
    let highlight = svg.highlight();
    let paths = "";
    svgInfo.paths.forEach((path, index) => {
      let onePath = spudInfo.path;
      let svgCls = path.c ? `${svgClass}-${path.c}` : svgClass;

      let svgStyle =
        index > -1
          ? ` style="fill:${spudInfo.color}; stroke:${spudInfo.color}" `
          : "";
      paths += `<path class="${svgCls}" ${svgStyle}
        d="${onePath}" />`;
    });

    return svg.wrap(svgClass, style, `${paths}${highlight}`);
  },
  // find a spud that is within our rareness range for the field
  // field 0 can have spuds 0 and 1
  // field 1 can have spuds 0, 1 and 2 etc..
  // since spud rareness is max 3, all fields > 2 have all rareness spuds
  byRareness: function (rareness) {
    let spud = player.spuds[rnd(player.spuds.length)];
    while (spud.rareness > rareness) {
      spud =  player.spuds[rnd(player.spuds.length)];
    }
    
    return spud;
  },

  // animate an item being dug up into the basket
  animate: (patch) => {
    let startPatch = `#${patch.id}`;
    let endTool = `.tool-basket`;
    let itemSvg = fields.getPatchSvg(patch);
    let onEnd = function () { hint.dugItem(); };
    let item = hardware.items[patch.item];
    if (item) {
      item.id = patch.item;
      if (item.type == 'tool') {
        onEnd = function () { hint.dugTool(item); };
        endTool = `.tool-${patch.item}`;
      } else if (item.type == 'machine') {
        onEnd = function () { hint.dugMachine(item); };
        endTool = `#patch_6`;
      } 
    }
    svg.animateArc(startPatch, endTool, itemSvg, onEnd);
  }
};

