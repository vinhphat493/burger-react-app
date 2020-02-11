import React from 'react';

import classes from './Button.css';
import classNames from "classnames";


const Button = props => (
  <button
    className={classNames(classes.Button, classes[props.btnType])}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);
 
export default Button;