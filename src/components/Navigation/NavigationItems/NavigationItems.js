import React from "react";
import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navItems = props => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {!props.isAuth ? <NavigationItem link="/auth">Login</NavigationItem> : <NavigationItem link="/logout">Logout</NavigationItem>}

  </ul>
);
export default navItems;
