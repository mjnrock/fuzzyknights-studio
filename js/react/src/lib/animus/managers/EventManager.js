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

    GetEnums() {
        return this._enums;
    }
    GetActions() {
        return this._actions;
    }
    GetReducers() {
        return this._reducers;
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
        let enums = {
            ...this._enums
        };

        enums[ _enum ][ key ] = value;
        this._enums = Object.freeze(enums);

        return this;
    }
    SetAction(key, value) {
        let actions = {
            ...this._actions
        };

        actions[ key ] = value;
        this._actions = Object.freeze(actions);

        return this;
    }
    SetReducer(key, value) {
        let reducers = {
            ...this._reducers
        };

        reducers[ key ] = value;
        this._reducers = Object.freeze(reducers);

        return this;
    }

    AddActions(arr) {
        arr.forEach(entry => {
            this.SetAction(entry[0], entry[1]);
        });

        return this;
    }
    AddReducers(arr) {
        arr.forEach(entry => {
            this.SetReducer(entry[0], entry[1]);
        });

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
    
    Dispatch(action, ...args) {
        let message = {};
        if(typeof action === "object") {
            message = action;
        } else if(typeof action === "string" || action instanceof String) {
            message = (this.GetAction(action))(...args);
        }

        message = EventManager.ExtractMessage(action);
        for(let key in this._reducers) {
            let reducer = this._reducers[ key ];

            reducer(message);
        }
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

    static ExtractMessage(message) {
        if(message.type === EventManager.GetInstance()._enums.EventType.DOM_EVENT || message.type === EventManager.GetInstance()._enums.EventType.CUSTOM_EVENT) {
            return message.data;
        }

        return message;
    }

	static GetInstance() {
		return Manager._scope().managers[ Manager._processEndpoint(ENDPOINT) ];
	}
}

export default EventManager;