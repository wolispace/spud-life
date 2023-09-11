const character = {
  currentBodyPart: 'body',
  bodySet: null,

  render: function () {
    svg.showElement(".player");
    let thisBlock = document.querySelector(`.player svg`);
    svg.animate(thisBlock, `grow`, 1);
  },
  hide: function () {
    svg.hideElement(".player");
  },
  show: function () {
    svg.showElement(".player");
  },

  look: function (direction) {
    let playerSprite = document.querySelector(".player > svg");
    let playerHead = document.querySelector(".player .playerHead");
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
    let playerHead = document.querySelector(".player .playerHead");
    setTimeout(() => { playerHead.setAttribute("transform", "rotate(0, 51, 21.2)"); }, 1000);
  },

  has: function (itemKey) {
    return player.basket[itemKey] > -1 || player.shop.machines[itemKey] || player.tools[itemKey];
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
    player.name = cleanString(dialogInput.value);
    player.hints = dialog.isChecked(`#showHints`);
    dialog.hide();
    state.save();
    tools.render();
    setPhase(player.phase);
    let element = document.querySelector(`.player`);
    element.innerHTML = svg.renderPerson(player.body);
    resizeStuff();
    hint.player();
    character.render();
    tools.render();
  },

  randomName: function () {
    let names = [
      "Ashley",
      "Stevie",
      "Charlie",
    ];

    return names[rnd(names.length)];
  },

  customize: function (mode) {
    if (mode == "random" || !player.body) {
      player.body = character.randomBody();
    }
    let showHintCheckbox = dialog.makeCheckbox('showHints', 'Show hints. You are new to this world.', player.hints);

    let content = "";
    content += '<div class="creator">';
    content += '<div class="left">';
    content += character.editName();

    Object.entries(player.body).forEach(([key, part]) => {
      content += character.buildBodySelect(key);
    });

    content += "</div>";
    content += '<div class="demoBody">';
    content += "</div>";
    content += "</div>";
    content += character.colourGrid();

    content += `<div>${showHintCheckbox}</div>`;

    let footer = "";
    footer += `<button class="buttonize" onclick="character.customize('random')"> Randomize </button>`;
    footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
    dialog.cancelButton = function () { character.save(); };
    dialog.okButton = function () { character.save(); };
    dialog.hasInput = true;
    dialog.render("Character creator", `${content}`, footer);
    character.demoBody();
  },

  editName: function () {
    return `<div><input type="text" id="playerName" value="${player.name}" /></div>`;
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
      state.clear(true);
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
    let body = character.randomBody();
    let itemSvg = svg.renderPerson(body);
    newSprite = sprite.render(player.uid++, player.x, player.y, itemSvg, sprite.width, sprite.height, 'player');
    playerId = newSprite.uid;
    if (player.y == 1) {
      let playerSprite = sprite.get(playerId);
      let playerBox = character.getPlayerBox();
      player.x = sprite.width / 2;
      player.y = (sprite.height * sky.height) - playerBox.height;
      playerSprite.style.top = `${player.y}px`;
      playerSprite.style.left = `${player.x}px`;
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
    let playerSprite = sprite.get(playerId);
    return getBoundingBox(`#i${playerId}`);
  },

  movePlayer: function (direction) {
    if (!timers.moving) {
      controls.buttonDown(direction);
      character.look(direction);
      timers[direction] = setInterval(() => {
        let playerSprite = sprite.get(playerId);
        let playerBox = getBoundingBox(`#i${playerId}`);;
        let old = { x: playerBox.x, y: playerBox.y };
        let newTop, newLeft;
        switch (direction) {
          case 'up':
            newTop = playerBox.top - step.y;
            let skyBottom = (sprite.height * sky.height) - playerBox.height;
            if (newTop > skyBottom) {
              playerSprite.style.top = `${newTop}px`;
              player.y = newTop;
            } else {
              // are we conflicting with a building?
              Object.entries(building.list).forEach(([itemName, item]) => {
                let buildingBox = getBoundingBox(`#i${item.id}`);
                if (sprite.collides(buildingBox, playerBox)) {
                  item.enter();
                }

              });


            }
            break;
          case 'down':
            newTop = playerBox.top + step.y;
            if (newTop < containerBox.height - playerBox.height) {
              playerSprite.style.top = `${newTop}px`;
              player.y = newTop;
            }
            break;
          case 'left':
            newLeft = playerBox.left - step.x;
            if (newLeft > 0) {
              playerSprite.style.left = `${newLeft}px`;
              player.x = newLeft;
            }
            break;
          case 'right':
            newLeft = playerBox.left + step.x;
            if (newLeft < containerBox.width - playerBox.width) {
              playerSprite.style.left = `${newLeft}px`;
              player.x = newLeft;
            }
            break;
        }
        let collideId = sprite.collision(direction);
        if (collideId) {
          // let controlElement = document.querySelector(`#i${collideId}`);
          // controlElement.style.width = '20px';
          // controlElement.style.height = '20px';
          playerSprite.style.left = `${old.x}px`;
          playerSprite.style.top = `${old.y}px`;
          // update player.fields[]
        }
        timers.moving = true;
      }, timers.duration);
    }
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



