const sack = {
  // count how many items are in the sack, spuds or other stuff
  count: () => {
    let spuds = 0;
    Object.entries(player.sack).forEach(([spudName, spudQty]) => {
      spuds += spudQty;
    });

    return spuds;
  },
}