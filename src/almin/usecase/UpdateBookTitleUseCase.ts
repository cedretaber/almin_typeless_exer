import { UseCase } from "almin";
import { UpdateTitlePayload } from "../store/BookFormPayload";

export default class UpdateBookTitleUseCase extends UseCase {
  execute(title: string) {
    this.dispatch(new UpdateTitlePayload(title));
  }
}
