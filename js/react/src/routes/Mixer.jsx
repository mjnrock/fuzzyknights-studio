import React from "react";
import SmartComponent from "./../lib/animus/SmartComponent";

import MixerPack from "./../components/mixer/package";

class Mixer extends SmartComponent {
	render() {
		return (
			<div className="container">
				<MixerPack.Sequence />
			</div>
		);
	}
}

export default Mixer;