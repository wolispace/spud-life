const upgrade = {
  set: [
    {name: 'boots', state: 0},
    {name: 'ringSpeed', state: 0},
    {name: 'glovesPower', state: 0},
  ],
  list: [],

  encode: function () {
    // TODO: return a list of IDs not words eg 'boots', 'glovesPower' becomes '1,3'
    upgrade.set.forEach((itemInfo, index) => {

    });
    return upgrade.list.join(',');
  },

  decode: function (encodedString) {
    if (!encodedString) {
      return;
    }
    //TODO: convert a list of ids eg '1,3' = 'boots', 'glovesPower' from upgrade.set
    upgrade.list = encodedString.split(',');
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
    let boots = dialog.isChecked("boots");
    let ringSpeed = dialog.isChecked("ringSpeed");
    let globesPower = dialog.isChecked("glovesPower");
    dialog.hide();
  },

  current: function () {
    let html = '';

    if (upgrade.list.length > 0) {
      upgrade.list.forEach((itemName, _) => {
        html += `<div class="row">[${itemName}] `;
        html += dialog.makeCheckbox(itemName, itemName, true)
        html += `</div>`;
      });
    } else {
      html += 'You have not bought any upgrades yet.';
    }


    return html;

  },

  add: function (itemName) {
    upgrade.list.push(itemName);
    console.log('add upgrade', itemName);
    this.speed();
    this.blockHits();
  },

  speed: function () {
    game.speed.player = 1;
    if (upgrade.list.includes('boots')) {
      game.speed.player++;
    }
    if (upgrade.list.includes('ringSpeed')) {
      game.speed.player++;
    }
    game.step.x = game.step.base.x * game.speed.player;
    game.step.y = game.step.base.y * game.speed.player;
  },

  blockHits: function () {
    game.blockHits = 5;
    if (upgrade.list.includes('glovesPower')) {
      game.blockHits -= 2;
    }
  },
}