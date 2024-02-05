import { Button, TextField } from "lib/vault-ui";
import styles from "./styles.module.css";
import { useState } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import LoginUser from "modules/authentication/services/login.services";
import { Form } from "common/container/Form";
import { useAppSelector } from "hooks/useAppSelector";

const LoginSection = () => {
  const dispatch = useAppDispatch();

  const { error } = useAppSelector((state) => state.login) as {
    error: {
      data: {
        status: string;
        message: string;
      };
    };
  };
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
      <Form onSubmit={handleLogin}>
        {error && error.data ? (
          <div className={styles.errorContainer}>
            <h2 className={styles.errorMessage}>{error.data.message}</h2>
          </div>
        ) : null}
        <TextField
          value={loginData.email}
          onChange={handleChange}
          name="email"
          label="Email"
          type="email"
          error={error ? true : false}
        />
        <TextField
          value={loginData.password}
          onChange={handleChange}
          name="password"
          label="Password"
          type="password"
          error={error ? true : false}
        />
        <Button color="primary" variant="filled" width={10}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginSection;
