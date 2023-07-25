const dialog = {
  sprite: null,
  visible: false,
  cancelKey: 'Escape',
  confirmKey: 'Enter',
  okButton: null,
  cancelButton: null,
  
  render: function (title, content, footer) {
    let patch = getElementPos(`#patch_0`);
    //character.hide();
    dialog.sprite.style.top = "5rem";
    dialog.sprite.style.left = (patch.width/2) + 'px';
    dialog.sprite.style.width = ((patch.width * (player.cols - 1) )) + 'px';
    dialog.part(`.dialog .header .title`, title);
    dialog.part(`.dialog .content`, content);
    dialog.part(`.dialog .footer`, footer);
    dialog.visible = true;
    console.trace('render', dialog);
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
    console.trace('clearing okButton');
    //dialog.okButton = null;
  },

  cancel: function () {
    if (typeof dialog.cancelButton === "function") {
      dialog.cancelButton();
    }
    dialog.hide();
    //dialog.cancelButton = null;
  },
  
  hide: function () {
    dialog.sprite.style["top"] = "-10000px";
    dialog.sprite.style["left"] = "-10000px";
    dialog.part(`.dialog .header .title`, '');
    dialog.part(`.dialog .content`, '');
    dialog.part(`.dialog .footer`, '');
    dialog.visible = false;
    dialog.okButton = null;
    //character.render();
    hint.hide();
    console.trace('hide');
  },

  
}