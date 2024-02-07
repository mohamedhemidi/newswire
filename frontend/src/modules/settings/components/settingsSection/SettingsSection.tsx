import { useAppDispatch } from "hooks/useAppDispatch";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useGetFilters from "modules/settings/hooks/useGetFilters";
import { MultiSelect, Button } from "lib/vault-ui";
import UpdateSettings from "modules/settings/services/updateSettings.services";
import { useAppSelector } from "hooks/useAppSelector";
import { checkAuth } from "modules/authentication/utils/authHelper";
import getSettings from "modules/settings/services/getSettings.services";
import { transformSettingsToSelect } from "modules/settings/utils/DataHelper";
import { SettingsT } from "modules/search/types/settings";
import { SelectOption } from "types/Select";

type SelectedSettingsT = {
  categories: SelectOption[];
  sources: SelectOption[];
};

const SettingsSection = () => {
  const dispatch = useAppDispatch();
  const auth = checkAuth();

  const navigate = useNavigate();

  const settings = useGetFilters();
  const shouldRun = useRef(true);

  const { settings: UserSettings } = useAppSelector(
    (state) => state.settings
  ) as { settings: SettingsT };

  const [selectedSettings, setSelectedSettings] = useState<SelectedSettingsT>({
    categories: [],
    sources: [],
  });

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      if (auth.loggedIn && auth.token) {
        dispatch(getSettings());
      }
    }
  }, [auth, dispatch, UserSettings]);

  useEffect(() => {
    if (UserSettings) {
      setSelectedSettings({
        categories: transformSettingsToSelect(UserSettings.categories),
        sources: transformSettingsToSelect(UserSettings.sources),
      });
    }
  }, [UserSettings]);

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
    selectedSettings.categories.forEach((i: SelectOption) => {
      return data.categories.push(i.value);
    });
    selectedSettings.sources.map((i: SelectOption) => {
      return data.sources.push(i.value);
    });

    dispatch(UpdateSettings(data, () => navigate("/")));
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
