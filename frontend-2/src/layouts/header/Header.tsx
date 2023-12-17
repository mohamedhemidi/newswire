import React, { useState } from "react";
import { Button } from "lib/vault-ui";
import styles from "./styles.module.css";
import {
  CloseIcon,
  FilterIcon,
  HomeIcon,
  LoginIcon,
  MenuIcon,
  SignupIcon,
} from "assets/icons";
import { ThemeToggle } from "common/components/ThemeToggle";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navStyles = `
   ${menuOpen ? styles["active"] : ""} 
  `;
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <h2>NewsWire</h2>
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
        <div className={styles.navlink}>
          <Button
            icon={<HomeIcon />}
            variant="ghost"
            color="neutral"
            onClick={() => {}}
          >
            Home
          </Button>
        </div>
        <div className={styles.navlink}>
        <Button
                icon={<LoginIcon />}
                variant="ghost"
                color="neutral"
                onClick={() => {}}
              >
                Login
              </Button>
        </div>
        <div className={styles.navlink}>
        <Button
                icon={<SignupIcon />}
                variant="ghost"
                color="neutral"
                onClick={() => {}}
              >
                Signup
              </Button>
        </div>
        <div className={styles.navlink}>
        <Button
            icon={<FilterIcon />}
            onClick={() => {}}
            variant="ghost"
            color="neutral"
          >
            Advanced Search
          </Button>
        </div>
      </nav>
      <div className={styles.toggleMenu}>
        <Button
          id={styles.menuOpen}
          rounded
          icon={<MenuIcon />}
          variant="ghost"
          color="neutral"
          onClick={toggleMenu}
        ></Button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
