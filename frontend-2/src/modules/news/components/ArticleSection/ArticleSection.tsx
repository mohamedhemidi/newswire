import styles from "./styles.module.css";
import { NewsT } from "modules/news/types/News";
import ImagePlaceholder from "assets/images/no_image_placeholder.png";
import { Link } from "react-router-dom";
import { Button } from "lib/vault-ui";
import ArrowForwardIcon from "assets/icons/arrow_forward";
import { TransformToParagraphs } from "modules/news/utils/ArticleHelpers";

type Props = {
  data: NewsT;
};

const ArticleSection = ({ data }: Props) => {
  const { image_url, article_url, title, article } = data;

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <img src={image_url ? image_url : ImagePlaceholder} />
        <Link target="_blank" to={article_url ? article_url : "#"}>
          <Button color="primary" width={15} icon={<ArrowForwardIcon />}>
            Read in source website
          </Button>
        </Link>

        <h2>{title}</h2>

        {article &&
          TransformToParagraphs(article, 3).map((i) => {
            return (
              <p key={i} className={styles.text}>
                {i}
              </p>
            );
          })}
      </article>
    </div>
  );
};

export default ArticleSection;
