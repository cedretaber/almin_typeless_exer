import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import * as Almin from "./almin/component/Index";
import { alminIndexUrl, rootUrl } from "./Consts";

const Home = () => {
  return (
    <>
      <h1>Almin - Typeless 比較</h1>
      <div>
        <Link to={alminIndexUrl}>Almin</Link>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path={rootUrl} component={Home} />
        <Route path={alminIndexUrl} component={Almin.Index} />
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
