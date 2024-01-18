import { useState } from "react";
import { Button } from "lib/vault-ui";
import styles from "./styles.module.css";
import { CloseIcon, MenuIcon } from "assets/icons";
import { ThemeToggle } from "common/components/ThemeToggle";
import { useNavigate } from "react-router-dom";
import { NavLinks, constantLinks } from "./Links";
import { checkAuth, logout } from "modules/authentication/utils/authHelper";
import { SearchBox } from "modules/search/components/container/SearchBox";

const Header = () => {
  const navigate = useNavigate();
  const authenticated = checkAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const links = NavLinks.filter((link) => link.auth == authenticated.loggedIn);

  const handleOnClick = (action: string) => {
    switch (action) {
      case "logout":
        console.log(action);
        logout(() => {
          navigate(0);
        });
        break;
      case "notification":
        break;

      default:
        break;
    }
  };

  const navStyles = `
   ${menuOpen ? styles["active"] : ""}
  `;
  return (
    <header className={styles.container}>
      <div
        className={styles.logo}
        onClick={() => {
          return navigate("/");
        }}
      >
        <h2>{import.meta.env.VITE_APP_NAME}</h2>
      </div>
      <nav className={`${styles.content} ${navStyles}`}>
        <Button
          id={styles.menuClose}
          rounded
          icon={<CloseIcon />}
          variant="ghost"
          color="neutral"
          onClick={toggleMenu}
        ></Button>
        {links.map((li) => {
          return (
            <div key={li.title} className={styles.navlink}>
              <Button
                icon={li.icon}
                variant="ghost"
                color="neutral"
                onClick={() => {
                  if (li.path) {
                    return navigate(li.path);
                  } else {
                    return handleOnClick(li.action as string);
                  }
                }}
              >
                {li.title}
              </Button>
            </div>
          );
        })}
        {constantLinks.map((li) => {
          return (
            <div key={li.title} className={styles.navlink}>
              <Button
                icon={li.icon}
                variant="ghost"
                color="neutral"
                onClick={() => {
                  if (li.path) {
                    return navigate(li.path);
                  } else {
                    return handleOnClick(li.action as string);
                  }
                }}
              >
                {li.title}
              </Button>
            </div>
          );
        })}
        <ThemeToggle />
      </nav>
      <SearchBox />
      <div className={styles.toggleMenu}>
        <Button
          id={styles.menuOpen}
          rounded
          icon={<MenuIcon />}
          variant="ghost"
          color="neutral"
          onClick={toggleMenu}
        ></Button>
      </div>
    </header>
  );
};

export default Header;
