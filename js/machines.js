const machines = {
  // show the machines next to the contents of the basket
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
    basket.render();
  },

  // each machine has a hopper that is filled with spuds 
  renderHopper: (machineName) => {
    element = document.querySelector(`#machine_${machineName}`);
    element.innerHTML = machines.listHopper(machineName);
  },

  listHopper: (machineName) => {
    let machine = hardware.items[machineName];
    let icon = svg.inline(machineName);
    let hopper = `<div class="machineName">${icon} ${machine.name}</div><div>`;
    Object.entries(player.shop.machines[machineName].hopper).forEach(([spudName, spudQty]) => {
      hopper += `<div>${spudName} = ${spudQty}</div > `;
    });
    hopper += `</div>`;
    hopper += `<div>${machine.desc}</div>`;

    return hopper;
  },

  areEmpty: function () {
    let areEmpty = true;
    Object.entries(player.shop.machines).forEach(([machineName, machine]) => {
      console.log(Object.keys(machine.hopper).length, machine);
      if (Object.keys(machine.hopper).length > 0) {
        console.log('not empty');
        areEmpty = false;
      }
    });

    return areEmpty;
  },

  // ["chips", "baked potatoes", "curly-fries", "soup"]
  bestForList: function () {
    let bestForList = [];
    Object.entries(hardware.items).forEach(([itemName, item]) => {
      if (item.type == 'machine') {
        if (!bestForList.includes(item.initial.makes)) {
          bestForList.push(item.initial.makes);
        }
      }
    });

    return bestForList;
  },
};

