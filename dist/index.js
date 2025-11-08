"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userServiceImpl_1 = require("./services/userServiceImpl");
const books = [
    {
        id: 1,
        title: "1984",
        author: "George Orwell",
        genre: "Fiction",
        available: true,
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-help",
        available: true,
    },
    {
        id: 3,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: "History",
        available: true,
    },
];
const users = [
    {
        id: 1,
        name: "Ayush",
        email: "ayush@mail.com",
        password: "1234",
        issuedBooks: [],
    },
];
const userService = new userServiceImpl_1.UserService(books, users);
if (userService.login("ayush@mail.com", "1234")) {
    userService.searchBook("habit");
    console.log(userService.issueBook(2));
    console.log(userService.viewDueDates());
    console.log(userService.returnBook(2));
    userService.logout();
}
