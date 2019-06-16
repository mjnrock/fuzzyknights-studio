import React, { Component } from "react";

import SmartComponent from "./../lib/animus/SmartComponent";

class Tessellation extends SmartComponent {
    constructor(props) {
        super(props);
    }

    onChange(e) {
        // this.props.SetAttribute(e.target.name, e.target.value);

        let canvas = document.getElementById("image-overview"),
			ctx = canvas.getContext("2d"),
			element = e.target,
			value = e.target.value;

		this.Dispatch(this.Enum("Tessellation", "UPDATE_ATTRIBUTE"), e.target.name, e.target.value);

        // let th = this.props.Tessellation["tile-height"] || 128,
        //     tw = this.props.Tessellation["tile-width"] || 128,
        //     tx = this.props.Tessellation["tile-offset-x"] || 0,
        //     ty = this.props.Tessellation["tile-offset-y"] || 0,
        //     w = this.props.FileSystem["image-width"] || 0,
        //     h = this.props.FileSystem["image-height"] || 0;
            
        // let data = this.props.FileSystem["image-data"],
        //     imgd = ctx.createImageData(w, h);

        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // imgd.data.set(data);
        // ctx.putImageData(imgd, 0, 0);

        // for(let i = 0; i < Math.ceil(w / tw); i++) {
        //     for(let j = 0; j < Math.ceil(h / th); j++) {
        //         ctx.strokeRect((i * tw) + tx, (j * th) + ty, tw, th);
        //     }
        // }
    }

    render() {
        return (
            <div className="container">
                <button className="button info outline" onClick={ () => console.log(this.state) }>(Tessellation) State</button>

                <div className="container">
                    <div className="row mb-3">
                        <input className="cell mr-2" type="number" name="image-height" readOnly data-role="input" data-prepend="H" />
                        <input className="cell" type="number" name="image-width" readOnly data-role="input" data-prepend="W" />
                    </div>

                    <div className="row mb-3">
                        <input className="cell mr-2" type="number" value={ this.SafeState("Tessellation.tile-height") } name="tile-height" onChange={ (e) => this.onChange(e) } data-role="input" data-prepend="H" />
                        <input className="cell mr-2" type="number" value={ this.SafeState("Tessellation.tile-width") } name="tile-width" onChange={ (e) => this.onChange(e) } data-role="input" data-prepend="W" />
                        <input className="cell mr-2" type="number" value={ this.SafeState("Tessellation.tile-offset-x") } name="tile-offset-x" onChange={ (e) => this.onChange(e) } data-role="input" data-prepend="X" />
                        <input className="cell" type="number" value={ this.SafeState("Tessellation.tile-offset-y") } name="tile-offset-y" onChange={ (e) => this.onChange(e) } data-role="input" data-prepend="X" />
						
                        {/* <input className="cell mr-2" type="number" value={ this.SafeState("Tessellation.tile-offset-x") } name="tile-offset-x" onChange={ (e) => this.onChange(e) } data-role="input" data-prepend="X" />
                        <input className="cell" type="number" value={ this.SafeState("Tessellation.tile-offset-y") } name="tile-offset-y" onChange={ (e) => this.onChange(e) } data-role="input" data-prepend="Y" /> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Tessellation;