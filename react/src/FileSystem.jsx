import React, { Component } from "react";
import { connect } from "react-redux";

import Dux from "./dux/package";

class FileSystem extends Component {
    onInputChange(_this, e) {
        let file = e.target.files[0],
            reader = new FileReader();
        
        reader.onload = (e) => {
            let img = new Image(),
                height, width;

            img.onload = async () => {
                height = await img.height;
                width = await img.width;

                let canvas = document.getElementById("image-overview"),
                    ctx = canvas.getContext("2d");

                ctx.drawImage(img, 0, 0);

                _this.props.SetAttribute([
                    [ "image-data", ctx.getImageData(0, 0, width, height).data ],
                    [ "image-width", width ],
                    [ "image-height", height ]
                ]);
            };
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div>
                <button onClick={ () => console.log(this.props.FileSystem) }>(File System) State</button>

                <canvas
                    id="image-overview"
                    height="500"
                    width="500"
                />
                <input
                    id="load-image"
                    type="file"
                    accept="image/*"
                    onChange={ (e) => this.onInputChange(this, e) }
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
        SetAttribute: (...args) => dispatch(Dux.FileSystem.UpdateAttribute(...args))
    })
)(FileSystem);