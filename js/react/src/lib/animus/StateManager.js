import Manager from "./Manager";

const ENDPOINT = "state";

class StateManager extends Manager {
	constructor() {
		super(ENDPOINT, "GetState", "SetState");

		this._state = Object.freeze({});
		this.LocalToGlobal(this._state);
	}

	GetState() {
		return this._state;
	}
	async SetState(state = {}) {
		this._state = Object.freeze({
			...await state
		});

		return this;
	}
	async AddState(state = {}) {
		this._state = Object.freeze({
			...this.GetState(),
			...await state
		});

		return this;
	}

	static GetInstance() {
		return Manager._scope().managers[ Manager.processEndpoint(ENDPOINT) ];
	}
}

export default StateManager;