import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "@Utils/ReduxHooks";
import { Header } from "@Components/Layout/Header";
import { Layout } from "./Layouts";
import Routes from "./Routes";

function App() {
  const { theme } = useAppSelector((state) => state.UI);

  useEffect(() => {
    document.querySelector("body")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Router>
        <Header />
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </>
  );
}

export default App;
