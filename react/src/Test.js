import React, { Component } from "react";
import { connect } from "react-redux";

import Tessellation from "./dux/Tessellation";

class Test extends Component {
    componentDidMount() {
        this.props.GetT("cats", "doges");
    }

    render() {
        console.log(this.props.Tessellation);

        return (
            <div>Sup</div>
        );
    }
}

export default connect(
    (state) => ({
        Tessellation: state.Tessellation
    }),
    (dispatch) => ({
        GetT: (...args) => dispatch(Tessellation.action1(...args))
    })
)(Test);