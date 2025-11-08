export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  issuedBooks: number[]; //BOOK IDS
}
