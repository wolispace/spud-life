// we have already defined things like player, spuds, controls, tools etc.. when including the js in html

// lods previously save state from localstorage if found
player = state.load();


document.addEventListener("DOMContentLoaded", function () {
  fields.render();
  if (player.spuds.length < 1) {
    spuds.sprout(6);
    fields.fillField(player.currentField);
    fields.rollPatches();
    // gift the first machine first off
    player.hardware = hardware.store();
    let starter = 'chipper';
    player.shop.machines[starter] = player.hardware[starter].initial;
    fields.renderPatches();
    tools.reset();
    fields.resetPlayer();
  }
  controls.render();
  tools.render();
  // TOTO remove temp second patch
  //fillField(player.currentField + 1);
  dayCycle();
});


// hook into keys for movement and digging
document.addEventListener("keydown", (event) => {
  // convery keypresses into directonal movements
  if (Object.keys(player.controlPos).includes(event.code)) {
    controls.click(player.controls.start + player.controlPos[event.code]);
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



// move spuds from sack to machine hoppers
function moveSpuds(spudName, spudQty) {
  let machine = player.shop.machines[player.shop.selected];

  if (!machine.hopper[spudName]) {
    machine.hopper[spudName] = 0;
  }
  let existing = machine.hopper[spudName];

  machine.hopper[spudName] = spudQty + existing;
  player.sack[spudName] -= spudQty;

  sack.render();
  machines.renderHopper(player.shop.selected);
}





// move to the next phase in the day
function dayCycle() {
  state.save();
  const phases = ['field', 'allocate', 'hardware', 'sales', 'night'];
  let pages = document.querySelectorAll(`.page`);
  // turn all pages off..
  pages.forEach((page) => { page.style['display'] = 'none' });
  // increment the page the player is on
  let pos = phases.indexOf(player.phase);
  pos++;
  pos = pos >= phases.length ? 0 : pos;
  player.phase = phases[pos];
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
    fields.renderPatches();
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

//TODO: is this needed?
// update the dvg in a patch to have the same number of visible paths as the patches qty
function updatePatch(patch) {
  if (patch) {
    if (patch.block) {
      let existing = document.querySelectorAll(`#${patch.id} svg g`);
      if (existing) {
        let doneOne = false;
        let index = existing.length - 1;
        while (index >= 0) {
          let group = existing[index];
          if (!doneOne && !group.classList.contains('hidden')) {
            group.classList.add('hidden');
            doneOne = true;
          }
          index--;
        }
      }
    }
  }
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









