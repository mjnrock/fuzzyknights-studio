import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import Animus from "./lib/animus/package";
Animus.Managers.Init();

console.log(Animus);

Animus.Managers.EventManager.GetInstance().AddEnums([
    [ "Tessellation", {
		UPDATE_ATTRIBUTE: "UPDATE_ATTRIBUTE"
	}],
    [ "FileSystem", {
		LOAD_FILE: "LOAD_FILE"
	}]
]);

//!	Make the SmartComponent.Enum() add the _enum in front, so that calls are modulated

Animus.Managers.EventManager.GetInstance().AddActions([
    [ Animus.Managers.EventManager.GetInstance().GetEnumValue("Tessellation", "UPDATE_ATTRIBUTE"), (type, key, value) => ({
        type,
        data: {
			key,
			value
		}
    }) ],
    [ Animus.Managers.EventManager.GetInstance().GetEnumValue("FileSystem", "LOAD_FILE"), (type, file, width, height) => ({
        type,
        data: {
			file,
			width,
			height
		}
    }) ]
]);
Animus.Managers.EventManager.GetInstance().AddReducers([
	[
		"Tessellation",
		(state = {}, message, [ enums, actions, gs ]) => {
			if(message.type === enums.Tessellation.UPDATE_ATTRIBUTE) {
				let th = +gs["Tessellation"]["tile-height"],
					tw = +gs["Tessellation"]["tile-width"],
					tx = +gs["Tessellation"]["tile-offset-x"],
					ty = +gs["Tessellation"]["tile-offset-y"],
					w = +gs["FileSystem"]["image-width"],
					h = +gs["FileSystem"]["image-height"]
					
				let canvas = document.getElementById("image-overview"),
					ctx = canvas.getContext("2d");
		
				let img = new Image();
		
				img.onload = () => {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(img, 0, 0);
			
					for(let i = 0; i < Math.ceil(w / tw); i++) {
						for(let j = 0; j < Math.ceil(h / th); j++) {
							ctx.strokeRect((i * tw) + tx, (j * th) + ty, tw, th);
						}
					}
				};
				img.src = gs["FileSystem"]["file"];

				return {
					...state,
					[ message.data.key ]: +message.data.value === 0 ? `${ message.data.value }` : +message.data.value
				};
			}

			return state;
		},
		{
			"image-height": 128,
			"image-width": 128,
			"tile-height": 128,
			"tile-width": 128,
			"tile-offset-x": "0",	// React is stupid and treats 0 as empty -> Making a string resolves this
			"tile-offset-y": "0"
		}
	],

	[
		"FileSystem",
		(state = {}, message, [ enums, actions ]) => {
			if(message.type === enums.FileSystem.LOAD_FILE) {
				return {
					...state,
					file: message.data.file,
					"image-width": +message.data.width,
					"image-height": +message.data.height
				};
			}

			return state;
		},
		{
			"file": null,
			"image-width": "0",
			"image-height": "0"
		}
	]
]);
// Animus.Managers.EventManager.GetInstance().Dispatch("test-1", 1231648948656165);
Animus.Managers.EventManager.GetInstance().AsyncDispatch();

ReactDOM.render(
    <App />,
    document.getElementById("root")
);