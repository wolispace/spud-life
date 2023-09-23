class Mobile extends game.Item {
  constructor(params) {
    params.w = sprite.width;
    params.h = sprite.width;
    super(params);
  }

  setup() {
    this.render();
  }

  move(direction) {
    if (!timers.moving) {
      let dirInfo = {
        'left': { axis: 'x', 'dir': -1 },
        'right': { axis: 'x', 'dir': 1 },
        'up': { axis: 'y', 'dir': -1 },
        'down': { axis: 'y', 'dir': 1 },
      }
      let oldPos = this[dirInfo[direction].axis];
      // update object to new position so we can check for collisions.. revert to oldPos if collide
      this[dirInfo[direction].axis] = this[dirInfo[direction].axis] + (dirInfo[direction].dir * game.step[dirInfo[direction].axis]);
      let hitItem = this.checkCollisions(game.ABOVEGROUND, direction);

      console.log(this.withinBounds());

      if (hitItem || !this.withinBounds()) {
        this[dirInfo[direction].axis] = oldPos;
      } else {
          this.position();
      }
    }
  }

  withinBounds() {
    let bounds = {
      x: 1,
      y: (sprite.height * sky.height) - this.h,
      w: game.grid.x * sprite.width,
      h: game.grid.y * sprite.height - this.h,
    }

    return (this.x >= bounds.x &&
      this.y >= bounds.y &&
      this.x <= bounds.w &&
      this.y <= bounds.h)
  }
  
  checkCollisions(layer, direction) {
    let spritesList = player.fields[player.currentField][layer];
    
    spritesList.forEach((spriteBox, index) => {
      if (this.collides(spriteBox)) {
        controls.endInput();
        function onEnd () {
          spriteBox.qty--;
          if (spriteBox.qty > 0) {
            spriteBox.reduce();

          } else {
            spriteBox.remove();
            delete player.fields[player.currentField][layer][index];
          }
        }
        spriteBox.jiggle(direction, onEnd);
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