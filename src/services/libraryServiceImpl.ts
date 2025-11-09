import { GenreCount, ILibraryService } from "../interfaces/libraryService";
import { Book } from "../models/book";

export class LibraryService implements ILibraryService {
  private books: Book[];
  private usersCountProvider: () => number; //TOTAL USER COUNT

  constructor(books: Book[], usersCountProvider: () => number) {
    this.books = books;
    this.usersCountProvider = usersCountProvider;
  }

  fetchAllBooks(): Book[] {
    return [...this.books];
  }

  searchByTitleAuthorOrGenre(query: string): Book[] {
    const q = query.toLowerCase();
    return this.books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q)
    );
  }

  searchByGenre(genre: string): Book[] {
    const g = genre.toLowerCase();
    return this.books.filter((b) => b.genre.toLowerCase() === g);
  }

  listAvaiableBooks(): Book[] {
    return this.books.filter((b) => b.available);
  }

  issueBookToUser(bookId: number, userId: number): string {
    const book = this.books.find((b) => b.id === bookId);
    if (!book) return "Book not found!!";
    if (!book.available) return "Book finished!!";

    book.available = false;
    book.issuedTo = userId;

    const issuedDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issuedDate.getDate() + 28);

    book.issueDate = issuedDate.toISOString();
    book.dueDate = dueDate.toISOString();

    return `Book'${
      book.title
    }' issued by, ${userId}. Due date: ${dueDate.toDateString()}`;
  }

  returnBookFromUser(bookId: number, userId: number): string {
    const book = this.books.find((b) => b.id === bookId);
    if (!book) return "Book not found.";
    if (book.issuedTo !== userId)
      return "This book is not issued to this user.";
    book.available = true;
    book.issuedTo = undefined;
    book.issueDate = undefined;
    book.dueDate = undefined;
    return `Book '${book.title}' returned by user ${userId}!!`;
  }

  statistics(): {
    totalBooks: number;
    byGenre: GenreCount;
    availableBooks: number;
    totalUsers: number;
  } {
    const totalBooks = this.books.length;

    const byGenre: GenreCount = {};
    for (const book of this.books) {
      if (byGenre[book.genre]) {
        byGenre[book.genre]++;
      } else {
        byGenre[book.genre] = 1;
      }
    }

    const availableBooks = this.books.filter((b) => b.available).length;
    const totalUsers = this.usersCountProvider();

    return {
      totalBooks,
      byGenre,
      availableBooks,
      totalUsers,
    };
  }
}
