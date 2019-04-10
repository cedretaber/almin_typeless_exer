import { UseCase } from "almin";
import { UpdateAuthorPayload } from "../store/BookFormPayload";

export default class UpdateBookAuthorUseCase extends UseCase {
  execute(author: string) {
    this.dispatch(new UpdateAuthorPayload(author));
  }
}
