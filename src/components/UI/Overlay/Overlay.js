import React, { Component } from "react";
import styles from "./Overlay.module.css";
import BackDrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

class Overlay extends Component {
  // only reload this component if show changes
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children; // .show is responsible for toggling the overlay but for spinner is toggled by some other property so we also check on whether there is an update on the overlay's children or else the spinner will fail to showup
  }
  render() {
    return (
      <Aux>
        <BackDrop
          show={this.props.show}
          backdropClicked={this.props.purchaseCancelled}
        />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Overlay;
