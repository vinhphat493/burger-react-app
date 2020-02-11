import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

import classes from "./SideDrawer.css";
import classNames from "classnames";

const SideDrawer = props => (
  <Aux>
    <Backdrop show={props.showSideDrawer} hide={props.closedHandler} />
    <div
      className={classNames(
        classes.SideDrawer,
        props.showSideDrawer ? classes.Open : classes.Close
      )}
    >
      <div className={classes.Logo}>
        <Logo />
      </div>
      <NavigationItems />
    </div>
  </Aux>
);

export default SideDrawer;
