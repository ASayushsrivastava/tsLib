import { AdminService } from "./services/adminServiceImpl";
import { LibraryService } from "./services/libraryServiceImpl";
import { Book } from "./models/book";
import { User } from "./models/user";
import { Role } from "./enum/role";
import { NewBookInput, NewUserInput } from "./interfaces/adminServices";
import { UserService } from "./services/userServiceImpl";

export const DefaultBooks: Book[] = [
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

export const DefaultUsers: User[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@lib.com",
    password: "admin",
    role: Role.ADMIN,
    issuedBooks: [],
  },
  {
    id: 2,
    name: "Ayush",
    email: "ayush@lib.com",
    password: "1234",
    role: Role.USER,
    issuedBooks: [],
  },
];

export namespace Library {
  const books: Book[] = [...DefaultBooks];
  const users: User[] = [...DefaultUsers];

  const adminService = new AdminService(books, users);
  const libService = new LibraryService(books, () => users.length);
  const userService = new UserService(books, users);

  export function adminLogin(email: string, password: string) {
    return adminService.login(email, password);
  }

  export function adminAddBook(book: NewBookInput) {
    return adminService.addBook(book);
  }

  export function adminRemoveBook(bookId: number) {
    return adminService.removeBook(bookId);
  }

  export function adminRegisterUser(user: NewUserInput) {
    return adminService.registerUser(user);
  }

  export function adminViewUsers() {
    return adminService.viewAllUsers();
  }

  export function adminViewBooks() {
    return adminService.viewAllBooks();
  }

  export function adminRemoveUser(userId: number) {
    return adminService.removeUser(userId);
  }

  // ======================================================
  export function fetchAllBooks() {
    return libService.fetchAllBooks();
  }

  export function searchBooks(query: string) {
    return libService.searchByTitleAuthorOrGenre(query);
  }

  export function searchByGenre(genre: string) {
    return libService.searchByGenre(genre);
  }

  export function availableBooks() {
    return libService.listAvaiableBooks();
  }

  export function issueBook(bookId: number, userId: number) {
    return libService.issueBookToUser(bookId, userId);
  }

  export function returnBook(bookId: number, userId: number) {
    return libService.returnBookFromUser(bookId, userId);
  }

  export function stats() {
    return libService.statistics();
  }
  //   =============================================
  export function userLogin(email: string, password: string) {
    return userService.login(email, password);
  }

  export function userSearch(query: string) {
    return userService.searchBook(query);
  }

  export function userMyBooks() {
    return userService.viewMyBooks();
  }

  export function userDueDates() {
    return userService.viewDueDates();
  }

  export function userLogout() {
    return userService.logout();
  }
}
