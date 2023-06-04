/*
layers:
0 = field rectangle sky
1 = night overlay
2 = star overlay
3 = clouds
4 = buildings
5 = customers
6 = player
7 = grassLine
*/

const sky = {
  render: () => {
    // find patch_10
    let patch = getElementPos(`#patch_10`);
    let height = patch.height;

    let element = document.querySelector(`#skyBox`);
    // element.style.width = `${width}px`;
    element.style.height = `${height}px`;
  },

  clouds: () => {
    //https://codepen.io/NvIGA/pen/geRNmv
    let svgInfo = svg.render("cloud-003");

    let element = document.querySelector(`#skyBox`);
    let cloudSprite = `<div id="cloud-001" class="cloud">${svgInfo}</div>`;
    element.innerHTML = cloudSprite;
    let cloudBox = document.querySelector(`#cloud-001`);

    let patch10 = document.querySelector(`#patch_10`);
    let patch = patch10.getBoundingClientRect();
    let posY = 0 + "px";
    let posX = patch.width + "px";
    let height = patch.height + "px";
    let width = patch.width + "px";
    cloudBox.style.top = posY;
    cloudBox.style.left = posX;
    cloudBox.style.width = width;
    cloudBox.style.height = height;
    let duration = rnd(3) + 20;
    cloudBox.style.animation = "move-cloud 100s linear infinite";
  },

  dim: () => {
    let element = document.querySelector(`#skyBox`);
    element.style.opacity = 0.75;
  },
};
