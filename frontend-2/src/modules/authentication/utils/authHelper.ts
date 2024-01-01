export const checkAuth = () => {
  return localStorage.getItem("auth_token") ? true : false;
};

export const logout = (callback: () => void) => {
  localStorage.removeItem("auth_token");
  callback();
};
