const dialog = {
  id: 'dialog',

  render: function () {
    // make sure we have a sky div that is 0,0, 100% sprite.height * sky.height
    let dialogBox = document.querySelector(`.${dialog.id}`);

    if (!dialogBox) {
      addToBody(`
      <div class='dialog'>
      <div class='header'>
        <div class='title'>Title</div>
        <div class='close buttonize' onclick='dialog.cancel()'>X</div>
      </div>
      <div class='content'></div>
      <div class='footer'></div>
    </div>
`);
    }
    dialogBox = document.querySelector(`.${dialog.id}`);
  },

};
