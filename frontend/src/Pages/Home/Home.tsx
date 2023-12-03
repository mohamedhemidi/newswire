import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Card } from "@Components/Card";
import { CategoryBar } from "@Components/CategoryBar";
import { SectionHeader } from "@Components/SectionHeader";
import { fetchNews } from "@Services/index";
import { useAppDispatch, useAppSelector } from "@Utils/ReduxHooks";
import { Loader } from "@Components/Loader";
import { NewsT } from "src/Types/News";

const Home = () => {
  const dispatch = useAppDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const [scrollLoading, setScrollLoading] = useState(true);
  const [data, setNewsData] = useState<NewsT[]>([]);

  const { loading } = useAppSelector((state) => state.news);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query = {
    keyword: "Spanish",
    sources: ["the-guardian"],
    categories: ["news"],
  };

  useEffect(() => {
    dispatch(fetchNews({ query: query, page: pageNumber })).then((res) => {
      setNewsData((prev) => [...prev, ...res.payload.data]);
      setScrollLoading(false);
    });
  }, [dispatch, pageNumber, query]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
      setPageNumber((prev) => prev + 1);
      setScrollLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.categoriesSection}>
        <CategoryBar />
      </div>
      <div className={styles.feedSection}>
        <SectionHeader title={"News feed"} />
        {data && data.length
          ? data.map((i) => {
              return (
                <Card
                  key={i.id}
                  title={i.title}
                  source={i.source}
                  category={i.category}
                  image_url={i.image_url}
                  date_published={i.date_published}
                />
              );
            })
          : loading && <Loader />}
        {scrollLoading ? <Loader /> : null}
      </div>
    </main>
  );
};

export default Home;
