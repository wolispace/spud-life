// we have already defined things like player, spuds, controls, tools etc.. when including the js in html

// lods previously save state from localstorage if found
player = state.load();
bodySet = getBodySet();

document.addEventListener("DOMContentLoaded", function () {
  svg.hidePlayerSprite();
  fields.setupGrid();
  if (player.spuds.length < 1) {
    // intro to game
    initGame();
  } else {
    tools.render();
    setPhase(player.phase);
  }
  resizeStuff();
  fields.clouds();
});

// hook into keys for movement and digging
document.addEventListener("keydown", (event) => {
  // convey keypresses into directional movements
  if (Object.keys(player.controlPos).includes(event.code)) {
    controls.click(
      "patch_" + (player.controls.start + player.controlPos[event.code])
    );
  }
  if (event.code == "Space") {
    fields.digPatch();
  }
});

window.addEventListener("resize", (event) => {
  resizeStuff();
});

function resizeStuff() {
  fields.renderGrassLine();
  fields.highlightCurrentPos();
  svg.showPlayerSprite();
}
// new game so generate
function initGame() {
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

// the default
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

  //console.log(newBody);
  return newBody;
}

// setup the default body
function defineCharacter(save = false) {
  // show or hide the character creator via a dialog
  if (save) {
    hideDialog();
    state.save();
    tools.render();
    setPhase(player.phase);
  } else {
    let newBody = randomBody();
    let baseBody = defaultBody();
    console.log("newBody", newBody);

    player.body = defaultBody();
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
    footer += `<button class="buttonize" onclick="defineCharacter(true)"> Ok </button>`;
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
  // element.innerHTML = spuds.render(spudName);
  //let svgPaths = svg.assemblePerson(player.body);
  element.innerHTML = svg.renderPerson(player.body);
  //svg.render("eye", 1, 'style="max-height: 20rem;"', {paths: svgPaths,});
}

// player chooses which spuds to put in what machines
function allocate() {
  // list all spuds in sack and all machines owned..
  let content = "<div><h2>Load machine hoppers</h2></div>";
  content += '<div class="allocateContent">';
  content += '<div class="machines"></div><div class="sack"></div></div>';

  let title = "Allocate spuds";
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
        fields.resetPlayer();
      } else {
        defineCharacter();
      }
    }
  } else {
    // display the fields patches in their current state
    fields.renderField();
    fields.highlightCurrentPos();
    svg.showPlayerSprite();
  }
}

// random dreams based on ong titles eg:
function dream() {
  let dreams = [
    "You dream of living in a park, but are rudely awoken by the dustmen",
    "You dream you are a walrus",
    "You dream of holding onto nothing, to see how long nothing lasts",
    "You dream of spinning plates",
    "You don't dream of anything, however you wake up, back to life, back to reality",
    "You dream you are a hero, just for one day",
    "You dream a little dream of me",
    "You dream the cake is a lie",
    "You dream about the delivery man",
    "You dream you are baba",
  ];
  let dream = dreams[rnd(dreams.length)];
  let sow = fields.resowField();

  let content = `<div>${dream}</div>${sow}`;
  let title = "Sleeping Zzzz";
  let footer = "";
  footer += `<button class="buttonize" onclick="setPhase('field')"> Get out of bed </button>`;
  showDialog(title, content, footer);
}

// show the dialog
function showDialog(title, content, footer) {
  hideDialog();
  let element = document.querySelector(`.dialog`);

  svg.hidePlayerSprite();
  element.style["top"] = "5vh";
  element.style["left"] = "9vw";
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
  player.dialog = false;
  svg.showPlayerSprite();
}
