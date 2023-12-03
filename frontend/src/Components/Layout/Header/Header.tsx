import { Button } from "@mohamedhemidi/vault-ui";
import styles from "./styles.module.css";
import HomeIcon from "@Assets/icons/home";
import { ThemeToggle } from "@Components/UI/ThemeToggle";
import MenuIcon from "@Assets/icons/menu";
import { Search } from "@Components/Search";
import { useState } from "react";
import FilterIcon from "@Assets/icons/filter";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuStyle = `
   ${menuOpen ? styles["active"] : ""} 
  `;
  console.log(menuOpen);
  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <h1>NewsWire</h1>
      </div>
      <div className={styles.links}>
        <div>
          <Button
            id={styles.menuToggle}
            rounded
            icon={<MenuIcon />}
            variant="ghost"
            color="neutral"
            onClick={() => setMenuOpen(!menuOpen)}
          ></Button>
        </div>
        <div className={`${styles.navLinks} ${menuStyle}`}>
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
    </nav>
  );
};

export default Header;
