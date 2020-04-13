import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {


  CheckoutCancelledHandler = () => {
    // since this component was loaded by router, we have access to props.history
    this.props.history.goBack();
  };
  CheckoutContinuedHander = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const finishedPurchase = this.props.purchased ? <Redirect to="/"/> : null
      summary = (
       
        <div>
           {finishedPurchase}
          <CheckoutSummary
            ingredients={this.props.ings}
            CheckoutCancelled={this.CheckoutCancelledHandler}
            CheckoutContinued={this.CheckoutContinuedHander}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};


export default connect(mapStateToProps)(Checkout);
