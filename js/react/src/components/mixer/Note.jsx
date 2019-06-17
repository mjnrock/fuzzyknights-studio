import React from "react";
import SmartComponent from "./../../lib/animus/SmartComponent";

import "./Mixer.css";

const EnumNote = {
	SIXTY_FOURTH: 1 / 64,
	THIRTY_SECOND: 1 / 32,
	SIXTEENTH: 1 / 16,
	EIGHTH: 1 / 8,
	QUARTER: 1 / 4,
	HALF: 1 / 2,
	WHOLE: 1
};
const BASE_WIDTH = 256;

class Note extends SmartComponent {
	constructor(props) {
		super(props);

		this.state = {
			note: EnumNote.WHOLE
		};
	}

	OnMouseUp(e) {
		if(e.button === 0) {
			this.setState({
				...this.state,
				note: Math.max(this.state.note / 2, EnumNote.SIXTY_FOURTH)
			});
		} else if(e.button === 2) {
			this.setState({
				...this.state,
				note: Math.min(this.state.note * 2, EnumNote.WHOLE)
			});
		}
	}

	render() {
		return (
			<div
				className="note noselect"
				style={{
					backgroundColor: `rgba(${ 0 }, ${ this.state.note * BASE_WIDTH - 1 }, ${ 0 }, 0.25)`,
					// backgroundColor: `rgb(${ this.state.note * BASE_WIDTH }, ${ this.state.note * BASE_WIDTH }, ${ this.state.note * BASE_WIDTH })`,
					width: this.state.note * BASE_WIDTH
				}}
				onContextMenu={ (e) => e.preventDefault() }
				onMouseUp={ (e) => this.OnMouseUp(e) }
			>
				{ this.state.note * BASE_WIDTH  }
			</div>
		);
	}
}

export default Note;