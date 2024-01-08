import { useAppDispatch } from "hooks/useAppDispatch";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useGetFilters from "modules/settings/hooks/useGetFilters";
import { MultiSelect, Button } from "lib/vault-ui";
import UpdateSettings from "modules/settings/services/settings.services";

const SettingsSection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const settings = useGetFilters();

  const [selectedSettings, setSelectedSettings] = useState({
    categories: [],
    sources: [],
  });

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

    dispatch(UpdateSettings(data, () => navigate("/") ));
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

export default SettingsSection;
