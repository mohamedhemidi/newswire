import { useEffect } from "react";
import "./App.css";
import { useAppSelector } from "@Utils/ReduxHooks";
import { Header } from "@Components/Layout/Header";
import { Layout } from "./Layouts";

function App() {
  const { theme } = useAppSelector((state) => state.UI);

  useEffect(() => {
    document.querySelector("body")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Header />
      <Layout>
        
      </Layout>
      <h1>NewsWire</h1>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
      
    </>
  );
}

export default App;
