import { Store, Payload } from "almin";
import BookFormState from "./BookFormState";

export default class BookFormStore extends Store<BookFormState> {
  constructor() {
    super();
    this.state = new BookFormState();
  }

  receivePayload(payload: Payload) {
    this.setState(this.state.reduce(payload));
  }

  getState() {
    return this.state;
  }
}
