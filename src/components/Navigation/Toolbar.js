import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";

const Toolbar = () => (
  <header className={styles.Toolbar}>
    <div>Menu</div>
    <Logo />

    <nav>
     <NavigationItems/>
    </nav>
  </header>
);
export default Toolbar;
