import uuidv4 from "uuid/v4";
import Animus from "./../../lib/animus/package";

import Note from "./Note";
import Measure from "./Measure";
import Track from "./Track";
import Sequence from "./Sequence";

export function Load() {
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
		]
	]);
}

export default {
	Note,
	Measure,
	Track,
	Sequence
};