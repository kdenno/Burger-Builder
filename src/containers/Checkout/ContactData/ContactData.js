import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    ingredients: {},
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };
  orderSubmitHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredientes: this.props.ingredients,
      price: this.props.price.toFixed(2),
      customer: {
        name: "KDenno",
        address: {
          street: "street 123",
          zipcode: "3245",
          country: "Uganda"
        },
        email: "test@test.com"
      },
      deliverymethod: "fastest"
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false});
        this.props.history.push('/');

      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  render() {
      let theform = (
        <form>
        <input type="text" name="name" placeholder="Enter your Name" />
        <input type="text" name="email" placeholder="Enter your Email" />
        <input type="text" name="street" placeholder="Enter Street Name" />
        <input type="text" name="postcode" placeholder="Enter Postal Code" />
        <Button type="Success" clicked={this.orderSubmitHandler}>
          ORDER NOW
        </Button>
      </form>
      );
      if(this.state.loading) {
          theform = <Spinner/>

      }
    return (
      <div className={styles.ContactData}>
        <h1>Enter Contact Details</h1>
        {theform}
      </div>
    );
  }
}
export default ContactData;
