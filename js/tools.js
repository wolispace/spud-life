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
      onclick="scanner.show()"
      title="scanner=${player.scanner}">
      ${scannerImg}<div class="toolNum">${player.scanner}</div></div>`;

    let basket = svg.render('basket') ?? dummyImg;
    tools += `<div class="tool-button tool-basket" 
      onclick="sack.show()"
      title="basket=${sack.count()}">
      ${basket}<div class="toolNum">${sack.count()}</div></div>`;

    let wallet = svg.render('wallet') ?? dummyImg;
      tools += `<div class="tool-button tool-wallet" 
        onclick="sack.show()"
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
    let item = player.hardware[itemName];
    if (item.type == "tool") {
      if (player.tools[itemName]) {
        // upgrade
        player.tools[itemName].maxUses++;
        player.tools[itemName].uses++;
        player.wallet = player.wallet - item.upgradeCost;
      } else {
        // buy tool
        player.tools[itemName] = item.initial;
        player.wallet = player.wallet - item.price;
      }
    } else if (item.type == "item" || item.type == "block") {
      player.sack[itemName] = player.sack[itemName] || 0;
      player.sack[itemName]++;
      player.wallet = player.wallet - item.price;

    } else if (item.type == "machine") {
      player.shop.machines[itemName] = item.initial;
      player.wallet = player.wallet - item.price;
    } else if (item.type == "field") {
      fields.buyField();
      player.wallet = player.wallet - item.price;
    }
    state.save();
    tools.render();
    hardware.render();
  },
  // start of a new day reset tools to their max uses
  reset: () => {
    Object.entries(player.tools).forEach(([itemName, tool]) => {
      tool.uses = tool.maxUses;
    });
  },
};
