import { Button, TextField } from "lib/vault-ui";
import styles from "./styles.module.css";
import { useState } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import LoginUser from "modules/authentication/services/login.services";
import { Form } from "common/container/Form";

const LoginSection = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<{
    data: {
      status: string;
      message: string;
    };
  } | null>(null);

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
    dispatch(LoginUser(loginData)).catch((err) => {
      setError(err);
    });
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <Form data-testid="login_form" onSubmit={handleLogin}>
        {error ? (
          <div className={styles.errorContainer}>
            <h2 data-testid="error_message" className={styles.errorMessage}>
              Error : {error.data.message}
            </h2>
          </div>
        ) : null}
        <TextField
          value={loginData.email}
          onChange={handleChange}
          name="email"
          label="Email"
          type="email"
          error={error ? true : false}
          data-testid="email_field"
        />
        <TextField
          value={loginData.password}
          onChange={handleChange}
          name="password"
          label="Password"
          type="password"
          data-testid="password_field"
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
