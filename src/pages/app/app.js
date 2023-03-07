import * as React from "react";
import { navigate, Router } from "@reach/router";

import Login from "../login";
import Logout from "../logout";
import Home from "../home";

import "./styles.scss";

const LOGIN_STORAGE_KEY = "login-todo";
const LOGIN_STORAGE_VALUE = "logged";

const App = () => {
  React.useEffect(() => {
    const isLoggedIn =
      localStorage.getItem(LOGIN_STORAGE_KEY) === LOGIN_STORAGE_VALUE;
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <Login
          path="/login"
          loginStorageKey={LOGIN_STORAGE_KEY}
          loginStorageValue={LOGIN_STORAGE_VALUE}
        />
        <Logout path="/logout" loginStorageKey={LOGIN_STORAGE_KEY} />
        <Home path="/" />
      </Router>
    </div>
  );
};

export default App;
