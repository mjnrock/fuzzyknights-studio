import React, { Component } from "react";
import { connect } from "react-redux";

import Dux from "./dux/package";

class FileSystem extends Component {
    render() {
        console.log(this.props.FileSystem);

        return (
            <div>
                <img src={ this.props.FileSystem.FileBase64 } />
                <input
                    id="load-image"
                    type="file"
                    onChange={(e) => {
                        let file = e.target.files[0],
                            reader = new FileReader();
                        
                        reader.onload = (e) => {
                            this.props.GetFileData(e.target.result);
                        }
                        reader.readAsDataURL(file);
                    }}
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        FileSystem: state.FileSystem
    }),
    (dispatch) => ({
        GetFileData: (...args) => dispatch(Dux.FileSystem.LoadFile(...args))
    })
)(FileSystem);