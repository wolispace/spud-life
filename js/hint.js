const hint = {
    render: function (id, text) {
        // patch is below half way, arrow is on top else bottom
        // if patch is below player.cols / 2 arrow is on left else right
        let patchObj = document.querySelector(`#patch_${id}`);
        let patch = patchObj.getBoundingClientRect();
        let posY = patch.top + patch.height + "px";
        let posX = patch.left + (patch.width / 2 )+ "px";
    
        let hintSprite = document.querySelector('#hintSprite');
        let arrowSvg = svg.render('arrow');
        let okButton = `<button class="button buttonize" onclick="hint.close()"> Ok </button>`;
        let content = `<div id="hintArrow">${arrowSvg}</div>`;
        content += `<div id="hintText">${text}${okButton}</div>`;

        // position sprite on patch..
        hintSprite.innerHTML = content;
        hintSprite.style.top = posY;
        hintSprite.style.left = posX;


    },
    close: function () {
        let element = document.querySelector('#hintSprite');
        hintSprite.style.top = "-1000px";
    }
}