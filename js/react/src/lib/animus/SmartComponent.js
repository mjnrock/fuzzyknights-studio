import React, { Component } from "react";
import uuidv4 from "uuid/v4";

import Manager from "./managers/Manager";
import RegistryManager from "./managers/RegistryManager";
import Observable from "./Observable";
import EventManager from "./managers/EventManager";

class SmartComponent extends Component {
    constructor(props) {
        super(props);

		this._uuid = uuidv4();
        this._observer$ = new Observable();
		this.state = {};
	}
		
	componentWillMount() {
		RegistryManager.GetInstance().Register(this);
	}
	componentWillUnmount() {
		RegistryManager.GetInstance().Unregister(this);
	}

    Manager(endpoint) {
		if(arguments.length === 1) {
			return Manager._scope().managers[ Manager._processEndpoint(endpoint) ];
		}

		return Manager._scope().managers;
	}
	
	SafeState(path, { stringifyObjs = false, iterator = null } = {}) {
		let state = this.Manager("state").GetState(),
			pathArr = path.split(".");

		pathArr.forEach(tier => {
			if(state[ tier ]) {
				state = state[ tier ];
			} else {
				return null;
			}
		});

		if(iterator && typeof iterator === "function") {
			if(Array.isArray(state)) {
				return state.map((s, i) => iterator(s, [ state, i ]));
			} else if(typeof state === "object") {
				return Object.entries(state).map(s => iterator(s, [ state, s[0], s[1] ]));
			} else {
				return iterator(state);
			}
		}

		if(typeof state === "object") {
			if(stringifyObjs) {
				return JSON.stringify(state);
			}

			return null;
		}

		return state;
	}

    State(state, set = false) {
        if(arguments.length === 0) {
            return this.Manager("state").GetState();
        } else if(arguments.length === 1) {
            return this.Manager("state").AddState(state);
        } else if(arguments.length === 2 && set === false) {
            return this.Manager("state").AddState(state);
        } else if(arguments.length === 2 && set === true) {
            return this.Manager("state").SetState(state);
        }
	}
	Enum(_enum, key) {
		if(arguments.length === 1) {
			if(_enum.includes(".")) {
				let path = _enum.split(".");

				if(path.length === 2) {
					return this.Manager("events").GetEnumValue(...path);
				}

				return this.Manager("events").GetEnum(path[0] || _enum);
			}

			return this.Manager("events").GetEnum(_enum);
		} else if(arguments.length === 2) {
			return this.Manager("events").GetEnumValue(_enum, key);
		}
	}
    Action(key, value) {
        if(arguments.length === 0) {
            return this.Manager("events").GetActions();
        } else if(arguments.length === 1) {
            return this.Manager("events").GetAction(key);
        } else if(arguments.length === 2) {
            return this.Manager("events").SetAction(key, value);
        }
    }
    Reducer(key, value) {
        if(arguments.length === 0) {
            return this.Manager("events").GetReducers();
        } else if(arguments.length === 1) {
            return this.Manager("events").GetReducer(key);
        } else if(arguments.length === 2) {
            return this.Manager("events").SetReducer(key, value);
        }
    }
    Dispatch(action, ...args) {
        this.Manager("events").Dispatch(action, ...args);
    }
    AsyncDispatch(action, url) {
        this.Manager("events").AsyncDispatch(action, url);
    }
}

export default SmartComponent;