import React, { Component } from "react";
import classes from "./ContactData.css";
import { withRouter } from 'react-router-dom';

import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-order";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: {
        street: "",
        postalCode: ""
      },
      loading: false
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "lac vinh phat",
        address: {
          street: "Test street 123",
          zipCode: "43486",
          country: "SG"
        },
        email: "test@test.com"
      },
      diliveryMethod: "fastest"
    };
    axios
      .post("/order.json", order)
      .then(response => {
          this.setState({ loading: false });
          this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

    render() {
        let form = (
          <div>
            <h4>Enter your Contact Data</h4>
            <form action="">
              <input
                className={classes.Input}
                type="text"
                name="name"
                placeholder="Your Name."
              />
              <input
                className={classes.Input}
                type="email"
                name="email"
                placeholder="Your Email."
              />
              <input
                className={classes.Input}
                type="text"
                name="street"
                placeholder="Your Street."
              />
              <input
                className={classes.Input}
                type="text"
                name="postal"
                placeholder="Postal Code."
              />
              <Button btnType="Success" clicked={this.orderHandler}>
                ORDER
              </Button>
            </form>
          </div>
        );
        if (this.state.loading) {
            form = <Spinner/>
        }
    return (
      <div className={classes.ContactData}>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
