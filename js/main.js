version = '2.0.0-beta';

// if savedate injected (by referencing it with ?id={dataFileId} then load it.
if (typeof saveData !== 'undefined') {
  state.write(saveData);
}

// start with ?reset to start a new game - link this to version of game != player.version
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('reset')) {
  state.clear();
}

// loads previously save state from localStorage if found
player = state.load();
bodySet = getBodySet();

if (player && player.version && player.version != version) {
  handleVersionChange(player.version, version);
}

player.version = version;

document.addEventListener("DOMContentLoaded", function () {
  initModules();

  character.hide();
  fields.setupGrid();
  if (player.spuds.length < 1) {
    // intro to game
    initGame();
  } else {
    tools.render();
    if (player.phase == 'sales' || player.phase ==  'allocate') {
      player.phase = 'field';
    }
    setPhase(player.phase);
  }
  sky.render();
  sky.clouds();
  character.render();
  resizeStuff();

  if (!player.daytime) {
    let nightShade = document.querySelector(`#nightShade`);
    nightShade.style.opacity = 1;
    sky.lightDoor();
    hint.goHome();
  }

  if (!urlParams.has('id') && typeof saveId !== 'undefined') {
    showTransferLink();
  }
});

// hook into keys for movement and digging
document.addEventListener("keydown", (event) => {

  if (hint.visible) {
      // if any key is pressed and hit is visible then close it
      hint.confirm();
  } else if (dialog.visible) {
    if (dialog.title == 'Character creator') {
      // leave keys as is
    } else {
      if (dialog.confirmKey.includes(event.code)) {
        dialog.confirm();
      } else if (dialog.cancelKey.includes(event.code)) {
        dialog.cancel();
      } else {
        // all other keys go to dialog
      }
    }
  } else {
    // if the dig key was pressed then dig
    if (fields.digKey.includes(event.code)) {
      fields.digPatch();
    }
    // convey key presses into directional movements
    if (Object.keys(player.controlPos).includes(event.code)) {
      controls.click(
        "patch_" + controls[event.code]
      );
    }    
  }
});

window.addEventListener("resize", (event) => {
  resizeStuff();
});

function initModules() {
  hint.sprite = document.querySelector('#hintSprite');
  dialog.sprite = document.querySelector(`.dialog`);
  // set the grid column
  let wholeField = document.querySelector(`.field`);
  wholeField.style.gridTemplateColumns = `1fr `.repeat(player.cols);
}

function animatePlayerOn() {
  let playerSprite = document.querySelector(`#playerSprite`);
  playerSprite.style.transition = "0.15s ease-in-out";
}

function animatePlayerOff() {
  let playerSprite = document.querySelector(`#playerSprite`);
  playerSprite.style.transition = "";
}

function resizeStuff() {
  animatePlayerOff();
  fields.renderGrassLine();
  sky.render();
  fields.highlightCurrentPos();
  animatePlayerOn();
}

// new game so generate
function initGame() {
  // intro to game and initial settings (hints on/off)
  spuds.sprout(6);
  fields.fillField(player.currentField);
  fields.rollPatches();
  // gift the first machine first off
  let starter = "chipper";
  player.shop.machines[starter] = hardware.items[starter].initial;
  starter = "spade";
  player.tools[starter] = hardware.items[starter].initial;
  tools.reset();
  gameIntro();
}

function gameIntro () {
  let content = `<div class="dialog-message-content">`;
  content += '<div>You receive a letter from a distance aunt: </div>';
  content += '<div><i>"I am retiring from the food business and and have no need for these things, see what you can do with them?"</i></div>';
  content += '<div><b>Welcome to Spud life!</b></div>';
  content += '<div>During the day, you dig for potatoes (spuds).</div>';
  content += '<div>At the end of the day you open your food cart and sell potato meals.</div>';
  content += '<div>Then you go home to sleep and wake refreshed and ready to find more spuds!</div>';
  content += '<div>Visit the hardware store to upgrade your equipment and sell any junk you find in your travels.</div>';
  content += '</div>';

  let footer = "";
  footer += `<button class="buttonize" onclick="dialog.confirm()"> Create your character </button>`;
  dialog.cancelButton = function () { character.customize(); };
  dialog.okButton = function () { character.customize(); };
  dialog.render("Welcome to your spud life", content, footer);
}

function aboutGame () {
  let content = `<div class="dialog-message-content">`;
  content += `<div>This game was inspired by 'Man Eats Fish' by <a href="http://www.supermoof.com/">SuperMoof</a></div>`;
  content += `<div>I wanted to make a browser-based game that:`;
  content += `<li>has no dedicated server</li>`;
  content += `<li>doesn't rely on third-party libraries or assets</li>`;
  content += `<li>can be stopped and started quickly and easily</li>`;
  content += `<li>doesn't require quick reflexes or boss-fights</li>`;
  content += ` I got close. The only thing I am relying on is <a href="https://github.com/pieroxy/lz-string">lz-string</a> to compress the game state that is stored in local storage.</div>`;

  content += `<div>No fish or svg paths were harmed during the making of this game.</div>`;
  content += `<div>Version ${version}</div>`;
  content += `</div>`;

  let footer = "";
  footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
  dialog.cancelButton = function () { character.render(); dialog.hide(); };
  dialog.okButton = function () { character.render(); dialog.hide(); };
  dialog.render("About spud life", content, footer);
}

function loadSave () {
  let currentState = state.read();
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
  dialog.cancelButton = function () { character.render(); dialog.hide(); };
  dialog.okButton = function () { character.render(); dialog.hide(); };
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
  state.write(compressed);
  player = state.load();
}



// takes list of body parts from imgList and make easy-to-parse lists for each part
function getBodySet() {
  let partOptions = [];
  // extract body bits
  let baseBody = character.defaultBody;

  Object.keys(baseBody).forEach((bodyPart) => {
    partOptions[bodyPart] = [];
    Object.entries(svg.imgList).forEach(([key, part]) => {
      if (`${key}-`.indexOf(bodyPart) > -1) {
        let bits = key.split("-");
        partOptions[bodyPart].push(key);
      }
    });
  });

  return partOptions;
}

// get the selected value from a select
function getSelectValue(id) {
  let element = document.querySelector(id);

  return element.value;
}

// breaking changes udate the players saved state if possible
function handleVersionChange(oldVersion, newVersion) {
  if (version == '2.0.0-beta') {
    player.basket = player.sack;
    delete player.sack;
    console.log('updated player sack', player);
  } else {
    console.log(player);
    if (!confirm('Your game was saved within an older version. It might not be stable. Do you want to continue anyhow?')) {
      state.clear(true);
    }
  }
}

// TODO: this is going..
function setPhase(phase) {
  player.phase = phase;
  state.save();
  if (player.phase != "field") {

  } else {
    // display the fields patches in their current state
    fields.renderField();
    fields.highlightCurrentPos();
    dialog.hide();
  }
};


