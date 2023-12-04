import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Card } from "@Components/Card";
import { CategoryBar } from "@Components/CategoryBar";
import { SectionHeader } from "@Components/SectionHeader";
import { fetchNews } from "@Services/index";
import { useAppDispatch, useAppSelector } from "@Utils/ReduxHooks";
import { Loader } from "@Components/Loader";
import { NewsT } from "src/Types/News";
import { ProfileCard } from "@Components/ProfileCard";
import { checkAuth } from "@Utils/Auth";
import { Button } from "@mohamedhemidi/vault-ui";

const Home = () => {
  const dispatch = useAppDispatch();

  const [data, setNewsData] = useState<NewsT[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [scrollLoading, setScrollLoading] = useState(false);

  const authenticated = checkAuth();

  const { loading } = useAppSelector((state) => state.news);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query = {
    keyword: "",
    sources: ["the-guardian", "new-york-times"],
    categories: ["news", "arts"],
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setScrollLoading(true);
        dispatch(fetchNews({ query: query, page: pageNumber })).then((res) => {
          // setNewsData((prev) => [...prev, ...res.payload.data]);
          setNewsData(res.payload.data);
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setScrollLoading(false);
      }
    };

    // if (pageNumber > 1) {
    //   fetchPosts();
    // }
    fetchPosts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const handleLoadMore = () => {
    setPageNumber((prevPage) => prevPage + 1);
  };

  console.log("############", data);

  return (
    <main className={styles.container}>
      <div className={styles.categoriesSection}>
        {authenticated ? <ProfileCard /> : null}
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
        {scrollLoading && <Loader />}
        <div className={styles.loadMoreButton}>
          <Button color="primary" variant="filled" onClick={handleLoadMore}>
            Load more news
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Home;
