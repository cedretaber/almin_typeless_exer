import { Payload } from "almin";
import Book from "../entity/Book";

export class InitFormPayload extends Payload {
  type = "InitForm";

  readonly book?: Book;

  constructor();
  constructor(book: Book);
  constructor(book?: Book) {
    super();
    this.book = book;
  }
}

export class UpdateTitlePayload extends Payload {
  type = "UpdateTitle";

  readonly title: string;

  constructor(title: string) {
    super();
    this.title = title;
  }
}

export class UpdateAuthorPayload extends Payload {
  type = "UpdateAuthor";

  readonly author: string;

  constructor(author: string) {
    super();
    this.author = author;
  }
}
