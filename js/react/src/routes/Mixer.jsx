import React from "react";
import SmartComponent from "./../lib/animus/SmartComponent";

import MixerPack from "./../components/mixer/package";

class Mixer extends SmartComponent {
	render() {
		return (
			<div className="container">
				<MixerPack.Track title="Body" />
				<MixerPack.Track title="Head" />
				<MixerPack.Track title="Left" />
				<MixerPack.Track title="Right" />
			</div>
		);
	}
}

export default Mixer;