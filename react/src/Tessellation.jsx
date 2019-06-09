import React, { Component } from "react";
import { connect } from "react-redux";

import Dux from "./dux/package";

class Tessellation extends Component {
    onChange(_this, e) {
        _this.props.SetAttribute(e.target.name, e.target.value);

        let canvas = document.getElementById("image-overview"),
            ctx = canvas.getContext("2d");
            
        let data = this.props.FileSystem["image-data"],
            imgd = ctx.createImageData(this.props.FileSystem["image-width"], this.props.FileSystem["image-height"]);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgd.data.set(data);
        ctx.putImageData(imgd, 0, 0);

        let th = this.props.Tessellation["tile-height"] || 128,
            tw = this.props.Tessellation["tile-width"] || 128,
            tx = this.props.Tessellation["tile-offset-x"] || 0,
            ty = this.props.Tessellation["tile-offset-y"] || 0;

        for(let i = 0; i < 5; i++) {
            for(let j = 0; j < 5; j++) {
                ctx.strokeRect((i * tw) + tx, (j * th) + ty, tw, th);
            }
        }
    }

    render() {
        return (
            <div>
                <button onClick={ () => console.log(this.props.Tessellation) }>(Tessellation) State</button>

                <div>
                    H: <input type="number" name="image-height" value={ this.props.FileSystem["image-height"] } readOnly />
                    W: <input type="number" name="image-width" value={ this.props.FileSystem["image-width"] } readOnly />
                </div>

                <div>
                    H: <input type="number" defaultValue={ 128 } name="tile-height" onChange={ (e) => this.onChange(this, e) } />
                    W: <input type="number" defaultValue={ 128 } name="tile-width" onChange={ (e) => this.onChange(this, e) } />
                    X: <input type="number" defaultValue={ 0 } name="tile-offset-x" onChange={ (e) => this.onChange(this, e) } />
                    Y: <input type="number" defaultValue={ 0 } name="tile-offset-y" onChange={ (e) => this.onChange(this, e) } />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        FileSystem: state.FileSystem,
        Tessellation: state.Tessellation
    }),
    (dispatch) => ({
        SetAttribute: (...args) => dispatch(Dux.Tessellation.UpdateAttribute(...args))
    })
)(Tessellation);