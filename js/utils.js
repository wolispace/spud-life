function rnd(max) {
  return Math.floor(Math.random() * max);
}

// returns a randome number equally half plus or minus the number eg 3 = -1 to 1
function halfRnd(num) {
  return rnd(num) - num / 2;
}


const state = {
  save: (backTrack) => {

    if (backTrack) {
      player.phase = 'night';
    }
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
  clear: () => {
    localStorage.clear();
    window.location.reload();
  }
};

// add animation then remove it after a timeout so it can be re-applied

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
  if (typeof (selector) === 'string') {
    elem = document.querySelector(selector);
  }
  return elem;
}

function css(selector, styles) {
  let elem = checkSelector(selector);
  Object.assign(elem.style, styles);
  return selector;
}