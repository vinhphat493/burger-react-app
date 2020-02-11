import React, { Component } from "react";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import axios from "../../axios-order";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
      loading: false,
      error: false
    };

    this.addIngredientHandler = this.addIngredientHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
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
    // alert('Order Continued!!!!!!!!');
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    })
  };

  render() {
    const disabeldInfo = {
      ...this.state.ingredients
    };

    for (let keys in disabeldInfo) {
      disabeldInfo[keys] = disabeldInfo[keys] > 0;
    }

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelPurchasing={this.cancelPurchase}
          purchaseContinued={this.purchaseContinued}
          price={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          cancelPurchasing={this.cancelPurchase}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
