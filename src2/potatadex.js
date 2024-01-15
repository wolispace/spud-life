const potatadex = {
  show: function () {
    if (hint.visible) {
      return;
    }
    let maxItems = 0;
    let foundItems = 0;
    let content = `<div class="header-msg">In ${player.day} days, you have found:</div>`;

    Object.entries(items).forEach(([itemName, itemInfo]) => {
      itemInfo.name = itemName;
      maxItems++;
      // work out if we have seen this.. check basket..
      itemInfo.found = character.has(itemName);
      content += potatadex.makeButton(itemInfo);
      if (itemInfo.found) {
        foundItems++;
      }
    });

    // add the books..
    books.list.forEach((bookInfo, _) => {
      maxItems++;
      if (bookInfo.field == -2) {
        bookInfo.found = true;
        foundItems++;
      }
      content += potatadex.makeButton(bookInfo);
    });

    let footer = `<span class="footer-msg">`;
    if (foundItems == maxItems) {
      footer += 'You found all of the things!';
    } else {
      footer += `You have found ${foundItems} of the ${maxItems} things.`;
    }
    footer += `</span>`;
    if (isDev) {
      footer += `<button class="buttonize devButton" onclick="confetti.render()"> X </button>`;
    }

    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { dialog.hide(); };
    dialog.okButton = function () { dialog.hide(); };
    dialog.render("Potatádex", content, footer);
    if (foundItems == maxItems) {
      confetti.render();
    }
  },

  makeButton: function (itemInfo, showIfNotFound = false) {
    let spudInfo = {
      type: itemInfo.type,
      icon: '',
      name: '????',
      desc: '??? ?????? ???? ??????',
    }
    
    if (itemInfo.found || showIfNotFound) {
      //let bookInfo = books.isBook(itemInfo);
      if (itemInfo.type == 'book') {
        spudInfo.icon = itemInfo.icon;
      } else {
        if (itemInfo.type == 'spuds') {
          spudInfo.icon =spuds.build(itemInfo.name); // svg.render('spud1');
          itemInfo.desc = spuds.desc(itemInfo);        
        } else {
          spudInfo.icon = svg.render(itemInfo.name);
        }
      }
      spudInfo.icon = svg.addOrientationClass(spudInfo.icon);
      spudInfo.name = itemInfo.fullName;
      spudInfo.desc = itemInfo.desc;
    }

    return dialog.makeButton(spudInfo);
  },
};

