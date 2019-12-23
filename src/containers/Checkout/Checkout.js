import React, { Component } from "react";
import { Route } from 'react-router-dom';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 0 
    };
  }

  componentWillMount() {
    const ingredients = {};
    const query = new URLSearchParams(this.props.location.search);
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ingredients: ingredients, totalPrice : price})
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace(this.props.match.url + '/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutContinued={this.checkoutContinueHandler}
          checkoutCancalled={this.checkoutCancelledHandler}
        />
        <Route path={this.props.match.path + '/contact-data'} component={() => 
          <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>
        }/>
      </div>
    );
  }
}

export default Checkout;
