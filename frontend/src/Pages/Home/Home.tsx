import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Card } from "components/Card";
import { CategoryBar } from "components/CategoryBar";
import { SectionHeader } from "components/SectionHeader";
import { fetchNews } from "services/index";
import { useAppDispatch, useAppSelector } from "utils/ReduxHooks";
import { Loader } from "components/Loader";
import { NewsT } from "types/News";
import { ProfileCard } from "components/ProfileCard";
import { checkAuth } from "utils/AuthHelper";
import { Button } from "@mohamedhemidi/vault-ui";

const Home = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");

  const [data, setNewsData] = useState<NewsT[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [scrollLoading, setScrollLoading] = useState(false);
  const authenticated = checkAuth();
  const { user } = useAppSelector((state) => state.users);

  const { loading } = useAppSelector((state) => state.news);
  const { keyword, sources, categories } = useAppSelector(
    (state) => state.search
  );

  const shouldLog = useRef(true);

  useEffect(() => {
    const query = {
      keyword,
      sources,
      categories,
    };
    const fetchPosts = () => {
      setScrollLoading(true);
      dispatch(
        fetchNews({ query: query, page: pageNumber, credentials: token })
      ).then((res) => {
        setNewsData((prev) => [...prev, ...res.payload.data]);
        setScrollLoading(false);
      });
    };

    if (shouldLog.current) {
      shouldLog.current = false;
      fetchPosts();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const handleLoadMore = () => {
    setPageNumber((prevPage) => prevPage + 1);
    shouldLog.current = true;
  };

  const onCategoryClick = (data: unknown) => {
    dispatch(
      fetchNews({
        query: {
          categories: [data],
        },
      })
    ).then((res) => {
      setNewsData(res.payload.data);
    });
  };

  return (
    <main className={styles.container}>
      <div className={styles.categoriesSection}>
        {authenticated && user ? <ProfileCard /> : null}
        <CategoryBar onCategoryClick={onCategoryClick} />
      </div>
      <div className={styles.feedSection}>
        <SectionHeader title={"News feed"} />
        {data && data.length
          ? data.map((i) => {
              return (
                <Card
                  key={i.id}
                  id={i.id}
                  title={i.title}
                  source={i.source}
                  category={i.category}
                  image_url={i.image_url}
                  date_published={i.date_published}
                />
              );
            })
          : loading && <Loader />}
        {data && !loading && !data.length && (
          <p>
            No news available, you may check your settings or choose other
            filters
          </p>
        )}

        <div className={styles.loadMoreButton}>
          {!loading ? (
            <Button
              color="primary"
              variant="filled"
              onClick={handleLoadMore}
              loading={scrollLoading}
            >
              Load more news
            </Button>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Home;
