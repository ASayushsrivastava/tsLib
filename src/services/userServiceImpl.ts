import { IUserService } from "../interfaces/userService";
import { Book } from "../models/book";
import { User } from "../models/user";

export class UserService implements IUserService {
  private books: Book[];
  private users: User[];
  private currentUser: User | null = null;

  constructor(books: Book[], users: User[]) {
    this.books = books;
    this.users = users;
  }

  login(email: string, password: string): boolean {
    const found = this.users.find(
      (u) => u.email === email && u.password === password && u.role === "USER"
    );

    if (found) {
      this.currentUser = found;
      console.log(`Welcome, ${found.name}!`);
      return true;
    }

    console.log("Invalid credentials!!");
    return false;
  }

  searchBook(query: string): Book[] {
    if (!this.currentUser) throw new Error("User not logged in.");
    const q = query.toLowerCase();
    const results = this.books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
    );
    return results;
  }

  viewMyBooks(): Book[] {
    if (!this.currentUser) throw new Error("User not logged in.");
    return this.books.filter((b) => b.issuedTo === this.currentUser?.id);
  }

  viewDueDates(): { bookId: number; dueDate: Date }[] {
    if (!this.currentUser) throw new Error("User not logged in.");

    const dueBooks = this.books
      .filter(
        (b) => b.issuedTo === this.currentUser?.id && b.dueDate !== undefined
      )
      .map((b) => ({
        bookId: b.id,
        dueDate: new Date(b.dueDate!),
      }));
    return dueBooks;
  }

  logout(): void {
    if (this.currentUser) {
      console.log(`${this.currentUser.name} successfully Looged out!!`);
      this.currentUser = null;
    } else {
      console.log("Error in Logout!");
    }
  }
}
