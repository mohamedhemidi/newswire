import { Button, TextField } from "lib/vault-ui";
import styles from "./styles.module.css";
import { useState } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import LoginUser from "modules/authentication/services/login.services";

const LoginSection = () => {
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(LoginUser(loginData));
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <TextField
          value={loginData.email}
          onChange={handleChange}
          name="email"
          label="Email"
          type="email"
        />
        <TextField
          value={loginData.password}
          onChange={handleChange}
          name="password"
          label="Password"
          type="password"
        />
        <Button color="primary" variant="filled" width={10}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginSection;
