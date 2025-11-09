"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryService = void 0;
class LibraryService {
    constructor(books, usersCountProvider) {
        this.books = books;
        this.usersCountProvider = usersCountProvider;
    }
    fetchAllBooks() {
        return [...this.books];
    }
    searchByTitleAuthorOrGenre(query) {
        const q = query.toLowerCase();
        return this.books.filter((b) => b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q) ||
            b.genre.toLowerCase().includes(q));
    }
    searchByGenre(genre) {
        const g = genre.toLowerCase();
        return this.books.filter((b) => b.genre.toLowerCase() === g);
    }
    listAvaiableBooks() {
        return this.books.filter((b) => b.available);
    }
    issueBookToUser(bookId, userId) {
        const book = this.books.find((b) => b.id === bookId);
        if (!book)
            return "Book not found!!";
        if (!book.available)
            return "Book finished!!";
        book.available = false;
        book.issuedTo = userId;
        const issuedDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(issuedDate.getDate() + 28);
        book.issueDate = issuedDate.toISOString();
        book.dueDate = dueDate.toISOString();
        return `Book'${book.title}' issued by, ${userId}. Due date: ${dueDate.toDateString()}`;
    }
    returnBookFromUser(bookId, userId) {
        const book = this.books.find((b) => b.id === bookId);
        if (!book)
            return "Book not found.";
        if (book.issuedTo !== userId)
            return "This book is not issued to this user.";
        book.available = true;
        book.issuedTo = undefined;
        book.issueDate = undefined;
        book.dueDate = undefined;
        return `Book '${book.title}' returned by user ${userId}!!`;
    }
    statistics() {
        const totalBooks = this.books.length;
        const byGenre = {};
        for (const book of this.books) {
            if (byGenre[book.genre]) {
                byGenre[book.genre]++;
            }
            else {
                byGenre[book.genre] = 1;
            }
        }
        const availableBooks = this.books.filter((b) => b.available).length;
        const totalUsers = this.usersCountProvider();
        return {
            totalBooks,
            byGenre,
            availableBooks,
            totalUsers,
        };
    }
}
exports.LibraryService = LibraryService;
