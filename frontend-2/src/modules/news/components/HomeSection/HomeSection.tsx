import { Loader } from "common/components/Loader";
import { useAppSelector } from "hooks/useAppSelector";
import { NewsCard } from "../NewsCard";
import { NewsT } from "types/News";
import { SearchSection } from "modules/search/components/container/SearchSection";
import styles from "./styles.module.css";
import { CategoryBar } from "modules/search/components/container/CategoryBar";

const HomeSection = () => {
  const { data, loading } = useAppSelector((state) => state.news) as {
    loading: boolean;
    data: {
      data: NewsT[];
    };
  };
  if (loading) {
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
        <div className={styles.cardsSection}>
          {data ? (
            data.data.map((i) => {
              return (
                <NewsCard
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
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
