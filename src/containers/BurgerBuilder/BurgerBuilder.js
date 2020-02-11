import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENTS_PRICE = {
  salad: 0.3,
  bacon: 1.5,
  meat: 2,
  cheese: 0.8
};
class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        cheese: 0,
        meat: 0,
        bacon: 0,
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false
    };

    this.addIngredientHandler = this.addIngredientHandler.bind(this);
  }

  updatePurchasableState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, ele) => {
        return sum + ele;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  //khi khong su dung arrow function thi phai bind cai this lai
  addIngredientHandler(type) {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updateIngredient = {
      ...this.state.ingredients
    };
    updateIngredient[type] = newCount;
    const oldPrice = this.state.totalPrice;
    const priceAddition = INGREDIENTS_PRICE[type];
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updateIngredient });
    this.updatePurchasableState(updateIngredient);
  }

  removeIngredientsHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1 < 0 ? 0 : oldCount - 1;
    const updateIngredient = {
      ...this.state.ingredients
    };
    updateIngredient[type] = newCount;
    const oldPrice = this.state.totalPrice;
    const priceAddition = INGREDIENTS_PRICE[type];
    const updatePrice = oldPrice - priceAddition;
    this.setState({ totalPrice: updatePrice, ingredients: updateIngredient });
    this.updatePurchasableState(updateIngredient);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchase = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinued = () => {
    alert('Order Continued!!!!!!!!');
  }

  render() {
    const disabeldInfo = {
      ...this.state.ingredients
    };

    for (let keys in disabeldInfo) {
      disabeldInfo[keys] = disabeldInfo[keys] > 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          cancelPurchasing={this.cancelPurchase}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            cancelPurchasing={this.cancelPurchase}
            purchaseContinued={this.purchaseContinued}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngredients={this.addIngredientHandler}
          removeIngredients={this.removeIngredientsHandler}
          disabeldControls={disabeldInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchasing={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
