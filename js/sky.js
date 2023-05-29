const sky = {
  clouds: () => {
    let svgInfo = svg.render("cloud-001");
    console.log(svgInfo);
    let element = document.querySelector(`#skyBox`);
    let cloudSprite = `<div id="cloud-001">${svgInfo}</div>`;
    # element.innerHTML = cloudSprite;
  },
};
