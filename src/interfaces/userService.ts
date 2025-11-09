import { Book } from "../models/book";

export interface IUserService {
  login(email: string, password: string): boolean;
  searchBook(query: string): Book[];
  viewMyBooks(): Book[];
  viewDueDates(): { bookId: number; dueDate: Date }[];
  logout(): void;
}
