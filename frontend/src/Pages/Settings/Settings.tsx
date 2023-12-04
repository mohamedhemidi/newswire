import { MultiSelect } from "@Components/UI/Select";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@Utils/ReduxHooks";
import {
  fetchCategories,
  fetchSources,
  updateSettings,
} from "@Services/settings.services";
import { transformDataToSelect } from "@Utils/DataHelper";
import { Button } from "@mohamedhemidi/vault-ui";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface Category {
  [key: string]: string;
}
interface Source {
  [key: string]: string;
}

interface Settings {
  categories: Category[];
  sources: Source[];
}

const Settings = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Settings>({
    categories: [],
    sources: [],
  });

  const [selectedSettings, setSelectedSettings] = useState({
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

  const handleSelect = (e: unknown, key: string) => {
    setSelectedSettings((prev) => {
      return { ...prev, [key]: e };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: { categories: string[]; sources: string[] } = {
      categories: [],
      sources: [],
    };
    selectedSettings.categories.forEach(
      (i: { label: string; value: string }) => {
        return data.categories.push(i.value);
      }
    );
    selectedSettings.sources.map((i: { label: string; value: string }) => {
      return data.sources.push(i.value);
    });

    dispatch(updateSettings({ data: data, credentials: token })).then((res) => {
      Swal.fire({
        title: "Welcome!",
        text: res.payload.data.message,
        icon: "success",
        confirmButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) {
          return navigate("/");
        }
      });
    });
  };

  return (
    <div className={styles.container}>
      <h2>Change news settings</h2>
      <form onSubmit={handleSubmit} className={styles.settingsForm}>
        <label className={styles.settingsFormLabel}>
          Choose favorite categories (multiple):
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
          Choose favorite sources (multiple) :
        </label>
        {settings.sources.length && (
          <MultiSelect
            multiple
            options={settings.sources}
            value={selectedSettings.sources}
            onChange={(e) => handleSelect(e, "sources")}
          />
        )}
        <Button variant="filled" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Settings;
