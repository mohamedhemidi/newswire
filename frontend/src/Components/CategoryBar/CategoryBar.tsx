import styles from "./styles.module.css";
const CategoryBar = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Category</h2>
      <nav>
        <p>Politics</p>
        <p>National</p>
        <p>International</p>
        <p>Business</p>
        <p>News</p>
        <p>Finance</p>
        <p>Jobs</p>
      </nav>
    </div>
  );
};

export default CategoryBar;
