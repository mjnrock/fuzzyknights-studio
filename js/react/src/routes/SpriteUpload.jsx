import React, { Component } from "react";

import FileSystem from "./../components/FileSystem";
import Tessellation from "./../components/Tessellation";

class SpriteUpload extends Component {
    render() {
        return (
            <div className="container">
                <button className="button info outline" onClick={ () => console.log(this.state) }>State</button>

                <FileSystem />
                <br />
                <Tessellation />
            </div>
        );
    }
}

export default SpriteUpload;