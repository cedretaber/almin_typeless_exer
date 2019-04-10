import { UseCase } from "almin";
import { bookUrl, alminIndexUrl } from "../../Consts";
import { History } from "history";

export default class UpdateBookUseCase extends UseCase {
  execute(id: number, title: string, author: string, history: History) {
    return (async () => {
      const res = await fetch(bookUrl(id), {
        method: "PUT",
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
