import { Button, TextField } from "lib/vault-ui";
import styles from "./styles.module.css";
import { useState } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import LoginUser from "modules/authentication/services/login.services";
import { Form } from "common/container/Form";
import { useAppSelector } from "hooks/useAppSelector";
import axios from "axios";
import { getCookie } from "modules/authentication/utils/authHelper";

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

  const loginWithAxios = async () => {
    await axios
      .get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      })
      .then(() => {
        axios
          .post("http://localhost:8000/api/auth/login", loginData, {
            withCredentials: true,
            headers: {
              "X-XSRF-TOKEN": getCookie(),
            },
          })
          .then((res) => {
            console.log("login response ", res);
          })
          .catch((err) => {
            console.log("login error ", err);
          });
      })
      .catch((err) => {
        console.log("COOKIE AUTH ERROR", err);
      });
  };

  const loginWithFetchAPI = () => {
    fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
      redirect: "manual",
    })
      .then((res) => {
        console.log("session response 1 => ", res);
        fetch("http://localhost:8000/api/auth/login", {
          headers: {
            "X-XSRF-TOKEN": getCookie(),
          },
          redirect: "manual",
          method: "POST",
          credentials: "include",
          body: JSON.stringify(loginData),
        })
          .then((res) => {
            if (res.redirected) return fetch(res.url);
            console.log("login response => ", res);
            return res.json();
          })
          .then((data) => {
            console.log("FINAL DATA ", data);
          })
          .catch((error) => console.error("Error fetching data:", error));
      })
      .then((res) => {
        console.log("res2", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(LoginUser(loginData));
    // loginWithAxios()
    // loginWithFetchAPI();
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
