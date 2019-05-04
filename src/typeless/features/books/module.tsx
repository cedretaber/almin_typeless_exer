import { createEpic, createReducer, useModule } from "typeless";
import * as Rx from "typeless/rx";
import { booksUrl, bookUrl } from "../../../Consts";
import { MODULE, BooksActions, BooksState } from "./interface";
import Book from "../entities/Book";

function fetchBooks() {
  return Rx.fromPromise(
    fetch(booksUrl, { method: "GET" }).then(
      res => res.json() as Promise<Book[]>
    )
  );
}

function deleteBook(id: number) {
  return Rx.fromPromise(fetch(bookUrl(id), { method: "DELETE" }));
}

const epic = createEpic(MODULE)
  .on(BooksActions.fetchBooks, () =>
    fetchBooks().pipe(Rx.map(books => BooksActions.booksFetched(books)))
  )
  .on(BooksActions.deleteBook, ({ id }) =>
    deleteBook(id).pipe(Rx.map(_ => BooksActions.fetchBooks()))
  );

const initialState: BooksState = {
  books: null
};

const reducer = createReducer(initialState).on(
  BooksActions.booksFetched,
  (state, { books }) => ({ ...state, books })
);

export const useBooksModule = () =>
  useModule({
    epic,
    reducer,
    reducerPath: ["books"],
    actions: BooksActions
  });
