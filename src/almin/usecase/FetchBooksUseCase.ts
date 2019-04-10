import { UseCase } from "almin";
import BooksPayload from "../store/BooksPayload";
import Book from "../entity/Book";
import { booksUrl } from "../../Consts";

export default class FetchBooksUseCase extends UseCase {
  execute() {
    return (async () => {
      const res = await fetch(booksUrl, { method: "GET" });
      const json: Book[] = await res.json();
      const books = json.map(
        ({ id, title, author }) => new Book(id, title, author)
      );
      this.dispatch(new BooksPayload(books));
    })();
  }
}
