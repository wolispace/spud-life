const tools = {
  setup: function () {
    let newPos = { x: 9 * sprite.width, y: 10 * sprite.height};
    let iconSvg = svg.render('wallet');
    let wallet = sprite.render(player.uid++, newPos.x, newPos.y, iconSvg, sprite.width, sprite.height, `control wallet`);
    console.log(wallet);   
    let wallet2 = document.querySelector(`.i${wallet.uid}`);
    console.log(wallet2);
    if (wallet2) {
      wallet2.onclick = function () { alert('hi'); testDialog();}
    }
  }
};

