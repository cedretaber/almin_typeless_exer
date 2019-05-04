import { createActions } from "typeless";
import Book from "../entities/Book";

export const MODULE = "BOOKS";

export const BooksActions = createActions(MODULE, {
  fetchBooks: null,
  booksFetched: (books: Book[]) => ({ payload: { books } }),
  deleteBook: (id: number) => ({ payload: { id } })
});

export interface BooksState {
  books: Book[] | null;
}

declare module "typeless/types" {
  interface DefaultState {
    books: BooksState;
  }
}
