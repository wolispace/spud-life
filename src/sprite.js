const sprite = {
  width: 50,
  height: 50,

  render: function (uid, x, y, itemSvg, w, h, classList = '') {
    let width = `${w}px`;
    let height = `${h}px`;
    let top = `${y}px`;
    let left = `${x}px`;
    let style = `width: ${width}; height:${height}; top:${top}; left:${left};`;
    itemSvg = sprite.orientSvg(itemSvg);
    let newSprite = `<div id="i${uid}" class="sprite ${classList}" style="${style}">${itemSvg}</div>`;
    addToBody(newSprite);

    return sprite.shrinkWrap(uid);
  },

  orientSvg: function (itemSvg) {
    // get width and height from viewbox to decide if its a wide or high image
    let bits = itemSvg.match(/viewBox=\"(\d+) (\d+) (\d+) (\d+)\"/);
    let orientation = (parseInt(bits[3]) > parseInt(bits[4])) ? 'wide' : 'high';
    let newSvg = itemSvg.replace(/ viewBox=\"/, ` class=\"${orientation}\" viewBox=\"`);
    return newSvg;
  },

  // shrink holding div around the svg and return its box
  shrinkWrap: function (uid) {
    let itemDiv = document.querySelector(`#i${uid}`);
    let itemSvg = document.querySelector(`#i${uid} > svg`);
    if (itemSvg) {
      let itemSvgBox = itemSvg.getBoundingClientRect();
      itemDiv.style.width = `${itemSvgBox.width}px`;
      itemDiv.style.height = `${itemSvgBox.height}px`;
      itemSvgBox.uid = uid;
      return itemSvgBox;
    }
  },

  get: function (uid) {
    return document.querySelector(`#i${uid}`);
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
    let spritesList = player.fields[player.currentField][game.ABOVEGROUND];

    spritesList.forEach(spriteBox => {
      if (sprite.collides(playerBox, spriteBox)) {
        let thisBlock = document.querySelector(`#i${spriteBox.uid} svg`);
        svg.animate(thisBlock, `jiggle-${direction}`, 0.25);
        retValue = spriteBox.uid;
      }
    });
    return retValue;
  },

  // do these collide? objects with (x,y,width,height}
  collides: function (item1, item2) {
    return (item1.x < item2.x + item2.width)
      && (item1.x + item1.width > item2.x)
      && (item1.y < item2.y + item2.height)
      && (item1.y + item1.height > item2.y);
  },

  resize: function (newWidthPct, newHeightPct) {
    let spritesList = document.querySelectorAll('.sprite');
    spritesList.forEach(element => {
      let elementBox = element.getBoundingClientRect();
      let newLeft = elementBox.left * newWidthPct;
      let newTop = elementBox.top * newHeightPct;
      let newWidth = elementBox.width * newWidthPct;
      let newHeight = elementBox.height * newHeightPct;
      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;
      element.style.width = `${newWidth}px`;
      element.style.height = `${newHeight}px`
    });
    // when we have sensible things to resize..
    if (true) {
      clearTimeout(timers.resize);
      timers.resize = setTimeout(redraw, 500);
    }
  },

};

