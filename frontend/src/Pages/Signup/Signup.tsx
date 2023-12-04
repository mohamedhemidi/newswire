import { Button, TextField } from "@mohamedhemidi/vault-ui";
import styles from "./styles.module.css";
import { useAppDispatch } from "@Utils/ReduxHooks";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "@Utils/Auth";
import { useEffect, useState } from "react";
import { userSignup } from "@Services/users.services";
import Swal from "sweetalert2";

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authenticated = checkAuth();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userSignup(userData)).then(() => {
      Swal.fire({
        title: "Welcome!",
        text: "Proceed to Login",
        icon: "success",
        confirmButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate("/login");
        }
      });
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    if (authenticated) {
      return navigate("/login");
    }
  }, [authenticated, navigate]);
  return (
    <div className={styles.signupContainer}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className={styles.signupForm}>
        <TextField name="name" onChange={handleChange} label="Name" />
        <TextField name="email" onChange={handleChange} label="Email" />
        <TextField
          name="password"
          type="password"
          onChange={handleChange}
          label="Password"
        />
        <TextField
          name="password_confirmation"
          onChange={handleChange}
          label="Confirm Password"
          type="password"
        />
        <Button color="primary" variant="filled" width={10}>
          Signup
        </Button>
      </form>
    </div>
  );
};

export default Signup;
