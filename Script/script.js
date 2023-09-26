

function concatenateString(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength).toUpperCase() + '...';
    }
    return text.toUpperCase();
}

function createTableCells(rowAmount, cellsAmount) {
    const table = document.querySelector('table');
    for (let i = 0; i < rowAmount; i++) {
        const row = table.insertRow();
        for (let j = 0; j < cellsAmount; j++) {
            const cell = row.insertCell();
            cell.innerText = `Cell ${j + 1}`;
        }
    }
}

class Book {
    constructor(title, authors, numberOfPages, isRead, isFavorite) {
        this.title = title;
        this.authors = authors;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;
    }

    markAsRead() {
        this.isRead = true;
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }
}

class Bookshelf {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index > -1) {
            this.books.splice(index, 1);
        }
    }

    getUnreadBooks() {
        return this.books.filter(book => !book.isRead);
    }

    getFavBooks() {
        return this.books.filter(book => book.isFavorite);
    }
}

function displayBooks(bookshelf) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Очищаємо таблицю

    bookshelf.books.forEach(book => {
        const row = tableBody.insertRow();
        row.insertCell().innerText = book.title;
        row.insertCell().innerText = book.authors;
        row.insertCell().innerText = book.numberOfPages;
        row.insertCell().innerText = book.isRead ? 'Yes' : 'No';
        row.insertCell().innerText = book.isFavorite ? 'Yes' : 'No';
    });
}

const bookshelf = new Bookshelf();

document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const authors = document.getElementById('authors').value;
    const numberOfPages = document.getElementById('numberOfPages').value;
    const isRead = document.getElementById('isRead').checked;
    const isFavorite = document.getElementById('isFavorite').checked;

    const newBook = new Book(title, authors, numberOfPages, isRead, isFavorite);
    bookshelf.addBook(newBook);
    displayBooks(bookshelf);
    document.getElementById('bookForm').reset();
});

