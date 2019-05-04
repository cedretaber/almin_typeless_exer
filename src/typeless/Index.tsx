import * as React from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { initialize } from "typeless";
import { useBooksModule } from "./features/books/module";
import { useBookModule } from "./features/book/module";
import { BooksView } from "./features/books/components/BooksView";
import { BookView } from "./features/book/components/BookView";

const { TypelessProvider } = initialize();

const BooksPageComponent = (routeProps: RouteComponentProps) => {
  return <BooksView routeProps={routeProps} />;
};

const BookPageComponent = (
  routeProps: RouteComponentProps<{ bookId: string }>
) => {
  const history = routeProps.history;
  const id = Number(routeProps.match.params.bookId);
  if (isNaN(id)) {
    return <BookView history={history} />;
  } else {
    return <BookView id={id} history={history} />;
  }
};

const App = (props: { routeProps: RouteComponentProps }) => {
  useBooksModule();
  useBookModule();
  const { match } = props.routeProps;

  return (
    <>
      <Route exact path={`${match.path}`} component={BooksPageComponent} />
      <Route path={`${match.path}/:bookId`} component={BookPageComponent} />
    </>
  );
};

export const Index = (routeProps: RouteComponentProps) => {
  return (
    <TypelessProvider>
      <App routeProps={routeProps} />
    </TypelessProvider>
  );
};
