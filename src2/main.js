
let pixelScale = 1; //window.devicePixelRatio;
let itemNumber = 0;
let containerBox = null;
let step = { x: 5 * pixelScale, y: 5 * pixelScale};
let timers = { duration: 30 };
let list = {all: {}};
let scanner = null;

// if savedate injected (by referencing it with ?id={dataFileId} then load it.
if (typeof saveData !== 'undefined') {
  game.write(saveData);
}

// start with ?reset to start a new game - link this to version of game != player.version
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('reset')) {
  game.clear();
}

// all of the events..
document.addEventListener("DOMContentLoaded", function () {
  introGame();
});

// prevent context menus - does this prevent mobile selecting text
// ot so we need the user-select: none; css?
document.addEventListener('contextmenu', event => {
  if (!isDev) {
    event.preventDefault();
  }
});

window.addEventListener("resize", (event) => {
  return;
  let last = {
    width: containerBox.width,
    height: containerBox.height
  }
  setContainerBox();
  let newWidthPct = containerBox.width / last.width;
  let newHeightPct = containerBox.height / last.height;

  sprite.resize(newWidthPct, newHeightPct);
  
});

document.addEventListener("keydown", (event) => {
  //event.preventDefault();
  let direction = game.getDirection(event);
  if (game.isDirection(direction)) {
    game.playerItem.move(direction);
  } else if (event.code == 'Space') {
    controls.dig();
  }
});

document.addEventListener("keyup", (event) => {
  //event.preventDefault();
  controls.endInput();
});

function introGame() {
  character.bodySet = character.getBodySet();
  let containerElement = document.querySelector(".container");
  let titleSvg = svg.render('title');
  titleSvg = svg.addOrientationClass(titleSvg);
  containerElement.innerHTML = titleSvg;
  let introDelay = isDev ? 0.1 : 3;
  svg.animate(containerElement, 'goInvisible', introDelay, function () {
    setContainerBox();
    // loads previously save state from localStorage if found
    game.load();

    if (player.day && player.day > 0) {
      field.redraw();
    } else {
      player.day = 1;
      player.body = character.randomBody();
      setupThings();
      field.addRandom();
      field.redraw();
      game.save();
    }
  });
}

function setupThings() {
  character.addPlayer();
  buildings.setup();
  buildings.render();
  controls.render();
  scanner = new Scanner();
  hint.setup();
  dialog.setup();
  tools.setup();
  makeLists();
  if (Object.keys(player.spuds).length === 0 ) {
    spuds.bestForList();
    spuds.sprout(6);
  } else {
    spuds.addToItems();
  }
  // run a second time once we have other lists to work from..
  makeLists();
  scanner.scan();
}

function setContainerBox() {
  let containerElement = document.querySelector(".container");
  containerBox = containerElement.getBoundingClientRect();
  sprite.setSize();
}

function clearBody() {
  let bodyElement = document.querySelector("body");
  bodyElement.innerHTML = `<div class="container"></dv><div class="skyBox"></dv>`;
  sky.render();
}

function makeLists() {
  Object.entries(items).forEach(([itemName, item]) => {
    list['all'][itemName] = item;
    list[item.type] = list[item.type] ?? {byName: {}, list: []};
    list[item.type]['byName'][itemName] = item;
    list[item.type]['list'].push(item); 
  });
}

