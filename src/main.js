
let itemNumber = 0;
let qty = 10;
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
  sprite.setSize();
}

function addPlayer() {
    let itemSvg = svg.render('bottle', 1, ''); 
    // scale the width and height of the svg
  playerId = sprite.render(1, 1, itemSvg, 32, sprite.height, 'player');
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
    let itemSvg = svg.render('log2', 1, ''); 
    let log2 = {scale: 0.8};
    sprite.render(x, y, itemSvg, sprite.width * log2.scale, sprite.heighth * log2.scale, 'block');
    field.log[step] = { x: x, y: y };
  }
}

function redraw() {
  setContainerBox();
  sprite.setSize();
  clearBody();
  let itemSvg = svg.render('log2', 1, ''); 
  field.log.forEach( (item) => {
    sprite.render(item.x, item.y, itemSvg, sprite.width, sprite.height, 'block');
  });
  setupThings();
}

window.addEventListener("resize", (event) => {
  let last = {
    width: containerBox.width,
    height: containerBox.height
  }
  //setContainerBox();
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
      let playerSprite = sprite.get(playerId);
      let playerBox = playerSprite.getBoundingClientRect();
      let newTop, newLeft;
      switch (direction) {
        case 'up':
          newTop = playerBox.top - step.y;
          if (newTop > 0 && sprite.collision('up') != true) {
            playerSprite.style.top = `${newTop}px`;
          }
          break;
        case 'down':
          newTop = playerBox.top + step.y;
          if (newTop < containerBox.height - sprite.height && sprite.collision('down') != true) {
            playerSprite.style.top = `${newTop}px`;
          }
          break;
        case 'left':
          newLeft = playerBox.left - step.x;
          if (newLeft > 0 && sprite.collision('left') != true) {
            playerSprite.style.left = `${newLeft}px`;
          }
          break;
        case 'right':
          newLeft = playerBox.left + step.x;
          if (newLeft < containerBox.width - sprite.width && sprite.collision('right') != true) {
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
  let playerSprite = sprite.get(playerId);
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



