import { useState } from "react";
import { SearchBar } from "../../core/searchBar";
import { useAppDispatch } from "hooks/useAppDispatch";
import actions from "redux/actions";
import useDebounce from "hooks/useDebounce";

const SearchBox = () => {
  const dispatch = useAppDispatch();

  const [keyword, setKeyword] = useState<string>("");

  const debouncedData = useDebounce(keyword);
  const onSearchSubmit = () => {
    dispatch({
      type: actions.UPDATE_SEARCH_QUERIES,
      payload: { keyword: debouncedData },
    });
  };
  return (
    <>
      <SearchBar
        placeholder="search..."
        onSubmit={onSearchSubmit}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </>
  );
};

export default SearchBox;
