// we have already defined things like player, spuds, controls, tools etc.. when including the js in html

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('reset')) {
  state.clear();
}

// loads previously save state from localStorage if found
player = state.load();
bodySet = getBodySet();



document.addEventListener("DOMContentLoaded", function () {
  // set the grid column
  let wholeField = document.querySelector(`.field`);

  wholeField.style.gridTemplateColumns = `1fr `.repeat(player.cols);
  svg.hidePlayerSprite();
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
  svg.showPlayerSprite();
  resizeStuff();

  setTimeout( () => {hint.render(3,"this is not a pipe")}, 1000);
});

// hook into keys for movement and digging
document.addEventListener("keydown", (event) => {
  // convey key presses into directional movements
  if (Object.keys(player.controlPos).includes(event.code)) {
    controls.click(
      "patch_" + controls[event.code]
    );
  }
  if (event.code == "Space") {
    fields.digPatch();
  }
});

window.addEventListener("resize", (event) => {
  resizeStuff();
});

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
  player.hardware = hardware.store();
  let starter = "chipper";
  player.shop.machines[starter] = player.hardware[starter].initial;
  tools.reset();
  defineCharacter();
}

function gameIntro () {
  content = 'You are a humble potato farmer.';
  content += 'During the day, you dig for potatoes (spuds).';
  content += 'At the end of the day you open your food cart and sell delicious potato meals.';
  content += 'Then you go to sleep and wake refreshed and ready to find more spuds!';
  content += 'Visit the hardware store to upgrade your equipment and sell any junk you found in your travels.';


  // toggle hints
  // - these show you what to do next 
  // 'Stand infront of your house and press UP to go into it and end the day'
  // 'Stand infront of your food cart and press UP to open yur cart for the evening'
  // 'Stand infront of the Hardware store to buy or upgrade equipment'
  // 'You can but new machiens for making different potato-based foods of varying quality'
  // 'Some potatoes are better in some machines and you get more from each meal'
  // 'You need a pick to break rocks'
  // 'You need an axe to clear logs'
  // 'You have used up your {tool} for today. Sleep and rejuvenate it'
  // 'Stand on the sign and press RIGHT to enter your new field'
  // 'Click on the basket to view its contents'
  // 'Click on your wallet to see how much money you have'
  // 'Choose a machine on the left'
  // 'Move all spuds (or one at a time) into, or out of, the machines hopper'
}

// the default
function defaultBody() {
  return {
    body: {
      type: "body-big",
      colour: "Navy",
    },

    head: {
      type: "head-head",
      colour: "Wheat",
    },
    nose: {
      type: "nose-triangle",
      colour: "Wheat",
    },
    brows: {
      type: "brows-wave",
      colour: "Black",
    },
    eye: {
      type: "eye-eye",
      colour: "DodgerBlue",
    },
    facial: {
      type: "facial-mustache",
      colour: "Brown",
    },
    hair: {
      type: "hair-curly",
      colour: "Brown",
    },
  };
}

// takes list of body parts from imgList and make easy-to-parse lists for each part
function getBodySet() {
  let partOptions = [];
  // extract body bits
  let baseBody = defaultBody();

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

// make a random body
function randomBody() {
  //let name = spudBits.prefix[rnd(spudBits.prefix.length)];
  let newBody = {};
  let skinTones = ["Cornsilk", "Bisque", "Wheat", "Tan", "SaddleBrown"];

  let colourNames = Object.keys(CSS_COLOR_NAMES);
  let skinTone = skinTones[rnd(skinTones.length)];

  Object.keys(bodySet).forEach((bodyPart) => {
    let variations = bodySet[bodyPart];
    let variation = variations[rnd(variations.length)];
    let colour = colourNames[rnd(colourNames.length)];
    if (",head,nose".indexOf(bodyPart) > 0) {
      colour = skinTone;
    }
    newBody[bodyPart] = {
      type: variation,
      colour: colour,
    };
  });

  return newBody;
}

// setup the default body
function defineCharacter(mode) {
  // show or hide the character creator via a dialog
  if (mode == "save") {
    hideDialog();
    state.save();
    tools.render();
    setPhase(player.phase);
    let element = document.querySelector(`#playerSprite`);
    element.innerHTML = svg.renderPerson(player.body);
  } else {
    let newBody = mode == "random" ? randomBody() : defaultBody();

    player.body = newBody;
    let content = "";
    content += '<div class="creator">';
    content += '<div class="left">';

    Object.entries(player.body).forEach(([key, part]) => {
      content += buildBodySelect(key);
    });

    content += "</div>";
    content += '<div class="demoBody">';
    content += "</div>";
    content += "</div>";

    let footer = "";
    footer += `<button class="buttonize" onclick="defineCharacter('random')"> Randomize </button>`;
    footer += `<button class="buttonize" onclick="defineCharacter('save')"> Ok </button>`;
    showDialog("Character creator", `${content}`, footer);
    demoBody();
  }
}

function buildBodySelect(bodyPart) {
  let colour = svg.colourOptions(player.body[bodyPart].colour);
  let part = svg.bodyPartOptions(bodyPart);

  return `<div>${bodyPart}<br/><select id="${bodyPart}" class="selectPart" onchange="demoBody()">${part}</select>
     <select id="${bodyPart}-colour" class="selectColour" onchange="demoBody()">${colour}</select></div>`;
}

// get the selected value from a select
function getSelectValue(id) {
  let element = document.querySelector(id);

  return element.value;
}

// redisplay character using current body parts
function demoBody() {
  Object.entries(player.body).forEach(([key, part]) => {
    player.body[key] = {
      type: getSelectValue(`#${key}`),
      colour: getSelectValue(`#${key}-colour`),
    };
  });

  let element = document.querySelector(".demoBody");
  element.innerHTML = svg.renderPerson(player.body);
}

// player chooses which spuds to put in what machines
function allocate() {
  // list all spuds in sack and all machines owned..
  let content = '<div class="allocateContent">';
  content += '<div class="machines"></div><div class="sack"></div></div>';

  let title = "Load spuds into machines";
  let footer = "";
  footer += `<button class="buttonize" onclick="setPhase('sales')"> Open shop </button>`;
  showDialog(title, content, footer);

  machines.render();
  sack.render();
}

// const phases = ["field", "hardware", "allocate", "sales", "night"];
function setPhase(phase) {
  hideDialog();
  player.phase = phase;
  state.save();
  if (player.phase != "field") {
    if (player.phase == "allocate") {
      allocate();
    } else if (player.phase == "hardware") {
      hardware.render();
    } else if (player.phase == "sales") {
      spuds.sell();
    } else if (player.phase == "night") {
      hideDialog();
      tools.reset();
      tools.render();
      fields.rollPatches();
      if (player.body) {
        dream();
        sky.goLight();
        sky.darkDoor();
        fields.resetPlayer();
      } else {
        defineCharacter();
      }
    }
  } else {
    // display the fields patches in their current state
    fields.renderField();
    fields.highlightCurrentPos();
    hideDialog();
  }
}


// random dreams based on ong titles eg:
function dream() {
  let dreams = [
    "You dreamt of living in a park, but were rudely awoken by the dustmen",
    "You dreamt you were a walrus",
    "You dreamt of holding onto nothing, to see how long nothing lasts",
    "You dreamt of spinning plates",
    "You didn't dream of anything, however you wake up, back to life, back to reality",
    "You dreamt you were a hero, just for one day",
    "You dreamt a little dreamt of me",
    "You dreamt the cake is a lie",
    "You dreamt about the delivery man",
    "You dreamt you were baba",
  ];
  let dream = dreams[rnd(dreams.length)];
  let sow = fields.resowField();

  let content = `<div class="dialog-message-content">`;
  content += `<div>${dream}.</div>${sow}`;
  content += `<div>`;
  let title = "Morning";
  let footer = "";
  footer += `<button class="buttonize" onclick="wake();"> Get out of bed </button>`;
  showDialog(title, content, footer);
}

function wake() {
  let playerSprite = document.querySelector(`#playerSprite svg`);
  svg.animate(playerSprite, `grow`, 1, () => {svg.showPlayerSprite();});
  setPhase('field');
  hideDialog();
}

// show the dialog
function showDialog(title, content, footer) {
  hideDialog();
  let element = document.querySelector(`.dialog`);

  svg.hidePlayerSprite();
  element.style["top"] = "1rem";
  element.style["left"] = "1rem";
  element = document.querySelector(`.dialog .header .title`);
  element.innerHTML = title;
  element = document.querySelector(`.dialog .content`);
  element.innerHTML = content;
  element = document.querySelector(`.dialog .footer`);
  element.innerHTML = footer;
  player.dialog = true;
}

// hide the dialog
function hideDialog() {
  let element = document.querySelector(`.dialog`);
  element.style["top"] = "-10000px";
  element.style["left"] = "-10000px";
  element = document.querySelector(`.dialog .header .title`);
  element.innerHTML = '';
  element = document.querySelector(`.dialog .content`);
  element.innerHTML = '';
  element = document.querySelector(`.dialog .footer`);
  element.innerHTML = '';
  player.dialog = false;
  svg.showPlayerSprite();
}
