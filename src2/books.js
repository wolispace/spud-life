const books = {
  recordDelim: '^',
  fieldDelim: '|',

  // generates the random books in the game
  setup: function () {
    let d = books.fieldDelim;
    let bookCount = 8;
    let bookList = [];
    while (bookCount-- > 0 ) {
      let bookInfo = books.build();
      bookList.push(`${bookInfo.color}${d}${bookInfo.titleIdx}${d}0`);
    }
    return bookList.join(books.recordDelim);
  },

  // returns a random book with a random title
  build: function () {    
    return {
      color: books.getColour(),
      titleIdx: books.getTitleIdx(),
    }
  },
  
  // take an encoded string `red,4,0` and return an object {color: title: owned}
  bookInfo: function (bookInfoString) {
    let bookInfo = bookInfoString.split(books.fieldDelim);
    return {
      color: bookInfo[0],
      title: lists.raw.bookTitleList[bookInfo[1]],
      owned: bookInfo[2],
    };
  },
  
  // returns and svg 
  render: function (bookInfoString) {
    let bookInfo = books.bookInfo(bookInfoString);
    let bookSvg = svg.render('book1');
    return bookSvg.replace('tomato', bookInfo.color);
  },


  getColour: function () {
    let colourList = Object.keys(lists.raw.colorNames);
    return colourList[rnd(colourList.length)];
  },

  getTitleIdx: function () {
    return rnd(lists.raw.bookTitleList.length);
  },

  describe: function(bookId) {
    hint.force = true;
    hint.target = document.querySelector(`.book_${bookId}`);
    let bookList = player.books.split(books.recordDelim);
    let bookString = bookList[bookId];
    let bookInfo = books.bookInfo(bookString);

    hint.message = `<b>${bookInfo.title}</b></br>To be returned to the library`;
    hint.okButton = 'hint.close';
    hint.group = ``,
    hint.render();
  },

  listBooks: function () {
    let bookList = player.books.split(books.recordDelim);
    let html = '<div>';
    bookList.forEach( (bookString, bookId) => {
      let itemSvg = books.render(bookString);
      html += `<div class="cartMachine buttonize button book_${bookId}" onclick="books.describe(${bookId})">${itemSvg}</div>`;
    });
    html += '</div>';

    return html;
  },

  test: function () {

    console.log(bookList); 
  }
}