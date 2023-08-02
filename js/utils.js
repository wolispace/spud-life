// random number between 0 and max
function rnd(max) {
  return Math.floor(Math.random() * max);
}

// returns a random number equally half plus or minus the number eg 3 = -1 to 1
function halfRnd(num) {
  return rnd(num * 2) - num;
}

const state = {
  save: () => {
    let compressed = LZString.compressToUTF16(JSON.stringify(player));
    localStorage.setItem("state", compressed);
  },
  
  load: () => {
    let compressed = localStorage.getItem("state");
    if (compressed) {
      let decompressed = LZString.decompressFromUTF16(compressed);
      return JSON.parse(decompressed);
    } else {
      return player;
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

