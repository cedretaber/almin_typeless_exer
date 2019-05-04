import * as React from "react";
import { Link } from "react-router-dom";
import { booksContext } from "./Index";
import UpdateBookTitleUseCase from "../usecase/UpdateBookTitleUseCase";
import UpdateBookAuthorUseCase from "../usecase/UpdateBookAuthorUseCase";
import CreateBookUseCase from "../usecase/CreateBookUseCase";
import UpdateBookUseCase from "../usecase/UpdateBookUseCase";
import FetchBookUseCase from "../usecase/FetchBookUseCase";
import ClearBookUseCase from "../usecase/ClearBookUseCase";
import { alminIndexUrl } from "../../Consts";
import { RouteContext } from "./context/RouteContext";

interface Props {
  booksContext: typeof booksContext;
  bookId?: number;
}

export default class BookPage extends React.Component<
  Props,
  ReturnType<typeof booksContext.getState>
> {
  static contextType = RouteContext;

  private unSubscribe: any;

  constructor(props: Props) {
    super(props);
    this.state = props.booksContext.getState();
  }

  onTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.props.booksContext
      .useCase(new UpdateBookTitleUseCase())
      .execute(e.target.value);
  }

  onAuthorChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    this.props.booksContext
      .useCase(new UpdateBookAuthorUseCase())
      .execute(e.target.value);
  }

  onSubmit(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    const id = this.props.bookId;
    const { title, author } = this.state.formStore;
    const history = this.context.history;
    if (isNaN(id)) {
      this.props.booksContext
        .useCase(new CreateBookUseCase())
        .execute(title, author, history);
    } else {
      this.props.booksContext
        .useCase(new UpdateBookUseCase())
        .execute(id, title, author, history);
    }
  }

  componentDidMount() {
    const context = this.props.booksContext;
    this.unSubscribe = context.onChange(() => {
      this.setState(context.getState());
    });
    const { bookId } = this.props;
    if (isNaN(bookId)) {
      this.props.booksContext.useCase(new ClearBookUseCase()).execute();
    } else {
      this.props.booksContext.useCase(new FetchBookUseCase()).execute(bookId);
    }
  }

  componentWillUnmount() {
    if (typeof this.unSubscribe === "function") {
      this.unSubscribe();
    }
  }

  render() {
    const { id, title, author } = this.state.formStore;
    return (
      <div>
        <form>
          <div className="form-group">
            <label className="form-label" htmlFor="title-imput">
              Title
            </label>
            <input
              type="text"
              id="title-input"
              className="form-input"
              value={title || ""}
              onChange={e => this.onTitleChange(e)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="author-input">
              Author
            </label>
            <input
              type="text"
              id="author-input"
              className="form-input"
              value={author || ""}
              onChange={e => this.onAuthorChange(e)}
            />
          </div>
          <input
            type="submit"
            className="btn"
            value={id ? "Update" : "Create"}
            onClick={e => this.onSubmit(e)}
          />
        </form>
        <br />
        <Link to={alminIndexUrl}>back</Link>
      </div>
    );
  }
}
