// we have already defined things like player, spuds, controls, tools etc.. when including the js in html

// lods previously save state from localstorage if found
player = state.load();

document.addEventListener("DOMContentLoaded", function () {

  svg.hidePlayerSprite();
  fields.setupGrid();
  if (player.spuds.length < 1) {

    // intro to game
    initGame();
  }
  tools.render();
  dayCycle(false);

});


// hook into keys for movement and digging
document.addEventListener("keydown", (event) => {
  // convery keypresses into directonal movements
  if (Object.keys(player.controlPos).includes(event.code)) {
    controls.click('patch_' + (player.controls.start + player.controlPos[event.code]));
  }
  if (event.code == 'Space') {
    fields.digPatch();
  }
  if (event.code == 'Enter') {
    dayCycle();
  }
});

// new game so generate 
function initGame() {
  spuds.sprout(6);
  fields.fillField(player.currentField);
  fields.rollPatches();
  // gift the first machine first off
  player.hardware = hardware.store();
  let starter = 'chipper';
  player.shop.machines[starter] = player.hardware[starter].initial;
  tools.reset();
}

// setup the default body
function defineCharacter(save = false) {
  if (!player.body) {
    player.body = {
      body: {
        type: "body-big", colour: "navy"
      },
      head: {
        type: "head", colour: "wheat"
      },
      nose: {
        type: "nose-triangle", colour: "wheat"
      },
      eyebrow: {
        type: "eyebrow-wave", colour: "black"
      },
      eye: {
        type: "eye", colour: "dodgerblue"
      },
      hair: {
        type: "hair-curly", colour: "brown"
      },
    }
  }
  // show or hide the sack via a dialog
  if (save) {
    hideDialog();
    dayCycle();
  } else {
    let content = '';
    content += '<div class="creator">';
    content += '<div class="left">';
    let colour = svg.colourOptions();

    let part = svg.bodyPartOptions('hair');
    content += `<div><select id="hair" onchange="demoBody()">${part}</select>
      <br/><select id="hair-colour" onchange="demoBody()">${colour}</select></div>`;

    part = '<option>eye</option>';
    content += `<div><select id="eye" onchange="demoBody()">${part}</select>
      <br/><select id="eye-color" onchange="demoBody()">${colour}</select></div>`;

    part = '<option>body</option>';
    content += `<div><select id="body" onchange="demoBody()">${part}</select>
        <br/><select id="body-color" onchange="demoBody()">${colour}</select></div>`;

    content += '</div>';
    content += '<div class="demoBody">';
    content += '</div>';
    content += '</div>';
    // let style = `style="width:2rem;"`;
    // Object.entries(player.sack).forEach(([spudName, spudQty]) => {
    //   let spudInfo = player.spuds.filter(spud => spud.name == spudName)[0];
    //   if (spudInfo) {
    //     let icon = spuds.render(spudInfo.name, style);
    //     content += `<div class="buttonize">${icon} ${spudName} = ${spudQty}</div>`;
    //   } else {
    //     let icon = svg.render(spudName, 1, style);
    //     content2 += `<div class="buttonize">${icon} ${spudName} = ${spudQty}</div>`;
    //   }
    // });

    let footer = '';
    footer += `<button class="buttonize" onclick="defineCharacter(true)"> Ok </button>`;
    showDialog('Character creator', `${content}`, footer);
    demoBody();
  }
}

// get the selected value from a select
function getSelectValue(id) {
  let element = document.querySelector(id);
  return element.value;
}

// redisplay character using current body parts
function demoBody() {

  player.body = {
    body: {
      type: "body-big", colour: getSelectValue('#body-color')
    },
    head: {
      type: "head", colour: "wheat"
    },
    nose: {
      type: "nose-triangle", colour: "wheat"
    },
    eyebrow: {
      type: "eyebrow-wave", colour: "black"
    },
    eye: {
      type: "eye", colour: getSelectValue('#eye-color')
    },
    hair: {
      type: getSelectValue('#hair'), colour: getSelectValue('#hair-colour')
    },
  }

  let element = document.querySelector('.demoBody');
  // element.innerHTML = spuds.render(spudName);
  let svgPaths = svg.assemblePerson();
  element.innerHTML = svg.render("eye", 1, 'person', { "paths": svgPaths });
}

// player chooses which spuds to put in what machines
function allocate() {
  // list all spuds in sack and all machines owned..
  let allocate = '<div><h2>Load machine hoppers</h2></div>';
  allocate += '<div class="allocateContent">';
  allocate += '<div class="machines"></div><div class="sack"></div></div>';

  element = document.querySelector('.allocate');
  element.innerHTML = allocate;

  machines.render();
  sack.render();
}

// move to the next phase in the day
function dayCycle(moveOn = true) {
  state.save();
  const phases = ['field', 'allocate', 'hardware', 'sales', 'night'];
  let pages = document.querySelectorAll(`.page`);
  // turn all pages off..
  pages.forEach((page) => { page.style['display'] = 'none' });
  // increment the page the player is on
  if (moveOn) {
    let pos = phases.indexOf(player.phase);
    pos++;
    pos = pos >= phases.length ? 0 : pos;
    player.phase = phases[pos];
  }
  // turn on the page the player is on
  if (player.phase != 'field') {
    svg.hidePlayerSprite();
    element = document.querySelector('.' + player.phase);
    element.style['display'] = 'block';
    if (player.phase == 'allocate') {
      allocate();
    } else if (player.phase == 'hardware') {
      hardware.render();
    } else if (player.phase == 'sales') {
      spuds.sell();
    } else if (player.phase == 'night') {
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
    "You dream of living in a park, but are rudly awoken by the dustmen",
    "You dream you are a walrus",
    "You dream of holding onto nothing, to see how long nothing lasts",
    "You dream of spinning plates",
    "You don't dream of anything but wake up back to life, back to reality",
    "You dream you are a hero, just for one day",
    "You dream a little dream of me",
    "You dream the cake is a lie",
    "You dream about the delivery man",
    "You dream you are baba"
  ]
  let dream = dreams[rnd(dreams.length)];
  let sow = fields.resowField();

  element = document.querySelector('.night');
  element.innerHTML = `<div>${dream}</div>${sow}`;
}


// show the dialog
function showDialog(title, content, footer) {
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









