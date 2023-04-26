const spuds = {
  //generate the the complete random list of spuds for this session
  sprout: (qty) => {
    let counter = 0;
    let spudBits = {
      "prefix": ['Bo', 'Sa', 'Ru', 'Kri', 'Ar'],
      "middle": ['sa', 'cho', 'ma', 'nal', 'sso', 'li'],
      "suffix": ['lor', 'ker', 'pry', 'ly', 'der', 'mid'],
      "bestFor": ['chips', 'baked potatoes', 'curly-fries', 'soup'],
      "color": ['white', 'brick', 'wheat', 'teal', 'orange', 'maroon', 'black', 'navy', 'pink', 'purple', 'red'],
      "showColors": ['white', 'orange', 'black', 'pink', 'purple', 'red'],
      "rareness": ["common", "standard", "rare"]
    };
    // used next element from array cycling back to the start so its not completely random.
    let colorCycle = rnd(spudBits.color.length);
    let rarityCicle = rnd(spudBits.rareness.length);
    let bestForCycle = rnd(spudBits.bestFor.length);
    let namedSpuds = [];
    while (counter < qty) {
      let name = spudBits.prefix[rnd(spudBits.prefix.length)];
      name += spudBits.middle[rnd(spudBits.middle.length)];
      while (namedSpuds.includes(name)) {
        name += spudBits.middle[rnd(spudBits.middle.length)];
      }
      namedSpuds.push(name);
      if (rnd(3) > 1) {
        name += spudBits.suffix[rnd(spudBits.suffix.length)];
      }

      let colorName = spudBits.color[colorCycle];
      let rarityName = spudBits.rareness[rarityCicle];
      let fullName = rnd(3) > 1 ? `${rarityName} ` : '';
      if (spudBits.showColors.includes(colorName)) {
        fullName += `${colorName} `;
      }
      fullName += name;
      // uppercase first letter
      fullName = fullName.charAt(0).toUpperCase() + fullName.slice(1);

      let svgInfo = svg.imgList['spud'];
      console.log(svgInfo);

      player.spuds[counter++] = {
        "name": name,
        "fullName": fullName,
        "color": colorName,
        "rareness": rarityName,
        "bestFor": spudBits.bestFor[bestForCycle],
        'path': svg.jiggle(svgInfo.paths[0].d, 3),
      }
      // roll on to next item in the list so everyone gets atleast one ofeverything
      colorCycle = ++colorCycle >= spudBits.color.length ? 0 : colorCycle;
      rarityCicle = ++rarityCicle >= spudBits.rareness.length ? 0 : rarityCicle;
      bestForCycle = ++bestForCycle >= spudBits.bestFor.length ? 0 : bestForCycle;
    }
  },
  // selling the meals from the machines
  sell: () => {
    let totalMeals = 0;
    let totalIncome = 0;

    // loop through all machines
    // if machine has spuds in its hopper
    // convert spuds into food (hopper.qty x spud.price)
    Object.entries(player.shop.machines).forEach(([machineName, machine]) => {
      if (machine.hopper) {
        Object.entries(machine.hopper).forEach(([spudName, spudQty]) => {
          let spudInfo = player.spuds.filter(spud => spud.name == spudName);
          let bonus = (machine.makes = spudInfo.bestFor) ? 2 : 1;
          let salePrice = machine.pricePerItem * bonus * spudQty;
          totalMeals = totalMeals + spudQty;
          totalIncome = totalIncome + salePrice;
          //console.log(`${salePrice} = ${machine.pricePerItem} * ${bonus} * ${spudQty} `);
        });
        // empty the machine
        machine.hopper = {};
      }
    });

    player.purse += totalIncome;
    let salesList = `Total meals=${totalMeals} income=${totalIncome}`;
    element = document.querySelector('.sales');
    element.innerHTML = salesList;
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
  render: (spudName, style = '') => {
    let spudInfo = player.spuds.filter(spud => spud.name == spudName)[0];
    let svgInfo = svg.imgList['spud'];
    let svgClass = svgInfo.class;
    svgClass = svg.setClass(svgClass, 'spud');
    let highlight = svg.highlight();
    let paths = '';
    svgInfo.paths.forEach((path, index) => {
      let onePath = spudInfo.path;
      let svgCls = path.c ? `${svgClass}-${path.c}` : svgClass;

      let svgStyle = (index > -1) ? ` style="fill:${spudInfo.color}; stroke:${spudInfo.color}" ` : '';
      paths += `<path class="${svgCls}" ${svgStyle}
        d="${onePath}" />`;
    });


    return svg.wrap(svgClass, style, `${paths}${highlight}`);
  }



}