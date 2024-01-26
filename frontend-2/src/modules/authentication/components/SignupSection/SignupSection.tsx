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
  const { success } = useAppSelector((state) => state.signup) as {
    success: boolean;
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
    console.log("Signing up with ", userData);
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
      </Form>
    </div>
  );
};

export default SignupSection;
