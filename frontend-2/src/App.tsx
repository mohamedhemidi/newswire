import { BrowserRouter as Router } from "react-router-dom";
import RoutesList from "./routes";
import { useEffect, useRef } from "react";
import { useAppSelector } from "hooks/useAppSelector";
import UserProfile from "modules/authentication/services/profile.services";
import { useAppDispatch } from "hooks/useAppDispatch";
import { checkAuth } from "modules/authentication/utils/authHelper";

function App() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.UI);
  const auth = checkAuth();
  const shouldRun = useRef(true);
  useEffect(() => {
    document.querySelector("body")?.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      if (auth.loggedIn && auth.token) dispatch(UserProfile(auth.token));
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
