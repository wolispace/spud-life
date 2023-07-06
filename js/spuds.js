const spuds = {
  //generate the the complete random list of spuds for this session
  sprout: (qty) => {
    let counter = 0;
    let spudBits = {
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
      rareness: ["common", "standard", "rare"],
    };
    // used next element from array cycling back to the start so its not completely random.
    let colorCycle = rnd(spudBits.color.length);
    let rarityCycle = rnd(spudBits.rareness.length);
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
      let rarityName = spudBits.rareness[rarityCycle];
      let fullName = rnd(3) > 1 ? `${rarityName} ` : "";
      if (spudBits.showColors.includes(colorName)) {
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
        rareness: rarityName,
        bestFor: spudBits.bestFor[bestForCycle],
        path: svg.jiggle(svgInfo.paths[0].d, 3),
      };
      // roll on to next item in the list so everyone gets at least one of everything
      colorCycle = ++colorCycle >= spudBits.color.length ? 0 : colorCycle;
      rarityCycle = ++rarityCycle >= spudBits.rareness.length ? 0 : rarityCycle;
      bestForCycle =
        ++bestForCycle >= spudBits.bestFor.length ? 0 : bestForCycle;
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

    player.wallet += totalIncome;
    customers.render();

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

  // animate an item being dug up into the basket
  animate: (patch) => {
    let patchPos = getElementPos(`#${patch.id}`);

    let itemSprite = document.querySelector(`#itemSprite`);

    if(patch.item) {
      itemSprite.innerHTML = svg.render(patch.item);
    } else {
      itemSprite.innerHTML = spuds.render(patch.spud.name);
    }
    itemSprite.style.top = patchPos.top + "px";
    itemSprite.style.left = patchPos.left + "px";
    itemSprite.style.width = patchPos.width + "px";
    itemSprite.style.height = patchPos.height + "px";    

    let basketPos = getElementPos(`.tool-basket`);

    let startX = 0 + (patchPos.width / 2);
    let startY = 0 + (patchPos.height / 2);
    let top = 0 - (patchPos.top/2);
    let endX = basketPos.left - patchPos.left + (patchPos.width / 2);
    let endY = basketPos.top - patchPos.top + (patchPos.height / 2);

    // everything must be relative to the patch - it is 0,0
    // calculate x2,y2 from the middle of the basket tool
    // calculate top.. or just use zero?
    // calculate offset for beizer control points (in a little from vertical based on distance between x1 and x2)
    // Mx1,y1 Cx1+(x2-x1/5),top x2-(x2-x1/5),top x2,y2
    let bit = (endX-startX)/5;

    let arc = `path('M ${startX},${startY} C ${startX+bit},${top} ${endX-bit},${top} ${endX},${endY}')`;
    // slow start fast middle
    var easing = 'cubic-bezier(0, 0, .25, 0)';
    // slow and get faster
    easing = 'cubic-bezier(0.3, 0, 1, 1)';
    easing = 'ease-in';
    itemSprite.style.display = 'block';
    itemSprite.style.offsetPath = arc;
    itemSprite.style.offsetRotate = `0deg`;
    itemSprite.style.animation = `into-basket 1.5s ${easing} 0s 1 normal forwards`;
    itemSprite.addEventListener("animationend", function handler() {
      itemSprite.style.animation = 'none';
      itemSprite.style.display = 'none';
      this.removeEventListener("animationend", handler);
    });
  }
};
