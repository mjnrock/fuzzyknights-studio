import React from "react";

import SmartComponent from "./../lib/animus/SmartComponent";

class FileSystem extends SmartComponent {
    constructor(props) {
        super(props);
    }

    onFileUpload(e) {
        let file = e.target.files[0],
            reader = new FileReader();
        
        reader.onload = (e) => {
            let img = new Image();

            img.onload = () => {
                let canvas = document.getElementById("image-overview"),
                    ctx = canvas.getContext("2d");

				ctx.drawImage(img, 0, 0);
				
				//? Canvas getImageData chokes too hard, save reference instead of array data
				this.State({
					image: img
				});
            };
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
	}

    render() {
        return (
            <div className="container">
                <button className="button info outline" onClick={ () => console.log(this.Manager()) }>this.Manager()</button>
                <button className="button alert" 
                    onClick={
                        () => this.AsyncDispatch("urlFetch", "http://localhost:3075/validate")
                    }>AsyncDispatch</button>
                <button className="button success" 
                    onClick={
                        () => console.log(this.State())
                    }>this.State</button>

				<p>----1---</p>
				<div>
					{ this.SafeState("") }
				</div>
				<p>----2---</p>
				<div>
					{ this.SafeState("", { stringifyObjs: true }) }
				</div>
				{/* <p>----3---</p>
				<div>
					{ this.SafeState("api_child_test", {
						iterator: (item, [ state, key, value ]) => {
							return <p key={ key }>{ value }<strong> [ { key } ]</strong></p>;
						}
					}) }
				</div>
				<p>----4---</p> */}

                <canvas
                    id="image-overview"
                    height="500"
                    width="500"
                />
                <input
                    id="load-image"
                    type="file"
                    accept="image/*"
                    data-role="file"
                    onChange={ this.onFileUpload.bind(this) }
                />
            </div>
        );
    }
}

export default FileSystem;