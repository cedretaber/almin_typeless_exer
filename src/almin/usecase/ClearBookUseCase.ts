import { UseCase } from "almin";
import { InitFormPayload } from "../store/BookFormPayload";

export default class ClearBookUseCase extends UseCase {
  execute() {
    this.dispatch(new InitFormPayload());
  }
}
