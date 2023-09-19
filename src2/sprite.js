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
    let itemDiv = sprite.get(uid);
    let itemSvg = sprite.get(`${uid} > svg`);
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
    game.grid.x = parseInt(containerBox.width / sprite.width);
    game.grid.y = parseInt(containerBox.height / sprite.height);
  },

  collision: function (direction) {
    let retValue;
    let playerBox = character.getPlayerBox();
    let spritesList = player.fields[player.currentField][game.ABOVEGROUND];

    spritesList.forEach((spriteBox, index) => {
      if (!retValue && sprite.collides(playerBox, spriteBox)) {
        controls.endInput();
        function onEnd () {
          spriteBox.qty--;
          if (spriteBox.qty > 0) {

          } else {
            spriteBox.remove();
            delete spriteBox;
            delete player.fields[player.currentField][game.ABOVEGROUND][index];
          }
        }
        retValue = spriteBox;
        spriteBox.jiggle(direction, onEnd);
        return spriteBox;
      }
    });

    return retValue;
  },

  // do these collide? objects with (x,y,width,height}
  collides: function (item1, item2) {
    return (item1.x < item2.x + item2.w)
      && (item1.x + item1.w > item2.x)
      && (item1.y < item2.y + item2.h)
      && (item1.y + item1.h > item2.y);
  },
    // build an svg arv from the starting path to the ending tool
    makeAcr: function (startItem, endTool) {
      let startX = 0 + (startItem.w / 2);
      let startY = 0 + (startItem.h / 2);
      let top = 0 - (startItem.y/2);
      let endX = endTool.x - startItem.x + (startItem.w / 2);
      let endY = endTool.y - startItem.y + (startItem.h / 2);
  
      // everything must be relative to the patch - it is 0,0
      // calculate x2,y2 from the middle of the basket tool
      // calculate top.. or just use zero?
      // calculate offset for beizer control points (in a little from vertical based on distance between x1 and x2)
      // Mx1,y1 Cx1+(x2-x1/5),top x2-(x2-x1/5),top x2,y2
      let bit = (endX-startX)/5;
  
      return `path('M ${startX},${startY} C ${startX+bit},${top} ${endX-bit},${top} ${endX},${endY}')`;
    },

  animateArc: function (foundItem, endTool, onEnd) {
    let arc = sprite.makeAcr(foundItem, endTool);
    // slow start fast middle
    var easing = 'cubic-bezier(0, 0, .25, 0)';
    // slow and get faster
    easing = 'cubic-bezier(0.3, 0, 1, 1)';
    easing = 'ease-in';
    itemSprite = foundItem.sprite;
    itemSprite.style.display = 'block';
    itemSprite.style.offsetPath = arc;
    itemSprite.style.offsetRotate = `0deg`;
    itemSprite.style.animation = `into-basket 1.5s ${easing} 0s 1 normal forwards`;
    itemSprite.addEventListener("animationend", function handler() {
      itemSprite.style.animation = 'none';
      itemSprite.style.display = 'none';
      if (typeof onEnd == "function") {
        onEnd();
      }
      this.removeEventListener("animationend", handler);
    });
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
      timers.resize = setTimeout(field.redraw, 500);
    }
  },

};

