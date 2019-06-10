import React, { Component } from "react";
import { connect } from "react-redux";

import FileSystem from "./../FileSystem";
import Tessellation from "./../Tessellation";

class SpriteUpload extends Component {
    render() {
        return (
            <div className="container">
                <button className="button info outline" onClick={ () => console.log(this.props) }>State</button>

                <FileSystem />
                <br />
                <Tessellation />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        FileSystem: state.FileSystem,
        Tessellation: state.Tessellation
    }),
    (dispatch) => ({})
)(SpriteUpload);