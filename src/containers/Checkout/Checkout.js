import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 2,
      bacon: 1,
      cheese: 0
    }
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const newingredients = {};
    for (let param of query.entries()) {
      // ['salad', 1]
      newingredients[param[0]] = param[1];
    }
   this.setState({ingredients: newingredients});
  }
  CheckoutCancelledHandler = () => {
    // since this component was loaded by router, we have access to props.history
    this.props.history.goBack();
  };
  CheckoutContinuedHander = () => {
    this.props.history.replace("/checkout/checkout-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          CheckoutCancelled={this.CheckoutCancelledHandler}
          CheckoutContinued={this.CheckoutContinuedHander}
        />
      </div>
    );
  }
}
export default Checkout;
