import React from "react";
import SmartComponent from "./../../lib/animus/SmartComponent";

import Note from "./Note";

class Measure extends SmartComponent {
	render() {
		return (
			<div
				className="measure d-flex flex-row"
				onContextMenu={ (e) => e.preventDefault() }
			>
				<Note />
				<Note />
				<Note />
				<Note />
			</div>
		);
	}
}

export default Measure;