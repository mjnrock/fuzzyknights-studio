import React, { Component } from "react";
import { connect } from "react-redux";

import Dux from "./dux/package";

class Tessellation extends Component {
    constructor() {
        super();

        this.state = {
            Frames: []
        };
    }

    onChange(_this, e) {
        _this.props.SetAttribute(e.target.name, e.target.value);

        let canvas = document.getElementById("image-overview"),
            ctx = canvas.getContext("2d");

        let th = this.props.Tessellation["tile-height"] || 128,
            tw = this.props.Tessellation["tile-width"] || 128,
            tx = this.props.Tessellation["tile-offset-x"] || 0,
            ty = this.props.Tessellation["tile-offset-y"] || 0,
            w = this.props.FileSystem["image-width"] || 0,
            h = this.props.FileSystem["image-height"] || 0;
            
        let data = this.props.FileSystem["image-data"],
            imgd = ctx.createImageData(w, h);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgd.data.set(data);
        ctx.putImageData(imgd, 0, 0);

        let frameArray = [];
        for(let i = 0; i < Math.ceil(w / tw); i++) {
            for(let j = 0; j < Math.ceil(h / th); j++) {
                ctx.strokeRect((i * tw) + tx, (j * th) + ty, tw, th);

                frameArray.push({
                    x: i,
                    y: j,
                    tw,
                    th,
                    data: ctx.getImageData((i * tw) + tx, (j * th) + ty, tw, th)
                });
            }
        }

        this.setState({
            Frames: frameArray
        });
        // _this.props.SetAttribute("frames", frameArray);
    }

    render() {
        console.log(this.props.Tessellation["frames"] && this.props.Tessellation["frames"].length > 0);
        return (
            <div className="container">
                <button className="button info outline" onClick={ () => console.log(this.props.Tessellation) }>(Tessellation) State</button>

                <div className="container">
                    <div className="row mb-3">
                        <input className="cell mr-2" type="number" name="image-height" value={ this.props.FileSystem["image-height"] } readOnly data-role="input" data-prepend="H" />
                        <input className="cell" type="number" name="image-width" value={ this.props.FileSystem["image-width"] } readOnly data-role="input" data-prepend="W" />
                    </div>

                    <div className="row mb-3">
                        <input className="cell mr-2" type="number" defaultValue={ 128 } name="tile-height" onChange={ (e) => this.onChange(this, e) } data-role="input" data-prepend="H" />
                        <input className="cell mr-2" type="number" defaultValue={ 128 } name="tile-width" onChange={ (e) => this.onChange(this, e) } data-role="input" data-prepend="W" />
                        <input className="cell mr-2" type="number" defaultValue={ 0 } name="tile-offset-x" onChange={ (e) => this.onChange(this, e) } data-role="input" data-prepend="X" />
                        <input className="cell" type="number" defaultValue={ 0 } name="tile-offset-y" onChange={ (e) => this.onChange(this, e) } data-role="input" data-prepend="Y" />
                    </div>

                    <div className="d-flex flex-row flex-wrap" id="frame-container">
                        {/* {
                            this.props.Tessellation["frames"] && this.props.Tessellation["frames"].length > 0 ? this.props.Tessellation["frames"].map((e, i) => {
                                return (
                                    <FrameCanvas className="border bd-cyan mr-1" payload={ e } key={ i } />
                                )
                            }) : null
                        } */}
                        {
                            this.state.Frames.length > 0 ? this.state.Frames.map((e, i) => {
                                return (
                                    <FrameCanvas className="border bd-cyan mr-1" payload={ e } key={ i } />
                                )
                            }) : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export class FrameCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.ref = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.payload.data) {
            let ctx = this.ref.current.getContext("2d");

            this.ref.current.width = nextProps.payload.tw;
            this.ref.current.height = nextProps.payload.th;
            ctx.clearRect(0, 0, this.ref.current.width, this.ref.current.height);
            ctx.putImageData(nextProps.payload.data, 0, 0);
        }
    }

    render() {
        return (
            <canvas ref={ this.ref } { ...this.props } />
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