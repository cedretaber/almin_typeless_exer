import Book from "../entity/Book";
import { Payload } from "almin";
import BooksPayload from "./BooksPayload";

export class BooksState {
  readonly books: Book[];

  constructor(books: Book[]) {
    this.books = books;
  }

  static empty(): BooksState {
    return new BooksState([]);
  }

  reduce(payload: Payload): BooksState {
    if (payload instanceof BooksPayload) {
      return new BooksState(payload.books);
    }
    return this;
  }
}
