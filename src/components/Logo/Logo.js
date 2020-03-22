import React from "react";
// inform webpack where the image is stored
import burgerLogo from "../../assets/images/burger.png";

import styles from "./Logo.module.css";

const logo = props => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt="BurgerLogo" />
  </div>
);
export default logo;