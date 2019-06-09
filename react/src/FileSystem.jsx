import React, { Component } from "react";
import { connect } from "react-redux";

import Dux from "./dux/package";

class FileSystem extends Component {
    componentWillUpdate(nextProps) {
        if(nextProps.FileSystem && nextProps.FileSystem.FileBase64) {
            let canvas = document.getElementById("image-overview"),
                ctx = canvas.getContext("2d");

            let image = new Image();
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
            };
            image.src = nextProps.FileSystem.FileBase64;
        }
    }

    onChange(_this, e) {
        _this.props.SetAttribute(e.target.name, e.target.value);
        

        // TODO This is for turn Canvas into Array Data; put in the relevant place
        let canvas = document.getElementById("image-overview"),
            ctx = canvas.getContext("2d");
            
            //  Get ImageData from Canvas
        let data = ctx.getImageData(0, 0, canvas.width, canvas.height).data,
            //  Creates new ImageData object
            imgd = ctx.createImageData(canvas.width, canvas.height);

        //  Add array data to new ImageData
        imgd.data.set(data);
        //  Erase old canvas for testing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //  Put new ImageData into context
        ctx.putImageData(imgd, 0, 0);

        for(let i = 0; i < 5; i++) {
            for(let j = 0; j < 5; j++) {
                ctx.strokeRect(i * 100, j * 100, 100, 100);
            }
        }
    }

    render() {
        return (
            <div>
                <button onClick={ () => console.log(this.props.FileSystem) }>State</button>

                <canvas
                    id="image-overview"
                    height="500"
                    width="500"
                />
                <input
                    id="load-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        let file = e.target.files[0],
                            reader = new FileReader();
                        
                        reader.onload = (e) => {
                            this.props.SetFileBase64(e.target.result);
                        }
                        reader.readAsDataURL(file);
                    }}
                />

                <div>
                    H: <input type="number" defaultValue={ 0 } name="image-height" onChange={ (e) => this.onChange(this, e) } />
                    W: <input type="number" defaultValue={ 0 } name="image-width" onChange={ (e) => this.onChange(this, e) } />
                </div>

                <div>
                    H: <input type="number" defaultValue={ 128 } name="tile-height" onChange={ (e) => this.onChange(this, e) } />
                    W: <input type="number" defaultValue={ 128 } name="tile-width" onChange={ (e) => this.onChange(this, e) } />
                    X: <input type="number" defaultValue={ 0 } name="tile-origin-x" onChange={ (e) => this.onChange(this, e) } />
                    Y: <input type="number" defaultValue={ 0 } name="tile-origin-y" onChange={ (e) => this.onChange(this, e) } />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        FileSystem: state.FileSystem
    }),
    (dispatch) => ({
        SetFileBase64: (...args) => dispatch(Dux.FileSystem.LoadFile(...args)),
        SetAttribute: (...args) => dispatch(Dux.FileSystem.UpdateAttribute(...args))
    })
)(FileSystem);