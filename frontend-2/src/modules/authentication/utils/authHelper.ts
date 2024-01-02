import { AUTH_TOKEN } from "constants/auth";

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

export const logout = (callback: () => void) => {
  localStorage.removeItem(AUTH_TOKEN);
  callback();
};
