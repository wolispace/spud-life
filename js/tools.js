const tools = {
  // draw the tools across the bottom
  render: () => {
    let tools = "";
    let dummyImg = svg.render(`control-icon--up`);
    Object.entries(player.tools).forEach(([toolName, tool]) => {
      tool = tool ?? {uses: 0, maxUses: 0};
      let toolSvg = svg.render(toolName) ?? dummyImg;
      tools += `<div class="tool-button tool-${toolName}" 
      onclick="fields.digPatch()"
      title="${toolName}=${tool.uses}">
       ${toolSvg}<div class="toolNum">${tool.uses}</div></div>`;
    });
    let scannerImg = svg.render('scanner') ?? dummyImg;
    tools += `<div class="tool-button tool-scanner" 
      onclick="scanner.show(player.scanState)"
      title="scanner=${player.scanLevel}">
      ${scannerImg}<div class="toolNum">${player.scanLevel}</div></div>`;

    let basketImg = svg.render('basket') ?? dummyImg;
    tools += `<div class="tool-button tool-basket" 
      onclick="basket.show()"
      title="basket=${basket.count()}">
      ${basketImg}<div class="toolNum">${basket.count()}</div></div>`;

    let wallet = svg.render('wallet') ?? dummyImg;
      tools += `<div class="tool-button tool-wallet" 
        onclick="basket.show()"
        title="wallet=${player.wallet}">
        ${wallet}<div class="toolNum">${player.wallet}</div></div>`;

    element = document.querySelector(".tools");
    element.innerHTML = tools;
    scanner.check();   
  },
  // TODO: not used!?! returns the players tool
  selectTool: (patch) => {
    let tool = "spade";
    if (patch.block) {
      if (patch.block.type == "rock") {
        tool = "pick";
      } else {
        tool = "axe";
      }
    }
    return player.tools[tool];
  },
  // buy a tool or an upgrade to a tool or machine
  buyItem: (itemName) => {
    let item = hardware.items[itemName];
    if (item.type == "tool") {
      if (player.tools[itemName] || itemName == 'scanner') {
        // upgrade
        if (itemName == 'scanner') {
          player.scanLevel++;
        } else {
          let moreUses = 2;
          player.tools[itemName].maxUses += moreUses;
          player.tools[itemName].uses += moreUses;
        }
        player.wallet = player.wallet - item.upgradeCost;
      } else {
        // buy tool
        player.tools[itemName] = item.initial;
        player.wallet = player.wallet - item.price;
      }
    } else if (item.type == "item" || item.type == "block") {
      player.basket[itemName] = player.basket[itemName] || 0;
      player.basket[itemName]++;
      player.wallet = player.wallet - item.price;

    } else if (item.type == "machine") {
      player.shop.machines[itemName] = item.initial;
      player.wallet = player.wallet - item.price;
    } else if (item.type == "field") {
      fields.buyField();
      player.wallet = player.wallet - item.price;
    }
    state.save();
    let itemButton = document.querySelector(`#hardware_${itemName}`);
    hardware.refresh(itemButton);
  },
  // start of a new day reset tools to their max uses
  reset: () => {
    Object.entries(player.tools).forEach(([itemName, tool]) => {
      tool.uses = tool.maxUses;
    });
  },
  jiggle: function (tool) {
    let thisTool = document.querySelector(`.tool-${tool} svg`);
    svg.animate(thisTool, `jiggle-up`, 0.25, () => { tools.render(); });
  },

  arcInto: function (patch, item) {
    let startPatch = `#${patch.id}`;
    let endTool = `.tool-${patch.item}`;
    let itemSvg = fields.getPatchSvg(patch);
    let onEnd = function () { hint.dugTool(item);  tools.jiggle(item.id);};
    svg.animateArc(startPatch, endTool, itemSvg, onEnd);
  },
};

