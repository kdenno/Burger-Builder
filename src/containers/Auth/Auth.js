import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import {connect} from "react-redux";
import * as Actions from "../../store/actions/index";
 

class Auth extends Component {
  state = {
    authForm: {
      email: {
        elementtype: "input",
        elementconfig: {
          type: "text",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementtype: "input",
        elementconfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 7,
        },
        valid: false,
        touched: false,
      },
    },
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}
onInputChangedHandler=(event, controlName) => {
    const updatedForm = {
        ...this.state.authForm,
        [controlName]: {
            ...this.state.authForm[controlName],
            value: event.target.value,
            touched: true,
            valid:this.checkValidity(event.target.value, this.state.authForm[controlName].validation)
        }
    }
    this.setState({authForm: updatedForm});

}
onsubmitHandler = (event) => {
    // prevent page reload
    event.preventDefault();
    this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value);

}

  render() {
    let formArrayElements = [];
    for (let key in this.state.authForm) {
      formArrayElements.push({id: key, config: this.state.authForm[key]});
    }
    const form = formArrayElements.map(formElement => <Input 
        key={formElement.id}
        elementtype={formElement.config.elementtype}
        elementconfig={formElement.config.elementconfig}
        value={formElement.config.value}
        isvalid={formElement.config.valid} 
        shouldvalidate={formElement.config.validation}
        touched = {formElement.config.touched}
        changed={event => this.onInputChangedHandler(event, formElement.id)}/>);
    return (
      <div className={styles.Auth}>
        <form onSubmit={this.onsubmitHandler}>
            {form}
            <Button type="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(Actions.auth(email, password))

    }
}
export default connect(null, mapDispatchToProps)(Auth);
