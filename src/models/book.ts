export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
  issuedTo?: number; //USERID
  issueDate?: string;
  dueDate?: string;
}
