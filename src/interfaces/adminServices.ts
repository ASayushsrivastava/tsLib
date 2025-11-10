import { Book } from "../models/book";
import { User } from "../models/user";

export interface IAdminService {
  login(email: string, password: string): boolean;
  addBook(book: NewBookInput): Book;
  removeBook(bookId: number): boolean;
  viewAllBooks(): Book[];
  registerUser(user: NewUserInput): User;
  removeUser(userId: number): boolean;
  viewAllUsers(): User[];
}

export interface NewBookInput {
  title: string;
  author: string;
  genre: string;
}

export interface NewUserInput {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}
