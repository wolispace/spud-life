const dialog = {
  id: 'dialog',

  render: function () {
    // make sure we have a sky div that is 0,0, 100% sprite.height * sky.height
    let dialogBox = document.querySelector(`.${dialog.id}`);

    if (!dialogBox) {
      addToBody(`<div class="${dialog.id}" ><input type="text"></input></div>`);
    }
    dialogBox = document.querySelector(`.${dialog.id}`);
    dialogBox.style.height = `${sprite.height * sky.height}px`;
  },

};
