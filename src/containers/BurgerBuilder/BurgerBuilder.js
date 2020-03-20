import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Overlay from "../../components/UI/Overlay/Overlay";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.3,
  meat: 0.2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    isPurchasable: false
  };
  addIngredientHandler = type => {
    const OldCount = this.state.ingredients[type];
    const updatedCount = OldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const OldPrice = this.state.totalPrice;
    const newPrice = OldPrice + priceAddition;
    // update state
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasable(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const OldCount = this.state.ingredients[type];
    if (OldCount <= 0) {
      return;
    }
    const updatedCount = OldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const OldPrice = this.state.totalPrice;
    const newPrice = OldPrice - priceDeduction;
    // update state
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchasable(updatedIngredients);
  };
  updatePurchasable(ingredients) {
    const totalIngredientPrice = Object.keys(ingredients)
      .map(key => {return ingredients[key]})
      .reduce((sum, el) => {
       return  sum + el;
      }, 0);
    this.setState({ isPurchasable: totalIngredientPrice > 0 });
  }

  render() {
    return (
      <Aux>
        <Overlay>
          <OrderSummary ingredients={this.state.ingredients}/>

        </Overlay>

        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          price={this.state.totalPrice}
          purhasable={this.state.isPurchasable}
        />
      </Aux>
    );
  }
}
export default BurgerBuilder;
