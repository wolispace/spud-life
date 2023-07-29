const machines = {
  // show the machines next to the contents of the sack
  render: () => {
    let machineList = ``;
    player.shop.selected = '';
    Object.entries(player.shop.machines).forEach(([machineName, machine]) => {
      let selected = '';
      if (player.shop.selected == '') {
        selected = 'selected';
        player.shop.selected = machineName;
      }
      machineList += `<div class="machine buttonize ${selected}" id="machine_${machineName}" onclick="machines.selectMachine('${machineName}')">`;
      machineList += machines.listHopper(machineName);
      machineList += `</div>`;
    });

    element = document.querySelector('.machines');
    element.innerHTML = machineList;
  },

  // which machine gets the spuds
  selectMachine: (machineName) => {
    let className = 'selected';
    player.shop.selected = machineName;

    let elements = document.querySelectorAll(`.machine`);
    elements.forEach((element) => { element.classList.remove(className); });

    let element = document.querySelector(`#machine_${machineName}`);
    element.classList.add(className);
    sack.render();
  },

  // each machine has a hopper that is filled with spuds 
  renderHopper: (machineName) => {
    element = document.querySelector(`#machine_${machineName}`);
    element.innerHTML = machines.listHopper(machineName);
  },

  listHopper: (machineName) => {
    let machine = hardware.items[machineName];
    let hopper = `<div class="machineName">${machine.name}</div><div>`;
    Object.entries(player.shop.machines[machineName].hopper).forEach(([spudName, spudQty]) => {
      hopper += `<div>${spudName} = ${spudQty}</div > `;
    });
    hopper += `</div>`;
    hopper += `<div>${machine.desc}</div>`;

    return hopper;
  },
};

