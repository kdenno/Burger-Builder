import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import styles from "./Sidedrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const sideDrawer = props => {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} backdropClicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <Logo height="11%" />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};
export default sideDrawer;
