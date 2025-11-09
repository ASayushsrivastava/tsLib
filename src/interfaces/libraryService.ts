import { Book } from "../models/book";

export interface ILibraryService {
  fetchAllBooks(): Book[];
  searchByTitleAuthorOrGenre(query: string): Book[];
  searchByGenre(genre: string): Book[];
  listAvaiableBooks(): Book[];
  issueBookToUser(bookId: number, userId: number): string;
  returnBookFromUser(bookId: number, userId: number): string;
  statistics(): {
    totalBooks: number;
    byGenre: GenreCount;
    availableBooks: number;
    totalUsers: number;
  };
}

export interface GenreCount {
  [genre: string]: number;
}
