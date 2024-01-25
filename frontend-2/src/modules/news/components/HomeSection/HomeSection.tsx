import { useAppSelector } from "hooks/useAppSelector";
import { NewsT } from "types/News";
import { SearchSection } from "modules/search/components/container/SearchSection";
import styles from "./styles.module.css";
import { CategoryBar } from "modules/search/components/container/CategoryBar";
import { Button } from "lib/vault-ui";
import { useEffect, useRef, useState } from "react";
import { NewsList } from "../NewsList";
import { useAppDispatch } from "hooks/useAppDispatch";
import GetNews from "modules/news/services/news.services";
import { ErrorIcon } from "assets/icons";
import { SearchT } from "modules/search/types/search";

const HomeSection = () => {
  const dispatch = useAppDispatch();
  const [news, setNews] = useState<NewsT[]>([]);
  const [scrollLoading, setScrollLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);

  const shouldSearch = useRef(true);
  const prevQuery = useRef<SearchT | null>(null);

  const { query } = useAppSelector((state) => state.search) as {
    query: SearchT;
  };

  useEffect(() => {
    setNews([]);
  }, [query]);

  useEffect(() => {
    if (shouldSearch.current) {
      shouldSearch.current = false;
      setScrollLoading(true);
      const isQueryChange = query !== prevQuery.current;
      dispatch(GetNews(query, isQueryChange ? 1 : pageNumber)).then((res) => {
        shouldSearch.current = true;
        setScrollLoading(false);
        setNews((prev) => [...prev, ...res.data.data]);
      });
      prevQuery.current = query;
    }
  }, [query, dispatch, pageNumber]);

  const handleLoadMore = () => {
    setPageNumber((prevPage) => prevPage + 1);
    shouldSearch.current = true;
  };

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
          {news.length ? (
            <NewsList news={news} />
          ) : (
            <div className={styles.noNews}>
              <h2>No news for the choosen filters!</h2>
              <p>You might want to update your news feed settings</p>
              <ErrorIcon />
            </div>
          )}
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
