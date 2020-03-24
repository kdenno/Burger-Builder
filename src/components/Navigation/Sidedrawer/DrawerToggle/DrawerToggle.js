import React from "react";
import styles from "./DrawerToggle.module.css";

const drawerToggle = props => (
  <div onClick={props.drawerToggleClicked} className={styles.DrawerToggle}></div>
);
export default drawerToggle;
