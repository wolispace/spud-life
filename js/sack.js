const sack = {
  // count how many items are in the sack, spuds or other stuff
  count: () => {
    let spuds = 0;
    Object.entries(player.sack).forEach(([spudName, spudQty]) => {
      spuds += spudQty;
    });

    return spuds;
  },
  // show contents of the sack
  render: () => {
    let sackList = '';
    let style = `style="width:2rem;"`;
    Object.entries(player.sack).forEach(([spudName, spudQty]) => {
      let spudInfo = player.spuds.filter((spud) => spud.name == spudName)[0];
      if (spudInfo) {
        let icon = spuds.render(spudInfo.name, style);
        let machine = player.shop.machines[player.shop.selected];
        sackList += `<div class="sackSpuds buttonize">`;
        sackList += `<div class="sackSpudName">${icon} ${spudQty} ${spudInfo.fullName}</div>`;
        sackList += `<div class="sackListButtons">`;
        if (spudQty > 0) {
          sackList += `<div class="spudListButton" onclick="spuds.move('${spudName}', ${spudQty})">&lt;&lt;</div>`;
          sackList += `<div class="spudListButton" onclick="spuds.move('${spudName}', 1)">&lt;</div>`;
        } else {
          sackList += `<div class="spudListButton" >&lt;&lt;</div>`;
          sackList += `<div class="spudListButton" >&lt;</div>`;
        }
        if (machine && machine.hopper && machine.hopper[spudName] > 0) {
          sackList += `<div class="spudListButton" onclick="spuds.move('${spudName}', -1)">&gt;</div>`;
        } else {
          sackList += `<div class="spudListButton" >&gt;</div>`;
        }
        sackList += `</div>`;
        sackList += `<div class="sackSpudDesc">This is a ${spudInfo.rareness} potato that is best for ${spudInfo.bestFor}</div>`;
        sackList += `</div>`;
      }
    });

    element = document.querySelector('.sack');
    element.innerHTML = sackList;
  },
  // show or hide the sack via a dialog
  show: () => {
    let content = '';
    let content2 = '';
    let style = `style="width:2rem;"`;
    Object.entries(player.sack).forEach(([spudName, spudQty]) => {
      let spudInfo = player.spuds.filter(spud => spud.name == spudName)[0];
      if (spudInfo) {
        let icon = spuds.render(spudInfo.name, style);
        content += `<div class="buttonize">${icon} ${spudName} = ${spudQty}</div>`;
      } else {
        let icon = svg.render(spudName, 1, style);
        content2 += `<div class="buttonize">${icon} ${spudName} = ${spudQty}</div>`;
      }
    });

    let footer = '';
    footer += `<button class="buttonize" onclick="state.clear()"> Reset! </button>`;
    footer += `<button class="buttonize" onclick="fields.switchField(0)"> Field 0 </button>`;
    footer += `<button class="buttonize" onclick="fields.switchField(1)"> Field 1 </button>`;
    footer += `<button class="buttonize" onclick="fields.buyField()"> Buy a field </button>`;
    footer += `<button class="buttonize" onclick="sack.show()"> Ok </button>`;
    showDialog('Inventory', `${content}${content2}`, footer);
  },
}