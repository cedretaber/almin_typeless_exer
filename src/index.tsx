import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import * as Almin from "./almin/component/Index";
import * as Typeless from "./typeless/Index";
import { alminIndexUrl, rootUrl, typelessIndexUrl } from "./Consts";
require("./style.css");

const Home = () => {
  return (
    <>
      <h1>Almin - Typeless 比較</h1>
      <ul>
        <li>
          <Link to={alminIndexUrl}>Almin</Link>
        </li>
        <li>
          <Link to={typelessIndexUrl}>Typeless</Link>
        </li>
      </ul>
    </>
  );
};

const App = () => {
  return (
    <>
      <header />
      <div className="contaienr">
        <BrowserRouter>
          <div className="columns">
            <div className="column col-8 col-mx-auto">
              <Route exact path={rootUrl} component={Home} />
              <Route path={alminIndexUrl} component={Almin.Index} />
              <Route path={typelessIndexUrl} component={Typeless.Index} />
            </div>
          </div>
        </BrowserRouter>
      </div>
      <footer />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
