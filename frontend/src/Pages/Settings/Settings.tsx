import { MultiSelect } from "@Components/UI/Select";
import styles from "./styles.module.css";
import { useState } from "react";


const Settings = () => {
  const [settings, setSettings] = useState({
    categories: [],
    sources: [],
  });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
  }
  return (
    <div className={styles.container}>
      <h2>Change news settings</h2>
      <form className={styles.settingsForm}>
        <label className={styles.settingsFormLabel}>
          Choose favorite categories:
        </label>
        <MultiSelect
          multiple
          options={[]}
          value={settings.categories}
          onChange={handleSelect}
        />
      </form>
    </div>
  );
};

export default Settings;
