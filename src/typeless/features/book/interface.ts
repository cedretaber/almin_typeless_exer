import { createActions } from "typeless";
import Book from "../entities/Book";
import { History } from "history";

export const MODULE = "BOOK";

export const BookActions = createActions(MODULE, {
  fetchBook: (id: number) => ({ payload: { id } }),
  createBook: (title: string, author: string, history: History) => ({
    payload: { title, author, history }
  }),
  updateBook: (book: Book, history: History) => ({
    payload: { book, history }
  }),
  updateTitle: (title: string) => ({ payload: { title } }),
  updateAuthor: (author: string) => ({ payload: { author } })
});

export interface BookState {
  title: string;
  author: string;
}

declare module "typeless/types" {
  interface DefaultState {
    book: BookState;
  }
}
