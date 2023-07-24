const dialog = {
  sprite: null,
  visible: false,
  cancelKey: 'Escape',
  confirmKey: 'Enter',
  okButton: null,
  
  render: function (title, content, footer) {
    dialog.hide();
    let patch = getElementPos(`#patch_0`);
  
    character.hide();
    dialog.sprite.style.top = "1rem";
    dialog.sprite.style.left = (patch.width/2) + 'px';;
    dialog.sprite.style.width = ((patch.width * (player.cols - 1) )) + 'px';
    dialog.part(`.dialog .header .title`, title);
    dialog.part(`.dialog .content`, content);
    dialog.part(`.dialog .footer`, footer);
    dialog.visible = true;
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
    dialog.hide();
  },
  cancel: function () {
    dialog.hide();
  },
  
  hide: function () {
    dialog.sprite.style["top"] = "-10000px";
    dialog.sprite.style["left"] = "-10000px";
    dialog.part(`.dialog .header .title`, '');
    dialog.part(`.dialog .content`, '');
    dialog.part(`.dialog .footer`, '');
    dialog.visible = false;
    dialog.okButton = null;
    character.render();
    hint.hide();
  },

  
}