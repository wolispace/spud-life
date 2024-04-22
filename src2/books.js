const books = {
  titles: [],
  list: [],

  // encode all books.list into one string for saving
  encode: function () {
    let d = game.fldDelim;
    let bookList = [];
    books.list.forEach((bookInfo, _) => {
      bookList.push(books.encodeOne(bookInfo.color,bookInfo.titleIdx, bookInfo.field));
    });

    return bookList.join(game.recDelim);
  },

  // build encoded bookInfo string for one book
  encodeOne: function(color, titleIdx, fieldId) {
    return `${color}${game.fldDelim}${titleIdx}${game.fldDelim}${fieldId}`;
  },

  // take the player.books string and explode into bookStrings which get converted into objects
  decode: function (encoded) {
    if (!encoded) {
      return;
    }
    books.list = [];
    let bookList = encoded.split(game.recDelim);
    bookList.forEach((bookString, index) => {
      let bookInfo = books.bookInfo(index, bookString);
      books.list.push(bookInfo);
    });
    return encoded;
  },

  // take an encoded string `red,4,0` and return an object {color: titleIdx, title: field}
  bookInfo: function (bookCount, bookInfoString) {
    let bookInfo = bookInfoString.split(game.fldDelim);
    return {
      type: 'book',
      item: `book_${bookCount}`,
      color: bookInfo[0],
      titleIdx: bookInfo[1],
      field: bookInfo[2],
      name: lists.raw.bookTitleList[bookInfo[1]],
      fullName: lists.raw.bookTitleList[bookInfo[1]],
      desc: getFromList('bookReview'),
      icon: books.render(bookInfo[0]),
    };
  },

  // generates the random books in the game into books.list via an encoded string..
  setup: function () {
    if (!player.books &&  books.list.length < 1) {
      let bookCount = 0;
      let fieldId = 0;
      let fieldSet = books.perField();
      books.prepTitles();
      while (bookCount < game.maxBooks) {
        let bookInfo = books.build();
        books.list.push(books.bookInfo(bookCount, books.encodeOne(bookInfo.color, bookInfo.titleIdx, fieldId)));
        // increment the field so the books are scattered randomly across multiple fields in sets of 1-3
        if (fieldSet-- <= 0) {
          fieldSet = books.perField();
          fieldId++;
        }
        bookCount++;
      }
      books.addAllToField(-1);
    }
  },

  // returns a random book with a random title
  build: function () {
    return {
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

  // make a handy list of book titles
  prepTitles: function () {
    lists.raw.bookTitleList.forEach((title, index) => {
      books.titles.push({
        index: index,
        title: title,
      });
    });
  },

  // returns and svg 
  render: function (color) {
    let bookSvg = svg.render('book1');
    return bookSvg.replace('tomato', color);
  },

  addAllToField: function (fieldId) {
    // loop through all books.. if the fieldId matches then randomly add it..
    if (books.list.length < 1) {
      return;
    }
    books.list.forEach((bookInfo, _) => {
      books.addOneToField(fieldId, bookInfo);
    });
  },

  addOneToField: function (fieldId, bookInfo) {
    // if pass in -1 then we are filling all existing fields with books
    // otherwise we are filling just the one field with books
    if (fieldId < 0 && player.fields[bookInfo.field]) {
      // continue.. 
    } else if (player.fields[fieldId] && bookInfo.field == fieldId) {
      // continue..
    } else {
      return;
    }
    // player has the field so add the book
    let params = {
      id: game.getUid(),
      x: rnd(field.space[game.UNDERGROUND].w - sprite.width),
      y: rnd(field.space[game.UNDERGROUND].h - sprite.height) + (sprite.height * 2),
      w: sprite.width,
      h: sprite.height,
      qty: 1,
      autoRender: false,
      item: `${bookInfo.item}`,
      type: 'books',
      svg: bookInfo.icon,
    };
    let newItem = new game.Item(params);
    player.fields[bookInfo.field][game.UNDERGROUND].push(newItem);
  },

  test: function () {
    books.addAllToField(-1);
  },

  // returns a bookInfo if the passed in string is a book otherwise null eg 'book_1' returns book 1 info
  isBook: function(item) {
    let bits = item.split('_');
    if (bits[0] == 'book') {
      return books.list[bits[1]];
    }
  },

  hint: function (bookId) {
    hint.force = true;
    hint.target = document.querySelector(`.book_${bookId}`);
    let bookList = player.books.split(game.recDelim);
    let bookString = bookList[bookId];
    let bookInfo = books.bookInfo(bookString);

    hint.message = `<b>${bookInfo.title}</b></br>To be returned to the library`;
    hint.okButton = 'hint.close';
    hint.group = ``;
    hint.render();
  },

  // loop through all books, any with -1 are in basket so set to -2 = in library
  newFinds: function () {
    let html = '<div class="dialog-message-content">';
    let bookMsg = '';

    books.list.forEach((bookInfo, _) => {
      if (bookInfo.field == -1) {
        bookMsg += `<div>The librarian says:<br/><i>"Ah.. <b>${bookInfo.fullName}</b>. I shall return it to the shelves."</i></div>`;
        bookInfo.field = -2;
        delete tools.list.basket.list[bookInfo.item];
        tools.list.basket.addQty(-1);
      }
    });
    if (bookMsg == '') {
      bookMsg += 'The librarian look as you eagerly, hoping for news of lost books';
    }
    html += `${bookMsg}</div>`;

    return html;
  },

  listBooks: function () {
    let html = '<div>';
    books.list.forEach((bookInfo, _) => {
      if (bookInfo.field < -1) {
        html += dialog.makeButton(bookInfo, true);
      }
    });
    html += '</div>';

    return html;
  },

  returned: function () {
    let returned = 0;
    books.list.forEach((bookInfo, _) => {
      if (bookInfo.field == -2) {
        returned++;
      }
    });

    return returned;

  },

};
