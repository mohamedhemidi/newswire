import MoonIcon from "@Assets/icons/moon";
import SunIcon from "@Assets/icons/sun";
import { useAppDispatch, useAppSelector } from "@Utils/ReduxHooks";
import styles from "./styles.module.css";
import { toggleTheme } from "@Reducers/UIReducer";

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
