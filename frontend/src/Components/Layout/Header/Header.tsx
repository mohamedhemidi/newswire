import { Button } from "@mohamedhemidi/vault-ui";
import styles from "./styles.module.css";
import HomeIcon from "@Assets/icons/home";
import { ThemeToggle } from "@Components/UI/ThemeToggle";
import MenuIcon from "@Assets/icons/menu";
import { Search } from "@Components/Search";
import { useState } from "react";
import FilterIcon from "@Assets/icons/filter";
import CloseIcon from "@Assets/icons/close";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "@Assets/icons/login";
import SignupIcon from "@Assets/icons/signup";
import { checkAuth, logout } from "@Utils/Auth";
import SettingsIcon from "@Assets/icons/settings";
import LogoutIcon from "@Assets/icons/logout";
import NotificationIcon from "@Assets/icons/notification";
import { AdvancedSearch } from "@Components/AdvancedSearch";
import { openSearchModal } from "@Reducers/UIReducer";
import { useAppDispatch } from "@Utils/ReduxHooks";

const Header = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const authenticated = checkAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuStyle = `
   ${menuOpen ? styles["active"] : ""} 
  `;
  return (
    <header className={styles.container}>
      <AdvancedSearch/>
      <div className={styles.logo}>
        <h1>
          <Link to={"/"}>NewsWire</Link>
        </h1>
      </div>
      <div className={styles.links}>
        <div>
          <Button
            id={styles.menuOpen}
            rounded
            icon={<MenuIcon />}
            variant="ghost"
            color="neutral"
            onClick={toggleMenu}
          ></Button>
        </div>
        <div className={`${styles.navLinks} ${menuStyle}`}>
          <Button
            id={styles.menuClose}
            rounded
            icon={<CloseIcon />}
            variant="ghost"
            color="neutral"
            onClick={toggleMenu}
          ></Button>
          <Button
            icon={<HomeIcon />}
            variant="ghost"
            color="neutral"
            onClick={() => {
              return navigate("/");
            }}
          >
            Home
          </Button>
          {authenticated ? (
            <>
              <Button
                icon={<SettingsIcon />}
                variant="ghost"
                color="neutral"
                onClick={() => {
                  return navigate("/settings");
                }}
              >
                Settings
              </Button>
              <Button
                icon={<LogoutIcon />}
                variant="ghost"
                color="neutral"
                onClick={() => logout(() => navigate("/"))}
              >
                Logout
              </Button>
              <Button
                icon={<NotificationIcon />}
                variant="ghost"
                color="neutral"
                onClick={() => {}}
              >
                Notifications
              </Button>
            </>
          ) : (
            <>
              <Button
                icon={<LoginIcon />}
                variant="ghost"
                color="neutral"
                onClick={() => {
                  return navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                icon={<SignupIcon />}
                variant="ghost"
                color="neutral"
                onClick={() => {
                  return navigate("/signup");
                }}
              >
                Signup
              </Button>
            </>
          )}
          <Button
            icon={<FilterIcon />}
            onClick={() => dispatch(openSearchModal())}
            variant="ghost"
            color="neutral"
          >
            Advanced Search
          </Button>
        </div>
        <div>
          <Search />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
