import styles from "./styles.module.css";
import LogoIcon from "assets/brand/logo.png";
import links from "./links";
import { ThemeToggle } from "common/components/ThemeToggle";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { toggleSidebar } from "services/UI.services";
import { MenuIcon } from "assets/icons";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { sidebar_collapsed } = useAppSelector((state) => state.UI);
  const sidebarClasses = `${sidebar_collapsed ? styles.collapsed : ""}`;

  const toggleSideBar = () => {
    dispatch(toggleSidebar());
  };
  return (
    <aside className={`${styles.container} ${sidebarClasses}`}>
      <div className={`${styles.content} ${sidebarClasses}`}>
        <a
          href="#"
          className={`${styles.toggleSideBar} ${sidebarClasses}`}
          onClick={toggleSideBar}
        >
          <MenuIcon />
        </a>
        <div className={styles.sidebar_logo}>
          <img src={LogoIcon} />
          <h2>{sidebar_collapsed ? null : import.meta.env.VITE_APP_NAME}</h2>
        </div>
        <div className={styles.sidebar_list_item}>
          {links.map((l) => {
            return (
              <div key={l.title} className={styles.sidebar_list}>
                <div className={`${styles.sidebar_icon} ${sidebarClasses}`}>
                  {l.icon}
                </div>
                {sidebar_collapsed ? null : l.title}
              </div>
            );
          })}
        </div>
        <div className={styles.sidebar_bottom}>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
