import React from "react";
import SmartComponent from "../../lib/animus/SmartComponent";

import Measure from "./Measure";

class Track extends SmartComponent {
	constructor(props) {
		super(props);

		this.state = {
			title: props.title || "Track"
		};
	}
	render() {
		return (
			<div
				className="d-flex flex-row"
				onContextMenu={ (e) => e.preventDefault() }
			>
				<h3 className="track-title rotate">{ this.state.title }</h3>
				<div className="track d-flex flex-row">
					<Measure />
					<Measure />
					<Measure />
					<Measure />
				</div>
			</div>
		);
	}
}

export default Track;