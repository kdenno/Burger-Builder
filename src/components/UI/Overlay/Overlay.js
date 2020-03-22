import React from "react";
import styles from "./Overlay.module.css";
import BackDrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const overlay = props => {
  return (
      <Aux>
      <BackDrop show={props.show} backdropClicked={props.purchaseCancelled}/>
    <div
      className={styles.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
    </Aux>
  );
};
export default overlay;
