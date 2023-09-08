
let pixelScale = 1; //window.devicePixelRatio;
let itemNumber = 0;
let qty = 10;
let containerBox = null;
let playerId = 0;
let step = { x: 5 * pixelScale, y: 5 * pixelScale};
let timers = { duration: 20 };
let list = {};

let bodySet = character.getBodySet();

// if savedate injected (by referencing it with ?id={dataFileId} then load it.
if (typeof saveData !== 'undefined') {
  state.write(saveData);
}

// start with ?reset to start a new game - link this to version of game != player.version
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('reset')) {
  state.clear();
}



// all of the events..
document.addEventListener("DOMContentLoaded", function () {
  introGame();
});

// prent context menus - does thi prevent mobile selecting text
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
  let direction = getDirection(event);
  if (isDirection(direction)) {
    character.movePlayer(direction);
  }
});

document.addEventListener("keyup", (event) => {
  //event.preventDefault();
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
  let introDelay = isDev ? 0.1 : 1;
  svg.animate(containerElement, 'goInvisible', introDelay, function () {
    setContainerBox();
    sky.render();
    // loads previously save state from localStorage if found
    state.load();
    if (player.day && player.day > 0) {
      field.redraw();
    } else {
      player.day = 1;
      field.addRandom();
      setupThings();
      state.save();
    }
  });
}

function setupThings() {
  character.addPlayer();
  home.render();
  hardware.render();
  cart.render();
  controls.render();
  makeLists();
  spuds.bestForList();
  spuds.sprout(6);
  makeLists();
  //field.addGrid();
  dialog.render();
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
    list[item.type] = list[item.type] ?? {byName: {}, list: []};
    list[item.type]['byName'][itemName] = item;
    list[item.type]['list'].push(item); 
  });
}

