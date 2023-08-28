
let itemNumber = 0;
let qty = 10;
let sprite = { width: 50, height: 50 };
let containerBox = null;
let playerId = 0;
let step = { x: 5, y: 5 };
let grid = { x: 10, y: 10 };
let playerBuffer = { x: 5, y: 5 };
let timers = { duration: 20 };
let field = { log: [], rock: [], spuds: [], };

document.addEventListener("DOMContentLoaded", function () {
  setContainerBox();
  addRandom();
  setupThings();
});

function setupThings() {
  addPlayer();
  controls.render();      
}

function setContainerBox() {
  let containerElement = document.querySelector(".container");
  containerBox = containerElement.getBoundingClientRect();
  setSpriteSize();
}


function addPlayer() {
    let itemSvg = svg.render('chipper2000', 1, ''); 
  playerId = addSprite(1, 1, itemSvg, sprite.width, sprite.height, 'player');
}

function getPlayerSprite() {
  return document.querySelector(`#i${playerId}`);
}

function clearBody() {
  let bodyElement = document.querySelector("body");
  bodyElement.innerHTML = '<div class="container"></dv>';
}

function addRandom() {
  clearBody();
  for (let step = 0; step < qty; step++) {
    let x = rnd(containerBox.width - sprite.width);
    let y = rnd(containerBox.height - sprite.height);
    let itemSvg = svg.render('chipper', 5, ''); 
    addSprite(x, y, itemSvg, sprite.width, sprite.height, 'block');
    field.log[step] = { x: x, y: y };
  }
}

function redraw() {
  clearBody();
  let itemSvg = svg.render('chipper', 5, ''); 
  field.log.forEach( (item) => {
    addSprite(item.x, item.y, itemSvg, sprite.width, sprite.height, 'block');
  });
  setupThings();
}

window.addEventListener("resize", (event) => {
  let last = {
    width: containerBox.width,
    height: containerBox.height
  }
  setContainerBox();
  let newWidthPct = containerBox.width / last.width;
  let newHeightPct = containerBox.height / last.height;
  resizeSprites(newWidthPct, newHeightPct);
});

function resizeSprites(newWidthPct, newHeightPct) {
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
}

function setSpriteSize() {
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
}

function isDirection(direction) {
  return ['up','down','left','right'].includes(direction);
}
function getDirection (event) {
  return event.code.toLowerCase().replace('arrow', '');
}

document.addEventListener("keydown", (event) => {
  let direction = getDirection(event);
  if (isDirection(direction)) {
    movePlayer(direction);
  }
});

document.addEventListener("keyup", (event) => {
  let direction = getDirection(event);
  if (isDirection(direction)) {
    clearInterval(timers[direction]);
    timers.moving = false;
  }
});

function movePlayer(direction) {
  if (!timers.moving) {
    timers[direction] = setInterval(() => {
      let playerSprite = getPlayerSprite();
      let playerBox = playerSprite.getBoundingClientRect();
      let newTop, newLeft;
      switch (direction) {
        case 'up':
          newTop = playerBox.top - step.y;
          if (newTop > 0 && collision('up') != true) {
            playerSprite.style.top = `${newTop}px`;
          }
          break;
        case 'down':
          newTop = playerBox.top + step.y;
          if (newTop < containerBox.height - sprite.height && collision('down') != true) {
            playerSprite.style.top = `${newTop}px`;
          }
          break;
        case 'left':
          newLeft = playerBox.left - step.x;
          if (newLeft > 0 && collision('left') != true) {
            playerSprite.style.left = `${newLeft}px`;
          }
          break;
        case 'right':
          newLeft = playerBox.left + step.x;
          if (newLeft < containerBox.width - sprite.width && collision('right') != true) {
            playerSprite.style.left = `${newLeft}px`;
          }
          break;
      }
      timers.moving = true;
    }, timers.duration);
  }
}

function moveUp() {
  movePlayer('up');
}
function moveDown() {
  movePlayer('down');
}
function moveLeft() {
  movePlayer('left');
}
function moveRight() {
  movePlayer('right');
}

function getPlayerBox() {
  let playerSprite = getPlayerSprite();
  return playerSprite.getBoundingClientRect();
}

function getPlayerCorner(playerBox, direction) {
  let playerCorner = {
    x: playerBox.left,
    y: playerBox.top,
  };
  if (direction === 'right') {
    playerCorner.x += playerBox.width;
  } else if (direction === 'down') {
    playerCorner.y += playerBox.height;
  }

  return playerCorner;
}

function collision(direction) {
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
}

function addSprite(x, y, content, w, h, classList = '') {
  itemNumber++;
  let width = `${w}px`;
  let height = `${h}px`;
  let top = `${y}px`;
  let left = `${x}px`;
  let style = `width: ${width}; height:${height}; top:${top}; left:${left};`;
  let newSprite = `<div id="i${itemNumber}" class="sprite ${classList}" style="${style}">${content}</div>`;
  let bodyElement = document.querySelector("body");
  bodyElement.insertAdjacentHTML('beforeend', newSprite);
  return itemNumber;
}

