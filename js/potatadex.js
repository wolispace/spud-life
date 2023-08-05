const potatadex = {
  render: function () {
		if (hint.visible) {
      return;
    }
		let style = `style="width:3rem;"`;
		let content = 'The things you have found...';
		Object.entries(player.spuds).forEach(([index, spud]) => {
			let icon = `<div class="unknown" ${style} > ???<br />??? </div>`;
			let spudName = 'Unknown';
			let spudDesc = '';
			if (player.basket[spud.name]) {
				spudName = spud.fullName;
				spudDesc = spuds.desc(spud);
				icon = spuds.render(spud.name, style);
			}

			content += `<div class="hardware-button buttonize">`;
			content += ` <div class="hardware-button-icon">${icon}</div>`;
			content += ` <div class="hardware-button-desc"><strong>${spudName}. </strong> ${spudDesc}</div>`;
			content += `</div>`;
		});

		Object.entries(hardware.items).forEach(([itemKey, item]) => {
			let icon = `<div class="unknown" ${style} > ???<br />??? </div>`;
			let itemName = 'Unknown';
			let itemDesc = '';
			if (character.has(itemKey)) {
				itemName = item.name;
				itemDesc = item.desc;
				icon = svg.inline(itemKey)
			}

			content += `<div class="hardware-button buttonize">`;
			content += ` <div class="hardware-button-icon">${icon}</div>`;
			content += ` <div class="hardware-button-desc"><strong>${itemName}. </strong> ${itemDesc}</div>`;
			content += `</div>`;
		});

		let footer = "";

    // player.basket has everything the player has found.


    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render("Potatádex", content, footer);
	},
}

