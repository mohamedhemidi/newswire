import { Loader } from "common/components/Loader";
import { useAppDispatch } from "hooks/useAppDispatch";
import { ArticleSection } from "modules/news/components/ArticleSection";
import ViewArticle from "modules/news/services/article.services";
import { NewsT } from "modules/news/types/News";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const Article = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [article, setArticle] = useState<NewsT | null>(null);

  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      if (id) {
        dispatch(ViewArticle(id)).then((res) => {
          if (res) {
            setArticle(res.data);
          }
        });
      }
    }
  }, [dispatch, id]);

  if (!article) {
    return <Loader />;
  }
  return (
    <main className="main-section">
      <ArticleSection data={article} />
    </main>
  );
};

export default Article;
