import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import axios from "../../../axios-orders";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      street: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      zipcode: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "zip code"
        },
        value: ""
      },
      country: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementtype: "input",
        elementconfig: {
          type: "email",
          placeholder: "Email"
        },
        value: ""
      },
      deliverymethod: {
        elementtype: "select",
        elementconfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };
  orderSubmitHandler = event => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredientes: this.props.ingredients,
      price: this.props.price.toFixed(2)
    };
    axios
      .post("/orders.json", order)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  render() {
    let formArrayElements = [];
    for (let key in this.state.orderForm) {
      formArrayElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let theform = (
      <form>
        {formArrayElements.map(formElement => (
          <Input
            key={formElement.id}
            elementtype={formElement.config.elementtype}
            elementconfig={formElement.config.elementconfig}
            value={formElement.config.value}
          />
        ))}

        <Button type="Success" clicked={this.orderSubmitHandler}>
          {" "}
          ORDER NOW{" "}
        </Button>
      </form>
    );
    if (this.state.loading) {
      theform = <Spinner />;
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
