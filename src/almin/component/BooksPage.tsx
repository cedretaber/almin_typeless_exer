import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import Book from "../entity/Book";
import { booksContext } from "./Index";
import FetchBooksUseCase from "../usecase/FetchBooksUseCase";
import DeleteBookUseCase from "../usecase/DeleteBookUseCase";

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
          <Link to={`${props.routeProps.match.path}/books/${book.id}`}>
            edit
          </Link>
        </td>
        <td>
          <a onClick={_ => props.deleteBook(book.id)}>delete</a>
        </td>
      </tr>
    );
  });
  return (
    <table>
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
        <Link to={`${this.props.routeProps.match.path}/books/new`}>new</Link>
        <BookTable
          books={books}
          deleteBook={id => this.deleteBook(id)}
          routeProps={this.props.routeProps}
        />
      </div>
    );
  }
}
