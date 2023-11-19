const spuds = {
  recordDelim: '^',
  fieldDelim: '|',

  //generate the the complete random list of spuds for this session
  bits: {
    prefix: ["Bo", "Sa", "Ru", "Kri", "Ar"],
    middle: ["sa", "cho", "ma", "nal", "sso", "li"],
    suffix: ["lor", "ker", "pry", "ly", "der", "mid"],
    bestFor: [],
    gradients: {
      "white": {top: "white", bottom: "khaki"},
      "brick": {top: "indianred", bottom: "firebrick"},
      "wheat": {top: "wheat", bottom: "darksalmon"},
      "teal": {top: "white", bottom: "teal"},
      "orange": {top: "sandybrown", bottom: "chocolate"},
      "maroon": {top: "mediumpurple", bottom: "indigo"},
      "black": {top: "midnightblue", bottom: "black"},
      "navy": {top: "darkslateblue", bottom: "navy"},
      "pink": {top: "lightpink", bottom: "	palevioletred"},
      "purple": {top: "mediumpurple", bottom: "indigo"},
      "red": {top: "darksalmon", bottom: "firebrick"},
    },
    showColors: ["white", "orange", "black", "pink", "purple", "red"],
    rareness: [1, 2, 3, 4],
    rareNames: ["common", "standard", "fine", "rare"],
  },

  sprout: (qty) => {
    spuds.bits.color = Object.keys(spuds.bits.gradients);
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
      // add to player data so these are consistent for this player
      player.spuds[name] = items[name];
      // roll on to next item in the list so everyone gets at least one of everything
      colorCycle = ++colorCycle >= spuds.bits.color.length ? 0 : colorCycle;
      rarityCycle = ++rarityCycle >= spuds.bits.rareness.length ? 0 : rarityCycle;
      bestForCycle =
        ++bestForCycle >= spuds.bits.bestFor.length ? 0 : bestForCycle;
    }
  },

  bestForList: function () {
    let bestForAll = list.machines.list.map((item) => { return item.makes });

    return bestForAll.filter((value, index, array) => array.indexOf(value) === index);
  },

  // cant use ^ or | in spud descriptions!
  decode: function (encodedString) {
    let spudList = {};
    let records = encodedString.split(spuds.recordDelim);
    records.forEach((thisSpud) => {
      let bit = thisSpud.split(spuds.fieldDelim);
      spudList[bit[0]] = {
        name: bit[0],
        bestFor: bit[1],
        color: bit[2],
        fullName: bit[3],
        rareness: parseInt(bit[4]),
        type: 'spuds',
      }
    });

    return spudList;
  },

  encode: function (spudList) {
    let encodedString = '';
    let r = '';
    let d = spuds.fieldDelim;

    Object.entries(spudList).forEach(([spudName, spudInfo]) => {
      encodedString += `${r}${spudName}${d}`;
      encodedString += `${spudInfo.bestFor}${d}`;
      encodedString += `${spudInfo.color}${d}`;
      encodedString += `${spudInfo.fullName}${d}`;
      encodedString += `${spudInfo.rareness}${d}`;
      r = spuds.recordDelim;
    });
  
    return encodedString;
  },

  addToItems: function () {
    Object.entries(player.spuds).forEach(([spudName, spudInfo]) => {
      if (!items[spudName]) {
        items[spudName] = {
          type: 'spuds',
          name: spudName,
          fullName: spudInfo.fullName,
          color: spudInfo.color,
          rareness: spudInfo.rareness,
          bestFor: spudInfo.bestFor,
        };
      }
        
    });
  },

  // find a spud that is within our rareness range for the field
  // field 0 can have spuds 0 and 1
  // field 1 can have spuds 0, 1 and 2 etc..
  // since spud rareness is max 3, all fields > 2 have all rareness spuds
  byRareness: function (rareness) {
    let spud = list.spuds.list[rnd(list.spuds.list.length)];
    while (spud.rareness > rareness) {
      spud = list.spuds.list[rnd(list.spuds.list.length)];
    }
    
    return spud;
  },

  // select a random spud based on rareness
  select: function (fieldId) {
    let newSpud = spuds.byRareness(fieldId + 1);
    return { name: newSpud.name, qty: rnd(3) + 1 };
  },

  build: function (itemName) {
   let spudInfo = {}; 
    if (game.newPlayer.spuds) {
      spudInfo = game.newPlayer.spuds[itemName];
    } else {
      spudInfo = player.spuds[itemName];
    }
   let spudSvg = spuds.setColours(svg.render('spud1'), spudInfo);
   console.log(spudInfo);

   return spudSvg;
  },

  setColours: function (spudSvg, spudInfo) {
    let defaultColours = {
      top: "#d8af73", 
      bottom: "#715522"
    };
    let colours = spuds.bits.gradients[spudInfo.color] ?? defaultColours;
    console.log(colours);
    spudSvg = spudSvg.replaceAll('{gradientId}', `gradient_${spudInfo.name}`);
    spudSvg = spudSvg.replace('{top}', colours.top);
    spudSvg = spudSvg.replace('{bottom}', colours.bottom);

    return spudSvg;
  },

  desc: function (spud) {
    return `These are ${spuds.bits.rareNames[spud.rareness]} variety potatoes that are best for ${spud.bestFor}`;
  },


};
