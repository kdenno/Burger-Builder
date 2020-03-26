import React, { Component } from "react";
import Overlay from "../../components/UI/Overlay/Overlay";
import Aux from "../Aux";

// remember everything is react should be treated like a function so this function should show the component that triggered the error and show the error its self
const withErrorHandler = (WrappedComponent, axios) => {
  // the class is anonymous becasue i dont use it i just return it, its a class factory essentially
  return class extends Component {
    state = {
      error: null
    };
    // use componentWillMount because it triggers before the componentDidMount() for the child components is triggered or else the interceptors wont be available
    componentWillMount() {
      // clear errors on every new request
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      // prevent memory leak
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    errorConfrimedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Aux>
          <Overlay
            show={this.state.error}
            purchaseCancelled={this.errorConfrimedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Overlay>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;
