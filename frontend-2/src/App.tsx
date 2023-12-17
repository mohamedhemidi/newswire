import { BrowserRouter as Router } from "react-router-dom";
import RoutesList from "./routes";
import { useEffect } from "react";
import { useAppSelector } from "hooks/useAppSelector";

function App() {
  const { theme } = useAppSelector((state) => state.UI);

  useEffect(() => {
    document.querySelector("body")?.setAttribute("data-theme", theme);
  }, [theme]);

  // const token = localStorage.getItem("token");

  useEffect(() => {
    // dispatch(userProfile(token));
  }, []);
  return (
    <>
      <Router>
        <RoutesList />
      </Router>
    </>
  );
}

export default App;
