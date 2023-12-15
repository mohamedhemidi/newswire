import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import { Header } from "components/Layout/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
