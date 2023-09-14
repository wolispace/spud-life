const tools = {

  list: {},

  setup: function () {
    let itemName = 'pick';
    tools.list[itemName] = new Tool(itemName, 100, 100);
    tools.list[itemName].render();
    tools.list[itemName].onClick = function () {
      console.log('Clicked ', this.id);
    }
    //setTimeout(tools.list[itemName].setup(), 1000);


    itemName = 'wallet';
    tools.list[itemName] = new Tool(itemName, 200, 200);
    tools.list[itemName].render();
    tools.list[itemName].onClick = function () {
      console.log('Clicked ', this.id);
    }
    //tools.list[itemName].setup();

  },

};

