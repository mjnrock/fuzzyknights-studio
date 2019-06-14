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
			...await state,
            lastUpdate: Date.now()
		});

		return this;
	}
	async AddState(state = {}) {
		this._state = Object.freeze({
			...this.GetState(),
			...await state,
            lastUpdate: Date.now()
        });
        
        this.Sync();

		return this;
    }
    
    Sync() {
        if(this._state.lastUpdate < Manager._scope()[ Manager._processEndpoint(ENDPOINT) ].lastUpdate) {
            this.GlobalToLocal();
        } else {
            this.LocalToGlobal();
        }
    }

	static GetInstance() {
		return Manager._scope().managers[ Manager._processEndpoint(ENDPOINT) ];
	}
}

export default StateManager;