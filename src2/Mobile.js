class Mobile extends game.Item {
  constructor(params) {
    super(params);
  }

  setup() {
    this.render();
  }

  move(direction) {
    if (!timers.moving) {
      this.direction = direction;
      character.look(direction);
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
  
        if (this.hitItem || !this.withinBounds()) {
          timers.moving = false;
          if (direction == 'up') {
            // are we conflicting with a building?
            Object.entries(buildings.list).forEach(([itemName, item]) => {
              if (this.collides(item)) {
                item.enter();
              }
            });
          }
          this[dirInfo[direction].axis] = oldPos;
        } else {
          timers.moving = true;
          this.position();
        }
        
      },timers.duration);
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
      if (this.collides(spriteBox)) {
        controls.endInput();
        if (layer == game.ABOVEGROUND) {
          // clone the object..
          this.hitItem = Object.assign(Object.create(Object.getPrototypeOf(spriteBox)), spriteBox);
          function onEnd() {
            spriteBox.setPos();
            spriteBox.qty--;
            if (spriteBox.qty > 0) {
              spriteBox.reduce();
            } else {
              spriteBox.remove();
              delete player.fields[player.currentField][layer][index];
            }
          }
          let toolName = spriteBox.item == 'rock' ? 'pick': 'axe';
          
          if (tools.list[toolName].qty > 0) {
            tools.list[toolName].decrQty();
            spriteBox.jiggle(this.direction, onEnd);
            return true;
          } else {
            spriteBox.jiggle(this.direction);
            return false;
          }


        } else {
          // dig it up.. animate the arc. then remove it..
          // shift to the players pos
          spriteBox.x = game.playerItem.x;
          spriteBox.y = game.playerItem.y;
          
          spriteBox.render();
          let endItem = tools.list.basket;
          delete player.fields[player.currentField][layer][index];
          scanner.scan();
          let onEnd = function () { 
            spriteBox.remove();
            setTimeout( () => {
              game.digging = false;
              endItem.jiggle('down');
              setTimeout( () => {
                basket.add(spriteBox);
              }, 200);
            }, 1);

          };
          spriteBox.animateArc(endItem, onEnd);
          sprite.animateArc(spriteBox, endItem, onEnd);
        }
        return spriteBox;
      }
      game.digging = false;
    }
    );
  }


} 