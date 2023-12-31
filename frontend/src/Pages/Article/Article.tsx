import { useAppDispatch } from "utils/ReduxHooks";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { fetchArticle } from "services/news.services";
import { Loader } from "components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { NewsT } from "types/News";
import ImagePlaceholder from "assets/images/no_image_placeholder.png";
import { splitArticleIntoParagraphs } from "utils/ArticleHelper";
import { Button } from "@mohamedhemidi/vault-ui";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "assets/icons/arrow_forward";

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

            <Link
              target="_blank"
              to={article.article_url ? article.article_url : "#"}
            >
              <Button color="primary" width={15} icon={<ArrowForwardIcon />}>
                Read in source website{" "}
              </Button>
            </Link>

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
