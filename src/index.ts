import { UserService } from "./services/userServiceImpl";
import { Book } from "./models/book";
import { User } from "./models/user";

const books: Book[] = [
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

const users: User[] = [
  {
    id: 1,
    name: "Ayush",
    email: "ayush@mail.com",
    password: "1234",
    issuedBooks: [],
  },
];

const userService = new UserService(books, users);

if (userService.login("ayush@mail.com", "1234")) {
  userService.searchBook("habit");
  console.log(userService.issueBook(2));
  console.log(userService.viewDueDates());
  console.log(userService.returnBook(2));
  userService.logout();
}
