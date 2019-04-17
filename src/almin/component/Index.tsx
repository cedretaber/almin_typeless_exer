import { Context, Dispatcher, StoreGroup } from "almin";
import * as React from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import BooksStore from "../store/BooksStore";
import BookFormStore from "../store/BookFormStore";
import BooksPage from "./BooksPage";
import BookPage from "./BookPage";

const dispatcher = new Dispatcher();
const booksStore = new BooksStore();
const formStore = new BookFormStore();
const storeGroup = new StoreGroup({ booksStore, formStore });

export const booksContext = new Context({
  dispatcher,
  store: storeGroup,
  options: { strict: true }
});

const BooksPageComponent = (routeProps: RouteComponentProps) => {
  return <BooksPage booksContext={booksContext} routeProps={routeProps} />;
};

const BookPageComponent = (
  routePorps: RouteComponentProps<{ bookId: string }>
) => {
  const bookId = Number(routePorps.match.params.bookId);
  if (isNaN(bookId)) {
    return <BookPage booksContext={booksContext} routeProps={routePorps} />;
  } else {
    return (
      <BookPage
        booksContext={booksContext}
        routeProps={routePorps}
        bookId={bookId}
      />
    );
  }
};

export const Index = ({ match }: RouteComponentProps) => {
  return (
    <>
      <Route exact path={`${match.path}`} component={BooksPageComponent} />
      <Route path={`${match.path}/:bookId`} component={BookPageComponent} />
    </>
  );
};
