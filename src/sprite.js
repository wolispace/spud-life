const sprite = {
  number: 0,
  width: 50,
  height: 50,

  render: function (x, y, content, w, h, classList = '') {
    sprite.number++;
    let width = `${w}px`;
    let height = `${h}px`;
    let top = `${y}px`;
    let left = `${x}px`;
    let style = `width: ${width}; height:${height}; top:${top}; left:${left};`;
    let newSprite = `<div id="i${sprite.number}" class="sprite ${classList}" style="${style}">${content}</div>`;
    let bodyElement = document.querySelector("body");
    bodyElement.insertAdjacentHTML('beforeend', newSprite);
  
    sprite.shrinkWrap(sprite.number);
  
    return sprite.number;    
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

  get: function(itemNumber) {
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
    console.log(sprite);
    grid.x = parseInt(containerBox.width / sprite.width);
    grid.y = parseInt(containerBox.height / sprite.height);
  },

  collision: function (direction) {
    let retValue = false;
    let playerBox = getPlayerBox();
    let playerCorner = getPlayerCorner(playerBox, direction);
  
    let spritesList = document.querySelectorAll('.block');
    spritesList.forEach(element => {
      if (!retValue) {
        let spriteBox = element.getBoundingClientRect();
        let checkCorner = {
          x: spriteBox.left,
          y: spriteBox.top,
        };
        if (direction === 'left') {
          checkCorner.x += spriteBox.width;
        } else if (direction === 'up') {
          checkCorner.y += spriteBox.height;
        }
        if (direction === 'right' || direction === 'left') {
          if ((playerCorner.x >= checkCorner.x && direction === 'left') || (playerCorner.x <= checkCorner.x && direction === 'right')) {
            if ((playerCorner.x <= checkCorner.x + step.x && direction === 'left') || ((playerCorner.x + step.x) >= checkCorner.x && direction === 'right')) {
              // our X means we are potential collision..
              if ((playerCorner.y + playerBox.height) >= checkCorner.y) {
                if ((playerCorner.y) <= (checkCorner.y + spriteBox.height)) {
                  retValue = true;
                }
              }
            }
          }
        } else if (direction === 'up' || direction === 'down') {
          if ((playerCorner.y >= checkCorner.y && direction === 'up') || (playerCorner.y <= checkCorner.y && direction === 'down')) {
            if ((playerCorner.y <= checkCorner.y + step.y && direction === 'up') || ((playerCorner.y + step.y) >= checkCorner.y && direction === 'down')) {
              // our Y means we are potential collision..
              if ((playerCorner.x + playerBox.width) >= checkCorner.x) {
                if ((playerCorner.x) <= (checkCorner.x + spriteBox.width)) {
                  retValue = true;
                }
              }
            }
          }
        }
      }
    });
  
    return retValue;
  },
  
  
};

