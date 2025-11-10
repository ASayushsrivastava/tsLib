export interface User {
  id: number;
  name: string;
  email: string;
  password: string;

  role: "ADMIN" | "USER";
  issuedBooks: number[]; //BOOK IDS
}
