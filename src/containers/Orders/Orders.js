import React, { Component } from "react";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    this.setState({ loading: true });
    const fetchedOrders = [];
    axios
      .get("/orders.json")
      .then(res => {
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ orders: fetchedOrders, loading: false });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <div>
          {this.state.orders.map(order => <Order  ingredients={order.ingredientes} price={order.price} key={order.id}/>)}
       
      </div>
    );
  }
}
export default withErrorHandler(Orders, axios);
