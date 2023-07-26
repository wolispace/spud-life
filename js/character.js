const character = {
    render: function () {
      svg.showElement("#playerSprite");
      let thisBlock = document.querySelector(`#playerSprite svg`);
            svg.animate(thisBlock, `grow`, 1);
    },
    hide: function () {
      svg.hideElement("#playerSprite");
    },
  
    look: function (direction) {
      let playerSprite = document.querySelector("#playerSprite > svg");
      let playerHead = document.querySelector("#playerSprite .playerHead");
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
      let playerHead = document.querySelector("#playerSprite .playerHead");
      setTimeout( () => {playerHead.setAttribute("transform", "rotate(0, 51, 21.2)");}, 1000);
    },
  
    // make a random body
    randomBody: function () {
      //let name = spudBits.prefix[rnd(spudBits.prefix.length)];
      let newBody = {};
      let skinTones = ["Cornsilk", "Bisque", "Wheat", "Tan", "SaddleBrown"];
  
      let colourNames = Object.keys(CSS_COLOR_NAMES);
      let skinTone = skinTones[rnd(skinTones.length)];
  
      Object.keys(bodySet).forEach((bodyPart) => {
        let variations = bodySet[bodyPart];
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
      player.name = dialogInput.value;
      dialog.hide();
      state.save();
      tools.render();
      setPhase(player.phase);
      let element = document.querySelector(`#playerSprite`);
      element.innerHTML = svg.renderPerson(player.body);
      resizeStuff();
      hint.player();
      character.render();
    },

    randomName: function () {
      let names = [
        "Ashley",
        "Steve",
        "Charlie",
      ];

      return names[rnd(names.length)];
    },
  
    customize: function (mode) {
      if (mode == "random" || !player.body ) {
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
      content += '<div class="demoBody">';
      content += "</div>";
      content += "</div>";
  
      let footer = "";
      footer += `<button class="buttonize" onclick="character.customize('random')"> Randomize </button>`;
      footer += `<button class="buttonize" onclick="dialog.confirm()"> Ok </button>`;
      dialog.cancelButton = function () { character.save(); };
      dialog.okButton = function () { character.save(); };
      dialog.render("Character creator", `${content}`, footer);
      character.demoBody();
    },

    editName: function () {
      return `<div><input type="text" id="playerName" value="${player.name}" /></div>`;

    },
  
    buildBodySelect: function (bodyPart) {
      let colour = svg.colourOptions(player.body[bodyPart].colour);
      let part = svg.bodyPartOptions(bodyPart, player.body[bodyPart].type); 
  
      return `<div>${bodyPart}<br/><select id="${bodyPart}" class="selectPart" onchange="character.demoBody()">${part}</select>
         <select id="${bodyPart}-colour" class="selectColour" onchange="character.demoBody()">${colour}</select></div>`;
    },
  
    // redisplay character using current body parts
    demoBody: function () {
      Object.entries(player.body).forEach(([key, part]) => {
        player.body[key] = {
          type: getSelectValue(`#${key}`),
          colour: getSelectValue(`#${key}-colour`),
        };
      });
  
      let element = document.querySelector(".demoBody");
      element.innerHTML = svg.renderPerson(player.body);
    },
  
    reset: function () {
      if (confirm('Are you really sure you want to wipe your progress and start from scratch?')) {
        state.clear(true);
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
  }
  
  