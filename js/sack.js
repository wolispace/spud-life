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
  },
  // show or hide the sack via a dialog
  show: () => {
    let content = '';
    Object.entries(player.sack).forEach(([spudName, spudQty]) => {
      content += `<div class="buttonize">${spudName} = ${spudQty}</div>`;
    });
    const footer = `<button class="buttonize" onclick="sack.show()"> Ok </button>`;
    showDialog('Inventory', content, footer);
  },
}