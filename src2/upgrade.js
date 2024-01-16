const upgrade = {
  fieldDelim: '|',
  list: [],

  encode: function () {
    return upgrade.list.join(upgrade.recordDelim);
  },

  decode: function (encodedString) {
    if (!encodedString) {
      return;
    }

    upgrade.list = encodedString.split(upgrade.fieldDelim);

  },

  add: function (itemName) {
    console.log('add upgrade', itemName);

  
  }, 
}