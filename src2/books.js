const books = {
  recordDelim: '^',
  fieldDelim: '|',
  maxBooks: 8,
  titles: [],

  // generates the random books in the game as an encoded string..
  setup: function () {
    if (!player.books) {
      let d = books.fieldDelim;
      let bookCount = 1;
      let bookList = [];
      let fieldId = 0;
      let fieldSet = books.perField();
      books.prepTitles();
  
      while (bookCount < books.maxBooks) {
        let bookInfo = books.build(bookCount);
        bookList.push(`${bookInfo.color}${d}${bookInfo.titleIdx}${d}${fieldId}`);
  
        //books.addOneToField(fieldId, bookInfo);
        if (fieldSet-- <= 0) {
          fieldSet = books.perField();
          fieldId++;
        }
        bookCount++;
      }
      player.books = bookList.join(books.recordDelim);
    }
    books.decode();
  },

  // returns a random book with a random title
  build: function (id) {
    return {
      id: id,
      color: books.getColour(),
      titleIdx: books.getTitleIdx(),
    }
  },

  getColour: function () {
    let colourList = Object.keys(lists.raw.colorNames);
    return colourList[rnd(colourList.length)];
  },

  getTitleIdx: function () {
    let itemIndex = rnd(books.titles.length);
    // remove item from the list so we dont re-select it..
    let removedItem = books.titles.splice(itemIndex, 1);
    return removedItem[0].index;
  },

  // number of books to hide in this field
  perField: function () {
    return rnd(2) + 1;
  },

  prepTitles: function () {
    lists.raw.bookTitleList.forEach((title, index) => {
      books.titles.push({
        index: index,
        title: title,
      });
    });
  },

  addAllToField: function (fieldId) {
    // loop through all books.. if the fieldId matches then randomly add it..
    if (player.books == '') {
      return;
    }
    books.decode();
    books.list.forEach((bookInfo, bookIndex) => {
      bookInfo.id = `book_${bookIndex}`;
      books.addOneToField(fieldId, bookInfo);
    });
  },

  addOneToField: function (fieldId, bookInfo) {

    if (player.fields[fieldId] && bookInfo.field == fieldId) {
      // player has the field so add the book
      let params = {
        id: game.getUid(),
        x: rnd(field.space[game.UNDERGROUND].w - sprite.width),
        y: rnd(field.space[game.UNDERGROUND].h - sprite.height) + (sprite.height * 2),
        w: sprite.width,
        h: sprite.height,
        qty: 1,
        autoRender: false,
        item: `${bookInfo.id}`,
        type: 'books',
        svg: books.render(bookInfo.color),
      };
      let newItem = new game.Item(params);
      player.fields[fieldId][game.UNDERGROUND].push(newItem);
    }
  },

  // take an encoded string `red,4,0` and return an object {color: title: field}
  bookInfo: function (bookInfoString) {
    let bookInfo = bookInfoString.split(books.fieldDelim);
    return {
      color: bookInfo[0],
      title: lists.raw.bookTitleList[bookInfo[1]],
      field: bookInfo[2],
    };
  },

  // returns and svg 
  render: function (color) {
    let bookSvg = svg.render('book1');
    return bookSvg.replace('tomato', color);
  },


  hint: function (bookId) {
    hint.force = true;
    hint.target = document.querySelector(`.book_${bookId}`);
    let bookList = player.books.split(books.recordDelim);
    let bookString = bookList[bookId];
    let bookInfo = books.bookInfo(bookString);

    hint.message = `<b>${bookInfo.title}</b></br>To be returned to the library`;
    hint.okButton = 'hint.close';
    hint.group = ``;
    hint.render();
  },

  // take the player.books string and explode into bookStrings which get converted into objects
  decode: function () {
    books.list = [];
    let bookList = player.books.split(books.recordDelim);
    bookList.forEach((bookString, bookId) => {
      let bookInfo = books.bookInfo(bookString);
      books.list.push({
        id: `book_${bookId}`,
        item: 'book',
        field: bookInfo.field,
        icon: books.render(bookInfo.color),
        name: bookInfo.title,
        desc: 'Return to the library',
      })
    });
  },

  listBooks: function () {
    books.decode(player.books);
    let html = '<div>';
    books.list.forEach((bookInfo, _) => {
      html += dialog.makeButton(bookInfo, true);
    });
    html += '</div>';

    return html;
  },

}