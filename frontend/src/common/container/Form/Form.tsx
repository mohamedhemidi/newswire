import React from "react";
import styles from "./styles.module.css";
type Props = {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ onSubmit, children }: Props) => {
  return (
    <form className={styles.formWrapper} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
