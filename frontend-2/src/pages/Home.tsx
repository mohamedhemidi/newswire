import { useAppDispatch } from "hooks/useAppDispatch";
import LoginUser from "modules/authentication/services/login.services";
import React, { useEffect } from "react";

const credentials = {
  email: "mohamed.hemidi@hotmail.com",
  password: "12345678",
};
const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(LoginUser(credentials));
  }, []);

  return <div>Home</div>;
};

export default Home;
