import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import * as Actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
 

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
    isSignUp: true
  };
  componentDidMount() {
    if(!this.props.building && this.props.authRedirectPath !== '/') {
      // user was not builidng, set route back to home page
      this.props.setReturnRoute('/');

    }

  }

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
    this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);

}
switchMode = () => {
    this.setState(prevState =>  { 
        return {isSignUp: !prevState.isSignUp} 
    });
}

  render() {
    let formArrayElements = [];
    for (let key in this.state.authForm) {
      formArrayElements.push({id: key, config: this.state.authForm[key]});
    }
    let form = formArrayElements.map(formElement => <Input 
        key={formElement.id}
        elementtype={formElement.config.elementtype}
        elementconfig={formElement.config.elementconfig}
        value={formElement.config.value}
        isvalid={formElement.config.valid} 
        shouldvalidate={formElement.config.validation}
        touched = {formElement.config.touched}
        changed={event => this.onInputChangedHandler(event, formElement.id)}/>);
        if(this.props.loading) {
            form = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error) {
        errorMessage = (<p>{this.props.error.message}</p>)

        }
        let routeAway = null;
        if(this.props.isAuthenticated) {
          
          routeAway = <Redirect to={this.props.authRedirectPath} />
        }
    return (
      <div className={styles.Auth}>
        {routeAway}
          {errorMessage}
        <form onSubmit={this.onsubmitHandler}>
            {form}
            <Button type="Success">SUBMIT</Button>
     </form>
      <Button type="Danger" clicked={this.switchMode}>SWITCH TO {this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}</Button>
       
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(Actions.auth(email, password, isSignUp)),
        setReturnRoute: (path) => dispatch(Actions.setAuthRedirectPath(path))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
