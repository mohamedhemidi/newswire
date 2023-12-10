import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";


const Layout = () => {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
};

export default Layout;
