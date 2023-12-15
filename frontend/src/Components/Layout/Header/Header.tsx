import { Button } from "@mohamedhemidi/vault-ui";
import styles from "./styles.module.css";
import HomeIcon from "assets/icons/home";
import { ThemeToggle } from "components/UI/ThemeToggle";
import MenuIcon from "assets/icons/menu";
import { Search } from "components/Search";
import { useState } from "react";
import FilterIcon from "assets/icons/filter";
import CloseIcon from "assets/icons/close";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "assets/icons/login";
import SignupIcon from "assets/icons/signup";
import { checkAuth, logout } from "utils/AuthHelper";
import SettingsIcon from "assets/icons/settings";
import LogoutIcon from "assets/icons/logout";
import AdvancedSearch from "components/AdvancedSearch";
import { openSearchModal } from "reducers/UIReducer";
import { useAppDispatch } from "utils/ReduxHooks";

const Header = () => {
  const dispatch = useAppDispatch();
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
      <AdvancedSearch />
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
                onClick={() =>
                  logout(() => {
                    navigate(0);
                  })
                }
              >
                Logout
              </Button>
              {/* <Button
                icon={<NotificationIcon />}
                variant="ghost"
                color="neutral"
                onClick={() => {}}
              >
                Notifications
              </Button> */}
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
