import React from "react";
import SmartComponent from "../../lib/animus/SmartComponent";

import Track from "./Track";

class Sequence extends SmartComponent {
	render() {
		return (
			<div
				onContextMenu={ (e) => e.preventDefault() }
			>
				{
					this.SafeState("Sequence.Tracks", { iterator: ([ uuid, track ], [ state, i ]) => {
						return (
							<Track key={ i } track={ track } />
						);
					}})
				}
				<button
					onClick={ (e) => this.Dispatch(this.Enum("Sequence", "ADD_TRACK"), Date.now()) }
				>Add Track</button>
			</div>
		);
	}
}

export default Sequence;