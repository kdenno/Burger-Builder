import React from "react";
// inform webpack where the image is stored
import burgerLogo from "../../assets/images/burger.png";

import styles from "./Logo.module.css";

const logo = props => (
  <div className={styles.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="BurgerLogo" />
  </div>
);
export default logo;
