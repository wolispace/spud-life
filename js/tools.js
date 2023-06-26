const tools = {
  // draw the tools across the bottom
  render: () => {
    let tools = "";
    let dummyImg = svg.render(`control-icon--up`);
    Object.entries(player.tools).forEach(([toolName, tool]) => {
      let toolSvg = svg.render(toolName) ?? dummyImg;
      tools += `<div class="tool-${toolName}" 
      onclick="fields.digPatch()"
      title="${toolName}=${tool.uses}">
       ${toolSvg}<div class="toolNum">${tool.uses}</div></div>`;
    });
    let basket = svg.render('basket') ?? dummyImg;
    tools += `<div class="tool-basket" 
      onclick="sack.show()"
      title="basket=${sack.count()}">
      ${basket}<div class="toolNum">${sack.count()}</div></div>`;

    let wallet = svg.render('wallet') ?? dummyImg;
      tools += `<div class="tool-wallet" 
        onclick="sack.show()"
        title="wallet=${player.wallet}">
        ${wallet}<div class="toolNum">${player.wallet}</div></div>`;

    element = document.querySelector(".tools");
    element.innerHTML = tools;
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
  buyTool: (toolName) => {
    let tool = player.hardware[toolName];
    if (tool.type == "tool") {
      if (player.tools[toolName]) {
        // upgrade
        player.tools[toolName].maxUses++;
        player.tools[toolName].uses++;
        player.wallet = player.wallet - player.hardware[toolName].upgradeCost;
      } else {
        // buy
        player.tools[toolName] = player.hardware[toolName].initial;
        player.wallet = player.wallet - player.hardware[toolName].price;
      }
    } else {
      // buy machine
      player.shop.machines[toolName] = player.hardware[toolName].initial;
      player.wallet = player.wallet - player.hardware[toolName].price;
    }
    tools.render();
    hardware.render();
  },
  // start of a new day reset tools to their max uses
  reset: () => {
    Object.entries(player.tools).forEach(([toolName, tool]) => {
      tool.uses = tool.maxUses;
    });
  },
};
