import { UseCase } from "almin";
import { booksUrl, alminIndexUrl } from "../../Consts";
import { History } from "history";

export default class CreateBookUseCase extends UseCase {
  execute(title: string, author: string, history: History) {
    return (async () => {
      const res = await fetch(booksUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ title, author })
      });
      if (res.status === 200 || res.status === 204) {
        history.push(alminIndexUrl);
      }
    })();
  }
}
