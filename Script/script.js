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
    const container = document.getElementById('bookshelfContainer');
    
    
    const newTable = document.createElement('table');
    container.appendChild(newTable);

    const book = bookshelf.books[bookshelf.books.length - 1]; 

    const titleRow = newTable.insertRow();
    titleRow.insertCell().innerText = "Title";
    titleRow.insertCell().innerText = book.title;

    const authorsRow = newTable.insertRow();
    authorsRow.insertCell().innerText = "Authors";
    authorsRow.insertCell().innerText = book.authors;

    const pagesRow = newTable.insertRow();
    pagesRow.insertCell().innerText = "Number of Pages";
    pagesRow.insertCell().innerText = book.numberOfPages;

    const readRow = newTable.insertRow();
    readRow.insertCell().innerText = "Is Read";
    readRow.insertCell().innerText = book.isRead ? 'Yes' : 'No';

    const favRow = newTable.insertRow();
    favRow.insertCell().innerText = "Is Favorite";
    favRow.insertCell().innerText = book.isFavorite ? 'Yes' : 'No';

    
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete this table";
    deleteButton.className = "deleteButton"; 
    deleteButton.onclick = function() {
        container.removeChild(newTable);
        container.removeChild(deleteButton);
    };
    container.appendChild(deleteButton);
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
