import * as React from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { initialize } from "typeless";
import { useBooksModule } from "./features/books/module";
import { useBookModule } from "./features/book/module";
import { BooksView } from "./features/books/components/BooksView";
import { BookView } from "./features/book/components/BookView";

const { TypelessProvider } = initialize();

export const RouteContext = React.createContext<RouteComponentProps>(null);

const BooksPageComponent = (routeProps: RouteComponentProps) => {
  return <BooksView />;
};

const BookPageComponent = (
  routeProps: RouteComponentProps<{ bookId: string }>
) => {
  const id = Number(routeProps.match.params.bookId);
  if (isNaN(id)) {
    return <BookView />;
  } else {
    return <BookView id={id} />;
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
    <RouteContext.Provider value={routeProps}>
      <TypelessProvider>
        <App routeProps={routeProps} />
      </TypelessProvider>
    </RouteContext.Provider>
  );
};
