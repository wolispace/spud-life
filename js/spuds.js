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

      player.spuds[counter++] = {
        "name": name,
        "fullName": fullName,
        "color": colorName,
        "rareness": rarityName,
        "bestFor": spudBits.bestFor[bestForCycle],
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
  }


}