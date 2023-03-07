import * as React from "react";
import { navigate } from "@reach/router";

const Logout = ({ loginStorageKey }) => {
  React.useEffect(() => {
    localStorage.setItem(loginStorageKey, "");
    navigate("/login");
  }, [loginStorageKey]);

  return null;
};

export default Logout;
