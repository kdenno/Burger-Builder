import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar";
import SideDrawer from "../Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };
  SideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  ToggleDrawer = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.ToggleDrawer} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.SideDrawerClosedHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
