const tools = {

  list: {},

  setup: function () {
    let toolList = ['pick', 'spade', 'axe', 'scanner', 'wallet'];

    let leftX = 0.8;
    let leftY = 8.2;

    toolList.forEach((itemName) => {
      tools.list[itemName] = new Tool(itemName, sprite.width * leftX , sprite.height * leftY);
      tools.list[itemName].onClick = function () {
        console.log('Clicked ', this.id);
      }
      leftX = leftX + 2;
    });
  },
};

