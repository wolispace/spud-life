const dialog = {
  name: '',
  sprite: null,
  visible: false,
  cancelKey: 'Escape',
  confirmKey: 'Enter',
  okButton: null,
  cancelButton: null,
  
  render: function (title, content, footer) {
    let patch = getElementPos(`#patch_0`);
    //character.hide();
    dialog.sprite.style.top = "1rem";
    dialog.sprite.style.left = (patch.width/2) + 'px';
    dialog.sprite.style.width = ((patch.width * (player.cols - 1) )) + 'px';
    dialog.part(`.dialog .header .title`, title);
    dialog.part(`.dialog .content`, content);
    dialog.part(`.dialog .footer`, footer);
    dialog.visible = true;
    dialog.title = title;
  },

  part: function (partClass, content) {
    let dialogPart = document.querySelector(partClass);
    dialogPart.innerHTML = content;
  },

  confirm: function () {
    // do whatever is in the OkButton
    if (typeof dialog.okButton === "function") {
      dialog.okButton();
    }
  },

  cancel: function () {
    if (typeof dialog.cancelButton === "function") {
      dialog.cancelButton();
    }
  },
  
  hide: function () {
    dialog.sprite.style["top"] = "-10000px";
    dialog.sprite.style["left"] = "-10000px";
    dialog.part(`.dialog .header .title`, '');
    dialog.part(`.dialog .content`, '');
    dialog.part(`.dialog .footer`, '');
    dialog.visible = false;
    dialog.okButton = null;
    hint.hide();
  },

  makeCheckbox: function (id, text, checked) {
    let checkbox = `<span class="checkboxSpan">`;
    checkbox += `<input type="checkbox" id="${id}" ${checked} />`;
    checkbox += `<label class="checkboxLabel" for="${id}">${text}</label></span>`;

    return checkbox;
  },
  // returns true if the checkbox is checked..
  isChecked: function (element) {
    let chk = document.querySelector(element);
    return chk.checked;
  },

}