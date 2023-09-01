
let pixelScale = 1; //window.devicePixelRatio;
let itemNumber = 0;
let qty = 10;
let containerBox = null;
let playerId = 0;
let step = { x: 5 * pixelScale, y: 5 * pixelScale};
let grid = { x: 10, y: 10 };
let timers = { duration: 20 };
let list = {};

let bodySet = character.getBodySet();

// all of the events..
document.addEventListener("DOMContentLoaded", function () {
  introGame();
});

window.addEventListener("resize", (event) => {
  let last = {
    width: containerBox.width,
    height: containerBox.height
  }
  sprite.resize();
});

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  let direction = getDirection(event);
  if (isDirection(direction)) {
    character.movePlayer(direction);
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

function introGame() {
  let containerElement = document.querySelector(".container");
  let titleSvg = svg.render('title', 1, 'style="width:100%;"');
  containerElement.innerHTML = titleSvg;
  svg.animate(containerElement, 'goInvisible', 0.1, function () {
    setContainerBox();
    field.addRandom();
    setupThings();
  });
}

function setupThings() {
  character.addPlayer();
  controls.render();
  makeLists();
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

function makeLists() {
  Object.entries(items).forEach(([itemName, item]) => {
    list[item.type] = list[item.type] ?? {byName: {}, list: []};
    list[item.type]['byName'][itemName] = item;
    list[item.type]['list'].push(item); 
  });
}

