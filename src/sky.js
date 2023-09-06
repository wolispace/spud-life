const sky = {
  height: 2,
  id: 'skyBox',

  render: function () {
    // make sure we have a sky div that is 0,0, 100% sprite.height * sky.height
    let skyBox = document.querySelector(`.${sky.id}`);
    if (!skyBox) {
      addToBody(`<div class="${sky.id}" ></div>`);
    }
    skyBox = document.querySelector(`.${sky.id}`);
    skyBox.style.height = `${sprite.height * sky.height}px`;

  },


};

