import { MultiSelect, TextField } from "lib/vault-ui";
import { Modal } from "common/components/Modal";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { useEffect, useState } from "react";
import { closeModal } from "services/UI.services";
import styles from "./styles.module.css";
import { Loader } from "common/components/Loader";
import GetCategories from "modules/news/services/categories.services";
import GetSources from "modules/news/services/sources.services";
import { transformDataToSelect } from "modules/settings/utils/DataHelper";
import { search } from "modules/search/services/search.services";

type SelectOptionT = {
  [key: string]: string;
};

const AdvancedSearch = () => {
  const dispatch = useAppDispatch();
  const { modal_opened } = useAppSelector((state) => state.UI);

  const [categoriesList, setCategories] = useState<SelectOptionT[]>();
  const [sourcesList, setSources] = useState<SelectOptionT[]>();

  const { data: categories } = useAppSelector((state) => state.categories) as {
    data: {
      categories: SelectOptionT[];
    };
  };
  const { data: sources } = useAppSelector((state) => state.sources) as {
    data: {
      sources: SelectOptionT[];
    };
  };

  useEffect(() => {
    if (modal_opened) {
      dispatch(GetCategories());
      dispatch(GetSources());
    }
  }, [dispatch, modal_opened]);

  useEffect(() => {
    if (categories && sources) {
      setCategories(transformDataToSelect(categories.categories));
      setSources(transformDataToSelect(sources.sources));
    }
  }, [categories, sources]);

  const [searchQuery, setSearchQuery] = useState({
    keyword: "",
    categories: [],
    sources: [],
  });

  const handleSelect = (e: unknown, key: string) => {
    setSearchQuery((prev) => {
      return { ...prev, [key]: e };
    });
  };
  const handleKeyword = (e: string) => {
    setSearchQuery((prev) => {
      return { ...prev, keyword: e };
    });
  };

  const handleSubmit = () => {
    const data: { categories: string[]; sources: string[] } = {
      categories: [],
      sources: [],
    };
    searchQuery.categories.forEach((i: { label: string; value: string }) => {
      return data.categories.push(i.value);
    });
    searchQuery.sources.map((i: { label: string; value: string }) => {
      return data.sources.push(i.value);
    });

    dispatch(
      search({
        keyword: searchQuery.keyword,
        categories: data.categories,
        sources: data.sources,
      })
    );

    dispatch(closeModal());
  };
  if (!categories || !sources) {
    return <Loader />;
  }
  return (
    <Modal
      open={modal_opened}
      onClose={() => dispatch(closeModal())}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Search term"
        name="search"
        onChange={(e) => handleKeyword(e.target.value)}
      />
      <label className={styles.settingsFormLabel}>
        Choose sources (multiple) :
      </label>
      {categoriesList && categoriesList.length && (
        <MultiSelect
          multiple
          options={categoriesList}
          value={searchQuery.categories}
          onChange={(e) => handleSelect(e, "categories")}
        />
      )}
      <label className={styles.settingsFormLabel}>
        Choose sources (multiple) :
      </label>
      {sourcesList && sourcesList.length && (
        <MultiSelect
          multiple
          options={sourcesList}
          value={searchQuery.sources}
          onChange={(e) => handleSelect(e, "sources")}
        />
      )}
    </Modal>
  );
};

export default AdvancedSearch;
