const potatadex = {
  render: function () {
		let content = 'The things you have found...';
		Object.entries(player.spuds).forEach(([index, spud]) => {
			let icon = ' ? ';
			let spudName = 'Unknown';
			let spudDesc = '';
console.log(spud);
			if (player.basket[spud.name]) {
				spudName = spud.fullName;
				spudDesk = spud.bestFor;
			}

			content += `<div class="hardware-button buttonize">`;
			content += ` <div class="hardware-button-icon">${icon}</div>`;
			content += ` <div class="hardware-button-desc"><strong>${spudName}. </strong> ${spudDesc}</div>`;
			content += `</div>`;
		});

		//{name: 'Arsso', fullName: 'Pink Arsso', color: 'pink', rareness: 3, bestFor: 'soup', …}

		let footer = "";

    // player.basket has everything the player has found.


    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render("Potatádex", content, footer);
	},
}