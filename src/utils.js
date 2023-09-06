// randoms a random number like a dice roll, with side being the number of sides: rnd(2) is a flip of a coin, rnd(6) is a six sided dice.
// this a zero based number do rnd(2) gives us 0 or 1, rnd(6) gives us 0...5
function rnd(sides) {
  return Math.floor(Math.random() * sides);
}

// returns a random number equally half plus or minus the number eg 3 = -1 to 1
function halfRnd(num) {
  return rnd(num * 2) - num;
}

function isDirection(direction) {
  return ['up', 'down', 'left', 'right'].includes(direction);
}
function getDirection(event) {
  return event.code.toLowerCase().replace('arrow', '');
}

function addToBody(html) {
  let bodyElement = document.querySelector("body");
  bodyElement.insertAdjacentHTML('beforeend', html);
}

const state = {
  save: () => {
    let fields = player.fields;
    player.fields = field.encodeAll(player.fields, true);
    let compressed = LZString.compressToUTF16(JSON.stringify(player));
    localStorage.setItem("state", compressed);
    player.fields = fields;
  },

  load: () => {
    let compressed = localStorage.getItem("state");
    if (compressed) {
      let decompressed = LZString.decompressFromUTF16(compressed);
      let newPlayer = JSON.parse(decompressed);
      newPlayer.fields = field.encodeAll(newPlayer.fields, false);
      if (!player.pos) {
        player = newPlayer;
      }
    }
  },

  clear: (reload = false) => {
    localStorage.clear();
    if (reload) {
      window.location.reload();
    }
  },

  read: () => {
    return LZString.compressToBase64(JSON.stringify(player));
  },

  write: (compressed) => {
    let decompressed = LZString.decompressFromBase64(compressed);
    player = JSON.parse(decompressed);
    state.save();
  }
};

function html(selector, text) {
  let elem = checkSelector(selector);

  if (text) {
    elem.innerHTML = text;
  } else {
    return elem.innerHTML;
  }
  return elem;
}

function checkSelector(selector) {
  let elem = selector;
  if (typeof selector === "string") {
    elem = document.querySelector(selector);
  }
  return elem;
}

function css(selector, styles) {
  let elem = checkSelector(selector);
  Object.assign(elem.style, styles);
  return selector;
}

function getElementPos(selector) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.querySelector('#patch_0');
  }
  return element.getBoundingClientRect();
}

function randomName(qty = 3) {
  let vowels = 'aeiou'.split('');
  let prefix = 'bdcfgjlnprsvwz'.split('');
  let newName = '';
  // random length names min/max based on qty passed in 
  qty += rnd(qty);
  for (let step = 0; step < qty; step++) {
    newName += prefix[rnd(prefix.length)] + vowels[rnd(vowels.length)]
  }

  return newName;
}

function cleanString(userInput) {
  return userInput.replace(/[^a-z0-9]/gi, '').slice(0, 14);
}

