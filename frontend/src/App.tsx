import { BrowserRouter as Router } from "react-router-dom";
import RoutesList from "./routes";
import { useEffect, useRef } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import UserProfile from "modules/authentication/services/profile.services";
import { useAppDispatch } from "hooks/useAppDispatch";
import { checkAuth } from "modules/authentication/utils/authHelper";
import { THEME } from "constants/UI";

function App() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.UI);
  const auth = checkAuth();
  const shouldRun = useRef(true);

  useEffect(() => {
    const currentTheme = localStorage.getItem(THEME) as string;
    if (!currentTheme) localStorage.setItem(THEME, "light");
    document.querySelector("body")?.setAttribute("data-theme", currentTheme);
  }, [theme]);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      if (auth.loggedIn && auth.token) {
        dispatch(UserProfile(auth.token));
      }
    }
  }, [auth, dispatch]);
  return (
    <>
      <Router>
        <RoutesList />
      </Router>
    </>
  );
}

export default App;
