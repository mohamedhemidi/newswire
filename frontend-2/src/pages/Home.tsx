import { useAppDispatch } from "hooks/useAppDispatch";
import loginUser from "modules/authentication/services/login.services";
import React, { useEffect } from "react";

const credentials = {
  email: "mohamed.hemidi@hotmail.com",
  password: "12345678",
};
const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loginUser(credentials));
  }, []);
  return <div>Home</div>;
};

export default Home;
