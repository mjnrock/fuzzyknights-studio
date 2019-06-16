import Manager from "./Manager";

const ENDPOINT = "state";
const LAST_UPDATE = "_lastUpdate";

class StateManager extends Manager {
	constructor() {
		super(ENDPOINT, "GetState", "SetState");

		this._state = Object.freeze({
            [ LAST_UPDATE ]: Date.now()
        });
        this.LocalToGlobal(this._state);
	}

	GetState() {
		return this._state;
	}
	SetState(state = {}, doSync = true) {
		this._state = Object.freeze({
			...state,
            [ LAST_UPDATE ]: Date.now()
		});
        
        if(doSync) {
            this.Sync();
		}

		this._Hook("Animus:StateManager:SetState", this._state);

		return this;
	}
	AddState(state = {}, doSync = true) {
        return this.SetState({
            ...this._state,
            ...state
        }, doSync);
    }
    
    Sync() {
        if(this._state[ LAST_UPDATE ] < Manager._scope()[ Manager._processEndpoint(ENDPOINT) ][ LAST_UPDATE ]) {
            this.GlobalToLocal();
        } else {
            this.LocalToGlobal();
        }
    }

	static GetInstance() {
		return Manager._scope().managers[ Manager._processEndpoint(ENDPOINT) ];
	}

    static AddHook(path, fn) {
		Manager.AddHook(ENDPOINT, path, fn);
    }
    static RemoveHook(path) {
		Manager.RemoveHook(ENDPOINT, path);
    }
}

export default StateManager;