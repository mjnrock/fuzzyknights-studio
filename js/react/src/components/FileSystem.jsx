import React from "react";

import SmartComponent from "./../lib/animus/SmartComponent";

class FileSystem extends SmartComponent {
    constructor() {
        super();
    }

    async onFileUpload(e) {
        let file = e.target.files[0],
            reader = new FileReader();
        
        reader.onload = async (e) => {
            let img = new Image();

            img.onload = async () => {
                let height = img.height;
                let width = img.width;

                let canvas = document.getElementById("image-overview"),
                    ctx = canvas.getContext("2d");

                ctx.drawImage(img, 0, 0);

                // this.addLocalState({
                //     "image-data": await (await ctx.getImageData(0, 0, width, height)).data
                // }, (state) => console.log(JSON.stringify(state)));
            };
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div className="container">
                <button className="button info outline" onClick={ () => console.log(this.Manager()) }>(File System) State</button>
                <button className="button alert" 
                    onClick={
                        () => this.AsyncDispatch("urlFetch", "http://localhost:3075/validate")
                    }>TEST BUTTON</button>
                <button className="button success" 
                    onClick={
                        () => console.log(this.State())
                    }>TEST BUTTON</button>

				<p>-------</p>
				<div>
					{ this.SafeState("") }
				</div>
				<p>-------</p>
				<div>
					{ this.SafeState("", { stringifyObjs: true }) }
				</div>
				<p>-------</p>
				<div>
					{ this.SafeState("api_child_test", {
						iterator: (s, state, key, value) => {
							return <p key={ key }>{ value }<strong> [ { key } ]</strong></p>;
						}
					}) }
				</div>
				<p>-------</p>

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