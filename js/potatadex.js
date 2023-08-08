const potatadex = {
  render: function () {
	  if (hint.visible) {
      return;
    }
    let maxItems = 0;
    let foundItems = 0;
		let style = `style="width:3rem;"`;
		let content = `<div class="header-msg">The things you have found:</div>`;
		Object.entries(player.spuds).forEach(([index, spud]) => {
      maxItems++;
			let icon = `<div class="unknown" ${style} > ???<br />??? </div>`;
			let spudName = 'Unknown';
			let spudDesc = '';
			if (player.basket[spud.name]) {
        foundItems++;
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
      maxItems++;
			let icon = `<div class="unknown" ${style} > ???<br />??? </div>`;
			let itemName = 'Unknown';
			let itemDesc = '';
			if (character.has(itemKey)) {
        foundItems++;
				itemName = item.name;
				itemDesc = item.desc;
				icon = svg.inline(itemKey)
			}

			content += `<div class="hardware-button buttonize">`;
			content += ` <div class="hardware-button-icon">${icon}</div>`;
			content += ` <div class="hardware-button-desc"><strong>${itemName}. </strong> ${itemDesc}</div>`;
			content += `</div>`;
		});

		let footer = `<span class="footer-msg">`;
    if (foundItems == maxItems) {
      footer += 'You found all of the things!';
    } else {
      footer += `You have found ${foundItems} of the ${maxItems} things.`;
    }
    footer += `</span>`;


    // player.basket has everything the player has found.


    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render("Potatádex", content, footer);
	},
}

