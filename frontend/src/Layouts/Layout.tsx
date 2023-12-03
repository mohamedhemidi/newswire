import styles from "./styles.module.css";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <main className={styles.main}>{children}</main>;
};

export default Layout;
