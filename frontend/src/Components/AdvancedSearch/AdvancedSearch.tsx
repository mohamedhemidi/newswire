import { Modal } from "components/UI/Modal";
import styles from "./styles.module.css";
import { closeSearchModal } from "reducers/UIReducer";
import { useAppDispatch, useAppSelector } from "utils/ReduxHooks";
import { MultiSelect } from "components/UI/Select";
import useGetFilters from "utils/useGetFilters";
import { useState } from "react";
import { setSearch } from "reducers/SearchReducer";
import { TextField } from "@mohamedhemidi/vault-ui";
import useTransformSelection from "utils/useTransformSelection";
import { useNavigate } from "react-router-dom";

const AdvancedSearch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const settings = useGetFilters();

  const { search_modal } = useAppSelector((state) => state.UI);

  const [keyword, setKeyword] = useState("");
  const [selectedSettings, setSelectedSettings] = useState({
    categories: [],
    sources: [],
  });

  const handleSelect = (e: unknown, key: string) => {
    setSelectedSettings((prev) => {
      return { ...prev, [key]: e };
    });
  };
  const data = useTransformSelection(selectedSettings);
  const submitSearch = () => {
    const query = {
      keyword,
      categories: data.categories,
      sources: data.sources,
    };
    dispatch(setSearch(query));
    dispatch(closeSearchModal());
    navigate('/')
    
  };

  return (
    <div className={styles.container}>
      <Modal
        open={search_modal}
        onSubmit={submitSearch}
        onClose={() => dispatch(closeSearchModal())}
      >
        <TextField
          label="Search term"
          name="search"
          onChange={(e) => setKeyword(e.target.value)}
        />

        <label className={styles.settingsFormLabel}>
          Choose sources (multiple) :
        </label>
        {settings.categories.length && (
          <MultiSelect
            multiple
            options={settings.categories}
            value={selectedSettings.categories}
            onChange={(e) => handleSelect(e, "categories")}
          />
        )}
        <label className={styles.settingsFormLabel}>
          Choose sources (multiple) :
        </label>
        {settings.sources.length && (
          <MultiSelect
            multiple
            options={settings.sources}
            value={selectedSettings.sources}
            onChange={(e) => handleSelect(e, "sources")}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdvancedSearch;
