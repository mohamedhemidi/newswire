import ShareIcon from "assets/icons/share";
import styles from "./styles.module.css";
import moment from "moment";
import ImagePlaceholder from "assets/images/no_image_placeholder.png";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "lib/vault-ui";
import { NewsT } from "modules/news/types/News";

const NewsCard = ({
  id,
  title,
  source,
  category,
  image_url,
  date_published,
}: NewsT) => {
  return (
    <article className={styles.cardContainer}>
      <LazyLoadImage
        borderRadius="2rem"
        alt={title}
        src={image_url ? image_url : ImagePlaceholder}
      />
      <div className={styles.cardInfo}>
        <div className={styles.cardCategorySrouce}>
          <span className={styles.cardCategory}>{category}</span>
          <span className={styles.cardSource}>{source}</span>
        </div>
        <span className={styles.cardActions}>
          <p>{moment(date_published).startOf("hour").fromNow()}</p>
          <ShareIcon />
        </span>
      </div>
      <div className={styles.cardTitle}>
        <Link to={`/article/${id}`}>
          <h3>{title}</h3>
        </Link>
      </div>
    </article>
  );
};
export default NewsCard;
