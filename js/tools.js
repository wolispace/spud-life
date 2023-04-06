const tools = {
  // draw the tools across the bottom
  render: () => {
    let tools = '';
    let dummyImg = svgImg(`control-icon--up`);
    Object.entries(app.state.tools).forEach(([toolName, tool]) => {
      tools += `<div  class="tool-${toolName}" onclick="fields.digPatch()">${toolName}=${tool.uses} ${dummyImg}</div>`;
    });
    tools += `<div class="tool-purse" onclick="showSack()">Purse=${app.state.purse}`;
    tools += `<br/>Sack=${countSack()}</div>`;
    tools += `<div class="tool-next" onclick="dayCycle()">Next &gt;</div>`;
    element = document.querySelector('.tools');
    element.innerHTML = tools;
  },
  // TODO: not used!?! returns the players tool
  selectTool: (patch) => {
    let tool = 'spade';
    if (patch.block) {
      if (patch.block.type == 'rock') {
        tool = 'pick';
      } else {
        tool = 'axe';
      }
    }
    return app.state.tools[tool];
  },
  // buy a tool or an upgrade to a tool or machine
  buyTool: (toolName) => {
    let tool = app.state.hardware[toolName];
    if (tool.type == 'tool') {
      if (app.state.tools[toolName]) {
        // upgrade
        app.state.tools[toolName].maxUses++;
        app.state.tools[toolName].uses++;
        app.state.purse = app.state.purse - app.state.hardware[toolName].upgradeCost;
      } else {
        // buy
        app.state.tools[toolName] = app.state.hardware[toolName].initial;
        app.state.purse = app.state.purse - app.state.hardware[toolName].price;
      }
    } else {
      // buy machine
      app.state.shop.machines[toolName] = app.state.hardware[toolName].initial;
      app.state.purse = app.state.purse - app.state.hardware[toolName].price;
    }
    tools.render();
    renderHardware();
  },
  // start of a new day reset toos to their max uses
  reset: () => {
    Object.entries(app.state.tools).forEach(([toolName, tool]) => {
      tool.uses = tool.maxUses;
    });
  },

};

