import * as React from "react";

import { Routes, Route } from "react-router-dom";

import Login from "../login";
import Logout from "../logout";
import Home from "../home";

import "./styles.scss";

const LOGIN_STORAGE_KEY = "login-todo";
const LOGIN_STORAGE_VALUE = "logged";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/todo/login"
          element={
            <Login
              loginStorageKey={LOGIN_STORAGE_KEY}
              loginStorageValue={LOGIN_STORAGE_VALUE}
            />
          }
        />
        <Route
          path="/todo/logout"
          element={<Logout loginStorageKey={LOGIN_STORAGE_KEY} />}
        />
        <Route
          exact
          path="/todo"
          element={
            <Home
              loginStorageKey={LOGIN_STORAGE_KEY}
              loginStorageValue={LOGIN_STORAGE_VALUE}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
