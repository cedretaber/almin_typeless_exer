import { createEpic, createReducer, useModule } from "typeless";
import * as Rx from "typeless/rx";
import { booksUrl, bookUrl, typelessIndexUrl } from "../../../Consts";
import { MODULE, BookActions, BookState } from "./interface";
import { BooksActions } from "./../books/interface";
import Book from "../entities/Book";

function fetchBook(id: number) {
  return Rx.fromPromise(
    fetch(bookUrl(id), { method: "GET" }).then(
      res => res.json() as Promise<Book>
    )
  );
}

function createBook(title: string, author: string) {
  return Rx.fromPromise(
    fetch(booksUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ title, author })
    })
  );
}

function updateBook({ id, title, author }: Book) {
  return Rx.fromPromise(
    fetch(bookUrl(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({ title, author })
    })
  );
}

const epic = createEpic(MODULE)
  .on(BookActions.fetchBook, ({ id }) => {
    const book = fetchBook(id).pipe(Rx.share());
    return book.pipe(
      Rx.map(({ title }) => BookActions.updateTitle(title)),
      Rx.merge(
        book.pipe(Rx.map(({ author }) => BookActions.updateAuthor(author)))
      )
    );
  })
  .on(BookActions.createBook, ({ title, author, history }) =>
    createBook(title, author).pipe(
      Rx.map(_ => {
        history.push(typelessIndexUrl);
        return BooksActions.fetchBooks();
      })
    )
  )
  .on(BookActions.updateBook, ({ book, history }) =>
    updateBook(book).pipe(
      Rx.map(_ => {
        history.push(typelessIndexUrl);
        return BooksActions.fetchBooks();
      })
    )
  );

const initialState: BookState = {
  title: null,
  author: null
};

const reducer = createReducer(initialState)
  .on(BookActions.updateTitle, (state, { title }) => ({ ...state, title }))
  .on(BookActions.updateAuthor, (state, { author }) => ({ ...state, author }));

export const useBookModule = () =>
  useModule({
    epic,
    reducer,
    reducerPath: ["book"]
  });
