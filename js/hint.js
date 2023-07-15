const hint = {
    render: function (id, text) {
        // patch is below half way, arrow is on top else bottom
        let arrowTop = (id < ((player.rows * player.cols) / 2));
        let arrowLeft = ( (id % player.cols) < (player.cols / 2) );

        // if patch is below player.cols / 2 arrow is on left else right
        let patchObj = document.querySelector(`#patch_${id}`);
        let patch = patchObj.getBoundingClientRect();
        let posY = patch.top + (patch.height / 2) + "px";
        let posX = patch.left + (patch.width / 2) + "px";
    
        let flipTop = arrowTop ? '1' : `-1`;
        let flipLeft = arrowLeft ? '1' : '-1';
        let style = `style="transform: scale(${flipLeft}, ${flipTop});`;
        console.log(style, arrowTop, arrowLeft);


        let hintSprite = document.querySelector('#hintSprite');
        let arrowSvg = svg.render('arrow', 1, style);
        let buttonStart = `<button class="button buttonize" onclick="hint.close()"> `;
        let buttonEnd = `</button>`;
        text = text.replace('[', buttonStart);
        text = text.replace(']', buttonEnd);
        let content = ``;
        if (arrowTop) {
          content += `<div id="hintArrow">${arrowSvg}</div>`;
        }            
        content += `<div id="hintText">${text}</div>`;
        if (!arrowTop) {
            content += `<div id="hintArrow">${arrowSvg}</div>`;
        }

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