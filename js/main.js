// page loaded - so init things

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

  renderMachines();
  renderSack();
}

// show contents of the sack
function renderSack() {
  let sackList = '';
  Object.entries(player.sack).forEach(([spudName, spudQty]) => {
    let spud = player.spuds.filter((spud) => spud.name == spudName)[0];
    if (spud) {
      let machine = player.shop.machines[player.shop.selected];
      sackList += `<div class="sackSpuds buttonize">`;
      sackList += `<div class="sackSpudName">${spudQty} ${spud.fullName}</div>`;
      sackList += `<div class="sackListButtons">`;
      if (spudQty > 0) {
        sackList += `<div class="spudListButton" onclick="moveSpuds('${spudName}', ${spudQty})">&lt;&lt;</div>`;
        sackList += `<div class="spudListButton" onclick="moveSpuds('${spudName}', 1)">&lt;</div>`;
      } else {
        sackList += `<div class="spudListButton" >&lt;&lt;</div>`;
        sackList += `<div class="spudListButton" >&lt;</div>`;
      }
      if (machine && machine.hopper && machine.hopper[spudName] > 0) {
        sackList += `<div class="spudListButton" onclick="moveSpuds('${spudName}', -1)">&gt;</div>`;
      } else {
        sackList += `<div class="spudListButton" >&gt;</div>`;
      }
      sackList += `</div>`;
      sackList += `<div class="sackSpudDesc">This is a ${spud.rareness} potato that is best for ${spud.bestFor}</div>`;
      sackList += `</div>`;
    }
  });

  element = document.querySelector('.sack');
  element.innerHTML = sackList;
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

  renderSack();
  renderHopper(player.shop.selected);
}

// show the machines next to the contents of the sack
function renderMachines() {
  let machineList = ``;
  player.shop.selected = '';
  Object.entries(player.shop.machines).forEach(([machineName, machine]) => {
    let selected = '';
    if (player.shop.selected == '') {
      selected = 'selected';
      player.shop.selected = machineName;
    }
    machineList += `<div class="machine buttonize ${selected}" id="machine_${machineName}" onclick="selectMachine('${machineName}')">`;
    machineList += listHopper(machineName);
    machineList += `</div>`;
  });

  element = document.querySelector('.machines');
  element.innerHTML = machineList;
}

// each machine has a hopper that is filled with spuds 
function renderHopper(machineName) {
  element = document.querySelector(`#machine_${machineName}`);
  element.innerHTML = listHopper(machineName);
}

function listHopper(machineName) {
  let machine = player.hardware[machineName];
  let hopper = `<div class="machineName">${machine.name}</div><div>`;
  Object.entries(player.shop.machines[machineName].hopper).forEach(([spudName, spudQty]) => {
    hopper += `<div>${spudName} = ${spudQty}</div > `;
  });
  hopper += `</div>`;
  hopper += `<div>${machine.desc}</div>`;

  return hopper;
}

// which machine gets the spuds
function selectMachine(machineName) {
  let className = 'selected';
  player.shop.selected = machineName;

  let elements = document.querySelectorAll(`.machine`);
  elements.forEach((element) => { element.classList.remove(className); });

  let element = document.querySelector(`#machine_${machineName}`);
  element.classList.add(className);
  renderSack();
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



// show or hide the sack via a dialog
function showSack() {
  let content = '';
  Object.entries(player.sack).forEach(([spudName, spudQty]) => {
    content += `<div class="buttonize">${spudName} = ${spudQty}</div>`;
  });
  const footer = `<button class="buttonize" onclick="showSack()"> Ok </button>`;
  showDialog('Inventory', content, footer);
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









