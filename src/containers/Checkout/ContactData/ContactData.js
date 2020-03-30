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
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      zipcode: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "zip code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      country: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementtype: "input",
        elementconfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false
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
    // transformd data and create something like {name: deno, country: uganda}
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredientes: this.props.ingredients,
      price: this.props.price.toFixed(2),
      orderData: formData
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
  checkInputValidity(value, rules) {
    isValid = true;
    if(rules.required) {
    isValid = value.trim() !== '' && isValid;
    }
    if(rules.minLength) {
      isValid = value.length >= rules.minLength  && isValid;

    }
    if(rules.maxLength) {
      // only change it if its previous value was true
      isValid = value.length <= rules.maxLength  && isValid;
    }
    return isValid;

  }
  onInputChangedHandler = (event, inputId) => {
    // let's try to get access to the input value and change it
    const updatedOrderForm = { ...this.state.orderForm }; // but remember this doenst do a deep clone
    // now that we got access to the top tier objects we need to clone again
    const updatedFormElement = { ...updatedOrderForm[inputId] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkInputValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedOrderForm[inputId] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm });
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
      <form onSubmit={this.orderSubmitHandler}>
        {formArrayElements.map(formElement => (
          <Input
            key={formElement.id}
            elementtype={formElement.config.elementtype}
            elementconfig={formElement.config.elementconfig}
            value={formElement.config.value}
            changed={event => this.onInputChangedHandler(event, formElement.id)}
          />
        ))}

        <Button type="Success">
          ORDER NOW
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
