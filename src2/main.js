
let pixelScale = 1; //window.devicePixelRatio;
let itemNumber = 0;
let containerBox = null;
let step = { x: 5 * pixelScale, y: 5 * pixelScale };
let timers = { duration: 30 };
let list = { all: {} };
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

if (!urlParams.has('id') && typeof saveId !== 'undefined') {
  showTransferLink();
}

// all of the events..
document.addEventListener("DOMContentLoaded", function () {
  startGame();
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
  if (!game.keydown) {
    //event.preventDefault();
    let direction = game.getDirection(event);
    if (game.isDirection(direction)) {
      game.playerItem.move(direction);
    } else if (event.code == 'Space') {
      controls.dig();
    }
    game.keydown = true;
  }

});

document.addEventListener("keyup", (event) => {
  //event.preventDefault();
  game.keydown = false;
  controls.endInput();
});

function splashScreen() {
  let title = "Welcome to your Spud Life";
  let content = `<div class="dialogIntro">`;
  let titleSvg = svg.render('title');
  //titleSvg = svg.addOrientationClass(titleSvg);
  content += `<div class="introSvg">${titleSvg}</div>`;
  content += dialog.makeCheckbox("hintsOn", "Show hints on/off", player.hints);
  let footer = `Version ${game.version}`;
  footer += `<button class="buttonize" onclick="dialog.okButton()"> Let's play </button>`;
  dialog.cancelButton = function () { closeSplash(); };
  dialog.okButton = function () { closeSplash(); };
  dialog.render(title, content, footer);
}

function closeSplash() {
  player.hints = dialog.isChecked("hintsOn");
  dialog.hide();
  if (player.hints) {
    hint.player();
  }
}

function startGame() {
  character.bodySet = character.getBodySet();
  setContainerBox();
  // loads previously save state from localStorage if found
  game.load();

  controls.render();
  tools.setup();
  if (player.day && player.day > 0) {
    field.redraw();
  } else {
    player.day = 1;
    player.body = character.randomBody();
    setupThings();
    field.addRandom(player.currentField);
    field.redraw();
    game.save();

  }
  splashScreen();
}

function setupThings() {
  character.addPlayer();
  buildings.setup();
  buildings.render();
  scanner = new Scanner();
  hint.setup();
  dialog.setup();

  makeLists();
  if (Object.keys(player.spuds).length === 0) {
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
  let containerElement = document.querySelector(".world");
  containerBox = containerElement.getBoundingClientRect();
  sprite.setSize();
}

function clearWorld() {
  let bodyElement = document.querySelector(".world");
  bodyElement.innerHTML = `<div class="skyBox">
    <div class="nightShade"></div>
    <div class="starField"></div>    
  </div>
  <div class="grassField"></div>`;
  sky.render();
  sky.stars();
}

function makeLists() {
  Object.entries(items).forEach(([itemName, item]) => {
    list['all'][itemName] = item;
    list[item.type] = list[item.type] ?? { byName: {}, list: [] };
    list[item.type]['byName'][itemName] = item;
    list[item.type]['list'].push(item);
  });
}

function transfer () {
  let currentState = game.read();
  let rndName = randomName();

  let content = `<form method="post" action="?">`;
  content += `<div class="dialog-message-content">`;
  content += `<div>Your one-off transfer link lets you pick up this game on another device.</div>`;
  content += `<div>Your code is <input type="text" name="id" value="${rndName}" /></div>`
  content += `<div><input type="hidden" id="compressed" name="data" value="${currentState}" /></div>`
  content += `<div><button type="submit" class="buttonize">Generate link</button></div>`;
  content += `</div></form>`;

  let footer = "";
  footer += `<button class="buttonize" onclick="dialog.confirm()"> Cancel </button>`;
  dialog.cancelButton = function () { dialog.hide(); };
  dialog.okButton = function () { dialog.hide(); };
  dialog.hasInput = true;
  dialog.render("Transfer link", content, footer);
}


function showTransferLink () {
  let url = 'https://wolispace.com/spudlife';
  let link = `${url}?id=${saveId}`;

  let content = `<div class="dialog-message-content">`;
  content += `<div>Your one-off transfer link is:</div>`;
  content += `<div><a href="${link}">${link}</a></div>`;
  content += `<div>Email this to yourself to play on any device.</div>`;
  content += `<div>Remember, its your game saved at this point in time. Create another transfer link to continue on another device again</div>`;

  let footer = "";
  footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
  dialog.cancelButton = function () { character.render(); dialog.hide(); };
  dialog.okButton = function () { character.render(); dialog.hide(); };
  dialog.render("Transfer link", content, footer);
}

function writeState () {
  let compressed = document.querySelector('#compressed').value;
  game.write(compressed);
  player = game.load();
}
