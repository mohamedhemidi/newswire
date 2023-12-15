import MoonIcon from "assets/icons/moon";
import SunIcon from "assets/icons/sun";
import { useAppDispatch, useAppSelector } from "utils/ReduxHooks";
import styles from "./styles.module.css";
import { toggleTheme } from "reducers/UIReducer";

const ThemeToggle = () => {
  const dispatch = useAppDispatch();

  const { theme } = useAppSelector((state) => state.UI);
  const changeTheme = () => {
    dispatch(toggleTheme());
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
