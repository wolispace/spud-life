// page loaded - so init things
let player = loadPlayer();

document.addEventListener("DOMContentLoaded", function () {

  player = player ?? defaultPlayer();
  //console.log(player);

  drawField();
  if (player.spuds.length < 1) {
    sproutSpuds(6);
    fillField(player.currentField);
    rollPatches();
    // gift the first machine first off
    let starter = 'chipper';
    player.shop.machines[starter] = player.hardware[starter].initial;
    renderPatches();
    resetTools();
    resetPlayer();
  }
  renderControls();
  renderTools();
  // TOTO remove temp second patch
  //fillField(player.currentField + 1);
  dayCycle();
});


// hook into keys for movement and digging
document.addEventListener("keydown", (event) => {
  // convery keypresses into directonal movements
  if (Object.keys(player.controlPos).includes(event.code)) {
    controlClick(player.controls.start + player.controlPos[event.code]);
  }
  if (event.code == 'Space') {
    digPatch();
  }
  if (event.code == 'Enter') {
    dayCycle();
  }
});

// save all player data compressed in local storage 
function savePlayer() {
  let compressed = LZString.compressToUTF16(JSON.stringify(player));
  localStorage.setItem("player", compressed);
}

// retrieve compressed player data from local story
function loadPlayer() {
  let compressed = localStorage.getItem("player");
  if (compressed) {
    let decompressed = LZString.decompressFromUTF16(compressed);
    return JSON.parse(decompressed);
  }
}

// selling the meals from the machines
function sellSpuds() {
  let totalMeals = 0;
  let totalIncome = 0;

  // loop through all machines
  // if machine has spuds in its hopper
  // convert spuds into food (hopper.qty x spud.price)
  Object.entries(player.shop.machines).forEach(([machineName, machine]) => {
    if (machine.hopper) {
      Object.entries(machine.hopper).forEach(([spudName, spudQty]) => {
        let spudInfo = player.spuds.filter(spud => spud.name == spudName);
        let bonus = (machine.makes = spudInfo.bestFor) ? 2 : 1;
        let salePrice = machine.pricePerItem * bonus * spudQty;
        totalMeals = totalMeals + spudQty;
        totalIncome = totalIncome + salePrice;
        //console.log(`${salePrice} = ${machine.pricePerItem} * ${bonus} * ${spudQty} `);
      });
      // empty the machine
      machine.hopper = {};
    }
  });

  player.purse += totalIncome;
  let salesList = `Total meals=${totalMeals} income=${totalIncome}`;
  element = document.querySelector('.sales');
  element.innerHTML = salesList;
}

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

//generate the the complete random list of spuds for this session
function sproutSpuds(qty) {
  let counter = 0;
  let spudBits = {
    "prefix": ['Bo', 'Sa', 'Ru', 'Kri', 'Ar'],
    "middle": ['sa', 'cho', 'ma', 'nal', 'sso', 'li'],
    "suffix": ['lor', 'ker', 'pry', 'ly', 'der', 'mid'],
    "bestFor": ['chips', 'baked potatoes', 'curly-fries', 'soup'],
    "color": ['white', 'brick', 'wheat', 'teal', 'orange', 'maroon', 'black', 'navy', 'pink', 'purple', 'red'],
    "showColors": ['white', 'orange', 'black', 'pink', 'purple', 'red'],
    "rareness": ["common", "standard", "rare"]
  };
  // used next element from array cycling back to the start so its not completely random.
  let colorCycle = rnd(spudBits.color.length);
  let rarityCicle = rnd(spudBits.rareness.length);
  let bestForCycle = rnd(spudBits.bestFor.length);
  let namedSpuds = [];
  while (counter < qty) {
    let name = spudBits.prefix[rnd(spudBits.prefix.length)];
    name += spudBits.middle[rnd(spudBits.middle.length)];
    while (namedSpuds.includes(name)) {
      name += spudBits.middle[rnd(spudBits.middle.length)];
    }
    namedSpuds.push(name);
    if (rnd(3) > 1) {
      name += spudBits.suffix[rnd(spudBits.suffix.length)];
    }

    let colorName = spudBits.color[colorCycle];
    let rarityName = spudBits.rareness[rarityCicle];
    let fullName = rnd(3) > 1 ? `${rarityName} ` : '';
    if (spudBits.showColors.includes(colorName)) {
      fullName += `${colorName} `;
    }
    fullName += name;
    // uppercase first letter
    fullName = fullName.charAt(0).toUpperCase() + fullName.slice(1);

    player.spuds[counter++] = {
      "name": name,
      "fullName": fullName,
      "color": colorName,
      "rareness": rarityName,
      "bestFor": spudBits.bestFor[bestForCycle],
    }
    // roll on to next item in the list so everyone gets atleast one ofeverything
    colorCycle = ++colorCycle >= spudBits.color.length ? 0 : colorCycle;
    rarityCicle = ++rarityCicle >= spudBits.rareness.length ? 0 : rarityCicle;
    bestForCycle = ++bestForCycle >= spudBits.bestFor.length ? 0 : bestForCycle;
  }
}

// randomly fill the current field with rocks, logs and spuds - plus some ranom treasure!
function fillField(fieldId) {
  if (!player.fields[fieldId]) {
    player.fields[fieldId] = [];
  }

  // first row 0 and 10 may contain links to other fields
  if (player.fields[fieldId - 1]) {
    player.fields[fieldId][0] = { id: "patch_0", block: { type: "control-icon--left", qty: 1, onclick: `switchField(${fieldId - 1})` } };
  }
  if (player.fields[fieldId + 1]) {
    player.fields[fieldId][9] = { id: "patch_9", block: { type: "control-icon--right", qty: 1, onclick: `switchField(${fieldId + 1})` } };
  }
  // skip the fisrt row
  let i = 10;
  while (i < 100) {
    if (rnd(2) > 0) {
      // rock, log or spud?
      let patch = {};
      switch (rnd(3)) {
        case 0:
          patch.block = { "type": "rock", "qty": rnd(5) + 1 };
          break;
        case 1:
          patch.block = { "type": "log", "qty": rnd(5) + 1 };
          break;
        case 2:
          patch.spud = {};
          break;
      }
      if (patch !== {}) {
        let newSpud = player.spuds[rnd(player.spuds.length)];
        patch.spud = { "name": newSpud.name, "qty": rnd(3) + 1 };
      }
      if (!player.fields[fieldId]) {
        player.fields[fieldId] = [];
      }
      player.fields[fieldId][i] = patch;
    }
    i++;
  };
}

// loop through all fields and increment the holes and sow seeds if needed
function rollPatches() {
  player.fields.forEach((field, fieldId) => {
    field.forEach((patch, index) => {
      patch = patch ?? {};
      patch.id = `patch_${index}`;
      // roll the spuds so holes slowly get fill and can be re-seeded
      if (patch.spud) {
        if (patch.spud.qty < 0) {
          patch.spud.qty++;
        }
        if (patch.spud.qty == 0) {
          delete patch.spud;
          player.sowSeeds++;
        }
      }
    });
  });
}
// add an svg to each patch
function renderPatches() {
  player.fields[player.currentField].forEach((patch, index) => {
    patch = patch ?? {};
    patch.id = `patch_${index}`;
    if (patch.block && patch.block.type == 'control') {
      // leave alone
      renderPatch(patch);
    } else {
      renderPatch(patch);
    }
  });
}

// based on patch contents decide what to show
function renderPatch(patch) {
  let newPatch = ' ';
  if (patch) {
    if (patch.block) {
      if (patch.block.type == 'control') {
        //newPatch = svgImg(patch.block.type, patch.block.qty);
      } else {
        newPatch = svgImg(patch.block.type, patch.block.qty);
      }
    }

    if (patch.spud) {
      if (patch.spud.qty > 0) {
        newPatch += ''; // `<br/>S=${patch.spud.qty}` 
      } else {
        if (patch.spud.qty == -5 && patch.spud.name) {
          newPatch = svgImg('spud');
          patch.spudFound = true;
        } else {
          newPatch = svgImg('hole', 5);
        }
      }
    }
  }
  if (newPatch == ' ') {
    newPatch = svgImg('blank', player.grassQty);
  }
  if (newPatch) {
    element = document.querySelector(`#${patch.id}`);
    element.innerHTML = newPatch;

    if (patch.spudFound) {
      delete patch.spudFound;
      let thisSpud = document.querySelector(`#${patch.id} svg`);

      function onEnd() {
        newPatch = svgImg('hole', 5);
        element.innerHTML = newPatch;
      }
      animate(thisSpud, 'dig-spud', 1, onEnd);
    }

    // if we drew a hole, make sure its opacity matches the spud qty -5 = 100%, 0 = 0%
    if (patch.spud && patch.spud.qty < 0) {
      let opacity = 0 - patch.spud.qty * 20 / 100;
      let hole = document.querySelector(`#${patch.id} svg`);
      hole.style.opacity = opacity;
    }
  }
}

// move to the next phase in the day
function dayCycle() {
  savePlayer();
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
      renderHardware();
    } else if (player.phase == 'sales') {
      sellSpuds();
    } else if (player.phase == 'night') {
      resetTools();
      renderTools();
      resetPlayer();
      rollPatches();
      dream();
    }
  } else {
    // display the fields patches in their current state
    renderPatches();
    highlightCurrentPos();
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
  let sow = resowField();

  element = document.querySelector('.night');
  element.innerHTML = `<div>${dream}</div>${sow}`;
}


// randomly (ish) scatter more seeds and some get blocks on top
function resowField() {
  let sowMsg = '';
  if (player.sowSeeds > 0) {
    sowMsg = '<div>You find some seed potaoes at the bottom of your sack and scatter them randomly in the field</div>';
    let blankPatches = [];
    let i = 10;
    while (i < 100) {
      if (!player.fields[player.currentField][i]) {
        // sow seed and set i to 99
        blankPatches.push(i);
      }
      i++;
    }
    // add a few more seeds..
    player.sowSeeds += 5;
    // sow each seeds, some get blocks on top
    while (player.sowSeeds > 0) {
      player.sowSeeds--;
      let index = blankPatches[rnd(blankPatches.length)];
      let patch = {};
      switch (rnd(3)) {
        case 0:
          patch.block = { "type": "rock", "qty": rnd(5) + 1 };
          break;
        case 1:
          patch.block = { "type": "log", "qty": rnd(5) + 1 };
          break;
      }
      let newSpud = player.spuds[rnd(player.spuds.length)];
      patch.spud = { "name": newSpud.name, "qty": rnd(3) + 1 };
      player.fields[player.currentField][index] = patch;
    };
  }

  return sowMsg;
}

// user clicked a control to move up, down, left or right - interact with the patch we are moving into
function controlClick(index) {
  if (player.animating) {
    setTimeout(player.animating = false, 2000);
    return;
  }
  if (player.controlIds.indexOf(index) > -1) {
    // we are trying to move
    element = document.querySelector(`#patch_${player.pos}`);
    element.classList.remove("currentPos");
    let newPos = player.pos;
    let direction = 'down';

    if (index == 60) {
      newPos -= 10;
      direction = 'up';
      if (newPos < 0) {
        newPos = player.pos;
      }
    }
    if (index == 70 && player.pos % 10 > 0) {
      newPos -= 1;
      direction = 'left';
      if (newPos < 0) {
        // If there is an patch-1 then switch to that patch and put player in patch_9
        newPos = player.pos;
      }
    }
    if (index == 71 && player.pos % 10 < 9) {
      newPos += 1;
      direction = 'right';
      if (newPos == 10 && player.fields[player.currentField + 1]) {
        player.currentField++;
        player.pos = 9;
        renderPatches();
        exit;
      }
      if (newPos > 99) {
        newPos = player.pos;
      }
    }
    if (index == 80) {
      newPos += 10;
      if (newPos > 99) {
        newPos = player.pos;
      }
    }

    if (player.controlIds.indexOf(newPos) > -1) {
      newPos = player.pos;
    }

    if (newPos !== player.pos) {
      let patch = player.fields[player.currentField][newPos];
      if (patch && patch.block) {
        // animate..
        let thisBlock = document.querySelector(`#${patch.id} svg`);
        animate(thisBlock, `jiggle-${direction}`, 0.25);

        let tool = '';
        if (patch.block.type == 'rock') {
          tool = 'pick';
        } else {
          tool = 'axe';
        }
        let thisTool = document.querySelector(`.tool-${tool} svg`);

        animate(thisTool, `jiggle-up`, 0.25);
        let playerTool = player.tools[tool];
        if (playerTool && playerTool.uses > 0) {
          // if the patch is blocked.. the click reduces until zero and the block is removed
          player.sack[patch.block.type] = player.sack[patch.block.type] ?? 0;
          player.sack[patch.block.type]++;
          if (patch.block.qty > 1) {
            patch.block.qty--;
          } else {
            delete patch.block;
            element = document.querySelector(`#${patch.id}`);
            setTimeout(() => { element.innerHTML = svgImg('blank', player.grassQty); }, 250, element, player);
          }
          playerTool.uses--;
          renderTools();

          if (patch) {
            updatePatch(patch);
          }
          if (patch.block) {
            newPos = player.pos;
          }
        } else {
          newPos = player.pos;
        }
      }
    }
    player.pos = newPos;
    highlightCurrentPos();
  }
  //savePlayer();
}

function highlightCurrentPos() {
  let element = document.querySelector(`#patch_${player.pos}`);
  element.classList.add("currentPos");
}
// dig for a pus in the current patch
function digPatch() {
  let patch = player.fields[player.currentField][player.pos];
  let tool = player.tools['spade'];
  let thisTool = document.querySelector(`.tool-spade svg`);
  animate(thisTool, `jiggle-up`, 0.25);

  if (tool.uses > 0) {
    // if nothing defined for a patch then its an empty spud
    if (!patch || !patch.spud) {
      patch = { spud: { qty: 0 } };
    }
    patch.id = `patch_${player.pos}`;

    if (patch.spud.qty > 0) {
      // all spuds dug at once and moved to player sack
      let sackQty = player.sack[patch.spud.name] || 0;
      player.sack[patch.spud.name] = sackQty + patch.spud.qty;
      // sput qty in negative meaning it takes this many days to return to a fresh patch
      patch.spud.qty = player.spudRegen;
      tool.uses--;
    } else if (patch.spud.qty == 0) {
      patch.spud.qty = player.spudRegen;
      tool.uses--;
      player.fields[player.currentField][player.pos] = patch;
    } else {
      // leave holes alone
      return;
    }
    renderTools();

    if (patch) {
      renderPatch(patch);
    }
  }
}

// returns the players tool
function selectTool(patch) {
  let tool = 'spade';
  if (patch.block) {
    if (patch.block.type == 'rock') {
      tool = 'pick';
    } else {
      tool = 'axe';
    }
  }
  return player.tools[tool];
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

// one off setup the grid of patches
function drawField() {
  const maxPatches = 99;
  let index = 0;
  let patches = '';
  while (index <= maxPatches) {
    patches += `<div class="patch" id="patch_${index}">${svgImg('blank', player.grassQty)}</div>`;
    index++;
  }
  element = document.querySelector('.field');
  element.innerHTML = patches;
}

// allocate 4 patches to be movement buttons - they cant be dug
function renderControls() {
  let id = player.controls.start;
  renderControl(id, 'up');
  id += 10;
  renderControl(id, 'left');
  id += 1;
  renderControl(id, 'right');
  id += 9;
  renderControl(id, 'down');
}

// draw navigation buttons
function renderControl(id, dir) {
  element = document.querySelector(`#patch_${id}`);
  element.innerHTML = svgImg(`control-icon--${dir}`);
  element.classList.add("controlButton");
  element.classList.remove('patch');
  element.setAttribute("onclick", `controlClick(${id});`);
  player.fields[player.currentField][id] = { block: { type: "control" } };
}

// draw the tools across the bottom
function renderTools() {
  let tools = '';
  let dummyImg = svgImg(`control-icon--up`);
  Object.entries(player.tools).forEach(([toolName, tool]) => {
    tools += `<div  class="tool-${toolName}" onclick="digPatch()">${toolName}=${tool.uses} ${dummyImg}</div>`;
  });
  tools += `<div class="tool-purse" onclick="showSack()">Purse=${player.purse}`;
  tools += `<br/>Sack=${countSack()}</div>`;
  tools += `<div class="tool-next" onclick="dayCycle()">Next &gt;</div>`;
  element = document.querySelector('.tools');
  element.innerHTML = tools;
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

// count how many items are in the sack, spuds or other stuff
function countSack() {
  let spuds = 0;
  Object.entries(player.sack).forEach(([spudName, spudQty]) => {
    spuds += spudQty;
  });

  return spuds;
}

// draw tools and machines for sale 
function renderHardware() {
  let tools = '';
  Object.entries(player.hardware).forEach(([toolName, tool]) => {
    let state = 'buy';
    let cost = tool.price;
    if (player.tools[toolName]) {
      state = 'upgrade'
      cost = tool.upgradeCost;
    }
    let onClick = '';
    let canBuyClass = 'tooMuch';
    if (cost <= player.purse) {
      onClick = `onclick="buyTool('${toolName}')"`;
      canBuyClass = ``;

    }
    if (!player.shop.machines[toolName]) {
      tools += `<div class="buttonize button_${tool.type} ${canBuyClass}" ${onClick} id="hardware_${toolName}" ${onClick}>`;
      tools += `<strong>${tool.name}. </strong>`;
      tools += `${tool.desc}<br/>${state}=${cost}</div>`;
    }
  });

  element = document.querySelector('.hardware');
  element.innerHTML = tools;
}

// loop through each tool on sale and change style if we can afford it or not
function refreshHardware() {
  let elements = document.querySelector('.hardware div');
  elements.each((element) => {
  });
}

// buy a tool or an upgrade to a tool or machine
function buyTool(toolName) {
  let tool = player.hardware[toolName];
  if (tool.type == 'tool') {
    if (player.tools[toolName]) {
      // upgrade
      player.tools[toolName].maxUses++;
      player.tools[toolName].uses++;
      player.purse = player.purse - player.hardware[toolName].upgradeCost;
    } else {
      // buy
      player.tools[toolName] = player.hardware[toolName].initial;
      player.purse = player.purse - player.hardware[toolName].price;
    }
  } else {
    // buy machine
    player.shop.machines[toolName] = player.hardware[toolName].initial;
    player.purse = player.purse - player.hardware[toolName].price;
  }
  renderTools();
  renderHardware();
}

// start of a new day reset toos to their max uses
function resetTools() {
  Object.entries(player.tools).forEach(([toolName, tool]) => {
    tool.uses = tool.maxUses;
  });
}

// player starts back at the entrace of the field
// TODO: do we reset them to their first field or leave on last (an upgrade perhaps?)
function resetPlayer() {
  element = document.querySelector(`#patch_${player.pos}`);
  element.classList.remove("currentPos");
  player.pos = 0;
  element = document.querySelector(`#patch_${player.pos}`);
  element.classList.add("currentPos");

}

