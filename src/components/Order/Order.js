import React from "react";
import styles from "./Order.module.css";

const order = props => {
    const ingredients = [];
    for(let ingName in props.ingredients) {
        ingredients.push({name: ingName, amount: props.ingredients[ingName]});
    }
    const ingredMap = ingredients.map(ing => {
        return (<span className={styles.Ingreds}> {ing.name} ({ing.amount})</span>);
    });
  return (
    <div className={styles.Order}>
<p>Ingredients: {ingredMap}</p>
      <p>
        Price: <strong>{props.price}</strong>
      </p>
    </div>
  );
};
export default order;
