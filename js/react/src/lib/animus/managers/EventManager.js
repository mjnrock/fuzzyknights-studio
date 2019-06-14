import Manager from "./Manager";

const ENDPOINT = "events";

class EventManager extends Manager {
	constructor() {
		super(ENDPOINT, "GetEvents", "SetEvents");

        this._enums = Object.freeze({
            EventType: {
                DOM_EVENT: "DOM_EVENT",
                CUSTOM_EVENT: "CUSTOM_EVENT"
            }
        });
        this._actions = Object.freeze({});
        this._reducers = Object.freeze({});

		this.LocalToGlobal(this.GetEvents());
    }

    GetEnum(_enum, key) {
        return this._enums[ _enum ][ key ];
    }
    GetAction(key) {
        return this._actions[ key ];
    }
    GetReducer(key) {
        return this._reducers[ key ];
    }
    SetEnum(_enum, key, value) {
        let enums = this._enums;

        enums[ _enum ][ key ] = value;
        this._enums = Object.freeze(enums);

        return this;
    }
    SetAction(key, value) {
        let actions = this._actions;

        actions[ key ] = value;
        this._actions = Object.freeze(actions);

        return this;
    }
    SetReducer(key, value) {
        let reducers = this._reducers;

        reducers[ key ] = value;
        this._reducers = Object.freeze(reducers);

        return this;
    }

    GetEvents() {
        return {
            enums: this._enums,
            actions: this._actions,
            reducers: this._reducers
        };
    }
    SetEvents({ enums = {}, actions = {}, reducers = {} }) {
        this._enums = Object.freeze(enums);
        this._actions = Object.freeze(actions);
        this._reducers = Object.freeze(reducers);

        return this;
    }
    
    Dispatch(action) {
        if(typeof action === "string" || action instanceof String) {
            action = this.GetAction(action);
        }

        this._reducers.forEach(reducer => {
            reducer(action);
        });
    }

    Handle(...args) {
        if(args[0] instanceof Event) {
            this.HandleDOMEvent(...args);   //* (e, meta)
        } else {
            this.HandleCustomEvent(...args);    //* (type, data, meta)
        }
    }
    HandleDOMEvent(e, meta = {}) {
        this.Dispatch({
            type: this._enums.EventType.DOM_EVENT,
            data: {
                type: e.type,
                data: e.data,
                meta: {
                    ...meta,
                    e
                }
            }
        });
    }
    HandleCustomEvent(type, data, meta = {}) {
        this.Dispatch({
            type: this._enums.EventType.CUSTOM_EVENT,
            data: {
                type,
                data,
                meta
            }
        });
    }

	static GetInstance() {
		return Manager._scope().managers[ Manager._processEndpoint(ENDPOINT) ];
	}
}

export default EventManager;