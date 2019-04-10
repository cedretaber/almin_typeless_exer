import { Store, Payload } from "almin";
import { BooksState } from "./BooksState";

export default class BooksStore extends Store<BooksState> {
  constructor() {
    super();
    this.state = BooksState.empty();
  }

  receivePayload(payload: Payload) {
    this.setState(this.state.reduce(payload));
  }

  getState() {
    return this.state;
  }
}
