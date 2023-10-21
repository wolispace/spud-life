class Mobile extends game.Item {
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
          timers.moving = false;
          if (direction == 'up' && player.currentField == 0) {
            // are we conflicting with a building?
            Object.entries(buildings.list).forEach(([itemName, item]) => {
              if (this.collides(item)) {
                this[dirInfo[direction].axis] = oldPos;
                if (item.enter) {
                  buildings.enter(itemName);
                }
              }
            });
          } else if (direction == 'right' && player.fields.length > 1 && player.currentField < 1) {
            if (this.x > (sprite.width * game.grid.x) - sprite.width) {
              // change fields
              player.currentField++;
              console.log(this);
              player.x = 5;
              field.redraw();
              //this.position();
              controls.endInput();
              timers.moving = true;
              return; 
            }
          } else if (direction == 'left' && player.fields.length > 1 && player.currentField > 0) {
            if (this.x < 1) {
              // change fields
              player.currentField--;
              player.x = (sprite.width * game.grid.x) - sprite.width - 6;
              field.redraw();
              //this.position();
              controls.endInput();
              timers.moving = true;

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

  checkCollisions(layer) {
    this.hitItem = null;
    let spritesList = player.fields[player.currentField][layer];

    spritesList.forEach((spriteBox, index) => {
      if (!this.hitItem && this.collides(spriteBox)) {
        controls.endInput();
        // clone the object..
        this.hitItem = Object.assign(Object.create(Object.getPrototypeOf(spriteBox)), spriteBox);
        if (layer == game.ABOVEGROUND) {
          function onEnd() {
            if (spriteBox.qty > 0) {
              spriteBox.setPos();
              spriteBox.qty--;
              spriteBox.reduceAndPosition();
            }
            if (spriteBox.qty < 1) {
              // add the rock or log to the basket.. no arc for now
              // TODO: arc the item into the basket
              spriteBox.qty = 1;
              basket.add(spriteBox);
              spriteBox.remove();
              delete player.fields[player.currentField][layer][index];
            }
            game.save();
          }
          let toolName = spriteBox.item == 'rock' ? 'pick' : 'axe';

          if (tools.list[toolName].qty > 0) {
            tools.list[toolName].decrQty();
            spriteBox.jiggle(game.direction, onEnd);
            return true;
          } else {
            spriteBox.jiggle(game.direction);
            return false;
          }

        } else {
          // dig it up.. animate the arc. then remove it..
          // shift to the players pos
          spriteBox.x = game.playerItem.x;
          spriteBox.y = game.playerItem.y;

          spriteBox.render();
          game.spriteBox = spriteBox;
          let endItem = tools.list.basket;
          delete player.fields[player.currentField][layer][index];
          scanner.scan();
          let onEnd = function () {
            game.spriteBox.remove();
            setTimeout(() => {
              game.digging = false;
              endItem.jiggle('down');
              setTimeout(() => {
                basket.add(game.spriteBox);
                game.save();
              }, 200);
            }, 1);

          };
          spriteBox.animateArc(endItem, onEnd);
        }
        return spriteBox;
      }
      game.digging = false;
    }
    );
  }

  makePath(endItem) {
    let startX = 0 + (this.w / 2);
    let startY = 0 + (this.h / 2);
    let endX = endItem.x - this.x + (this.w / 2);
    return `path('M ${startX},${startY} ${endX},${startY}')`;
  }

  animatePath(params) {
    //void this.sprite.offsetWidth;
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

} 