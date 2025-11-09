"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const role_1 = require("../enum/role");
const helper_1 = require("../utils/helper");
class AdminService {
    constructor(initialBooks = [], initialUsers = []) {
        this.loggedInAdmin = null;
        this.books = initialBooks;
        this.users = initialUsers;
    }
    login(email, password) {
        const found = this.users.find((u) => u.email === email && u.password === password && u.role === role_1.Role.ADMIN);
        if (found) {
            this.loggedInAdmin = found;
            console.log(`${found.name} Successfully logged in!`);
            return true;
        }
        console.log("Bad Credentials");
        return false;
    }
    addBook(book) {
        if (!this.loggedInAdmin)
            throw new Error("Admin not logged in.");
        const id = (0, helper_1.generateId)(this.books);
        const newBook = {
            id,
            title: book.title,
            author: book.author,
            genre: book.genre,
            available: true,
        };
        this.books.push(newBook);
        console.log(`${book.title} added succesfuuly!`);
        return newBook;
    }
    removeBook(bookId) {
        if (!this.loggedInAdmin)
            throw new Error("Admin not logged in.");
        const idx = this.books.findIndex((b) => b.id === bookId);
        if (idx === -1)
            return false;
        const removed = this.books.splice(idx, 1);
        console.log(`${removed[0].title} removed successfully!`);
        return true;
    }
    viewAllBooks() {
        if (!this.loggedInAdmin)
            throw new Error("Admin not logged in.");
        return [...this.books];
    }
    registerUser(user) {
        if (!this.loggedInAdmin)
            throw new Error("Admin not logged in.");
        const id = (0, helper_1.generateId)(this.users);
        const newUser = {
            id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            issuedBooks: [],
        };
        this.users.push(newUser);
        console.log(`${user.name} registered successfully!!!`);
        return newUser;
    }
    removeUser(userId) {
        if (!this.loggedInAdmin)
            throw new Error("Admin not logged in.");
        const idx = this.users.findIndex((u) => u.id === userId);
        if (idx === -1)
            return false;
        const removed = this.users.splice(idx, 1);
        console.log(`${removed[0].name} removed!!`);
        return true;
    }
    viewAllUsers() {
        if (!this.loggedInAdmin)
            throw new Error("Admin not logged in.");
        return [...this.users];
    }
}
exports.AdminService = AdminService;
