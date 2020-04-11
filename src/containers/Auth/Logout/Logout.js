import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as Actions from "../../../store/actions/index";

class Logout extends Component {
    componentDidMount() {
        // trigger logout action
        this.props.onLogOut();

    }
    render() {
        return (<Redirect to="/" />)
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onLogOut: () => dispatch(Actions.logOut)
    }
}
export default connect(null, mapDispatchToProps)(Logout)