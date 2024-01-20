import { Button } from "lib/vault-ui";
import { AdvancedSearch } from "../AdvancedSearch";
import { SearchBox } from "../SearchBox";
import styles from "./styles.module.css";
import { FilterIcon } from "assets/icons";
import { useAppDispatch } from "hooks/useAppDispatch";
import { openModal } from "services/UI.services";

const SearchSection = () => {
  const dispatch = useAppDispatch();
  const openAdvancedSearch = () => {
    dispatch(openModal());
  };
  return (
    <>
      <AdvancedSearch />
      <div className={styles.container}>
        <Button
          icon={<FilterIcon />}
          variant="filled"
          color="primary"
          onClick={openAdvancedSearch}
        >
          Advanced Search
        </Button>
        <SearchBox />
      </div>
    </>
  );
};

export default SearchSection;
