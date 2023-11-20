
let pixelScale = 1; //window.devicePixelRatio;
let itemNumber = 0;
let containerBox = null;
let step = { x: 5 * pixelScale, y: 5 * pixelScale };
let timers = { duration: 30 };
let list = { all: {} };
let scanner = null;

// if savedate injected (by referencing it with ?id={dataFileId} then load it.
if (typeof saveData !== 'undefined') {
  game.transferred = true;
  game.write(saveData);
}

// start with ?reset to start a new game - link this to version of game != player.version
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('reset')) {
  game.clear();
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

document.addEventListener('touchstart', function (event) {
  if (!['BUTTON', 'INPUT', 'LABEL', 'svg', 'DIV'].includes(event.target.tagName)) {
    event.preventDefault();
  }
}, { passive: false });

document.addEventListener('touchend', function (event) {
  if (!['BUTTON', 'INPUT', 'LABEL', 'svg', 'DIV'].includes(event.target.tagName)) {
    event.preventDefault();
  }
}, { passive: false });

window.addEventListener("resize", (event) => {
  location.reload();
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
    game.new = true;
    player.day = 1;
    player.body = character.randomBody();
    setupThings();
    field.addRandom(player.currentField);
    field.redraw();
    game.save();

  }
  if (!urlParams.has('id') && typeof saveId !== 'undefined') {
    showTransferLink();
  } else {
    splashScreen();
  }
}

function setupThings() {
  character.addPlayer();
  buildings.setup();
  buildings.render();
  scanner = new Scanner();
  hint.setup();
  dialog.setup();
  field.resize();
  
  makeLists();
  if (Object.keys(player.spuds).length === 0) {
    spuds.bestForList();
    spuds.sprout(game.spudVarieties);
  } else {
    spuds.addToItems();
  }
  // run a second time once we have other lists to work from..
  makeLists();
  // are we conflicting.. if so move to Y 1
  game.playerItem.checkCollisions(game.ABOVEGROUND, false);
  
  if (game.playerItem.hitItem || game.playerItem.y < sprite.height) {
    game.playerItem.y = sprite.height;
    game.playerItem.x = 1;
    game.playerItem.position();
    console.log('re-render player');
    //window.resizeTo(window.screen.availWidth / 2, window.screen.availHeight / 2);
  }


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

function splashScreen() {
  let back = game.new ? '' : ' back ';
  let title = `Welcome ${back} to your Spud Life`;
  let content = `<div class="dialogIntro">`;
  let titleSvg = svg.render('title');
  //titleSvg = svg.addOrientationClass(titleSvg);
  content += `<div class="introSvg">${titleSvg}</div>`;
  if (!game.new) {
    content += `Welcome back ${player.name}`;
  }
  content += dialog.makeCheckbox("hintsOn", "Show hints on/off", player.hints);

  content += `<div>`;
  content += `<input placeholder="Transfer code" type="text" name="id" id="transferCode" value="" title="Enter a transfer code from another device to continue playing here" />`
  content += `</div>`;

  let footer = '';
  if (!game.new) {
    footer += `<button class="buttonize" onclick="game.clear(true)"> New game! </button>`;
  }
  footer += `v${game.version}`;

  footer += `<button class="buttonize" onclick="dialog.okButton()"> Let's play </button>`;
  dialog.cancelButton = function () { closeSplash(); };
  dialog.okButton = function () { closeSplash(); };
  dialog.render(title, content, footer);
}

function closeSplash() {
  let transferCode = document.querySelector("#transferCode").value;
  if (transferCode) {
    window.location.replace(`?id=${transferCode}`);
  }
  player.hints = dialog.isChecked("hintsOn");
  dialog.hide();


  // if first time go straight to wardrobe
  if (game.new) {
    storyIntro();
  } else {
    if (player.hints) {
      hint.player();
    }
  }

}

function storyIntro() {
  let items = ['spade', 'basket', 'home', 'cart', 'scanner'];
  let itemsShow = '<div style="display: flex; justify-content: space-evenly;">';
  items.forEach((item) => {
    itemsShow += svg.inline(item);
  });
  itemsShow += '</div>';

  let content = `<div class="dialog-message-content">`;
  content += '<div>You receive a letter from a distance aunt: </div>';
  content += '<div><i>"I am retiring from the food business and have no need for these things. See what you can do with them"</i></div>';
  content += `<div>${itemsShow}</div>`;
  content += '<div>During the day, you dig for potatoes (spuds).<sup>*</sup></div>';
  content += '<div>At the end of the day you open your food cart and sell potato meals.</div>';
  content += '<div>Then you go home to sleep. Wake refreshed and ready to find more spuds!</div>';
  content += '<div>Visit the hardware store to upgrade your equipment and sell any junk you find in your travels.</div>';
  content += '<div class="footnote"><sup>*</sup> Any similarity to potatoes living or dead is purely coincidental</div>';
  content += '</div>';

  let footer = "";
  footer += `<button class="buttonize" onclick="dialog.confirm()"> Create your character </button>`;
  dialog.cancelButton = character.customize;
  dialog.okButton = character.customize;
  dialog.render("Letter from your aunt", content, footer);
}

function aboutGame() {
  let content = `<div class="dialog-message-content">`;
  content += `<div>This game was inspired by 'Man Eats Fish' by <a href="http://www.supermoof.com/">SuperMoof</a></div>`;
  content += `<div>I wanted to make a browser-based game that:`;
  content += `<li>has no dedicated server</li>`;
  content += `<li>doesn't rely on third-party libraries or assets</li>`;
  content += `<li>can be stopped and started quickly and easily</li>`;
  content += `<li>doesn't require quick reflexes or boss-fights</li>`;
  content += ` I got close. The only thing I am relying on is <a href="https://github.com/pieroxy/lz-string">lz-string</a> to compress the game state that is stored in local storage.</div>`;

  content += `<div>No fish or svg paths were harmed during the making of this game.</div>`;
  content += `<div>Version ${game.version}</div>`;
  content += `</div>`;

  let footer = "";
  footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
  dialog.cancelButton = function () { dialog.hide(); };
  dialog.okButton = function () { dialog.hide(); };
  dialog.render("About spud life", content, footer);
}


function transfer() {
  let currentState = game.read();
  let rndName = randomName();

  let content = `<form method="post" action="?">`;
  content += `<div class="dialog-message-content">`;
  content += `<div>Your one-off transfer code lets you continue playing as ${player.name} at this point in time on another device.</div>`;
  content += `<div>Your code will be <input type="text" name="id" id="transferCode" value="${rndName}" /></div>`
  content += `<div><input type="hidden" id="compressed" name="data" value="${currentState}" /></div>`
  content += `<div><button type="submit" class="buttonize">Generate new code</button></div>`;
  content += `</div></form>`;

  let footer = "";
  footer += `<button class="buttonize" onclick="dialog.confirm()"> Cancel </button>`;
  dialog.cancelButton = function () { dialog.hide(); };
  dialog.okButton = function () { dialog.hide(); };
  dialog.hasInput = true;
  dialog.render("New transfer code", content, footer);
}


function showTransferLink() {
  let content = `<div class="dialog-message-content">`;
  content += `<div>Your transfer code is: <strong>${saveId}</strong></div>`;
  content += `<div></div>`;
  content += `<div>It is this game saved at this point in time.</div>`;
  content += `<div>Enter it on the welcome screen on a different device.</div>`;
  content += `<div>Create a new transfer code each time you want to continue playing as ${player.name} on a different device.</div>`;

  let footer = "";
  footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
  dialog.cancelButton = function () { dialog.hide(); };
  dialog.okButton = function () { dialog.hide(); };
  dialog.render("Your new transfer code", content, footer);
}

function endShowTransfer() {
  dialog.hide();
  splashScreen();
}

function writeState() {
  let compressed = document.querySelector('#compressed').value;
  game.write(compressed);
  player = game.load();
}
