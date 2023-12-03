import ShareIcon from "@Assets/icons/share";
import styles from "./styles.module.css";
import moment from "moment";
import { NewsT } from "src/Types/News";


const Card = ({
  title,
  source,
  category,
  image_url,
  date_published,
}: NewsT) => {
  return (
    <article className={styles.cardContainer}>
      <div className={styles.cardImage}>
        <img src={image_url} />
        <img src={""} />
      </div>
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
        <h3>{title}</h3>
      </div>
    </article>
  );
};

export default Card;
