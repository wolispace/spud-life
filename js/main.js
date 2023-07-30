version = '1.0.0-beta';

// start with ?reset to start a new game - link this to version of game != player.version
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('reset')) {
  state.clear();
}

// loads previously save state from localStorage if found
player = state.load();
bodySet = getBodySet();

if (player && player.version && player.version != version) {
  if (!confirm('Your game was saved within an older version. It might not be stable. Do you want to continue anyhow?')) {
    state.clear(true);
  }
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
  content += `<li>could be stopped and started quickly and easily</li>`;
  content += `<li>does not require quick reflexes</li>`;
  content += ` I got close. The only thing I am relying on is <a href="https://github.com/pieroxy/lz-string">lz-string</a> to compress the game state that is stored in local storage.</div>`;

  content += `<div>Things to do:`;
  content += `</div>`;

  content += `<div>No svg paths were harmed the making of this game.</div>`;
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

  let content = `<div class="dialog-message-content">`;
  content += `<textarea id="compressed" style="height:20rem">${currentState}</textarea>`
  content += `<div>Copy the above text, and paste (replace) it into a new browser session of Spud life to transfer this game</div>`
  content += `</div>`;

  let footer = "";
  footer += `<button class="buttonize" onclick="dialog.confirm()"> Save </button>`;
  dialog.cancelButton = function () { character.render(); dialog.hide(); };
  dialog.okButton = function () { writeState(); };
  dialog.render("Load and save", content, footer);
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


