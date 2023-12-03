import styles from "./styles.module.css";
import { Card } from "@Components/Card";
import { CategoryBar } from "@Components/CategoryBar";
import { SectionHeader } from "@Components/SectionHeader";
import { fetchNews } from "@Services/news.services";
import { useAppDispatch } from "@Utils/ReduxHooks";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useAppDispatch();

  const query = {
    keyword: "",
    sources: ["the-guardian", "new-york-times"],
    categories: ["news", "arts"],
  };
  useEffect(() => {
    dispatch(fetchNews(query));
  }, []);

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
