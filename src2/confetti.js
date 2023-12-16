/*
Add 50 small spuds to the centre of the screen
pick 50 random end points
animate all to their end point using an arc ease-out and fade out
remove each onEnd

*/

const confetti = {
    render: function () {
      //dialog.hide();
      let maxConfetti = 50;
      while (maxConfetti-- > 0 ) {
        setTimeout("confetti.renderPiece()", rnd(3000));
      }
    },

    renderPiece: function () {

        let itemInfo = list.spuds.list[rnd(list.spuds.list.length)];

        let params = {
            id: game.getUid(),
            x: (game.grid.x / 2) * sprite.width,
            y: (game.grid.y / 2) * sprite.height,
            w: sprite.width / 3,
            h: sprite.height / 3,
            svg: spuds.build(itemInfo.name),
            item: itemInfo.name,
        }
        let onePiece = new game.Item(params);

        function removePiece() {
            onePiece.remove();
        }
        let endItem = {
          x: rnd(game.grid.x * sprite.width),
          y: rnd(game.grid.y * sprite.height),
        };
        onePiece.render();
        onePiece.setPos();
        onePiece.animateArc(endItem, removePiece);
    }
};
