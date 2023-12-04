export const checkAuth = () => {
  return localStorage.getItem("token") ? true : false;
};

export const logout = (callback: () => void) => {
  localStorage.removeItem("token");
  callback();
};
