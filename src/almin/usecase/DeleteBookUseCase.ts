import { UseCase } from "almin";
import { bookUrl } from "../../Consts";
import FetchBooksUseCase from "./FetchBooksUseCase";

export default class DeleteBookUseCase extends UseCase {
  execute(id: number) {
    return (async () => {
      const res = await fetch(bookUrl(id), { method: "DELETE" });

      if (res.status === 200 || res.status === 204) {
        return this.context.useCase(new FetchBooksUseCase()).execute();
      }
    })();
  }
}
