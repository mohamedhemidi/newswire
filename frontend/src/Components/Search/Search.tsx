import { Button } from "@mohamedhemidi/vault-ui";
import styles from "./styles.module.css";
import MagnifierIcon from "@Assets/icons/magnifier";
const Search = () => {
  return (
    <div className={styles.container}>
      <Button
        rounded
        icon={<MagnifierIcon />}
        variant="ghost"
        color="neutral"
      ></Button>
      <input className={styles.searchBar} placeholder="search..." type="text" />
    </div>
  );
};

export default Search;
