import React from "react";
import styles from "./styles.module.css";
import { MagnifierIcon } from "assets/icons";

type Props = {
  placeholder: string;
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ placeholder, onSubmit, onChange }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.searchTerm}
          placeholder={placeholder}
          onChange={onChange}
        />
        <button onClick={onSubmit} className={styles.searchButton}>
          <MagnifierIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
