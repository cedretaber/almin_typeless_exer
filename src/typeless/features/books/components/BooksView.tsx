import * as React from "react";
import { Link } from "react-router-dom";
import { useActions, useMappedState } from "typeless";
import { BooksActions } from "../interface";
import Book from "../../entities/Book";
import { rootUrl } from "../../../../Consts";
import { RouteContext } from "../../../Index";

const BookTable = (props: {
  books: Book[] | null;
  deleteBook: (id: number) => void;
}) => {
  const route = React.useContext(RouteContext);

  if (props.books === null) return <table />;

  const tbody = props.books.map((book, idx) => {
    return (
      <tr key={`typeless_books_table_${idx}`}>
        <td>{book.id}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>
          <Link to={`${route.match.path}/${book.id}`}>
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

export function BooksView() {
  const { fetchBooks, deleteBook } = useActions(BooksActions);
  const { books } = useMappedState(state => state.books);
  const route = React.useContext(RouteContext);

  React.useEffect(() => {
    if (books === null) {
      fetchBooks();
    }
  });

  return (
    <div>
      <h2>Book Index</h2>
      <Link to={`${route.match.path}/new`}>new</Link>
      <BookTable books={books} deleteBook={id => deleteBook(id)} />
      <br />
      <Link to={rootUrl}>back</Link>
    </div>
  );
}
