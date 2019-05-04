import * as React from "react";
import { Link } from "react-router-dom";
import { useActions, useMappedState } from "typeless";
import { BookActions } from "../interface";
import Book from "../../entities/Book";
import { typelessIndexUrl } from "../../../../Consts";
import { History } from "history";

export function BookView(props: { id?: number; history: History }) {
  const {
    fetchBook,
    createBook,
    updateBook,
    updateTitle,
    updateAuthor
  } = useActions(BookActions);
  const { title, author } = useMappedState(state => state.book);
  const history = props.history;

  React.useEffect(() => {
    if (props.id !== undefined) {
      fetchBook(props.id);
    } else {
      updateTitle("");
      updateAuthor("");
    }
  }, [props.id]);

  const inputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateTitle(e.target.value);
  };

  const inputAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    updateAuthor(e.target.value);
  };

  const submit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (props.id === undefined) {
      createBook(title, author, history);
    } else {
      updateBook(new Book(props.id, title, author), history);
    }
  };

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
            onChange={inputTitle}
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
            onChange={inputAuthor}
          />
        </div>
        <input
          type="submit"
          className="btn"
          value={props.id === undefined ? "Create" : "Update"}
          onClick={submit}
        />
      </form>
      <br />
      <Link to={typelessIndexUrl}>back</Link>
    </div>
  );
}
