import { useAppDispatch } from "@Utils/ReduxHooks";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { fetchArticle } from "@Services/news.services";
import { Loader } from "@Components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { NewsT } from "src/Types/News";
import ImagePlaceholder from "@Assets/images/no_image_placeholder.png";
import { splitArticleIntoParagraphs } from "@Utils/ArticleHelper";

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [article, setArticle] = useState<NewsT | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchArticle(id))
      .then((res) => {
        setArticle(res.payload.data[0]);
        setLoading(false);
      })
      .catch(() => {
        navigate("*");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {!loading && article ? (
        <div className={styles.container}>
          <article className={styles.article}>
            <img
              src={article.image_url ? article.image_url : ImagePlaceholder}
            />
            <h2>{article.title}</h2>

            {article.article &&
              splitArticleIntoParagraphs(article?.article, 3).map((i) => {
                return (
                  <p key={i} className={styles.text}>
                    {i}
                  </p>
                );
              })}
          </article>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Article;
