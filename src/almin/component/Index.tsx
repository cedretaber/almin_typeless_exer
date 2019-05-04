import { Context, Dispatcher, StoreGroup } from "almin";
import * as React from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import BooksStore from "../store/BooksStore";
import BookFormStore from "../store/BookFormStore";
import BooksPage from "./BooksPage";
import BookPage from "./BookPage";
import { RouteContext } from "./context/RouteContext";

const dispatcher = new Dispatcher();
const booksStore = new BooksStore();
const formStore = new BookFormStore();
const storeGroup = new StoreGroup({ booksStore, formStore });

export const booksContext = new Context({
  dispatcher,
  store: storeGroup,
  options: { strict: true }
});

const BooksPageComponent = () => {
  return <BooksPage booksContext={booksContext} />;
};

const BookPageComponent = (
  routePorps: RouteComponentProps<{ bookId: string }>
) => {
  const bookId = Number(routePorps.match.params.bookId);
  if (isNaN(bookId)) {
    return <BookPage booksContext={booksContext} />;
  } else {
    return <BookPage booksContext={booksContext} bookId={bookId} />;
  }
};

export const Index = (routeProps: RouteComponentProps) => {
  return (
    <RouteContext.Provider value={routeProps}>
      <Route
        exact
        path={`${routeProps.match.path}`}
        component={BooksPageComponent}
      />
      <Route
        path={`${routeProps.match.path}/:bookId`}
        component={BookPageComponent}
      />
    </RouteContext.Provider>
  );
};
