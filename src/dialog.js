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
    dialog.visible = true;
    dialog.title = title;
    dialog.dialogBox.style.opacity = 1;
    dialog.dialogBox.style.display = 'auto';
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
    }
  },

  cancel: function () {
    if (typeof dialog.cancelButton === "function") {
      dialog.cancelButton();
    }
    dialog.hide();
  },

  hide: function () {
    dialog.dialogBox.style.opacity = 0;
    dialog.dialogBox.style.display = 'none';
    dialog.part(`.dialog .header .title`, '');
    dialog.part(`.dialog .content`, '');
    dialog.part(`.dialog .footer`, '');
    dialog.visible = false;
    dialog.okButton = null;
    dialog.hasInput = false;
    hint.hide();
  },

  makeCheckbox: function (id, text, isChecked) {
    let checked = isChecked ? 'checked="checked"' : '';
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


  setup: function () {
    // make sure we have a sky div that is 0,0, 100% sprite.height * sky.height
    let dialogBox = document.querySelector(`.${dialog.id}`);

    if (!dialogBox) {
      addToBody(`
      <div class='dialog'>
        <div class='header'>
          <div class='title'>Title</div>
          <div class='close buttonize' onclick='dialog.cancel()'>X</div>
        </div>
        <div class='content'></div>
        <div class='footer'></div>
      </div>
      `);
    }
    dialog.dialogBox = document.querySelector(`.${dialog.id}`);
  },

};