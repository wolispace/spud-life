const lists = {

  get: function (key) {
    return lists.raw[key][rnd(lists.raw[key].length)];
  },

  compressed: ``,

};
