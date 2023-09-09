
class Positional {
  x = 1;
  y = 1;
  constructor(x, y) {
    // Constructor body
    this.x = x;
    this.y = y;
    
  }
  // Instance method
  render() {
    console.log('positional',this.x, this.y);
  }
  
}

class Cat extends Positional {
  // Instance field
  color = "black";

  // Constructor
  constructor(x, y, color) {
    // Constructor body
    super(x, y);
    this.color = color;
  }

  bingo() {
    console.log('cat', this.x, this.y, this.color);
  }

};