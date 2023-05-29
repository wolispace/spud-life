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
    let svgInfo = svg.render("cloud-001");
    console.log(svgInfo);
    let element = document.querySelector(`#skyBox`);
    let cloudSprite = `<div id="cloud-001">${svgInfo}</div>`;
    // element.innerHTML = cloudSprite;
  },
};
