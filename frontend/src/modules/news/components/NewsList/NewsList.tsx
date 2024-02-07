import { NewsT } from "modules/news/types/News";
import { NewsCard } from "../NewsCard";
import { Loader } from "common/components/Loader";

type Props = {
  news: NewsT[];
};

const NewsList = ({ news }: Props) => {
  return (
    <>
      {news ? (
        news.map((i) => {
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

export default NewsList;
