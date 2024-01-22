import { Loader } from "common/components/Loader";
import { useAppSelector } from "hooks/useAppSelector";
import { NewsT } from "types/News";
import { SearchSection } from "modules/search/components/container/SearchSection";
import styles from "./styles.module.css";
import { CategoryBar } from "modules/search/components/container/CategoryBar";
import { Button } from "lib/vault-ui";
import { useEffect, useRef, useState } from "react";
import { NewsList } from "../NewsList";
import { useAppDispatch } from "hooks/useAppDispatch";
import GetCategories from "modules/news/services/categories.services";
import GetNews from "modules/news/services/news.services";

const HomeSection = () => {
  const dispatch = useAppDispatch();
  const [news, setNews] = useState<NewsT[]>([]);
  const [scrollLoading, setScrollLoading] = useState(false);
  const shouldRun = useRef(true);
  const [pageNumber, setPageNumber] = useState(1);

  const { query } = useAppSelector((state) => state.search);

  useEffect(() => {
    setPageNumber(1);
    setNews([]);
  }, [query]);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      dispatch(GetCategories());
      setScrollLoading(true);
      dispatch(GetNews(query, pageNumber)).then((res) => {
        shouldRun.current = true;
        setScrollLoading(false);
        setNews((prev) => [...prev, ...res.data.data]);
      });
    }
  }, [ dispatch, pageNumber]);

  const handleLoadMore = () => {
    setPageNumber((prevPage) => prevPage + 1);
    shouldRun.current = true;
  };

  if (!news.length) {
    return <Loader />;
  }
  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebarSection}>
        <CategoryBar />
      </aside>
      <div className={styles.contentSection}>
        <div className={styles.searchSection}>
          <SearchSection />
        </div>
        <div className={styles.newsListSection}>
          <NewsList news={news} />
        </div>
        <Button
          color="primary"
          variant="filled"
          onClick={handleLoadMore}
          loading={scrollLoading}
        >
          Load more news
        </Button>
      </div>
    </div>
  );
};

export default HomeSection;
