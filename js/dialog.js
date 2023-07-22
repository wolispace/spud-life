const dialog = {
  sprite: null,
  visible: false,
  
  render: function (title, content, footer) {
    dialog.hide();
    let patch = getElementPos(`#patch_0`);
  
    svg.hidePlayerSprite();
    dialog.sprite.style.top = "1rem";
    dialog.sprite.style.left = (patch.width/2) + 'px';;
    dialog.sprite.style.width = ((patch.width * (player.cols - 1) )) + 'px';
    let dialogPart = document.querySelector(`.dialog .header .title`);
    dialogPart.innerHTML = title;
    dialogPart = document.querySelector(`.dialog .content`);
    dialogPart.innerHTML = content;
    dialogPart = document.querySelector(`.dialog .footer`);
    dialogPart.innerHTML = footer;
    player.dialog = true;
  },

  hide: function () {
    dialog.sprite.style["top"] = "-10000px";
    dialog.sprite.style["left"] = "-10000px";
    let dialogPart = document.querySelector(`.dialog .header .title`);
    dialogPart.innerHTML = '';
    dialogPart = document.querySelector(`.dialog .content`);
    dialogPart.innerHTML = '';
    dialogPart = document.querySelector(`.dialog .footer`);
    dialogPart.innerHTML = '';
    dialogPart = false;
    svg.showPlayerSprite();
  },

  
}