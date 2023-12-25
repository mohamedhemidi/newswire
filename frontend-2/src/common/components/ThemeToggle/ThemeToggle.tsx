import { SunIcon } from "assets/icons";
import styles from "./styles.module.css";
import { MoonIcon } from "assets/icons";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { toggleTheme } from "services/UI.services";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.UI);

  const changeTheme = () => {
    dispatch(toggleTheme())
  };

  return (
    <div className={styles.wrapper} onClick={changeTheme}>
      {theme === "dark" ? (
        <div className={styles.icon}>
          <SunIcon />
        </div>
      ) : (
        <div className={styles.icon}>
          <MoonIcon />
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
