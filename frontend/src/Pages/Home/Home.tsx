import styles from "./styles.module.css";
import { Card } from "@Components/Card";
import { CategoryBar } from "@Components/CategoryBar";
import { SectionHeader } from "@Components/SectionHeader";

const Home = () => {
  return (
    <main className={styles.container}>
      <div className={styles.categoriesSection}>
        <CategoryBar />
      </div>
      <div className={styles.feedSection}>
        <SectionHeader title={"News feed"} />
        <Card />
      </div>
    </main>
  );
};

export default Home;
