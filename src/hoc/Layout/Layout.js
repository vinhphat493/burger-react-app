import React, { Component } from "react";

import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    render() {
        return (
          <Aux>
            <SideDrawer
              showSideDrawer={this.state.showSideDrawer}
              closedHandler={this.sideDrawerClosedHandler}
            />
            <Toolbar toogleHandler={this.sideDrawerToggleHandler} />
            <main className={classes.Content}>{this.props.children}</main>
          </Aux>
        );
    }
}

export default Layout;
