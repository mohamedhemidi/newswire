import { Button, TextField } from "@mohamedhemidi/vault-ui";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@Utils/ReduxHooks";
import { userLogin, userProfile } from "@Services/users.services";
import { checkAuth } from "@Utils/AuthHelper";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authenticated = checkAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userLogin(loginData)).then((res) => {
      dispatch(userProfile(res.payload.data.token));
      Swal.fire({
        title: "Welcome!",
        text: "Happy Reading!",
        icon: "success",
        confirmButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate("/");
        }
      });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (authenticated) {
      return navigate("/");
    }
  }, [authenticated, navigate]);

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

export default Login;
