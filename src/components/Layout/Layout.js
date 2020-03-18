import React from "react";
import Aux from "../../hoc/Aux";
import styles from "./Layout.module.css";
 
const layout = props => (
  <Aux>
    <div className={styles.Content}>Toolbar, Sidedrawer, Backdrop</div>
    <main >{props.children}</main>
  </Aux>
);

export default layout;
