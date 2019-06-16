import uuidv4 from "uuid/v4";
import Manager from "./Manager";
import StateManager from "./StateManager";

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
        
        if(arguments.length === 1 && typeof key === "function") {
            reducers[ uuidv4() ] = value;
        } else {
            reducers[ key ] = value;
        }
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
            if(Array.isArray(entry)) {
                this.SetReducer(entry[0], entry[1]);
            } else if(typeof entry === "function") {
                this.SetReducer(uuidv4(), entry);
            }
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
    
    AsyncDispatch(action, url) {
		if(typeof url === "string" || url instanceof String) {
			fetch(url)
			.then(response => response.json())
			.then(data => {
				this.Dispatch(action, data);
			});
		} else {
			this.Dispatch(action);
		}
    }

    Dispatch(typeOrMessage, ...args) {
        let message = {
			type: null
		};
        if(arguments.length === 1 && (typeOrMessage !== null && typeOrMessage !== void 0)) {
            message = typeOrMessage;
        } else if(typeof typeOrMessage === "string" || typeOrMessage instanceof String) {
            message = (this.GetAction(typeOrMessage))(typeOrMessage, ...args);
        }
        
        for(let key in this._reducers) {
            let reducer = this._reducers[ key ],
                state = {};

            if(key.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
                state = reducer(state, message);
            } else {
                state[ key ] = reducer(state[ key ], message);
			}
			
			this._Hook("Animus:EventManager:Dispatch::reducer", state, false);
        }

		this._Hook("Animus:EventManager:Dispatch");
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

    static AddHook(path, fn) {
		Manager.AddHook(ENDPOINT, path, fn);
    }
    static RemoveHook(path) {
		Manager.RemoveHook(ENDPOINT, path);
    }
}

export default EventManager;