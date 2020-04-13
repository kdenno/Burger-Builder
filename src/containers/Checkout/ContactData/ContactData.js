import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../../axios-orders";
import * as orderActions from "../../../store/actions/order";
import * as checks from "../../../shared/utility";

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
        valid: false,
        touched: false
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
        valid: false,
        touched: false
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
        valid: false,
        touched: false
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
        valid: false,
        touched: false
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
        valid: false,
        touched: false
      },
      deliverymethod: {
        elementtype: "select",
        elementconfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        validation:{
          required: false
        },
        valid: true,
        value: "cheapest",

      }
    },
    formIsValid: false
  };
  orderSubmitHandler = event => {
    event.preventDefault();

    this.props.onLoading();
    // transformd data and create something like {name: deno, country: uganda}
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredientes: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData
    };
    this.props.onOrderBurger(order, this.props.token);
  };
 
  onInputChangedHandler = (event, inputId) => {
    // let's try to get access to the input value and change it
    const updatedOrderForm = { ...this.state.orderForm }; // but remember this doenst do a deep clone
    // now that we got access to the top tier objects we need to clone again
    const updatedFormElement = { ...updatedOrderForm[inputId] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checks.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    let formValid = true;
    for(let eachkey in updatedOrderForm){
      formValid = updatedOrderForm[eachkey].valid && formValid;
    }
    updatedOrderForm[inputId] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm, formValid: formValid});
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
            isvalid={formElement.config.valid} 
            shouldvalidate={formElement.config.validation}
            touched = {formElement.config.touched}
            changed={event => this.onInputChangedHandler(event, formElement.id)}
          />
        ))}

        <Button type="Success" disabled={!this.state.formValid}>
          ORDER NOW
        </Button>
      </form>
    );
    if (this.props.loading) {
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
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
  }
}
const mapDispatchToProps = dispatch => {
  return {
  onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurgerStart(orderData, token)),
  onLoading: () => dispatch(orderActions.purchaseBurgerInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
