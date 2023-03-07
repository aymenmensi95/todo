import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/input/input";
import Button from "../../components/button";
import Footer from "../../components/footer/footer";

import "./styles.scss";

const Login = ({ loginStorageKey, loginStorageValue }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn =
      localStorage.getItem(loginStorageKey) === loginStorageValue;
    if (isLoggedIn) {
      navigate("/");
    }
  }, [loginStorageKey, loginStorageValue, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "test@test.com" && password === "test") {
      localStorage.setItem(loginStorageKey, loginStorageValue);
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={onSubmit}>
        <h1>Welcome To ToDo</h1>
        <Input
          name="email"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(value) => setEmail(value)}
          required
          autoFocus
        />
        <Input
          name="password"
          placeholder="Password"
          className="password-input"
          type="password"
          value={password}
          onChange={(value) => setPassword(value)}
          required
          autoFocus
        />
        <Button type="submit">Login</Button>
        <Footer />
      </form>
    </div>
  );
};

export default Login;
