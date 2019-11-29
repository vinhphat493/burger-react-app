import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const controls = [
  { lable: "Salad", type: "salad" },
  { lable: "Cheese", type: "cheese" },
  { lable: "Meat", type: "meat" },
  { lable: "Bacon", type: "bacon" }
];

const buildControls = props => (
  <Aux>
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.lable}
          label={ctrl.lable}
          added={() => props.addIngredients(ctrl.type)}
          removed={() => props.removeIngredients(ctrl.type)}
          isDisabeld={props.disabeldControls[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.purchasing}
      >
        Order Now
      </button>
    </div>
  </Aux>
);
 
export default buildControls;