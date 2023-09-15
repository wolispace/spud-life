const tools = {

  list: {},

  setup: function () {

    let toolList = ['pick', 'spade', 'axe', 'wallet'];

    let leftX = 6;

    toolList.forEach((itemName) => {
      tools.list[itemName] = new Tool(itemName, sprite.width * leftX++ , sprite.height * 8);
      tools.list[itemName].onClick = function () {
        console.log('Clicked ', this.id);
      }
    });


  },

};

