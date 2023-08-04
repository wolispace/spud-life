const potatadex = {
  render: function () {
		let content = 'The things you have found...';
    let footer = "";
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render("Potatádex", content, footer);
	},
}