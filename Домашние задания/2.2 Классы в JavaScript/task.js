class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100;
    this.type = null;
  }

  fix() {
    this.state *= 1.5;
  }

  set state(value) {
    this._state = Math.min(100, Math.max(0, value));
  }

  get state() {
    return this._state;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = 'magazine';
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = 'book';
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'novel';
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'fantastic';
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'detective';
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    return this.books.find((book) => book[type] === value) || null;
  }

  giveBookByName(bookName) {
    const book = this.findBookBy('name', bookName);
    if (book === null) {
      return null;
    }

    this.books.splice(this.books.indexOf(book), 1);
    return book;
  }
}

{
  const library = new Library('Районная библиотека');
  library.addBook(new NovelBook('Герман Гессе', 'Демиан', 1919, 200));
  library.addBook(new FantasticBook('Герберт Уэллс', 'Машина времени', 1895, 138));
  library.addBook(new Magazine('Мурзилка', 1924, 60));

  const foundBook = library.findBookBy('releaseDate', 1919);
  const borrowedBook = library.giveBookByName(foundBook.name);
  borrowedBook.state = 25;
  borrowedBook.fix();
  library.addBook(borrowedBook);
}
