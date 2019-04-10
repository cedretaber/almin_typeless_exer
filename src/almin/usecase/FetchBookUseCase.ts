import { UseCase } from "almin";
import { bookUrl } from "../../Consts";
import { InitFormPayload } from "../store/BookFormPayload";
import Book from "../entity/Book";

export default class FetchBookUseCase extends UseCase {
  execute(id: number) {
    return (async () => {
      const res = await fetch(bookUrl(id), { method: "GET" });
      const { id: bookId, title, author } = await res.json();
      return this.dispatch(
        new InitFormPayload(new Book(bookId, title, author))
      );
    })();
  }
}
