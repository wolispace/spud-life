const tools = {

  list: {},

  setup: function () {
    let itemName = 'pick';
    tools.list[itemName] = new Tool(itemName, 100, 100);
    tools.list[itemName].render();

    itemName = 'wallet';
    tools.list[itemName] = new Tool(itemName, 200, 200);
    tools.list[itemName].render();
  },

};

