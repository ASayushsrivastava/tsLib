"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(books, users) {
        this.currentUser = null;
        this.books = books;
        this.users = users;
    }
    login(email, password) {
        const found = this.users.find((u) => u.email === email && u.password === password && u.role === "USER");
        if (found) {
            this.currentUser = found;
            console.log(`Welcome, ${found.name}!`);
            return true;
        }
        console.log("Invalid credentials!!");
        return false;
    }
    searchBook(query) {
        if (!this.currentUser)
            throw new Error("User not logged in.");
        const q = query.toLowerCase();
        const results = this.books.filter((b) => b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q) ||
            b.genre.toLowerCase().includes(q));
        return results;
    }
    viewMyBooks() {
        if (!this.currentUser)
            throw new Error("User not logged in.");
        return this.books.filter((b) => b.issuedTo === this.currentUser?.id);
    }
    viewDueDates() {
        if (!this.currentUser)
            throw new Error("User not logged in.");
        const dueBooks = this.books
            .filter((b) => b.issuedTo === this.currentUser?.id && b.dueDate !== undefined)
            .map((b) => ({
            bookId: b.id,
            dueDate: new Date(b.dueDate),
        }));
        return dueBooks;
    }
    logout() {
        if (this.currentUser) {
            console.log(`${this.currentUser.name} successfully Looged out!!`);
            this.currentUser = null;
        }
        else {
            console.log("Error in Logout!");
        }
    }
}
exports.UserService = UserService;
