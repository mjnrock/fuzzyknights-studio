import React from "react";
import SmartComponent from "../../lib/animus/SmartComponent";

import Note from "./Note";

class Track extends SmartComponent {
	render() {
		return (
			<div
				className="d-flex flex-row"
				onContextMenu={ (e) => e.preventDefault() }
			>
				<h3 className="track-title rotate">{ this.props.track.title }</h3>
				{
					this.SafeState(`Sequence.Tracks.${ this.props.track.uuid }.notes`, { iterator: (note, [ state, i ]) => {
						return (
							<Note key={ i } note={ note } />
						);
					}})
				}
				<button
					onClick={ (e) => this.Dispatch(this.Enum("Sequence", "ADD_NOTE"), this.props.track) }
				>Add Note</button>
			</div>
		);
	}
}

export default Track;