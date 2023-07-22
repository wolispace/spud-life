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
});

// hook into keys for movement and digging
document.addEventListener("keydown", (event) => {

  if (hint.visible) {
      // if any key is pressed and hit is visible then close it
      eval(`${hint.okButton}()`);
  } else if (dialog.visible) {
    if (dialog.closeKey.includes(event.code)) {
      dialog.close();
    } else if (dialog.cancelKey.includes(event.code)) {
      dialog.cancel();
    } else {
      // all other keys go to dialog
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
  player.hardware = hardware.store();
  let starter = "chipper";
  player.shop.machines[starter] = player.hardware[starter].initial;
  tools.reset();
  gameIntro();
}

function gameIntro () {
  let content = '<div class="dialog-content">';
  content += '<p><i>You receive a letter from a distance aunt. ';
  content += 'She is retiring from the food business and gives some things to see if you can make it into a thriving business</i></p>';
  content += '<p><b>Welcome to Spud life!</b></p>';
  content += '<p>During the day, you dig for potatoes (spuds).</p>';
  content += '<p>At the end of the day you open your food cart and sell delicious potato meals.</p>';
  content += '<p>Then you go to sleep and wake refreshed and ready to find more spuds!</p>';
  content += '<p>Visit the hardware store to upgrade your equipment and sell any junk you found in your travels.</p>';
  content += '</div>';

  let footer = "";
  footer += `<button class="buttonize" onclick="hints.off(); defineCharacter()"> Skip tutorial </button>`;
  footer += `<button class="buttonize" onclick="defineCharacter()"> Create your character </button>`;
  dialog.render("Welcome to spud life", content, footer);
console.log('ok');
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
    dialog.hide();
    state.save();
    tools.render();
    setPhase(player.phase);
    let element = document.querySelector(`#playerSprite`);
    element.innerHTML = svg.renderPerson(player.body);
    resizeStuff();
    hint.player();
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
    dialog.render("Character creator", `${content}`, footer);
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
  dialog.render(title, content, footer);

  machines.render();
  sack.render();
}

// const phases = ["field", "hardware", "allocate", "sales", "night"];
function setPhase(phase) {
  dialog.hide();
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
      dialog.hide();
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
    dialog.hide();
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
  let dream = `<div>` + dreams[rnd(dreams.length)] + `</div>`;

  let sleeps = [
    "You got to sleep quickly.",
    "You had a hard time getting to sleep.",
    "You stayed up very late playing Skyrim and fall asleep at your desk."

  ];
  let sleep = `<div>` + sleeps[rnd(sleeps.length)] + `</div>`
  
  let sow = fields.resowField();
  let income = customers.getIncome();

  let content = `<div class="dialog-message-content">`;
  content += `${income}${sleep}${dream}${sow}`;
  content += `<div>`;
  let title = "Home sweet home";
  let footer = "";
  footer += `<button class="buttonize" onclick="wake();"> Get out of bed </button>`;
  dialog.render(title, content, footer);
}

function wake() {
  let playerSprite = document.querySelector(`#playerSprite svg`);
  svg.animate(playerSprite, `grow`, 1, () => {svg.showPlayerSprite();});
  setPhase('field');
  dialog.hide();
}


