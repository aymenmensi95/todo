import * as React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ loginStorageKey }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.setItem(loginStorageKey, "");
    navigate("/todo/login");
  }, [loginStorageKey, navigate]);

  return null;
};

export default Logout;
