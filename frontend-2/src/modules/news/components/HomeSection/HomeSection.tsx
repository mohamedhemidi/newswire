import { Loader } from "common/components/Loader";
import { useAppSelector } from "hooks/useAppSelector";
import { NewsCard } from "../NewsCard";
import { NewsT } from "types/News";

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
    <>
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
    </>
  );
};

export default HomeSection;
