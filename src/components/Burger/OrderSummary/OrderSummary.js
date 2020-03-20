import React from "react";

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
      <p>Continue to Checkout?</p>
    </div>
  );
};
export default orderSummary;