import { Role } from "../enum/role";
import {
  IAdminService,
  NewBookInput,
  NewUserInput,
} from "../interfaces/adminServices";
import { Book } from "../models/book";
import { User } from "../models/user";
import { generateId } from "../utils/helper";

export class AdminService implements IAdminService {
  private books: Book[];
  private users: User[];
  private loggedInAdmin: User | null = null;

  constructor(initialBooks: Book[] = [], initialUsers: User[] = []) {
    this.books = initialBooks;
    this.users = initialUsers;
  }

  login(email: string, password: string): boolean {
    const found = this.users.find(
      (u) =>
        u.email === email && u.password === password && u.role === Role.ADMIN
    );
    if (found) {
      this.loggedInAdmin = found;
      console.log(`${found.name} Successfully logged in!`);
      return true;
    }
    console.log("Bad Credentials");
    return false;
  }

  addBook(book: NewBookInput): Book {
    if (!this.loggedInAdmin) throw new Error("Admin not logged in.");
    const id = generateId(this.books);
    const newBook: Book = {
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

  removeBook(bookId: number): boolean {
    if (!this.loggedInAdmin) throw new Error("Admin not logged in.");
    const idx = this.books.findIndex((b) => b.id === bookId);
    if (idx === -1) return false;
    const removed = this.books.splice(idx, 1);
    console.log(`${removed[0].title} removed successfully!`);
    return true;
  }

  viewAllBooks(): Book[] {
    if (!this.loggedInAdmin) throw new Error("Admin not logged in.");
    return [...this.books];
  }

  registerUser(user: NewUserInput): User {
    if (!this.loggedInAdmin) throw new Error("Admin not logged in.");

    const id = generateId(this.users);
    const newUser: User = {
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

  removeUser(userId: number): boolean {
    if (!this.loggedInAdmin) throw new Error("Admin not logged in.");
    const idx = this.users.findIndex((u) => u.id === userId);
    if (idx === -1) return false;
    const removed = this.users.splice(idx, 1);
    console.log(`${removed[0].name} removed!!`);
    return true;
  }

  viewAllUsers(): User[] {
    if (!this.loggedInAdmin) throw new Error("Admin not logged in.");
    return [...this.users];
  }
}
