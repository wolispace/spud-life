const character = {
  currentBodyPart: 'body',
  bodySet: null,

  render: function () {
    svg.showElement("#player");
    let thisBlock = document.querySelector(`#lplayer svg`);
    svg.animate(thisBlock, `grow`, 1);
  },
  hide: function () {
    svg.hideElement("#iplayer");
  },
  show: function () {
    svg.showElement("#iplayer");
  },

  look: function (direction) {
    let playerSprite = document.querySelector("#iplayer > svg");
    let playerHead = document.querySelector(".playerHead");

    if (direction == "left") {
      playerHead.setAttribute("transform", "rotate(0, 51, 21.2)");
      playerSprite.setAttribute("transform", "translate(0, 0) scale(1, 1)");
    } else if (direction == "right") {
      playerHead.setAttribute("transform", "rotate(0, 51, 21.2)");
      playerSprite.setAttribute("transform", "translate(0, 0) scale(-1, 1)");
    } else if (direction == "up") {
      playerHead.setAttribute("transform", "rotate(45, 51, 21.2)");
      character.resetHead();
    } else if (direction == "down") {
      playerHead.setAttribute("transform", "rotate(-30, 51, 21.2)");
      character.resetHead();
    }
  },
  
  resetHead: function () {
    let playerHead = document.querySelector("#iplayer .playerHead");
    setTimeout(() => { playerHead.setAttribute("transform", "rotate(0, 51, 21.2)"); }, 1000);
  },

  // has he player interacted with this item
  has: function (itemName) {
    return tools.list.basket.list[itemName] ?? player.cart[itemName] ?? player.meals[itemName] ?? tools.list[itemName];
  },

  // make a random body
  randomBody: function () {
    //let name = spudBits.prefix[rnd(spudBits.prefix.length)];
    let newBody = {};
    let skinTones = ["Cornsilk", "Bisque", "Wheat", "Tan", "SaddleBrown"];

    let colourNames = Object.keys(CSS_COLOR_NAMES);
    let skinTone = skinTones[rnd(skinTones.length)];

    Object.keys(character.bodySet).forEach((bodyPart) => {
      let variations = character.bodySet[bodyPart];
      let variation = variations[rnd(variations.length)];
      let colour = colourNames[rnd(colourNames.length)];
      if (",head,nose".indexOf(bodyPart) > 0) {
        colour = skinTone;
      }
      if (bodyPart == "facial" && rnd(5) == 3) {
        variation = "facial-none";
      }
      newBody[bodyPart] = {
        type: variation,
        colour: colour,
      };
    });

    return newBody;
  },

  save: function () {
    let dialogInput = document.querySelector(`#playerName`);
    player.name = cleanString(dialogInput.value) || character.randomName();
    dialog.hide();
    game.save();

    game.playerItem.refresh(svg.renderPerson(player.body));
    if (game.new) {
      hint.player();
    } else {
      buildings.list.home.enter();
    }
  },

  randomName: function () {
    let names = [
      "Ashley",
      "Stevie",
      "Charlie",
      "Ash",
      "Billy",
      "Pip",      
    ];

    return names[rnd(names.length)];
  },

  customize: function (mode) {
    if (mode == "random" || !player.body) {
      player.body = character.randomBody();
    }

    let content = "";
    content += '<div class="creator">';
    content += '<div class="left">';
    content += character.editName();

    Object.entries(player.body).forEach(([key, part]) => {
      content += character.buildBodySelect(key);
    });

    content += "</div>";
    content += '<div class="right">';
    content += '<div class="demoBody">';
    content += "</div>";    
    content += "</div>";
    content += "</div>";
    content += character.colourGrid();

    let footer = "";
    footer += `<button class="buttonize" onclick="character.customize('random')"> Randomize </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { character.save(); };
    dialog.okButton = function () { character.save(); };
    dialog.render("Character creator", `${content}`, footer);
    dialog.hasInput = true;
    character.demoBody();
    character.setBodyPart('body');
    hint.myName();
  },

  editName: function () {
    return `<div><input type="text" id="playerName" 
      placeholder="Your name" value="${player.name}" 
      maxlength="14" /></div>`;
  },

  buildBodySelect: function (bodyPart) {
    let colour = svg.colourOptions(player.body[bodyPart].colour);
    let part = svg.bodyPartOptions(bodyPart, player.body[bodyPart].type);

    let selectBodyPart = `<div class="part part_${bodyPart} buttonize" onclick="character.setBodyPart('${bodyPart}')">`;
    selectBodyPart += `<div class="part-name">${bodyPart}</div>`;
    if (character.bodySet[bodyPart].length > 1) {
      selectBodyPart += `<div class="button buttonize" onclick="character.prevBodyPart('${bodyPart}')"><</div>`;
      selectBodyPart += `<div class="button buttonize" onclick="character.nextBodyPart('${bodyPart}')">></div>`;
    }
    selectBodyPart += `</div>`;

    return selectBodyPart;
  },

  setBodyPart: function (bodyPart) {
    character.currentBodyPart = bodyPart;
    let partsList = document.querySelectorAll(`.part`);
    partsList.forEach((element) => { element.classList.remove('selected'); });

    let element = document.querySelector(`.part_${bodyPart}`);
    element.classList.add('selected');
  },

  nextBodyPart: function (bodyPart) {
    character.setBodyPart(bodyPart);
    let currentType = player.body[character.currentBodyPart].type;
    let pos = character.bodySet[character.currentBodyPart].indexOf(currentType) + 1;
    if (pos >= character.bodySet[character.currentBodyPart].length) {
      pos = 0;
    };
    player.body[bodyPart].type = character.bodySet[character.currentBodyPart][pos];
    character.demoBody();
  },

  prevBodyPart: function (bodyPart) {
    character.setBodyPart(bodyPart);
    let currentType = player.body[character.currentBodyPart].type;
    let pos = character.bodySet[character.currentBodyPart].indexOf(currentType) - 1;
    if (pos < 0) {
      pos = character.bodySet[character.currentBodyPart].length - 1;
    };
    player.body[bodyPart].type = character.bodySet[character.currentBodyPart][pos];
    character.demoBody();
  },

  // redisplay character using current body parts
  demoBody: function () {
    let element = document.querySelector(".demoBody");
    element.innerHTML = svg.renderPerson(player.body);
  },

  reset: function () {
    if (confirm('Are you really sure you want to wipe your progress and start from scratch?')) {
      game.clear(true);
    }
  },

  colourGrid: function () {
    // build a clickable grid of X * Y clickable squares that set a colour
    let colourGrid = `<div class="color-grid">`;

    Object.entries(CSS_COLOR_GROUPS).forEach(([groupName, colours]) => {
      colourGrid += '<div class="color-group">';
      colours.forEach((colourName) => {
        colourGrid += character.colourSquare(colourName);
      });
      colourGrid += '</div>';
    });
    colourGrid += `</div>`;

    return colourGrid;
  },

  setColour: function (colour) {
    player.body[character.currentBodyPart].colour = colour;
    if (character.currentBodyPart == 'nose') {
      player.body['head'].colour = colour;
    }
    if (character.currentBodyPart == 'head') {
      player.body['nose'].colour = colour;
    }
    character.demoBody();
  },

  colourSquare: function (colour) {
    let style = `style="background-color: ${colour}"`;
    return `<div class="colour-square" ${style} onclick="character.setColour('${colour}')"></div>`;
  },

  addPlayer: function () {
    let params = {
      id: 'player', x: player.x, y: player.y, 
      w: sprite.width, h: sprite.height, 
      qty: 1, classes: 'player',
      svg: svg.renderPerson(player.body),
      
    }
    game.playerItem = new Mobile(params);

    if (player.y == 1) {
      player.x = game.playerItem.w / 2;
      player.y = (game.playerItem.h * sky.height) - game.playerItem.h + 5;
    }
  },

  getBodySet: function () {
    let partOptions = [];
    // extract body bits
    let baseBody = character.defaultBody;

    Object.keys(baseBody).forEach((bodyPart) => {
      partOptions[bodyPart] = [];
      Object.entries(svg.imgList).forEach(([key, part]) => {
        if (`${key}-`.indexOf(bodyPart) > -1) {
          let bits = key.split("-");
          partOptions[bodyPart].push(key);
        }
      });
    });

    return partOptions;
  },

  getPlayerBox: function () {
    return getBoundingBox('#iplayer');
  },



  // the default
  defaultBody: {
    body: {
      type: "body-big",
      colour: "Navy",
    },

    head: {
      type: "head-head",
      colour: "Wheat",
    },
    nose: {
      type: "nose-triangle",
      colour: "Wheat",
    },
    brows: {
      type: "brows-wave",
      colour: "Black",
    },
    eye: {
      type: "eye-eye",
      colour: "DodgerBlue",
    },
    facial: {
      type: "facial-mustache",
      colour: "Brown",
    },
    hair: {
      type: "hair-curly",
      colour: "Brown",
    },
  },
};



