import React from "react";
import { withRouter } from 'react-router-dom';
import classes from "./Burger.css";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = props => {
  console.log(props)
  const { ingredients } = props;

  const transferIngredient = Object.keys(ingredients).map(keyIn =>
    [...Array(ingredients[keyIn])].map((_, i) => {
      return <BurgerIngredient type={keyIn} key={keyIn + i} />;
    })
  ).reduce((arr,el)=>arr.concat(el),[]);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transferIngredient.length
        ? transferIngredient
        : "Please insert ingredient...."}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
