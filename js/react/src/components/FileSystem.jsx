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
				
				this.Dispatch(this.Enum("FileSystem", "LOAD_FILE"), e.target.result, img.width, img.height);
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
                        () => this.AsyncDispatch(this.Enum("Tessellation.UPDATE_ATTRIBUTE"), "http://localhost:3075/validate")
                    }>AsyncDispatch</button>
                <button className="button success" 
                    onClick={
                        () => console.log(this.State())
                    }>this.State</button>

                <canvas
                    id="image-overview"
                    height="500"
					width="500"
					style={{
						border: "1px solid #FF0000"
					}}
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