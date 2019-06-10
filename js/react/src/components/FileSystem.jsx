import React, { Component } from "react";

import { getState, WatcherComponent } from "./../lib/FKS";

class FileSystem extends WatcherComponent {
    constructor() {
        super();
        setInterval(() => {
            this.setLocalState({
                fish: Date.now()
            });
        }, 250);
    }

    onFileUpload(e) {
        let file = e.target.files[0],
            reader = new FileReader();
        
        reader.onload = (e) => {
            let img = new Image();

            img.onload = () => {
                let height = img.height;
                let width = img.width;

                let canvas = document.getElementById("image-overview"),
                    ctx = canvas.getContext("2d");

                ctx.drawImage(img, 0, 0);

                // this.props.SetAttribute([
                //     [ "image-data", ctx.getImageData(0, 0, width, height).data ],
                //     [ "image-width", width ],
                //     [ "image-height", height ]
                // ]);
            };
            img.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div className="container">
                <button className="button info outline" onClick={ () => console.log(this.state) }>(File System) State</button>

                <p>{ this.getLocalState("fish") }</p>

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