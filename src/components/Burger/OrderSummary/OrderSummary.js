import React from "react";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const ingredientsArr = Object.keys(props.ingredients).map(item => {
    return (
      <li key={item}>
        <span style={{ textTransform: "capitalize" }}>{item}</span>:{" "}
        {props.ingredients[item]}
      </li>
    );
  });

  return (
    <div>
      <h2>Your Order</h2>
      <p>A delicious burger with the following ingredients</p>
      <ul>{ingredientsArr}</ul>
  <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button type="Danger" clicked={() => props.buyerAction('cancel')}>Cancel</Button>
      <Button type="Success" clicked={() => props.buyerAction('buy')}>Buy Now</Button>
    </div>
  );
};
export default orderSummary;