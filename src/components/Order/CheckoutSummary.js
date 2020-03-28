import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Danger" clicked>
        Cancel
      </Button>
      <Button type="Success" clicked>
        Buy Now
      </Button>
    </div>
  );
};
export default checkoutSummary;
