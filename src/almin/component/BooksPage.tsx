import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import Book from "../entity/Book";
import { booksContext } from "./Index";
import FetchBooksUseCase from "../usecase/FetchBooksUseCase";
import DeleteBookUseCase from "../usecase/DeleteBookUseCase";
import { rootUrl } from "../../Consts";

const BookTable = (props: {
  books: Book[];
  deleteBook: (id: number) => void;
  routeProps: RouteComponentProps;
}) => {
  const tbody = props.books.map((book, idx) => {
    return (
      <tr key={`almin_books_table_${idx}`}>
        <td>{book.id}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>
          <Link to={`${props.routeProps.match.path}/${book.id}`}>
            <i className="icon icon-edit" />
          </Link>
          <i
            className="icon icon-cross text-error"
            style={{ cursor: "pointer", marginLeft: "1rem" }}
            onClick={_ => props.deleteBook(book.id)}
          />
        </td>
      </tr>
    );
  });
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Authro</th>
          <td />
        </tr>
      </thead>
      <tbody>{...tbody}</tbody>
    </table>
  );
};

interface Props {
  booksContext: typeof booksContext;
  routeProps: RouteComponentProps;
}

export default class BooksPage extends React.Component<
  Props,
  ReturnType<typeof booksContext.getState>
> {
  private unSubscribe: any;

  constructor(props: Props) {
    super(props);
    this.state = props.booksContext.getState();
  }

  fetchBooks() {
    this.props.booksContext.useCase(new FetchBooksUseCase()).execute();
  }

  deleteBook(id: number) {
    this.props.booksContext.useCase(new DeleteBookUseCase()).execute(id);
  }

  componentDidMount() {
    const context = this.props.booksContext;
    this.unSubscribe = context.onChange(() => {
      this.setState(context.getState());
    });
    this.fetchBooks();
  }

  componentWillUnmount() {
    if (typeof this.unSubscribe === "function") {
      this.unSubscribe();
    }
  }

  render() {
    const { books } = this.state.booksStore;
    return (
      <div>
        <h2>Book Index</h2>
        <Link to={`${this.props.routeProps.match.path}/new`}>new</Link>
        <BookTable
          books={books}
          deleteBook={id => this.deleteBook(id)}
          routeProps={this.props.routeProps}
        />
        <br />
        <Link to={rootUrl}>back</Link>
      </div>
    );
  }
}
