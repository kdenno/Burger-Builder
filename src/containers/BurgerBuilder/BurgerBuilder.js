import React, { Component } from "react";
import {connect} from 'react-redux';

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Overlay from "../../components/UI/Overlay/Overlay";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as Actions from "../../store/actions/index";


class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };
  componentDidMount() {
    this.props.onInitIngredients();
   
  }
  updatePurchasable(ingredients) {
    const totalIngredientPrice = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return totalIngredientPrice > 0 ;
  }
  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };
  purchaseCancelledHandler = () => {
    this.setState({ purchasing: false });
  };
  buyerActionHandler = action => {
    switch (action) {
      case "cancel":
        this.purchaseCancelledHandler();
        break;
      case "checkout":
        this.props.onCheckoutInit();
        this.props.history.push("/checkout");
        break;

      default:
        return null;
    }
  };

  render() {
    let orderSummary = null;

    let burger = this.props.error ?<p>Ingredients cannot be fetched</p>: <Spinner />
 
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            price={this.props.price}
            purhasable={this.updatePurchasable(this.props.ings)}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          buyerAction={this.buyerActionHandler}
          ingredients={this.props.ings}
          price={this.props.price}
        />
      );
     
    }
    return (
      <Aux>
        <Overlay
          show={this.state.purchasing}
          purchaseCancelled={this.purchaseCancelledHandler}
        >
          {orderSummary}
        </Overlay>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.order.purchsed
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(Actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(Actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(Actions.initIngredients()),
    onCheckoutInit: () => dispatch(Actions.checkoutInit())
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
