import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "hooks/useAppDispatch";
import { transformDataToSelect } from "../utils/DataHelper";
import GetCategories from "modules/news/services/categories.services";
import GetSources from "modules/news/services/sources.services";
import { useAppSelector } from "hooks/useAppSelector";

type Category = {
  [key: string]: string;
};
type Source = {
  [key: string]: string;
};

interface SettingsT {
  categories: Category[];
  sources: Source[];
}
const useGetFilters = () => {
  const dispatch = useAppDispatch();
  const { data: categories } = useAppSelector((state) => state.categories) as {
    data: {
      categories: Category[];
    };
  };
  const { data: sources } = useAppSelector((state) => state.sources) as {
    data: {
      sources: Source[];
    };
  };
  const [settings, setSettings] = useState<SettingsT>({
    categories: [],
    sources: [],
  });

  const shouldRun = useRef(true);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      dispatch(GetCategories());
      dispatch(GetSources());
    }
  }, [dispatch]);

  useEffect(() => {
    if (categories && sources) {
      setSettings((prev) => ({
        ...prev,
        categories: transformDataToSelect(categories.categories),
        sources: transformDataToSelect(sources.sources),
      }));
    }
  }, [categories, sources]);

  return settings;
};

export default useGetFilters;
