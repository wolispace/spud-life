// we have already defined things like player, spuds, controls, tools etc.. when including the js in html

// lods previously save state from localstorage if found
player = state.load();

document.addEventListener("DOMContentLoaded", function () {

  svg.hidePlayerSprite();
  fields.setupGrid();
  if (player.spuds.length < 1) {
    spuds.sprout(6);
    fields.fillField(player.currentField);
    fields.rollPatches();
    // gift the first machine first off
    player.hardware = hardware.store();
    let starter = 'chipper';
    player.shop.machines[starter] = player.hardware[starter].initial;
    tools.reset();
    fields.resetPlayer();
  }
  tools.render();
  dayCycle(false);
  svg.showPlayerSprite();
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
      fields.resetPlayer();
      fields.rollPatches();
      dream();
    }
  } else {
    // display the fields patches in their current state
    fields.renderField();
    fields.highlightCurrentPos();
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


// show or hide the dialog
function showDialog(title, content, footer) {
  let element = document.querySelector(`.dialog`);
  if (player.dialog) {
    element.style["top"] = "-10000px";
    element.style["left"] = "-10000px";
  } else {
    element.style["top"] = "5vh";
    element.style["left"] = "9vw";
    element = document.querySelector(`.dialog .header .title`);
    element.innerHTML = title;
    element = document.querySelector(`.dialog .content`);
    element.innerHTML = content;
    element = document.querySelector(`.dialog .footer`);
    element.innerHTML = footer;
  }
  player.dialog = !player.dialog;
}









