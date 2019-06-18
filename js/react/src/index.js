import React from "react";
import ReactDOM from "react-dom";
import uuidv4 from "uuid/v4";

import App from "./App";

import Animus from "./lib/animus/package";
Animus.Managers.Init({
	wsURL: `ws://localhost:3075/ws`
});

const EVENT_MANAGER = Animus.Managers.EventManager.GetInstance();

EVENT_MANAGER.AddEnums([
	[ "NoteType", {
		SIXTY_FOURTH: 1 / 64,
		THIRTY_SECOND: 1 / 32,
		SIXTEENTH: 1 / 16,
		EIGHTH: 1 / 8,
		QUARTER: 1 / 4,
		HALF: 1 / 2,
		WHOLE: 1
	}],
	[ "Sequence", {
		ADD_TRACK: "ADD_TRACK",
		REMOVE_TRACK: "REMOVE_TRACK",
		ADD_NOTE: "ADD_NOTE",
		REMOVE_NOTE: "REMOVE_NOTE"
	}],

    [ "Tessellation", {
		UPDATE_ATTRIBUTE: "UPDATE_ATTRIBUTE"
	}],
    [ "FileSystem", {
		LOAD_FILE: "LOAD_FILE"
	}]
]);

EVENT_MANAGER.AddActions([
    [ EVENT_MANAGER.GetModulatedEnumValue("Sequence", "ADD_TRACK"), (type, title) => ({
		type,
		data: {
			title
		}
	}) ],
    [ EVENT_MANAGER.GetModulatedEnumValue("Sequence", "ADD_NOTE"), (type, track) => ({
		type,
		data: {
			track
		}
	}) ],

    [ EVENT_MANAGER.GetModulatedEnumValue("Tessellation", "UPDATE_ATTRIBUTE"), (type, key, value) => ({
        type,
        data: {
			key,
			value
		}
    }) ],
    [ EVENT_MANAGER.GetModulatedEnumValue("FileSystem", "LOAD_FILE"), (type, file, width, height) => ({
        type,
        data: {
			file,
			width,
			height
		}
    }) ]
]);
EVENT_MANAGER.AddReducers([
	[
		"Sequence",
		(state = {}, message, [ enums ]) => {
			if(message.type === EVENT_MANAGER.GetModulatedEnumValue("Sequence", "ADD_TRACK")) {
				let uuid = uuidv4();

				state.Tracks[ uuid ] = {
					uuid,
					title: message.data.title,
					notes: []
				};
				
				return state;
			} else if(message.type === EVENT_MANAGER.GetModulatedEnumValue("Sequence", "ADD_NOTE")) {
				let track = state.Tracks[ message.data.track.uuid ];

				track.notes.push({
					note: EVENT_MANAGER.GetEnumValue("NoteType", "QUARTER")
				});
				
				return state;
			}

			return state;
		},
		{
			Tracks: {}
		}
	],

	[
		"Tessellation",
		(state = {}, message, [ enums, actions, gs ]) => {
			if(message.type === EVENT_MANAGER.GetModulatedEnumValue("Tessellation", "UPDATE_ATTRIBUTE")) {
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
			
					//	This has some serious edge-case issues, but can normally be accounted for by +/- 1 on the attribute input box
					//	Still, it should probably be refactored because it's annoying
					for(let i = 0; i <= Math.ceil(w / tw); i++) {
						for(let j = 0; j <= Math.ceil(h / th); j++) {
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
			if(message.type === EVENT_MANAGER.GetModulatedEnumValue("FileSystem", "LOAD_FILE")) {
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
EVENT_MANAGER.AsyncDispatch();

ReactDOM.render(
    <App />,
    document.getElementById("root")
);