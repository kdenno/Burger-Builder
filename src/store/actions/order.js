// Creat order action creators
import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

// export action creators

export const purchaseBurgerSuccess = (id, orderData) => {
  // pass the id got from the backend to the reducer so that we can add it in the orders array
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerInit = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_INIT,
  };
};

export const checkoutInit = () => {
  return {
    type: actionTypes.CHECKOUT_INIT
  };
}
// dealing with Async actions
export const purchaseBurgerStart = (orderData) => {
  return (dispatch) => {
    // trigger spinner
    dispatch(purchaseBurgerInit());
    axios
      .post("/orders.json", orderData)
      .then((res) => {
        // dispatch actions
        dispatch(purchaseBurgerSuccess(res.data.name, orderData));
      })
      .catch((err) => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};
