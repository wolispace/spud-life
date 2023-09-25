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
        let hitItem = this.checkCollisions(game.ABOVEGROUND);
  
        if (hitItem || !this.withinBounds()) {
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
    let spritesList = player.fields[player.currentField][layer];

    spritesList.forEach((spriteBox, index) => {
      if (this.collides(spriteBox)) {
        controls.endInput();
        if (layer == game.ABOVEGROUND) {
          function onEnd() {
            spriteBox.qty--;
            if (spriteBox.qty > 0) {
              spriteBox.reduce();
            } else {
              spriteBox.remove();
              delete player.fields[player.currentField][layer][index];
            }
          }
          spriteBox.jiggle(this.direction, onEnd);

        } else {
          // dig it up.. animate the arc. then remove it..
          let params = {
            id: foundItem, 
            x: game.playerItem.x, 
            y: game.playerItem.y, 
            w: sprite.width, h: sprite.height
          }
          let itemSprite = new game.Item (params);
          spriteBox.render();
          let endItem = tools.list.basket;
          onEnd = function () { 
            spriteBox.remove();
            delete player.fields[player.currentField][layer][index];
            setTimeout( () => {
              game.digging = false;
              endItem.jiggle('down');
              setTimeout( () => {
                endItem.updateQty(endItem.qty + 1);
              }, 200);
            }, 1);

          };
          spriteBox.animateArc(endItem, onEnd);
          sprite.animateArc(spriteBox, endItem, onEnd);
        }
        return spriteBox;
      }
    }
    );
  }
  // do these collide? objects with (x,y,width,height}
  collides(spriteBox) {
    return (spriteBox.x < this.x + this.w)
      && (spriteBox.x + spriteBox.w > this.x)
      && (spriteBox.y < this.y + this.h)
      && (spriteBox.y + spriteBox.h > this.y);
  }

} 