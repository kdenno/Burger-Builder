import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Overlay from "../../components/UI/Overlay/Overlay";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.7,
  cheese: 0.3,
  meat: 0.2
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    isPurchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    axios
      .get("https://react-burger-35338.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }
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
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ isPurchasable: totalIngredientPrice > 0 });
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
      case "buy":
        this.setState({ loading: true });
        const order = {
          ingredientes: this.state.ingredients,
          price: this.state.totalPrice.toFixed(2),
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
            this.setState({ loading: false, purchasing: false });

            console.log(res);
          })
          .catch(err => {
            this.setState({ loading: false, purchasing: false });
            console.log(err);
          });
        break;

      default:
        return null;
    }
  };

  render() {
    let orderSummary = null;

    let burger = this.setState ? (
      <p>Ingredients cannot be fetched</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            price={this.state.totalPrice}
            purhasable={this.state.isPurchasable}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          buyerAction={this.buyerActionHandler}
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
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
export default withErrorHandler(BurgerBuilder, axios);
