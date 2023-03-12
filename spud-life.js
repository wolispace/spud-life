

let player = {
  phase: "field",
  sack: {},
  purse: 1000,
  tools: {
    spade: {
      uses: 0,
      maxUses: 5,
    },

  },
  spuds: [],
  currentField: 0,
  fields: [],

  shop: {
    machines: {}
  },
  hardware: hardwareStore()
};



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

function renderSack() {
  let sackList = '';
  Object.entries(player.sack).forEach(([spudName, spudQty]) => {
    let spud = player.spuds.filter((spud) => spud.name == spudName)[0];
    let machine = player.shop.machines[player.shop.selected];
    sackList += `<div class="sackSpuds buttonize"><div class="sackListButtons">`;
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

    sackList += `<div class="sackSpudName">${spudQty} ${spud.fullName}</div></div>`;
    sackList += `<div class="sackSpudDesc">This is a ${spud.rareness} potato that is best for ${spud.bestFor}</div>`;
    sackList += `</div>`;
  });

  element = document.querySelector('.sack');
  element.innerHTML = sackList;
}

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

function selectMachine(machineName) {
  let className = 'selected';
  player.shop.selected = machineName;

  let elements = document.querySelectorAll(`.machine`);
  elements.forEach((element) => { element.classList.remove(className); });

  let element = document.querySelector(`#machine_${machineName}`);
  element.classList.add(className);
  renderSack();
}


function hardwareStore() {
  return {
    "spade": {
      type: "tool",
      name: "Spade",
      desc: "A useful tool for diging up spods",
      price: 0,
      upgradeCost: 50,
      maxUpgrades: 100,
      initial: {
        uses: 0,
        maxUses: 5,
      }
    },
    "pick": {
      type: "tool",
      name: "Pick",
      desc: "A tool for breaking rocks",
      price: 100,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        uses: 0,
        maxUses: 5,
      }
    },
    "axe": {
      type: "tool",
      name: "Axe",
      desc: "A tool for clearing logs",
      price: 150,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        uses: 0,
        maxUses: 5,
      }
    },
    "chipper": {
      type: "machine",
      name: "Basic Chipper",
      desc: "A basic all-purpose chip-maker",
      price: 150,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 5,
        makes: "chips",
        hopper: {}
      }
    },
    "chipper-2000": {
      type: "machine",
      name: "Chipper 2000",
      desc: "The latest upgrade of the tried-and-tested chip maker",
      price: 500,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 20,
        makes: "chips",
        hopper: {}
      }
    },
    "back-o-matic": {
      type: "machine",
      name: "Bake-o-matic",
      desc: "Makes an excellent baked potato",
      price: 250,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 15,
        makes: "baked potatoes",
        hopper: {}
      }
    },
    "curly-cooker": {
      type: "machine",
      name: "Curly cooker",
      desc: "Cooks a potato into a curly-fry",
      price: 400,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 20,
        makes: "curly-fries",
        hopper: {}
      }
    },
    "soup-spinner": {
      type: "machine",
      name: "Soup spinner",
      desc: "Makes a hearly potato soup",
      price: 200,
      upgradeCost: 100,
      maxUpgrades: 100,
      initial: {
        pricePerItem: 10,
        makes: "soup",
        hopper: {}
      }
    },
  }
}

//generate the the complete list of spuds for this session
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

// randomly fill the field with rocks, logs and spuds - splus some ranom treasure!
function fillField() {
  let i = 0;
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
      if (!player.fields[player.currentField]) {
        player.fields[player.currentField] = [];
      }
      player.fields[player.currentField][i] = patch;
    }
    i++;
  };
}

function showPatches() {
  player.fields[player.currentField].forEach((patch, index) => {
    patch.id = `patch_${index}`;
    // roll the spuds so holes slowly get fill and can be re-seeded
    if (patch.spud) {
      if (patch.spud.qty < 0) {
        patch.spud.qty++;
      }
      if (patch.spud.qty == 0) {
        delete patch.spud;
      }
    }
    renderPatch(patch);
  });
}

function dayCycle() {
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
      dream();
    }
  } else {
    // re-display the fields patches in their current state
    showPatches();
    resetTools();
    renderTools();
  }
}

function dream() {
  // random dreams based on ong titles eg:
  let dreams = [
    "You dream of living in a park, but was rudly awoken by the dustmen",
    "You dream you were a walrus",
    "You dream of holding onto nothing, to see how long nothing lasts",
    "You dream of spinning plates",

  ]
  let dream = dreams[rnd(dreams.length)];
  element = document.querySelector('.night');
  element.innerHTML = `<div>${dream}</div>`;
}

// look through the field drawing what we can see
function patchClick(patchElement) {
  let id = patchElement.getAttribute('id');
  let bits = id.split('_');
  let index = parseInt(bits[1]);
  let patch = player.fields[player.currentField][index];
  // if nothing defined for a patch then its an empty spud
  if (!patch) {
    patch = { spud: { qty: 0 } };
  }

  let tool = selectTool(patch);

  // dont continue if tool used up or no tool bought yet..
  if (!tool || tool.uses <= 0) {
    renderTools();
    return;
  }

  // remember the elements id so we can render the patch later
  patch.id = id;
  if (patch.block) {
    // if the patch is blocked.. the click reduces until zzero and the block is removed
    if (patch.block.qty > 1) {
      patch.block.qty--;
    } else {
      delete patch.block;
    }
    tool.uses--;
  } else if (patch.spud) {
    // if no block we check for spuds
    if (patch.spud.qty > 0) {
      // all spuds dug at once and moved to player sack
      let sackQty = player.sack[patch.spud.name] || 0;
      player.sack[patch.spud.name] = sackQty + patch.spud.qty;
      // sput qty in negative meaning it takes this many days to return to a fresh patch
      patch.spud.qty = -5;
      tool.uses--;
    } else if (patch.spud.qty == 0) {
      patch.spud.qty = -5;
      tool.uses--;
      player.fields[player.currentField][index] = patch;
    }
  }

  renderTools();

  if (patch) {
    renderPatch(patch);
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

// based on patch contents decide what to show
function renderPatch(patch) {
  let newPatch = ' ';
  if (patch) {
    if (patch.block) {
      newPatch = `${patch.block.type}=${patch.block.qty}`;
    }
    if (patch.spud) {
      if (patch.spud.qty > 0) {
        newPatch += `<br/>Spuds=${patch.spud.qty}`
      } else {
        newPatch = images.hole;
      }
    }
  }
  if (newPatch) {
    element = document.querySelector(`#${patch.id}`);
    element.innerHTML = newPatch;
    // if we drew a hole, make sure its opacity matches the spud qty -5 = 100%, 0 = 0%
    if (patch.spud && patch.spud.qty < 0) {
      let opacity = 0 - patch.spud.qty * 20 / 100;
      let hole = document.querySelector(`#${patch.id} svg`);
      hole.style.opacity = opacity;
    }
  }
}

function drawField() {
  const maxPatches = 99;
  let index = 0;
  let patches = '';
  while (index <= maxPatches) {
    patches += `<div class="patch" id="patch_${index}" onclick="patchClick(this)"></div>`;
    index++;
  }
  element = document.querySelector('.field');
  element.innerHTML = patches;
}

function renderTools() {
  let tools = '';
  Object.entries(player.tools).forEach(([toolName, tool]) => {
    tools += `<div>${toolName}=${tool.uses}</div>`;
  });
  tools += `<div>Purse=${player.purse}</div>`;
  tools += `<div onclick="dayCycle()">Next &gt;</div>`;
  element = document.querySelector('.tools');
  element.innerHTML = tools;
}

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

function resetTools() {
  Object.entries(player.tools).forEach(([toolName, tool]) => {
    tool.uses = tool.maxUses;
  });
}

// page loaded - so init things
document.addEventListener("DOMContentLoaded", function () {
  sproutSpuds(6);
  drawField();
  fillField();
  showPatches();
  resetTools();
  renderTools();
  // gift the first machine
  let starter = 'chipper';
  player.shop.machines[starter] = player.hardware[starter].initial;
});
