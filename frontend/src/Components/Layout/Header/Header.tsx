import { Button } from "@mohamedhemidi/vault-ui";
import styles from "./styles.module.css";
import HomeIcon from "@Assets/icons/home";
import { ThemeToggle } from "@Components/UI/ThemeToggle";
import MenuIcon from "@Assets/icons/menu";
import { Search } from "@Components/Search";
import { useState } from "react";
import FilterIcon from "@Assets/icons/filter";
import CloseIcon from "@Assets/icons/close";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const menuStyle = `
   ${menuOpen ? styles["active"] : ""} 
  `;
  console.log(menuOpen);
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <h1>NewsWire</h1>
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
          <Button icon={<HomeIcon />} variant="ghost" color="neutral">
            Home
          </Button>
          <Button icon={<FilterIcon />} variant="ghost" color="neutral">
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
