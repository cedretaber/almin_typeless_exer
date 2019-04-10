import { Payload } from "almin";
import Book from "../entity/Book";

export default class BooksPayload implements Payload {
  readonly type = "BooksPayload";
  readonly books: Book[];

  constructor(books: Book[]) {
    this.books = books;
  }
}
