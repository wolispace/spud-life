class Cloud extends Mobile {
  
  constructor(params) {
    params.classes = 'cloud';
    super(params);
  }
  
  setup() {
    this.svg = this.buildCloud();
    this.render();
  }

  buildCloud() {
    let guts = "";
    let paths = [];
    let yMax = 20;
    let sizeMax = 15;
    let widthMax = rnd(30) + 10;
    let size = rnd(sizeMax) + 4;
    let yPos = rnd(yMax) + size;
    let xPos = size;
    let i = 0;

    while (i++ < widthMax) {
      paths.push({
        s: "",
        cx: xPos,
        cy: yPos,
        r: size,
      });
      size = rnd(sizeMax) + 4;
      xPos += 3;
      if (xPos < size) {
        xPos = size;
      }
      yPos = rnd(yMax) + size;
      // stop when we hit the edge
      if (xPos + size > 100) {
        i = 999;
      }
    }

    paths.forEach((path) => {
      // path
      if (path.d) {
        guts += `<path d="${path.d}" style="${path.s}" />`;
      }
      // circle
      if (path.r) {
        guts += `<circle cx="${path.cx}" cy="${path.cy}" r="${path.r}"  style="${path.s}" />`;
      }
    });

    return svg.wrap("", "", guts);
  }
};

