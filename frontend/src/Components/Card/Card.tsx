import ShareIcon from "@Assets/icons/share";
import styles from "./styles.module.css";
const Card = () => {
  return (
    <article className={styles.cardContainer}>
      <div className={styles.cardImage}>
        <img
          src={
            "https://media.guim.co.uk/840cc4fd844acdef1a8b63ffcbfff40d57f60216/0_283_4985_2993/500.jpg"
          }
        />
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.cardCategory}>Politics</span>
        <span className={styles.cardActions}>
           <p>25m ago</p> 
          <ShareIcon />
        </span>
      </div>
      <div className={styles.cardTitle}>
        <h3>
          Russia-Ukraine war live: Kyiv accuses Russia of executing surrendering
          soldiers
        </h3>
      </div>
    </article>
  );
};

export default Card;
