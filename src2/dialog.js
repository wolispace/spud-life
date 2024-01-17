const dialog = {
  id: 'dialog',
  dialogBox: null,
  visible: false,
  cancelKey: 'Escape',
  confirmKey: 'Enter',
  okButton: null,
  cancelButton: null,

  render: function (title, content, footer) {
    dialog.setup();
    controls.endInput();
    dialog.overlay.style.display = 'block';
    dialog.visible = true;
    dialog.title = title;
    dialog.dialogBox.style.opacity = 1;
    dialog.dialogBox.style.top = '1rem';
    dialog.dialogBox.style.bottom = '4rem';
    dialog.part(`.dialog .header .title`, title);
    dialog.part(`.dialog .content`, content);
    dialog.part(`.dialog .footer`, footer);
  },

  part: function (partClass, content) {
    let dialogPart = document.querySelector(partClass);
    dialogPart.innerHTML = content;
  },

  confirm: function () {
    // do whatever is in the OkButton
    if (typeof dialog.okButton === "function") {
      dialog.okButton();
    } else {
      dialog.hide();
    }
  },

  cancel: function () {
    if (typeof dialog.cancelButton === "function") {
      dialog.cancelButton();
    } else {
      dialog.hide();
    }
  },

  hide: function () {
    dialog.dialogBox.style.opacity = 0;
    dialog.dialogBox.style.top = '-10000px';
    dialog.dialogBox.style.bottom = 'auto';
    dialog.part(`.dialog .header .title`, '');
    dialog.part(`.dialog .content`, '');
    dialog.part(`.dialog .footer`, '');
    dialog.visible = false;
    dialog.hasInput = false;
    hint.hide();
    timers.moving = false;
    dialog.overlay.style.display = 'none';
  },

  makeCheckbox: function (id, text, isChecked) {
    let checked = isChecked ? 'checked="checked"' : '';
    let checkbox = `<label class="checkboxLabel">`;
    checkbox += `<input type="checkbox" id="${id}" ${checked} />`;
    checkbox += `${text}</label>`;
    return checkbox;
  },

  // returns true if the checkbox is checked..
  isChecked: function (id) {
    let chk = document.querySelector(`#${id}`);
    if (chk) {
      return chk.checked;
    } else {
      return false;
    }
  },

  setup: function () {
    // make sure we have a sky div that is 0,0, 100% sprite.height * sky.height
    let dialogBox = document.querySelector(`.${dialog.id}`);

    if (!dialogBox) {
      addToBody(`
      <div id='dialogOverlay' class='overlay' onclick='dialog.overlayClicked()'></div>
      <div class='dialog'>
        <div class='header'>
          <div class='title'></div>
          <div class='close buttonize' onclick='dialog.cancel()'>X</div>
        </div>
        <div class='content'></div>
        <div class='footer'></div>
      </div>
      `);
    }
    dialog.dialogBox = document.querySelector(`.${dialog.id}`);
    dialog.overlay = document.querySelector(`#dialogOverlay`);
    dialog.hide();
  },

  overlayClicked: function () {
    // do nothing but could close dialog
  },

  // div is the container
  // pos is y pixels to scroll
  // time is how long the animation takes

  scrollToSmoothly: function (div, pos, time) {
    var currentPos = div.scrollTop;
    var start = null;
    if (time == null) time = 500;
    pos = +pos, time = +time;
    window.requestAnimationFrame(function step(currentTime) {
      start = !start ? currentTime : start;
      var progress = currentTime - start;
      if (currentPos < pos) {
        div.scrollTop = ((pos - currentPos) * progress / time) + currentPos;
      } else {
        div.scrollTop = currentPos - ((currentPos - pos) * progress / time);
      }
      if (progress < time) {
        window.requestAnimationFrame(step);
      } else {
        div.scrollTop = pos;
      }
    })
  },

  calculatePos: function (parentDiv, targetDiv) {
    return targetDiv.offsetTop - parentDiv.offsetTop;
  },


  makeButton: function (itemInfo) {
    let content = `<div  class="hardware-button buttonize  button-${itemInfo.type}">`;
    content += ` <div class="hardware-button-desc"><b>${itemInfo.name}.</b> </div>`;
    content += ` <div class="hardware-button-info">`;
    content += `  <div class="hardware-button-icon">${itemInfo.icon}</div>`;
    content += `  <div>${itemInfo.desc}</div>`;
    content += ` </div>`;
    content += `</div>`;


    return content;
  },



};
