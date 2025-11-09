"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = exports.DefaultUsers = exports.DefaultBooks = void 0;
const adminServiceImpl_1 = require("./services/adminServiceImpl");
const libraryServiceImpl_1 = require("./services/libraryServiceImpl");
const role_1 = require("./enum/role");
const userServiceImpl_1 = require("./services/userServiceImpl");
exports.DefaultBooks = [
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
    {
        id: 4,
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        genre: "Programming",
        available: true,
    },
];
exports.DefaultUsers = [
    {
        id: 1,
        name: "Admin",
        email: "admin@lib.com",
        password: "admin",
        role: role_1.Role.ADMIN,
        issuedBooks: [],
    },
    {
        id: 2,
        name: "Ayush",
        email: "ayush@lib.com",
        password: "1234",
        role: role_1.Role.USER,
        issuedBooks: [],
    },
];
var Library;
(function (Library) {
    const books = [...exports.DefaultBooks];
    const users = [...exports.DefaultUsers];
    const adminService = new adminServiceImpl_1.AdminService(books, users);
    const libService = new libraryServiceImpl_1.LibraryService(books, () => users.length);
    const userService = new userServiceImpl_1.UserService(books, users);
    function adminLogin(email, password) {
        return adminService.login(email, password);
    }
    Library.adminLogin = adminLogin;
    function adminAddBook(book) {
        return adminService.addBook(book);
    }
    Library.adminAddBook = adminAddBook;
    function adminRemoveBook(bookId) {
        return adminService.removeBook(bookId);
    }
    Library.adminRemoveBook = adminRemoveBook;
    function adminRegisterUser(user) {
        return adminService.registerUser(user);
    }
    Library.adminRegisterUser = adminRegisterUser;
    function adminViewUsers() {
        return adminService.viewAllUsers();
    }
    Library.adminViewUsers = adminViewUsers;
    function adminViewBooks() {
        return adminService.viewAllBooks();
    }
    Library.adminViewBooks = adminViewBooks;
    function adminRemoveUser(userId) {
        return adminService.removeUser(userId);
    }
    Library.adminRemoveUser = adminRemoveUser;
    // ======================================================
    function fetchAllBooks() {
        return libService.fetchAllBooks();
    }
    Library.fetchAllBooks = fetchAllBooks;
    function searchBooks(query) {
        return libService.searchByTitleAuthorOrGenre(query);
    }
    Library.searchBooks = searchBooks;
    function searchByGenre(genre) {
        return libService.searchByGenre(genre);
    }
    Library.searchByGenre = searchByGenre;
    function availableBooks() {
        return libService.listAvaiableBooks();
    }
    Library.availableBooks = availableBooks;
    function issueBook(bookId, userId) {
        return libService.issueBookToUser(bookId, userId);
    }
    Library.issueBook = issueBook;
    function returnBook(bookId, userId) {
        return libService.returnBookFromUser(bookId, userId);
    }
    Library.returnBook = returnBook;
    function stats() {
        return libService.statistics();
    }
    Library.stats = stats;
    //   =============================================
    function userLogin(email, password) {
        return userService.login(email, password);
    }
    Library.userLogin = userLogin;
    function userSearch(query) {
        return userService.searchBook(query);
    }
    Library.userSearch = userSearch;
    function userMyBooks() {
        return userService.viewMyBooks();
    }
    Library.userMyBooks = userMyBooks;
    function userDueDates() {
        return userService.viewDueDates();
    }
    Library.userDueDates = userDueDates;
    function userLogout() {
        return userService.logout();
    }
    Library.userLogout = userLogout;
})(Library || (exports.Library = Library = {}));
