"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(books, users) {
        this.users = users;
        this.user = null;
        this.books = [];
        this.books = books;
    }
    login(email, password) {
        const foundUser = this.users.find((u) => u.email === email && u.password === password);
        if (foundUser) {
            this.user = foundUser;
            console.log(`${foundUser.name}, Successfully logged in!!.`);
            return true;
        }
        else {
            console.log("Invalid Entry!!.");
            return false;
        }
    }
    searchBook(query) {
        if (!this.user)
            throw new Error("User not logged in.");
        const results = this.books.filter((b) => b.title.toLowerCase().includes(query.toLowerCase()) ||
            b.author.toLowerCase().includes(query.toLowerCase()) ||
            b.genre.toLowerCase().includes(query.toLowerCase()));
        console.log(`Found ${results.length} book(s).`);
        return results;
    }
    issueBook(bookId) {
        if (!this.user)
            return "User not logged in.";
        const book = this.books.find((b) => b.id === bookId);
        if (!book)
            return "Book not found.";
        if (!book.available)
            return "Book already issued.";
        book.available = false;
        book.issuedTo = this.user.id;
        book.issueDate = new Date();
        const due = new Date();
        due.setDate(due.getDate() + 30);
        book.dueDate = due;
        this.user.issuedBooks.push(bookId);
        return `Book '${book.title}' issued successfully. Due on ${due.toDateString()}`;
    }
    returnBook(bookId) {
        if (!this.user)
            return "User not logged in.";
        const book = this.books.find((b) => b.id === bookId);
        if (!book || book.issuedTo !== this.user.id)
            return "You have not issued this book.";
        book.available = true;
        book.issuedTo = undefined;
        book.issueDate = undefined;
        book.dueDate = undefined;
        this.user.issuedBooks = this.user.issuedBooks.filter((id) => id !== bookId);
        return `Book '${book.title}' returned successfully.`;
    }
    viewDueDates() {
        if (!this.user)
            throw new Error("User not logged in.");
        const dueBooks = this.books
            .filter((b) => b.issuedTo === this.user?.id && b.dueDate)
            .map((b) => ({ bookId: b.id, dueDate: b.dueDate }));
        return dueBooks;
    }
    logout() {
        if (this.user)
            console.log(`User ${this.user.name}, Successfully logged out!!`);
        this.user = null;
    }
}
exports.UserService = UserService;
