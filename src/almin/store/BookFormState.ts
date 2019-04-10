import Book from "../entity/Book";
import { Payload } from "almin";
import {
  UpdateTitlePayload,
  UpdateAuthorPayload,
  InitFormPayload
} from "./BookFormPayload";

export default class BookFormState {
  readonly id?: number;
  readonly title: string = "";
  readonly author: string = "";

  constructor();
  constructor(book: Book);
  constructor(id: number, title: string, author: string);
  constructor(id?: number | Book | undefined, title?: string, author?: string) {
    if (id instanceof Book) {
      const book = id;
      this.id = book.id;
      this.title = book.title;
      this.author = book.author;
    } else {
      this.id = id;
      if (title !== undefined) this.title = title;
      if (author !== undefined) this.author = author;
    }
  }

  reduce(payload: Payload) {
    if (payload instanceof UpdateTitlePayload) {
      return new BookFormState(this.id, payload.title, this.author);
    }
    if (payload instanceof UpdateAuthorPayload) {
      return new BookFormState(this.id, this.title, payload.author);
    }
    if (payload instanceof InitFormPayload) {
      if (payload.book === undefined) {
        return new BookFormState();
      } else {
        return new BookFormState(payload.book);
      }
    }
    return this;
  }
}
