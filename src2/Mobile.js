class Mobile extends game.Item {

  moving = false;

  constructor(params) {
    super(params);
  }

  setup() {
    this.render();
  }

  look(direction) {
    let playerSprite = document.querySelector(`#i${this.id} > svg`);
    let playerHead = document.querySelector(`#i${this.id} .playerHead`);

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
  }

  moveStep(direction, thisStep) {
    game.direction = direction;
    this.look(direction);
    console.log(direction, thisStep);
    let dirInfo = {
      'left': { axis: 'x', 'dir': -1 },
      'right': { axis: 'x', 'dir': 1 },
      'up': { axis: 'y', 'dir': -1 },
      'down': { axis: 'y', 'dir': 1 },
    }
    // update object to new position, n steps away, regardless of collision
    this[dirInfo[direction].axis] = this[dirInfo[direction].axis] + (dirInfo[direction].dir * thisStep);
    this.position();
  }

  move(direction) {
    if (!timers.moving) {
      game.direction = direction;
      this.look(direction);
      timers[direction] = setInterval(() => {
        let dirInfo = {
          'left': { axis: 'x', 'dir': -1 },
          'right': { axis: 'x', 'dir': 1 },
          'up': { axis: 'y', 'dir': -1 },
          'down': { axis: 'y', 'dir': 1 },
        }
        let oldPos = this[dirInfo[direction].axis];
        // update object to new position so we can check for collisions.. revert to oldPos if collide
        this[dirInfo[direction].axis] = this[dirInfo[direction].axis] + (dirInfo[direction].dir * game.step[dirInfo[direction].axis]);
        this.checkCollisions(game.ABOVEGROUND);
        game.save();
        if (this.hitItem || !this.withinBounds()) {
          controls.endInput();
          if (direction == 'up') {
            // are we conflicting with a building?
            Object.entries(buildings.list).forEach(([itemName, item]) => {
              if (this.collides(item)) {
                if (item.visible) {
                  this[dirInfo[direction].axis] = oldPos;
                  if (item.enter) {
                    buildings.enter(itemName);
                  }

                }
              }
            });
          } else if (direction == 'right' && player.fields.length > 1 && (player.currentField + 1) < player.fields.length) {
            if (this.x > (sprite.width * game.grid.x) - sprite.width) {
              buildings.list.land.enter();
              return;
            }
          } else if (direction == 'left' && (player.fields.length > 1) && player.currentField > 0) {
            if (this.x < 1) {
              buildings.list.landBack.enter();
              return;
            }
          }
          this[dirInfo[direction].axis] = oldPos;
        } else {
          timers.moving = true;
          this.position();
        }

      }, timers.duration);
    }
  }

  withinBounds() {
    let bounds = {
      x: 1,
      y: (sprite.height * sky.height) - this.h,
      w: game.grid.x * sprite.width - this.w,
      h: game.grid.y * sprite.height - this.h,
    }

    return (this.x >= bounds.x &&
      this.y >= bounds.y &&
      this.x <= bounds.w &&
      this.y <= bounds.h)
  }

  checkCollisions(layer, showHints = true) {
    this.hitItem = null;
    let spritesList = player.fields[player.currentField][layer];
    let endItem = tools.list.basket;

    spritesList.forEach((spriteBox, index) => {
      if (!this.hitItem && this.collides(spriteBox)) {
        controls.endInput();
        // clone the object..
        this.hitItem = Object.assign(Object.create(Object.getPrototypeOf(spriteBox)), spriteBox);
        if (layer == game.ABOVEGROUND) {
          // reduce and/or remove blocker in onEnd of jiggling the block
          function onEnd() {
            if (spriteBox.qty > 0) {
              spriteBox.setPos();
              spriteBox.qty--;
              spriteBox.reduceAndPosition();
              hint.firstTool(spriteBox);
            }
            if (spriteBox.qty < 1) {
              // add the rock or log to the basket.. no arc for now
              // TODO: arc the item into the basket
              function removeBlocker() {
                basket.add(spriteBox);
                spriteBox.remove();
              }
              delete player.fields[player.currentField][layer][index];
              spriteBox.qty = 1;
              spriteBox.x = game.playerItem.x;
              spriteBox.y = game.playerItem.y;
              spriteBox.render();
              spriteBox.setPos();
              spriteBox.animateArc(endItem, removeBlocker);
            }
            game.save();
          }
          // do we have a tool with qty left?
          let toolName = spriteBox.item == 'rock' ? 'pick' : 'axe';

          if (tools.list[toolName].qty > 0) {
            tools.list[toolName].decrQty();
            spriteBox.jiggle(game.direction, onEnd);
            return true;
          } else {
            // max > 0 means we have bought one and it will be refreshed..
            // otherwise hint to buy one
            if (tools.list[toolName].max > 0) {
              spriteBox.jiggle(game.direction);
              if (showHints) {
                hint.toolUsedUp(toolName);
              }
            } else {
              spriteBox.jiggle(game.direction);
              if (showHints) {
                hint.toolNone(toolName);
              }
            }
            return false;
          }

        } else {
          // dig it up.. animate the arc. then remove it..
          // shift to the players pos
          spriteBox.x = game.playerItem.x;
          spriteBox.y = game.playerItem.y;
          spriteBox.render();
          game.spriteBox = spriteBox;

          let itemInfo = list.all[spriteBox.item];

          if (itemInfo.type == 'machines') {
            game.endItem = machines;
            if (player.cart[spriteBox.item] > -1) {
              endItem = buildings.list.hardware;
            } else {
              endItem = buildings.list.cart;
            }
          } else if (itemInfo.type == 'tools') {
            game.endItem = tools;
            endItem = tools.list[itemInfo.name];
          } else {
            game.endItem = basket;
          }

          delete player.fields[player.currentField][layer][index];
          scanner.scan();

          let onEnd = function () {
            game.spriteBox.remove();
            setTimeout(() => {
              endItem.jiggle('down');
              setTimeout(() => {
                game.endItem.add(game.spriteBox);
                game.save();
              }, 200);
            }, 1);

          };
          spriteBox.animateArc(endItem, onEnd);
        }
        return spriteBox;
      }
    }
    );
  }

  makePath(endItem) {
    let startX = 0 + (this.w / 2);
    let startY = 0 + (this.h / 2);
    let endX = endItem.x - this.x + (this.w / 2);
    let endY = endItem.y - this.y + (this.h / 2);
    return `path('M ${startX},${startY} ${endX},${endY}')`;
  }

  animatePath(params) {
    this.sprite.style.display = 'block';
    this.sprite.style.offsetRotate = `0deg`;
    this.sprite.style.offsetPath = this.makePath(params.endItem);
    //this.sprite.style.animationPlayState = 'running'; 
    this.sprite.style.animation = `${params.keyFrame} ${params.duration}s ${params.easing} 0s ${params.repeat} normal forwards`;
    this.sprite.addEventListener("animationend", function handler() {
      if (params.onEnd) {
        params.onEnd();
      }
      //this.animation = 'none';
      this.removeEventListener("animationend", handler);
    });
  }

  resetAnimation() {
    this.sprite.style.animation = 'none';
    this.sprite.offsetHeight; /* trigger reflow */
    this.sprite.style.animation = null;
  }

  moveToTouch() {
    if (timers.moving || hint.visible || dialog.visible) {
      return;
    }
    if (timers.touchStepTimer) {
      character.stopMoving();
    }
    this.path = this.pointsToTouch();
    this.look(game.direction);
    timers.touchStepTimer = setInterval(this.stepToTouch.bind(this), 25);
  }

  stepToTouch() {
    if (this.path.length <= 0) {
      character.stopMoving();
      return;
    }
    let newPos = this.path.shift();
    let oldPos = { x: this.x, y: this.y };
    if (newPos && newPos.x) {
      this.x = newPos.x;
      this.y = newPos.y;
      this.checkCollisions(game.ABOVEGROUND, true);
      if (((this.y + sprite.height) < (sprite.height * sky.height))) {
        // only enter the house at the end of the path
        if (this.path.length < 1) {
          Object.entries(buildings.list).forEach(([buildingName, building]) => {
            if (this.collides(building) && building.visible !== false) {
              this.x = oldPos.x;
              this.y = oldPos.y;
              this.position();
              buildings.enter(buildingName);
              character.stopMoving();
              return;
            }
          });
        }
        this.y = (sprite.height * sky.height) - sprite.height;
        this.hitItem = null;
      }

      if (this.hitItem || ((this.y + sprite.height) < (sprite.height * sky.height))) {
        this.x = oldPos.x;
        this.y = oldPos.y;
        character.stopMoving();

        return;
      }
      player.x = this.x;
      player.y = this.y;
      this.position();
    }
  }

  // returns an array of x/y points between starting pos and touch point
  pointsToTouch() {
    // x/y of touch point is stored in game.touch;
    let path = [];
    let dx = game.touchPoint.x - this.x;
    let dy = game.touchPoint.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy) || 0;
    let spacing = 5; // Change this to control the spacing between points
    let steps = Math.floor(distance / spacing);
    this.hitItem = false;
    game.direction = (game.touchPoint.x < this.x) ? 'left' : 'right';

    for (let i = 0; i <= steps; i++) {
      let interpolationRatio = i / steps;
      let x = Math.round(this.x * (1 - interpolationRatio) + game.touchPoint.x * interpolationRatio);
      let y = Math.round(this.y * (1 - interpolationRatio) + game.touchPoint.y * interpolationRatio);
      path.push({ x: x, y: y });
    }

    return path;
  }
  
  resetIfCollides() {
    // are we conflicting.. if so move to Y 1
    this.checkCollisions(game.ABOVEGROUND, false);

    if (this.hitItem || this.y < sprite.height) {
      this.y = 2 + sprite.height;
      this.position();
    }
  }

} 