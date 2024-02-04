import React, { useEffect } from "react";
import { Button, TextField } from "lib/vault-ui";
import { useState } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import styles from "./styles.module.css";
import SignupUser from "modules/authentication/services/signup.services";
import { useAppSelector } from "hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { Form } from "common/container/Form";

const SignupSection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { success, error } = useAppSelector((state) => state.signup) as {
    success: boolean;
    error: {
      data: {
        status: string;
        message: string;
      };
    };
  };

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(SignupUser(userData));
  };

  useEffect(() => {
    if (success) {
      return navigate("/login");
    }
  }, [success, navigate]);

  return (
    <div className={styles.signupContainer}>
      <h2>Signup</h2>
      <Form onSubmit={handleSignup}>
      {error && error.data ? (
        <div className={styles.errorContainer}>
          <h2 className={styles.errorMessage}>{error.data.message}</h2>
        </div>
      ) : null}
        <TextField name="name" onChange={handleChange} label="Name" error={error ? true : false}/>
        <TextField name="email" onChange={handleChange} label="Email" error={error ? true : false}/>
        <TextField
          name="password"
          type="password"
          onChange={handleChange}
          label="Password"
          error={error ? true : false}
        />
        <TextField
          name="password_confirmation"
          onChange={handleChange}
          label="Confirm Password"
          type="password"
          error={error ? true : false}
        />
        <Button color="primary" variant="filled" width={10}>
          Signup
        </Button>
      </Form>
    </div>
  );
};

export default SignupSection;
