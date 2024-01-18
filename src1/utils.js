// randoms a random number like a dice roll, with side being the number of sides: rnd(2) is a flip of a coin, rnd(6) is a six sided dice.
// this a zero based number so rnd(2) gives us 0 or 1, rnd(6) gives us 0...5
function rnd(sides) {
  return Math.floor(Math.random() * sides);
}

// returns a random number equally half plus or minus the number eg 3 = -1 to 1
function halfRnd(num) {
  return rnd(num * 2) - num;
}

// returns the singular or plural based on the word supplied
// pluraliser('axe', 'a', 'an'); returns 'an'
function pluraliser(word, single, plural) {
  return ['a', 'e', 'i', 'o', 'u'].includes(word.charAt(0)) ? plural : single;
}

function addToBody(html) {
  let bodyElement = document.querySelector("body");
  bodyElement.insertAdjacentHTML('beforeend', html);
}

function addToWorld(html) {
  let bodyElement = document.querySelector(".world");
  bodyElement.insertAdjacentHTML('beforeend', html);
}

function addToControls(html) {
  let bodyElement = document.querySelector(".controls");
  bodyElement.insertAdjacentHTML('beforeend', html);
}

// returns the bounding box.. and simplify w & h
function getBoundingBox(element) {
  if (typeof element === 'string') {
    element = document.querySelector(element);
    element = element.getBoundingClientRect();
  }

  element.w = element.width;
  element.h = element.height;

  return element;
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

function calculateDiagonal(height, length) {
  return Math.sqrt(Math.pow(height, 2) + Math.pow(length, 2));
}

// compressed the entire raw list (see _build.js)
function compressLists() {
  compressed = LZString.compressToEncodedURIComponent(JSON.stringify(lists.raw));
  return compressed;
}

// decompress the compress: into raw: 
function decompressLists() {
  if (lists.compressed != '') {
    lists.raw = JSON.parse(LZString.decompressFromEncodedURIComponent(lists.compressed));
  } else {
    console.log('nothing to decompress');
  }
}

// get a random string from the named list, if it includes replaceable params then get those from other lists
function getFromList(key) {
  let randomMsg = lists.get(key);
  if (randomMsg.includes('[')) {
    return randomMsg.replace(/\[(\w+List)\]/g, function(_, key) {
      return getFromList(key);
  });
  } else {
    return randomMsg;
  }
}
