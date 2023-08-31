
let pixelScale = 1; //window.devicePixelRatio;
let itemNumber = 0;
let qty = 10;
let containerBox = null;
let playerId = 0;
let step = { x: 5 * pixelScale, y: 5 * pixelScale};
let grid = { x: 10, y: 10 };
let timers = { duration: 20 };
let field = { log: [], rock: [], spuds: [], };
let bodySet = character.getBodySet();

document.addEventListener("DOMContentLoaded", function () {
  introGame();
});

function introGame() {
  let containerElement = document.querySelector(".container");
  let titleSvg = svg.render('title', 1, 'style="width:100%;"');
  containerElement.innerHTML = titleSvg;
  svg.animate(containerElement, 'goInvisible', 2, function () {
    setContainerBox();
    addRandom();
    setupThings();
  });
}

function setupThings() {
  character.addPlayer();
  controls.render();      
}

function setContainerBox() {
  let containerElement = document.querySelector(".container");
  containerBox = containerElement.getBoundingClientRect();
  sprite.setSize();
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
    sprite.render(x, y, itemSvg, sprite.width * log2.scale, sprite.height * log2.scale, 'block');
    field.log[step] = { x: x, y: y };
  }
}

function redraw() {
  setContainerBox();
  sprite.setSize();
  clearBody();
  let itemSvg = svg.render('log2', 1, ''); 
  let log2 = {scale: 0.8};
  field.log.forEach( (item) => {
    sprite.render(item.x, item.y, itemSvg, sprite.width * log2.scale, sprite.height * log2.scale, 'block');
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
  sprite.resize(newWidthPct, newHeightPct);
});

function isDirection(direction) {
  return ['up','down','left','right'].includes(direction);
}
function getDirection (event) {
  return event.code.toLowerCase().replace('arrow', '');
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  let direction = getDirection(event);
  if (isDirection(direction)) {
    movePlayer(direction);
  }
});

document.addEventListener("keyup", (event) => {
  event.preventDefault();
  let direction = getDirection(event);
  if (isDirection(direction)) {
    clearInterval(timers[direction]);
    timers.moving = false;
  }
});

function movePlayer(direction) {
  if (!timers.moving) {
    character.look(direction);
    timers[direction] = setInterval(() => {
      let playerSprite = sprite.get(playerId);
      let playerBox = playerSprite.getBoundingClientRect();
      let old = {x: playerBox.x, y: playerBox.y};
      let newTop, newLeft;
      switch (direction) {
        case 'up':
          newTop = playerBox.top - step.y;
          if (newTop > 0) {
            playerSprite.style.top = `${newTop}px`;
          }
          break;
        case 'down':
          newTop = playerBox.top + step.y;
          if (newTop < containerBox.height - playerBox.height) {
            playerSprite.style.top = `${newTop}px`;
          }
          break;
        case 'left':
          newLeft = playerBox.left - step.x;
          if (newLeft > 0) {
            playerSprite.style.left = `${newLeft}px`;
          }
          break;
        case 'right':
          newLeft = playerBox.left + step.x;
          if (newLeft < containerBox.width - playerBox.width) {
            playerSprite.style.left = `${newLeft}px`;
          }
          break;
      }
      if (sprite.collision(direction)) {
        playerSprite.style.left = `${old.x}px`;
        playerSprite.style.top = `${old.y}px`;
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



