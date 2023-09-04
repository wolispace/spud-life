const sprite = {
  number: 0,
  width: 50,
  height: 50,

  render: function (x, y, itemSvg, w, h, classList = '') {
    sprite.number++;
    let width = `${w}px`;
    let height = `${h}px`;
    let top = `${y}px`;
    let left = `${x}px`;
    let style = `width: ${width}; height:${height}; top:${top}; left:${left};`;
    itemSvg = sprite.orientSvg(itemSvg);
    let newSprite = `<div id="i${sprite.number}" class="sprite ${classList}" style="${style}">${itemSvg}</div>`;
    let bodyElement = document.querySelector("body");
    bodyElement.insertAdjacentHTML('beforeend', newSprite);

    sprite.shrinkWrap(sprite.number);

    return sprite.number;
  },

  orientSvg: function (itemSvg) {
    // get width and height from viewbox to decide if its a wide or high image
    let bits = itemSvg.match(/viewBox=\"(\d+) (\d+) (\d+) (\d+)\"/);
    let orientation = (parseInt(bits[3]) > parseInt(bits[4])) ? 'wide' : 'high';
    let newSvg = itemSvg.replace(/ viewBox=\"/, ` class=\"${orientation}\" viewBox=\"`);
     return newSvg;
  },

  // shrink holding div around the svg 
  shrinkWrap: function (itemNumber) {
    let itemDiv = document.querySelector(`#i${itemNumber}`);
    let itemSvg = document.querySelector(`#i${itemNumber} > svg`);
    if (itemSvg) {
      let itemSvgBox = itemSvg.getBoundingClientRect();
      itemDiv.style.width = `${itemSvgBox.width}px`;
      itemDiv.style.height = `${itemSvgBox.height}px`;
    }
  },

  get: function (itemNumber) {
    return document.querySelector(`#i${itemNumber}`);
  },

  setSize: function () {
    sprite.width = containerBox.width / 10;
    sprite.height = containerBox.height / 10;
    // make sure its square..
    if (sprite.height > sprite.width) {
      sprite.height = sprite.width;
    } else {
      sprite.width = sprite.height;
    }
    grid.x = parseInt(containerBox.width / sprite.width);
    grid.y = parseInt(containerBox.height / sprite.height);
  },

  collision: function (direction) {
    let retValue = false;
    let playerBox = character.getPlayerBox();
    let spritesList = document.querySelectorAll('.block');
    spritesList.forEach(element => {
      let spriteBox = element.getBoundingClientRect();
      if (((spriteBox.x < playerBox.x + playerBox.width)
        && (spriteBox.x + spriteBox.width > playerBox.x)
        && (spriteBox.y < playerBox.y + playerBox.height)
        && (spriteBox.y + spriteBox.height > playerBox.y)
      )) {
        let thisBlock = document.querySelector(`#${element.id} svg`);
        svg.animate(thisBlock, `jiggle-${direction}`, 0.25);
        retValue = element.id;
      }

    });
    return retValue;
  },

  resize: function () {
    if (true) {
      clearTimeout(timers.resize);
      timers.resize = setTimeout(field.redraw, 500);
    }
  },

};

