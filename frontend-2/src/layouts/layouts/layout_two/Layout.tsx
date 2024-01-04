import React from "react";
import Header from "../../header";
import Footer from "../../footer";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../sidebar";
import styles from "./styles.module.css";

const Layout = () => {
  return (
    <main className={styles.wrapper}>
      <Sidebar />
      <section style={{width: '100%'}}>
        <Header />
        <Outlet />
        <Footer />
      </section>
    </main>
  );
};

export default Layout;
