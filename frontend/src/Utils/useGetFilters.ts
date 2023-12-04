import { fetchCategories, fetchSources } from "@Services/settings.services";
import { useEffect, useState } from "react";
import { transformDataToSelect } from "./DataHelper";
import { useAppDispatch } from "./ReduxHooks";

interface Category {
  [key: string]: string;
}
interface Source {
  [key: string]: string;
}

interface SettingsT {
  categories: Category[];
  sources: Source[];
}
const useGetFilters = () => {
  const dispatch = useAppDispatch();
  const [settings, setSettings] = useState<SettingsT>({
    categories: [],
    sources: [],
  });

  useEffect(() => {
    dispatch(fetchCategories()).then((res) => {
      const data = transformDataToSelect(res.payload.categories);
      setSettings((prev) => ({
        ...prev,
        categories: data,
      }));
    });
    dispatch(fetchSources()).then((res) => {
      const data = transformDataToSelect(res.payload.sources);
      setSettings((prev) => ({
        ...prev,
        sources: data,
      }));
    });
  }, [dispatch]);

  return settings;
};

export default useGetFilters;
