import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "utils/ReduxHooks";
import Routes from "./Routes";
import { userProfile } from "services/users.services";

function App() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.UI);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(userProfile(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.querySelector("body")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
