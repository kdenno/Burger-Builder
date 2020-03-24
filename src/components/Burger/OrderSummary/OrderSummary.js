import React, { Component } from "react";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // could be a functional component
  render() {
    const ingredientsArr = Object.keys(this.props.ingredients).map(item => {
      return (
        <li key={item}>
          <span style={{ textTransform: "capitalize" }}>{item}</span>:{" "}
          {this.props.ingredients[item]}
        </li>
      );
    });

    return (
      <div>
        <h2>Your Order</h2>
        <p>A delicious burger with the following ingredients</p>
        <ul>{ingredientsArr}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button type="Danger" clicked={() => this.props.buyerAction("cancel")}>
          Cancel
        </Button>
        <Button type="Success" clicked={() => this.props.buyerAction("buy")}>
          Buy Now
        </Button>
      </div>
    );
  }
}
export default OrderSummary;
