const upgrade = {
  set: ['boots', 'ringSpeed', 'glovesPower'],

  state: {
    'boots': 0,
    'ringSpeed': 0,
    'glovesPower': 0,
  },
  list: [],

  encode: function () {
    let saveState = [];
    upgrade.set.forEach((itemName, _) => {
      saveState.push(upgrade.state[itemName]);
    });

    return saveState.join(',');
  },

  decode: function (encodedString) {
    if (!encodedString) {
      return;
    }
    let states = encodedString.split(',');
    upgrade.set.forEach((itemName, index) => {
      upgrade.state[itemName] = states[index];
    });
  },

  has: function (itemName) {
    return (upgrade.set.includes(itemName) && upgrade.state[itemName] != 0);
  },

  show: function () {
    let title = "Upgrades";
    let content = `<div class="dialog-message-content">`;
    content += upgrade.current();
    content += `</div>`;
    let footer = "";
    footer += `<div></div>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { upgrade.hide(); };
    dialog.okButton = function () { upgrade.hide(); };
    dialog.render(title, content, footer);
  },

  hide: function () {
    upgrade.set.forEach((itemName) => {
      if (upgrade.state[itemName] != 0) {
        upgrade.state[itemName] = dialog.isChecked(itemName) ? 1 : -1;
      }
    });

    buildings.list.home.enter();
  },

  current: function () {
    let html = '';
    Object.entries(upgrade.state).forEach(([itemName, itemState]) => {
      if (itemState != 0) {
        let icon = svg.inline(itemName);
        html += `<div class="row">${icon}`;
        html += dialog.makeCheckbox(itemName, itemName, upgrade.state[itemName] == 1)
        html += `</div>`;
      }
    });
    if (html == '') {
      html += 'You have not bought any upgrades yet.';
    }

    return html;

  },

  add: function (itemName) {
    upgrade.state[itemName] = 1;
    console.log('add upgrade', itemName);
    this.speed();
    this.blockHits();
  },

  speed: function () {
    game.speed.player = 1;
    if (upgrade.state['boots'] == 1) {
      game.speed.player++;
    }
    if (upgrade.state['ringSpeed'] == 1) {
      game.speed.player++;
    }
    game.step.x = game.step.base.x * game.speed.player;
    game.step.y = game.step.base.y * game.speed.player;
  },

  blockHits: function () {
    game.blockHits = 5;
    if (upgrade.state['glovesPower'] == 1) {
      game.blockHits -= 2;
    }
  },
}