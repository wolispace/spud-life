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
  }

  
};

