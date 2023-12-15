import { useState } from "react";

import { Button } from "@mohamedhemidi/vault-ui";
import styles from "./styles.module.css";
import MagnifierIcon from "assets/icons/magnifier";
import { useAppDispatch } from "utils/ReduxHooks";
import { setSearch } from "reducers/SearchReducer";

const Search = () => {
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState("");

  const query = {
    keyword: keyword,
    sources: "",
    categories: "",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearch(query))
  };

  return (
    <form onSubmit={handleSearch} className={styles.container}>
      <Button
        rounded
        icon={<MagnifierIcon />}
        variant="ghost"
        color="neutral"
      ></Button>
      <input
        onChange={handleChange}
        className={styles.searchBar}
        placeholder="search..."
        type="text"
      />
    </form>
  );
};

export default Search;