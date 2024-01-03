import React from "react";
import styles from "./styles.module.css";
const Footer = () => {
  return (
    <div className={styles.container}>
      <p>
        {import.meta.env.VITE_APP_NAME} | {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
