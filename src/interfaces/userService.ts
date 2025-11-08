import { Book } from "../models/book";

export interface IUserService {
  login(email: string, password: string): boolean;
  searchBook(query: string): Book[];
  issueBook(bookId: number): string;
  returnBook(bookId: number): string;
  viewDueDates(): { bookId: number; dueDate: Date }[];
  logout(): void;
}
