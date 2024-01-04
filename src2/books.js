const books = {


  build: function () {    
    return {
      color: books.getColour(),
      titleIdx: books.getTitleIdx(),
    }
  },
  
  render: function (bookInfo) {
    let bookSvg = svg.render('book1');
    bookSvg = bookSvg.replace('tomato', bookInfo.colour);

    let bookTitle = lists.bookTitleList[bookInfo.titleIdx];

  },

  getColour: function () {
    let colourList = Object.keys(lists.colorNames);
    return colourList[rnd(colourList.length)];
  },

  getTitleIdx: function () {
    return rnd(lists.bookTitleList.length);
  }
}