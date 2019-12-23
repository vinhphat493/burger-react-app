import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css'

const CheckoutSummary = props => (
  <div className={classes.CheckoutSummary}>
    <h1>We hope it tastes well !</h1>
    <div style={{ width: "100%", margin: "auto" }}>
      <Burger ingredients={props.ingredients} />
      <Button btnType="Danger" clicked={props.checkoutCancalled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        COUNTINUE
      </Button>
    </div>
  </div>
);

export default CheckoutSummary;