import React from "react";
import styles from "./Toolbar.module.css";
import Logo from "../Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";
import DrawerToggle from "../Navigation/Sidedrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => (
  <header className={styles.Toolbar}>
    <DrawerToggle drawerToggleClicked={props.drawerToggleClicked}/>
    <Logo height="80%" />

    <nav className={styles.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth}/>
    </nav>
  </header>
);
export default Toolbar;
