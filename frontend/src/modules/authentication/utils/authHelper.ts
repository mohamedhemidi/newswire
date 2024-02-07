import { AUTH_TOKEN, AUTH_COOKIE } from "modules/authentication/constants/auth";
import handleCookie from "./handleCookie";

export const checkAuth = () => {
  if (localStorage.getItem(AUTH_TOKEN)) {
    return {
      loggedIn: true,
      token: localStorage.getItem(AUTH_TOKEN),
    };
  } else {
    return {
      loggedIn: false,
      token: "",
    };
  }
};

export const getCookie = () => {
  return handleCookie.get(AUTH_COOKIE);
};

export const logout = (callback: () => void) => {
  localStorage.removeItem(AUTH_TOKEN);
  handleCookie.remove(AUTH_COOKIE);
  callback();
};
