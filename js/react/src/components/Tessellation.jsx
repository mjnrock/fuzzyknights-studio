import React, { Component } from "react";

import SmartComponent from "./../lib/animus/SmartComponent";

class Tessellation extends SmartComponent {
    constructor(props) {
        super(props);
    }

    onChange(e) {
		this.Dispatch(this.Enum("Tessellation", "UPDATE_ATTRIBUTE"), e.target.name, e.target.value);
    }

    render() {
        return (
            <div className="container">
                <button className="button info outline" onClick={ () => console.log(this.state) }>(Tessellation) State</button>

                <div className="container">
                    <div className="row mb-3">
                        <input className="cell mr-2" type="number" name="image-height" value={ this.SafeState("FileSystem.image-height") || 0 } readOnly data-role="input" data-prepend="H" />
                        <input className="cell" type="number" name="image-width" value={ this.SafeState("FileSystem.image-width") || 0 } readOnly data-role="input" data-prepend="W" />
                    </div>

                    <div className="row mb-3">
                        <input className="cell mr-2" type="number" step={ 1 } value={ this.SafeState("Tessellation.tile-height") } name="tile-height" onChange={ (e) => this.onChange(e) } data-role="input" data-prepend="H" />
                        <input className="cell mr-2" type="number" step={ 1 } value={ this.SafeState("Tessellation.tile-width") } name="tile-width" onChange={ (e) => this.onChange(e) } data-role="input" data-prepend="W" />
                        <input className="cell mr-2" type="number" step={ 1 } value={ this.SafeState("Tessellation.tile-offset-x") } name="tile-offset-x" onChange={ (e) => this.onChange(e) } data-role="input" data-prepend="X" />
                        <input className="cell" type="number" step={ 1 } value={ this.SafeState("Tessellation.tile-offset-y") } name="tile-offset-y" onChange={ (e) => this.onChange(e) } data-role="input" data-prepend="X" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Tessellation;