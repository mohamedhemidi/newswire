import { Button, TextField } from "lib/vault-ui";
import styles from "./styles.module.css";
import { useState } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import LoginUser from "modules/authentication/services/login.services";
import { Form } from "common/container/Form";

const LoginSection = () => {
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    dispatch(LoginUser(loginData))
      .then((res) => {
        setSuccess(res.status);
      })
      .catch((err) => {
        setError(err.data.message);
      });
  };


  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <Form data-testid="login_form" onSubmit={handleLogin}>
        {success ? (
          <div data-testid="success">
            <h2>{success}</h2>
          </div>
        ) : null}
        {error ? (
          <div data-testid="error" className={styles.errorContainer}>
            <h2 className={styles.errorMessage}>Error : {error}</h2>
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
