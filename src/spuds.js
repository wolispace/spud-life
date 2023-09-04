const spuds = {
  //generate the the complete random list of spuds for this session
  bits: {
    prefix: ["Bo", "Sa", "Ru", "Kri", "Ar"],
    middle: ["sa", "cho", "ma", "nal", "sso", "li"],
    suffix: ["lor", "ker", "pry", "ly", "der", "mid"],
    bestFor: [],
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
    rareness: [1, 2, 3, 4],
    rareNames: ["common", "standard", "fine", "rare"],
  },

  sprout: (qty) => {
    let counter = 0;
    spuds.bits.bestFor = spuds.bestForList();
    // used next element from array cycling back to the start so its not completely random.
    let colorCycle = rnd(spuds.bits.color.length);
    let rarityCycle = rnd(spuds.bits.rareness.length);
    let bestForCycle = rnd(spuds.bits.bestFor.length);
    let namedSpuds = [];
    while (counter++ <= qty) {
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
      // add into our universal list of items
      items[name] = {
        type: 'spuds',
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

  bestForList: function () {
    let bestForAll = list.machines.list.map((item) => { return item.initial.makes });

    return bestForAll.filter((value, index, array) => array.indexOf(value) === index);
  },

};