// we have already defined things like player, spuds, controls, tools etc.. when including the js in html

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('reset')) {
  state.clear();
}

// loads previously save state from localStorage if found
player = state.load();
bodySet = getBodySet();



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
  dialog.cancelButton = function () { hint.off(); character.customize(); };
  dialog.okButton = function () { console.log('ok'); character.customize(); };
  dialog.render("Welcome to spud life", content, footer);

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
}





